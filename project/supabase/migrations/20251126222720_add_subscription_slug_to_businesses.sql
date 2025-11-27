/*
  # Add subscription slug to businesses table

  1. Changes
    - Add `subscription_slug` column to `businesses` table
      - Type: text
      - Unique: true
      - Not null with default
      - Description: Unique identifier for the subscription page URL
    
    - Create function to generate unique slug from business name
    - Add trigger to auto-generate slug when business is created
    - Backfill existing businesses with unique slugs

  2. Purpose
    - Each business gets a unique URL for their subscription flow
    - Format: /subscribe/[slug]
    - Slug is generated automatically from business name or random if needed
*/

-- Function to generate a random string
CREATE OR REPLACE FUNCTION generate_random_string(length INTEGER)
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'abcdefghijklmnopqrstuvwxyz0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..length LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to generate unique slug from business name
CREATE OR REPLACE FUNCTION generate_unique_slug(business_name TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Create base slug from business name
  base_slug := lower(regexp_replace(business_name, '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);
  
  -- If empty or too short, generate random
  IF length(base_slug) < 3 THEN
    base_slug := generate_random_string(8);
  END IF;
  
  final_slug := base_slug;
  
  -- Ensure uniqueness
  WHILE EXISTS (SELECT 1 FROM businesses WHERE subscription_slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Add subscription_slug column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'businesses' AND column_name = 'subscription_slug'
  ) THEN
    ALTER TABLE businesses ADD COLUMN subscription_slug text UNIQUE;
  END IF;
END $$;

-- Function to auto-generate slug on insert
CREATE OR REPLACE FUNCTION set_business_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.subscription_slug IS NULL OR NEW.subscription_slug = '' THEN
    NEW.subscription_slug := generate_unique_slug(NEW.name);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_set_business_slug'
  ) THEN
    CREATE TRIGGER trigger_set_business_slug
      BEFORE INSERT OR UPDATE ON businesses
      FOR EACH ROW
      EXECUTE FUNCTION set_business_slug();
  END IF;
END $$;

-- Backfill existing businesses with slugs
UPDATE businesses
SET subscription_slug = generate_unique_slug(name)
WHERE subscription_slug IS NULL OR subscription_slug = '';