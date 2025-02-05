import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3010),
  DATABASE_URL: z.string(),
  APP_URL: z.string().default('http://localhost:5173'),
});

export const env = envSchema.parse(process.env);
