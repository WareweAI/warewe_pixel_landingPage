import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { Form, useActionData, useLoaderData, useRouteError, isRouteErrorResponse } from "react-router";

import { login } from "../../shopify.server";
import { loginErrorMessage } from "./error.server";
import { loadEnv } from "../../lib/env-loader.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Load environment variables (server-only)
  loadEnv();
  if (!login) {
    throw new Response("Shopify configuration not found. Please set SHOPIFY_API_KEY and SHOPIFY_API_SECRET environment variables.", {
      status: 500,
    });
  }

  try {
    const loginResult = await login(request);
    
    // If login returns a Response (redirect), throw it
    if (loginResult instanceof Response) {
      throw loginResult;
    }
    
    // Otherwise, it's an error object, convert it to error messages
    const errors = loginErrorMessage(loginResult);
    return { errors };
  } catch (error) {
    // Re-throw redirect responses (they should propagate)
    if (error instanceof Response && error.status >= 300 && error.status < 400) {
      throw error;
    }
    
    console.error("Login loader error:", error);
    throw new Response("Failed to process login request. Please try again.", {
      status: 500,
    });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  // Load environment variables (server-only) - ensure fresh load
  loadEnv();
  
  // Re-check login after loading env (in case it wasn't initialized before)
  // Re-import to get fresh reference after env load
  const { login: freshLogin } = await import("../../shopify.server");
  
  if (!freshLogin && !login) {
    console.error('❌ Shopify login not available after env load');
    console.error('SHOPIFY_API_KEY:', process.env.SHOPIFY_API_KEY ? 'Present' : 'Missing');
    console.error('SHOPIFY_API_SECRET:', process.env.SHOPIFY_API_SECRET ? 'Present' : 'Missing');
    throw new Response("Shopify configuration not found. Please set SHOPIFY_API_KEY and SHOPIFY_API_SECRET environment variables.", {
      status: 500,
    });
  }
  
  const activeLogin = freshLogin || login;

  if (!activeLogin) {
    console.error('❌ Shopify login not available after env load');
    console.error('SHOPIFY_API_KEY:', process.env.SHOPIFY_API_KEY ? 'Present' : 'Missing');
    console.error('SHOPIFY_API_SECRET:', process.env.SHOPIFY_API_SECRET ? 'Present' : 'Missing');
    throw new Response("Shopify configuration not found. Please set SHOPIFY_API_KEY and SHOPIFY_API_SECRET environment variables.", {
      status: 500,
    });
  }

  try {
    const loginResult = await activeLogin(request);
    
    // If login returns a Response (redirect), throw it
    if (loginResult instanceof Response) {
      throw loginResult;
    }
    
    // Otherwise, it's an error object, convert it to error messages
    const errors = loginErrorMessage(loginResult);
    
    // If there are errors, return them to show in the form
    if (errors && Object.keys(errors).length > 0) {
      return { errors };
    }

    // If login is successful (no errors), authenticate and redirect to app
    const { authenticate } = await import("../../shopify.server");
    if (!authenticate) {
      return {
        errors: { shop: "Authentication not available. Please configure Shopify." },
      };
    }

    try {
      const { session } = await authenticate.admin(request);
      
      // Create or update user in database (only if database is available)
      try {
        const prisma = (await import("../../db.server")).default;
        // Check if prisma is actually initialized (not empty object)
        if (prisma && typeof prisma.user !== "undefined") {
          let user = await prisma.user.findUnique({
            where: { email: session.shop },
          });

          if (!user) {
            const { generateRandomPassword } = await import("../../lib/crypto.server");
            user = await prisma.user.create({
              data: {
                email: session.shop,
                password: generateRandomPassword(),
              },
            });
          }
        }
      } catch (dbError) {
        // Log but don't fail the authentication if database fails
        console.error("Database error during login (non-critical):", dbError);
      }

      // Redirect to app dashboard
      const { redirect } = await import("react-router");
      throw redirect("/app");
    } catch (authError) {
      // Re-throw redirect responses (they should propagate)
      if (authError instanceof Response) {
        throw authError;
      }
      
      console.error("Authentication error:", authError);
      return {
        errors: { shop: "Failed to authenticate. Please try again." },
      };
    }
  } catch (error) {
    console.error("Login action error:", error);
    
    // Re-throw redirect and error responses
    if (error instanceof Response) {
      throw error;
    }
    
    throw new Response("Failed to process login request. Please try again.", {
      status: 500,
    });
  }
};

export default function Auth() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [shop, setShop] = useState("");
  const [isInIframe, setIsInIframe] = useState(false);
  const { errors } = actionData || loaderData;

  // Check if we're in an iframe and redirect to top level if needed
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const inIframe = window.top !== window.self;
        setIsInIframe(inIframe);
        
        // If in iframe, try to redirect the top window to this URL
        // Only works if same-origin, will fail silently if cross-origin
        if (inIframe && window.top) {
          try {
            // Check if we can access window.top.location (same-origin check)
            const topLocation = window.top.location;
            // If we get here, we're same-origin, so redirect is safe
            topLocation.href = window.location.href;
          } catch (e) {
            // Cross-origin iframe - can't break out, this is expected for Shopify embedded apps
            // The Form has target="_top" which will handle the redirect properly
            setIsInIframe(false);
          }
        }
      } catch (e) {
        // Silently handle any errors
        setIsInIframe(false);
      }
    }
  }, []);

  // Don't render anything if we're redirecting from an iframe
  if (isInIframe) {
    return (
      <AppProvider embedded={false}>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p>Redirecting to login...</p>
        </div>
      </AppProvider>
    );
  }

  return (
    <AppProvider embedded={false}>
      <s-page>
        <Form method="post" target="_top">
          <s-section heading="Log in">
            <s-text-field
              name="shop"
              label="Shop domain"
              details="example.myshopify.com"
              value={shop}
              onChange={(e) => setShop(e.currentTarget.value)}
              autocomplete="on"
              error={errors.shop}
            ></s-text-field>
            <s-button type="submit">Log in</s-button>
          </s-section>
        </Form>
      </s-page>
    </AppProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred. Please try again.";

  if (isRouteErrorResponse(error)) {
    title = error.status === 500 ? "Server Error" : `Error ${error.status}`;
    message = typeof error.data === "string" ? error.data : error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <AppProvider embedded={false}>
      <s-page>
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
            {title}
          </h1>
          <p style={{ color: "#666", marginBottom: "24px" }}>
            {message}
          </p>
          <a
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#008060",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
            }}
          >
            Go to Home
          </a>
        </div>
      </s-page>
    </AppProvider>
  );
}
