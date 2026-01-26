import { Pool } from 'pg';
import { config } from 'dotenv';

config({ path: '.env' });
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runMigration() {
  try {
    console.log('Running currency conversion migration...');

    // Add missing columns to tier_upgrade_payments table
    await pool.query(`
      ALTER TABLE tier_upgrade_payments
      ADD COLUMN IF NOT EXISTS amount_usd DECIMAL(10,2),
      ADD COLUMN IF NOT EXISTS exchange_rate DECIMAL(10,6)
    `);

    // Update existing records to set amount_usd = amount (since they were originally in USD)
    await pool.query(`
      UPDATE tier_upgrade_payments
      SET amount_usd = amount
      WHERE amount_usd IS NULL
    `);

    // Make amount_usd NOT NULL
    await pool.query(`
      ALTER TABLE tier_upgrade_payments
      ALTER COLUMN amount_usd SET NOT NULL
    `);

    // Add currency columns to payment_method_details table
    await pool.query(`
      ALTER TABLE payment_method_details
      ADD COLUMN IF NOT EXISTS currency_code VARCHAR(3) NOT NULL DEFAULT 'USD',
      ADD COLUMN IF NOT EXISTS currency_name VARCHAR(100) NOT NULL DEFAULT 'US Dollar'
    `);

    // Update existing payment methods with correct currency information
    await pool.query(`
      UPDATE payment_method_details SET
        currency_code = 'CNY',
        currency_name = 'Chinese Yuan'
      WHERE method = 'wechat_alipay'
    `);

    await pool.query(`
      UPDATE payment_method_details SET
        currency_code = 'ZMW',
        currency_name = 'Zambian Kwacha'
      WHERE method IN ('bank_transfer', 'airtel_money')
    `);

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
}

runMigration();