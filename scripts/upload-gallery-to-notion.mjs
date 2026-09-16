// Uploads the photos prepared by prepare-gallery-uploads.mjs into the Notion
// "Images" database, filling the "Фото" property of each row.
//
// Every row it touches is matched by the notionPageId recorded in
// .gallery-out/manifest.json, so re-running it replaces the file on the same
// row rather than creating duplicates.
//
//   node scripts/prepare-gallery-uploads.mjs
//   NOTION_SECRET=secret_... node scripts/upload-gallery-to-notion.mjs
//
// The token needs "Insert content" and "Update content" capabilities on the
// Elevendogs page. It is the same NOTION_SECRET the site uses.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, ".gallery-out");

const token = process.env.NOTION_SECRET;
if (!token) {
  console.error("NOTION_SECRET is not set.");
  process.exit(1);
}

const api = async (url, init = {}) => {
  const response = await fetch(url, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      ...init.headers,
    },
  });
  if (!response.ok) {
    throw new Error(
      `${init.method ?? "GET"} ${url} -> ${response.status} ${await response.text()}`
    );
  }
  return response.json();
};

const uploadOne = async (entry) => {
  const file = await readFile(path.join(outDir, entry.out));

  // 1. Reserve a file upload.
  const upload = await api("https://api.notion.com/v1/file_uploads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ filename: entry.out, content_type: "image/jpeg" }),
  });

  // 2. Send the bytes.
  const form = new FormData();
  form.append("file", new Blob([file], { type: "image/jpeg" }), entry.out);
  await api(`https://api.notion.com/v1/file_uploads/${upload.id}/send`, {
    method: "POST",
    body: form,
  });

  // 3. Attach it to the row that already carries the name, location and order.
  await api(`https://api.notion.com/v1/pages/${entry.notionPageId}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      properties: {
        "Фото": {
          files: [
            {
              type: "file_upload",
              name: entry.out,
              file_upload: { id: upload.id },
            },
          ],
        },
      },
    }),
  });
};

const manifest = JSON.parse(
  await readFile(path.join(outDir, "manifest.json"), "utf8")
);

const missing = manifest.filter((entry) => !entry.notionPageId);
if (missing.length > 0) {
  console.error(
    `manifest.json has ${missing.length} entries without a notionPageId.`
  );
  process.exit(1);
}

let done = 0;
for (const entry of manifest) {
  // Sequential on purpose: Notion rate-limits at roughly 3 requests/second and
  // each photo costs three of them.
  await uploadOne(entry);
  done += 1;
  console.log(
    `${String(done).padStart(2)}/${manifest.length}  ${entry.name}  <- ${entry.out}`
  );
}

console.log(`\nAttached ${done} photos to the Images database.`);
