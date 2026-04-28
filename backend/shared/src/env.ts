import { z } from 'zod';

export const backendEnvSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  REDIS_URL: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  PORT: z.coerce.number().int().positive().default(4000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

export type BackendEnv = z.infer<typeof backendEnvSchema>;

export const loadBackendEnv = (input: NodeJS.ProcessEnv = process.env): BackendEnv => {
  const result = backendEnvSchema.safeParse(input);

  if (!result.success) {
    throw new Error(`Invalid environment configuration: ${result.error.message}`);
  }

  return result.data;
};
