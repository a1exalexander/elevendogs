import React from "react";
import type { GetStaticProps, NextPage } from "next";
import { locations } from "../data";
import { BarbershopPage } from "../src/components";
import { Routes } from "../src/constants";
import logo from "../src/assets/2026/logo_main.png";
import logoYoungstersText from "../src/assets/2026/logo_youngsters_text.png";
// Hero and contact photos stay local: they are above the fold, so they must not
// depend on Notion. Everything else in the gallery comes from the Images database.
import heroImage from "../src/assets/2026/youngsters/IMG_3516.JPG";
import contactImage from "../src/assets/2026/youngsters/IMG_6306.JPG";
import { Client } from "@notionhq/client";
import { Barber } from "../src/types/Barber";
import { GalleryImage } from "../src/types/GalleryImage";
import { Pricing } from "../src/types/Pricing";
import { ApiService } from "../src/services/ApiService";

export interface YoungstersProps {
  pricing: Pricing[];
  barbers: Barber[];
  gallery: GalleryImage[];
}

const Youngsters: NextPage<YoungstersProps> = ({
  pricing,
  barbers,
  gallery,
}) => {
  return (
    <BarbershopPage
      variant="loud"
      ogImage="/og_youngsters.jpg"
      data={locations.secondary}
      pricing={pricing}
      logo={logo}
      heroTitleImage={logoYoungstersText}
      heroImage={heroImage}
      gallery={gallery}
      contactImage={contactImage}
      barbers={barbers}
      crossLink={{ label: "Eleven Dogs", href: Routes.MAIN }}
    />
  );
};

export const getStaticProps: GetStaticProps<YoungstersProps> = async () => {
  let pricing: Pricing[] = [];
  let barbers: Barber[] = [];
  let gallery: GalleryImage[] = [];

  try {
    const notion = new Client({ auth: process.env.NOTION_SECRET });
    const apiService = new ApiService("Свободи", notion);
    [pricing, barbers, gallery] = await Promise.all([
      apiService.fetchPricing(),
      apiService.fetchBarbers(),
      apiService.fetchGallery(),
    ]);
  } catch (error) {
    console.error("Failed to fetch data from Notion", error);
    // Retry soon rather than pinning an empty page for a whole hour.
    return { props: { pricing, barbers, gallery }, revalidate: 60 };
  }

  return {
    props: { pricing, barbers, gallery },
    revalidate: 3600,
  };
};

export default Youngsters;
