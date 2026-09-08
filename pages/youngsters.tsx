import React from "react";
import type { GetStaticProps, NextPage } from "next";
import { StaticImageData } from "next/image";
import { locations } from "../data";
import { BarbershopPage } from "../src/components";
import { Routes } from "../src/constants";
import logo from "../src/assets/2026/logo_youngsters_text.png";
import heroLogo from "../src/assets/eleven_dogs_youngsters.svg";
import dmytroPhoto from "../src/assets/2026/youngsters_masters/dmytro.JPG";
import jaroslavPhoto from "../src/assets/2026/youngsters_masters/jaroslav.JPG";
import olegPhoto from "../src/assets/2026/youngsters_masters/oleg.JPG";
import image0528 from "../src/assets/2026/youngsters/IMG_0528.JPG";
import image3516 from "../src/assets/2026/youngsters/IMG_3516.JPG";
import image3530 from "../src/assets/2026/youngsters/IMG_3530.JPG";
import image5092 from "../src/assets/2026/youngsters/IMG_5092.JPG";
import image5133 from "../src/assets/2026/youngsters/IMG_5133.JPG";
import image5134 from "../src/assets/2026/youngsters/IMG_5134.JPG";
import image6301 from "../src/assets/2026/youngsters/IMG_6301.JPG";
import image6306 from "../src/assets/2026/youngsters/IMG_6306.JPG";
import image6310 from "../src/assets/2026/youngsters/IMG_6310.JPG";
import image6315 from "../src/assets/2026/youngsters/IMG_6315.JPG";
import image6869 from "../src/assets/2026/youngsters/IMG_6869.jpg";
import image9402 from "../src/assets/2026/youngsters/IMG_9402.JPG";
import image9796 from "../src/assets/2026/youngsters/IMG_9796.JPG";
import { Client } from "@notionhq/client";
import { Pricing } from "../src/types/Pricing";
import { ApiService } from "../src/services/ApiService";

export interface YoungstersProps {
  pricing: Pricing[];
}

const heroImage = image3516;
const contactImage = image6306;

// All 2026 youngsters-location photos; signature shots lead the set.
const gallery = [
  image3516,
  image6306,
  image0528,
  image5134,
  image3530,
  image5092,
  image5133,
  image6301,
  image6310,
  image6315,
  image6869,
  image9402,
  image9796,
];

// Explicit portrait per barber id (data.js): 1 Олег, 2 Дмитро, 3 Ярослав.
const barberPhotosById: Record<number, StaticImageData> = {
  1: olegPhoto,
  2: dmytroPhoto,
  3: jaroslavPhoto,
};

const Youngsters: NextPage<YoungstersProps> = ({ pricing }) => {
  return (
    <BarbershopPage
      variant="loud"
      ogImage="/og_youngsters.jpg"
      data={locations.secondary}
      pricing={pricing}
      logo={logo}
      heroLogo={heroLogo}
      heroTitleImage={logo}
      heroImage={heroImage}
      gallery={gallery}
      contactImage={contactImage}
      barbers={locations.secondary.barbers.map((barber) => ({
        ...barber,
        photo: barberPhotosById[barber.id],
      }))}
      crossLink={{ label: "Eleven Dogs", href: Routes.MAIN }}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let pricing: Pricing[] = [];

  try {
    const notion = new Client({ auth: process.env.NOTION_SECRET });
    const apiService = new ApiService("Свободи", notion);
    pricing = await apiService.fetchPricing();
  } catch (error) {
    console.error("Failed to fetch pricing from Notion", error);
  }

  return {
    props: { pricing },
    revalidate: 3600,
  };
};

export default Youngsters;
