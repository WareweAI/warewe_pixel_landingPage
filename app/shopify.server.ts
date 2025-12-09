import "@shopify/shopify-app-react-router/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-react-router/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env file if it exists (Shopify CLI may not always load it)
try {
  config({ path: resolve(process.cwd(), ".env") });
} catch {
  // Ignore if .env doesn't exist or can't be loaded
}

// Only initialize Shopify if API keys are present (for Vercel deployment)
const hasShopifyConfig = Boolean(process.env.SHOPIFY_API_KEY && process.env.SHOPIFY_API_SECRET);
const hasDatabase = Boolean(process.env.DATABASE_URL);

let shopify: ReturnType<typeof shopifyApp> | null = null;

if (hasShopifyConfig) {
  try {
    // Only use PrismaSessionStorage if database is available
    const sessionStorage = hasDatabase 
      ? new PrismaSessionStorage(prisma)
      : undefined; // Will use default memory storage if undefined
    
    shopify = shopifyApp({
      apiKey: process.env.SHOPIFY_API_KEY!,
      apiSecretKey: process.env.SHOPIFY_API_SECRET!,
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
    shopify = null;
  }
}

export default shopify;
export const apiVersion = ApiVersion.October25;
export const addDocumentResponseHeaders = shopify?.addDocumentResponseHeaders || (() => {});
export const authenticate = shopify?.authenticate;
export const unauthenticated = shopify?.unauthenticated;
export const login = shopify?.login;
export const registerWebhooks = shopify?.registerWebhooks;
export const sessionStorage = shopify?.sessionStorage;
