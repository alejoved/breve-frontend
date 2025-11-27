/*
  # Add contract field to plans table

  1. Changes
    - Add `contract` column to `plans` table
      - Type: text
      - Nullable: true
      - Default: empty string
      - Description: Stores the contract terms that will be displayed during subscription flow

  2. Purpose
    - Allow businesses to add custom contract terms for each plan
    - Contract will be shown to users during the subscription process
    - Optional field - can be left empty if no contract is needed
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'plans' AND column_name = 'contract'
  ) THEN
    ALTER TABLE plans ADD COLUMN contract text DEFAULT '';
  END IF;
END $$;