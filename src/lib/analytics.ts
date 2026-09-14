export type AnalyticsEventName =
  | 'hero_store_click'
  | 'sticky_store_click'
  | 'app_store_click'
  | 'play_store_click'
  | 'waitlist_click'
  | 'barcode_demo_view'
  | 'app_proof_view'
  | 'partner_click'
  | 'admin_click';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

// THE CLICK TRACKER HAD NO COLLECTOR.
//
// trackEvent() pushed into window.dataLayer behind an Array.isArray guard, and
// no GTM container is loaded anywhere on this site — not in index.html, not in
// the bundle. So the guard was false on every visit and every store click since
// launch was discarded at that line. Checked against production before changing
// anything: 31,928 UserActivityEvent rows, not one from a web origin, ever.
//
// The fix is not a second analytics system. We already run a collector — POST
// /api/analytics/events, the endpoint the mobile app posts to — so these events
// land in the same UserActivityEvent table that /admin/growth already reads,
// and an install click can be counted next to what the installed app then does.
//
// The dataLayer push below is KEPT. It costs nothing, and if a GTM container is
// ever added it starts working without this file being touched again.
const COLLECTOR_BASE =
  (import.meta.env?.VITE_API_BASE_URL as string | undefined) ?? 'https://api.krahaso.app';

type CollectedEvent = { type: string; props?: Record<string, string> };

// Landing event name -> the backend's activityEventTypes entry. A name absent
// from this map is still pushed to dataLayer and simply not collected.
const COLLECTED: Partial<Record<AnalyticsEventName, CollectedEvent>> = {
  play_store_click: { type: 'APP_STORE_CLICKED', props: { store: 'play-store' } },
  app_store_click: { type: 'APP_STORE_CLICKED', props: { store: 'app-store' } },
  // hero_store_click and sticky_store_click are DELIBERATELY not collected.
  // They fire on the same tap as the two above and carry only the store name,
  // which the primary event already has alongside `placement`. Collecting them
  // would double every hero and sticky click — and for judging acquisition a
  // count that is wrong high is no better than one that is wrong low.
  //
  // admin_click is a staff link to the back office, not demand. waitlist_click,
  // barcode_demo_view, app_proof_view and partner_click have no call site in
  // the shipped app at all; an entry for them would be an allowlist line
  // pretending to be a feature.
};

// PER VISIT ONLY, deliberately. A persistent device id in localStorage would
// buy exactly one thing — recognising a repeat visitor to a page whose whole
// job is to send you to a store listing — and it cannot even be joined to the
// install that follows, because the app mints its own id. That is nothing to
// weigh against putting a lasting identifier on a public site with no consent
// banner, on which /privacy describes an APP installation identifier and not a
// website one. sessionStorage is cleared when the tab closes.
//
// anonymousUserId is left null and the server fills it from its own salted
// IP+user-agent fingerprint (requestIpFingerprint in the analytics service),
// which is what anonymous traffic already gets and is stored on nobody's
// device. Visits, clicks, the rate between them and the campaign all still
// answer; only 'came back next week' is given up.
const SESSION_KEY = 'krahaso_web_session_id';

function newId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `a-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

// Safari private mode throws on storage access, so a failure here costs the
// event its id, never the visitor their page.
function storedId(storage: () => Storage, key: string) {
  try {
    const store = storage();
    const existing = store.getItem(key);
    if (existing) return existing;
    const next = newId();
    store.setItem(key, next);
    return next;
  } catch {
    return null;
  }
}

export function campaignMetadata(current: URL) {
  const out: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const value = current.searchParams.get(key);
    if (value) out[key] = value.slice(0, 120);
  });
  return out;
}

export function buildCampaignReferrer(current: URL) {
  const referrer = new URLSearchParams();

  UTM_KEYS.forEach((key) => {
    const value = current.searchParams.get(key);
    if (value) referrer.set(key, value);
  });

  return referrer.toString();
}

// sendBeacon first, for one reason that matters here: these are clicks on links
// that hand the browser over to the Play Store or App Store app. The tab is not
// unloaded — both links are target="_blank" — but a phone backgrounding the
// page mid-request is ordinary, and a beacon is the one transport the browser
// promises to finish anyway.
//
// The Blob is text/plain because that content type is CORS-safelisted: it skips
// the preflight an application/json POST would need, so the whole thing is a
// single hop. backend/src/routes/analytics.js parses text/plain on this route
// for exactly this reason.
function send(body: string) {
  const url = `${COLLECTOR_BASE}/api/analytics/events`;
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'text/plain;charset=UTF-8' });
      if (navigator.sendBeacon(url, blob)) return;
    }
    void fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body,
      keepalive: true,
      mode: 'cors',
    }).catch(() => undefined);
  } catch {
    // Measurement must never break the page it is measuring.
  }
}

export function collectorPayload(
  eventType: string,
  href: string,
  props: Record<string, string> = {},
  ids: { anonymousUserId: string | null; sessionId: string | null } = {
    anonymousUserId: null,
    sessionId: null,
  },
) {
  const current = new URL(href);
  const metadata = { ...campaignMetadata(current), ...props };
  return {
    eventType,
    // The same idempotency key the app uses: a double tap is dropped
    // server-side rather than counted as extra demand.
    eventId: newId(),
    occurredAt: new Date().toISOString(),
    anonymousUserId: ids.anonymousUserId,
    sessionId: ids.sessionId,
    // The path only. Campaign parameters ride in metadata, where they can be
    // grouped, instead of splitting one page into a row per campaign.
    sourcePage: current.pathname,
    metadata: Object.keys(metadata).length ? metadata : undefined,
  };
}

function collect(eventType: string, props: Record<string, string> = {}) {
  if (typeof window === 'undefined') return;
  send(
    JSON.stringify(
      collectorPayload(eventType, window.location.href, props, {
        anonymousUserId: null,
        sessionId: storedId(() => window.sessionStorage, SESSION_KEY),
      }),
    ),
  );
}

export function trackEvent(
  name: AnalyticsEventName,
  payload: Record<string, string> = {},
) {
  if (typeof window === 'undefined') return;

  if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: name, ...payload });

  const collected = COLLECTED[name];
  if (collected) collect(collected.type, { ...collected.props, ...payload });
}

// The denominator. A store-click count on its own is not an acquisition rate —
// it cannot say whether 40 clicks came from 100 visits or from 10,000. This
// page tracked no visit at all, so the rate would still be unanswerable once
// the clicks started arriving. PAGE_VIEWED is already an accepted type, so
// nothing new is needed on the server for it.
export function trackPageView() {
  collect('PAGE_VIEWED');
}

export function preserveUtm(href: string) {
  if (typeof window === 'undefined') return href;

  try {
    const destination = new URL(href);
    const current = new URL(window.location.href);
    const campaign = buildCampaignReferrer(current);
    const isPlayListing =
      destination.hostname === 'play.google.com' &&
      destination.pathname === '/store/apps/details';

    if (isPlayListing && campaign) {
      destination.searchParams.set('referrer', campaign);
    } else {
      UTM_KEYS.forEach((key) => {
        const value = current.searchParams.get(key);
        if (value && !destination.searchParams.has(key)) {
          destination.searchParams.set(key, value);
        }
      });
    }

    return destination.toString();
  } catch {
    return href;
  }
}
