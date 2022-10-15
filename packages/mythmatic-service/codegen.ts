import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  config: {
    scalars: {
      DateTime: "Date",
    },
  },
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
