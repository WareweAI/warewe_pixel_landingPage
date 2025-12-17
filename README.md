# Pixel Tracker - Shopify Analytics App

A powerful analytics and tracking application for Shopify stores with Meta (Facebook) Pixel integration.

## Features

- ✅ **Real-time Analytics** - Track visitors, pageviews, sessions
- ✅ **E-commerce Tracking** - Add to cart, checkout, purchases
- ✅ **Meta Pixel Integration** - Server-side Conversions API
- ✅ **Custom Events** - Create trackable events via dashboard
- ✅ **Theme App Extension** - No-code installation
- ✅ **Adblocker-proof** - Server-side tracking via webhooks

## Tech Stack

- **Framework**: Remix (React Router v7)
- **Database**: PostgreSQL with Prisma ORM
- **Hosting**: Vercel
- **Shopify**: App Bridge, Polaris UI

## Installation

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://..."
SHOPIFY_API_KEY="your-api-key"
SHOPIFY_API_SECRET="your-api-secret"
SHOPIFY_APP_URL="https://your-app.vercel.app"
SCOPES="read_analytics,read_customers,read_orders,read_products,read_checkouts,read_themes"
```

## Deployment

```bash
# Deploy to Vercel
vercel --prod

# Deploy Shopify extension
npx shopify app deploy --force
```

## Files to Remove (Cleanup)

These files can be safely removed to optimize the project:

### Unused/Duplicate Files
```
app/routes/app._index.old.tsx     # Old index file
app/routes/track.ts               # Duplicate of api.track.ts
extensions/theme-extension/blocks/star_rating.liquid  # Unused demo block
```

### Optional Cleanup
```bash
# Remove unused files
rm app/routes/app._index.old.tsx
rm app/routes/track.ts
rm extensions/theme-extension/blocks/star_rating.liquid
```

## Optimization Tips

### 1. Database Optimization
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_events_app_id ON "Event"("appId");
CREATE INDEX idx_events_created_at ON "Event"("createdAt");
CREATE INDEX idx_sessions_app_id ON "AnalyticsSession"("appId");
```

### 2. API Response Caching
Add caching headers to frequently accessed endpoints:
- `/apps/proxy/get-pixel-id` - Cache for 5 minutes
- `/apps/proxy/pixel.js` - Cache for 1 hour

### 3. Bundle Size
- Remove unused Polaris icons imports
- Use dynamic imports for large components

### 4. Database Connection Pooling
For Vercel, use connection pooling:
```env
DATABASE_URL="postgresql://...?pgbouncer=true&connection_limit=1"
```

### 5. Error Monitoring
Add Sentry or similar for production error tracking.

## Project Structure

```
├── app/
│   ├── routes/           # All route handlers
│   │   ├── app.*.tsx     # Admin dashboard pages
│   │   ├── api.*.ts      # API endpoints
│   │   ├── apps.proxy.*  # Shopify App Proxy handlers
│   │   └── webhooks.*    # Shopify webhook handlers
│   ├── services/         # Business logic
│   └── components/       # React components
├── extensions/
│   └── theme-extension/  # Shopify theme app extension
├── prisma/
│   └── schema.prisma     # Database schema
└── public/               # Static assets
```

## Key Routes

| Route | Purpose |
|-------|---------|
| `/app/dashboard` | Main analytics dashboard |
| `/app/settings` | App settings & Meta Pixel config |
| `/app/theme-integration` | Custom events management |
| `/apps/proxy/track` | Event tracking endpoint |
| `/apps/proxy/pixel.js` | Tracking script |
| `/webhooks/orders/create` | Purchase tracking |

## Support

- Email: support@warewe.online
- Website: https://pixelify.warewe.online

## License

Proprietary - Warewe Consultancy Private Limited © 2025
