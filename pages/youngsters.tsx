import React from "react";
import type { GetStaticProps, NextPage } from "next";
import { locations } from "../data";
import { BarbershopPage } from "../src/components";
import { Routes } from "../src/constants";
import logo from "../src/assets/eleven_dogs_logo_2_trimmed.png";
import heroLogo from "../src/assets/eleven_dogs_youngsters.svg";
import heroImage from "../src/assets/new2025/1IMG_3516.JPG";
import contactImage from "../src/assets/edy/b00002.jpg";
import image1 from "../src/assets/edy2/DSCF5379-2.jpg";
import image2 from "../src/assets/edy2/DSCF5406-2-2.jpg";
import image3 from "../src/assets/edy/b00004.jpg";
import image4 from "../src/assets/new2025/1IMG_3539.JPG";
import image5 from "../src/assets/new2025/1IMG_9791.JPG";
import image7 from "../src/assets/new2025/1IMG_9793.JPG";
import { Client } from "@notionhq/client";
import { Pricing } from "../src/types/Pricing";
import { ApiService } from "../src/services/ApiService";

export interface YoungstersProps {
  pricing: Pricing[];
}

// Same photo set and order as the master-branch gallery.
const gallery = [image3, image4, image1, image5, image2, heroImage, image7];
const barberPhotos = [image1, image3, image5];

const Youngsters: NextPage<YoungstersProps> = ({ pricing }) => {
  return (
    <BarbershopPage
      variant="loud"
      ogImage="/og_youngsters.jpg"
      data={locations.secondary}
      pricing={pricing}
      logo={logo}
      heroLogo={heroLogo}
      heroImage={heroImage}
      gallery={gallery}
      contactImage={contactImage}
      barbers={locations.secondary.barbers.map((barber, index) => ({
        ...barber,
        photo: barberPhotos[index % barberPhotos.length],
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
