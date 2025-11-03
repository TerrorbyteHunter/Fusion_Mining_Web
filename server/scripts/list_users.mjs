import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL not set in environment or .env');
  process.exit(1);
}

const pool = new Pool({ connectionString });

async function run() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT id, email, first_name, last_name, role, created_at FROM users ORDER BY created_at DESC');
    console.log(`Found ${res.rowCount} users:`);
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error('Error listing users:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
