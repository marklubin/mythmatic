import { Prisma } from "@prisma/client";
import { Resolvers } from "mythmatic-graphql-schema";

export const linkResolvers: Resolvers = {
  Query: {
    feed: async (parent, args, context) => {
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
  },
  Mutation: {
    post: (parent, args, context) => {
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
    updatePost: (parent, args, context) => {
      const { description, url, id } = args;
      return context.prisma.link.update({
        where: {
          id: id,
        },
        data: {
          description: description,
          url: url,
        },
      });
    },
    deletePost: (parent, args, context) => {
      const { id } = args;

      context.prisma.link.delete({
        where: {
          id: id,
        },
      });
      return true;
    },
  },
  Link: {
    postedBy: (parent, args, context) => {
      return context.prisma.link
        .findUnique({ where: { id: parent.id } })
        .postedBy();
    },
    voters: (parent, args, context) => {
      return context.prisma.link
        .findUnique({ where: { id: parent.id } })
        .voters();
    },
  },
};
