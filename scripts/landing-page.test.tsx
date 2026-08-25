import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';

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
  assert.match(html, /https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.krahaso\.app/);
  assert.match(html, /iOS — së shpejti/);
});

test('explains the real app journey in the approved order', () => {
  const html = renderToStaticMarkup(<App />);
  const positions = ['Kërko', 'Ofertat', 'Skano', 'Shporta', 'Fito'].map((label) =>
    html.indexOf(label),
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

test('maps Visual Universe progress deterministically', async () => {
  const { getUniverseState } = await import('../src/motion/progress');

  assert.deepEqual(getUniverseState(0), {
    galleryScale: 1,
    mediaScale: 1.25,
    phoneOpacity: 0,
    phoneScale: 0.9,
    copyOpacity: 1,
  });
  assert.deepEqual(getUniverseState(0.75), {
    galleryScale: 0.5,
    mediaScale: 1,
    phoneOpacity: 1,
    phoneScale: 1,
    copyOpacity: 0,
  });
  assert.deepEqual(getUniverseState(2), getUniverseState(1));
  assert.deepEqual(getUniverseState(-1), getUniverseState(0));
});
