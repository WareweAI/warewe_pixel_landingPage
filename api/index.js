// Vercel serverless function for React Router SSR
import { createRequestHandler } from "@react-router/node";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readdir } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the server build
let build;
let handler;

try {
  // Use absolute path for build
  const buildPath = join(__dirname, "..", "build", "server", "index.js");
  console.log("Attempting to load build from:", buildPath);
  console.log("Current directory:", __dirname);
  
  // Check if build directory exists (for debugging)
  try {
    const buildDir = join(__dirname, "..", "build", "server");
    const files = await readdir(buildDir);
    console.log("Build directory contents:", files.slice(0, 10));
  } catch (dirError) {
    console.error("Build directory check failed:", dirError.message);
  }
  
  build = await import(buildPath);
  console.log("Build loaded successfully");
  
  handler = createRequestHandler({
    build,
    mode: process.env.NODE_ENV || "production",
  });
  console.log("Handler created successfully");
} catch (error) {
  console.error("Failed to initialize React Router handler:", error);
  console.error("Error details:", {
    message: error.message,
    stack: error.stack,
    code: error.code,
    cwd: process.cwd(),
    __dirname,
  });
}

// Vercel serverless function handler
export default async function vercelHandler(req, res) {
  // If handler failed to initialize, return error
  if (!handler) {
    console.error("Handler not initialized");
    return res.status(500).json({
      error: "Server initialization failed",
      message: "React Router handler could not be loaded",
    });
  }

  try {
    // Convert Vercel req to Web Request
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host || req.headers["x-forwarded-host"];
    const url = `${protocol}://${host}${req.url}`;
    
    const request = new Request(url, {
      method: req.method,
      headers: new Headers(req.headers),
      body: req.method !== "GET" && req.method !== "HEAD" && req.body 
        ? (typeof req.body === "string" ? req.body : JSON.stringify(req.body))
        : undefined,
    });
    
    // Call React Router handler
    const response = await handler(request);
    
    // Convert Web Response to Vercel response
    res.status(response.status);
    
    // Copy headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    // Send body
    const body = await response.text();
    res.send(body);
  } catch (error) {
    console.error("Request handler error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
    });
    
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}

