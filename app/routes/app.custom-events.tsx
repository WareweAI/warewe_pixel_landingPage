import { redirect } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import {
  Page,
  Layout,
  Card,
  Button,
  TextField,
  Select,
  ColorPicker,
  Banner,
  DataTable,
  Badge,
  ButtonGroup,
  Modal,
  FormLayout,
  Checkbox,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { getShopifyInstance } from "~/shopify.server";
import db from "../db.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const shopify = getShopifyInstance();
  if (!shopify?.authenticate) {
    throw new Response("Shopify configuration not found", { status: 500 });
  }
  const { session } = await shopify.authenticate.admin(request);
  const shop = session.shop;

  const user = await db.user.findUnique({ where: { email: shop } });
  if (!user) {
    throw new Response("User not found for this shop", { status: 404 });
  }

  const app = await db.app.findFirst({
    where: { userId: user.id },
    include: { customEvents: true },
    orderBy: { createdAt: "desc" },
  });

  if (!app) {
    throw new Response("App not found for this shop", { status: 404 });
  }

  return Response.json({
    app,
    customEvents: app.customEvents,
    shop,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const shopify = getShopifyInstance();
  if (!shopify?.authenticate) {
    return Response.json({ success: false, error: "Shopify configuration not found" }, { status: 500 });
  }
  const { session } = await shopify.authenticate.admin(request);
  const shop = session.shop;
  const formData = await request.formData();
  const action = formData.get("action");

  try {
    const user = await db.user.findUnique({ where: { email: shop } });
    if (!user) {
      return Response.json({ success: false, error: "User not found for this shop" }, { status: 404 });
    }

    const appIdFromForm = formData.get("appId") as string | null;
    const app =
      appIdFromForm
        ? await db.app.findFirst({ where: { appId: appIdFromForm, userId: user.id } })
        : await db.app.findFirst({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });

    if (!app) {
      return Response.json({ success: false, error: "App not found for this shop" }, { status: 404 });
    }

    if (action === "create") {
      const name = formData.get("name") as string;
      const displayName = formData.get("displayName") as string;
      const buttonText = formData.get("buttonText") as string;
      const buttonColor = formData.get("buttonColor") as string;
      const textColor = formData.get("textColor") as string;
      const eventData = formData.get("eventData") as string;

      await db.customEvent.create({
        data: {
          appId: app.id,
          name: name.toLowerCase().replace(/\s+/g, '_'),
          displayName,
          buttonText,
          buttonColor,
          textColor,
          eventData,
          isActive: true,
        }
      });

      return Response.json({ success: true, message: "Custom event created successfully!" });
    }

    if (action === "toggle") {
      const eventId = formData.get("eventId") as string;
      const isActive = formData.get("isActive") === "true";

      await db.customEvent.update({
        where: { id: eventId },
        data: { isActive: !isActive }
      });

      return Response.json({ success: true, message: "Event status updated!" });
    }

    if (action === "delete") {
      const eventId = formData.get("eventId") as string;

      await db.customEvent.delete({
        where: { id: eventId }
      });

      return Response.json({ success: true, message: "Event deleted!" });
    }

  } catch (error) {
    console.error("Custom events action error:", error);
    return Response.json({ success: false, error: "Failed to process request" }, { status: 500 });
  }

  return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
}

type LoaderData = {
  app: any;
  customEvents: any[];
  shop: string;
};

type ActionData = {
  success?: boolean;
  error?: string;
  message?: string;
} | undefined;

export default function CustomEvents() {
  const { app, customEvents } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  const [modalActive, setModalActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    displayName: "",
    buttonText: "",
    buttonColor: "#000000",
    textColor: "#ffffff",
    eventData: "{}"
  });

  const handleModalToggle = useCallback(() => setModalActive(!modalActive), [modalActive]);

  const handleInputChange = useCallback((field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const rows = customEvents.map((event: any) => [
    event.displayName,
    event.name,
    <Badge tone={event.isActive ? "success" : "critical"}>
      {event.isActive ? "Active" : "Inactive"}
    </Badge>,
    event.buttonText || event.displayName,
    <div style={{ 
      width: 20, 
      height: 20, 
      backgroundColor: event.buttonColor, 
      borderRadius: 4,
      border: '1px solid #ccc'
    }} />,
    <ButtonGroup>
      <Form method="post">
        <input type="hidden" name="action" value="toggle" />
        <input type="hidden" name="eventId" value={event.id} />
        <input type="hidden" name="isActive" value={event.isActive.toString()} />
        <Button submit size="slim">
          {event.isActive ? "Disable" : "Enable"}
        </Button>
      </Form>
      <Form method="post">
        <input type="hidden" name="action" value="delete" />
        <input type="hidden" name="eventId" value={event.id} />
        <Button submit tone="critical" size="slim">
          Delete
        </Button>
      </Form>
    </ButtonGroup>
  ]);

  return (
    <Page
      title="Custom Events"
      subtitle="Create custom event buttons for your storefront"
      primaryAction={{
        content: "Create Event",
        onAction: handleModalToggle
      }}
    >
      <Layout>
        {actionData?.success && (
          <Layout.Section>
            <Banner tone="success" onDismiss={() => {}}>
              {actionData.message}
            </Banner>
          </Layout.Section>
        )}

        {actionData?.error && (
          <Layout.Section>
            <Banner tone="critical" onDismiss={() => {}}>
              {actionData.error}
            </Banner>
          </Layout.Section>
        )}

        <Layout.Section>
          <Card>
            <div style={{ padding: '16px' }}>
              <h3>How to use Custom Events:</h3>
              <ol>
                <li>Create custom events below</li>
                <li>Go to your Shopify theme editor</li>
                <li>Add the "Custom Event Buttons" block to any section</li>
                <li>Configure the App ID: <strong>{app.appId}</strong></li>
                <li>Your custom event buttons will appear on the storefront</li>
              </ol>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <DataTable
              columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']}
              headings={['Display Name', 'Event Name', 'Status', 'Button Text', 'Color', 'Actions']}
              rows={rows}
            />
          </Card>
        </Layout.Section>
      </Layout>

      <Modal
        open={modalActive}
        onClose={handleModalToggle}
        title="Create Custom Event"
        primaryAction={{
          content: "Create Event",
          loading: isLoading,
          onAction: () => {
            const form = document.getElementById('create-event-form') as HTMLFormElement;
            form.requestSubmit();
          }
        }}
        secondaryActions={[{
          content: "Cancel",
          onAction: handleModalToggle
        }]}
      >
        <Modal.Section>
          <Form method="post" id="create-event-form">
            <FormLayout>
              <input type="hidden" name="action" value="create" />
              <input type="hidden" name="appId" value={app.appId} />
              
              <TextField
                label="Display Name"
                value={formData.displayName}
                onChange={handleInputChange('displayName')}
                name="displayName"
                placeholder="e.g., Add to Wishlist"
                autoComplete="off"
              />

              <TextField
                label="Event Name (for tracking)"
                value={formData.name}
                onChange={handleInputChange('name')}
                name="name"
                placeholder="e.g., add_to_wishlist"
                helpText="Used for analytics. Will be auto-generated from display name if empty."
                autoComplete="off"
              />

              <TextField
                label="Button Text"
                value={formData.buttonText}
                onChange={handleInputChange('buttonText')}
                name="buttonText"
                placeholder="e.g., Add to Wishlist"
                autoComplete="off"
              />

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label>Button Color</label>
                  <input
                    type="color"
                    name="buttonColor"
                    value={formData.buttonColor}
                    onChange={(e) => handleInputChange('buttonColor')(e.target.value)}
                    style={{ width: '100%', height: '40px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Text Color</label>
                  <input
                    type="color"
                    name="textColor"
                    value={formData.textColor}
                    onChange={(e) => handleInputChange('textColor')(e.target.value)}
                    style={{ width: '100%', height: '40px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </div>
              </div>

              <TextField
                label="Event Data (JSON)"
                value={formData.eventData}
                onChange={handleInputChange('eventData')}
                name="eventData"
                multiline={3}
                placeholder='{"product_id": "123", "category": "electronics"}'
                helpText="Optional JSON data to send with the event"
                autoComplete="off"
              />
            </FormLayout>
          </Form>
        </Modal.Section>
      </Modal>
    </Page>
  );
}