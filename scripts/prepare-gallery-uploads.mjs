// Prepares the gallery photos for upload to the Notion "Images" database.
//
// The site serves gallery photos through /api/gallery-image/<notion-page-id>,
// which streams the file back through a Vercel function — and that response is
// capped at ~4.5 MB. Phone originals are well over that, so every photo has to
// be re-encoded before it goes into Notion. Run this whenever new photos are
// added, then upload the contents of .gallery-out/ to the Images database.
//
//   node scripts/prepare-gallery-uploads.mjs

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, ".gallery-out");

const MAX_EDGE = 2400;
const QUALITY = 82;
// Leaves plenty of headroom under the ~4.5 MB Vercel response limit.
const MAX_OUTPUT_BYTES = 3 * 1024 * 1024;

const buildLocation = (location, dir, rows) =>
  rows.map(([file, notionPageId], index) => ({
    file: `${dir}/${file}`,
    location,
    order: index + 1,
    notionPageId,
  }));

// Order matches what the pages render today, so the migration is invisible.
// Each entry pairs a source photo with the Notion row it belongs to, so the
// upload script can fill the right row's "Фото" instead of creating new ones.
const MANIFEST = [
  ...buildLocation("Мазепи", "src/assets/2026/main", [
    ["IMG_3468.JPG", "3dd133f6-6fc8-811d-a272-c0481d5e7d00"],
    ["IMG_6287.JPG", "3dd133f6-6fc8-8169-90c4-ef48cea2fa12"],
    ["IMG_5748.JPG", "3dd133f6-6fc8-8109-a7c8-cf649e8bb7d0"],
    ["IMG_6628.jpg", "3dd133f6-6fc8-8191-a5a1-ec0cf3efe3c6"],
    ["IMG_6766.PNG", "3dd133f6-6fc8-8157-8ec8-c6755b69b7ad"],
    ["IMG_9406.JPG", "3dd133f6-6fc8-81a0-b38e-cab5226f4e81"],
    ["IMG_3466.JPG", "3dd133f6-6fc8-81fe-8668-d4e8d42deecc"],
    ["IMG_6248.JPG", "3dd133f6-6fc8-81ac-aa70-c7459ef95993"],
    ["IMG_6275.JPG", "3dd133f6-6fc8-81c0-a2d0-d851abb5d351"],
    ["IMG_6278.JPG", "3dd133f6-6fc8-81c5-8f6f-d5cf147366f5"],
    ["IMG_6294.JPG", "3dd133f6-6fc8-8145-8f67-c5d5306d4b3a"],
    ["IMG_6339.jpg", "3dd133f6-6fc8-81d4-a60e-c054d17f37e6"],
    ["IMG_6561.JPG", "3dd133f6-6fc8-817b-adf3-fff9bc5c8b9f"],
    ["IMG_7563.JPG", "3dd133f6-6fc8-816e-9fc1-ffed2b910158"],
    ["IMG_7570.JPG", "3dd133f6-6fc8-8105-acfe-e19fd067bdd1"],
    ["IMG_7573.JPG", "3dd133f6-6fc8-8162-9c9b-f3951a343a4f"],
    ["IMG_7579.JPG", "3dd133f6-6fc8-8150-bcae-ed53bd9742f7"],
    ["IMG_7587.JPG", "3dd133f6-6fc8-8176-aab2-d607df6242cc"],
    ["IMG_9119.JPG", "3dd133f6-6fc8-8184-ad64-cf2353645473"],
    ["IMG_9121.JPG", "3dd133f6-6fc8-8191-8986-c3aa7d4c6594"],
    ["IMG_9123.JPG", "3dd133f6-6fc8-816a-b24c-d8e8dce53eb8"],
    ["IMG_9649.JPG", "3dd133f6-6fc8-815e-a9e8-f21b41c05e3a"],
  ]),
  ...buildLocation("Свободи", "src/assets/2026/youngsters", [
    ["IMG_3516.JPG", "3dd133f6-6fc8-814f-8653-e311eed62ba9"],
    ["IMG_6306.JPG", "3dd133f6-6fc8-818f-9bd0-ce7881e78aa3"],
    ["IMG_0528.JPG", "3dd133f6-6fc8-8157-9d69-fbd351a5a513"],
    ["IMG_5134.JPG", "3dd133f6-6fc8-81f9-b88f-fe36717dc092"],
    ["IMG_3530.JPG", "3dd133f6-6fc8-81e4-be56-d2cbe4f47c37"],
    ["IMG_5092.JPG", "3dd133f6-6fc8-81fa-b812-ded79350762d"],
    ["IMG_5133.JPG", "3dd133f6-6fc8-8175-935a-d97fd8a78bfe"],
    ["IMG_6301.JPG", "3dd133f6-6fc8-815a-8e1a-ef50ddf6847e"],
    ["IMG_6310.JPG", "3dd133f6-6fc8-81e1-b5db-dfac6c37e866"],
    ["IMG_6315.JPG", "3dd133f6-6fc8-81db-93da-e9dbc8dfb265"],
    ["IMG_6869.jpg", "3dd133f6-6fc8-810c-9206-fec2be5969a0"],
    ["IMG_9402.JPG", "3dd133f6-6fc8-81d2-a8db-ee5dacfae9e3"],
    ["IMG_9796.JPG", "3dd133f6-6fc8-81d8-b012-ff24e5fd8f72"],
  ]),
  ...buildLocation("Освіта", "src/assets/ed", [
    ["a00001.jpg", "3dd133f6-6fc8-8122-9ba5-ff03c9d2f049"],
    ["a00003.jpg", "3dd133f6-6fc8-8148-a395-c18d9af68ae7"],
    ["a00005.jpg", "3dd133f6-6fc8-81df-98f2-f6c9320f6b00"],
    ["a00007.jpg", "3dd133f6-6fc8-8196-8460-e28d13de5be9"],
  ]),
];

const SLUGS = { "Мазепи": "mazepy", "Свободи": "svobody", "Освіта": "education" };

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const main = async () => {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const entries = [];
  let sourceBytes = 0;
  let outputBytes = 0;
  const oversized = [];

  for (const item of MANIFEST) {
    const source = path.join(root, item.file);
    const input = await readFile(source);
    const slug = SLUGS[item.location];
    const name = `${item.location} ${String(item.order).padStart(2, "0")}`;
    const outName = `${slug}-${String(item.order).padStart(2, "0")}.jpg`;

    const output = await sharp(input)
      // No argument: applies the EXIF orientation. sharp drops EXIF when it
      // re-encodes, so without this, photos stored rotated come out sideways.
      .rotate()
      .resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
      .toBuffer({ resolveWithObject: true });

    await writeFile(path.join(outDir, outName), output.data);

    sourceBytes += input.length;
    outputBytes += output.data.length;
    if (output.data.length > MAX_OUTPUT_BYTES) oversized.push(outName);

    entries.push({
      source: item.file,
      out: outName,
      location: item.location,
      order: item.order,
      name,
      notionPageId: item.notionPageId,
      width: output.info.width,
      height: output.info.height,
      bytes: output.data.length,
    });

    console.log(
      `${outName.padEnd(18)} ${item.location.padEnd(8)} ` +
        `${String(output.info.width).padStart(4)}x${String(output.info.height).padEnd(5)} ` +
        `${mb(input.length).padStart(8)} -> ${mb(output.data.length).padStart(8)}`
    );
  }

  await writeFile(
    path.join(outDir, "manifest.json"),
    `${JSON.stringify(entries, null, 2)}\n`
  );

  console.log(
    `\n${entries.length} photos: ${mb(sourceBytes)} -> ${mb(outputBytes)}`
  );
  console.log(`Written to ${path.relative(root, outDir)}/`);

  if (oversized.length > 0) {
    console.error(
      `\nToo large for the /api/gallery-image proxy (> ${mb(MAX_OUTPUT_BYTES)}): ` +
        oversized.join(", ")
    );
    process.exitCode = 1;
  }
};

await main();
