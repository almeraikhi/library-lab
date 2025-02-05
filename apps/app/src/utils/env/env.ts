import { z } from 'zod';

const envSchema = z.object({
  VITE_SERVER_URL: z.string().default('http://localhost:3010'),
});

export const env = envSchema.parse(import.meta.env);
