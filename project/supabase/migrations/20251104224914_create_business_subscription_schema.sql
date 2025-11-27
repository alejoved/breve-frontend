/*
  # Create Business Subscription Management Schema

  1. New Tables
    - `businesses`
      - `id` (uuid, primary key) - Unique business identifier
      - `user_id` (uuid, references auth.users) - Link to authenticated user
      - `name` (text) - Business name
      - `email` (text) - Business contact email
      - `created_at` (timestamptz) - Account creation date
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `plans`
      - `id` (uuid, primary key) - Plan identifier
      - `business_id` (uuid, references businesses) - Owner business
      - `name` (text) - Plan name (e.g., "Plan Premium", "Plan Básico")
      - `price` (decimal) - Monthly price
      - `description` (text) - Plan description
      - `is_active` (boolean) - Whether plan is active
      - `created_at` (timestamptz) - Plan creation date
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `subscribers`
      - `id` (uuid, primary key) - Subscriber identifier
      - `business_id` (uuid, references businesses) - Business owner
      - `plan_id` (uuid, references plans) - Subscribed plan
      - `name` (text) - Subscriber name
      - `email` (text) - Subscriber email
      - `status` (text) - Subscription status (active, cancelled, pending)
      - `started_at` (timestamptz) - Subscription start date
      - `cancelled_at` (timestamptz) - Cancellation date if applicable
      - `created_at` (timestamptz) - Record creation date
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `payments`
      - `id` (uuid, primary key) - Payment identifier
      - `business_id` (uuid, references businesses) - Business receiving payment
      - `subscriber_id` (uuid, references subscribers) - Paying subscriber
      - `amount` (decimal) - Payment amount
      - `payment_date` (timestamptz) - Date of payment
      - `created_at` (timestamptz) - Record creation date

  2. Security
    - Enable RLS on all tables
    - Add policies for businesses to access only their own data
    - Authenticated users can only see data for their business
    - All operations restricted by business ownership

  3. Important Notes
    - Businesses are linked to auth.users via user_id
    - All financial data is scoped to business_id for security
    - Cascade deletes ensure data integrity
    - Timestamps track all data changes
*/

-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses can view own data"
  ON businesses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Businesses can insert own data"
  ON businesses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Businesses can update own data"
  ON businesses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  price decimal(10, 2) NOT NULL DEFAULT 0,
  description text DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses can view own plans"
  ON plans FOR SELECT
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Businesses can insert own plans"
  ON plans FOR INSERT
  TO authenticated
  WITH CHECK (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Businesses can update own plans"
  ON plans FOR UPDATE
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

CREATE POLICY "Businesses can delete own plans"
  ON plans FOR DELETE
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  plan_id uuid REFERENCES plans(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'pending')),
  started_at timestamptz DEFAULT now(),
  cancelled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses can view own subscribers"
  ON subscribers FOR SELECT
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Businesses can insert own subscribers"
  ON subscribers FOR INSERT
  TO authenticated
  WITH CHECK (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Businesses can update own subscribers"
  ON subscribers FOR UPDATE
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

CREATE POLICY "Businesses can delete own subscribers"
  ON subscribers FOR DELETE
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  subscriber_id uuid REFERENCES subscribers(id) ON DELETE CASCADE NOT NULL,
  amount decimal(10, 2) NOT NULL,
  payment_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Businesses can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Businesses can insert own payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON businesses(user_id);
CREATE INDEX IF NOT EXISTS idx_plans_business_id ON plans(business_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_business_id ON subscribers(business_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_plan_id ON subscribers(plan_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_payments_business_id ON payments(business_id);
CREATE INDEX IF NOT EXISTS idx_payments_subscriber_id ON payments(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date);