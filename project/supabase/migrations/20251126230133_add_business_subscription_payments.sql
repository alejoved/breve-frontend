/*
  # Add Business Subscription Payments Table

  1. New Tables
    - `business_subscription_payments`
      - `id` (uuid, primary key) - Payment identifier
      - `business_id` (uuid, references businesses) - Business making the payment
      - `amount` (decimal) - Payment amount to +Breve
      - `payment_date` (timestamptz) - Date of payment
      - `period_start` (timestamptz) - Start of billing period
      - `period_end` (timestamptz) - End of billing period
      - `status` (text) - Payment status (pending, completed, failed)
      - `payment_method` (text) - Method used for payment
      - `notes` (text) - Additional notes
      - `created_at` (timestamptz) - Record creation date
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on business_subscription_payments table
    - Add policies for businesses to view and create their own payments
    - Businesses can only see and manage their own payment records

  3. Important Notes
    - This table tracks payments FROM businesses TO +Breve
    - Different from the payments table which tracks subscriber payments to businesses
    - Status can be: pending, completed, failed
    - Payment methods can be: bank_transfer, card, cash, other
*/

CREATE TABLE IF NOT EXISTS business_subscription_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  amount decimal(10, 2) NOT NULL,
  payment_date timestamptz DEFAULT now(),
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  payment_method text DEFAULT 'bank_transfer' CHECK (payment_method IN ('bank_transfer', 'card', 'cash', 'other')),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE business_subscription_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses can view own subscription payments"
  ON business_subscription_payments FOR SELECT
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Businesses can insert own subscription payments"
  ON business_subscription_payments FOR INSERT
  TO authenticated
  WITH CHECK (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Businesses can update own subscription payments"
  ON business_subscription_payments FOR UPDATE
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_business_subscription_payments_business_id ON business_subscription_payments(business_id);
CREATE INDEX IF NOT EXISTS idx_business_subscription_payments_payment_date ON business_subscription_payments(payment_date);
CREATE INDEX IF NOT EXISTS idx_business_subscription_payments_status ON business_subscription_payments(status);
