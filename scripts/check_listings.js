const { Client } = require('pg');
(async function(){
  const c = new Client({ connectionString: process.env.DATABASE_URL });
  try{
    await c.connect();
    const res = await c.query("SELECT main_category, service_subcategory, tool_subcategory, title, status FROM marketplace_listings WHERE main_category IN ('mining_equipment','mining_services') ORDER BY created_at DESC LIMIT 50");
    console.table(res.rows);
  }catch(e){
    console.error(e);
  }finally{
    await c.end();
  }
})();
