import { StaticImageData } from "next/image";

export interface Barber {
  id: string | number;
  name: string;
  role: string;
  bio?: string;
  photo: string | StaticImageData;
}
