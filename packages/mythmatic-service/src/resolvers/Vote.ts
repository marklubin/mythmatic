import { Resolvers } from "mythmatic-graphql-schema";

export const voteResolvers: Resolvers = {
  Mutation: {
    vote: async (parent, args, context) => {
      const { linkId } = args;
      const { userId } = context;

      if (!userId) {
        throw new Error("User must be logged in to vote");
      }

      const user = await context.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      const link = await context.prisma.link.update({
        where: {
          id: linkId,
        },
        data: {
          voters: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return { user, link };
    },
  },
};
