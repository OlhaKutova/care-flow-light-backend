import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import type { GraphQLContext } from '../../types/context.js';
import { MESSAGES } from '../../constants/messages.js';
import { ROLES } from '../../constants/roles.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../../utils/env.js';
import { requireAdmin } from '../../utils/authz.js';

type LoginArgs = { email: string; password: string };
type AuthPayload = { token: string; email: string };

export default {
  Query: {
    viewer: (_p: unknown, _a: unknown, ctx: GraphQLContext): string | null => {
      requireAdmin(ctx);
      return ctx.user?.email ?? null;
    },
  },

  Mutation: {
    login: async (
      _parent: unknown,
      { email, password }: LoginArgs,
      { prisma }: GraphQLContext
    ): Promise<AuthPayload> => {
      const normalizedEmail = email.trim().toLowerCase();

      const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

      console.log('-----email', email);

      if (!user || user.role !== ROLES.ADMIN) {
        throw new GraphQLError(MESSAGES.ERROR.UNAUTHORIZED, {
          extensions: { code: MESSAGES.ERROR.UNAUTHORIZED },
        });
      }

      console.log('-----password', password);
      console.log('-----user.password', user.password);

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new GraphQLError(MESSAGES.ERROR.INVALID_CREDENTIALS, {
          extensions: { code: MESSAGES.ERROR.WRONG_USER_INPUT },
        });
      }

      const options: SignOptions = { expiresIn: JWT_EXPIRES_IN };
      const token = jwt.sign(
        { userId: user.id, role: user.role, email: user.email },
        JWT_SECRET,
        options
      );

      return { token, email: user.email };
    },
  },
};
