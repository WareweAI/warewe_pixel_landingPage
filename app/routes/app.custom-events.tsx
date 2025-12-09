import { useState, useEffect, useCallback } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { useLoaderData, useFetcher } from "react-router";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Select,
  TextField,
  Button,
  Badge,
  Banner,
  Modal,
  EmptyState,
  ResourceList,
  ResourceItem,
  Box,
  Checkbox,
  Divider,
  Tabs,
  RangeSlider,
  Popover,
} from "@shopify/polaris";

// Meta standard events for mapping
const META_STANDARD_EVENTS = [
  { label: "None (Custom)", value: "" },
  { label: "AddPaymentInfo", value: "AddPaymentInfo" },
  { label: "AddToCart", value: "AddToCart" },
  { label: "AddToWishlist", value: "AddToWishlist" },
  { label: "CompleteRegistration", value: "CompleteRegistration" },
  { label: "Contact", value: "Contact" },
  { label: "CustomizeProduct", value: "CustomizeProduct" },
  { label: "Donate", value: "Donate" },
  { label: "FindLocation", value: "FindLocation" },
  { label: "InitiateCheckout", value: "InitiateCheckout" },
  { label: "Lead", value: "Lead" },
  { label: "Purchase", value: "Purchase" },
  { label: "Schedule", value: "Schedule" },
  { label: "Search", value: "Search" },
  { label: "StartTrial", value: "StartTrial" },
  { label: "SubmitApplication", value: "SubmitApplication" },
  { label: "Subscribe", value: "Subscribe" },
  { label: "ViewContent", value: "ViewContent" },
];

const EVENT_TYPES = [
  { label: "Click", value: "click" },
  { label: "Submit (Form)", value: "submit" },
  { label: "Focus", value: "focus" },
  { label: "Change", value: "change" },
  { label: "Mouse Enter (Hover)", value: "mouseenter" },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const user = await prisma.user.findUnique({
    where: { email: shop },
  });

  if (!user) {
    return { apps: [] };
  }

  const apps = await prisma.app.findMany({
    where: { userId: user.id },
    select: { id: true, appId: true, name: true },
  });

  return { apps };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  const user = await prisma.user.findUnique({ where: { email: shop } });
  if (!user) {
    return { error: "User not found" };
  }

  if (intent === "create") {
    const appId = formData.get("appId") as string;
    const name = formData.get("name") as string;
    const displayName = formData.get("displayName") as string;
    const description = formData.get("description") as string;
    const selector = formData.get("selector") as string;
    const eventType = formData.get("eventType") as string;
    const metaEventName = formData.get("metaEventName") as string;
    const hasProductId = formData.get("hasProductId") === "true";

    if (!name || !displayName) {
      return { error: "Event name and display name are required" };
    }

    // Validate name format (lowercase, no spaces)
    if (!/^[a-z_][a-z0-9_]*$/.test(name)) {
      return { error: "Event name must be lowercase with underscores only (e.g., add_to_cart)" };
    }

    // Get app by appId (public ID)
    const app = await prisma.app.findUnique({
      where: { appId },
      select: { id: true },
    });

    if (!app) {
      return { error: "App not found" };
    }

    // Check if event name already exists
    const existing = await prisma.customEvent.findUnique({
      where: { appId_name: { appId: app.id, name } },
    });

    if (existing) {
      return { error: `Event with name "${name}" already exists` };
    }

    await prisma.customEvent.create({
      data: {
        appId: app.id,
        name,
        displayName,
        description: description || null,
        selector: selector || null,
        eventType: eventType || "click",
        metaEventName: metaEventName || null,
        hasProductId,
        isActive: true,
      },
    });

    return { success: true, message: "Custom event created" };
  }

  if (intent === "toggle") {
    const eventId = formData.get("eventId") as string;
    const isActive = formData.get("isActive") === "true";

    await prisma.customEvent.update({
      where: { id: eventId },
      data: { isActive },
    });

    return { success: true };
  }

  if (intent === "delete") {
    const eventId = formData.get("eventId") as string;

    await prisma.customEvent.delete({
      where: { id: eventId },
    });

    return { success: true, message: "Custom event deleted" };
  }

  return { error: "Invalid intent" };
};

interface CustomEventData {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  selector: string | null;
  eventType: string;
  metaEventName: string | null;
  hasProductId: boolean;
  isActive: boolean;
  createdAt: string;
  _count?: { events: number };
}

export default function CustomEventsPage() {
  const { apps } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [selectedApp, setSelectedApp] = useState(apps[0]?.appId || "");
  const [customEvents, setCustomEvents] = useState<CustomEventData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState<CustomEventData | null>(null);
  const [showButtonBuilder, setShowButtonBuilder] = useState<CustomEventData | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  
  // Button builder state
  const [buttonConfig, setButtonConfig] = useState({
    text: "Click Me",
    bgColor: "#000000",
    textColor: "#ffffff",
    borderRadius: 8,
    paddingX: 24,
    paddingY: 12,
    fontSize: 16,
    fontWeight: "600",
    borderWidth: 0,
    borderColor: "#000000",
    shadow: true,
    redirectUrl: "",
  });
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);

  const [createForm, setCreateForm] = useState({
    name: "",
    displayName: "",
    description: "",
    selector: "",
    eventType: "click",
    metaEventName: "",
    hasProductId: false,
  });

  const isLoading = fetcher.state !== "idle";

  // Fetch custom events for selected app
  const fetchCustomEvents = useCallback(async () => {
    if (!selectedApp) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/custom-events?appId=${selectedApp}`);
      const data = await res.json();
      if (data.events) {
        setCustomEvents(data.events);
      }
    } catch (error) {
      console.error("Failed to fetch custom events:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedApp]);

  useEffect(() => {
    fetchCustomEvents();
  }, [fetchCustomEvents]);

  // Refetch after action
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      fetchCustomEvents();
    }
  }, [fetcher.state, fetcher.data, fetchCustomEvents]);

  // Auto-generate name from display name
  useEffect(() => {
    if (createForm.displayName && !createForm.name) {
      const autoName = createForm.displayName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "_");
      setCreateForm((prev) => ({ ...prev, name: autoName }));
    }
  }, [createForm.displayName, createForm.name]);

  const handleCreate = useCallback(() => {
    if (!createForm.name || !createForm.displayName) return;

    fetcher.submit(
      {
        intent: "create",
        appId: selectedApp,
        name: createForm.name,
        displayName: createForm.displayName,
        description: createForm.description,
        selector: createForm.selector,
        eventType: createForm.eventType,
        metaEventName: createForm.metaEventName,
        hasProductId: String(createForm.hasProductId),
      },
      { method: "POST" }
    );

    setShowCreateModal(false);
    setCreateForm({
      name: "",
      displayName: "",
      description: "",
      selector: "",
      eventType: "click",
      metaEventName: "",
      hasProductId: false,
    });
  }, [fetcher, selectedApp, createForm]);

  const handleToggle = useCallback(
    (eventId: string, currentActive: boolean) => {
      fetcher.submit(
        {
          intent: "toggle",
          eventId,
          isActive: String(!currentActive),
        },
        { method: "POST" }
      );
    },
    [fetcher]
  );

  const handleDelete = useCallback(
    (eventId: string) => {
      fetcher.submit({ intent: "delete", eventId }, { method: "POST" });
    },
    [fetcher]
  );

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  // Generate embeddable button code
  const generateButtonEmbed = useCallback((event: CustomEventData) => {
    const styles = [
      `background-color: ${buttonConfig.bgColor}`,
      `color: ${buttonConfig.textColor}`,
      `border-radius: ${buttonConfig.borderRadius}px`,
      `padding: ${buttonConfig.paddingY}px ${buttonConfig.paddingX}px`,
      `font-size: ${buttonConfig.fontSize}px`,
      `font-weight: ${buttonConfig.fontWeight}`,
      `border: ${buttonConfig.borderWidth}px solid ${buttonConfig.borderColor}`,
      `cursor: pointer`,
      `text-decoration: none`,
      `display: inline-block`,
      `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
      `transition: transform 0.2s, box-shadow 0.2s`,
    ];
    
    if (buttonConfig.shadow) {
      styles.push(`box-shadow: 0 4px 14px rgba(0,0,0,0.15)`);
    }

    const styleStr = styles.join("; ");
    const hoverStyles = `onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='${buttonConfig.shadow ? '0 4px 14px rgba(0,0,0,0.15)' : 'none'}'"`;

    const dataAttrs = [
      `data-pixel-event="${event.name}"`,
      event.hasProductId ? `data-pixel-product=""` : "",
    ].filter(Boolean).join(" ");

    const redirectScript = buttonConfig.redirectUrl 
      ? `onclick="window.PixelAnalytics && window.PixelAnalytics.track('${event.name}'); setTimeout(function(){ window.location.href='${buttonConfig.redirectUrl}'; }, 100); return false;"`
      : "";

    if (buttonConfig.redirectUrl) {
      return `<!-- ${event.displayName} Button with Redirect -->
<a href="${buttonConfig.redirectUrl}" 
   style="${styleStr}" 
   ${hoverStyles}
   ${redirectScript}>
  ${buttonConfig.text}
</a>

<!-- Make sure the pixel script is loaded before this button -->`;
    }

    return `<!-- ${event.displayName} Button -->
<button 
  style="${styleStr}" 
  ${hoverStyles}
  ${dataAttrs}>
  ${buttonConfig.text}
</button>`;
  }, [buttonConfig]);

  // Open button builder with default values
  const openButtonBuilder = useCallback((event: CustomEventData) => {
    setButtonConfig({
      text: event.displayName,
      bgColor: "#000000",
      textColor: "#ffffff",
      borderRadius: 8,
      paddingX: 24,
      paddingY: 12,
      fontSize: 16,
      fontWeight: "600",
      borderWidth: 0,
      borderColor: "#000000",
      shadow: true,
      redirectUrl: "",
    });
    setShowButtonBuilder(event);
  }, []);

  const appOptions = apps.map((app: { appId: string; name: string }) => ({
    label: app.name,
    value: app.appId,
  }));

  // Generate code snippets for a custom event
  const generateCodeSnippets = (event: CustomEventData) => {
    const params: string[] = [];
    if (event.hasProductId) params.push('product_id: "SKU123"');
    const paramsStr = params.length > 0 ? `, { ${params.join(", ")} }` : "";

    const jsSnippet = `// Track "${event.displayName}" event
window.PixelAnalytics.track("${event.name}"${paramsStr});`;

    const buttonSnippet = `<!-- Add data attribute to any element -->
<button data-pixel-event="${event.name}"${event.hasProductId ? ' data-pixel-product="SKU123"' : ""}>
  ${event.displayName}
</button>`;

    return { jsSnippet, buttonSnippet };
  };

  if (apps.length === 0) {
    return (
      <Page title="Custom Events">
        <Layout>
          <Layout.Section>
            <Card>
              <EmptyState
                heading="No pixels created"
                action={{ content: "Go to Dashboard", url: "/app" }}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>Create a pixel first to set up custom events.</p>
              </EmptyState>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  const tabs = [
    { id: "javascript", content: "JavaScript" },
    { id: "html", content: "HTML Data Attribute" },
  ];

  return (
    <Page
      title="Custom Events"
      primaryAction={{
        content: "Create Custom Event",
        onAction: () => setShowCreateModal(true),
      }}
    >
      <Layout>
        {/* Success/Error Banner */}
        {fetcher.data?.success && fetcher.data?.message && (
          <Layout.Section>
            <Banner tone="success" onDismiss={() => {}}>
              <p>{fetcher.data.message}</p>
            </Banner>
          </Layout.Section>
        )}
        {fetcher.data?.error && (
          <Layout.Section>
            <Banner tone="critical" onDismiss={() => {}}>
              <p>{fetcher.data.error}</p>
            </Banner>
          </Layout.Section>
        )}

        {/* App Selector */}
        <Layout.Section>
          <Card>
            <InlineStack gap="400" wrap={false}>
              <div style={{ minWidth: "200px" }}>
                <Select
                  label="Select Pixel"
                  options={appOptions}
                  value={selectedApp}
                  onChange={(value) => {
                    setSelectedApp(value);
                    setCustomEvents([]);
                  }}
                />
              </div>
            </InlineStack>
          </Card>
        </Layout.Section>

        {/* Info Card */}
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text variant="headingMd" as="h2">
                What are Custom Events?
              </Text>
              <Text as="p" tone="subdued">
                Custom events let you track specific user actions on your store beyond pageviews. 
                Create events like "Add to Wishlist", "Share Product", or "Newsletter Signup" 
                and get code snippets to implement them on your website.
              </Text>
              <Divider />
              <BlockStack gap="200">
                <Text as="p" fontWeight="bold">
                  Two ways to trigger events:
                </Text>
                <InlineStack gap="400">
                  <Card>
                    <BlockStack gap="200">
                      <Text variant="headingSm" as="h3">1. JavaScript API</Text>
                      <Text as="p" variant="bodySm" tone="subdued">
                        Call <code>window.PixelAnalytics.track()</code> from your code
                      </Text>
                    </BlockStack>
                  </Card>
                  <Card>
                    <BlockStack gap="200">
                      <Text variant="headingSm" as="h3">2. HTML Data Attributes</Text>
                      <Text as="p" variant="bodySm" tone="subdued">
                        Add <code>data-pixel-event</code> to any element
                      </Text>
                    </BlockStack>
                  </Card>
                </InlineStack>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        {/* Custom Events List */}
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                Your Custom Events
              </Text>

              {loading ? (
                <Text as="p" tone="subdued">Loading...</Text>
              ) : customEvents.length === 0 ? (
                <EmptyState
                  heading="No custom events"
                  action={{
                    content: "Create Your First Event",
                    onAction: () => setShowCreateModal(true),
                  }}
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                >
                  <p>Create custom events to track specific user interactions.</p>
                </EmptyState>
              ) : (
                <ResourceList
                  resourceName={{ singular: "custom event", plural: "custom events" }}
                  items={customEvents}
                  renderItem={(event: CustomEventData) => (
                    <ResourceItem id={event.id} onClick={() => {}}>
                      <BlockStack gap="300">
                        <InlineStack align="space-between" blockAlign="start">
                          <BlockStack gap="100">
                            <InlineStack gap="200" blockAlign="center">
                              <Text variant="bodyMd" fontWeight="bold" as="h3">
                                {event.displayName}
                              </Text>
                              <Badge tone={event.isActive ? "success" : undefined}>
                                {event.isActive ? "Active" : "Disabled"}
                              </Badge>
                              {event.metaEventName && (
                                <Badge tone="info">Meta: {event.metaEventName}</Badge>
                              )}
                            </InlineStack>
                            <Text variant="bodySm" as="p" tone="subdued">
                              Event name: <code>{event.name}</code>
                            </Text>
                            {event.description && (
                              <Text variant="bodySm" as="p">
                                {event.description}
                              </Text>
                            )}
                            <InlineStack gap="200">
                              {event.hasProductId && <Badge>Tracks Product</Badge>}
                              {event.selector && (
                                <Badge tone="attention">
                                  Auto: {event.eventType} on {event.selector}
                                </Badge>
                              )}
                            </InlineStack>
                          </BlockStack>
                          <InlineStack gap="200">
                            <Button onClick={() => setShowCodeModal(event)}>
                              Get Code
                            </Button>
                            <Button variant="primary" onClick={() => openButtonBuilder(event)}>
                              Create Button
                            </Button>
                            <Button onClick={() => handleToggle(event.id, event.isActive)} loading={isLoading}>
                              {event.isActive ? "Disable" : "Enable"}
                            </Button>
                            <Button tone="critical" onClick={() => handleDelete(event.id)} loading={isLoading}>
                              Delete
                            </Button>
                          </InlineStack>
                        </InlineStack>
                      </BlockStack>
                    </ResourceItem>
                  )}
                />
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>

      {/* Create Modal */}
      <Modal
        open={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setCreateForm({
            name: "",
            displayName: "",
            description: "",
            selector: "",
            eventType: "click",
            metaEventName: "",
            hasProductId: false,
          });
        }}
        title="Create Custom Event"
        primaryAction={{
          content: "Create Event",
          onAction: handleCreate,
          loading: isLoading,
          disabled: !createForm.name || !createForm.displayName,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => setShowCreateModal(false),
          },
        ]}
        size="large"
      >
        <Modal.Section>
          <BlockStack gap="400">
            <TextField
              label="Display Name"
              value={createForm.displayName}
              onChange={(value) => setCreateForm((prev) => ({ ...prev, displayName: value }))}
              placeholder="e.g., Add to Wishlist"
              helpText="User-friendly name shown in analytics"
              autoComplete="off"
              requiredIndicator
            />

            <TextField
              label="Event Name (Code)"
              value={createForm.name}
              onChange={(value) => setCreateForm((prev) => ({ ...prev, name: value.toLowerCase().replace(/[^a-z0-9_]/g, "_") }))}
              placeholder="e.g., add_to_wishlist"
              helpText="Lowercase with underscores. Used in code to trigger the event."
              autoComplete="off"
              requiredIndicator
            />

            <TextField
              label="Description"
              value={createForm.description}
              onChange={(value) => setCreateForm((prev) => ({ ...prev, description: value }))}
              placeholder="e.g., Tracks when a user adds a product to their wishlist"
              helpText="Optional description for your reference"
              autoComplete="off"
              multiline={2}
            />

            <Divider />

            <Text variant="headingSm" as="h3">Auto-Tracking (Optional)</Text>
            <Text as="p" tone="subdued" variant="bodySm">
              Automatically track this event when users interact with specific elements.
            </Text>

            <InlineStack gap="400">
              <div style={{ flex: 1 }}>
                <TextField
                  label="CSS Selector"
                  value={createForm.selector}
                  onChange={(value) => setCreateForm((prev) => ({ ...prev, selector: value }))}
                  placeholder="e.g., .wishlist-btn, #add-wishlist"
                  helpText="Leave empty to use manual JavaScript tracking only"
                  autoComplete="off"
                />
              </div>
              <div style={{ minWidth: "150px" }}>
                <Select
                  label="Event Type"
                  options={EVENT_TYPES}
                  value={createForm.eventType}
                  onChange={(value) => setCreateForm((prev) => ({ ...prev, eventType: value }))}
                />
              </div>
            </InlineStack>

            <Divider />

            <Text variant="headingSm" as="h3">Meta Pixel Integration</Text>
            <Select
              label="Map to Meta Standard Event"
              options={META_STANDARD_EVENTS}
              value={createForm.metaEventName}
              onChange={(value) => setCreateForm((prev) => ({ ...prev, metaEventName: value }))}
              helpText="Optionally map this to a Meta standard event for better tracking"
            />

            <Divider />

            <Text variant="headingSm" as="h3">Event Data</Text>
            <Text as="p" tone="subdued" variant="bodySm">
              Select what additional data this event should track.
            </Text>

            <Checkbox
              label="Track product ID"
              checked={createForm.hasProductId}
              onChange={(value) => setCreateForm((prev) => ({ ...prev, hasProductId: value }))}
            />
          </BlockStack>
        </Modal.Section>
      </Modal>

      {/* Code Snippet Modal */}
      {showCodeModal && (
        <Modal
          open={true}
          onClose={() => setShowCodeModal(null)}
          title={`Code for "${showCodeModal.displayName}"`}
          size="large"
        >
          <Modal.Section>
            <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
              <Box padding="400">
                {selectedTab === 0 && (
                  <BlockStack gap="400">
                    <Text as="p" tone="subdued">
                      Call this function from your JavaScript code to track the event:
                    </Text>
                    <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                      <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "13px" }}>
                        {generateCodeSnippets(showCodeModal).jsSnippet}
                      </pre>
                    </Box>
                    <Button onClick={() => copyToClipboard(generateCodeSnippets(showCodeModal).jsSnippet)}>
                      Copy Code
                    </Button>
                  </BlockStack>
                )}

                {selectedTab === 1 && (
                  <BlockStack gap="400">
                    <Text as="p" tone="subdued">
                      Add the <code>data-pixel-event</code> attribute to any HTML element:
                    </Text>
                    <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                      <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "13px" }}>
                        {generateCodeSnippets(showCodeModal).buttonSnippet}
                      </pre>
                    </Box>
                    <Button onClick={() => copyToClipboard(generateCodeSnippets(showCodeModal).buttonSnippet)}>
                      Copy Code
                    </Button>
                    <Banner tone="info">
                      <p>
                        The pixel script automatically listens for clicks on elements with{" "}
                        <code>data-pixel-event</code> attribute.
                      </p>
                    </Banner>
                  </BlockStack>
                )}
              </Box>
            </Tabs>
          </Modal.Section>
        </Modal>
      )}

      {/* Button Builder Modal */}
      {showButtonBuilder && (
        <Modal
          open={true}
          onClose={() => setShowButtonBuilder(null)}
          title={`Create Button for "${showButtonBuilder.displayName}"`}
          size="large"
        >
          <Modal.Section>
            <BlockStack gap="500">
              {/* Live Preview */}
              <Card>
                <BlockStack gap="300">
                  <Text variant="headingSm" as="h3">Live Preview</Text>
                  <Box padding="600" background="bg-surface-secondary" borderRadius="200">
                    <div style={{ textAlign: "center" }}>
                      <button
                        style={{
                          backgroundColor: buttonConfig.bgColor,
                          color: buttonConfig.textColor,
                          borderRadius: `${buttonConfig.borderRadius}px`,
                          padding: `${buttonConfig.paddingY}px ${buttonConfig.paddingX}px`,
                          fontSize: `${buttonConfig.fontSize}px`,
                          fontWeight: buttonConfig.fontWeight,
                          border: `${buttonConfig.borderWidth}px solid ${buttonConfig.borderColor}`,
                          cursor: "pointer",
                          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          boxShadow: buttonConfig.shadow ? "0 4px 14px rgba(0,0,0,0.15)" : "none",
                          transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = buttonConfig.shadow ? "0 4px 14px rgba(0,0,0,0.15)" : "none";
                        }}
                      >
                        {buttonConfig.text}
                      </button>
                    </div>
                  </Box>
                  <Text as="p" tone="subdued" variant="bodySm">
                    Drag this preview or copy the embed code below
                  </Text>
                </BlockStack>
              </Card>

              <Divider />

              {/* Button Settings */}
              <BlockStack gap="400">
                <Text variant="headingSm" as="h3">Button Settings</Text>
                
                <TextField
                  label="Button Text"
                  value={buttonConfig.text}
                  onChange={(value) => setButtonConfig(prev => ({ ...prev, text: value }))}
                  autoComplete="off"
                />

                <TextField
                  label="Redirect URL (optional)"
                  value={buttonConfig.redirectUrl}
                  onChange={(value) => setButtonConfig(prev => ({ ...prev, redirectUrl: value }))}
                  placeholder="https://your-store.com/checkout"
                  helpText="Where to redirect after tracking the event"
                  autoComplete="off"
                />

                <InlineStack gap="400">
                  <div style={{ flex: 1 }}>
                    <BlockStack gap="200">
                      <Text as="p" variant="bodySm">Background Color</Text>
                      <Popover
                        active={showBgColorPicker}
                        activator={
                          <Button onClick={() => setShowBgColorPicker(!showBgColorPicker)}>
                            <InlineStack gap="200" blockAlign="center">
                              <div style={{ 
                                width: 20, 
                                height: 20, 
                                backgroundColor: buttonConfig.bgColor,
                                borderRadius: 4,
                                border: "1px solid #ccc"
                              }} />
                              <span>{buttonConfig.bgColor}</span>
                            </InlineStack>
                          </Button>
                        }
                        onClose={() => setShowBgColorPicker(false)}
                      >
                        <Box padding="400">
                          <BlockStack gap="300">
                            <TextField
                              label="Hex Color"
                              value={buttonConfig.bgColor}
                              onChange={(value) => setButtonConfig(prev => ({ ...prev, bgColor: value }))}
                              autoComplete="off"
                            />
                            <InlineStack gap="200" wrap>
                              {["#000000", "#ffffff", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"].map(color => (
                                <button
                                  key={color}
                                  onClick={() => setButtonConfig(prev => ({ ...prev, bgColor: color }))}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    backgroundColor: color,
                                    border: buttonConfig.bgColor === color ? "3px solid #000" : "1px solid #ccc",
                                    borderRadius: 4,
                                    cursor: "pointer",
                                  }}
                                />
                              ))}
                            </InlineStack>
                          </BlockStack>
                        </Box>
                      </Popover>
                    </BlockStack>
                  </div>

                  <div style={{ flex: 1 }}>
                    <BlockStack gap="200">
                      <Text as="p" variant="bodySm">Text Color</Text>
                      <Popover
                        active={showTextColorPicker}
                        activator={
                          <Button onClick={() => setShowTextColorPicker(!showTextColorPicker)}>
                            <InlineStack gap="200" blockAlign="center">
                              <div style={{ 
                                width: 20, 
                                height: 20, 
                                backgroundColor: buttonConfig.textColor,
                                borderRadius: 4,
                                border: "1px solid #ccc"
                              }} />
                              <span>{buttonConfig.textColor}</span>
                            </InlineStack>
                          </Button>
                        }
                        onClose={() => setShowTextColorPicker(false)}
                      >
                        <Box padding="400">
                          <BlockStack gap="300">
                            <TextField
                              label="Hex Color"
                              value={buttonConfig.textColor}
                              onChange={(value) => setButtonConfig(prev => ({ ...prev, textColor: value }))}
                              autoComplete="off"
                            />
                            <InlineStack gap="200" wrap>
                              {["#000000", "#ffffff", "#374151", "#6b7280", "#3b82f6", "#10b981"].map(color => (
                                <button
                                  key={color}
                                  onClick={() => setButtonConfig(prev => ({ ...prev, textColor: color }))}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    backgroundColor: color,
                                    border: buttonConfig.textColor === color ? "3px solid #000" : "1px solid #ccc",
                                    borderRadius: 4,
                                    cursor: "pointer",
                                  }}
                                />
                              ))}
                            </InlineStack>
                          </BlockStack>
                        </Box>
                      </Popover>
                    </BlockStack>
                  </div>
                </InlineStack>

                <InlineStack gap="400">
                  <div style={{ flex: 1 }}>
                    <RangeSlider
                      label="Border Radius"
                      value={buttonConfig.borderRadius}
                      onChange={(value) => setButtonConfig(prev => ({ ...prev, borderRadius: value as number }))}
                      min={0}
                      max={50}
                      output
                      suffix={<Text as="span">{buttonConfig.borderRadius}px</Text>}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <RangeSlider
                      label="Font Size"
                      value={buttonConfig.fontSize}
                      onChange={(value) => setButtonConfig(prev => ({ ...prev, fontSize: value as number }))}
                      min={12}
                      max={32}
                      output
                      suffix={<Text as="span">{buttonConfig.fontSize}px</Text>}
                    />
                  </div>
                </InlineStack>

                <InlineStack gap="400">
                  <div style={{ flex: 1 }}>
                    <RangeSlider
                      label="Horizontal Padding"
                      value={buttonConfig.paddingX}
                      onChange={(value) => setButtonConfig(prev => ({ ...prev, paddingX: value as number }))}
                      min={8}
                      max={60}
                      output
                      suffix={<Text as="span">{buttonConfig.paddingX}px</Text>}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <RangeSlider
                      label="Vertical Padding"
                      value={buttonConfig.paddingY}
                      onChange={(value) => setButtonConfig(prev => ({ ...prev, paddingY: value as number }))}
                      min={4}
                      max={30}
                      output
                      suffix={<Text as="span">{buttonConfig.paddingY}px</Text>}
                    />
                  </div>
                </InlineStack>

                <Checkbox
                  label="Add shadow"
                  checked={buttonConfig.shadow}
                  onChange={(value) => setButtonConfig(prev => ({ ...prev, shadow: value }))}
                />
              </BlockStack>

              <Divider />

              {/* Embed Code */}
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">Embed Code</Text>
                <Text as="p" tone="subdued" variant="bodySm">
                  Copy this code and paste it into your website where you want the button to appear.
                </Text>
                <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                  <pre style={{ 
                    margin: 0, 
                    whiteSpace: "pre-wrap", 
                    fontFamily: "monospace", 
                    fontSize: "12px",
                    lineHeight: 1.5,
                  }}>
                    {generateButtonEmbed(showButtonBuilder)}
                  </pre>
                </Box>
                <Button variant="primary" onClick={() => copyToClipboard(generateButtonEmbed(showButtonBuilder))}>
                  Copy Embed Code
                </Button>
              </BlockStack>
            </BlockStack>
          </Modal.Section>
        </Modal>
      )}
    </Page>
  );
}
