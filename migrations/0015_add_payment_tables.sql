-- Add payment method enum and payment tables
CREATE TYPE payment_method AS ENUM ('bank_transfer', 'airtel_money', 'wechat_alipay');

-- Create tier upgrade payments table
CREATE TABLE tier_upgrade_payments (
  id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
  upgrade_request_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  requested_tier membership_tier NOT NULL,
  payment_method payment_method NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'ZMW',
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_details JSONB,
  proof_of_payment_url VARCHAR(500),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by VARCHAR(255) REFERENCES users(id),
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create payment method details table
CREATE TABLE payment_method_details (
  id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
  method payment_method NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  instructions TEXT,
  account_details JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Add indexes for better performance
CREATE INDEX idx_tier_upgrade_payments_user_id ON tier_upgrade_payments(user_id);
CREATE INDEX idx_tier_upgrade_payments_upgrade_request_id ON tier_upgrade_payments(upgrade_request_id);
CREATE INDEX idx_tier_upgrade_payments_status ON tier_upgrade_payments(status);
CREATE INDEX idx_payment_method_details_method ON payment_method_details(method);