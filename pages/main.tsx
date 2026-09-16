import type { GetStaticProps, NextPage } from "next";
import { locations } from "../data";
import { BarbershopPage } from "../src/components";
import { Routes } from "../src/constants";
import logo from "../src/assets/2026/logo_main.png";
// Hero and contact photos stay local: they are above the fold, so they must not
// depend on Notion. Everything else in the gallery comes from the Images database.
import heroImage from "../src/assets/2026/main/IMG_3468.JPG";
import contactImage from "../src/assets/2026/main/IMG_6287.JPG";
import { Client } from "@notionhq/client";
import { ApiService } from "../src/services/ApiService";
import { Barber } from "../src/types/Barber";
import { GalleryImage } from "../src/types/GalleryImage";
import { Pricing } from "../src/types/Pricing";

export interface MainProps {
  pricing: Pricing[];
  barbers: Barber[];
  gallery: GalleryImage[];
}

const Main: NextPage<MainProps> = ({ pricing, barbers, gallery }) => {
  return (
    <BarbershopPage
      variant="minimal"
      ogImage="/og_main.jpg"
      data={locations.main}
      pricing={pricing}
      logo={logo}
      heroTitleImage={logo}
      heroImage={heroImage}
      gallery={gallery}
      contactImage={contactImage}
      barbers={barbers}
      crossLink={{ label: "Youngsters", href: Routes.SECONDARY }}
    />
  );
};

export const getStaticProps: GetStaticProps<MainProps> = async () => {
  let pricing: Pricing[] = [];
  let barbers: Barber[] = [];
  let gallery: GalleryImage[] = [];

  try {
    const notion = new Client({ auth: process.env.NOTION_SECRET });
    const apiService = new ApiService("Мазепи", notion);
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

export default Main;
