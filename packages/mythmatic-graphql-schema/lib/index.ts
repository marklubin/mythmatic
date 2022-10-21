import { join } from "path";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

export * from "./generated";

export const MythmaticSchema = loadSchemaSync(
  join(__dirname, "/../data/schema.graphql"),
  {
    loaders: [new GraphQLFileLoader()],
  }
);
