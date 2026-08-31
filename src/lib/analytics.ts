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

export function buildCampaignReferrer(current: URL) {
  const referrer = new URLSearchParams();

  UTM_KEYS.forEach((key) => {
    const value = current.searchParams.get(key);
    if (value) referrer.set(key, value);
  });

  return referrer.toString();
}

export function trackEvent(
  name: AnalyticsEventName,
  payload: Record<string, string> = {},
) {
  if (typeof window === 'undefined' || !Array.isArray(window.dataLayer)) return;
  window.dataLayer.push({ event: name, ...payload });
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
