import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const Link = objectType({
  name: "Link", // <- Name of your type
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("description");
    t.nonNull.string("url");
  },
});

const links: NexusGenObjects["Link"][] = [
  // 1
  {
    id: 1,
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
    id: 2,
    url: "graphql.org",
    description: "GraphQL official website",
  },
];

const findLink: (id: number) => NexusGenObjects["Link"] | undefined = (
  id: number
) => {
  return links.find((l) => l.id === id);
};

export const LinkQuery = extendType({
  // 2
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      // 3
      type: "Link",
      resolve(parent, args, context, info) {
        // 4
        return links;
      },
    });
  },
});

export const LinkMututation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { description, url } = args;

        let idCount = links.length + 1;

        let link = {
          id: idCount,
          description: description,
          url: url,
        };

        links.push(link);
        return link;
      },
    }),
      t.field("updatePost", {
        type: "Link",
        args: {
          description: nonNull(stringArg()),
          url: nonNull(stringArg()),
          id: nonNull(intArg()),
        },
        resolve(parent, args, context) {
          const { description, url, id } = args;
          const link = findLink(id);

          if (!link) {
            return null;
          }
          link.description = description;
          link.url = url;
          return link;
        },
      }),
      t.nonNull.field("deletePost", {
        type: "Boolean",
        args: {
          id: nonNull(intArg()),
        },
        resolve(parent, args, context) {
          const { id } = args;

          const link = findLink(id);

          if (!link) {
            return false;
          }
          const idx = links.indexOf(link);
          links.splice(idx, 1);
          return true;
        },
      });
  },
});
