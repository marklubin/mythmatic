import { ApolloServer } from "apollo-server";
import { context } from "./context";
import { mergeResolvers } from "@graphql-tools/merge";
import { addResolversToSchema } from "@graphql-tools/schema";
import Resolvers from "./resolvers";
import { MythmaticSchema } from "mythmatic-graphql-schema";

async function main() {
  const mergedResolvers = mergeResolvers(Resolvers);

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
