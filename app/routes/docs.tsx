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
                  <Icon source={CheckCircleIcon} /> Zero-Code Installation
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
                <span className="feature-badge">
                  <Icon source={LockIcon} /> Anti-Adblocker
                </span>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="toc-container">
              <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>
                <Icon source={ClipboardIcon} /> Table of Contents
              </h3>
              <ul>
                <li><a href="#quick-start">🚀 Quick Start (3 Minutes)</a></li>
                <li><a href="#how-it-works">⚙️ How It Works</a></li>
                <li><a href="#dashboard">📊 Dashboard Overview</a></li>
                <li><a href="#pixels">🎯 Facebook/Meta Pixels</a></li>
                <li><a href="#auto-tracking">⚡ Automatic Tracking</a></li>
                <li><a href="#custom-events">🛠️ Custom Events</a></li>
                <li><a href="#ecommerce">🛒 E-commerce Tracking</a></li>
                <li><a href="#javascript-api">💻 JavaScript API</a></li>
                <li><a href="#settings">⚙️ Settings</a></li>
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
                1. Quick Start Guide (3 Minutes)
              </h2>
              
              <div className="success-box">
                <strong>Zero-Code Setup:</strong> No theme editing required! Just enable the App Embed and you're done.
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
                  Enter a name for your pixel. Optionally add your Facebook Pixel ID for Meta integration.
                </p>
              </div>

              <div className="docs-section">
                <h3><span className="step-number">3</span> Enable the App Embed (Required)</h3>
                <p>
                  This is the most important step! Enable the tracking script on your store:
                </p>
                <ol>
                  <li>Go to <strong>Online Store → Themes</strong> in your Shopify Admin</li>
                  <li>Click <strong>Customize</strong> on your active theme</li>
                  <li>Click the <strong>puzzle icon</strong> (App embeds) in the left sidebar</li>
                  <li>Find <strong>"Pixel Tracker"</strong> and toggle it <strong>ON</strong></li>
                  <li>Click <strong>Save</strong> in the top right</li>
                </ol>
                <div className="info-box">
                  <strong>Why App Embed?</strong> This method uses Shopify's App Proxy to route all tracking 
                  requests through your store's domain, making it immune to ad blockers and avoiding CORS errors.
                </div>
              </div>

              <div className="docs-section">
                <h3><span className="step-number">4</span> Verify Installation</h3>
                <p>
                  Visit your store in a new browser tab. Open DevTools (F12) → Console. You should see:
                </p>
                <div className="code-block">
                  <span className="comment">[PixelTracker] Starting for shop: your-store.myshopify.com</span>{'\n'}
                  <span className="comment">[PixelTracker] Config response: 200</span>{'\n'}
                  <span className="comment">[PixelTracker] Config data: {'{'}pixelId: '...', ...{'}'}</span>{'\n'}
                  <span className="comment">[PixelTracker] Ready: pixel_xxxxx</span>{'\n'}
                  <span className="comment">[PixelTracker] pageview {'{'}...{'}'}</span>{'\n'}
                  <span className="comment">[PixelTracker] Track response: 200</span>
                </div>
                <p>
                  Check your Pixel Tracker dashboard - you should see your first pageview event within seconds!
                </p>
              </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works">
              <h2>
                <div className="section-icon">
                  <Icon source={SettingsIcon} />
                </div>
                2. How It Works
              </h2>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={GlobeIcon} />
                  </div>
                  Architecture Overview
                </h3>
                <p>
                  Pixel Tracker uses a sophisticated server-side tracking architecture:
                </p>
                <ol>
                  <li><strong>Theme App Extension (App Embed):</strong> Injects a small script into your store's {'<head>'}</li>
                  <li><strong>Shopify App Proxy:</strong> Routes requests through <code className="inline-code">/apps/pixel-api/*</code> on your store domain</li>
                  <li><strong>Server-Side Processing:</strong> Events are processed on our servers with geo-location, device detection, and session tracking</li>
                  <li><strong>Database Storage:</strong> All events are stored securely for analytics</li>
                  <li><strong>Meta Conversions API:</strong> Events are forwarded to Facebook server-side (optional)</li>
                </ol>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={LockIcon} />
                  </div>
                  Anti-Adblocker Technology
                </h3>
                <p>
                  Because all tracking requests go through your store's domain (via Shopify App Proxy), 
                  ad blockers cannot distinguish tracking requests from normal store requests. This ensures:
                </p>
                <ul>
                  <li>100% event capture regardless of ad blockers</li>
                  <li>No CORS errors (same-origin requests)</li>
                  <li>Better data accuracy than traditional pixel tracking</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={DatabaseIcon} />
                  </div>
                  Data Collected
                </h3>
                <table className="event-table">
                  <thead>
                    <tr>
                      <th>Data Type</th>
                      <th>Description</th>
                      <th>Configurable</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Page URL</strong></td>
                      <td>Full URL of the visited page</td>
                      <td>Always collected</td>
                    </tr>
                    <tr>
                      <td><strong>Referrer</strong></td>
                      <td>Where the visitor came from</td>
                      <td>Always collected</td>
                    </tr>
                    <tr>
                      <td><strong>Device Info</strong></td>
                      <td>Browser, OS, screen size</td>
                      <td>Always collected</td>
                    </tr>
                    <tr>
                      <td><strong>IP Address</strong></td>
                      <td>Visitor's IP (for geo-location)</td>
                      <td>Can be disabled</td>
                    </tr>
                    <tr>
                      <td><strong>Location</strong></td>
                      <td>City, region, country</td>
                      <td>Can be disabled</td>
                    </tr>
                    <tr>
                      <td><strong>Session ID</strong></td>
                      <td>Unique session identifier</td>
                      <td>Can be disabled</td>
                    </tr>
                    <tr>
                      <td><strong>UTM Parameters</strong></td>
                      <td>Marketing campaign data</td>
                      <td>Always collected</td>
                    </tr>
                  </tbody>
                </table>
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
                The Pixel Tracker dashboard provides comprehensive analytics for your store:
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
                  <li><strong>Unique Visitors:</strong> Number of unique visitors</li>
                  <li><strong>Page Views:</strong> Total page view count</li>
                  <li><strong>Sessions:</strong> Browsing session count</li>
                  <li><strong>Active Now:</strong> Real-time visitor count (last 5 minutes)</li>
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
                  <li><strong>Traffic Sources:</strong> Where your visitors come from</li>
                  <li><strong>Device Breakdown:</strong> Desktop vs Mobile vs Tablet</li>
                  <li><strong>Browser Statistics:</strong> Chrome, Safari, Firefox, etc.</li>
                  <li><strong>Geographic Data:</strong> Countries, regions, cities</li>
                  <li><strong>Top Events:</strong> Most frequent event types</li>
                  <li><strong>Top Pages:</strong> Most visited URLs</li>
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
                  <li><strong>Session Details:</strong> Pages viewed, time on site</li>
                  <li><strong>Device Info:</strong> Browser, OS, screen size</li>
                  <li><strong>Location:</strong> Country and city</li>
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
                  <li><strong>Event Filtering:</strong> Filter by event type, date</li>
                  <li><strong>Event Details:</strong> Full payload for each event</li>
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
                Pixel Tracker integrates with Facebook/Meta Pixel through both browser-side and 
                server-side (Conversions API) tracking.
              </p>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={SettingsIcon} />
                  </div>
                  Setting Up Meta Integration
                </h3>
                <ol>
                  <li>Go to <Link url="https://business.facebook.com/events_manager" external>Meta Events Manager</Link></li>
                  <li>Select or create a Pixel</li>
                  <li>Copy your <strong>Pixel ID</strong> (16-digit number)</li>
                  <li>In Pixel Tracker, go to <strong>Settings</strong></li>
                  <li>Select your pixel and enable <strong>Meta Pixel Integration</strong></li>
                  <li>Enter your Pixel ID</li>
                  <li>Optionally add your <strong>Conversions API Access Token</strong> for server-side tracking</li>
                </ol>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ChartLineIcon} />
                  </div>
                  Events Sent to Meta
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
                      <td>Product ID, name, price</td>
                    </tr>
                    <tr>
                      <td><strong>AddToCart</strong></td>
                      <td>Add to cart action</td>
                      <td>Product ID, quantity, value</td>
                    </tr>
                    <tr>
                      <td><strong>Purchase</strong></td>
                      <td>Order completed (webhook)</td>
                      <td>Order ID, value, products</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="warning-box">
                <strong>Important:</strong> The Conversions API access token is sensitive. 
                Never share it publicly.
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
                Pixel Tracker automatically captures various user interactions without any additional code.
                Configure these in <strong>Settings</strong>:
              </p>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ViewIcon} />
                  </div>
                  Page Views (Default: ON)
                </h3>
                <ul>
                  <li>Captured on every page load</li>
                  <li>Includes full URL, page title, and referrer</li>
                  <li>Tracks UTM parameters automatically</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={TargetIcon} />
                  </div>
                  Click Tracking (Default: ON)
                </h3>
                <ul>
                  <li>Tracks clicks on links, buttons, and interactive elements</li>
                  <li>Records element type, text content, and href</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ChartLineIcon} />
                  </div>
                  Scroll Depth (Default: OFF)
                </h3>
                <ul>
                  <li>Tracks how far users scroll on each page</li>
                  <li>Recorded at 25%, 50%, 75%, and 100% thresholds</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={GlobeIcon} />
                  </div>
                  UTM Parameters (Always ON)
                </h3>
                <p>Automatically captures marketing campaign parameters:</p>
                <ul>
                  <li><code className="inline-code">utm_source</code> - Traffic source</li>
                  <li><code className="inline-code">utm_medium</code> - Marketing medium</li>
                  <li><code className="inline-code">utm_campaign</code> - Campaign name</li>
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
                Track specific user interactions using the dashboard or JavaScript API.
              </p>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={SettingsIcon} />
                  </div>
                  Method 1: Dashboard (No-Code)
                </h3>
                <p>
                  Configure tracking rules without touching code:
                </p>
                <ol>
                  <li>Go to <strong>Custom Events</strong> in the dashboard</li>
                  <li>Click <strong>"Add Custom Event"</strong></li>
                  <li>Enter a name (e.g., "newsletter_signup")</li>
                  <li>Enter a CSS selector (e.g., <code className="inline-code">#newsletter-form</code>)</li>
                  <li>Choose the trigger type (click, submit, change)</li>
                  <li>Save the rule</li>
                </ol>
                <div className="info-box">
                  <strong>Pro Tip:</strong> Use browser DevTools (right-click → Inspect) to find CSS selectors.
                </div>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={CodeIcon} />
                  </div>
                  Method 2: Data Attributes
                </h3>
                <p>
                  Add data attributes to any HTML element:
                </p>
                <div className="code-block">
                  <span className="comment">{'<!-- Track button clicks -->'}</span>{'\n'}
                  <span className="keyword">{'<button'}</span> <span className="property">data-pixel-event</span>=<span className="string">"signup_click"</span><span className="keyword">{'>'}</span>{'\n'}
                  {'  Sign Up'}{'\n'}
                  <span className="keyword">{'</button>'}</span>
                </div>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={CodeIcon} />
                  </div>
                  Method 3: JavaScript API
                </h3>
                <div className="code-block">
                  <span className="comment">// Track custom event</span>{'\n'}
                  <span className="function">PixelAnalytics</span>.<span className="function">track</span>(<span className="string">'newsletter_signup'</span>, {'{\n'}
                  {'  '}<span className="property">email</span>: <span className="string">'user@example.com'</span>{'\n'}
                  {'}'});
                </div>
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
                Pixel Tracker provides built-in e-commerce tracking methods:
              </p>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ViewIcon} />
                  </div>
                  Track Product View
                </h3>
                <div className="code-block">
                  <span className="function">PixelAnalytics</span>.<span className="function">trackViewContent</span>({'\n'}
                  {'  '}<span className="string">'SKU-12345'</span>,      <span className="comment">// Product ID</span>{'\n'}
                  {'  '}<span className="string">'Blue T-Shirt'</span>,   <span className="comment">// Product Name</span>{'\n'}
                  {'  '}<span className="number">29.99</span>,            <span className="comment">// Price</span>{'\n'}
                  {'  '}<span className="string">'Apparel'</span>         <span className="comment">// Category</span>{'\n'}
                  {');'}
                </div>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={CartIcon} />
                  </div>
                  Track Add to Cart
                </h3>
                <div className="code-block">
                  <span className="function">PixelAnalytics</span>.<span className="function">trackAddToCart</span>({'\n'}
                  {'  '}<span className="string">'SKU-12345'</span>,      <span className="comment">// Product ID</span>{'\n'}
                  {'  '}<span className="string">'Blue T-Shirt'</span>,   <span className="comment">// Product Name</span>{'\n'}
                  {'  '}<span className="number">29.99</span>,            <span className="comment">// Price</span>{'\n'}
                  {'  '}<span className="number">1</span>                 <span className="comment">// Quantity</span>{'\n'}
                  {');'}
                </div>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={CheckCircleIcon} />
                  </div>
                  Track Purchase
                </h3>
                <div className="code-block">
                  <span className="function">PixelAnalytics</span>.<span className="function">trackPurchase</span>({'\n'}
                  {'  '}<span className="number">59.98</span>,            <span className="comment">// Total Value</span>{'\n'}
                  {'  '}<span className="string">'USD'</span>,            <span className="comment">// Currency</span>{'\n'}
                  {'  '}<span className="string">'ORDER-123'</span>,      <span className="comment">// Order ID</span>{'\n'}
                  {'  '}[...]                 <span className="comment">// Products array</span>{'\n'}
                  {');'}
                </div>
                <div className="info-box">
                  <strong>Server-Side Purchase Tracking:</strong> Purchases are also tracked automatically 
                  via Shopify webhooks, ensuring 100% capture even if the customer closes the browser.
                </div>
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
                The <code className="inline-code">PixelAnalytics</code> object is available globally after the script loads.
              </p>

              <div className="docs-section">
                <h3>Methods</h3>
                <table className="event-table">
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code className="inline-code">track(eventName, props)</code></td>
                      <td>Track a custom event</td>
                    </tr>
                    <tr>
                      <td><code className="inline-code">trackPurchase(value, currency, orderId, products)</code></td>
                      <td>Track a purchase</td>
                    </tr>
                    <tr>
                      <td><code className="inline-code">trackAddToCart(productId, name, value, qty)</code></td>
                      <td>Track add to cart</td>
                    </tr>
                    <tr>
                      <td><code className="inline-code">trackViewContent(productId, name, value, category)</code></td>
                      <td>Track product view</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="docs-section">
                <h3>Shorthand</h3>
                <p>You can also use the shorthand <code className="inline-code">px()</code> function:</p>
                <div className="code-block">
                  <span className="comment">// These are equivalent:</span>{'\n'}
                  <span className="function">PixelAnalytics</span>.<span className="function">track</span>(<span className="string">'my_event'</span>);{'\n'}
                  <span className="function">px</span>(<span className="string">'my_event'</span>);
                </div>
              </div>
            </section>

            {/* Settings */}
            <section id="settings">
              <h2>
                <div className="section-icon">
                  <Icon source={SettingsIcon} />
                </div>
                9. Settings & Configuration
              </h2>

              <div className="docs-section">
                <h3>Automatic Tracking Settings</h3>
                <ul>
                  <li><strong>Auto-track pageviews:</strong> Track page loads automatically</li>
                  <li><strong>Auto-track clicks:</strong> Track link and button clicks</li>
                  <li><strong>Auto-track scroll depth:</strong> Track scroll milestones</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>Privacy Settings</h3>
                <ul>
                  <li><strong>Record IP addresses:</strong> Store visitor IPs for geo-location</li>
                  <li><strong>Record location data:</strong> Store city/country information</li>
                  <li><strong>Record session data:</strong> Track sessions across pages</li>
                </ul>
              </div>

              <div className="docs-section">
                <h3>Meta Integration Settings</h3>
                <ul>
                  <li><strong>Enable Meta Pixel forwarding:</strong> Send events to Facebook</li>
                  <li><strong>Meta Pixel ID:</strong> Your 16-digit pixel ID</li>
                  <li><strong>Access Token:</strong> For Conversions API (optional)</li>
                  <li><strong>Test Event Code:</strong> For testing in Events Manager</li>
                </ul>
              </div>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting">
              <h2>
                <div className="section-icon">
                  <Icon source={WrenchIcon} />
                </div>
                10. Troubleshooting
              </h2>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={AlertTriangleIcon} />
                  </div>
                  No events showing in dashboard
                </h3>
                <ol>
                  <li><strong>Check App Embed is enabled:</strong> Online Store → Themes → Customize → App embeds → Pixel Tracker ON</li>
                  <li><strong>Check console for errors:</strong> Open DevTools (F12) → Console</li>
                  <li><strong>Look for [PixelTracker] messages:</strong> You should see "Starting for shop..." and "Track response: 200"</li>
                  <li><strong>Verify pixel exists:</strong> Go to Facebook Pixels in the app and ensure you have at least one pixel created</li>
                </ol>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={AlertTriangleIcon} />
                  </div>
                  "Config data: error" in console
                </h3>
                <p>This means the pixel configuration couldn't be loaded:</p>
                <ol>
                  <li>Ensure you have created at least one pixel in the app</li>
                  <li>Check that your app is properly installed</li>
                  <li>Try reinstalling the app if the issue persists</li>
                </ol>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={AlertTriangleIcon} />
                  </div>
                  CORB or CORS errors
                </h3>
                <p>If you see Cross-Origin errors:</p>
                <ol>
                  <li>Go to <strong>Settings</strong> in the app</li>
                  <li>Click <strong>"Delete Old Script Tags"</strong></li>
                  <li>This removes any legacy script tags that may conflict</li>
                  <li>Ensure you're using the App Embed method (not manual script tags)</li>
                </ol>
              </div>

              <div className="docs-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={CodeIcon} />
                  </div>
                  Debug Mode
                </h3>
                <p>The tracking script has debug mode enabled by default. Check your browser console for detailed logs:</p>
                <ul>
                  <li><code className="inline-code">[PixelTracker] Starting for shop:</code> - Script initialized</li>
                  <li><code className="inline-code">[PixelTracker] Config response: 200</code> - Config loaded successfully</li>
                  <li><code className="inline-code">[PixelTracker] pageview {'{...}'}</code> - Event being sent</li>
                  <li><code className="inline-code">[PixelTracker] Track response: 200</code> - Event saved successfully</li>
                </ul>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2>
                <div className="section-icon">
                  <Icon source={QuestionCircleIcon} />
                </div>
                11. Frequently Asked Questions
              </h2>

              <div className="docs-section">
                <h3>Do I need to edit my theme code?</h3>
                <p>
                  <strong>No!</strong> Just enable the App Embed in your theme editor. No code editing required.
                </p>
              </div>

              <div className="docs-section">
                <h3>Will ad blockers affect tracking?</h3>
                <p>
                  <strong>No.</strong> Because tracking goes through your store's domain via Shopify App Proxy, 
                  ad blockers cannot distinguish it from normal store requests.
                </p>
              </div>

              <div className="docs-section">
                <h3>Is purchase tracking automatic?</h3>
                <p>
                  <strong>Yes.</strong> Purchases are tracked via Shopify webhooks (server-side), ensuring 
                  100% capture even if the customer closes their browser after payment.
                </p>
              </div>

              <div className="docs-section">
                <h3>Can I track multiple stores?</h3>
                <p>
                  Each store installation is independent. Install the app on each store you want to track.
                </p>
              </div>

              <div className="docs-section">
                <h3>Is the data GDPR compliant?</h3>
                <p>
                  Yes. You can disable IP recording and location tracking in Settings. 
                  All data sent to Meta is hashed using SHA-256.
                </p>
              </div>

              <div className="docs-section">
                <h3>Why is my store password protected?</h3>
                <p>
                  Shopify requires a paid plan to remove password protection. You can still test 
                  tracking by entering the password and checking the console for [PixelTracker] messages.
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
                Documentation last updated: December 2024
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
