import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { ReplicateClient } from "./replicate/Replicate";
import { decodeAuthHeader, AuthTokenPayload } from "./utils/auth";
const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  replicateClient: ReplicateClient;
  userId?: number;
}

export const context = ({ req }: { req: Request }): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    prisma,
    userId: token?.userId,
    replicateClient: new ReplicateClient(),
  };
};
