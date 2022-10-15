import { Resolvers } from "../generated/graphql";

export const userResolvers: Resolvers = {
  User: {
    links: (parent, args, context) => {
      return context.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .links();
    },
    Votes: (parent, args, context) => {
      return context.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .votes();
    },
  },
};
