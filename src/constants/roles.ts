export const ROLES = {
  ADMIN: 'ADMIN',
  PATIENT: 'PATIENT',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];