import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { GraphQLContext } from "./types/context.js";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/typeDefs/index.js";
import { prisma } from "./db/prisma.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(express.json());

const server = new ApolloServer<GraphQLContext>({ typeDefs, resolvers });
await server.start();

app.use(
  '/graphql',
  expressMiddleware<GraphQLContext>(server, {
    context: async ({ req }) => ({ prisma, req })
  })
);

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`http://localhost:${port}/graphql`);
});
