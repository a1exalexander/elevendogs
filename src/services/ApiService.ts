import { Client, isFullDatabase } from "@notionhq/client";
import { Pricing } from "../types/Pricing";
import { get } from "lodash";

interface IApiService {
  fetchPricing(): Promise<Pricing[]>;
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
}
