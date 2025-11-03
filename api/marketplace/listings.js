const { Pool } = require('pg');

// For local/dev testing allow disabling TLS verification. In production
// we rely on the platform's CA trust and do not disable verification.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Only disable TLS verification when explicitly allowed via DEV_ALLOW_INSECURE_TLS
  ssl: process.env.DEV_ALLOW_INSECURE_TLS === 'true' ? { rejectUnauthorized: false } : undefined
});

module.exports = async (req, res) => {
  try {
    const client = await pool.connect();
    try {
      const query = `
        SELECT id, seller_id, main_category, type, title, description, location, price, quantity, status, image_url, created_at
        FROM marketplace_listings
        WHERE status = 'approved'
        ORDER BY created_at DESC
        LIMIT 200
      `;
      const result = await client.query(query);
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(result.rows));
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error in /api/marketplace/listings:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ message: 'Failed to fetch listings' }));
  }
};
