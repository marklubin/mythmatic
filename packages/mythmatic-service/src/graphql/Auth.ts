import { extendType, nonNull, objectType, stringArg } from "nexus";
import { User } from "./User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils/auth";

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.nonNull.string("token");
    t.nonNull.field("user", {
      type: "User",
    });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("signup", {
      type: "AuthPayload",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
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
          user: User,
        };
      },
    }),
      t.nonNull.field("login", {
        type: "AuthPayload",
        args: {
          email: nonNull(stringArg()),
          password: nonNull(stringArg()),
        },
        async resolve(parent, args, context) {
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
      });
  },
});
