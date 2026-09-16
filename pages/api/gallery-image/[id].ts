import { IMAGES_DATABASE_ID } from "../../../src/services/ApiService";
import { createNotionFileHandler } from "../../../src/services/notionFile";

export default createNotionFileHandler({
  databaseId: IMAGES_DATABASE_ID,
  property: "Фото",
  label: "gallery image",
});
