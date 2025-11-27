/*
  # Add phone column to subscribers table

  1. Changes
    - Add `phone` column to `subscribers` table
      - Type: text (optional)
      - Used for WhatsApp contact functionality
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'subscribers' AND column_name = 'phone'
  ) THEN
    ALTER TABLE subscribers ADD COLUMN phone text;
  END IF;
END $$;
