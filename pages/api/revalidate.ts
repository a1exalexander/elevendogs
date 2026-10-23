import { createHmac, timingSafeEqual } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

const PATHS = ["/main", "/youngsters", "/education"];

const safeEqual = (a: string, b: string) => {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
};

// Notion Automation "Send webhook": shared secret in a header or `?secret=`.
const hasValidSecret = (req: NextApiRequest) => {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) return false;
  const header = req.headers["x-revalidate-secret"];
  const provided = (Array.isArray(header) ? header[0] : header) ?? req.query.secret;
  return typeof provided === "string" && safeEqual(provided, expected);
};

// Notion integration webhooks: HMAC-SHA256 of the JSON body, keyed with the
// verification token, sent as `X-Notion-Signature: sha256=<hex>`.
const hasValidSignature = (req: NextApiRequest) => {
  const token = process.env.NOTION_WEBHOOK_TOKEN;
  const signature = req.headers["x-notion-signature"];
  if (!token || typeof signature !== "string") return false;
  const digest = `sha256=${createHmac("sha256", token)
    .update(JSON.stringify(req.body))
    .digest("hex")}`;
  return safeEqual(signature, digest);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // One-time handshake when the webhook is created: Notion sends the token to
  // store as NOTION_WEBHOOK_TOKEN. It shows up in the function logs.
  if (req.body?.verification_token) {
    console.log("Notion webhook verification token:", req.body.verification_token);
    return res.status(200).json({ ok: true });
  }

  if (!hasValidSecret(req) && !hasValidSignature(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await Promise.all(PATHS.map((path) => res.revalidate(path)));
    return res.status(200).json({ revalidated: true, paths: PATHS });
  } catch (error) {
    console.error("Failed to revalidate", error);
    return res.status(500).json({ error: "Revalidation failed" });
  }
}
