import * as jwt from "jsonwebtoken";

export const APP_SECRET = "blahahahbishg9i";

export interface AuthTokenPayload {
  userId: number;
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("Token not provided");
  }

  return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
}
