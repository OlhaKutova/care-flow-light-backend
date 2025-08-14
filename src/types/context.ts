import type { PrismaClient } from '@prisma/client';
import type { Request as ExpressRequest } from 'express-serve-static-core';
import { Role } from "../constants/roles.js";

export type AuthUser = {
  userId: string;
  email: string;
  role: Role;
};

export interface GraphQLContext {
  prisma: PrismaClient;
  req: ExpressRequest;
  user: AuthUser | null;
}
