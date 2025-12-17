import { useState, useCallback, useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { useLoaderData, useFetcher } from "react-router";
import { getShopifyInstance } from "../shopify.server";
import prisma from "../db.server";
import {
  injectPixelScript,
  removePixelScript,
  getScriptInjectionStatus,
  createCustomEvent,
} from "../services/script-injection.server";
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Button,
  TextField,
  Select,
  Badge,
  Banner,
  Modal,
  Tabs,
  Box,
  Divider,
  Icon,
  Tooltip,
  EmptyState,
} from "@shopify/polaris";
import {
  CodeIcon,
  DragHandleIcon,
  PlusIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from "@shopify/polaris-icons";
import { ClientOnly } from "../components/ClientOnly";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const shopify = getShopifyInstance();
  if (!shopify?.authenticate) {
    throw new Response("Shopify configuration not found", { status: 500 });
  }
  const { session } = await shopify.authenticate.admin(request);
  const shop = session.shop;

  const baseUrl = process.env.SHOPIFY_APP_URL || "https://pixel-warewe.vercel.app";

  if (!prisma || !prisma.user || !prisma.app) {
    console.error("Database not available");
    return { apps: [], shop, baseUrl };
  }

  const user = await prisma.user.findUnique({
    where: { email: shop },
  });

  if (!user) {
    return { apps: [], shop, baseUrl };
  }

  const apps = await prisma.app.findMany({
    where: { userId: user.id },
    include: {
      settings: true,
      customEvents: {
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  // Get script injection status for each app
  const appsWithStatus = await Promise.all(
    apps.map(async (app) => {
      const status = await getScriptInjectionStatus(app.appId, shop);
      return {
        ...app,
        scriptInjected: status.injected,
        scriptConfig: status.config,
      };
    })
  );

  return { apps: appsWithStatus, shop, baseUrl };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const shopify = getShopifyInstance();
  if (!shopify?.authenticate) {
    throw new Response("Shopify configuration not found", { status: 500 });
  }
  const adminContext = await shopify.authenticate.admin(request);
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "inject-script") {
    const appId = formData.get("appId") as string;
    const pixelId = formData.get("pixelId") as string;
    const autoTrackPageviews = formData.get("autoTrackPageviews") === "true";
    const autoTrackClicks = formData.get("autoTrackClicks") === "true";
    const autoTrackScroll = formData.get("autoTrackScroll") === "true";

    const result = await injectPixelScript(adminContext, {
      appId,
      pixelId,
      autoTrackPageviews,
      autoTrackClicks,
      autoTrackScroll,
    });

    return result;
  }

  if (intent === "remove-script") {
    const appId = formData.get("appId") as string;
    const result = await removePixelScript(adminContext, appId);
    return result;
  }

  if (intent === "create-custom-event") {
    const appId = formData.get("appId") as string;
    const name = formData.get("name") as string;
    const displayName = formData.get("displayName") as string;
    const selector = formData.get("selector") as string;
    const eventType = formData.get("eventType") as string;
    const metaEventName = formData.get("metaEventName") as string;
    const description = formData.get("description") as string;

    const result = await createCustomEvent(appId, {
      name,
      displayName,
      selector,
      eventType,
      metaEventName,
      description,
    });

    return result;
  }

  if (intent === "delete-custom-event") {
    const eventId = formData.get("eventId") as string;

    if (!prisma || !prisma.customEvent) {
      return { success: false, error: "Database not available" };
    }

    await prisma.customEvent.update({
      where: { id: eventId },
      data: { isActive: false },
    });

    return { success: true, message: "Custom event deleted" };
  }

  return { error: "Invalid action" };
};

const META_EVENTS = [
  { label: "Purchase", value: "Purchase" },
  { label: "Add to Cart", value: "AddToCart" },
  { label: "View Content", value: "ViewContent" },
  { label: "Initiate Checkout", value: "InitiateCheckout" },
  { label: "Add Payment Info", value: "AddPaymentInfo" },
  { label: "Lead", value: "Lead" },
  { label: "Complete Registration", value: "CompleteRegistration" },
  { label: "Contact", value: "Contact" },
  { label: "Custom Event", value: "custom" },
];

const EVENT_TYPES = [
  { label: "Click", value: "click" },
  { label: "Submit", value: "submit" },
  { label: "Change", value: "change" },
  { label: "Focus", value: "focus" },
  { label: "Scroll", value: "scroll" },
];

export default function ThemeIntegrationPage() {
  const { apps, shop, baseUrl } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [selectedAppId, setSelectedAppId] = useState(apps[0]?.appId || "");
  const [selectedTab, setSelectedTab] = useState(0);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const [eventForm, setEventForm] = useState({
    name: "",
    displayName: "",
    selector: "",
    eventType: "click",
    metaEventName: "custom",
    description: "",
  });

  const selectedApp = apps.find((app: any) => app.appId === selectedAppId);
  const customEvents = selectedApp?.customEvents || [];

  const isLoading = fetcher.state !== "idle";

  const handleInjectScript = useCallback(() => {
    if (!selectedApp) return;

    fetcher.submit(
      {
        intent: "inject-script",
        appId: selectedApp.appId,
        pixelId: selectedApp.appId,
        autoTrackPageviews: "true",
        autoTrackClicks: "true",
        autoTrackScroll: "false",
      },
      { method: "POST" }
    );
  }, [fetcher, selectedApp]);

  const handleRemoveScript = useCallback(() => {
    if (!selectedApp) return;

    fetcher.submit(
      {
        intent: "remove-script",
        appId: selectedApp.appId,
      },
      { method: "POST" }
    );
  }, [fetcher, selectedApp]);

  const handleCreateEvent = useCallback(() => {
    if (!selectedApp || !eventForm.name || !eventForm.displayName) return;

    fetcher.submit(
      {
        intent: "create-custom-event",
        appId: selectedApp.appId,
        ...eventForm,
      },
      { method: "POST" }
    );

    setShowCreateEventModal(false);
    setEventForm({
      name: "",
      displayName: "",
      selector: "",
      eventType: "click",
      metaEventName: "custom",
      description: "",
    });
  }, [fetcher, selectedApp, eventForm]);

  const handleDeleteEvent = useCallback((eventId: string) => {
    fetcher.submit(
      {
        intent: "delete-custom-event",
        eventId,
      },
      { method: "POST" }
    );
    setShowDeleteModal(null);
  }, [fetcher]);

  const generateCode = useCallback(() => {
    if (!selectedApp) return "";

    return `<!-- Pixel Tracker -->
<script>
  window.PIXEL_TRACKER_ID = "${selectedApp.appId}";
</script>
<script async src="${baseUrl}/api/pixel.js?id=${selectedApp.appId}"></script>`;
  }, [selectedApp, baseUrl]);

  const copyToClipboard = useCallback(() => {
    const code = generateCode();
    navigator.clipboard.writeText(code);
  }, [generateCode]);

  const appOptions = apps.map((app: any) => ({
    label: app.name,
    value: app.appId,
  }));

  const tabs = [
    { id: "overview", content: "Overview" },
    { id: "events", content: "Custom Events" },
    { id: "code", content: "Integration Code" },
  ];

  if (apps.length === 0) {
    return (
      <ClientOnly fallback={<Page title="Theme Integration"><Layout><Layout.Section><Card><Text as="p">Loading...</Text></Card></Layout.Section></Layout></Page>}>
        <Page title="Theme Integration">
          <Layout>
            <Layout.Section>
              <Card>
                <EmptyState
                  heading="No pixels created"
                  action={{ content: "Go to Dashboard", url: "/app/dashboard" }}
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                >
                  <p>Create a pixel first to set up theme integration.</p>
                </EmptyState>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly fallback={<Page title="Theme Integration"><Layout><Layout.Section><Card><Text as="p">Loading...</Text></Card></Layout.Section></Layout></Page>}>
      <Page
        title="Theme Integration"
        subtitle="Drag-and-drop event tracking for your Shopify theme"
      >
        <Layout>
          {/* Success/Error Banner */}
          {fetcher.data?.success && (
            <Layout.Section>
              <Banner tone="success" onDismiss={() => { }}>
                <p>{fetcher.data.message || "Action completed successfully"}</p>
              </Banner>
            </Layout.Section>
          )}
          {fetcher.data?.error && (
            <Layout.Section>
              <Banner tone="critical" onDismiss={() => { }}>
                <p>{fetcher.data.error}</p>
              </Banner>
            </Layout.Section>
          )}

          {/* Pixel Selector */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Select
                  label="Select Pixel"
                  options={appOptions}
                  value={selectedAppId}
                  onChange={setSelectedAppId}
                />
                {selectedApp && (
                  <InlineStack gap="200">
                    <Badge>{`ID: ${selectedApp.appId}`}</Badge>
                    {selectedApp.scriptInjected && (
                      <Badge tone="success">Script Injected</Badge>
                    )}
                    {selectedApp.settings?.metaPixelEnabled && (
                      <Badge tone="info">Meta Connected</Badge>
                    )}
                  </InlineStack>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Main Content */}
          <Layout.Section>
            <Card>
              <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
                <Box padding="400">
                  {selectedTab === 0 && (
                    <BlockStack gap="400">
                      <Text variant="headingMd" as="h2">Theme App Extension (Recommended)</Text>
                      <Text as="p" tone="subdued">
                        Enable the Pixel Tracker app embed in your theme to automatically track events site-wide.
                      </Text>
                      
                      <Card background="bg-surface-secondary">
                        <BlockStack gap="400">
                          <InlineStack align="space-between" blockAlign="center">
                            <BlockStack gap="200">
                              <Text variant="headingSm" as="h3">🧩 Pixel Tracker Extension</Text>
                              <Text as="p" variant="bodySm" tone="subdued">
                                No code required! Just enable the app embed in your theme customizer.
                              </Text>
                            </BlockStack>
                            <Badge tone="info">App Embed</Badge>
                          </InlineStack>
                          
                          <BlockStack gap="200">
                            <Text as="p" variant="bodySm">
                              <strong>Your Pixel ID:</strong> {selectedApp?.appId || "No pixel selected"}
                            </Text>
                            <Text as="p" variant="bodySm">
                              <strong>Meta Pixel:</strong> {selectedApp?.settings?.metaPixelId || "Not configured"}
                            </Text>
                          </BlockStack>
                          
                          <Banner tone="info">
                            <BlockStack gap="200">
                              <Text as="p" variant="bodySm" fontWeight="semibold">How to enable:</Text>
                              <Text as="p" variant="bodySm">
                                1. Click "Open Theme Editor" below<br/>
                                2. In the left sidebar, find "App embeds"<br/>
                                3. Toggle ON "Pixel Tracker"<br/>
                                4. Click Save
                              </Text>
                              <Text as="p" variant="bodySm" tone="subdued">
                                The extension automatically uses your Pixel ID: <strong>{selectedApp?.appId}</strong>
                              </Text>
                            </BlockStack>
                          </Banner>
                        </BlockStack>
                      </Card>
                      
                      <InlineStack gap="200">
                        <Button
                          url={`https://${shop}/admin/themes/current/editor?context=apps`}
                          target="_blank"
                          variant="primary"
                        >
                          Open Theme Editor
                        </Button>
                        <Button
                          url={`https://${shop}/admin/themes/current/editor`}
                          target="_blank"
                        >
                          Customize Theme
                        </Button>
                      </InlineStack>

                      <Divider />


                      <Text variant="headingMd" as="h2">Script Injection</Text>
                      <Text as="p" tone="subdued">
                        Automatically inject the pixel tracking script into your theme using Shopify's Script Tag API.
                      </Text>

                      {selectedApp?.scriptInjected ? (
                        <BlockStack gap="300">
                          <Banner tone="success">
                            <p>✅ Pixel script is injected and active in your theme</p>
                          </Banner>
                          <InlineStack gap="200">
                            <Button onClick={handleRemoveScript} loading={isLoading} tone="critical">
                              Remove Script
                            </Button>
                            <Button onClick={() => setShowCodeModal(true)} icon={CodeIcon}>
                              View Code
                            </Button>
                          </InlineStack>
                        </BlockStack>
                      ) : (
                        <BlockStack gap="300">
                          <Banner tone="info">
                            <p>Script not injected. Click below to automatically add the tracking script to your theme.</p>
                          </Banner>
                          <Button onClick={handleInjectScript} loading={isLoading} variant="primary">
                            Inject Script
                          </Button>
                        </BlockStack>
                      )}

                      <Divider />

                      <Text variant="headingMd" as="h2">Manual Integration</Text>
                      <Text as="p" tone="subdued">
                        Prefer manual control? Get the integration code and add it to your theme manually.
                      </Text>
                      <Button onClick={() => setShowCodeModal(true)} icon={CodeIcon}>
                        Get Integration Code
                      </Button>
                    </BlockStack>
                  )}

                  {selectedTab === 1 && (
                    <BlockStack gap="400">
                      <InlineStack align="space-between" blockAlign="center">
                        <BlockStack gap="100">
                          <Text variant="headingMd" as="h2">Custom Events</Text>
                          <Text as="p" tone="subdued">
                            Create drag-and-drop events that fire when users interact with specific elements.
                          </Text>
                        </BlockStack>
                        <Button
                          onClick={() => setShowCreateEventModal(true)}
                          icon={PlusIcon}
                          variant="primary"
                        >
                          Create Event
                        </Button>
                      </InlineStack>

                      {customEvents.length === 0 ? (
                        <Card>
                          <EmptyState
                            heading="No custom events"
                            action={{
                              content: "Create Custom Event",
                              onAction: () => setShowCreateEventModal(true)
                            }}
                            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                          >
                            <p>Create custom events to track specific user interactions on your theme.</p>
                          </EmptyState>
                        </Card>
                      ) : (
                        <BlockStack gap="300">
                          {customEvents.map((event: any) => (
                            <Card key={event.id}>
                              <BlockStack gap="300">
                                <InlineStack align="space-between" blockAlign="center">
                                  <BlockStack gap="100">
                                    <InlineStack gap="200" blockAlign="center">
                                      <Icon source={DragHandleIcon} tone="subdued" />
                                      <Text as="p" variant="bodyMd" fontWeight="bold">{event.displayName}</Text>
                                      <Badge>{event.eventType}</Badge>
                                      {event.metaEventName && event.metaEventName !== "custom" && (
                                        <Badge tone="info">{`Meta: ${event.metaEventName}`}</Badge>
                                      )}
                                    </InlineStack>
                                    <Text as="p" variant="bodySm" tone="subdued">
                                      Event: {event.name} • Selector: {event.selector || "None"}
                                    </Text>
                                    {event.description && (
                                      <Text as="p" variant="bodySm" tone="subdued">
                                        {event.description}
                                      </Text>
                                    )}
                                  </BlockStack>
                                  <InlineStack gap="200">
                                    <Tooltip content="View event details">
                                      <Button icon={ViewIcon} variant="tertiary" />
                                    </Tooltip>
                                    <Tooltip content="Edit event">
                                      <Button icon={EditIcon} variant="tertiary" />
                                    </Tooltip>
                                    <Tooltip content="Delete event">
                                      <Button
                                        icon={DeleteIcon}
                                        variant="tertiary"
                                        tone="critical"
                                        onClick={() => setShowDeleteModal(event.id)}
                                      />
                                    </Tooltip>
                                  </InlineStack>
                                </InlineStack>
                              </BlockStack>
                            </Card>
                          ))}
                        </BlockStack>
                      )}
                    </BlockStack>
                  )}

                  {selectedTab === 2 && (
                    <BlockStack gap="400">
                      <Text variant="headingMd" as="h2">Integration Code</Text>
                      <Text as="p" tone="subdued">
                        Copy this code and paste it into your theme's theme.liquid file, just before the closing &lt;/head&gt; tag.
                      </Text>

                      <div
                        style={{
                          padding: "16px",
                          backgroundColor: "#f6f6f7",
                          borderRadius: "8px",
                          fontFamily: "monospace",
                          fontSize: "12px",
                          whiteSpace: "pre-wrap",
                          overflowX: "auto",
                          maxHeight: "400px",
                          overflow: "auto",
                        }}
                      >
                        {generateCode()}
                      </div>

                      <InlineStack gap="200">
                        <Button onClick={copyToClipboard} variant="primary">
                          Copy Code
                        </Button>
                        <Button url="/app/custom-events">
                          Manage Events
                        </Button>
                      </InlineStack>

                      <Banner tone="info">
                        <p>
                          <strong>Installation:</strong> Go to Online Store → Themes → Edit code → theme.liquid and paste this code before &lt;/head&gt;
                        </p>
                      </Banner>
                    </BlockStack>
                  )}
                </Box>
              </Tabs>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Create Event Modal */}
        <Modal
          open={showCreateEventModal}
          onClose={() => setShowCreateEventModal(false)}
          title="Create Custom Event"
          primaryAction={{
            content: "Create Event",
            onAction: handleCreateEvent,
            loading: isLoading,
            disabled: !eventForm.name || !eventForm.displayName,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: () => setShowCreateEventModal(false),
            },
          ]}
        >
          <Modal.Section>
            <BlockStack gap="400">
              <TextField
                label="Event Name"
                value={eventForm.name}
                onChange={(value) => setEventForm(prev => ({ ...prev, name: value }))}
                placeholder="e.g., custom_button_click"
                helpText="Internal name for the event (snake_case recommended)"
                autoComplete="off"
                requiredIndicator
              />

              <TextField
                label="Display Name"
                value={eventForm.displayName}
                onChange={(value) => setEventForm(prev => ({ ...prev, displayName: value }))}
                placeholder="e.g., Custom Button Click"
                helpText="Human-readable name for the event"
                autoComplete="off"
                requiredIndicator
              />

              <TextField
                label="CSS Selector"
                value={eventForm.selector}
                onChange={(value) => setEventForm(prev => ({ ...prev, selector: value }))}
                placeholder="e.g., .custom-button, #special-link"
                helpText="CSS selector to target elements (optional for data-attribute events)"
                autoComplete="off"
              />

              <Select
                label="Event Type"
                options={EVENT_TYPES}
                value={eventForm.eventType}
                onChange={(value) => setEventForm(prev => ({ ...prev, eventType: value }))}
              />

              <Select
                label="Meta Event Mapping"
                options={META_EVENTS}
                value={eventForm.metaEventName}
                onChange={(value) => setEventForm(prev => ({ ...prev, metaEventName: value }))}
                helpText="Map to a Meta standard event for better attribution"
              />

              <TextField
                label="Description"
                value={eventForm.description}
                onChange={(value) => setEventForm(prev => ({ ...prev, description: value }))}
                placeholder="Describe what this event tracks..."
                multiline={3}
                autoComplete="off"
              />
            </BlockStack>
          </Modal.Section>
        </Modal>

        {/* Code Modal */}
        <Modal
          open={showCodeModal}
          onClose={() => setShowCodeModal(false)}
          title="Theme Integration Code"
          primaryAction={{
            content: "Copy Code",
            onAction: copyToClipboard,
          }}
          secondaryActions={[
            {
              content: "Close",
              onAction: () => setShowCodeModal(false),
            },
          ]}
        >
          <Modal.Section>
            <BlockStack gap="400">
              <Text as="p">
                Add this code to your theme's theme.liquid file, just before the closing &lt;/head&gt; tag:
              </Text>
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#f6f6f7",
                  borderRadius: "8px",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  whiteSpace: "pre-wrap",
                  overflowX: "auto",
                  maxHeight: "400px",
                  overflow: "auto",
                }}
              >
                {generateCode()}
              </div>
              <Banner tone="info">
                <p>
                  <strong>Installation:</strong> Go to Online Store → Themes → Edit code → theme.liquid
                </p>
              </Banner>
            </BlockStack>
          </Modal.Section>
        </Modal>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <Modal
            open={true}
            onClose={() => setShowDeleteModal(null)}
            title="Delete Custom Event"
            primaryAction={{
              content: "Delete",
              onAction: () => handleDeleteEvent(showDeleteModal),
              loading: isLoading,
              destructive: true,
            }}
            secondaryActions={[
              {
                content: "Cancel",
                onAction: () => setShowDeleteModal(null),
              },
            ]}
          >
            <Modal.Section>
              <Text as="p">
                Are you sure you want to delete this custom event? This action cannot be undone.
              </Text>
            </Modal.Section>
          </Modal>
        )}
      </Page>
    </ClientOnly>
  );
}