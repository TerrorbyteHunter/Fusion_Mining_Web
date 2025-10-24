// Database connection for local PostgreSQL
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

const connectionConfig = {
  host: 'localhost',
  port: 5432,
  database: 'fusion_mining',
  user: 'postgres',
  password: '1234'
};

export const pool = new Pool(connectionConfig);
export const db = drizzle(pool, { schema });
