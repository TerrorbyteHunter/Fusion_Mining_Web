-- Migration: Add rejectionReason to buyer_requests
ALTER TABLE buyer_requests ADD COLUMN rejection_reason TEXT;