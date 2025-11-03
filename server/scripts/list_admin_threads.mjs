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
    console.log('Listing project_interest threads...');

    const threadsRes = await client.query(
      `SELECT mt.id, mt.title, mt.type, mt.project_id, p.name AS project_name, mt.buyer_id, u.first_name, u.last_name, mt.created_at
       FROM message_threads mt
       LEFT JOIN projects p ON p.id = mt.project_id
       LEFT JOIN users u ON u.id = mt.buyer_id
       WHERE mt.type = 'project_interest'
       ORDER BY mt.created_at DESC`);

    console.log(`Found ${threadsRes.rowCount} project_interest threads\n`);

    for (const row of threadsRes.rows) {
      const threadId = row.id;
      const projectName = row.project_name || row.project_id;
      const buyerName = (row.first_name || '') + (row.last_name ? (' ' + row.last_name) : '');

      const msgCountRes = await client.query('SELECT COUNT(*)::int AS cnt FROM messages WHERE thread_id = $1', [threadId]);
      const msgCount = msgCountRes.rows[0].cnt;

      const sampleMsgRes = await client.query('SELECT id, sender_id, receiver_id, subject, content, related_project_id, created_at FROM messages WHERE thread_id = $1 ORDER BY created_at ASC LIMIT 5', [threadId]);

      const expressRes = await client.query('SELECT id, created_at FROM express_interest WHERE project_id = $1 AND user_id = $2 ORDER BY created_at DESC LIMIT 5', [row.project_id, row.buyer_id]);

      console.log('---');
      console.log(`Thread: ${threadId}`);
      console.log(` Title : ${row.title}`);
      console.log(` Project: ${projectName}`);
      console.log(` Buyer : ${buyerName || row.buyer_id}`);
      console.log(` Created: ${row.created_at}`);
      console.log(` Messages: ${msgCount}`);
      console.log(` Express interest rows matching (most recent 5): ${expressRes.rowCount}`);
      if (expressRes.rowCount > 0) {
        console.log(JSON.stringify(expressRes.rows, null, 2));
      }

      if (sampleMsgRes.rowCount > 0) {
        console.log(' Sample messages:');
        for (const m of sampleMsgRes.rows) {
          console.log(`  - [${m.created_at}] ${m.subject || '(no subject)'} -> ${m.content?.substring(0, 120).replace(/\n/g, ' ')}${m.content && m.content.length > 120 ? '...' : ''}`);
        }
      } else {
        console.log(' No messages in thread');
      }
      console.log('\n');
    }

    console.log('Done.');
  } catch (err) {
    console.error('Error listing threads:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
