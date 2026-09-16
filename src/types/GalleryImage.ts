export interface GalleryImage {
  /** Notion page id — a stable React key that survives reordering. */
  id: string;
  /** `/api/gallery-image/<id>`; same-origin, so next/image still optimises it. */
  src: string;
  /** Notion `Name`, or "" when the name is just a position label. */
  alt: string;
}
