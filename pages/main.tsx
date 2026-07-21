import type { GetStaticProps, NextPage } from "next";
import { StaticImageData } from "next/image";
import { locations } from "../data";
import { BarbershopPage } from "../src/components";
import { Routes } from "../src/constants";
import logo from "../src/assets/2026/logo_main.png";
import eugenePhoto from "../src/assets/2026/main_masters/eugene.JPG";
import glibPhoto from "../src/assets/2026/main_masters/glib.jpg";
import ivanPhoto from "../src/assets/2026/main_masters/ivan.JPG";
import image3466 from "../src/assets/2026/main/IMG_3466.JPG";
import image3468 from "../src/assets/2026/main/IMG_3468.JPG";
import image5748 from "../src/assets/2026/main/IMG_5748.JPG";
import image6248 from "../src/assets/2026/main/IMG_6248.JPG";
import image6275 from "../src/assets/2026/main/IMG_6275.JPG";
import image6278 from "../src/assets/2026/main/IMG_6278.JPG";
import image6287 from "../src/assets/2026/main/IMG_6287.JPG";
import image6294 from "../src/assets/2026/main/IMG_6294.JPG";
import image6339 from "../src/assets/2026/main/IMG_6339.jpg";
import image6561 from "../src/assets/2026/main/IMG_6561.JPG";
import image6628 from "../src/assets/2026/main/IMG_6628.jpg";
import image6766 from "../src/assets/2026/main/IMG_6766.PNG";
import image7563 from "../src/assets/2026/main/IMG_7563.JPG";
import image7570 from "../src/assets/2026/main/IMG_7570.JPG";
import image7573 from "../src/assets/2026/main/IMG_7573.JPG";
import image7579 from "../src/assets/2026/main/IMG_7579.JPG";
import image7587 from "../src/assets/2026/main/IMG_7587.JPG";
import image9119 from "../src/assets/2026/main/IMG_9119.JPG";
import image9121 from "../src/assets/2026/main/IMG_9121.JPG";
import image9123 from "../src/assets/2026/main/IMG_9123.JPG";
import image9406 from "../src/assets/2026/main/IMG_9406.JPG";
import image9649 from "../src/assets/2026/main/IMG_9649.JPG";
import { Client } from "@notionhq/client";
import { ApiService } from "../src/services/ApiService";
import { Pricing } from "../src/types/Pricing";

export interface MainProps {
  pricing: Pricing[];
}

const heroImage = image3468;
const contactImage = image6287;

// All 2026 main-location photos; interior/signage shots lead the set.
const gallery = [
  image3468,
  image6287,
  image5748,
  image6628,
  image6766,
  image9406,
  image3466,
  image6248,
  image6275,
  image6278,
  image6294,
  image6339,
  image6561,
  image7563,
  image7570,
  image7573,
  image7579,
  image7587,
  image9119,
  image9121,
  image9123,
  image9649,
];

// Explicit portrait per barber id (data.js): 1 Євгеній, 2 Іван, 3 Гліб.
const barberPhotosById: Record<number, StaticImageData> = {
  1: eugenePhoto,
  2: ivanPhoto,
  3: glibPhoto,
};

const Main: NextPage<MainProps> = ({ pricing }) => {
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
      barbers={locations.main.barbers.map((barber) => ({
        ...barber,
        photo: barberPhotosById[barber.id],
      }))}
      crossLink={{ label: "Youngsters", href: Routes.SECONDARY }}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let pricing: Pricing[] = [];

  try {
    const notion = new Client({ auth: process.env.NOTION_SECRET });
    const apiService = new ApiService("Мазепи", notion);
    pricing = await apiService.fetchPricing();
  } catch (error) {
    console.error("Failed to fetch pricing from Notion", error);
  }

  return {
    props: { pricing },
    revalidate: 3600,
  };
};

export default Main;
