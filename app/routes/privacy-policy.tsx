import type { LoaderFunctionArgs } from "react-router";
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
  ShieldCheckMarkIcon,
  DatabaseIcon,
  LocationIcon,
  ChartLineIcon,
  LockIcon,
  FileIcon,
  EmailIcon,
  GlobeIcon,
  CheckCircleIcon,
  InfoIcon,
} from "@shopify/polaris-icons";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const baseUrl = process.env.SHOPIFY_APP_URL || "https://pixel-warewe.vercel.app";
  return { baseUrl };
};

export default function PrivacyPolicy() {
  const { baseUrl } = useLoaderData<typeof loader>();

  return (
    <Page
      title="Privacy Policy"
      subtitle="Last Updated: January 2025"
      fullWidth
    >
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 24px",
        backgroundColor: "#ffffff",
      }}>
        <style>{`
          .privacy-content {
            line-height: 1.8;
            color: #202223;
          }
          .privacy-content h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: #202223;
            background: linear-gradient(135deg, #008060 0%, #00a082 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .privacy-content h2 {
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
          .privacy-content h3 {
            font-size: 1.375rem;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            color: #202223;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .privacy-content p {
            margin-bottom: 1.25rem;
            font-size: 1.0625rem;
            line-height: 1.8;
            color: #454f5b;
          }
          .privacy-content ul {
            margin: 1.25rem 0;
            padding-left: 2rem;
          }
          .privacy-content li {
            margin-bottom: 0.875rem;
            line-height: 1.8;
            color: #454f5b;
            position: relative;
          }
          .privacy-content li::marker {
            color: #008060;
            font-weight: bold;
          }
          .privacy-content strong {
            color: #202223;
            font-weight: 600;
          }
          .privacy-section {
            background: linear-gradient(135deg, #f6f6f7 0%, #ffffff 100%);
            padding: 2rem;
            border-radius: 12px;
            margin: 1.75rem 0;
            border-left: 5px solid #008060;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .privacy-section:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .privacy-intro {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #ffffff 100%);
            padding: 2.5rem;
            border-radius: 16px;
            margin-bottom: 3rem;
            border: 2px solid #008060;
            box-shadow: 0 4px 16px rgba(0, 128, 96, 0.1);
            position: relative;
            overflow: hidden;
          }
          .privacy-intro::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #008060, #00a082, #008060);
          }
          .privacy-contact {
            background: linear-gradient(135deg, #f6f6f7 0%, #ffffff 100%);
            padding: 2.5rem;
            border-radius: 16px;
            margin: 2rem 0;
            border: 2px solid #e1e3e5;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
          }
          .privacy-resources {
            background: #ffffff;
            padding: 2rem;
            border-radius: 12px;
            border: 2px solid #e1e3e5;
            margin: 2rem 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          .icon-wrapper {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #008060 0%, #00a082 100%);
            border-radius: 10px;
            color: white;
            flex-shrink: 0;
          }
          .section-icon {
            width: 32px;
            height: 32px;
            color: #008060;
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
            background: #dcfce7;
            color: #166534;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 600;
            margin: 0.5rem 0.5rem 0.5rem 0;
          }
        `}</style>

        <div className="privacy-content">
          <BlockStack gap="600">
            <h1>
              <div className="icon-wrapper">
                <Icon source={ShieldCheckMarkIcon} />
              </div>
              Privacy Policy
            </h1>
            
            <div className="privacy-intro">
              <Text as="p" variant="bodyLg" fontWeight="medium">
                This Privacy Policy describes how Pixel Tracker ("we", "our", or "us") collects, uses, 
                and protects your information when you use our analytics and tracking services. 
                By using our services, you agree to the collection and use of information in accordance 
                with this policy.
              </Text>
              <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <span className="feature-badge">
                  <Icon source={CheckCircleIcon} /> GDPR Compliant
                </span>
                <span className="feature-badge">
                  <Icon source={CheckCircleIcon} /> CCPA Compliant
                </span>
                <span className="feature-badge">
                  <Icon source={LockIcon} /> Secure & Encrypted
                </span>
              </div>
            </div>

            <section>
              <h2>
                <div className="section-icon">
                  <Icon source={DatabaseIcon} />
                </div>
                1. Information We Collect
              </h2>
                
              <Text as="p">
                When you visit a website that uses Pixel Tracker, we automatically collect the following 
                types of information:
              </Text>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={DatabaseIcon} />
                  </div>
                  Technical Information
                </h3>
                <ul>
                  <li><strong>IP Address:</strong> Your Internet Protocol address (may be anonymized based on settings)</li>
                  <li><strong>User Agent:</strong> Information about your browser and device</li>
                  <li><strong>Device Information:</strong> Browser type and version, operating system, device type, device vendor</li>
                  <li><strong>Screen Information:</strong> Screen width and height, viewport dimensions</li>
                  <li><strong>Device Fingerprint:</strong> A unique identifier generated from browser and device characteristics</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={LocationIcon} />
                  </div>
                  Location Information (Optional)
                </h3>
                <ul>
                  <li><strong>Country and Country Code:</strong> Derived from IP address</li>
                  <li><strong>Region/State:</strong> Geographic region (if location tracking is enabled)</li>
                  <li><strong>City:</strong> City-level location (if location tracking is enabled)</li>
                  <li><strong>ZIP/Postal Code:</strong> Postal code (if location tracking is enabled)</li>
                  <li><strong>Coordinates:</strong> Approximate latitude and longitude (if location tracking is enabled)</li>
                  <li><strong>Timezone:</strong> Your timezone</li>
                  <li><strong>ISP:</strong> Internet Service Provider information</li>
                </ul>
                <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#6d7175", fontStyle: "italic" }}>
                  <strong>Note:</strong> Location tracking can be disabled by the website owner in their privacy settings.
                </p>
              </div>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ChartLineIcon} />
                  </div>
                  Browsing Information
                </h3>
                <ul>
                  <li><strong>Page URLs:</strong> The web pages you visit</li>
                  <li><strong>Referrer:</strong> The website that referred you to the current page</li>
                  <li><strong>Page Titles:</strong> The title of pages you view</li>
                  <li><strong>UTM Parameters:</strong> Marketing campaign tracking parameters (utm_source, utm_medium, utm_campaign, etc.)</li>
                  <li><strong>Scroll Depth:</strong> How far you scroll on pages</li>
                  <li><strong>Click Coordinates:</strong> Where you click on pages (X and Y coordinates)</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={DatabaseIcon} />
                  </div>
                  Session and Visitor Tracking
                </h3>
                <ul>
                  <li><strong>Session ID:</strong> A unique identifier for your browsing session (stored in browser sessionStorage)</li>
                  <li><strong>Visitor ID:</strong> A unique identifier for you as a visitor (stored in browser localStorage)</li>
                  <li><strong>Session Duration:</strong> How long you spend on the website</li>
                  <li><strong>Pageviews:</strong> Number of pages viewed during your session</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ChartLineIcon} />
                  </div>
                  E-commerce Information (When Applicable)
                </h3>
                <ul>
                  <li><strong>Product Information:</strong> Product IDs, product names, quantities</li>
                  <li><strong>Transaction Data:</strong> Purchase values, currency, order IDs</li>
                  <li><strong>Cart Information:</strong> Items added to cart, cart values</li>
                  <li><strong>Checkout Data:</strong> Checkout initiation events and values</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={DatabaseIcon} />
                  </div>
                  Custom Event Data
                </h3>
                <ul>
                  <li><strong>Custom Events:</strong> Website-specific events and interactions you trigger</li>
                  <li><strong>Event Properties:</strong> Additional data associated with custom events</li>
                </ul>
              </div>
            </section>

            <section>
              <h2>
                <div className="section-icon">
                  <Icon source={GlobeIcon} />
                </div>
                2. Facebook Pixel / Meta Pixel Integration
              </h2>
                
              <Text as="p">
                When a website owner has enabled Facebook Pixel integration, we send event data to 
                Meta's Conversions API. This integration allows website owners to track conversions 
                and optimize their Facebook and Instagram advertising campaigns.
              </Text>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ChartLineIcon} />
                  </div>
                  Events Sent to Meta
                </h3>
                <ul>
                  <li><strong>PageView:</strong> When you view a page</li>
                  <li><strong>ViewContent:</strong> When you view product or content pages</li>
                  <li><strong>AddToCart:</strong> When you add items to your shopping cart</li>
                  <li><strong>InitiateCheckout:</strong> When you begin the checkout process</li>
                  <li><strong>AddPaymentInfo:</strong> When you add payment information</li>
                  <li><strong>Purchase:</strong> When you complete a purchase</li>
                  <li><strong>Lead:</strong> When you submit a lead form</li>
                  <li><strong>CompleteRegistration:</strong> When you complete a registration</li>
                  <li><strong>Custom Events:</strong> Website-specific events configured by the website owner</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={LockIcon} />
                  </div>
                  Data Sent to Meta
                </h3>
                <ul>
                  <li><strong>Hashed Personal Information:</strong> Email addresses, phone numbers, first names, last names (all hashed using SHA-256 before transmission)</li>
                  <li><strong>Hashed Location Data:</strong> City, state, ZIP code, country code (hashed using SHA-256)</li>
                  <li><strong>Technical Data:</strong> IP address, user agent, device fingerprint</li>
                  <li><strong>Facebook Identifiers:</strong> Facebook Click ID (_fbc cookie) and Facebook Browser ID (_fbp cookie)</li>
                  <li><strong>Event Data:</strong> Event names, timestamps, URLs, product information, transaction values</li>
                </ul>
                <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#6d7175", fontStyle: "italic" }}>
                  All personally identifiable information (PII) is hashed using SHA-256 encryption 
                  before being sent to Meta, in accordance with Meta's data processing requirements.
                </p>
              </div>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={GlobeIcon} />
                  </div>
                  Meta's Use of Data
                </h3>
                <p>
                  Data sent to Meta is subject to Meta's Privacy Policy and Data Processing Terms. 
                  Meta uses this data to:
                </p>
                <ul>
                  <li>Measure the effectiveness of advertising campaigns</li>
                  <li>Optimize ad delivery and targeting</li>
                  <li>Provide analytics and insights to website owners</li>
                  <li>Improve Meta's advertising services</li>
                </ul>
                <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#6d7175" }}>
                  For more information about how Meta processes data, please visit{" "}
                  <Link url="https://www.facebook.com/privacy/explanation" external>
                    Meta's Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </section>

            <section>
              <h2>
                <div className="section-icon">
                  <Icon source={ChartLineIcon} />
                </div>
                3. How We Use Your Information
              </h2>
              
              <p>We use the collected information for the following purposes:</p>
              
              <ul>
                <li><strong>Analytics:</strong> To provide website owners with insights about visitor behavior, traffic patterns, and user interactions</li>
                <li><strong>Performance Monitoring:</strong> To track website performance, identify issues, and improve user experience</li>
                <li><strong>Conversion Tracking:</strong> To measure the effectiveness of marketing campaigns and track conversions</li>
                <li><strong>E-commerce Analytics:</strong> To analyze shopping behavior, cart abandonment, and purchase patterns</li>
                <li><strong>Custom Event Tracking:</strong> To track specific user interactions and events defined by website owners</li>
                <li><strong>Session Analysis:</strong> To understand user journeys and session patterns</li>
                <li><strong>Geographic Analysis:</strong> To provide location-based analytics and insights</li>
                <li><strong>Device Analytics:</strong> To understand device usage patterns and optimize for different devices</li>
              </ul>
            </section>

            <section>
              <h2>
                <div className="section-icon">
                  <Icon source={LockIcon} />
                </div>
                4. Data Storage and Retention
              </h2>
              
              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={LockIcon} />
                  </div>
                  Where Data is Stored
                </h3>
                <p>
                  All data collected by Pixel Tracker is stored securely in our database hosted on 
                  cloud infrastructure. We use industry-standard security measures to protect your data.
                </p>
              </div>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={DatabaseIcon} />
                  </div>
                  Data Retention
                </h3>
                <p>
                  We retain collected data for as long as necessary to provide our services and 
                  comply with legal obligations. Website owners can configure data retention 
                  settings, and data may be automatically deleted after a specified period.
                </p>
              </div>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={InfoIcon} />
                  </div>
                  Browser Storage
                </h3>
                <p>
                  We store session and visitor IDs in your browser's localStorage and sessionStorage. 
                  These identifiers help us track your visits across sessions while respecting your 
                  privacy. You can clear this data by clearing your browser's cache and storage.
                </p>
              </div>
            </section>

            <section>
              <h2>
                <div className="section-icon">
                  <Icon source={GlobeIcon} />
                </div>
                5. Data Sharing and Third-Party Services
              </h2>
              
              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={GlobeIcon} />
                  </div>
                  Meta (Facebook) Conversions API
                </h3>
                <p>
                  As described above, when Facebook Pixel integration is enabled, we share event 
                  data with Meta through their Conversions API. This sharing is subject to Meta's 
                  Privacy Policy and Data Processing Terms.
                </p>
              </div>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={DatabaseIcon} />
                  </div>
                  Service Providers
                </h3>
                <p>
                  We may share data with trusted service providers who assist us in operating our 
                  services, such as cloud hosting providers and database services. These providers 
                  are contractually obligated to protect your data and use it only for the purposes 
                  we specify.
                </p>
              </div>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={FileIcon} />
                  </div>
                  Legal Requirements
                </h3>
                <p>
                  We may disclose your information if required by law or in response to valid legal 
                  requests, such as court orders or subpoenas.
                </p>
              </div>
            </section>

            <section>
              <h2>
                <div className="section-icon">
                  <Icon source={ShieldCheckMarkIcon} />
                </div>
                6. Your Rights and Choices
              </h2>
              
              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={CheckCircleIcon} />
                  </div>
                  Opt-Out Options
                </h3>
                <ul>
                  <li><strong>Browser Settings:</strong> You can disable JavaScript in your browser to prevent tracking, though this may affect website functionality</li>
                  <li><strong>Do Not Track:</strong> We respect browser "Do Not Track" signals, though implementation may vary by website</li>
                  <li><strong>Clear Browser Data:</strong> You can clear cookies, localStorage, and sessionStorage to remove stored identifiers</li>
                  <li><strong>Privacy Extensions:</strong> You can use browser extensions that block tracking scripts</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={DatabaseIcon} />
                  </div>
                  Data Access and Deletion
                </h3>
                <p>
                  If you wish to access, correct, or delete your personal data, please contact the 
                  website owner who is using Pixel Tracker, or contact us directly using the 
                  information provided below.
                </p>
              </div>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ShieldCheckMarkIcon} />
                  </div>
                  European Privacy Rights (GDPR)
                </h3>
                <p>
                  If you are located in the European Economic Area (EEA), you have additional rights 
                  under the General Data Protection Regulation (GDPR), including:
                </p>
                <ul>
                  <li>Right to access your personal data</li>
                  <li>Right to rectify inaccurate data</li>
                  <li>Right to erasure ("right to be forgotten")</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                  <li>Right to withdraw consent</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h3>
                  <div className="section-icon">
                    <Icon source={ShieldCheckMarkIcon} />
                  </div>
                  California Privacy Rights (CCPA)
                </h3>
                <p>
                  If you are a California resident, you have rights under the California Consumer 
                  Privacy Act (CCPA), including the right to know what personal information is 
                  collected, the right to delete personal information, and the right to opt-out 
                  of the sale of personal information (we do not sell personal information).
                </p>
              </div>
            </section>

            <section>
              <h2>
                <div className="section-icon">
                  <Icon source={LockIcon} />
                </div>
                7. Security Measures
              </h2>
              
              <p>
                We implement industry-standard security measures to protect your data, including:
              </p>
              
              <ul>
                <li>Encryption of data in transit using HTTPS/TLS</li>
                <li>Secure database storage with access controls</li>
                <li>Regular security audits and updates</li>
                <li>Hashing of sensitive personal information before transmission to third parties</li>
                <li>Access controls and authentication for our systems</li>
              </ul>
              
              <p style={{ marginTop: "1rem", color: "#6d7175", fontStyle: "italic" }}>
                However, no method of transmission over the Internet or electronic storage is 100% 
                secure. While we strive to use commercially acceptable means to protect your data, 
                we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2>
                <div className="section-icon">
                  <Icon source={ShieldCheckMarkIcon} />
                </div>
                8. Children's Privacy
              </h2>
              
              <p>
                Our services are not intended for children under the age of 13. We do not knowingly 
                collect personal information from children under 13. If you believe we have 
                inadvertently collected information from a child under 13, please contact us 
                immediately so we can delete such information.
              </p>
            </section>

            <section>
              <h2>
                <div className="section-icon">
                  <Icon source={FileIcon} />
                </div>
                9. Changes to This Privacy Policy
              </h2>
              
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the "Last Updated" 
                date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2>
                <div className="section-icon">
                  <Icon source={EmailIcon} />
                </div>
                10. Contact Us
              </h2>
              
              <p>
                If you have any questions about this Privacy Policy or our data practices, please 
                contact us:
              </p>
              
              <div className="privacy-contact">
                <InlineStack gap="300" align="start">
                  <div className="icon-wrapper">
                    <Icon source={EmailIcon} />
                  </div>
                  <BlockStack gap="200">
                    <h3>Pixel Tracker</h3>
                    <p><strong>Warewe Consultancy Private Limited</strong></p>
                    <p>
                      <span style={{ marginRight: "0.5rem" }}>
                        <Icon source={EmailIcon} />
                      </span>
                      Email: <Link url="mailto:support@warewe.online">support@warewe.online</Link>
                    </p>
                    <p>
                      <span style={{ marginRight: "0.5rem" }}>
                        <Icon source={GlobeIcon} />
                      </span>
                      Website: <Link url="pixelify.warewe.online" external>pixelify.warewe.online
                      </Link>
                    </p>
                  </BlockStack>
                </InlineStack>
              </div>
            </section>

            <section>
              <h2>
                <div className="section-icon">
                  <Icon source={GlobeIcon} />
                </div>
                Additional Resources
              </h2>
              
              <div className="privacy-resources">
                <ul>
                  <li>
                    <Link url="https://www.facebook.com/privacy/explanation" external>
                      Meta (Facebook) Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link url="https://developers.facebook.com/docs/marketing-apis/conversions-api" external>
                      Meta Conversions API Documentation
                    </Link>
                  </li>
                  <li>
                    <Link url="https://gdpr.eu/" external>
                      General Data Protection Regulation (GDPR) Information
                    </Link>
                  </li>
                  <li>
                    <Link url="https://oag.ca.gov/privacy/ccpa" external>
                      California Consumer Privacy Act (CCPA) Information
                    </Link>
                  </li>
                </ul>
              </div>
            </section>

            <div className="footer-note">
              <div style={{ width: "32px", height: "32px", margin: "0 auto 1rem", color: "#008060" }}>
                <Icon source={ShieldCheckMarkIcon} />
              </div>
              <p style={{ fontSize: "1rem", fontWeight: "500" }}>
                This Privacy Policy is effective as of January 2025 and applies to all users of 
                Pixel Tracker services.
              </p>
            </div>
          </BlockStack>
        </div>
      </div>
    </Page>
  );
}
