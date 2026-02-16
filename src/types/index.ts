export type UserRole = 'buyer' | 'seller' | 'admin';
export type PropertyStatus = 'draft' | 'active' | 'pending' | 'sold' | 'withdrawn';
export type PropertyType = 'house' | 'condo' | 'land' | 'commercial' | 'multi_family' | 'manufactured';
export type TransactionStatus = 'pending' | 'escrow' | 'completed' | 'cancelled' | 'disputed';
export type PaymentMethod = 'stripe' | 'crypto_usdc';
export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';
export type DocumentType = 'purchase_agreement' | 'disclosure' | 'inspection' | 'financing' | 'title' | 'hoa' | 'other';

export interface Profile {
  id: string;
  role: UserRole;
  full_name?: string;
  phone?: string;
  phone_verified: boolean;
  email_verified: boolean;
  id_verification_status: VerificationStatus;
  id_document_url?: string;
  avatar_url?: string;
  bio?: string;
  license_number?: string;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  seller_id: string;
  title: string;
  description?: string;
  property_type: PropertyType;
  status: PropertyStatus;
  
  // Location
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zip_code: string;
  latitude?: number;
  longitude?: number;
  
  // Details
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  lot_size?: number;
  year_built?: number;
  
  // Features
  features?: string[];
  amenities?: string[];
  
  // Media
  images?: PropertyImage[];
  virtual_tour_url?: string;
  video_url?: string;
  
  // Verification
  verified: boolean;
  verified_at?: string;
  
  // MLS
  mls_number?: string;
  property_history?: any[];
  
  slug?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  sold_at?: string;
  
  // Relations
  seller?: Profile;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  caption?: string;
  order_index: number;
  created_at: string;
}

export interface Offer {
  id: string;
  property_id: string;
  buyer_id: string;
  seller_id: string;
  offer_amount: number;
  earnest_money?: number;
  financing_type?: string;
  contingencies?: string[];
  closing_date?: string;
  status: string;
  seller_response?: string;
  counter_offer_amount?: number;
  accepted_at?: string;
  rejected_at?: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
  
  // Relations
  property?: Property;
  buyer?: Profile;
  seller?: Profile;
}

export interface Transaction {
  id: string;
  property_id: string;
  buyer_id: string;
  seller_id: string;
  offer_id?: string;
  
  // Payment
  total_amount: number;
  platform_fee: number;
  seller_amount: number;
  payment_method: PaymentMethod;
  
  // Stripe
  stripe_payment_intent_id?: string;
  stripe_transfer_id?: string;
  
  // Crypto
  crypto_wallet_address?: string;
  crypto_transaction_hash?: string;
  crypto_amount?: number;
  
  // Status
  status: TransactionStatus;
  escrow_started_at?: string;
  escrow_release_at?: string;
  released_at?: string;
  
  metadata?: any;
  created_at: string;
  updated_at: string;
  
  // Relations
  property?: Property;
  buyer?: Profile;
  seller?: Profile;
  offer?: Offer;
}

export interface Document {
  id: string;
  transaction_id?: string;
  property_id?: string;
  uploaded_by: string;
  document_type: DocumentType;
  title: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  requires_signature: boolean;
  signed: boolean;
  signature_data?: any;
  signed_at?: string;
  signed_by?: string;
  created_at: string;
}

export interface Contract {
  id: string;
  transaction_id: string;
  template_name: string;
  contract_data: any;
  
  buyer_signed: boolean;
  buyer_signature_data?: any;
  buyer_signed_at?: string;
  
  seller_signed: boolean;
  seller_signature_data?: any;
  seller_signed_at?: string;
  
  finalized: boolean;
  finalized_at?: string;
  
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  transaction_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  
  // Relations
  reviewer?: Profile;
  reviewee?: Profile;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  property_id?: string;
  transaction_id?: string;
  content: string;
  read: boolean;
  read_at?: string;
  created_at: string;
  
  // Relations
  sender?: Profile;
  recipient?: Profile;
}

export interface SearchFilters {
  query?: string;
  property_type?: PropertyType[];
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  min_sqft?: number;
  max_sqft?: number;
  city?: string;
  verified_only?: boolean;
  has_virtual_tour?: boolean;
}

