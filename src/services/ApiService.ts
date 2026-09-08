import { Client, isFullDatabase } from "@notionhq/client";
import { Barber } from "../types/Barber";
import { Pricing } from "../types/Pricing";
import { get } from "lodash";

export const BARBERS_DATABASE_ID = "3d5133f66fc880178c17f1aab2ee7054";

interface IApiService {
  fetchPricing(): Promise<Pricing[]>;
  fetchBarbers(): Promise<Barber[]>;
}

export class ApiService implements IApiService {
  private readonly titleKey = "Послуга";
  private readonly key: string;

  constructor(key: "Свободи" | "Мазепи", private readonly notion: Client) {
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
}
