import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import { get } from "lodash";

// Notion signs file URLs for one hour, so they cannot be embedded in ISR pages
// directly. These routes are stable URLs that resolve a fresh one per request.

const notion = new Client({ auth: process.env.NOTION_SECRET });

const UUID = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
const bare = (value: string) => value.replace(/-/g, "").toLowerCase();

export interface NotionFileHandlerOptions {
  /** Only pages parented by this database may be proxied. */
  databaseId: string;
  /** Name of the files property to read, e.g. "Фото". */
  property: string;
  /** Used in error logs only. */
  label: string;
}

export const createNotionFileHandler =
  ({ databaseId, property, label }: NotionFileHandlerOptions) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const id = String(req.query.id ?? "");

    if (!UUID.test(id)) {
      return res.status(400).end();
    }

    try {
      const page = await notion.pages.retrieve({ page_id: id });

      // Scope to one database, so the route can't proxy any other page we can read.
      const parent = get(page, "parent.database_id", "");
      if (bare(parent) !== bare(databaseId)) {
        return res.status(404).end();
      }

      const file = get(page, `properties.${property}.files[0]`);
      const url = get(file, "file.url") ?? get(file, "external.url");
      if (!url) {
        return res.status(404).end();
      }

      const upstream = await fetch(url);
      if (!upstream.ok) {
        return res.status(502).end();
      }

      res.setHeader(
        "Content-Type",
        upstream.headers.get("content-type") ?? "image/jpeg"
      );
      res.setHeader(
        "Cache-Control",
        "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800"
      );
      res.send(Buffer.from(await upstream.arrayBuffer()));
    } catch (error) {
      console.error(`Failed to serve ${label} ${id}`, error);
      res.status(500).end();
    }
  };
