// Pixel JavaScript endpoint - serves the tracking script
import type { LoaderFunctionArgs } from "react-router";
import prisma from "~/db.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const appId = url.searchParams.get("id");

  if (!appId) {
    return new Response("// Missing app ID", {
      status: 400,
      headers: { "Content-Type": "application/javascript" },
    });
  }

  // Verify app exists and get settings
  const app = await prisma.app.findUnique({
    where: { appId },
    include: { settings: true },
  });

  if (!app) {
    return new Response("// App not found", {
      status: 404,
      headers: { "Content-Type": "application/javascript" },
    });
  }

  // Get custom events for the app (only active ones with selectors for auto-tracking)
  const customEvents = await prisma.customEvent.findMany({
    where: { appId: app.id, isActive: true },
    select: {
      name: true,
      displayName: true,
      selector: true,
      eventType: true,
      metaEventName: true,
      hasProductId: true,
    },
  });

  const settings = app.settings;
  const trackPageviews = settings?.autoTrackPageviews ?? true;
  const trackClicks = settings?.autoTrackClicks ?? true;
  const trackScroll = settings?.autoTrackScroll ?? true;

  // Get the origin for the tracking endpoint
  const origin = url.origin;

  // Build custom events config for auto-tracking
  const autoTrackEvents = customEvents
    .filter((ce) => ce.selector)
    .map((ce) => ({
      name: ce.name,
      selector: ce.selector,
      eventType: ce.eventType,
      meta: ce.metaEventName,
    }));

  const script = `
(function() {
  'use strict';
  
  var APP_ID = '${appId}';
  var ENDPOINT = '${origin}/api/track';
  var SESSION_KEY = 'px_session_' + APP_ID;
  var VISITOR_KEY = 'px_visitor_' + APP_ID;
  var DEBUG = false;
  
  // Custom events config for auto-tracking
  var CUSTOM_EVENTS = ${JSON.stringify(autoTrackEvents)};
  
  // Generate unique ID
  function generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  // Get or create session
  function getSession() {
    try {
      var session = sessionStorage.getItem(SESSION_KEY);
      if (!session) {
        session = generateId();
        sessionStorage.setItem(SESSION_KEY, session);
      }
      return session;
    } catch (e) {
      return generateId();
    }
  }
  
  // Get or create visitor ID
  function getVisitor() {
    try {
      var visitor = localStorage.getItem(VISITOR_KEY);
      if (!visitor) {
        visitor = generateId();
        localStorage.setItem(VISITOR_KEY, visitor);
      }
      return visitor;
    } catch (e) {
      return generateId();
    }
  }
  
  // Generate fingerprint
  function getFingerprint() {
    try {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('fingerprint', 2, 2);
      }
      var str = canvas.toDataURL() + navigator.userAgent + screen.width + screen.height + new Date().getTimezoneOffset();
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16);
    } catch (e) {
      return 'unknown';
    }
  }
  
  // Parse UTM parameters
  function getUtmParams() {
    var params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get('utm_source'),
      utmMedium: params.get('utm_medium'),
      utmCampaign: params.get('utm_campaign'),
      utmTerm: params.get('utm_term'),
      utmContent: params.get('utm_content')
    };
  }
  
  // Core tracking function
  function track(eventName, properties) {
    properties = properties || {};
    
    var utmParams = getUtmParams();
    
    var data = {
      appId: APP_ID,
      eventName: eventName,
      url: window.location.href,
      referrer: document.referrer,
      pageTitle: document.title,
      sessionId: getSession(),
      visitorId: getVisitor(),
      fingerprint: getFingerprint(),
      timestamp: new Date().toISOString(),
      screenWidth: screen.width,
      screenHeight: screen.height,
      language: navigator.language,
      // UTM params
      utmSource: utmParams.utmSource,
      utmMedium: utmParams.utmMedium,
      utmCampaign: utmParams.utmCampaign,
      utmTerm: utmParams.utmTerm,
      utmContent: utmParams.utmContent,
      // Event-specific data
      value: properties.value,
      currency: properties.currency,
      productId: properties.product_id || properties.productId,
      productName: properties.product_name || properties.productName,
      quantity: properties.quantity,
      customData: properties
    };
    
    if (DEBUG) {
      console.log('[PixelAnalytics] Tracking:', eventName, data);
    }
    
    // Use sendBeacon if available for reliability
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, JSON.stringify(data));
      } else {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', ENDPOINT, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    } catch (e) {
      if (DEBUG) console.error('[PixelAnalytics] Error:', e);
    }
    
    return data;
  }
  
  // E-commerce helper functions
  function trackPurchase(value, currency, orderId, products) {
    return track('purchase', {
      value: value,
      currency: currency || 'USD',
      order_id: orderId,
      products: products
    });
  }
  
  function trackAddToCart(productId, productName, value, quantity) {
    return track('addToCart', {
      product_id: productId,
      product_name: productName,
      value: value,
      quantity: quantity || 1
    });
  }
  
  function trackViewContent(productId, productName, value, category) {
    return track('viewContent', {
      product_id: productId,
      product_name: productName,
      value: value,
      category: category
    });
  }
  
  function trackInitiateCheckout(value, currency, products) {
    return track('initiateCheckout', {
      value: value,
      currency: currency || 'USD',
      products: products
    });
  }
  
  // Auto-track pageviews
  ${trackPageviews ? `
  track('pageview');
  
  // Track navigation changes (SPA support)
  var lastUrl = window.location.href;
  var checkUrlChange = function() {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;
      track('pageview');
    }
  };
  
  // Listen for popstate (back/forward)
  window.addEventListener('popstate', function() {
    setTimeout(checkUrlChange, 0);
  });
  
  // Intercept pushState and replaceState
  var originalPushState = history.pushState;
  var originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    checkUrlChange();
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    checkUrlChange();
  };
  ` : ""}
  
  // Auto-track scroll depth
  ${trackScroll ? `
  var maxScroll = 0;
  var scrollMilestones = [25, 50, 75, 100];
  var trackedMilestones = {};
  
  function trackScrollDepth() {
    var docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    var viewportHeight = window.innerHeight;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollPercent = Math.round((scrollTop / (docHeight - viewportHeight)) * 100);
    
    if (isNaN(scrollPercent)) return;
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      scrollMilestones.forEach(function(milestone) {
        if (scrollPercent >= milestone && !trackedMilestones[milestone]) {
          trackedMilestones[milestone] = true;
          track('scroll', { depth: milestone });
        }
      });
    }
  }
  
  window.addEventListener('scroll', trackScrollDepth, { passive: true });
  ` : ""}
  
  // Auto-track link and button clicks
  ${trackClicks ? `
  document.addEventListener('click', function(e) {
    var target = e.target;
    var elem = target.closest('a, button, [role="button"]');
    
    if (elem) {
      track('click', {
        element: elem.tagName.toLowerCase(),
        text: (elem.innerText || '').substring(0, 100).trim(),
        href: elem.href || null,
        id: elem.id || null,
        className: elem.className || null
      });
    }
  }, true);
  ` : ""}
  
  // Track custom events via data attributes
  document.addEventListener('click', function(e) {
    var target = e.target;
    var elem = target.closest('[data-pixel-event]');
    
    if (elem) {
      var eventName = elem.getAttribute('data-pixel-event');
      var value = elem.getAttribute('data-pixel-value');
      var currency = elem.getAttribute('data-pixel-currency');
      var productId = elem.getAttribute('data-pixel-product');
      var productName = elem.getAttribute('data-pixel-product-name');
      
      track(eventName, {
        value: value ? parseFloat(value) : undefined,
        currency: currency,
        product_id: productId,
        product_name: productName,
        element: elem.tagName.toLowerCase(),
        text: (elem.innerText || '').substring(0, 100).trim()
      });
    }
  }, true);
  
  // Auto-track custom events based on CSS selectors
  function setupCustomEventTracking() {
    CUSTOM_EVENTS.forEach(function(ce) {
      if (!ce.selector) return;
      
      try {
        var elements = document.querySelectorAll(ce.selector);
        elements.forEach(function(el) {
          if (el._pixelTracked) return;
          el._pixelTracked = true;
          
          el.addEventListener(ce.eventType || 'click', function(e) {
            track(ce.name, {
              selector: ce.selector,
              element: e.target.tagName.toLowerCase(),
              text: (e.target.innerText || '').substring(0, 100).trim()
            });
          });
        });
      } catch (err) {
        if (DEBUG) console.error('[PixelAnalytics] Error setting up custom event:', ce.name, err);
      }
    });
  }
  
  // Initial setup and watch for DOM changes
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCustomEventTracking);
  } else {
    setupCustomEventTracking();
  }
  
  // Watch for dynamically added elements
  if (typeof MutationObserver !== 'undefined') {
    var observer = new MutationObserver(function(mutations) {
      var hasNewNodes = mutations.some(function(m) { return m.addedNodes.length > 0; });
      if (hasNewNodes) {
        setupCustomEventTracking();
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  // Expose public API
  window.PixelAnalytics = {
    track: track,
    trackPurchase: trackPurchase,
    trackAddToCart: trackAddToCart,
    trackViewContent: trackViewContent,
    trackInitiateCheckout: trackInitiateCheckout,
    setDebug: function(value) { DEBUG = !!value; },
    getSessionId: getSession,
    getVisitorId: getVisitor
  };
  
  // Backward compatibility
  window.pixelTrack = track;
  window.px = track;
  
  if (DEBUG) {
    console.log('[PixelAnalytics] Initialized for app:', APP_ID);
  }
  
})();
`;

  return new Response(script, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=300", // Cache for 5 minutes
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export default function PixelJsAPI() {
  return null;
}
