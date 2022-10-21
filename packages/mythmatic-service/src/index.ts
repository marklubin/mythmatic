import { ApolloServer } from "apollo-server";
import { context } from "./context";
import { mergeResolvers } from "@graphql-tools/merge";
import { addResolversToSchema } from "@graphql-tools/schema";
import Resolvers from "./resolvers";
import { schemaFilePath } from "mythmatic-graphql-schema";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

async function main() {
  const mergedResolvers = mergeResolvers(Resolvers);

  const MythmaticSchema = loadSchemaSync(schemaFilePath, {
    loaders: [new GraphQLFileLoader()],
  });

  const schemaWithResolvers = addResolversToSchema({
    schema: MythmaticSchema,
    resolvers: mergedResolvers,
  });

  const server = new ApolloServer({
    schema: schemaWithResolvers,
    context,
  });

  const port = 3000;

  server.listen({ port }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
}

main().catch((error) => console.error(error));
