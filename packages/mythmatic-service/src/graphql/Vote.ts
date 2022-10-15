import { extendType, intArg, nonNull, objectType } from "nexus";

export const Vote = objectType({
  name: "Vote",
  definition(t) {
    t.nonNull.field("link", { type: "Link" });
    t.nonNull.field("user", { type: "User" });
  },
});

export const VoteMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("vote", {
      type: "Vote",
      args: {
        linkId: nonNull(intArg()),
      },
      async resolve(parent, args, context) {
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
    });
  },
});
