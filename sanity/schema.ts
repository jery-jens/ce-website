import { type SchemaTypeDefinition } from "sanity";
import { postType } from "./schemas/post";
import { categoryType } from "./schemas/category";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, categoryType],
};
