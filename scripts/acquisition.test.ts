import assert from 'node:assert/strict';
import test from 'node:test';
import { APP_STORE_URL, PLAY_STORE_URL } from '../src/components/AppAcquisitionCta';
import * as analytics from '../src/lib/analytics';

function withLocation<T>(href: string, run: () => T) {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { location: { href } },
  });

  try {
    return run();
  } finally {
    if (previous) Object.defineProperty(globalThis, 'window', previous);
    else Reflect.deleteProperty(globalThis, 'window');
  }
}

test('builds a deterministic Google Play campaign referrer', () => {
  const candidate: unknown = Reflect.get(analytics, 'buildCampaignReferrer');
  assert.equal(typeof candidate, 'function');
  const buildCampaignReferrer = candidate as (current: URL) => string;

  assert.equal(
    buildCampaignReferrer(
      new URL('https://krahaso.app/?utm_source=facebook&utm_campaign=launch&utm_term='),
    ),
    'utm_source=facebook&utm_campaign=launch',
  );
});

test('encodes inbound campaign values in the Google Play referrer', () => {
  withLocation(
    'https://krahaso.app/?utm_source=facebook&utm_campaign=launch&unrelated=ignored',
    () => {
      const result = new URL(analytics.preserveUtm(PLAY_STORE_URL));

      assert.equal(result.searchParams.get('utm_source'), null);
      assert.equal(
        result.searchParams.get('referrer'),
        'utm_source=facebook&utm_campaign=launch',
      );
    },
  );
});

test('preserves campaign parameters on non-Play destinations', () => {
  withLocation('https://krahaso.app/?utm_medium=organic&utm_content=footer', () => {
    const result = new URL(analytics.preserveUtm(`${APP_STORE_URL}?utm_medium=email`));

    assert.equal(result.searchParams.get('utm_medium'), 'email');
    assert.equal(result.searchParams.get('utm_content'), 'footer');
    assert.equal(result.searchParams.get('referrer'), null);
  });
});
