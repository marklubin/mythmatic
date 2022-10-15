import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils/auth";
import { Resolvers } from "../generated/graphql";

export const authResolvers: Resolvers = {
  Mutation: {
    signup: async (parent, args, context) => {
      const { email, password, name } = args;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await context.prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          name: name,
        },
      });

      return {
        token: jwt.sign({ userId: newUser.id }, APP_SECRET),
        user: newUser,
      };
    },
    login: async (parent, args, context) => {
      const { email, password } = args;

      const user = await context.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user == null) {
        throw new Error("User not found.");
      }
      const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid) {
        throw new Error("Incorrect password.");
      }
      const token = jwt.sign({ userId: user.id }, APP_SECRET);
      return {
        token,
        user,
      };
    },
  },
};
