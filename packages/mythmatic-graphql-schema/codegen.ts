import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./data/schema.graphql",
  config: {
    scalars: {
      DateTime: "Date",
    },
  },
  documents: ["./data/operations.graphql"],
  generates: {
    "src/generated.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-operations", "typescript-react-apollo"],
    },
  },
};

export default config;
