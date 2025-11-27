/*
  # Add Bank Account and Business Information

  1. Changes to Tables
    - Add columns to `businesses` table:
      - `owner_name` (text) - Name of business owner
      - `phone` (text) - Business phone number
      - `address` (text) - Business physical address
      - `bank_name` (text) - Bank name
      - `account_type` (text) - Account type (corriente/ahorros)
      - `account_number` (text) - Bank account number
      - `swift_bic` (text) - SWIFT/BIC code

  2. Security
    - All new columns inherit existing RLS policies from businesses table
    - Only authenticated users can view/edit their own business information

  3. Important Notes
    - Safe to run multiple times with IF NOT EXISTS checks
    - Preserves existing business data
    - New columns have default empty values
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'owner_name'
  ) THEN
    ALTER TABLE businesses ADD COLUMN owner_name text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'phone'
  ) THEN
    ALTER TABLE businesses ADD COLUMN phone text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'address'
  ) THEN
    ALTER TABLE businesses ADD COLUMN address text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'bank_name'
  ) THEN
    ALTER TABLE businesses ADD COLUMN bank_name text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'account_type'
  ) THEN
    ALTER TABLE businesses ADD COLUMN account_type text DEFAULT 'corriente' CHECK (account_type IN ('corriente', 'ahorros'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'account_number'
  ) THEN
    ALTER TABLE businesses ADD COLUMN account_number text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'swift_bic'
  ) THEN
    ALTER TABLE businesses ADD COLUMN swift_bic text DEFAULT '';
  END IF;
END $$;