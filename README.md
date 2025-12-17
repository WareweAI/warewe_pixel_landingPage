# Pixel Tracker - Shopify Analytics App

A powerful analytics and tracking application for Shopify stores with Meta (Facebook) Pixel integration.

## Features

- **Real-time Analytics** - Track visitors, pageviews, sessions
- **E-commerce Tracking** - Add to cart, checkout, purchases
- **Meta Pixel Integration** - Server-side Conversions API
- **Custom Events** - Create trackable events via dashboard
- **Theme App Extension** - No-code installation
- **Adblocker-proof** - Server-side tracking via webhooks

## Tech Stack

- **Framework**: Remix (React Router v7)
- **Database**: PostgreSQL with Prisma ORM
- **Hosting**: Vercel
- **Shopify**: App Bridge, Polaris UI

## Installation

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## Environment Variables

```env
DATABASE_URL="postgresql://..."
SHOPIFY_API_KEY="your-api-key"
SHOPIFY_API_SECRET="your-api-secret"
SHOPIFY_APP_URL="https://your-app.vercel.app"
```

## Deployment

```bash
vercel --prod
npx shopify app deploy --force
```

## Project Structure

```
├── app/routes/         # Route handlers
├── app/services/       # Business logic
├── extensions/         # Theme extension
├── prisma/             # Database schema
└── public/             # Static assets
```

## Support

- Email: support@warewe.online
- Website: https://pixelify.warewe.online

## License

Warewe Consultancy Private Limited © 2025

