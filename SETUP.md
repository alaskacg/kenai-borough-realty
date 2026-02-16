# Quick Setup Guide

Get your real estate marketplace running in 15 minutes!

## 1. Install Dependencies (2 min)

```bash
cd kenai-borough-realty
npm install
```

## 2. Set Up Supabase (5 min)

### Create Project
1. Go to https://supabase.com
2. Click "New Project"
3. Name it (e.g., "kenai-realty")
4. Choose password
5. Wait for project creation

### Run Database Migration
1. Open SQL Editor in Supabase
2. Copy all of `supabase/migrations/001_initial_schema.sql`
3. Paste and click "Run"
4. ✅ Tables created!

### Create Storage Buckets
1. Go to Storage
2. Create bucket: `property_images` (Public)
3. Create bucket: `documents` (Private)
4. Create bucket: `id_verifications` (Private)

### Get Credentials
1. Settings > API
2. Copy Project URL
3. Copy anon/public key

## 3. Set Up Stripe (3 min)

1. Go to https://stripe.com
2. Create account (use test mode for now)
3. Dashboard > Developers > API keys
4. Copy "Publishable key" (starts with pk_test_)

## 4. Configure Environment (2 min)

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## 5. Start Development Server (1 min)

```bash
npm run dev
```

Open http://localhost:5173 🎉

## 6. Test the Platform (2 min)

1. Click "Get Started"
2. Create seller account
3. List a test property
4. Switch to buyer account
5. Search and make offer

## What's Next?

- [ ] Upload property photos
- [ ] Customize branding in `tailwind.config.js`
- [ ] Set up email templates in Supabase
- [ ] Configure Stripe webhooks
- [ ] Deploy to production (see DEPLOYMENT.md)

## Need Help?

**Common Issues:**

**Can't connect to Supabase?**
- Verify URL and key in `.env`
- Check Supabase project is active

**Stripe not working?**
- Use test key (pk_test_...)
- Test with card: 4242 4242 4242 4242

**Build errors?**
- Run `npm install` again
- Clear node_modules: `rm -rf node_modules && npm install`

## Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete production deployment guide.

## Features Overview

✅ User authentication & profiles
✅ Property listings with photos
✅ Advanced search & filters
✅ Interactive map view
✅ Offer management system
✅ Secure escrow payments
✅ Digital contracts & signatures
✅ Document management
✅ Review system
✅ Messaging between users
✅ Transaction tracking
✅ Mobile-responsive design

---

**Happy Building!** 🏡
