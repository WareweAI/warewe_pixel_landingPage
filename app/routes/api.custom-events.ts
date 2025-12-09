// Custom Events API endpoint
import type { LoaderFunctionArgs } from "react-router";
import prisma from "~/db.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const appId = url.searchParams.get("appId");

  // CORS headers for external access
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (!appId) {
    return Response.json({ error: "App ID required" }, { status: 400, headers: corsHeaders });
  }

  try {
    // Find app by public appId
    const app = await prisma.app.findUnique({
      where: { appId },
      select: { id: true },
    });

    if (!app) {
      return Response.json({ error: "App not found" }, { status: 404, headers: corsHeaders });
    }

    // Get custom events for the app
    const events = await prisma.customEvent.findMany({
      where: { appId: app.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        displayName: true,
        description: true,
        selector: true,
        eventType: true,
        metaEventName: true,
        hasProductId: true,
        isActive: true,
        createdAt: true,
      },
    });

    return Response.json({ events }, { headers: corsHeaders });
  } catch (error) {
    console.error("Custom events API error:", error);
    return Response.json({ error: "Internal error" }, { status: 500, headers: corsHeaders });
  }
}

// Handle OPTIONS preflight
export async function action({ request }: LoaderFunctionArgs) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
}


export default function CustomEventsAPI() {
  return null;
}
