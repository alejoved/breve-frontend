/*
  # Create withdrawals table

  1. New Tables
    - `withdrawals`
      - `id` (uuid, primary key)
      - `business_id` (uuid, foreign key to businesses)
      - `amount` (numeric, withdrawal amount)
      - `status` (text, withdrawal status: pending, completed, rejected)
      - `created_at` (timestamptz, when withdrawal was requested)
      - `completed_at` (timestamptz, when withdrawal was completed)
      
  2. Security
    - Enable RLS on `withdrawals` table
    - Add policy for businesses to view their own withdrawals
    - Add policy for businesses to create new withdrawal requests
*/

CREATE TABLE IF NOT EXISTS withdrawals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'rejected')),
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses can view own withdrawals"
  ON withdrawals
  FOR SELECT
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Businesses can create withdrawal requests"
  ON withdrawals
  FOR INSERT
  TO authenticated
  WITH CHECK (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_withdrawals_business_id ON withdrawals(business_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_created_at ON withdrawals(created_at);