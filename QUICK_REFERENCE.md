# Quick Reference Card

## 🚀 Getting Started (3 commands)

```bash
cd kenai-borough-realty
npm install
npm run dev
```

## 🔑 Required Environment Variables

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## 📦 Core Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Check TypeScript types
```

## 🗄️ Database Setup (Supabase)

1. Create project at https://supabase.com
2. Go to SQL Editor
3. Run: `supabase/migrations/001_initial_schema.sql`
4. Create storage buckets:
   - `property_images` (public)
   - `documents` (private)
   - `id_verifications` (private)

## 💳 Stripe Setup

1. Create account at https://stripe.com
2. Dashboard > Developers > API keys
3. Copy publishable key (pk_test_...)
4. Enable Connect for marketplace

## 🏗️ Key Files

- **App.tsx** - Main app router
- **Layout.tsx** - Header/footer
- **authStore.ts** - Authentication state
- **types/index.ts** - TypeScript definitions
- **supabase.ts** - Database client
- **stripe.ts** - Payment utilities

## 📄 User Flows

### Seller Flow
1. Sign up → Select "Seller"
2. List Property → Add details
3. Receive Offers → Accept/reject
4. Sign Contract → Digital signature
5. Get Paid → After 48-hour escrow

### Buyer Flow
1. Sign up → Select "Buyer"
2. Search Properties → Use filters
3. Make Offer → Submit with terms
4. Sign Contract → Digital signature
5. Pay Securely → Stripe escrow
6. Complete → Receive property

## 💰 Fee Structure

- **Platform Fee**: 3% (seller pays)
- **Savings vs Realtor**: 50% (6% → 3%)
- **Example**: $500k sale = $15k fee (vs $30k)

## 🔒 Security Features

- Row Level Security (RLS) ✅
- User authentication ✅
- Email verification ✅
- Phone verification ✅
- ID verification ✅
- Escrow protection ✅

## 📱 Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/search` | Property search |
| `/property/:id` | Property details |
| `/list-property` | Create listing |
| `/dashboard` | User dashboard |
| `/profile` | User profile |
| `/signin` | Authentication |
| `/signup` | Registration |
| `/how-it-works` | Information |
| `/transaction/:id` | Transaction view |

## 🎨 Customization

### Colors (tailwind.config.js)
```js
primary: {
  500: '#0ea5e9',  // Main brand color
  600: '#0284c7',  // Buttons
  700: '#0369a1',  // Hover
}
```

### Logo
- Place in: `public/logo.png`
- Update in: `src/components/layout/Layout.tsx`

## 📊 Database Tables

1. profiles - Users
2. properties - Listings
3. offers - Purchase offers
4. transactions - Escrow
5. documents - Files
6. contracts - Agreements
7. reviews - Ratings
8. messages - Communication
9. favorites - Saved properties
10. property_images - Photos
11. saved_searches - Alerts
12. activity_log - Audit

## 🚢 Deployment

### Vercel
```bash
vercel
```

### Netlify
```bash
netlify deploy --prod
```

### Build
```bash
npm run build
# Deploy dist/ folder
```

## 🆘 Troubleshooting

**Build fails?**
- Check node version: `node -v` (need 18+)
- Clear cache: `rm -rf node_modules && npm install`

**Supabase errors?**
- Verify URL and key in `.env`
- Check RLS policies are enabled

**Stripe issues?**
- Use test key for development
- Test card: 4242 4242 4242 4242

**TypeScript errors?**
- Run: `npm run type-check`
- Fix types in `src/types/index.ts`

## 📚 Documentation

- **Full Setup**: README.md
- **Quick Start**: SETUP.md
- **Deploy**: DEPLOYMENT.md
- **Features**: FEATURES.md
- **Summary**: PROJECT_SUMMARY.md
- **Next Steps**: NEXT_STEPS.md

## ✅ Pre-Launch Checklist

- [ ] Supabase project created
- [ ] Database migrated
- [ ] Storage buckets created
- [ ] Stripe account set up
- [ ] Environment variables set
- [ ] Test locally
- [ ] Terms of Service written
- [ ] Privacy Policy written
- [ ] Domain configured
- [ ] Deploy to production

## 🎯 Support

**Email**: support@kenaiboroughrealty.com
**Docs**: /docs folder
**Issues**: Check console & logs

---

**Quick Start**: 15 minutes
**Production Ready**: 2-4 hours
**Status**: ✅ Complete

*Kenai Borough Realty - Real estate, reimagined.*
