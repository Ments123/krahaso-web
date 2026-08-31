import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.krahaso.app';

test('renders without React DOM attribute warnings', () => {
  const errors: string[] = [];
  const originalError = console.error;
  console.error = (...args: unknown[]) => errors.push(args.map(String).join(' '));

  try {
    renderToStaticMarkup(<App />);
  } finally {
    console.error = originalError;
  }

  assert.deepEqual(errors, []);
});

test('routes every primary download action directly to Google Play', () => {
  const html = renderToStaticMarkup(<App />);
  const escapedUrl = PLAY_STORE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';

  assert.match(header, new RegExp(`href="${escapedUrl}"`));
  assert.ok(
    (html.match(new RegExp(escapedUrl, 'g')) ?? []).length >= 3,
    'header, hero and final download actions should link to Google Play',
  );
});

test('uses the approved barcode-first hero copy and free badge', () => {
  const html = renderToStaticMarkup(<App />);

  assert.match(
    html,
    /Skano ose kërko produktin dhe shiko çmimet që kemi nga marketet e Kosovës\./,
  );
  assert.match(html, />Falas<\/span>/);
  assert.doesNotMatch(html, /Falë pagesë/);
});

test('provides a keyboard skip link to the main content', () => {
  const html = renderToStaticMarkup(<App />);

  assert.match(html, /<a class="skip-link" href="#main-content">Kalo te përmbajtja<\/a>/);
  assert.match(html, /<main id="main-content" tabindex="-1">/);
});

test('renders one clear product story with stable download actions', () => {
  const html = renderToStaticMarkup(<App />);

  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /Krahaso para se të blesh\./);

  for (const id of ['fillimi', 'universi', 'veçorite', 'ofertat', 'shkarko']) {
    assert.match(html, new RegExp(`id="${id}"`), `missing #${id}`);
  }

  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  assert.deepEqual(duplicates, []);

  assert.match(html, /\/app\/krahaso-home\.webp/);
  assert.match(
    html,
    /<img[^>]+src="\/app\/krahaso-home\.webp"[^>]+fetchpriority="high"/,
  );
  assert.match(html, /https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.krahaso\.app/);
  assert.match(html, /iOS — së shpejti/);
});

test('maps the six supplied current screenshots to their matching product scenes', () => {
  const html = renderToStaticMarkup(<App />);
  const expectedScreens = [
    '/app/krahaso-home.webp',
    '/app/krahaso-home-feed.webp',
    '/app/krahaso-offers.webp',
    '/app/krahaso-scanner.webp',
    '/app/krahaso-basket.webp',
    '/app/krahaso-rewards.webp',
  ];

  for (const screen of expectedScreens) {
    assert.match(html, new RegExp(screen.replaceAll('.', '\\.')));
  }

  const featureScreen = (id: string) =>
    html.match(
      new RegExp(
        `<article[^>]*feature-chapter-${id}[^>]*>[\\s\\S]*?<\\/article>`,
      ),
    )?.[0] ?? '';

  assert.match(featureScreen('kerko'), /\/app\/krahaso-home\.webp/);
  assert.match(featureScreen('ofertat'), /\/app\/krahaso-offers\.webp/);
  assert.match(featureScreen('skano'), /\/app\/krahaso-scanner\.webp/);
  assert.match(featureScreen('shporta'), /\/app\/krahaso-basket\.webp/);
  assert.match(featureScreen('fito'), /\/app\/krahaso-rewards\.webp/);
  assert.doesNotMatch(
    html,
    /\/app\/krahaso-(?:home|home-feed|offers|scanner|basket|rewards)\.jpg/,
  );

  for (const product of ['coffee', 'oil', 'eggs', 'detergent']) {
    assert.match(html, new RegExp(`/products/${product}\\.webp`));
  }
});

test('explains the real app journey in the approved order', () => {
  const html = renderToStaticMarkup(<App />);
  const featureStory = html.match(/<section id="veçorite"[\s\S]*?<\/section>/)?.[0] ?? '';
  const positions = ['Kërko', 'Ofertat', 'Skano', 'Shporta', 'Fito'].map((label) =>
    featureStory.indexOf(label),
  );

  assert.ok(positions.every((position) => position >= 0), 'one or more feature chapters are missing');
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.match(html, /fito pikë kur pranohet/i);
  assert.doesNotMatch(html, /çdo kupon[^<]*pikë/i);
});

test('uses a genuine offers proof instead of illustrative price comparisons', () => {
  const html = renderToStaticMarkup(<App />);

  assert.match(html, /Ofertat e marketeve, në një vend\./);
  assert.doesNotMatch(html, /€22\.45|€23\.30|€24\.10|€25\.05|€2\.60/);
  assert.doesNotMatch(html, /price-deck-card/);
});

test('keeps verified utility destinations in the minimal footer', () => {
  const html = renderToStaticMarkup(<App />);

  assert.match(html, /https:\/\/api\.krahaso\.app\/privacy/);
  assert.match(html, /https:\/\/api\.krahaso\.app\/account-deletion/);
  assert.match(html, /mailto:privacy@krahaso\.app/);
  assert.match(html, /https:\/\/admin\.krahaso\.app/);
});

test('maps Visual Universe progress deterministically across viewports', async () => {
  const { getUniverseState } = await import('../src/motion/progress');

  assert.deepEqual(getUniverseState(0), {
    galleryScale: 1,
    mediaScale: 1.18,
    phoneOpacity: 0,
    phoneScale: 0.92,
    copyOpacity: 1,
  });
  assert.deepEqual(getUniverseState(0.68), {
    galleryScale: 0.52,
    mediaScale: 1,
    phoneOpacity: 1,
    phoneScale: 1,
    copyOpacity: 0,
  });
  assert.deepEqual(getUniverseState(0, 'mobile'), {
    galleryScale: 0.86,
    mediaScale: 1.08,
    phoneOpacity: 0,
    phoneScale: 0.92,
    copyOpacity: 1,
  });
  assert.deepEqual(getUniverseState(0.6, 'mobile'), {
    galleryScale: 0.52,
    mediaScale: 0.96,
    phoneOpacity: 1,
    phoneScale: 1,
    copyOpacity: 0,
  });
  assert.deepEqual(getUniverseState(2), getUniverseState(1));
  assert.deepEqual(getUniverseState(-1), getUniverseState(0));
});
