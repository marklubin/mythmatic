import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./data/schema.graphql",
  config: {
    scalars: {
      DateTime: "Date",
    },
  },
  generates: {
    "lib/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
