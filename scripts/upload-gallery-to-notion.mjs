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
//
// Safe to re-run: each photo is written to the row named in the manifest, so a
// second run replaces the same files rather than creating duplicate rows.

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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const api = async (url, init = {}, attempt = 1) => {
  const response = await fetch(url, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      ...init.headers,
    },
  });

  if (response.ok) {
    return response.json();
  }

  // Notion rate-limits at roughly 3 requests/second, and each photo costs
  // three. Backing off beats aborting a 39-photo run two thirds of the way in.
  const retriable = response.status === 429 || response.status >= 500;
  if (retriable && attempt <= 4) {
    const retryAfter = Number(response.headers.get("retry-after"));
    const wait = Number.isFinite(retryAfter) && retryAfter > 0
      ? retryAfter * 1000
      : 2 ** attempt * 500;
    await sleep(wait);
    return api(url, init, attempt + 1);
  }

  throw new Error(
    `${init.method ?? "GET"} ${url} -> ${response.status} ${await response.text()}`
  );
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
  // Sequential on purpose, to stay within Notion's rate limit.
  await uploadOne(entry);
  done += 1;
  console.log(
    `${String(done).padStart(2)}/${manifest.length}  ${entry.name}  <- ${entry.out}`
  );
}

console.log(`\nAttached ${done} photos to the Images database.`);
