import type { NextPage } from "next";
import { education } from "../data";
import { EducationPage } from "../src/components";

const Education: NextPage = () => {
  return <EducationPage data={education} />;
};

export default Education;
