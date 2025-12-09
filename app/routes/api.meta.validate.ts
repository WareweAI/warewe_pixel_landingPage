// Meta Pixel validation API endpoint
import type { ActionFunctionArgs } from "react-router";
import { validateMetaCredentials } from "~/services/meta-capi.server";
import prisma from "~/db.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    const { datasetId, accessToken, appSettingsId } = body;

    if (!datasetId) {
      return Response.json(
        { error: "Dataset ID (App ID) is required" },
        { status: 400 }
      );
    }

    if (!accessToken) {
      return Response.json(
        { error: "Access Token is required" },
        { status: 400 }
      );
    }

    // Validate credentials with Meta using Dataset ID and Access Token
    const result = await validateMetaCredentials(datasetId, accessToken);

    if (!result.valid) {
      return Response.json(
        {
          valid: false,
          error: result.error || "Invalid credentials",
        },
        { status: 200 }
      );
    }

    // If appSettingsId provided, update the verification status
    if (appSettingsId) {
      await prisma.appSettings.update({
        where: { id: appSettingsId },
        data: {
          metaPixelId: datasetId,
          metaAccessToken: accessToken,
          metaVerified: true,
          metaPixelEnabled: true,
        },
      });
    }

    return Response.json({
      valid: true,
      datasetName: result.datasetName,
      message: "Credentials verified successfully",
    });
  } catch (error) {
    console.error("Meta validation API error:", error);
    return Response.json(
      { error: "Validation failed" },
      { status: 500 }
    );
  }
}


export default function MetaValidateAPI() {
  return null;
}
