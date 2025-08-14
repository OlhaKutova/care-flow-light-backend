import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import express from 'express';
import cors from 'cors';

import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './utils/env.js';
import type { GraphQLContext } from './types/context.js';

import resolvers from './graphql/resolvers/index.js';
import typeDefs from './graphql/typeDefs/index.js';
import { prisma } from './db/prisma.js';
import { ROLES } from './constants/roles.js';
import type { Role } from './constants/roles.js';

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(express.json());

const server = new ApolloServer<GraphQLContext>({ typeDefs, resolvers });
await server.start();

app.use(
  '/graphql',
  expressMiddleware<GraphQLContext>(server, {
    context: async ({ req }) => {
      const auth = req.headers.authorization ?? '';
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : undefined;

      let user: GraphQLContext['user'] = null;

      if (token) {
        try {
          const decoded = jwt.verify(token, JWT_SECRET);

          if (typeof decoded !== 'string') {
            const payload = decoded as jwt.JwtPayload & {
              userId?: string;
              email?: string;
              role?: Role;
            };

            const isValidRole =
              payload.role === ROLES.ADMIN || payload.role === ROLES.PATIENT;

            if (payload.userId && payload.email && isValidRole) {
              user = {
                userId: payload.userId,
                email: payload.email,
                role: payload.Role,
              };
            }
          }
        } catch {
          user = null;
        }
      }

      return { prisma, req, user };
    },
  })
);

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`http://localhost:${port}/graphql`);
});
