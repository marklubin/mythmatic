import { ApolloServer, gql } from "apollo-server";
import { context } from "./context";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { mergeResolvers } from "@graphql-tools/merge";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import Resolvers from "./resolvers";

async function main() {
  const schema = await loadSchema(join(process.cwd(), "schema.graphql"), {
    loaders: [new GraphQLFileLoader()],
  });

  const mergedResolvers = mergeResolvers(Resolvers);

  const schemaWithResolvers = addResolversToSchema({
    schema,
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
