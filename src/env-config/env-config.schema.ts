import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number(),

  MONGO_DB_USERNAME: z.string(),
  MONGO_DB_PASSWORD: z.string(),
  MONGO_DB_NAME: z.string(),
});

export type Env = z.infer<typeof envSchema>;
