# Kenai Borough Realty

A production-ready real estate marketplace built with modern web technologies. Buy and sell property directly with secure escrow, digital contracts, and no realtor fees - saving thousands on every transaction.

## 🚀 Features

### Core Platform
- **Property Listings** - Rich media support with photos, virtual tours, and detailed property information
- **Advanced Search** - Filter by price, bedrooms, location, property type with interactive map integration
- **Property Management** - Full CRUD for sellers to manage their listings
- **Responsive Design** - Mobile-first UI built with Tailwind CSS

### Payment & Escrow System
- **Stripe Integration** - Secure credit card and ACH payments via Stripe Connect
- **3% Platform Fee** - Save 50% vs traditional 5-6% realtor commission
- **48-Hour Escrow Hold** - Buyer protection with automatic fund disbursement
- **Crypto Support** - USDC payments on Base L2 blockchain (optional)
- **Savings Calculator** - Shows real savings compared to traditional realtors

### Legal & Contract Features
- **Digital Contracts** - Alaska-compliant purchase agreements and disclosure forms
- **Electronic Signatures** - DocuSign-style signature capture for legally binding contracts
- **Document Management** - Upload and manage inspection reports, financing docs, disclosures
- **Contract Templates** - Pre-built purchase agreement and Alaska-specific disclosure forms
- **Closing Checklist** - Step-by-step transaction completion guide

### Trust & Safety
- **User Verification** - ID upload and phone verification for all users
- **Property Verification** - Verified property badges for trusted listings
- **Review System** - Buyers and sellers rate each other post-transaction
- **Secure Messaging** - Direct communication between buyers and sellers
- **Transaction History** - Full audit trail of all activities
- **Fraud Prevention** - Multi-layer security with escrow protection

### Professional Real Estate Tools
- **Virtual Tours** - Embedded 360° tour and video support
- **Financing Calculator** - Built-in mortgage and payment calculator
- **Comparative Market Analysis (CMA)** - Price comparison tools
- **Inspection Scheduling** - Coordinate property inspections
- **HOA Documents** - Upload and manage HOA documentation
- **Property History** - Track previous sales and market data

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Real-time)
- **Payments**: Stripe Connect for escrow, Web3.js for crypto
- **Maps**: React Leaflet with OpenStreetMap
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **Routing**: React Router v6

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)
- Stripe account (for payments)

### Quick Start

1. **Clone and install dependencies**
```bash
cd kenai-borough-realty
npm install
```

2. **Set up Supabase Database**

- Create a new project at https://supabase.com
- Copy your project URL and anon key from Settings > API
- Run the migration file:
  - Go to SQL Editor in Supabase dashboard
  - Copy contents of `supabase/migrations/001_initial_schema.sql`
  - Execute the SQL

- Create storage buckets in Supabase Storage:
  - `property_images` - Public bucket for property photos
  - `documents` - Private bucket for contracts/docs
  - `id_verifications` - Private bucket for ID verification uploads

3. **Set up Stripe**

- Create account at https://stripe.com
- Get publishable key from Dashboard > Developers > API keys
- Enable Stripe Connect: Dashboard > Connect > Get Started
- (Optional) Set up webhook for escrow automation

4. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_STRIPE_PUBLIC_KEY=pk_test_your-stripe-key
VITE_BASE_RPC_URL=https://mainnet.base.org  # For crypto (optional)
```

5. **Start development server**
```bash
npm run dev
```

Visit http://localhost:5173 🎉

## 🚢 Production Deployment

### Build
```bash
npm run build
# Output in dist/ folder
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
Add environment variables in Vercel dashboard.

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 📋 Database Schema Overview

The platform uses comprehensive database schema:

**Core Tables:**
- `profiles` - Extended user profiles with verification status
- `properties` - Property listings with location, features, media
- `offers` - Purchase offers with contingencies
- `transactions` - Escrow transactions with payment tracking
- `documents` - Legal documents and file uploads
- `contracts` - Digital contracts with signature data
- `reviews` - User ratings and testimonials
- `messages` - Secure buyer-seller messaging
- `favorites` - Saved properties

**Security:**
- Row Level Security (RLS) on all tables
- User can only access their own data
- Public can view active property listings
- Encrypted sensitive data

See `supabase/migrations/001_initial_schema.sql` for complete schema.

## 🔐 Security Features

- **Row Level Security (RLS)** - Database-level access control
- **Authentication** - Supabase Auth with email verification
- **File Upload Validation** - Type, size, and content restrictions
- **Rate Limiting** - API rate limiting via Supabase
- **Secure Payments** - PCI-compliant via Stripe
- **Escrow Protection** - 48-hour hold prevents fraud
- **Encrypted Storage** - Sensitive documents encrypted at rest
- **HTTPS Only** - Enforced SSL/TLS

## 💰 Fee Structure & Savings

### Platform Fees
- **Platform Fee**: 3% of sale price (paid by seller)
- **Stripe Processing**: 2.9% + $0.30 per transaction
- **Buyer**: $0 (no fees)

### Real Savings Example

**$500,000 Property Sale:**

| Method | Commission | Seller Receives | Buyer Saves |
|--------|-----------|----------------|-------------|
| **Kenai Borough Realty** | $15,000 (3%) | $485,000 | N/A |
| Traditional Realtor | $30,000 (6%) | $470,000 | N/A |
| **Your Savings** | **$15,000** | **$15,000 more** | **No fees** |

**$300,000 Property Sale:**
- Traditional: $18,000 commission
- Our Platform: $9,000 fee
- **Savings: $9,000**

## 🎨 Customization

### Branding
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    50: '#f0f9ff',  // Lightest
    500: '#0ea5e9', // Main brand color
    900: '#0c4a6e', // Darkest
  }
}
```

### Contract Templates
Customize legal templates in Supabase or build admin panel to manage them.

### Email Notifications
Configure in Supabase Auth > Email Templates:
- Welcome emails
- Offer notifications
- Transaction updates
- Document signing reminders

## 📖 User Guides

### For Buyers
1. **Sign Up** - Create account, verify email
2. **Browse** - Search properties with filters and map
3. **Save Favorites** - Bookmark interesting properties
4. **Make Offer** - Submit offer with digital contract
5. **Upload Documents** - Add financing pre-approval
6. **Pay Securely** - Funds held in escrow
7. **Complete Transaction** - Sign final documents

### For Sellers
1. **Create Seller Account** - Verify identity
2. **List Property** - Add photos, details, pricing
3. **Manage Listings** - Edit, update, or withdraw
4. **Review Offers** - Accept, reject, or counter
5. **Sign Contract** - Digital signature on agreement
6. **Upload Disclosures** - Alaska-required forms
7. **Receive Payment** - Automatic after 48-hour hold

## 🔌 API Integration Points

### Stripe Connect
```typescript
// Payment Intent creation
const paymentIntent = await stripe.paymentIntents.create({
  amount: totalAmount * 100,
  currency: 'usd',
  transfer_data: {
    destination: sellerStripeAccountId,
  },
});
```

### Supabase Real-time
```typescript
// Listen to new messages
supabase
  .channel('messages')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages',
  }, payload => {
    // Handle new message
  })
  .subscribe();
```

## 🤝 Support & Help

**Issues?**
- Check Supabase logs for backend errors
- Review Stripe dashboard for payment issues
- Inspect browser console for frontend errors

**Contact:**
- Email: support@kenaiboroughrealty.com
- Documentation: See `/docs` folder
- GitHub Issues: Report bugs

## 📄 License

Proprietary - All rights reserved. Not for redistribution.

## 🏗️ Roadmap

**Q1 2024:**
- [ ] Mobile apps (iOS/Android)
- [ ] AI property valuation
- [ ] Virtual staging tools

**Q2 2024:**
- [ ] Automated title verification
- [ ] MLS integration
- [ ] Advanced analytics dashboard

**Q3 2024:**
- [ ] Multi-language support
- [ ] Agent marketplace
- [ ] Property management tools

**Future:**
- [ ] Blockchain-based title records
- [ ] AI chatbot for buyers
- [ ] 3D property tours
- [ ] Drone photography integration

## 🙏 Credits

Built with production-quality standards for the real estate technology industry. Designed for Alaska's unique real estate market with compliance for local regulations.

---

**Kenai Borough Realty** - Revolutionizing Real Estate in Alaska

Save thousands. Transact securely. Own your home buying journey.
