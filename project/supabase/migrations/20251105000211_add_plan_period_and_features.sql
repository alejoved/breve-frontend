/*
  # Add period and features to plans

  1. Changes
    - Add `period` column to plans table (monthly/yearly)
    - Add `features` column to plans table (array of text)
  
  2. Notes
    - Default period is 'monthly'
    - Features stored as JSON array
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'plans' AND column_name = 'period'
  ) THEN
    ALTER TABLE plans ADD COLUMN period text DEFAULT 'monthly';
    ALTER TABLE plans ADD CONSTRAINT plans_period_check 
      CHECK (period IN ('monthly', 'yearly'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'plans' AND column_name = 'features'
  ) THEN
    ALTER TABLE plans ADD COLUMN features jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;