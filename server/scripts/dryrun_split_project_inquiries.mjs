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
  try {
    console.log('Running dry-run for splitting project inquiries...');

    const dry1 = `
      SELECT ei.id AS express_interest_id, ei.project_id, ei.user_id AS buyer_id, p.name AS project_name, ei.created_at
      FROM express_interest ei
      JOIN projects p ON p.id = ei.project_id
      LEFT JOIN message_threads mt
        ON mt.project_id = ei.project_id
        AND mt.buyer_id = ei.user_id
        AND mt.type = 'project_interest'
      WHERE ei.project_id IS NOT NULL
        AND mt.id IS NULL
      ORDER BY ei.created_at DESC
      LIMIT 200;
    `;

    const dry2 = `
      SELECT ei.project_id, ei.user_id AS buyer_id, p.name AS project_name, COUNT(m.id) AS messages_matching
      FROM express_interest ei
      JOIN projects p ON p.id = ei.project_id
      JOIN messages m ON m.related_project_id = ei.project_id
        AND (m.sender_id = ei.user_id OR m.receiver_id = ei.user_id)
      LEFT JOIN message_threads mt
        ON mt.project_id = ei.project_id
        AND mt.buyer_id = ei.user_id
        AND mt.type = 'project_interest'
      WHERE ei.project_id IS NOT NULL
        AND mt.id IS NULL
      GROUP BY ei.project_id, ei.user_id, p.name
      ORDER BY messages_matching DESC
      LIMIT 200;
    `;

    const client = await pool.connect();
    try {
      const res1 = await client.query(dry1);
      console.log(`\nExpress interest rows missing threads: ${res1.rowCount}`);
      if (res1.rowCount > 0) {
        console.log('Sample rows (up to 20):');
        console.log(JSON.stringify(res1.rows.slice(0, 20), null, 2));
      }

      const res2 = await client.query(dry2);
      console.log(`\nCounts of messages that WOULD be reassigned (rows): ${res2.rowCount}`);
      if (res2.rowCount > 0) {
        console.log('Top counts:');
        console.log(JSON.stringify(res2.rows.slice(0, 50), null, 2));
      }
    } finally {
      client.release();
    }

    await pool.end();
    console.log('\nDry-run complete. Review the sample rows and confirm if you want to apply the migration.');
  } catch (err) {
    console.error('Error running dry-run:', err);
    await pool.end();
    process.exit(1);
  }
}

run();
