-- Migration 0009: ensure main_category contains 'mining_equipment'
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid
    WHERE t.typname = 'main_category' AND e.enumlabel = 'mining_equipment'
  ) THEN
    ALTER TYPE main_category ADD VALUE 'mining_equipment';
  END IF;
END$$;
