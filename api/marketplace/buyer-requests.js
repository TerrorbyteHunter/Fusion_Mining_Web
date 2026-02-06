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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

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
      // Focused debug log for this endpoint only
      const buyerId = req.auth?.userId || req.user?.id;
      if (buyerId) {
        console.log(`[BuyerRequestsAPI] Authenticated buyerId: ${buyerId}`);
      } else {
        console.log(`[BuyerRequestsAPI] Public/unauthenticated request`);
      }

      let query;
      let params = [];

      if (buyerId) {
        query = `
          SELECT 
            id,
            item_id as "itemId",
            buyer_id as "buyerId",
            main_category as "mainCategory",
            mineral_subcategory as "mineralSubcategory",
            tool_subcategory as "toolSubcategory",
            service_subcategory as "serviceSubcategory",
            ppe_subcategory as "ppeSubcategory",
            specific_type as "specificType",
            mineral_type as "mineralType",
            title,
            description,
            quantity,
            budget,
            location,
            country,
            verified,
            expiry_date as "expiryDate",
            status,
            created_at as "createdAt",
            updated_at as "updatedAt"
          FROM buyer_requests
          WHERE buyer_id = $1
          ORDER BY created_at DESC
          LIMIT 200
        `;
        params = [buyerId];
      } else {
        query = `
          SELECT 
            id,
            item_id as "itemId",
            buyer_id as "buyerId",
            main_category as "mainCategory",
            mineral_subcategory as "mineralSubcategory",
            tool_subcategory as "toolSubcategory",
            service_subcategory as "serviceSubcategory",
            ppe_subcategory as "ppeSubcategory",
            specific_type as "specificType",
            mineral_type as "mineralType",
            title,
            description,
            quantity,
            budget,
            location,
            country,
            verified,
            expiry_date as "expiryDate",
            status,
            created_at as "createdAt",
            updated_at as "updatedAt"
          FROM buyer_requests
          WHERE status = 'active'
          ORDER BY created_at DESC
          LIMIT 200
        `;
      }

      const result = await client.query(query, params);
      // Log the number of requests returned for debugging
      console.log(`[BuyerRequestsAPI] Returned ${result.rows.length} requests for ${buyerId ? 'buyer' : 'public'}`);
      res.statusCode = 200;
      res.end(JSON.stringify(result.rows || []));
    } finally {
      client.release();
    }
  } catch (err) {
    // Only log errors for this endpoint
    console.error('[BuyerRequestsAPI] Error:', err);
    res.statusCode = 500;
    res.end(JSON.stringify({ 
      message: 'Failed to fetch buyer requests',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    }));
  }
      code: err.code,
      stack: err.stack
    });
    res.statusCode = 500;
    res.end(JSON.stringify({ 
      message: 'Failed to fetch buyer requests',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    }));
  }
};

