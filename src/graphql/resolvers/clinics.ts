import type { GraphQLContext } from '../../types/context.js';

const Query = {
  clinics: (_: unknown, __: unknown, { prisma }: GraphQLContext) =>
    prisma.clinic.findMany({ orderBy: { name: 'asc' } }),
};

//  TODO
const Mutation = {};

export default { Query, Mutation };
