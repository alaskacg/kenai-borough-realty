# Deployment Guide - Kenai Borough Realty

This guide covers deploying your real estate marketplace to production.

## Prerequisites

- [ ] Supabase project created
- [ ] Database schema migrated
- [ ] Storage buckets created
- [ ] Stripe account configured
- [ ] Domain name (optional)

## Step 1: Supabase Setup

### 1.1 Create Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Choose organization and name
4. Select region (closest to Alaska: us-west-1)
5. Generate strong database password
6. Wait for project to be ready (~2 minutes)

### 1.2 Run Database Migration
1. Go to SQL Editor in Supabase dashboard
2. Copy entire contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and click "Run"
4. Verify tables created in Table Editor

### 1.3 Create Storage Buckets
1. Go to Storage in Supabase
2. Create three buckets:

**property_images** (Public)
- Click "New Bucket"
- Name: `property_images`
- Public: Yes
- Allowed MIME types: `image/jpeg,image/png,image/webp`
- Max file size: 10 MB

**documents** (Private)
- Name: `documents`
- Public: No
- Allowed: `application/pdf,image/jpeg,image/png`
- Max file size: 20 MB

**id_verifications** (Private)
- Name: `id_verifications`
- Public: No
- Allowed: `image/jpeg,image/png,application/pdf`
- Max file size: 5 MB

### 1.4 Configure Auth
1. Go to Authentication > Settings
2. Site URL: Your production URL
3. Redirect URLs: Add your domain
4. Enable Email provider
5. Customize email templates (optional)

### 1.5 Get API Credentials
1. Go to Settings > API
2. Copy:
   - Project URL
   - Anon (public) key

## Step 2: Stripe Setup

### 2.1 Create Stripe Account
1. Sign up at https://stripe.com
2. Complete business verification
3. Activate your account

### 2.2 Enable Stripe Connect
1. Go to Connect > Get Started
2. Choose "Platform or Marketplace"
3. Configure onboarding settings
4. Set up express accounts for sellers

### 2.3 Get API Keys
1. Go to Developers > API keys
2. Copy Publishable key (starts with pk_)
3. For production: Use live keys, not test keys

### 2.4 Configure Webhooks (Optional)
For automatic escrow release:
1. Go to Developers > Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events:
   - `payment_intent.succeeded`
   - `transfer.created`
   - `transfer.failed`

## Step 3: Build Application

### 3.1 Set Environment Variables
Create `.env.production`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLIC_KEY=pk_live_your-key
VITE_BASE_RPC_URL=https://mainnet.base.org
```

### 3.2 Build
```bash
npm run build
```

Verify `dist/` folder created with files.

## Step 4: Deploy

### Option A: Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Add Environment Variables**
- Go to Vercel dashboard > Settings > Environment Variables
- Add all variables from `.env.production`

4. **Redeploy**
```bash
vercel --prod
```

5. **Custom Domain** (optional)
- Go to Settings > Domains
- Add your domain
- Update DNS records

### Option B: Netlify

1. **Install Netlify CLI**
```bash
npm i -g netlify-cli
```

2. **Deploy**
```bash
netlify deploy --prod
```

3. **Environment Variables**
- Go to Site settings > Environment variables
- Add all variables

4. **Custom Domain**
- Go to Domain management
- Add custom domain

### Option C: GitHub Pages

1. **Configure Vite for GitHub Pages**

Edit `vite.config.ts`:
```ts
export default defineConfig({
  base: '/kenai-borough-realty/',
  // ... rest of config
})
```

2. **Add Secrets to GitHub**
- Go to repo Settings > Secrets and variables > Actions
- Add secrets:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_STRIPE_PUBLIC_KEY`

3. **Enable GitHub Pages**
- Go to Settings > Pages
- Source: GitHub Actions

4. **Push to Main Branch**
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

5. **Access Site**
- URL: `https://username.github.io/kenai-borough-realty/`

## Step 5: Post-Deployment

### 5.1 Verify Functionality
- [ ] User registration works
- [ ] Login/logout works
- [ ] Property listing creation works
- [ ] Search and filters work
- [ ] Image uploads work
- [ ] Offers can be submitted
- [ ] Stripe payment test (use test cards)

### 5.2 Set Up Monitoring

**Supabase Logs:**
- Monitor database queries
- Check for errors

**Stripe Dashboard:**
- Monitor transactions
- Check for failed payments

**Browser Console:**
- Check for JavaScript errors
- Verify no CORS issues

### 5.3 Configure Analytics (Optional)
Add Google Analytics or similar:
```html
<!-- In index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## Step 6: Backups

### Database Backups
Supabase Pro plan includes daily backups. For free tier:
1. Go to Database > Backups
2. Manual backup before major changes

### Code Backups
```bash
git push origin main
```

## Troubleshooting

### Build Fails
- Check all environment variables are set
- Run `npm install` to ensure dependencies
- Check for TypeScript errors: `npm run type-check`

### Runtime Errors
- Check browser console for errors
- Verify Supabase URL and keys are correct
- Check Supabase logs for backend errors

### Payment Issues
- Verify Stripe keys (live vs test)
- Check webhook configuration
- Review Stripe dashboard for errors

### CORS Errors
- Add production URL to Supabase allowed origins
- Check Stripe allowed domains

## Security Checklist

- [ ] RLS policies enabled on all tables
- [ ] Storage buckets have proper access controls
- [ ] API keys are in environment variables (not code)
- [ ] HTTPS enforced
- [ ] Email verification enabled
- [ ] Rate limiting configured
- [ ] File upload size limits set
- [ ] Stripe webhook signatures verified

## Performance Optimization

### Images
- Use WebP format where possible
- Implement lazy loading
- Add image CDN (Cloudflare, Cloudinary)

### Database
- Add indexes for commonly queried fields
- Use Supabase edge functions for complex queries

### Caching
- Enable browser caching
- Use service workers for offline support

## Scaling

### Database
- Upgrade Supabase plan for more connections
- Add read replicas for high traffic

### Storage
- Use CDN for static assets
- Implement image optimization pipeline

### Payments
- Contact Stripe for high-volume pricing
- Implement payment queue for peak times

## Support

If you encounter issues:
1. Check Supabase logs
2. Review Stripe dashboard
3. Inspect browser console
4. Contact support

---

**Congratulations!** Your real estate marketplace is now live! 🎉
