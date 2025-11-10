const { Pool } = require('pg');

// Allow insecure TLS verification in local/dev for convenience. Do NOT
// disable this in production; instead ensure proper CA chain is trusted.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? undefined : { rejectUnauthorized: false }
});

module.exports = async (req, res) => {
  try {
    const client = await pool.connect();
    try {
      const query = `
        SELECT id, name, description, license_type, minerals, location, status, estimated_value, created_at
        FROM projects
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
    console.error('Error in /api/projects:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ message: 'Failed to fetch projects' }));
  }
};
