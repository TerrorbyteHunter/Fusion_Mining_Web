// JS migration script: use pool queries to avoid TypeScript drizzle typing headaches
require('dotenv').config();
const { pool } = require('../db');

(async function(){
  const client = await pool.connect();
  try {
    console.log('Migrating messages without thread_id into threads...');
    const msgsRes = await client.query("SELECT * FROM messages WHERE thread_id IS NULL");
    const msgs = msgsRes.rows;
    console.log('Found', msgs.length, 'messages without thread_id');

    for (const m of msgs) {
      try {
        const senderRes = await client.query('SELECT id, role FROM users WHERE id = $1 LIMIT 1', [m.sender_id]);
        const receiverRes = await client.query('SELECT id, role FROM users WHERE id = $1 LIMIT 1', [m.receiver_id]);
        const sender = senderRes.rows[0];
        const receiver = receiverRes.rows[0];

        const buyerId = sender?.role === 'buyer' ? sender.id : (receiver?.role === 'buyer' ? receiver.id : (sender?.id || m.sender_id));
        const sellerId = sender?.role === 'seller' ? sender.id : (receiver?.role === 'seller' ? receiver.id : null);

        // try to find an existing thread
        const threadRes = await client.query('SELECT id FROM message_threads WHERE buyer_id = $1 LIMIT 1', [buyerId]);
        let threadId = threadRes.rows[0]?.id;
        if (!threadId) {
          const title = m.subject || (m.content && m.content.slice(0,80)) || 'Conversation';
          const insertRes = await client.query(
            `INSERT INTO message_threads (title, buyer_id, seller_id, listing_id, project_id, context) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
            [String(title).slice(0,255), buyerId, sellerId, m.related_listing_id || null, m.related_project_id || null, m.context || 'general']
          );
          threadId = insertRes.rows[0].id;
        }

        await client.query('UPDATE messages SET thread_id = $1 WHERE id = $2', [threadId, m.id]);
        console.log('Migrated message', m.id, '-> thread', threadId);
      } catch (err: any) {
        console.error('Failed migrating message', m.id, err?.message || err);
      }
    }

    console.log('Migration complete');
  } finally {
    client.release();
    process.exit(0);
  }
})();
