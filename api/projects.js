import pkg from 'pg';
const { Pool } = pkg;

// Configure pool with proper SSL for Supabase on Vercel
const dbUrl = process.env.DATABASE_URL || '';
if (!dbUrl) {
  console.error('DATABASE_URL environment variable is not set');
}

const isSupabase = dbUrl.includes('supabase') || dbUrl.includes('supabase.co');
const pool = new Pool({
  connectionString: dbUrl,
  // Supabase requires SSL connections
  ssl: isSupabase 
    ? { rejectUnauthorized: false }
    : process.env.DEV_ALLOW_INSECURE_TLS === 'true' 
      ? { rejectUnauthorized: false } 
      : undefined,
  // Optimize for serverless: smaller pool, shorter timeouts
  max: 1, // Single connection for serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export default async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.end(JSON.stringify({ message: 'Method not allowed' }));
    return;
  }

  try {
    if (!dbUrl) {
      throw new Error('DATABASE_URL is not configured');
    }

    const client = await pool.connect();
    try {
      const query = `
        SELECT id, name, description, license_type, minerals, location, status, estimated_value, created_at
        FROM projects
        WHERE status = 'active'
        ORDER BY created_at DESC
        LIMIT 200
      `;
      const result = await client.query(query);
      res.statusCode = 200;
      res.end(JSON.stringify(result.rows || []));
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error in /api/projects:', err);
    console.error('Error details:', {
      message: err.message,
      code: err.code,
      stack: err.stack
    });
    res.statusCode = 500;
    res.end(JSON.stringify({ 
      message: 'Failed to fetch projects',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    }));
  }
};
