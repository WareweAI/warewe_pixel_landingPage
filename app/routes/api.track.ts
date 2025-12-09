// Track API endpoint - receives events from the pixel
import type { ActionFunctionArgs } from 'react-router';
import prisma from '~/db.server';
import { parseUserAgent, getDeviceType } from '~/services/device.server';
import { getGeoData } from '~/services/geo.server';
import { forwardToMeta } from '~/services/meta-capi.server';

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await request.json();
    const {
      appId,
      eventName,
      url,
      referrer,
      sessionId,
      visitorId,
      fingerprint,
      screenWidth,
      screenHeight,
      language,
      properties,
    } = body;

    if (!appId || !eventName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Find app
    const app = await prisma.app.findUnique({
      where: { appId },
      include: { settings: true },
    });

    if (!app) {
      return Response.json({ error: 'App not found' }, { status: 404 });
    }

    // Get user agent and IP
    const userAgent = request.headers.get('user-agent') || '';
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 
               '0.0.0.0';

    // Parse device info
    const deviceInfo = parseUserAgent(userAgent);
    const deviceType = getDeviceType(userAgent, screenWidth);

    // Get geo data
    const geoData = app.settings?.recordLocation ? await getGeoData(ip) : null;

    // Create event
    const event = await prisma.event.create({
      data: {
        appId: app.id,
        eventName,
        url: url || null,
        referrer: referrer || null,
        sessionId: sessionId || null,
        fingerprint: fingerprint || null,
        ipAddress: app.settings?.recordIp ? ip : null,
        userAgent,
        browser: deviceInfo.browser,
        browserVersion: deviceInfo.browserVersion,
        os: deviceInfo.os,
        osVersion: deviceInfo.osVersion,
        deviceType,
        screenWidth: screenWidth || null,
        screenHeight: screenHeight || null,
        city: geoData?.city || null,
        region: geoData?.region || null,
        country: geoData?.country || null,
        countryCode: geoData?.countryCode || null,
        timezone: geoData?.timezone || null,
        customData: properties ? JSON.parse(JSON.stringify(properties)) : undefined,
      },
    });

    // Update or create session
    if (sessionId && app.settings?.recordSession) {
      const existingSession = await prisma.analyticsSession.findUnique({
        where: { sessionId },
      });

      if (existingSession) {
        await prisma.analyticsSession.update({
          where: { id: existingSession.id },
          data: {
            lastSeen: new Date(),
            pageviews: eventName === 'pageview' ? { increment: 1 } : undefined,
          },
        });
      } else {
        await prisma.analyticsSession.create({
          data: {
            appId: app.id,
            sessionId,
            fingerprint: fingerprint || visitorId || 'unknown',
            ipAddress: app.settings?.recordIp ? ip : null,
            userAgent,
            browser: deviceInfo.browser,
            os: deviceInfo.os,
            deviceType,
            country: geoData?.country || null,
            pageviews: eventName === 'pageview' ? 1 : 0,
          },
        });
      }
    }

    // Update daily stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.dailyStats.upsert({
      where: {
        appId_date: { appId: app.id, date: today },
      },
      update: {
        pageviews: eventName === 'pageview' ? { increment: 1 } : undefined,
        updatedAt: new Date(),
      },
      create: {
        appId: app.id,
        date: today,
        pageviews: eventName === 'pageview' ? 1 : 0,
        uniqueUsers: 0,
        sessions: 0,
      },
    });

    // Forward to Meta if enabled
    if (app.settings?.metaPixelEnabled && app.settings?.metaVerified) {
      try {
        await forwardToMeta({
          pixelId: app.settings.metaPixelId!,
          accessToken: app.settings.metaAccessToken!,
          testEventCode: app.settings.metaTestEventCode || undefined,
          event: {
            eventName,
            eventTime: Math.floor(Date.now() / 1000),
            eventSourceUrl: url,
            actionSource: 'website',
            userData: {
              clientIpAddress: ip,
              clientUserAgent: userAgent,
              externalId: fingerprint || visitorId,
            },
            customData: properties,
          },
        });
      } catch (error) {
        console.error('Meta forwarding error:', error);
        // Don't fail the request if Meta forwarding fails
      }
    }

    return Response.json({ success: true, eventId: event.id });
  } catch (error) {
    console.error('Track API error:', error);
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}

// Also allow GET for beacon fallback (some browsers)
export async function loader({ request }: ActionFunctionArgs) {
  return Response.json({ error: 'Use POST method' }, { status: 405 });
}


export default function TrackAPI() {
  return null;
}
