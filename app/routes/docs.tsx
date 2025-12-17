import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import {
  Page,
  Text,
  BlockStack,
  Link,
  InlineStack,
  Icon,
} from "@shopify/polaris";
import {
  CodeIcon,
  SettingsIcon,
  AppsIcon,
  ViewIcon,
  TargetIcon,
  ChartLineIcon,
  DatabaseIcon,
  CheckCircleIcon,
  InfoIcon,
  BookOpenIcon,
  PlayIcon,
  WrenchIcon,
  ClipboardIcon,
  CartIcon,
  PersonIcon,
  GlobeIcon,
  AlertTriangleIcon,
  QuestionCircleIcon,
  EmailIcon,
  LockIcon,
} from "@shopify/polaris-icons";

export const meta: MetaFunction = () => {
  return [
    { title: "Pixel Tracker - Complete Documentation" },
    { name: "description", content: "Complete guide to implementing Pixel Tracker analytics on your Shopify store" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const baseUrl = process.env.SHOPIFY_APP_URL || "https://pixel-warewe.vercel.app";
  return { baseUrl };
};

export default function DocsPage() {
  const { baseUrl } = useLoaderData<typeof loader>();

  return (
    <Page
      title="Documentation"
      subtitle="Complete Guide to Pixel Tracker"
      fullWidth
    >
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 24px",
        backgroundColor: "#ffffff",
      }}>
        <style>{`
          .docs-content {
            line-height: 1.8;
            color: #202223;
          }
          .docs-content h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: #202223;
            background: linear-gradient(135deg, #5c6ac4 0%, #006fbb 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .docs-content h2 {
            font-size: 1.875rem;
            font-weight: 600;
            margin-top: 3rem;
            margin-bottom: 1.5rem;
            color: #202223;
            padding-top: 2rem;
            border-top: 2px solid #e1e3e5;
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          .docs-content h3 {
            font-size: 1.375rem;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            color: #202223;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .docs-content p {
            margin-bottom: 1.25rem;
            font-size: 1.0625rem;
            line-height: 1.8;
            color: #454f5b;
          }
          .docs-content ul, .docs-content ol {
            margin: 1.25rem 0;
            padding-left: 2rem;
          }
          .docs-content li {
            margin-bottom: 0.875rem;
            line-height: 1.8;
            color: #454f5b;
            position: relative;
          }
          .docs-content li::marker {
            color: #5c6ac4;
            font-weight: bold;
          }
          .docs-content strong {
            color: #202223;
            font-weight: 600;
          }
          .docs-section {
            background: linear-gradient(135deg, #f6f6f7 0%, #ffffff 100%);
            padding: 2rem;
            border-radius: 12px;
            margin: 1.75rem 0;
            border-left: 5px solid #5c6ac4;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .docs-section:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .docs-intro {
            background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #ffffff 100%);
            padding: 2.5rem;
            border-radius: 16px;
            margin-bottom: 3rem;
            border: 2px solid #5c6ac4;
            box-shadow: 0 4px 16px rgba(92, 106, 196, 0.1);
            position: relative;
            overflow: hidden;
          }
          .docs-intro::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #5c6ac4, #006fbb, #5c6ac4);
          }
          .code-block {
            background: #1e1e2e;
            color: #cdd6f4;
            padding: 1.5rem;
            border-radius: 12px;
            font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            overflow-x: auto;
            margin: 1rem 0;
            border: 1px solid #313244;
          }
          .code-block .comment {
            color: #6c7086;
          }
          .code-block .keyword {
            color: #cba6f7;
          }
          .code-block .string {
            color: #a6e3a1;
          }
          .code-block .function {
            color: #89b4fa;
          }
          .code-block .property {
            color: #f9e2af;
          }
          .code-block .number {
            color: #fab387;
          }
          .inline-code {
            background: #f0f4ff;
            color: #5c6ac4;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
            font-size: 0.9em;
          }
          .icon-wrapper {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #5c6ac4 0%, #006fbb 100%);
            border-radius: 10px;
            color: white;
            flex-shrink: 0;
          }
          .section-icon {
            width: 32px;
            height: 32px;
            color: #5c6ac4;
          }
          .footer-note {
            text-align: center;
            margin-top: 4rem;
            padding: 2.5rem;
            color: #6d7175;
            border-top: 2px solid #e1e3e5;
            background: linear-gradient(135deg, #f6f6f7 0%, #ffffff 100%);
            border-radius: 12px;
          }
          .feature-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #e8f0fe;
            color: #1a56db;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 600;
            margin: 0.5rem 0.5rem 0.5rem 0;
          }
          .toc-container {
            background: #f6f6f7;
            padding: 2rem;
            border-radius: 12px;
            margin: 2rem 0;
            border: 1px solid #e1e3e5;
          }
          .toc-container ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 0.75rem;
          }
          .toc-container li {
            margin: 0;
          }
          .toc-container a {
            color: #5c6ac4;
            text-decoration: none;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            border-radius: 8px;
            transition: background 0.2s;
          }
          .toc-container a:hover {
            background: #e8f0fe;
          }
          .warning-box {
            background: #fff8e6;
            border-left: 5px solid #ffb347;
            padding: 1.5rem;
            border-radius: 8px;
            margin: 1rem 0;
          }
          .info-box {
            background: #e8f4fd;
            border-left: 5px solid #006fbb;
            padding: 1.5rem;
            border-radius: 8px;
            margin: 1rem 0;
          }
          .success-box {
            background: #dcfce7;
            border-left: 5px solid #22c55e;
            padding: 1.5rem;
            border-radius: 8px;
            margin: 1rem 0;
          }
          .step-number {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            background: #5c6ac4;
            color: white;
            border-radius: 50%;
            font-weight: 600;
            font-size: 0.875rem;
            margin-right: 0.75rem;
          }
          .event-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
          }
          .event-table th, .event-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #e1e3e5;
          }
          .event-table th {
            background: #f6f6f7;
            font-weight: 600;
            color: #202223;
          }
          .event-table tr:hover {
            background: #f9fafb;
          }
        `}</style>

        <div className="docs-content">
          <BlockStack gap="600">
            <h1>
              <div className="icon-wrapper">
                <Icon source={BookOpenIcon} />
              </div>
              Pixel Tracker Documentation
            </h1>
            
            <div className="docs-intro">
              <Text as="p" variant="bodyLg" fontWeight="medium">
                Welcome to the complete documentation for Pixel Tracker. This guide covers everything 
                from basic installation to advanced custom event tracking, Facebook/Meta Pixel integration, 
                and e-commerce analytics. Follow this documentation to maximize your tracking capabilities.
              </Text>
              <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <span className="feature-badge">
                  <Icon source={CheckCircleIcon} /> Easy Installation
                </span>
                <span className="feature-badge">
                  <Icon source={ChartLineIcon} /> Real-time Analytics
                </span>
                <span className="feature-badge">
                  <Icon source={TargetIcon} /> Meta Pixel Integration
                </span>
                <span className="feature-badge">
                  <Icon source={CartIcon} /> E-commerce Tracking
                </span>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="toc-container">
              <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>
                <Icon source={ClipboardIcon} /> Table of Contents
              </h3>
              <ul>
                <li><a href="#quick-start">🚀 Quick Start Guide</a></li>
                <li><a href="#installation">📦 Installation</a></li>
                <li><a href="#dashboard">📊 Dashboard Overview</a></li>
                <li><a href="#pixels">🎯 Facebook/Meta Pixels</a></li>
                <li><a href="#auto-tracking">⚡ Automatic Tracking</a></li>
                <li><a href="#custom-events">🛠️ Custom Events</a></li>
                <li><a href="#ecommerce">🛒 E-commerce Tracking</a></li>
                <li><a href="#javascript-api">💻 JavaScript API</a></li>
                <li><a href="#theme-integration">🎨 Theme Integration</a></li>
                <li><a href="#settings">⚙️ Settings & Configuration</a></li>
                <li><a href="#troubleshooting">🔧 Troubleshooting</a></li>
                <li><a href="#faq">❓ FAQ</a></li>
              </ul>
            </div>

            {/* Quick Start */}
            <section id="quick-start">
              <h2>
                <div className="section-icon">
                  <Icon source={PlayIcon} />
                </div>
                1. Quick Start Guide
              </h2>
              
              <div className="success-box">
                <strong>5-Minute Setup:</strong> Get Pixel Tracker running on your store in just 5 minutes!
              </div>
              
              <div className="docs-section">
                <h3><span className="step-number">1</span> Install the App</h3>
                <p>
                  Install Pixel Tracker from the Shopify App Store. Once installed, you'll be redirected 
                  to the app dashboard automatically.
                </p>
              </div>

              <div className="docs-section">
                <h3><span className="step-number">2</span> Create Your First Pixel</h3>
                <p>
                  Navigate to <strong>Facebook Pixels</strong> in the sidebar and click <strong>"Add Facebook Pixel"</strong>. 
                  Enter your Facebook Pixel ID (found in Meta Events Manager) and optionally your Conversions API access token.
                </p>
              </div>

              <div className="docs-section">
                <h3><span className="step-number">3</span> Get Installation Code</h3>
                <p>
                  Click <strong>"Get Code"</strong> next to your pixel. Copy the generated JavaScript snippet.
                </p>
                <div className="code-block">
                  <span className="comment">{'<!-- Pixel Tracker Installation Code -->'}</span>{'\n'}
                  <span className="keyword">{'<script'}</span> <span className="property">src</span>=<span className="string">"{baseUrl}/api/pixel.js?id=YOUR_PIXEL_ID"</span><span className="keyword">{'>'}</span><span className="keyword">{'</script>'}</span>
                </div>
              </div>

              <div className="docs-section">
                <h3><span className="step-number">4</span> Add to Your Theme</h3>
                <p>
                  In Shopify Admin: <strong>Online Store → Themes → Actions → Edit code → theme.liquid</strong>
                </p>
                <p>
                  Paste the code just before the closing <code className="inline-code">{'</head>'}</code> tag.
                </p>
              </div>

              <div className="docs-section">
                <h3><span className="step-number">5</span> Verify Installation</h3>
                <p>
                  Visit your store in a new browser tab. Check your Pixel Tracker dashboard - you should 
                  see your first pageview event within seconds!
                </p>
              </div>
            </section>

            {/* Installation */}
            <section id="installation">
              <h2>
                <div className="section-icon">
                  <Icon source={AppsIcon} />
                </div>
                2. Installation Methods
              </h2>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={CodeIcon} />
                  </div>
                  Method 1: Theme.liquid (Recommended)
                </h3>
                <p>
                  This is the recommended method for Shopify stores. It ensures the tracking script 
                  loads on every page.
                </p>
                <ol>
                  <li>Go to <strong>Online Store → Themes</strong> in your Shopify Admin</li>
                  <li>Click <strong>Actions → Edit code</strong></li>
                  <li>Open <code className="inline-code">theme.liquid</code> in the Layout folder</li>
                  <li>Paste the tracking code before <code className="inline-code">{'</head>'}</code></li>
                  <li>Click <strong>Save</strong></li>
                </ol>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={SettingsIcon} />
                  </div>
                  Method 2: Shopify Web Pixels (For Checkout Events)
                </h3>
                <p>
                  Use the Theme Integration feature for checkout tracking on Shopify Plus stores.
                </p>
                <ol>
                  <li>Navigate to <strong>Theme Integration</strong> in the Pixel Tracker app</li>
                  <li>Click <strong>"Install Web Pixel"</strong></li>
                  <li>This creates a Shopify Web Pixel that tracks checkout events</li>
                </ol>
                <div className="info-box">
                  <strong>Note:</strong> Web Pixels have access to checkout and order events that 
                  standard JavaScript tracking cannot access due to Shopify security restrictions.
                </div>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={GlobeIcon} />
                  </div>
                  Method 3: Google Tag Manager
                </h3>
                <p>
                  If you use Google Tag Manager, add the script as a Custom HTML tag:
                </p>
                <ol>
                  <li>Create a new <strong>Custom HTML</strong> tag in GTM</li>
                  <li>Paste the Pixel Tracker script code</li>
                  <li>Set trigger to <strong>All Pages</strong></li>
                  <li>Publish your GTM container</li>
                </ol>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={CodeIcon} />
                  </div>
                  Method 4: Custom/Non-Shopify Websites
                </h3>
                <p>
                  For any website, simply add the tracking script to your HTML:
                </p>
                <div className="code-block">
                  <span className="keyword">{'<!DOCTYPE html>'}</span>{'\n'}
                  <span className="keyword">{'<html>'}</span>{'\n'}
                  <span className="keyword">{'<head>'}</span>{'\n'}
                  {'  '}<span className="comment">{'<!-- Your other head content -->'}</span>{'\n'}
                  {'  '}<span className="keyword">{'<script'}</span> <span className="property">src</span>=<span className="string">"{baseUrl}/api/pixel.js?id=YOUR_PIXEL_ID"</span><span className="keyword">{'></script>'}</span>{'\n'}
                  <span className="keyword">{'</head>'}</span>{'\n'}
                  <span className="keyword">{'<body>'}</span>{'\n'}
                  {'  '}<span className="comment">{'<!-- Your page content -->'}</span>{'\n'}
                  <span className="keyword">{'</body>'}</span>{'\n'}
                  <span className="keyword">{'</html>'}</span>
                </div>
              </div>
            </section>

            {/* Dashboard Overview */}
            <section id="dashboard">
              <h2>
                <div className="section-icon">
                  <Icon source={ChartLineIcon} />
                </div>
                3. Dashboard Overview
              </h2>
              
              <p>
                The Pixel Tracker dashboard provides comprehensive analytics for your store. Here's what each section offers:
              </p>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ChartLineIcon} />
                  </div>
                  Main Dashboard
                </h3>
                <ul>
                  <li><strong>Total Events:</strong> Count of all tracked events</li>
                  <li><strong>Unique Visitors:</strong> Number of unique visitors (based on device fingerprint)</li>
                  <li><strong>Page Views:</strong> Total page view count</li>
                  <li><strong>Sessions:</strong> Browsing session count</li>
                  <li><strong>Conversion Rate:</strong> Purchase events / Total visitors</li>
                  <li><strong>Revenue:</strong> Total tracked revenue from purchases</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ViewIcon} />
                  </div>
                  Analytics Page
                </h3>
                <ul>
                  <li><strong>Traffic Sources:</strong> Where your visitors come from (referrers, UTM campaigns)</li>
                  <li><strong>Device Breakdown:</strong> Desktop vs Mobile vs Tablet</li>
                  <li><strong>Browser Statistics:</strong> Chrome, Safari, Firefox, etc.</li>
                  <li><strong>Geographic Data:</strong> Countries, regions, cities</li>
                  <li><strong>Time-based Charts:</strong> Events over time, peak hours</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={PersonIcon} />
                  </div>
                  Visitors Page
                </h3>
                <ul>
                  <li><strong>Visitor List:</strong> All tracked visitors with their activity</li>
                  <li><strong>Session Details:</strong> Pages viewed, time on site, actions taken</li>
                  <li><strong>Visitor Journey:</strong> Complete path through your store</li>
                  <li><strong>Device Info:</strong> Browser, OS, screen size</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={DatabaseIcon} />
                  </div>
                  Events Page
                </h3>
                <ul>
                  <li><strong>Event Stream:</strong> Real-time feed of all events</li>
                  <li><strong>Event Filtering:</strong> Filter by event type, date, visitor</li>
                  <li><strong>Event Details:</strong> Full payload for each event</li>
                  <li><strong>Export Options:</strong> Download event data as CSV</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={TargetIcon} />
                  </div>
                  Conversions Page
                </h3>
                <ul>
                  <li><strong>Conversion Tracking:</strong> Monitor key conversion events</li>
                  <li><strong>Funnel Analysis:</strong> Track user flow through conversion steps</li>
                  <li><strong>Meta Pixel Events:</strong> See events sent to Facebook/Meta</li>
                  <li><strong>Attribution:</strong> Source attribution for conversions</li>
                </ul>
              </div>
            </section>

            {/* Facebook/Meta Pixels */}
            <section id="pixels">
              <h2>
                <div className="section-icon">
                  <Icon source={TargetIcon} />
                </div>
                4. Facebook/Meta Pixel Integration
              </h2>

              <p>
                Pixel Tracker integrates with Facebook/Meta Pixel through the Conversions API for 
                server-side tracking, providing more reliable data than browser-only tracking.
              </p>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={SettingsIcon} />
                  </div>
                  Setting Up Your Pixel
                </h3>
                <ol>
                  <li>Go to <Link url="https://business.facebook.com/events_manager" external>Meta Events Manager</Link></li>
                  <li>Select or create a Pixel</li>
                  <li>Copy your <strong>Pixel ID</strong> (16-digit number)</li>
                  <li>Go to <strong>Settings → Generate Access Token</strong> for the Conversions API</li>
                  <li>Copy the access token</li>
                  <li>In Pixel Tracker, go to <strong>Facebook Pixels → Add Facebook Pixel</strong></li>
                  <li>Enter your Pixel ID and Access Token</li>
                </ol>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ChartLineIcon} />
                  </div>
                  Standard Events Tracked
                </h3>
                <table className="event-table">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Trigger</th>
                      <th>Data Sent</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>PageView</strong></td>
                      <td>Every page load</td>
                      <td>URL, title, referrer</td>
                    </tr>
                    <tr>
                      <td><strong>ViewContent</strong></td>
                      <td>Product page view</td>
                      <td>Product ID, name, category, price</td>
                    </tr>
                    <tr>
                      <td><strong>AddToCart</strong></td>
                      <td>Add to cart action</td>
                      <td>Product ID, quantity, value</td>
                    </tr>
                    <tr>
                      <td><strong>InitiateCheckout</strong></td>
                      <td>Checkout starts</td>
                      <td>Cart contents, total value</td>
                    </tr>
                    <tr>
                      <td><strong>AddPaymentInfo</strong></td>
                      <td>Payment info added</td>
                      <td>Cart value, contents</td>
                    </tr>
                    <tr>
                      <td><strong>Purchase</strong></td>
                      <td>Order completed</td>
                      <td>Order ID, value, currency, products</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={LockIcon} />
                  </div>
                  Data Privacy & Hashing
                </h3>
                <p>
                  All personal data is hashed using SHA-256 before being sent to Meta:
                </p>
                <ul>
                  <li>Email addresses</li>
                  <li>Phone numbers</li>
                  <li>First and last names</li>
                  <li>City, state, ZIP code</li>
                </ul>
                <p>
                  This ensures compliance with privacy regulations while maintaining conversion tracking accuracy.
                </p>
              </div>

              <div className="warning-box">
                <strong>Important:</strong> The Conversions API access token is a sensitive credential. 
                Never share it publicly or commit it to public repositories.
              </div>
            </section>

            {/* Automatic Tracking */}
            <section id="auto-tracking">
              <h2>
                <div className="section-icon">
                  <Icon source={ViewIcon} />
                </div>
                5. Automatic Tracking
              </h2>
              
              <p>
                Pixel Tracker automatically captures various user interactions without any additional code:
              </p>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ViewIcon} />
                  </div>
                  Page Views
                </h3>
                <ul>
                  <li>Captured on every page load</li>
                  <li>Includes full URL, page title, and referrer</li>
                  <li>Works with SPA (Single Page Applications) using history API</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ChartLineIcon} />
                  </div>
                  Scroll Depth
                </h3>
                <ul>
                  <li>Tracks how far users scroll on each page</li>
                  <li>Recorded at 25%, 50%, 75%, and 100% thresholds</li>
                  <li>Helps identify engaging content</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={TargetIcon} />
                  </div>
                  Click Tracking
                </h3>
                <ul>
                  <li>Captures click coordinates (X, Y position)</li>
                  <li>Records clicked element information</li>
                  <li>Tracks outbound link clicks</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={DatabaseIcon} />
                  </div>
                  Session & Visitor Data
                </h3>
                <ul>
                  <li><strong>Session ID:</strong> Unique identifier for each browsing session</li>
                  <li><strong>Visitor ID:</strong> Persistent identifier across sessions</li>
                  <li><strong>Device Fingerprint:</strong> Browser and device characteristics</li>
                  <li><strong>Session Duration:</strong> Time spent on site</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={GlobeIcon} />
                  </div>
                  UTM Parameters
                </h3>
                <p>Automatically captures marketing campaign parameters:</p>
                <ul>
                  <li><code className="inline-code">utm_source</code> - Traffic source</li>
                  <li><code className="inline-code">utm_medium</code> - Marketing medium</li>
                  <li><code className="inline-code">utm_campaign</code> - Campaign name</li>
                  <li><code className="inline-code">utm_term</code> - Search terms</li>
                  <li><code className="inline-code">utm_content</code> - Ad content variant</li>
                </ul>
              </div>
            </section>

            {/* Custom Events */}
            <section id="custom-events">
              <h2>
                <div className="section-icon">
                  <Icon source={WrenchIcon} />
                </div>
                6. Custom Event Tracking
              </h2>
              
              <p>
                Track specific user interactions beyond automatic tracking using data attributes or the JavaScript API.
              </p>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={CodeIcon} />
                  </div>
                  Method 1: Data Attributes (No-Code)
                </h3>
                <p>
                  Add data attributes to any HTML element to track clicks:
                </p>
                <div className="code-block">
                  <span className="comment">{'<!-- Basic event tracking -->'}</span>{'\n'}
                  <span className="keyword">{'<button'}</span>{'\n'}
                  {'  '}<span className="property">data-pixel-event</span>=<span className="string">"button_click"</span>{'\n'}
                  {'  '}<span className="property">data-pixel-category</span>=<span className="string">"engagement"</span>{'\n'}
                  {'  '}<span className="property">data-pixel-label</span>=<span className="string">"signup_cta"</span>{'\n'}
                  <span className="keyword">{'>'}</span>{'\n'}
                  {'  Sign Up Now'}{'\n'}
                  <span className="keyword">{'</button>'}</span>
                </div>

                <p>For e-commerce events:</p>
                <div className="code-block">
                  <span className="comment">{'<!-- Add to cart with product data -->'}</span>{'\n'}
                  <span className="keyword">{'<button'}</span>{'\n'}
                  {'  '}<span className="property">data-pixel-event</span>=<span className="string">"add_to_cart"</span>{'\n'}
                  {'  '}<span className="property">data-pixel-product-id</span>=<span className="string">"SKU-12345"</span>{'\n'}
                  {'  '}<span className="property">data-pixel-product-name</span>=<span className="string">"Blue T-Shirt"</span>{'\n'}
                  {'  '}<span className="property">data-pixel-value</span>=<span className="string">"29.99"</span>{'\n'}
                  {'  '}<span className="property">data-pixel-currency</span>=<span className="string">"USD"</span>{'\n'}
                  <span className="keyword">{'>'}</span>{'\n'}
                  {'  Add to Cart'}{'\n'}
                  <span className="keyword">{'</button>'}</span>
                </div>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={SettingsIcon} />
                  </div>
                  Method 2: CSS Selector Rules (Dashboard)
                </h3>
                <p>
                  Configure tracking rules without touching code:
                </p>
                <ol>
                  <li>Go to <strong>Custom Events</strong> in the dashboard</li>
                  <li>Click <strong>"Add Custom Event"</strong></li>
                  <li>Enter a CSS selector (e.g., <code className="inline-code">.add-to-cart-btn</code>)</li>
                  <li>Choose the event name and category</li>
                  <li>Save the rule</li>
                </ol>
                <div className="info-box">
                  <strong>Pro Tip:</strong> Use browser DevTools to find the exact CSS selector for any element.
                </div>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={CodeIcon} />
                  </div>
                  Available Data Attributes
                </h3>
                <table className="event-table">
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Description</th>
                      <th>Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code className="inline-code">data-pixel-event</code></td>
                      <td>Event name (required)</td>
                      <td>"add_to_cart"</td>
                    </tr>
                    <tr>
                      <td><code className="inline-code">data-pixel-category</code></td>
                      <td>Event category</td>
                      <td>"ecommerce"</td>
                    </tr>
                    <tr>
                      <td><code className="inline-code">data-pixel-label</code></td>
                      <td>Event label</td>
                      <td>"featured_product"</td>
                    </tr>
                    <tr>
                      <td><code className="inline-code">data-pixel-value</code></td>
                      <td>Numeric value</td>
                      <td>"99.99"</td>
                    </tr>
                    <tr>
                      <td><code className="inline-code">data-pixel-product-id</code></td>
                      <td>Product identifier</td>
                      <td>"SKU-123"</td>
                    </tr>
                    <tr>
                      <td><code className="inline-code">data-pixel-product-name</code></td>
                      <td>Product name</td>
                      <td>"Blue Widget"</td>
                    </tr>
                    <tr>
                      <td><code className="inline-code">data-pixel-currency</code></td>
                      <td>Currency code</td>
                      <td>"USD"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* E-commerce Tracking */}
            <section id="ecommerce">
              <h2>
                <div className="section-icon">
                  <Icon source={CartIcon} />
                </div>
                7. E-commerce Tracking
              </h2>
              
              <p>
                Comprehensive e-commerce tracking for Shopify stores and custom implementations.
              </p>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ViewIcon} />
                  </div>
                  Product View
                </h3>
                <p>Automatically tracked on Shopify product pages. For custom implementations:</p>
                <div className="code-block">
                  <span className="function">PixelAnalytics</span>.<span className="function">track</span>(<span className="string">'ViewContent'</span>, {'{\n'}
                  {'  '}<span className="property">content_ids</span>: [<span className="string">'SKU-12345'</span>],{'\n'}
                  {'  '}<span className="property">content_name</span>: <span className="string">'Blue T-Shirt'</span>,{'\n'}
                  {'  '}<span className="property">content_category</span>: <span className="string">'Apparel'</span>,{'\n'}
                  {'  '}<span className="property">value</span>: <span className="number">29.99</span>,{'\n'}
                  {'  '}<span className="property">currency</span>: <span className="string">'USD'</span>{'\n'}
                  {'}'});
                </div>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={CartIcon} />
                  </div>
  Add to Cart
                </h3>
                <div className="code-block">
                  <span className="function">PixelAnalytics</span>.<span className="function">track</span>(<span className="string">'AddToCart'</span>, {'{\n'}
                  {'  '}<span className="property">content_ids</span>: [<span className="string">'SKU-12345'</span>],{'\n'}
                  {'  '}<span className="property">content_name</span>: <span className="string">'Blue T-Shirt'</span>,{'\n'}
                  {'  '}<span className="property">content_type</span>: <span className="string">'product'</span>,{'\n'}
                  {'  '}<span className="property">value</span>: <span className="number">29.99</span>,{'\n'}
                  {'  '}<span className="property">currency</span>: <span className="string">'USD'</span>,{'\n'}
                  {'  '}<span className="property">quantity</span>: <span className="number">1</span>{'\n'}
                  {'}'});
                </div>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={DatabaseIcon} />
                  </div>
                  Initiate Checkout
                </h3>
                <div className="code-block">
                  <span className="function">PixelAnalytics</span>.<span className="function">track</span>(<span className="string">'InitiateCheckout'</span>, {'{\n'}
                  {'  '}<span className="property">content_ids</span>: [<span className="string">'SKU-12345'</span>, <span className="string">'SKU-67890'</span>],{'\n'}
                  {'  '}<span className="property">num_items</span>: <span className="number">2</span>,{'\n'}
                  {'  '}<span className="property">value</span>: <span className="number">59.98</span>,{'\n'}
                  {'  '}<span className="property">currency</span>: <span className="string">'USD'</span>{'\n'}
                  {'}'});
                </div>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={CheckCircleIcon} />
                  </div>
                  Purchase / Order Complete
                </h3>
                <div className="code-block">
                  <span className="function">PixelAnalytics</span>.<span className="function">track</span>(<span className="string">'Purchase'</span>, {'{\n'}
                  {'  '}<span className="property">content_ids</span>: [<span className="string">'SKU-12345'</span>, <span className="string">'SKU-67890'</span>],{'\n'}
                  {'  '}<span className="property">content_type</span>: <span className="string">'product'</span>,{'\n'}
                  {'  '}<span className="property">value</span>: <span className="number">59.98</span>,{'\n'}
                  {'  '}<span className="property">currency</span>: <span className="string">'USD'</span>,{'\n'}
                  {'  '}<span className="property">order_id</span>: <span className="string">'ORDER-123456'</span>,{'\n'}
                  {'  '}<span className="property">num_items</span>: <span className="number">2</span>{'\n'}
                  {'}'});
                </div>
              </div>

              <div className="info-box">
                <strong>Shopify Integration:</strong> When using the Theme Integration feature, purchase 
                events are automatically tracked using Shopify's Web Pixels, which have access to the 
                checkout process.
              </div>
            </section>

            {/* JavaScript API */}
            <section id="javascript-api">
              <h2>
                <div className="section-icon">
                  <Icon source={CodeIcon} />
                </div>
                8. JavaScript API Reference
              </h2>
              
              <p>
                The <code className="inline-code">PixelAnalytics</code> object provides methods for custom tracking.
              </p>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={CodeIcon} />
                  </div>
                  PixelAnalytics.track(eventName, properties)
                </h3>
                <p>Track a custom event with optional properties.</p>
                <div className="code-block">
                  <span className="comment">// Basic event</span>{'\n'}
                  <span className="function">PixelAnalytics</span>.<span className="function">track</span>(<span className="string">'button_click'</span>);{'\n\n'}
                  <span className="comment">// Event with properties</span>{'\n'}
                  <span className="function">PixelAnalytics</span>.<span className="function">track</span>(<span className="string">'signup_complete'</span>, {'{\n'}
                  {'  '}<span className="property">method</span>: <span className="string">'email'</span>,{'\n'}
                  {'  '}<span className="property">plan</span>: <span className="string">'premium'</span>{'\n'}
                  {'}'});
                </div>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={PersonIcon} />
                  </div>
                  PixelAnalytics.identify(userData)
                </h3>
                <p>Associate user data with the current visitor (hashed before sending).</p>
                <div className="code-block">
                  <span className="function">PixelAnalytics</span>.<span className="function">identify</span>({'{\n'}
                  {'  '}<span className="property">email</span>: <span className="string">'user@example.com'</span>,{'\n'}
                  {'  '}<span className="property">phone</span>: <span className="string">'+1234567890'</span>,{'\n'}
                  {'  '}<span className="property">firstName</span>: <span className="string">'John'</span>,{'\n'}
                  {'  '}<span className="property">lastName</span>: <span className="string">'Doe'</span>,{'\n'}
                  {'  '}<span className="property">city</span>: <span className="string">'New York'</span>,{'\n'}
                  {'  '}<span className="property">state</span>: <span className="string">'NY'</span>,{'\n'}
                  {'  '}<span className="property">zip</span>: <span className="string">'10001'</span>,{'\n'}
                  {'  '}<span className="property">country</span>: <span className="string">'US'</span>{'\n'}
                  {'}'});
                </div>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ViewIcon} />
                  </div>
                  PixelAnalytics.pageview()
                </h3>
                <p>Manually trigger a pageview (useful for SPAs).</p>
                <div className="code-block">
                  <span className="comment">// After SPA navigation</span>{'\n'}
                  <span className="function">PixelAnalytics</span>.<span className="function">pageview</span>();{'\n\n'}
                  <span className="comment">// With custom URL</span>{'\n'}
                  <span className="function">PixelAnalytics</span>.<span className="function">pageview</span>(<span className="string">'/custom-page'</span>);
                </div>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={InfoIcon} />
                  </div>
                  Checking if Loaded
                </h3>
                <div className="code-block">
                  <span className="comment">// Check if PixelAnalytics is available</span>{'\n'}
                  <span className="keyword">if</span> (<span className="keyword">typeof</span> <span className="function">PixelAnalytics</span> !== <span className="string">'undefined'</span>) {'{\n'}
                  {'  '}<span className="function">PixelAnalytics</span>.<span className="function">track</span>(<span className="string">'my_event'</span>);{'\n'}
                  {'}'}{'\n\n'}
                  <span className="comment">// Or wait for it to load</span>{'\n'}
                  <span className="property">window</span>.<span className="function">addEventListener</span>(<span className="string">'PixelAnalyticsReady'</span>, <span className="keyword">function</span>() {'{\n'}
                  {'  '}<span className="function">PixelAnalytics</span>.<span className="function">track</span>(<span className="string">'my_event'</span>);{'\n'}
                  {'}'});
                </div>
              </div>
            </section>

            {/* Theme Integration */}
            <section id="theme-integration">
              <h2>
                <div className="section-icon">
                  <Icon source={AppsIcon} />
                </div>
                9. Theme Integration (Shopify Web Pixels)
              </h2>
              
              <p>
                Use Shopify's native Web Pixels for enhanced checkout tracking on Shopify Plus stores.
              </p>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={SettingsIcon} />
                  </div>
                  Setting Up Web Pixel
                </h3>
                <ol>
                  <li>Navigate to <strong>Theme Integration</strong> in the app</li>
                  <li>Click <strong>"Install Web Pixel"</strong></li>
                  <li>The pixel will be automatically configured</li>
                  <li>Checkout events will now be tracked</li>
                </ol>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ChartLineIcon} />
                  </div>
                  Checkout Events Tracked
                </h3>
                <ul>
                  <li><strong>checkout_started</strong> - Customer begins checkout</li>
                  <li><strong>payment_info_submitted</strong> - Payment details entered</li>
                  <li><strong>checkout_completed</strong> - Order successfully placed</li>
                  <li><strong>checkout_address_info_submitted</strong> - Shipping address entered</li>
                  <li><strong>checkout_contact_info_submitted</strong> - Contact info entered</li>
                </ul>
              </div>

              <div className="info-box">
                <strong>Why Web Pixels?</strong> Shopify restricts third-party JavaScript on checkout pages for security. 
                Web Pixels run in a sandboxed environment with access to checkout events that regular scripts cannot access.
              </div>
            </section>

            {/* Settings */}
            <section id="settings">
              <h2>
                <div className="section-icon">
                  <Icon source={SettingsIcon} />
                </div>
                10. Settings & Configuration
              </h2>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={LockIcon} />
                  </div>
                  Privacy Settings
                </h3>
                <ul>
                  <li><strong>IP Anonymization:</strong> Mask visitor IP addresses</li>
                  <li><strong>Location Tracking:</strong> Enable/disable geographic data collection</li>
                  <li><strong>Cookie Consent:</strong> Respect Do Not Track headers</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={DatabaseIcon} />
                  </div>
                  Data Settings
                </h3>
                <ul>
                  <li><strong>Data Retention:</strong> How long to keep event data</li>
                  <li><strong>Sampling Rate:</strong> Track percentage of traffic</li>
                  <li><strong>Excluded IPs:</strong> Ignore traffic from specific IPs</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={TargetIcon} />
                  </div>
                  Pixel Settings
                </h3>
                <ul>
                  <li><strong>Test Mode:</strong> Send events to Meta's test environment</li>
                  <li><strong>Event Deduplication:</strong> Prevent duplicate events</li>
                  <li><strong>Event Mapping:</strong> Map custom events to standard Meta events</li>
                </ul>
              </div>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting">
              <h2>
                <div className="section-icon">
                  <Icon source={WrenchIcon} />
                </div>
                11. Troubleshooting
              </h2>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={AlertTriangleIcon} />
                  </div>
                  Events Not Showing in Dashboard
                </h3>
                <ol>
                  <li>Check browser DevTools Network tab for <code className="inline-code">pixel.js</code> loading</li>
                  <li>Verify the pixel ID in your installation code is correct</li>
                  <li>Ensure there are no JavaScript errors in the console</li>
                  <li>Check if ad blockers are preventing the script from loading</li>
                  <li>Verify the domain is allowed in your pixel settings</li>
                </ol>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={AlertTriangleIcon} />
                  </div>
                  Meta Pixel Events Not Working
                </h3>
                <ol>
                  <li>Verify your Pixel ID is correct (16 digits)</li>
                  <li>Check that the Conversions API token is valid</li>
                  <li>Use the <Link url="https://business.facebook.com/events_manager" external>Meta Events Manager</Link> Test Events feature</li>
                  <li>Check the Pixel Tracker logs for API errors</li>
                </ol>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={AlertTriangleIcon} />
                  </div>
                  Custom Events Not Tracking
                </h3>
                <ul>
                  <li>Ensure <code className="inline-code">data-pixel-event</code> attribute is present</li>
                  <li>Check that the element is clickable</li>
                  <li>Verify the CSS selector matches the element (for dashboard-configured events)</li>
                  <li>Check the browser console for PixelAnalytics errors</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={CodeIcon} />
                  </div>
                  Debug Mode
                </h3>
                <p>Enable debug mode to see detailed logging:</p>
                <div className="code-block">
                  <span className="comment">// In browser console</span>{'\n'}
                  <span className="property">localStorage</span>.<span className="function">setItem</span>(<span className="string">'pixelDebug'</span>, <span className="string">'true'</span>);{'\n'}
                  <span className="comment">// Refresh the page</span>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2>
                <div className="section-icon">
                  <Icon source={QuestionCircleIcon} />
                </div>
                12. Frequently Asked Questions
              </h2>

              <div className="docs-section">
                <h3>How many pixels can I create?</h3>
                <p>
                  You can create multiple Facebook Pixels per store. Each pixel operates independently 
                  and can be enabled/disabled as needed.
                </p>
              </div>

              <div className="docs-section">
                <h3>Does this work with headless Shopify?</h3>
                <p>
                  Yes! You can use the JavaScript API on any frontend. Just include the tracking script 
                  and use the <code className="inline-code">PixelAnalytics.track()</code> method.
                </p>
              </div>

              <div className="docs-section">
                <h3>Is the data GDPR compliant?</h3>
                <p>
                  Yes. Pixel Tracker supports IP anonymization, respects Do Not Track headers, and 
                  provides data deletion capabilities. All personal data sent to Meta is hashed using SHA-256.
                </p>
              </div>

              <div className="docs-section">
                <h3>How does deduplication work?</h3>
                <p>
                  Each event is assigned a unique event ID. When using both browser and server-side 
                  tracking, Meta uses this ID to deduplicate events automatically.
                </p>
              </div>

              <div className="docs-section">
                <h3>Can I track events on external domains?</h3>
                <p>
                  Yes, you can install the tracking script on any domain. Just add the allowed domains 
                  in your pixel settings.
                </p>
              </div>

              <div className="docs-section">
                <h3>What happens if the tracking script fails to load?</h3>
                <p>
                  The tracking script is designed to fail silently without affecting your website's 
                  functionality. Users will still have a normal browsing experience.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2>
                <div className="section-icon">
                  <Icon source={EmailIcon} />
                </div>
                Need Help?
              </h2>
              
              <div className="docs-section" style={{ borderLeftColor: "#22c55e" }}>
                <InlineStack gap="300" align="start">
                  <div className="icon-wrapper" style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" }}>
                    <Icon source={EmailIcon} />
                  </div>
              <BlockStack gap="200">
                    <h3 style={{ marginTop: 0 }}>Contact Support</h3>
                    <p><strong>Warewe Consultancy Private Limited</strong></p>
                    <p>
                      Email: <Link url="mailto:support@warewe.online">support@warewe.online</Link>
                    </p>
                    <p>
                      Website: <Link url="https://pixelify.warewe.online" external>pixelify.warewe.online</Link>
                    </p>
              </BlockStack>
                </InlineStack>
              </div>
            </section>

            <div className="footer-note">
              <div style={{ width: "32px", height: "32px", margin: "0 auto 1rem", color: "#5c6ac4" }}>
                <Icon source={BookOpenIcon} />
              </div>
              <p style={{ fontSize: "1rem", fontWeight: "500" }}>
                Documentation last updated: January 2025
              </p>
              <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
                <Link url="/privacy-policy">Privacy Policy</Link>
              </p>
            </div>
            </BlockStack>
        </div>
      </div>
    </Page>
  );
}
