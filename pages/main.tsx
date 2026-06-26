import type { GetStaticProps, NextPage } from "next";
import { locations } from "../data";
import { BarbershopPage } from "../src/components";
import { Routes } from "../src/constants";
import heroLogo from "../src/assets/eleven_dogs.svg";
import heroImage from "../src/assets/ed2/DSCF5124-Edit-2.jpg";
import contactImage from "../src/assets/ed2/DSCF5312-Edit-2.jpg";
import image1 from "../src/assets/ed2/DSCF5198-Edit-2.jpg";
import image2 from "../src/assets/ed2/DSCF5220-Edit-2.jpg";
import image3 from "../src/assets/ed2/DSCF5237-Edit-2.jpg";
import image4 from "../src/assets/new2025/1IMG_3466.JPG";
import image5 from "../src/assets/new2025/1IMG_3540.JPG";
import image6 from "../src/assets/new2025/1IMG_3542.JPG";
import image7 from "../src/assets/new2025/1IMG_9649.JPG";
import image8 from "../src/assets/ed2/DSCF5308-Edit-2.jpg";
import { Client } from "@notionhq/client";
import { ApiService } from "../src/services/ApiService";
import { Pricing } from "../src/types/Pricing";

export interface MainProps {
  pricing: Pricing[];
}

const gallery = [image1, image2, image3, image4, image5, image6, image7, image8];
const barberPhotos = [image1, image2, image5];

const Main: NextPage<MainProps> = ({ pricing }) => {
  return (
    <BarbershopPage
      variant="minimal"
      ogImage="/og_main.jpg"
      data={locations.main}
      pricing={pricing}
      heroLogo={heroLogo}
      heroImage={heroImage}
      gallery={gallery}
      contactImage={contactImage}
      barbers={locations.main.barbers.map((barber, index) => ({
        ...barber,
        photo: barberPhotos[index % barberPhotos.length],
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
