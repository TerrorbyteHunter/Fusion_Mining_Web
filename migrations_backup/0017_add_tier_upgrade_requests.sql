-- Add tier upgrade requests table
CREATE TABLE tier_upgrade_requests (
  id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  requested_tier membership_tier NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  rejection_reason TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by VARCHAR(255) REFERENCES users(id),
  document_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Update tier_upgrade_payments to reference the new table
ALTER TABLE tier_upgrade_payments
ADD CONSTRAINT fk_tier_upgrade_payments_upgrade_request_id
FOREIGN KEY (upgrade_request_id) REFERENCES tier_upgrade_requests(id) ON DELETE CASCADE;

-- Add indexes for better performance
CREATE INDEX idx_tier_upgrade_requests_user_id ON tier_upgrade_requests(user_id);
CREATE INDEX idx_tier_upgrade_requests_status ON tier_upgrade_requests(status);
CREATE INDEX idx_tier_upgrade_requests_created_at ON tier_upgrade_requests(created_at);