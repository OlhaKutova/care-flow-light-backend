import type { GraphQLContext } from '../../types/context.js';
import { ConsultStatus } from '@prisma/client';

type ConsultationsArgs = {
  clinicSlug?: string;
  status?: ConsultStatus;
  q?: string;
  skip?: number;
  take?: number;
};

type IdArg = { id: string };

const Query = {
  consultations: async (_: unknown, args: ConsultationsArgs, { prisma }: GraphQLContext) => {
    const { clinicSlug, status, q, skip = 0, take = 20 } = args;

    return prisma.consultation.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(clinicSlug ? { clinic: { is: { slug: clinicSlug } } } : {}),
        ...(q
          ? {
            OR: [
              { summary: { contains: q, mode: 'insensitive' } },
              { patient: { is: { name: { contains: q, mode: 'insensitive' } } } },
            ],
          }
          : {}),
      },
      include: { clinic: true, patient: true, notes: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  },

  consultation: (_: unknown, { id }: IdArg, { prisma }: GraphQLContext) =>
    prisma.consultation.findUnique({
      where: { id },
      include: { clinic: true, patient: true, notes: true },
    }),
};

// TODO
const Mutation = {};

const Consultation = {
  clinic: (parent: { clinicId: string }, _a: unknown, { prisma }: GraphQLContext) =>
    prisma.clinic.findUnique({ where: { id: parent.clinicId } }),
  patient: (parent: { patientId: string }, _a: unknown, { prisma }: GraphQLContext) =>
    prisma.patient.findUnique({ where: { id: parent.patientId } }),
  notes: (parent: { id: string }, _a: unknown, { prisma }: GraphQLContext) =>
    prisma.note.findMany({ where: { consultationId: parent.id } }),
};

export default { Query, Mutation, Consultation };
