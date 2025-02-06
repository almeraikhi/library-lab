import { z } from 'zod';
import 'dotenv/config';
import { config } from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';

// Define potential locations for the .env file
const envPaths = [
  resolve(process.cwd(), '.env'), // Adjacent directory
  resolve(process.cwd(), '../../.env'), // Root level of the monorepo
];

// Load the .env file from the first existing path
for (const path of envPaths) {
  if (existsSync(path)) {
    config({ path });
    break; // Stop after loading the first found .env file
  }
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3010),
  DATABASE_URL: z.string(),
  APP_URL: z.string().default('http://localhost:5173'),
});

export const env = envSchema.parse(process.env);
