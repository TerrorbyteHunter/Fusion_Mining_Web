import pkg from 'pg';
const { Client } = pkg;
// Parse DATABASE_URL and build an explicit config object so we can
// force ssl.rejectUnauthorized = false for local testing (avoids
// self-signed cert errors). This avoids any ambiguity with connectionString parsing.
function clientConfigFromDatabaseUrl(url) {
  if (!url) throw new Error('DATABASE_URL is not set in the environment');
  const u = new URL(url);
  const config = {
    user: u.username || undefined,
    password: u.password ? decodeURIComponent(u.password) : undefined,
    host: u.hostname,
    port: u.port ? Number(u.port) : undefined,
    database: u.pathname && u.pathname.length > 1 ? u.pathname.slice(1) : undefined,
    // Force SSL options for dev testing. Remove or change for production.
    ssl: { rejectUnauthorized: false }
  };
  return config;
}

(async function(){
  try{
    const cfg = clientConfigFromDatabaseUrl(process.env.DATABASE_URL);
    console.log('Connecting to', cfg.host + ':' + cfg.port, 'db=', cfg.database);
    const c = new Client(cfg);
    await c.connect();
    const res = await c.query("SELECT main_category, service_subcategory, tool_subcategory, title, status FROM marketplace_listings WHERE main_category IN ('mining_equipment','mining_services') ORDER BY created_at DESC LIMIT 50");
    console.table(res.rows);
    await c.end();
  }catch(e){
    console.error(e);
    process.exitCode = 1;
  }
})();
