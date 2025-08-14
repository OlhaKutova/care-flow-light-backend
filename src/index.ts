import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import typeDefs from './graphql/typeDefs/index.js';
import resolvers from './graphql/resolvers/index.js';

dotenv.config();
const prisma = new PrismaClient();
const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(express.json());

app.use('/graphql', expressMiddleware(server, {
  context: async ({ req }) => ({ prisma, req }),
}));

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`🚀 http://localhost:${port}/graphql`));
