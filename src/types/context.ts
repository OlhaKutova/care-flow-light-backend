import type { PrismaClient } from '@prisma/client';
import type { Request as ExpressRequest } from 'express-serve-static-core';

export interface GraphQLContext {
  prisma: PrismaClient;
  req: ExpressRequest;
}
