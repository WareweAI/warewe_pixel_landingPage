import "@shopify/shopify-app-react-router/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-react-router/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";
import { loadEnv } from "./lib/env-loader.server";

// Load environment variables immediately
loadEnv();

// Lazy initialization function
function initializeShopify() {
  // Load env vars again to ensure they're fresh
  loadEnv();
  
  // Only initialize Shopify if API keys are present (for Vercel deployment)
  const apiKey = process.env.SHOPIFY_API_KEY?.replace(/^["']|["']$/g, '') || '';
  const apiSecret = process.env.SHOPIFY_API_SECRET?.replace(/^["']|["']$/g, '') || '';
  const hasShopifyConfig = Boolean(apiKey && apiSecret);
  const hasDatabase = Boolean(process.env.DATABASE_URL);

  if (!hasShopifyConfig) {
    console.error('❌ Shopify config missing:', {
      hasApiKey: !!apiKey,
      hasApiSecret: !!apiSecret,
      apiKeyLength: apiKey.length,
      apiSecretLength: apiSecret.length,
      cwd: process.cwd(),
    });
    return null;
  }

  console.log('✅ Initializing Shopify app:', {
    hasApiKey: !!apiKey,
    hasApiSecret: !!apiSecret,
    apiKeyLength: apiKey.length,
    apiSecretLength: apiSecret.length,
  });

  try {
    // Only use PrismaSessionStorage if database is available
    const sessionStorage = hasDatabase 
      ? new PrismaSessionStorage(prisma)
      : undefined; // Will use default memory storage if undefined
    
    return shopifyApp({
      apiKey: apiKey,
      apiSecretKey: apiSecret,
      apiVersion: ApiVersion.October25,
      scopes: process.env.SCOPES?.split(","),
      appUrl: process.env.SHOPIFY_APP_URL || "",
      authPathPrefix: "/auth",
      ...(sessionStorage ? { sessionStorage } : {}),
      distribution: AppDistribution.AppStore,
      ...(process.env.SHOP_CUSTOM_DOMAIN
        ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
        : {}),
    });
  } catch (error) {
    console.error("Failed to initialize Shopify app:", error);
    return null;
  }
}

// Cache the shopify instance
let shopifyInstance: ReturnType<typeof shopifyApp> | null = null;

// Lazy getter that initializes on first access
function getShopify() {
  if (!shopifyInstance) {
    shopifyInstance = initializeShopify();
  }
  return shopifyInstance;
}

// Try to initialize immediately (but won't fail if env vars aren't ready)
try {
  shopifyInstance = initializeShopify();
} catch (error) {
  console.log("Shopify not initialized at module load, will initialize lazily");
}

export default shopifyInstance;
export const apiVersion = ApiVersion.October25;

// Lazy exports - these will re-initialize if needed
export const addDocumentResponseHeaders = (request: Request, headers: Headers) => {
  const instance = getShopify();
  if (instance?.addDocumentResponseHeaders) {
    instance.addDocumentResponseHeaders(request, headers);
  }
};

export const authenticate = getShopify()?.authenticate || null;
export const unauthenticated = getShopify()?.unauthenticated || null;
export const login = getShopify()?.login || null;
export const registerWebhooks = getShopify()?.registerWebhooks || null;
export const sessionStorage = getShopify()?.sessionStorage || null;
