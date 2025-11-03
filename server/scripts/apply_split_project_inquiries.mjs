import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL not set in environment or .env');
  process.exit(1);
}

const pool = new Pool({ connectionString });

async function run() {
  const sql = readFileSync(new URL('../../migrations/0007_split_project_inquiries_into_threads.sql', import.meta.url), 'utf-8');

  // Extract the main transactional block between BEGIN; and COMMIT;
  const beginIndex = sql.indexOf('\nBEGIN;');
  const commitIndex = sql.indexOf('\nCOMMIT;');
  if (beginIndex === -1 || commitIndex === -1) {
    console.error('Could not find transactional block (BEGIN...COMMIT) in migration file. Aborting.');
    process.exit(1);
  }

  const txSql = sql.slice(beginIndex + 1, commitIndex + 8); // include COMMIT;

  console.log('Applying migration transactional block...');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(txSql);
    await client.query('COMMIT');
    console.log('Migration applied successfully.');
  } catch (err) {
    console.error('Error applying migration, rolling back:', err);
    try { await client.query('ROLLBACK'); } catch (e) { console.error('Rollback failed:', e); }
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
