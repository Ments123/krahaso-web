import assert from 'node:assert/strict';
import test from 'node:test';
import { collectorPayload, trackEvent, trackPageView } from '../src/lib/analytics';

// THE CLICK TRACKER HAD NO COLLECTOR, AND NOTHING SAID SO.
//
// trackEvent() pushed into window.dataLayer behind an Array.isArray guard, and
// no GTM container is loaded on this site, so the guard was false on every
// visit and every store click since launch was discarded at that line. It
// typechecked, the links worked, and production held 31,928 analytics rows
// without one from a web origin. Nothing here can be asserted from the page
// looking right — only from a request actually leaving.
//
// The server half is backend/tests/unit/analytics-growth-events.test.js. Both
// are needed: an accepted event type proves the door is open, never that
// anyone walks through it.

type Sent = { url: string; body: Record<string, unknown> };

function inBrowser<T>(href: string, run: (sent: Sent[]) => T): T {
  const sent: Sent[] = [];
  const store = () => {
    const data = new Map<string, string>();
    const __writes: string[] = [];
    return {
      __writes,
      getItem: (k: string) => data.get(k) ?? null,
      setItem: (k: string, v: string) => {
        __writes.push(k);
        data.set(k, v);
      },
    } as unknown as Storage;
  };

  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const previousNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { location: { href }, localStorage: store(), sessionStorage: store() },
  });
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: {
      // Synchronous on purpose: the real sendBeacon hands the request to the
      // browser and returns, which is why it survives the page being
      // backgrounded by a store link.
      sendBeacon: (url: string, blob: Blob) => {
        sent.push({ url, body: JSON.parse((blob as unknown as { __text: string }).__text) });
        return true;
      },
    },
  });

  // Blob is a Node global but does not expose its bytes synchronously, so the
  // stub carries the text alongside for the assertion.
  const RealBlob = globalThis.Blob;
  class TextBlob {
    __text: string;
    constructor(parts: string[]) {
      this.__text = parts.join('');
    }
  }
  Object.defineProperty(globalThis, 'Blob', { configurable: true, value: TextBlob });

  try {
    return run(sent);
  } finally {
    Object.defineProperty(globalThis, 'Blob', { configurable: true, value: RealBlob });
    if (previousWindow) Object.defineProperty(globalThis, 'window', previousWindow);
    else Reflect.deleteProperty(globalThis, 'window');
    if (previousNavigator) Object.defineProperty(globalThis, 'navigator', previousNavigator);
    else Reflect.deleteProperty(globalThis, 'navigator');
  }
}

test('a Play Store click leaves the page as a collectable event', () => {
  inBrowser('https://krahaso.app/', (sent) => {
    trackEvent('play_store_click', { placement: 'hero' });

    assert.equal(sent.length, 1, 'exactly one request — this used to be zero');
    assert.equal(sent[0].url, 'https://api.krahaso.app/api/analytics/events');
    assert.equal(sent[0].body.eventType, 'APP_STORE_CLICKED');
    const metadata = sent[0].body.metadata as Record<string, string>;
    // Which store and which section of the page. Without both, the event says
    // only that somebody clicked something.
    assert.equal(metadata.store, 'play-store');
    assert.equal(metadata.placement, 'hero');
    // "/" is what distinguishes a landing-page row from the app's "/mobile".
    assert.equal(sent[0].body.sourcePage, '/');
  });
});

test('an App Store click is distinguishable from a Play one', () => {
  inBrowser('https://krahaso.app/', (sent) => {
    trackEvent('app_store_click', { placement: 'sticky' });
    assert.equal(sent.length, 1);
    assert.equal((sent[0].body.metadata as Record<string, string>).store, 'app-store');
  });
});

test('the duplicate placement events do not double-count a click', () => {
  // AppAcquisitionCta fires hero_store_click on the SAME tap as
  // play_store_click, carrying only the store name that the primary event
  // already has. Collecting both would inflate every hero and sticky click,
  // and a number that is wrong high is no more useful for judging acquisition
  // than the zero it replaces.
  inBrowser('https://krahaso.app/', (sent) => {
    trackEvent('play_store_click', { placement: 'hero' });
    trackEvent('hero_store_click', { store: 'play-store' });
    trackEvent('sticky_store_click', { store: 'play-store' });
    assert.equal(sent.length, 1, 'one tap, one row');
  });
});

test('the visit itself is counted, so the clicks have a denominator', () => {
  inBrowser('https://krahaso.app/', (sent) => {
    trackPageView();
    assert.equal(sent.length, 1);
    assert.equal(sent[0].body.eventType, 'PAGE_VIEWED');
  });
});

test('the campaign that paid for the visit rides along', () => {
  inBrowser('https://krahaso.app/?utm_source=instagram&utm_campaign=launch', (sent) => {
    trackEvent('play_store_click', { placement: 'nav' });
    const metadata = sent[0].body.metadata as Record<string, string>;
    assert.equal(metadata.utm_source, 'instagram');
    assert.equal(metadata.utm_campaign, 'launch');
    // Campaign values stay in metadata rather than in sourcePage, so one page
    // does not become a different row per campaign.
    assert.equal(sent[0].body.sourcePage, '/');
  });
});

test('one visit is one session, and no lasting identifier is left behind', () => {
  inBrowser('https://krahaso.app/', (sent) => {
    trackPageView();
    trackEvent('play_store_click', { placement: 'hero' });
    assert.equal(sent.length, 2);
    // The two events have to be tied together or the visit-to-click rate
    // cannot be computed at all.
    assert.ok(sent[0].body.sessionId, 'a session id is sent');
    assert.equal(sent[0].body.sessionId, sent[1].body.sessionId, 'one visit, one session');
    // And nothing that outlives the tab. The server fills anonymousUserId from
    // its own IP+user-agent fingerprint, which is stored on no device.
    assert.equal(sent[0].body.anonymousUserId, null, 'no device id is minted here');
    // Server-side idempotency key — a double tap is dropped, not counted twice.
    assert.notEqual(sent[0].body.eventId, sent[1].body.eventId);
  });
});

test('nothing is written to localStorage', () => {
  // The guard on the decision above: a later refactor that reaches for a
  // persistent id has to fail here rather than ship quietly.
  inBrowser('https://krahaso.app/', () => {
    trackPageView();
    const written = (window as unknown as { localStorage: { __writes: string[] } }).localStorage.__writes;
    assert.deepEqual(written, [], 'the landing page leaves no persistent storage');
  });
});

test('the payload carries only ids the backend will accept', () => {
  const payload = collectorPayload('PAGE_VIEWED', 'https://krahaso.app/?utm_source=x');
  // cleanId() in backend/src/services/analytics.js drops anything outside this
  // set, silently, so an id shaped wrongly would read as a missing visitor.
  assert.match(String(payload.eventId), /^[a-zA-Z0-9_\-:.]+$/);
  assert.equal(payload.sourcePage, '/');
  assert.equal((payload.metadata as Record<string, string>).utm_source, 'x');
});

test('nothing is sent from a non-browser context', () => {
  // The module is imported by this very test file outside a browser; a throw
  // here would take the page down with it.
  assert.doesNotThrow(() => trackEvent('play_store_click', { placement: 'hero' }));
  assert.doesNotThrow(() => trackPageView());
});
