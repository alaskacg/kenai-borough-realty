-- Kenai Borough Realty Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'admin');
CREATE TYPE property_status AS ENUM ('draft', 'active', 'pending', 'sold', 'withdrawn');
CREATE TYPE property_type AS ENUM ('house', 'condo', 'land', 'commercial', 'multi_family', 'manufactured');
CREATE TYPE transaction_status AS ENUM ('pending', 'escrow', 'completed', 'cancelled', 'disputed');
CREATE TYPE payment_method AS ENUM ('stripe', 'crypto_usdc');
CREATE TYPE verification_status AS ENUM ('unverified', 'pending', 'verified', 'rejected');
CREATE TYPE document_type AS ENUM ('purchase_agreement', 'disclosure', 'inspection', 'financing', 'title', 'hoa', 'other');

-- Users (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'buyer',
  full_name TEXT,
  phone TEXT,
  phone_verified BOOLEAN DEFAULT FALSE,
  email_verified BOOLEAN DEFAULT FALSE,
  id_verification_status verification_status DEFAULT 'unverified',
  id_document_url TEXT,
  avatar_url TEXT,
  bio TEXT,
  license_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Properties
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  property_type property_type NOT NULL,
  status property_status DEFAULT 'draft',
  
  -- Location
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT DEFAULT 'AK',
  zip_code TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Property Details
  price DECIMAL(12, 2) NOT NULL,
  bedrooms INTEGER,
  bathrooms DECIMAL(3, 1),
  square_feet INTEGER,
  lot_size DECIMAL(10, 2),
  year_built INTEGER,
  
  -- Features
  features JSONB DEFAULT '[]',
  amenities JSONB DEFAULT '[]',
  
  -- Media
  images JSONB DEFAULT '[]',
  virtual_tour_url TEXT,
  video_url TEXT,
  
  -- Verification
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  
  -- MLS/Professional
  mls_number TEXT,
  property_history JSONB DEFAULT '[]',
  
  -- SEO
  slug TEXT UNIQUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  sold_at TIMESTAMPTZ
);

-- Property Images
CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offers
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  offer_amount DECIMAL(12, 2) NOT NULL,
  earnest_money DECIMAL(12, 2),
  financing_type TEXT,
  contingencies JSONB DEFAULT '[]',
  closing_date DATE,
  
  status TEXT DEFAULT 'pending',
  
  seller_response TEXT,
  counter_offer_amount DECIMAL(12, 2),
  
  accepted_at TIMESTAMPTZ,
  rejected_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions (Escrow)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  offer_id UUID REFERENCES offers(id),
  
  -- Payment Details
  total_amount DECIMAL(12, 2) NOT NULL,
  platform_fee DECIMAL(12, 2) NOT NULL,
  seller_amount DECIMAL(12, 2) NOT NULL,
  payment_method payment_method NOT NULL,
  
  -- Stripe
  stripe_payment_intent_id TEXT,
  stripe_transfer_id TEXT,
  
  -- Crypto
  crypto_wallet_address TEXT,
  crypto_transaction_hash TEXT,
  crypto_amount DECIMAL(18, 8),
  
  -- Status
  status transaction_status DEFAULT 'pending',
  escrow_started_at TIMESTAMPTZ,
  escrow_release_at TIMESTAMPTZ,
  released_at TIMESTAMPTZ,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  document_type document_type NOT NULL,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  
  -- Signature Status
  requires_signature BOOLEAN DEFAULT FALSE,
  signed BOOLEAN DEFAULT FALSE,
  signature_data JSONB,
  signed_at TIMESTAMPTZ,
  signed_by UUID REFERENCES profiles(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contracts
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  template_name TEXT NOT NULL,
  
  -- Contract Data
  contract_data JSONB NOT NULL,
  
  -- Signatures
  buyer_signed BOOLEAN DEFAULT FALSE,
  buyer_signature_data JSONB,
  buyer_signed_at TIMESTAMPTZ,
  
  seller_signed BOOLEAN DEFAULT FALSE,
  seller_signature_data JSONB,
  seller_signed_at TIMESTAMPTZ,
  
  -- Status
  finalized BOOLEAN DEFAULT FALSE,
  finalized_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
  
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favorites
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- Saved Searches
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  filters JSONB NOT NULL,
  email_alerts BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Log
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_properties_seller ON properties(seller_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_location ON properties(city, state);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_published ON properties(published_at) WHERE status = 'active';
CREATE INDEX idx_offers_property ON offers(property_id);
CREATE INDEX idx_offers_buyer ON offers(buyer_id);
CREATE INDEX idx_transactions_buyer ON transactions(buyer_id);
CREATE INDEX idx_transactions_seller ON transactions(seller_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id, read);
CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);

-- Row Level Security Policies

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Properties
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published properties are viewable by everyone"
  ON properties FOR SELECT
  USING (status = 'active' OR seller_id = auth.uid());

CREATE POLICY "Sellers can insert their own properties"
  ON properties FOR INSERT
  WITH CHECK (seller_id = auth.uid());

CREATE POLICY "Sellers can update their own properties"
  ON properties FOR UPDATE
  USING (seller_id = auth.uid());

CREATE POLICY "Sellers can delete their own properties"
  ON properties FOR DELETE
  USING (seller_id = auth.uid());

-- Offers
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view offers for their properties or offers they made"
  ON offers FOR SELECT
  USING (buyer_id = auth.uid() OR seller_id = auth.uid());

CREATE POLICY "Buyers can create offers"
  ON offers FOR INSERT
  WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Sellers can update offers on their properties"
  ON offers FOR UPDATE
  USING (seller_id = auth.uid());

-- Transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  USING (buyer_id = auth.uid() OR seller_id = auth.uid());

-- Documents
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view documents for their transactions"
  ON documents FOR SELECT
  USING (
    uploaded_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM transactions t
      WHERE t.id = documents.transaction_id
      AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
    )
  );

CREATE POLICY "Users can upload documents"
  ON documents FOR INSERT
  WITH CHECK (uploaded_by = auth.uid());

-- Messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update their received messages"
  ON messages FOR UPDATE
  USING (recipient_id = auth.uid());

-- Reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are publicly viewable"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews for their transactions"
  ON reviews FOR INSERT
  WITH CHECK (
    reviewer_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM transactions t
      WHERE t.id = reviews.transaction_id
      AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
      AND t.status = 'completed'
    )
  );

-- Favorites
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own favorites"
  ON favorites FOR ALL
  USING (user_id = auth.uid());

-- Functions

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_offers_updated_at
  BEFORE UPDATE ON offers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Calculate platform fee (3%)
CREATE OR REPLACE FUNCTION calculate_platform_fee(amount DECIMAL)
RETURNS DECIMAL AS $$
BEGIN
  RETURN ROUND(amount * 0.03, 2);
END;
$$ LANGUAGE plpgsql;

-- Storage buckets (run separately in Supabase dashboard)
-- CREATE bucket property_images with public access
-- CREATE bucket documents with private access
-- CREATE bucket id_verifications with private access
