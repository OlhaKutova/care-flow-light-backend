import dotenv from 'dotenv';
dotenv.config();

export function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export const JWT_SECRET = requiredEnv('JWT_SECRET');
export const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN ?? '86400', 10);
