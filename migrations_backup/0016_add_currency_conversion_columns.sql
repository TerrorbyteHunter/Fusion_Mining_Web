-- Add missing columns for currency conversion support
-- Migration: 0016_add_currency_conversion_columns

-- Add currency conversion columns to tier_upgrade_payments table
ALTER TABLE tier_upgrade_payments
ADD COLUMN amount_usd DECIMAL(10,2),
ADD COLUMN exchange_rate DECIMAL(10,6);

-- Update existing records to set amount_usd = amount (since they were originally in USD)
UPDATE tier_upgrade_payments SET amount_usd = amount WHERE amount_usd IS NULL;

-- Make amount_usd NOT NULL after populating existing data
ALTER TABLE tier_upgrade_payments
ALTER COLUMN amount_usd SET NOT NULL;

-- Add currency columns to payment_method_details table
ALTER TABLE payment_method_details
ADD COLUMN currency_code VARCHAR(3) NOT NULL DEFAULT 'USD',
ADD COLUMN currency_name VARCHAR(100) NOT NULL DEFAULT 'US Dollar';

-- Update existing payment methods with correct currency information
UPDATE payment_method_details SET
  currency_code = 'CNY',
  currency_name = 'Chinese Yuan'
WHERE method = 'wechat_alipay';

UPDATE payment_method_details SET
  currency_code = 'ZMW',
  currency_name = 'Zambian Kwacha'
WHERE method IN ('bank_transfer', 'airtel_money');