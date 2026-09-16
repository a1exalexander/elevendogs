import type { GetStaticProps, NextPage } from "next";
import { Client } from "@notionhq/client";
import { education } from "../data";
import { EducationPage } from "../src/components";
import { fetchGalleryImages } from "../src/services/ApiService";
import { GalleryImage } from "../src/types/GalleryImage";

export interface EducationProps {
  gallery: GalleryImage[];
}

const Education: NextPage<EducationProps> = ({ gallery }) => {
  return <EducationPage data={education} gallery={gallery} />;
};

export const getStaticProps: GetStaticProps<EducationProps> = async () => {
  let gallery: GalleryImage[] = [];

  try {
    const notion = new Client({ auth: process.env.NOTION_SECRET });
    gallery = await fetchGalleryImages(notion, "Освіта");
  } catch (error) {
    console.error("Failed to fetch education gallery from Notion", error);
    // Retry soon rather than pinning an empty page for a whole hour.
    return { props: { gallery }, revalidate: 60 };
  }

  return {
    props: { gallery },
    revalidate: 3600,
  };
};

export default Education;
