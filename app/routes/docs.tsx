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
    <Page fullWidth>
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
          
          .docs-page {
            font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #e2e8f0;
            max-width: 1100px;
            margin: 0 auto;
            padding: 60px 32px 80px;
          }
          
          /* Hero Section */
          .hero {
            text-align: center;
            padding: 80px 0 60px;
            position: relative;
          }
          .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
            pointer-events: none;
          }
          .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.3);
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 0.875rem;
            color: #a5b4fc;
            margin-bottom: 24px;
          }
          .hero h1 {
            font-size: 4rem;
            font-weight: 700;
            margin: 0 0 20px;
            background: linear-gradient(135deg, #fff 0%, #a5b4fc 50%, #6366f1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.02em;
          }
          .hero-subtitle {
            font-size: 1.25rem;
            color: #94a3b8;
            max-width: 600px;
            margin: 0 auto 40px;
            line-height: 1.7;
          }
          .hero-features {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
            margin-top: 32px;
          }
          .feature-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 10px 18px;
            border-radius: 50px;
            font-size: 0.9rem;
            color: #e2e8f0;
            transition: all 0.3s ease;
          }
          .feature-pill:hover {
            background: rgba(99, 102, 241, 0.1);
            border-color: rgba(99, 102, 241, 0.3);
            transform: translateY(-2px);
          }
          .feature-pill svg {
            width: 18px;
            height: 18px;
            color: #6366f1;
          }
          
          /* Table of Contents */
          .toc {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 20px;
            padding: 32px;
            margin: 48px 0 64px;
            backdrop-filter: blur(10px);
          }
          .toc h3 {
            font-size: 1.1rem;
            font-weight: 600;
            color: #a5b4fc;
            margin: 0 0 20px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .toc-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 8px;
          }
          .toc-link {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            border-radius: 10px;
            color: #cbd5e1;
            text-decoration: none;
            font-size: 0.95rem;
            transition: all 0.2s ease;
          }
          .toc-link:hover {
            background: rgba(99, 102, 241, 0.1);
            color: #fff;
            transform: translateX(4px);
          }
          .toc-link span {
            font-size: 1.1rem;
          }
          
          /* Section Styles */
          .section {
            margin: 80px 0;
            scroll-margin-top: 40px;
          }
          .section-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 32px;
          }
          .section-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
          }
          .section-icon svg {
            width: 24px;
            height: 24px;
          }
          .section h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #fff;
            margin: 0;
            letter-spacing: -0.01em;
          }
          .section-intro {
            font-size: 1.1rem;
            color: #94a3b8;
            line-height: 1.8;
            margin-bottom: 32px;
          }
          
          /* Cards */
          .card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 16px;
            padding: 28px;
            margin: 20px 0;
            transition: all 0.3s ease;
          }
          .card:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(99, 102, 241, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          }
          .card h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #fff;
            margin: 0 0 16px;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .card p {
            color: #94a3b8;
            line-height: 1.8;
            margin: 0 0 16px;
          }
          .card ul, .card ol {
            margin: 16px 0;
            padding-left: 24px;
          }
          .card li {
            color: #cbd5e1;
            margin: 10px 0;
            line-height: 1.7;
          }
          .card li::marker {
            color: #6366f1;
          }
          .card strong {
            color: #fff;
            font-weight: 600;
          }
          
          /* Step Cards */
          .step-card {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
            border: 1px solid rgba(99, 102, 241, 0.15);
            border-radius: 16px;
            padding: 28px;
            margin: 16px 0;
            position: relative;
            overflow: hidden;
          }
          .step-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%);
          }
          .step-number {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border-radius: 10px;
            color: white;
            font-weight: 700;
            font-size: 0.9rem;
            margin-right: 12px;
          }
          .step-card h3 {
            display: flex;
            align-items: center;
            font-size: 1.15rem;
            font-weight: 600;
            color: #fff;
            margin: 0 0 12px;
          }
          .step-card p {
            color: #94a3b8;
            line-height: 1.8;
            margin: 0;
          }
          
          /* Code Blocks */
          .code-block {
            background: #0d1117;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px 24px;
            margin: 16px 0;
            overflow-x: auto;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875rem;
            line-height: 1.7;
          }
          .code-block .comment { color: #6e7681; }
          .code-block .keyword { color: #ff7b72; }
          .code-block .string { color: #a5d6ff; }
          .code-block .function { color: #d2a8ff; }
          .code-block .property { color: #79c0ff; }
          .code-block .number { color: #ffa657; }
          
          .inline-code {
            background: rgba(99, 102, 241, 0.15);
            color: #a5b4fc;
            padding: 3px 8px;
            border-radius: 6px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85em;
          }
          
          /* Alert Boxes */
          .alert {
            border-radius: 12px;
            padding: 20px 24px;
            margin: 20px 0;
            display: flex;
            gap: 16px;
          }
          .alert-icon {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
            margin-top: 2px;
          }
          .alert-success {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.2);
          }
          .alert-success .alert-icon { color: #22c55e; }
          .alert-info {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.2);
          }
          .alert-info .alert-icon { color: #3b82f6; }
          .alert-warning {
            background: rgba(251, 191, 36, 0.1);
            border: 1px solid rgba(251, 191, 36, 0.2);
          }
          .alert-warning .alert-icon { color: #fbbf24; }
          .alert-content {
            flex: 1;
          }
          .alert-content strong {
            color: #fff;
            display: block;
            margin-bottom: 4px;
          }
          .alert-content p {
            color: #94a3b8;
            margin: 0;
            line-height: 1.6;
          }
          
          /* Tables */
          .table-wrapper {
            overflow-x: auto;
            margin: 20px 0;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.06);
          }
          .data-table {
            width: 100%;
            border-collapse: collapse;
          }
          .data-table th {
            background: rgba(99, 102, 241, 0.1);
            padding: 14px 20px;
            text-align: left;
            font-weight: 600;
            color: #a5b4fc;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .data-table td {
            padding: 14px 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.04);
            color: #cbd5e1;
          }
          .data-table tr:hover td {
            background: rgba(255, 255, 255, 0.02);
          }
          
          /* Footer */
          .footer {
            margin-top: 100px;
            padding: 48px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 20px;
            text-align: center;
          }
          .footer-logo {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            color: white;
          }
          .footer h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #fff;
            margin: 0 0 8px;
          }
          .footer p {
            color: #94a3b8;
            margin: 8px 0;
          }
          .footer a {
            color: #a5b4fc;
            text-decoration: none;
            transition: color 0.2s;
          }
          .footer a:hover {
            color: #fff;
          }
          .footer-divider {
            height: 1px;
            background: rgba(255, 255, 255, 0.06);
            margin: 32px 0;
          }
          .footer-bottom {
            font-size: 0.875rem;
            color: #64748b;
          }
          
          /* Responsive */
          @media (max-width: 768px) {
            .docs-page { padding: 40px 20px; }
            .hero h1 { font-size: 2.5rem; }
            .hero-subtitle { font-size: 1rem; }
            .section h2 { font-size: 1.5rem; }
            .toc-grid { grid-template-columns: 1fr; }
          }
        `}</style>

        <div className="docs-page">
          {/* Hero Section */}
          <div className="hero">
            <div className="hero-badge">
              <span>📚</span> Documentation
            </div>
            <h1>Pixel Tracker</h1>
            <p className="hero-subtitle">
              The complete guide to implementing powerful, adblocker-proof analytics 
              on your Shopify store. Get started in under 3 minutes.
            </p>
            <div className="hero-features">
              <div className="feature-pill">
                <Icon source={CheckCircleIcon} />
                Zero-Code Setup
              </div>
              <div className="feature-pill">
                <Icon source={LockIcon} />
                Anti-Adblocker
              </div>
              <div className="feature-pill">
                <Icon source={ChartLineIcon} />
                Real-time Analytics
              </div>
              <div className="feature-pill">
                <Icon source={TargetIcon} />
                Meta Integration
              </div>
              <div className="feature-pill">
                <Icon source={CartIcon} />
                E-commerce Tracking
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="toc">
            <h3>
              <Icon source={ClipboardIcon} />
              Quick Navigation
            </h3>
            <div className="toc-grid">
              <a href="#quick-start" className="toc-link"><span>🚀</span> Quick Start</a>
              <a href="#how-it-works" className="toc-link"><span>⚙️</span> How It Works</a>
              <a href="#dashboard" className="toc-link"><span>📊</span> Dashboard</a>
              <a href="#meta-pixel" className="toc-link"><span>🎯</span> Meta Pixel</a>
              <a href="#auto-tracking" className="toc-link"><span>⚡</span> Auto Tracking</a>
              <a href="#custom-events" className="toc-link"><span>🛠️</span> Custom Events</a>
              <a href="#ecommerce" className="toc-link"><span>🛒</span> E-commerce</a>
              <a href="#api" className="toc-link"><span>💻</span> JavaScript API</a>
              <a href="#settings" className="toc-link"><span>⚙️</span> Settings</a>
              <a href="#troubleshooting" className="toc-link"><span>🔧</span> Troubleshooting</a>
              <a href="#faq" className="toc-link"><span>❓</span> FAQ</a>
            </div>
          </div>

          {/* Quick Start */}
          <section id="quick-start" className="section">
            <div className="section-header">
              <div className="section-icon">
                <Icon source={PlayIcon} />
              </div>
              <h2>Quick Start</h2>
            </div>
            
            <div className="alert alert-success">
              <div className="alert-icon">
                <Icon source={CheckCircleIcon} />
              </div>
              <div className="alert-content">
                <strong>3-Minute Setup</strong>
                <p>No theme editing required! Just enable the App Embed and start tracking.</p>
              </div>
            </div>

            <div className="step-card">
              <h3><span className="step-number">1</span> Install the App</h3>
              <p>Install Pixel Tracker from the Shopify App Store. You'll be redirected to the dashboard automatically.</p>
            </div>

            <div className="step-card">
              <h3><span className="step-number">2</span> Create Your Pixel</h3>
              <p>Go to <strong>Facebook Pixels</strong> → Click <strong>"Add Facebook Pixel"</strong> → Enter a name. Optionally add your Meta Pixel ID.</p>
            </div>

            <div className="step-card">
              <h3><span className="step-number">3</span> Enable App Embed</h3>
              <p>This is the key step! Go to <strong>Online Store → Themes → Customize</strong> → Click the <strong>puzzle icon</strong> (App embeds) → Toggle <strong>"Pixel Tracker" ON</strong> → <strong>Save</strong></p>
            </div>

            <div className="step-card">
              <h3><span className="step-number">4</span> Verify Installation</h3>
              <p>Visit your store, open DevTools (F12) → Console. Look for <code className="inline-code">[PixelTracker]</code> messages. Check your dashboard for the first pageview!</p>
            </div>

            <div className="code-block">
              <span className="comment">// Expected console output:</span>{'\n'}
              <span className="string">[PixelTracker] Starting for shop: your-store.myshopify.com</span>{'\n'}
              <span className="string">[PixelTracker] Config response: 200</span>{'\n'}
              <span className="string">[PixelTracker] Ready: pixel_xxxxx</span>{'\n'}
              <span className="string">[PixelTracker] pageview {'{ url: "...", ... }'}</span>{'\n'}
              <span className="string">[PixelTracker] Track response: 200</span>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="section">
            <div className="section-header">
              <div className="section-icon">
                <Icon source={SettingsIcon} />
              </div>
              <h2>How It Works</h2>
            </div>
            
            <p className="section-intro">
              Pixel Tracker uses a sophisticated server-side architecture that makes tracking immune to ad blockers.
            </p>

            <div className="card">
              <h3><Icon source={GlobeIcon} /> Architecture</h3>
              <ol>
                <li><strong>Theme App Extension:</strong> Injects a small script into your store's head</li>
                <li><strong>Shopify App Proxy:</strong> Routes all requests through your store's domain</li>
                <li><strong>Server Processing:</strong> Geo-location, device detection, session tracking</li>
                <li><strong>Database Storage:</strong> Secure storage for analytics</li>
                <li><strong>Meta Conversions API:</strong> Server-side forwarding to Facebook (optional)</li>
              </ol>
            </div>

            <div className="card">
              <h3><Icon source={LockIcon} /> Anti-Adblocker Technology</h3>
              <p>
                All tracking requests go through your store's domain via Shopify App Proxy. 
                Ad blockers cannot distinguish tracking from normal store requests.
              </p>
              <ul>
                <li>✓ 100% event capture regardless of ad blockers</li>
                <li>✓ No CORS errors (same-origin requests)</li>
                <li>✓ Better accuracy than traditional pixels</li>
              </ul>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Data Type</th>
                    <th>Description</th>
                    <th>Configurable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>Page URL</strong></td><td>Full URL visited</td><td>Always on</td></tr>
                  <tr><td><strong>Referrer</strong></td><td>Traffic source</td><td>Always on</td></tr>
                  <tr><td><strong>Device Info</strong></td><td>Browser, OS, screen</td><td>Always on</td></tr>
                  <tr><td><strong>IP Address</strong></td><td>For geo-location</td><td>Can disable</td></tr>
                  <tr><td><strong>Location</strong></td><td>City, country</td><td>Can disable</td></tr>
                  <tr><td><strong>Session ID</strong></td><td>Session tracking</td><td>Can disable</td></tr>
                  <tr><td><strong>UTM Params</strong></td><td>Campaign data</td><td>Always on</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Dashboard */}
          <section id="dashboard" className="section">
            <div className="section-header">
              <div className="section-icon">
                <Icon source={ChartLineIcon} />
              </div>
              <h2>Dashboard Overview</h2>
            </div>

            <div className="card">
              <h3><Icon source={ChartLineIcon} /> Main Dashboard</h3>
              <ul>
                <li><strong>Total Events:</strong> All tracked events</li>
                <li><strong>Unique Visitors:</strong> Distinct visitors</li>
                <li><strong>Page Views:</strong> Total pageviews</li>
                <li><strong>Sessions:</strong> Browsing sessions</li>
                <li><strong>Active Now:</strong> Real-time visitors (last 5 min)</li>
              </ul>
            </div>

            <div className="card">
              <h3><Icon source={ViewIcon} /> Analytics Page</h3>
              <ul>
                <li><strong>Traffic Sources:</strong> Where visitors come from</li>
                <li><strong>Device Breakdown:</strong> Desktop / Mobile / Tablet</li>
                <li><strong>Browser Stats:</strong> Chrome, Safari, Firefox...</li>
                <li><strong>Geographic Data:</strong> Countries, cities</li>
                <li><strong>Top Events & Pages:</strong> Most popular content</li>
              </ul>
            </div>

            <div className="card">
              <h3><Icon source={PersonIcon} /> Visitors Page</h3>
              <ul>
                <li><strong>Visitor List:</strong> All tracked visitors</li>
                <li><strong>Session Details:</strong> Pages viewed, time on site</li>
                <li><strong>Device Info:</strong> Browser, OS, screen size</li>
                <li><strong>Location:</strong> Country and city</li>
              </ul>
            </div>
          </section>

          {/* Meta Pixel */}
          <section id="meta-pixel" className="section">
            <div className="section-header">
              <div className="section-icon">
                <Icon source={TargetIcon} />
              </div>
              <h2>Meta Pixel Integration</h2>
            </div>

            <div className="card">
              <h3>Setup Steps</h3>
              <ol>
                <li>Go to <Link url="https://business.facebook.com/events_manager" external>Meta Events Manager</Link></li>
                <li>Copy your <strong>Pixel ID</strong> (16 digits)</li>
                <li>In Pixel Tracker → <strong>Settings</strong></li>
                <li>Enable <strong>Meta Pixel Integration</strong></li>
                <li>Enter your Pixel ID</li>
                <li>Optionally add <strong>Conversions API Access Token</strong></li>
              </ol>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Trigger</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>PageView</strong></td><td>Every page load</td><td>URL, title</td></tr>
                  <tr><td><strong>ViewContent</strong></td><td>Product page</td><td>Product ID, price</td></tr>
                  <tr><td><strong>AddToCart</strong></td><td>Add to cart</td><td>Product, quantity</td></tr>
                  <tr><td><strong>Purchase</strong></td><td>Order complete</td><td>Order ID, value</td></tr>
                </tbody>
              </table>
            </div>

            <div className="alert alert-warning">
              <div className="alert-icon">
                <Icon source={AlertTriangleIcon} />
              </div>
              <div className="alert-content">
                <strong>Keep it Secret</strong>
                <p>Never share your Conversions API access token publicly.</p>
              </div>
            </div>
          </section>

          {/* Auto Tracking */}
          <section id="auto-tracking" className="section">
            <div className="section-header">
              <div className="section-icon">
                <Icon source={ViewIcon} />
              </div>
              <h2>Automatic Tracking</h2>
            </div>
            
            <p className="section-intro">Configure automatic tracking in Settings.</p>

            <div className="card">
              <h3>📄 Page Views (Default: ON)</h3>
              <p>Captured on every page load with URL, title, referrer, and UTM parameters.</p>
            </div>

            <div className="card">
              <h3>👆 Click Tracking (Default: ON)</h3>
              <p>Tracks clicks on links, buttons, and interactive elements with element info.</p>
            </div>

            <div className="card">
              <h3>📜 Scroll Depth (Default: OFF)</h3>
              <p>Tracks scroll milestones at 25%, 50%, 75%, and 100%.</p>
            </div>
          </section>

          {/* Custom Events */}
          <section id="custom-events" className="section">
            <div className="section-header">
              <div className="section-icon">
                <Icon source={WrenchIcon} />
              </div>
              <h2>Custom Events</h2>
            </div>

            <div className="card">
              <h3>Method 1: Dashboard (No-Code)</h3>
              <ol>
                <li>Go to <strong>Custom Events</strong></li>
                <li>Click <strong>"Add Custom Event"</strong></li>
                <li>Enter name and CSS selector</li>
                <li>Choose trigger type (click, submit, change)</li>
                <li>Save</li>
              </ol>
            </div>

            <div className="card">
              <h3>Method 2: Data Attributes</h3>
              <div className="code-block">
                <span className="keyword">{'<button'}</span> <span className="property">data-pixel-event</span>=<span className="string">"signup_click"</span><span className="keyword">{'>'}</span>{'\n'}
                {'  Sign Up'}{'\n'}
                <span className="keyword">{'</button>'}</span>
              </div>
            </div>

            <div className="card">
              <h3>Method 3: JavaScript API</h3>
              <div className="code-block">
                <span className="function">PixelAnalytics</span>.<span className="function">track</span>(<span className="string">'newsletter_signup'</span>, {'{\n'}
                {'  '}<span className="property">email</span>: <span className="string">'user@example.com'</span>{'\n'}
                {'}'});
              </div>
            </div>
          </section>

          {/* E-commerce */}
          <section id="ecommerce" className="section">
            <div className="section-header">
              <div className="section-icon">
                <Icon source={CartIcon} />
              </div>
              <h2>E-commerce Tracking</h2>
            </div>

            <div className="card">
              <h3>Track Product View</h3>
              <div className="code-block">
                <span className="function">PixelAnalytics</span>.<span className="function">trackViewContent</span>({'\n'}
                {'  '}<span className="string">'SKU-123'</span>,      <span className="comment">// Product ID</span>{'\n'}
                {'  '}<span className="string">'Blue Shirt'</span>,   <span className="comment">// Name</span>{'\n'}
                {'  '}<span className="number">29.99</span>,          <span className="comment">// Price</span>{'\n'}
                {'  '}<span className="string">'Apparel'</span>       <span className="comment">// Category</span>{'\n'}
                {');'}
              </div>
            </div>

            <div className="card">
              <h3>Track Add to Cart</h3>
              <div className="code-block">
                <span className="function">PixelAnalytics</span>.<span className="function">trackAddToCart</span>({'\n'}
                {'  '}<span className="string">'SKU-123'</span>,      <span className="comment">// Product ID</span>{'\n'}
                {'  '}<span className="string">'Blue Shirt'</span>,   <span className="comment">// Name</span>{'\n'}
                {'  '}<span className="number">29.99</span>,          <span className="comment">// Price</span>{'\n'}
                {'  '}<span className="number">1</span>               <span className="comment">// Quantity</span>{'\n'}
                {');'}
              </div>
            </div>

            <div className="card">
              <h3>Track Purchase</h3>
              <div className="code-block">
                <span className="function">PixelAnalytics</span>.<span className="function">trackPurchase</span>({'\n'}
                {'  '}<span className="number">59.98</span>,          <span className="comment">// Total</span>{'\n'}
                {'  '}<span className="string">'USD'</span>,          <span className="comment">// Currency</span>{'\n'}
                {'  '}<span className="string">'ORDER-123'</span>,    <span className="comment">// Order ID</span>{'\n'}
                {'  '}[...]             <span className="comment">// Products</span>{'\n'}
                {');'}
              </div>
            </div>

            <div className="alert alert-info">
              <div className="alert-icon">
                <Icon source={CheckCircleIcon} />
              </div>
              <div className="alert-content">
                <strong>Server-Side Purchase Tracking</strong>
                <p>Purchases are also tracked via Shopify webhooks for 100% capture.</p>
              </div>
            </div>
          </section>

          {/* API */}
          <section id="api" className="section">
            <div className="section-header">
              <div className="section-icon">
                <Icon source={CodeIcon} />
              </div>
              <h2>JavaScript API</h2>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><code className="inline-code">track(event, props)</code></td><td>Track custom event</td></tr>
                  <tr><td><code className="inline-code">trackPurchase(...)</code></td><td>Track purchase</td></tr>
                  <tr><td><code className="inline-code">trackAddToCart(...)</code></td><td>Track add to cart</td></tr>
                  <tr><td><code className="inline-code">trackViewContent(...)</code></td><td>Track product view</td></tr>
                </tbody>
              </table>
            </div>

            <div className="card">
              <h3>Shorthand</h3>
              <div className="code-block">
                <span className="comment">// Both work the same:</span>{'\n'}
                <span className="function">PixelAnalytics</span>.<span className="function">track</span>(<span className="string">'my_event'</span>);{'\n'}
                <span className="function">px</span>(<span className="string">'my_event'</span>);
              </div>
            </div>
          </section>

          {/* Settings */}
          <section id="settings" className="section">
            <div className="section-header">
              <div className="section-icon">
                <Icon source={SettingsIcon} />
              </div>
              <h2>Settings</h2>
            </div>

            <div className="card">
              <h3>Automatic Tracking</h3>
              <ul>
                <li>Auto-track pageviews</li>
                <li>Auto-track clicks</li>
                <li>Auto-track scroll depth</li>
              </ul>
            </div>

            <div className="card">
              <h3>Privacy</h3>
              <ul>
                <li>Record IP addresses</li>
                <li>Record location data</li>
                <li>Record session data</li>
              </ul>
            </div>

            <div className="card">
              <h3>Meta Integration</h3>
              <ul>
                <li>Enable Meta Pixel forwarding</li>
                <li>Meta Pixel ID</li>
                <li>Access Token (optional)</li>
                <li>Test Event Code</li>
              </ul>
            </div>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting" className="section">
            <div className="section-header">
              <div className="section-icon">
                <Icon source={WrenchIcon} />
              </div>
              <h2>Troubleshooting</h2>
            </div>

            <div className="card">
              <h3><Icon source={AlertTriangleIcon} /> No events in dashboard</h3>
              <ol>
                <li>Check App Embed is <strong>ON</strong> in theme editor</li>
                <li>Open DevTools → Console → Look for <code className="inline-code">[PixelTracker]</code></li>
                <li>Verify you have at least one pixel created</li>
              </ol>
            </div>

            <div className="card">
              <h3><Icon source={AlertTriangleIcon} /> CORS or CORB errors</h3>
              <ol>
                <li>Go to <strong>Settings</strong> in the app</li>
                <li>Click <strong>"Delete Old Script Tags"</strong></li>
                <li>Use App Embed method only (no manual scripts)</li>
              </ol>
            </div>

            <div className="card">
              <h3><Icon source={AlertTriangleIcon} /> Config error in console</h3>
              <ol>
                <li>Ensure you have created a pixel in the app</li>
                <li>Check app is properly installed</li>
                <li>Try reinstalling if issue persists</li>
              </ol>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="section">
            <div className="section-header">
              <div className="section-icon">
                <Icon source={QuestionCircleIcon} />
              </div>
              <h2>FAQ</h2>
            </div>

            <div className="card">
              <h3>Do I need to edit theme code?</h3>
              <p><strong>No!</strong> Just enable the App Embed in theme editor.</p>
            </div>

            <div className="card">
              <h3>Will ad blockers affect tracking?</h3>
              <p><strong>No.</strong> Requests go through your store's domain, making them invisible to blockers.</p>
            </div>

            <div className="card">
              <h3>Is purchase tracking automatic?</h3>
              <p><strong>Yes.</strong> Purchases are tracked via Shopify webhooks for 100% capture.</p>
            </div>

            <div className="card">
              <h3>Is it GDPR compliant?</h3>
              <p><strong>Yes.</strong> You can disable IP/location tracking. Data sent to Meta is hashed.</p>
            </div>
          </section>

          {/* Footer */}
          <div className="footer">
            <div className="footer-logo">
              <Icon source={BookOpenIcon} />
            </div>
            <h3>Need Help?</h3>
            <p><strong>Warewe Consultancy Private Limited</strong></p>
            <p>Email: <a href="mailto:support@warewe.online">support@warewe.online</a></p>
            <p>Website: <a href="https://pixelify.warewe.online" target="_blank" rel="noopener noreferrer">pixelify.warewe.online</a></p>
            <div className="footer-divider"></div>
            <p className="footer-bottom">
              Documentation updated December 2024 · <a href="/privacy-policy">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}
