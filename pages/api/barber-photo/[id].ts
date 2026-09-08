import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import { get } from "lodash";
import { BARBERS_DATABASE_ID } from "../../../src/services/ApiService";

// Notion signs file URLs for one hour, so they cannot be embedded in ISR pages
// directly. This route is a stable URL that resolves a fresh one per request.

const notion = new Client({ auth: process.env.NOTION_SECRET });

const UUID = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
const bare = (value: string) => value.replace(/-/g, "").toLowerCase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = String(req.query.id ?? "");

  if (!UUID.test(id)) {
    return res.status(400).end();
  }

  try {
    const page = await notion.pages.retrieve({ page_id: id });

    // Only serve barbers, so the route can't proxy any other page we can read.
    const parent = get(page, "parent.database_id", "");
    if (bare(parent) !== bare(BARBERS_DATABASE_ID)) {
      return res.status(404).end();
    }

    const file = get(page, "properties.Фото.files[0]");
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
    console.error(`Failed to serve barber photo ${id}`, error);
    res.status(500).end();
  }
}
