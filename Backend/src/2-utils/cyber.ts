import crypto from "crypto";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../4-models/errors-model";
import { UserForToken } from "../4-models/types";

const secret = "Binyamin is the best programmer in the world!";

const salt = "MakeThingsGoRight";

function hash(plainText: string): string {
  if (!plainText) return null;

  // Hashing with salt:
  const hashText = crypto
    .createHmac("sha512", salt)
    .update(plainText)
    .digest("hex");

  return hashText;
}

function getNewToken(user: UserForToken): string {
  const payload = { user };
  const token = jwt.sign(payload, secret, { expiresIn: "3h" });

  return token;
}

function getUserId(request: Request): number {
  // Extract token header (authorization: Bearer the-token):
  const header = request.headers.authorization;

  // Extract the token:
  const token = header.substring(7);

  // Extract payload:
  const payload = jwt.decode(token);

  // Extract user:
  const user = (payload as any).user;

  // return role:
  return user.userId;
}

function verifyToken(request: Request): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const header = request.headers.authorization;

    if (!header) {
      reject(new UnauthorizedError("No token sent"));
      return;
    }

    const token = header.substring(7);

    // If no token sent:
    if (!token) {
      reject(new UnauthorizedError("No token sent"));
      return;
    }

    jwt.verify(token, secret, (err, payload) => {
      // If token invalid or expired:
      if (err) {
        reject(new UnauthorizedError("Invalid or expired token"));
        return;
      }

      resolve(true);
    });
  });
}

function getTokenRole(request: Request): string {
  // Extract token header (authorization: Bearer the-token):
  const header = request.headers.authorization;

  // Extract the token:
  const token = header.substring(7);

  // Extract payload:
  const payload = jwt.decode(token);

  // Extract user:
  const user = (payload as any).user;

  // return role:
  return user.roleId;
}

export default {
  getNewToken,
  verifyToken,
  getTokenRole,
  getUserId,
  hash,
};
