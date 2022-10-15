import { Prisma, prisma } from "@prisma/client";
import {
  arg,
  enumType,
  extendType,
  inputObjectType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { Context } from "../context";

export const Feed = objectType({
  name: "Feed",
  definition(t) {
    t.nonNull.list.nonNull.field("links", { type: Link });
    t.nonNull.int("count");
    t.id("id");
  },
});

export const Sort = enumType({
  name: "Sort",
  members: ["asc", "desc"],
});

export const LinkOrderByInput = inputObjectType({
  name: "LinkOrderByInput",
  definition(t) {
    t.field("description", { type: Sort });
    t.field("url", { type: Sort });
    t.field("createdAt", { type: Sort });
  },
});
export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("description");
    t.nonNull.string("url");
    t.nonNull.dateTime("createdAt");
    t.field("postedBy", {
      type: "User",
      resolve(parent, args, context) {
        return context.prisma.link
          .findUnique({ where: { id: parent.id } })
          .postedBy();
      },
    });
    t.nonNull.list.nonNull.field("voters", {
      type: "User",
      resolve(parent, args, context) {
        return context.prisma.link
          .findUnique({ where: { id: parent.id } })
          .voters();
      },
    });
  },
});

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("feed", {
      type: "Feed",
      args: {
        filter: stringArg(),
        skip: intArg(),
        take: intArg(),
        orderBy: arg({
          type: list(nonNull(LinkOrderByInput)),
        }),
      },
      async resolve(parent, args, context: Context, info) {
        const where = args.filter
          ? {
              OR: [
                { description: { contains: args.filter } },
                { url: { contains: args.filter } },
              ],
            }
          : {};
        const links = await context.prisma.link.findMany({
          where,
          skip: args?.skip as number | undefined,
          take: args?.take as number | undefined,
          orderBy: args.orderBy as
            | Prisma.Enumerable<Prisma.LinkOrderByWithRelationInput>
            | undefined,
        });
        const count = await context.prisma.link.count({ where });
        const id = `main-feed:${JSON.stringify(args)}`;

        return {
          links,
          count,
          id,
        };
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
      resolve(parent, args, context: Context) {
        const { description, url } = args;

        const { userId } = context;

        if (!userId) {
          throw new Error("Cannot post without logging in.");
        }

        const newLink = context.prisma.link.create({
          data: {
            description: description,
            url: url,
            postedBy: {
              connect: {
                id: userId,
              },
            },
          },
        });

        return newLink;
      },
    }),
      t.field("updatePost", {
        type: "Link",
        args: {
          description: nonNull(stringArg()),
          url: nonNull(stringArg()),
          id: nonNull(intArg()),
        },
        resolve(parent, args, context: Context) {
          const { description, url, id } = args;
          return context.prisma.link
            .update({
              where: {
                id: id,
              },
              data: {
                description: description,
                url: url,
              },
            })
            .catch((error) => {
              console.log(error);
              return null;
            });
        },
      }),
      t.nonNull.field("deletePost", {
        type: "Boolean",
        args: {
          id: nonNull(intArg()),
        },
        resolve(parent, args, context: Context) {
          const { id } = args;

          return context.prisma.link
            .delete({
              where: {
                id: id,
              },
            })
            .then((v) => {
              return true;
            })
            .catch((error) => {
              console.log(error);
              return false;
            });
        },
      });
  },
});
