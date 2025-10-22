import { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Singleton: Home Page
      S.listItem().title("Home Page").child(
        S.document().schemaType("homePage").documentId("homePage") // fixed ID
      ),
      // Add more pages below later if needed
    ]);
