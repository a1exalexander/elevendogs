import { Client } from "@notionhq/client";
import { Barber } from "../types/Barber";
import { GalleryImage } from "../types/GalleryImage";
import { Pricing } from "../types/Pricing";
import { get } from "lodash";

export const BARBERS_DATABASE_ID = "3d5133f66fc880178c17f1aab2ee7054";
export const IMAGES_DATABASE_ID = "3dd133f66fc88005953bfba6f56f6267";

/** Locations that have their own barbershop page with pricing and barbers. */
export type BarbershopLocation = "Свободи" | "Мазепи";
/** Every value the Images database's "Локація" property can hold. */
export type NotionLocation = BarbershopLocation | "Освіта";

// Rows we create ourselves are named by position ("Мазепи 01"), which is a label
// rather than a description — those photos are decorative, so they get alt="".
// Anything typed by hand in Notion becomes real alt text.
const POSITION_NAME = /^(Мазепи|Свободи|Освіта)\s+\d+$/;

export const fetchGalleryImages = async (
  notion: Client,
  location: NotionLocation
): Promise<GalleryImage[]> => {
  const { results } = await notion.databases.query({
    database_id: IMAGES_DATABASE_ID,
    filter: {
      and: [
        { property: "Локація", select: { equals: location } },
        { property: "Фото", files: { is_not_empty: true } },
      ],
    },
    sorts: [{ property: "Порядок", direction: "ascending" }],
  });

  return results
    // A row with a location but no file would render as a broken tile, since
    // /api/gallery-image/<id> has nothing to serve for it.
    .filter((item) => Boolean(get(item, "properties.Фото.files[0]")))
    .map((item) => {
      const name = get(item, "properties.Name.title[0].plain_text", "").trim();
      return {
        id: item.id,
        src: `/api/gallery-image/${item.id}`,
        alt: POSITION_NAME.test(name) ? "" : name,
        order:
          (get(item, "properties.Порядок.number") as number | null) ??
          Number.MAX_SAFE_INTEGER,
      };
    })
    // Notion doesn't guarantee an order for rows with an empty or duplicated
    // "Порядок", and an unstable one would reshuffle the carousel on every
    // revalidation.
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
    .map(({ id, src, alt }) => ({ id, src, alt }));
};

interface IApiService {
  fetchPricing(): Promise<Pricing[]>;
  fetchBarbers(): Promise<Barber[]>;
  fetchGallery(): Promise<GalleryImage[]>;
}

export class ApiService implements IApiService {
  private readonly titleKey = "Послуга";
  private readonly key: BarbershopLocation;

  // Deliberately narrower than NotionLocation: fetchPricing uses the key as a
  // *column name* in the pricing database, where only the two barbershops exist.
  constructor(key: BarbershopLocation, private readonly notion: Client) {
    this.key = key;
  }

  fetchPricing = async (): Promise<Pricing[]> => {
    const { results } = await this.notion.databases.query({
      database_id: "111133f66fc8809f8196fbfc26376c1f",
    });

    const data = results
      .map((item) => {
        return {
          id: item.id,
          title: get(item, `properties.${this.titleKey}.title[0].plain_text`),
          price: get(item, `properties.${this.key}.rich_text[0].plain_text`),
        } as Pricing;
      })
      .reverse();

    return data;
  };

  fetchBarbers = async (): Promise<Barber[]> => {
    const { results } = await this.notion.databases.query({
      database_id: BARBERS_DATABASE_ID,
      filter: { property: "Локація", select: { equals: this.key } },
      sorts: [{ property: "Порядок", direction: "ascending" }],
    });

    return results
      .map((item) => ({
        id: item.id,
        name: get(item, "properties.Name.title[0].plain_text", ""),
        role: get(item, "properties.Статус.select.name", ""),
        // Notion splits long rich text into chunks, so join them all.
        bio: get(item, "properties.Опис.rich_text", [])
          .map((chunk: { plain_text?: string }) => chunk.plain_text ?? "")
          .join("")
          .trim(),
        photo: `/api/barber-photo/${item.id}`,
      }))
      .filter((barber) => barber.name);
  };

  fetchGallery = (): Promise<GalleryImage[]> =>
    fetchGalleryImages(this.notion, this.key);
}
