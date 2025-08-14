import { GraphQLError } from 'graphql';

import type { GraphQLContext } from '../types/context.js';
import { ROLES } from "../constants/roles.js";
import { MESSAGES } from "../constants/messages.js";

export function requireAdmin(ctx: GraphQLContext): void {
  if (!ctx.user || ctx.user.role !== ROLES.ADMIN) {
    throw new GraphQLError(MESSAGES.ERROR.ADMIN_ACCESS_REQUIRED, {
      extensions: { code: MESSAGES.ERROR.FORBIDDEN }
    });
  }
}
