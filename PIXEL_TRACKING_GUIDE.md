# Pixel Analytics Tracking Snippet

## What This Snippet Does

```html
<!-- Pixel Analytics -->
<script>
  window.PIXEL_APP_ID = "px_ac97f603478b5295";
</script>
<script async src="https://wider-geological-surely-holders.trycloudflare.com/api/pixel.js?id=px_ac97f603478b5295"></script>
```

## Overview

This tracking snippet is a lightweight JavaScript code that you add to your website to collect analytics data. It works similarly to Google Analytics or Facebook Pixel.

## How It Works

### 1. **Sets Your App ID**
```javascript
window.PIXEL_APP_ID = "px_ac97f603478b5295";
```
- Stores your unique pixel ID in the browser's global scope
- This ID identifies which app/pixel the data belongs to
- Ensures all events are tracked under your specific pixel

### 2. **Loads the Tracking Script**
```html
<script async src="https://your-domain.com/api/pixel.js?id=px_ac97f603478b5295"></script>
```
- Asynchronously loads the tracking JavaScript file
- `async` means it won't block your page from loading
- The script is served from your API endpoint

## What Data Gets Tracked

Once installed, the pixel automatically collects:

### 📊 **Page Analytics**
- **Pageviews** - Every time a page loads
- **Page URL** - Which pages users visit
- **Page Title** - The title of each page
- **Referrer** - Where visitors came from
- **UTM Parameters** - Marketing campaign tracking (utm_source, utm_medium, etc.)

### 👤 **Visitor Information**
- **Browser** - Chrome, Firefox, Safari, etc.
- **Operating System** - Windows, Mac, iOS, Android
- **Device Type** - Desktop, Mobile, or Tablet
- **Screen Resolution** - Display size

### 🌍 **Location Data** (from IP address)
- **Country** - Visitor's country
- **Region/State** - Geographic region
- **City** - City location
- **Timezone** - Local timezone
- **ISP** - Internet service provider

### 🖱️ **User Interactions** (if enabled)
- **Clicks** - Outbound link clicks
- **Scroll Depth** - How far users scroll
- **Time on Page** - Session duration
- **Custom Events** - Any events you manually track

### 🔒 **Privacy Features**
- **Fingerprinting** - Anonymous user identification (no personal data)
- **Session Tracking** - Groups pageviews into sessions
- **IP Hashing** - IP addresses are hashed for privacy

## Installation

### For Shopify Stores
1. Go to **Online Store** → **Themes**
2. Click **Actions** → **Edit code**
3. Open `theme.liquid`
4. Paste the snippet just before `</head>`
5. Save the file

### For Other Websites
Add the snippet to your HTML template in the `<head>` section, preferably near the closing `</head>` tag.

## What Happens After Installation

1. **Immediate Tracking** - Starts collecting data as soon as visitors land on your site
2. **Real-time Analytics** - View data in your dashboard within seconds
3. **No Performance Impact** - Loads asynchronously without slowing down your site
4. **Automatic Updates** - The tracking script updates automatically (no need to change the snippet)

## Custom Event Tracking

You can also track custom events manually:

```javascript
// Track a button click
window.pixelTrack('button_click', {
  button_name: 'Add to Cart',
  product_id: '12345'
});

// Track a purchase
window.pixelTrack('purchase', {
  value: 99.99,
  currency: 'USD',
  product_name: 'Premium Plan'
});

// Track form submission
window.pixelTrack('form_submit', {
  form_name: 'Contact Form'
});
```

## Dashboard Features

Once tracking is active, you can view:

- **Real-time visitor count**
- **Page view trends over time**
- **Top performing pages**
- **Traffic sources and referrers**
- **Geographic distribution of visitors**
- **Device and browser breakdown**
- **Session duration and bounce rate**
- **Custom event analytics**

## Privacy & Compliance

- ✅ **GDPR Compliant** - No personal data collected without consent
- ✅ **Cookie-less Tracking** - Uses fingerprinting instead of cookies
- ✅ **IP Anonymization** - IP addresses are hashed
- ✅ **Opt-out Support** - Users can opt out of tracking
- ✅ **No Third-party Sharing** - Your data stays with you

## Technical Details

- **File Size** - ~5KB (minified and gzipped)
- **Load Time** - <100ms
- **Browser Support** - All modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Support** - Full iOS and Android support
- **Performance** - Zero impact on page load speed (async loading)

## Troubleshooting

### Not Seeing Data?
1. Check that the snippet is in the `<head>` section
2. Verify your App ID is correct
3. Make sure JavaScript is enabled
4. Check browser console for errors
5. Wait a few minutes for data to appear

### Testing the Pixel
Open your browser's developer console and check for:
```javascript
console.log(window.PIXEL_APP_ID); // Should show your ID
```

Visit your site and check the Network tab for requests to `/api/track`

## Support

If you need help or have questions about the tracking pixel, check your dashboard settings or contact support.
