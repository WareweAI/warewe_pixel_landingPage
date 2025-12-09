import { useState, useEffect } from "react";
import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import {
  Page,
  Layout,
  Card,
  Text,
  DataTable,
  EmptyState,
  Select,
  InlineStack,
  BlockStack,
  InlineGrid,
} from "@shopify/polaris";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  let user = await prisma.user.findUnique({
    where: { email: shop },
  });

  if (!user) {
    const { generateRandomPassword } = await import("~/lib/crypto.server");
    user = await prisma.user.create({
      data: {
        email: shop,
        password: generateRandomPassword(),
      },
    });
  }

  const apps = await prisma.app.findMany({
    where: { userId: user.id },
    select: { id: true, appId: true, name: true },
  });

  return { apps };
};

export default function VisitorsPage() {
  const { apps } = useLoaderData<typeof loader>();
  const [selectedApp, setSelectedApp] = useState(apps[0]?.appId || "");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedApp) return;

    setLoading(true);
    fetch(`/api/visitors?appId=${selectedApp}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setData(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedApp]);

  const rows =
    data?.sessions?.map((session: any) => [
      session.sessionId.slice(0, 12) + "...",
      session.country || "-",
      session.browser || "-",
      session.deviceType || "-",
      session.pageviews,
      new Date(session.startTime).toLocaleString(),
    ]) || [];

  return (
    <Page title="Visitors">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between">
                <Text variant="headingMd" as="h2">
                  Visitor Sessions
                </Text>
                {apps.length > 0 && (
                  <div style={{ width: "200px" }}>
                    <Select
                      label=""
                      options={apps.map((app) => ({
                        label: app.name,
                        value: app.appId,
                      }))}
                      value={selectedApp}
                      onChange={setSelectedApp}
                    />
                  </div>
                )}
              </InlineStack>

              {data && (
                <InlineGrid columns={4} gap="400">
                  <Card>
                    <BlockStack gap="200">
                      <Text variant="bodySm" as="p" tone="subdued">
                        Total Sessions
                      </Text>
                      <Text variant="headingLg" as="p">
                        {data.totalSessions?.toLocaleString() || 0}
                      </Text>
                    </BlockStack>
                  </Card>
                  <Card>
                    <BlockStack gap="200">
                      <Text variant="bodySm" as="p" tone="subdued">
                        Unique Visitors
                      </Text>
                      <Text variant="headingLg" as="p">
                        {data.uniqueVisitors?.toLocaleString() || 0}
                      </Text>
                    </BlockStack>
                  </Card>
                  <Card>
                    <BlockStack gap="200">
                      <Text variant="bodySm" as="p" tone="subdued">
                        Avg. Duration
                      </Text>
                      <Text variant="headingLg" as="p">
                        {data.avgDuration
                          ? `${Math.floor(data.avgDuration / 60)}m`
                          : "0m"}
                      </Text>
                    </BlockStack>
                  </Card>
                  <Card>
                    <BlockStack gap="200">
                      <Text variant="bodySm" as="p" tone="subdued">
                        Bounce Rate
                      </Text>
                      <Text variant="headingLg" as="p">
                        {data.bounceRate?.toFixed(1) || 0}%
                      </Text>
                    </BlockStack>
                  </Card>
                </InlineGrid>
              )}

              {apps.length === 0 ? (
                <EmptyState
                  heading="No pixels yet"
                  action={{ content: "Create Pixel", url: "/app" }}
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                >
                  <p>Create a pixel to start tracking visitors.</p>
                </EmptyState>
              ) : rows.length === 0 && !loading ? (
                <EmptyState
                  heading="No sessions yet"
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                >
                  <p>Visitor sessions will appear here once tracking starts.</p>
                </EmptyState>
              ) : (
                <DataTable
                  columnContentTypes={["text", "text", "text", "text", "numeric", "text"]}
                  headings={["Session ID", "Country", "Browser", "Device", "Pageviews", "Started"]}
                  rows={rows}
                />
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
