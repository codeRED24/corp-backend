import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/database/schema/*.ts',
  out: 'src/database/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST ?? '',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME ?? '',
  },
});
