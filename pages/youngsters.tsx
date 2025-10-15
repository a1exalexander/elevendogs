import React from "react";
import type { GetStaticProps, NextPage } from "next";
import { locations } from "../data";
import logo from "../src/assets/eleven_dogs_logo_2.png";
import { BarbershopPage } from "../src/components";
import image1 from "../src/assets/edy2/DSCF5379-2.jpg";
import image2 from "../src/assets/new2025/1IMG_3516.JPG";
import image3 from "../src/assets/edy2/DSCF5406-2-2.jpg";
import image4 from "../src/assets/edy/b00004.jpg";
import image5 from "../src/assets/new2025/1IMG_3539.JPG";
import image6 from "../src/assets/new2025/1IMG_9791.JPG";
import image8 from "../src/assets/new2025/1IMG_9793.JPG";
import image9 from "../src/assets/new2025/1IMG_9649.JPG";
import { Client } from "@notionhq/client";
import { Pricing } from "../src/types/Pricing";
import { ApiService } from "../src/services/ApiService";

export interface YoungstersProps {
  pricing: Pricing[];
}

const Youngsters: NextPage<YoungstersProps> = ({ pricing }) => {
  return (
    <>
      <BarbershopPage
        ogImage="/og_youngsters.jpg"
        renderMap={
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.041752248158!2d33.4244195155907!3d49.085846879310346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d752fdf4d39067%3A0xacc45b86accd9370!2sSvobody%20Ave%2C%2039%2F43%2C%20Kremenchuk%2C%20Poltavs&#39;ka%20oblast%2C%2039600!5e0!3m2!1sen!2sua!4v1658230504480!5m2!1sen!2sua"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        }
        data={locations.secondary}
        pricing={pricing}
        logo={logo}
        color="#00c800"
        photoGrid={[
          {
            id: 2,
            src: image2,
            type: "vertical",
          },
          {
            id: 5,
            src: image5,
            type: "horizontal",
          },          
          {
            id: 1,
            src: image1,
            type: "vertical",
          },
          {
            id: 9,
            src: image9,
            type: "vertical",
          },
          
          {
            id: 6,
            src: image6,
            type: "vertical",
          },

          {
            id: 3,
            src: image3,
            type: "horizontal",
          },
          
          
          {
            id: 4,
            src: image4,
            type: "vertical",
          },
          {
            id: 8,
            src: image8,
            type: "vertical",
          },
        ]}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });
  const apiService = new ApiService("Свободи", notion);
  const pricing = await apiService.fetchPricing();

  return {
    props: { pricing },
    revalidate: 3600,
  };
};

export default Youngsters;
