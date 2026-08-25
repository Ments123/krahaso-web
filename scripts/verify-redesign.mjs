import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const readBytes = (path) => readFile(new URL(`../${path}`, import.meta.url));
const exists = (path) => stat(new URL(`../${path}`, import.meta.url)).then(() => true, () => false);

test('keeps the Vite production foundation and real brand assets', async () => {
  const [pkgRaw, vite, main, screenshot, social, favicon] = await Promise.all([
    read('package.json'),
    read('vite.config.ts'),
    read('src/main.tsx'),
    readBytes('public/app/krahaso-home.webp'),
    readBytes('public/krahaso-social.webp'),
    readBytes('public/favicon.png'),
  ]);
  const pkg = JSON.parse(pkgRaw);

  assert.equal(pkg.scripts.dev, 'vite');
  assert.equal(pkg.scripts.build, 'tsc -b && vite build');
  assert.ok(pkg.dependencies.react);
  assert.ok(pkg.dependencies.gsap);
  assert.equal(pkg.dependencies.lenis, undefined);
  assert.equal(pkg.dependencies.three, undefined);
  assert.match(vite, /react\(\)/);
  assert.match(main, /createRoot/);
  assert.equal(screenshot.subarray(0, 4).toString('ascii'), 'RIFF');
  assert.equal(social.subarray(0, 4).toString('ascii'), 'RIFF');
  assert.equal(favicon.subarray(1, 4).toString('ascii'), 'PNG');
});

test('ships semantic, local-first metadata and crawler infrastructure', async () => {
  const [html, robots, sitemap, vercelSource] = await Promise.all([
    read('index.html'),
    read('public/robots.txt'),
    read('public/sitemap.xml'),
    read('vercel.json'),
  ]);
  const vercel = JSON.parse(vercelSource);

  assert.match(html, /<html lang="sq">/);
  assert.match(html, /<title>Krahaso para se të blesh \| Krahaso<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/krahaso\.app\/"/);
  assert.match(html, /property="og:image" content="https:\/\/krahaso\.app\/krahaso-social\.webp"/);
  assert.match(html, /"@type":\s*"Organization"/);
  assert.doesNotMatch(html, /fonts\.googleapis|onlinewebfonts|cloudfront/);
  assert.match(robots, /Sitemap:\s*https:\/\/krahaso\.app\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/krahaso\.app\/<\/loc>/);
  assert.equal(vercel.framework, 'vite');
  assert.ok(vercel.redirects.some(({ destination }) => destination === 'https://krahaso.app/$1'));
});

test('uses explicit ScrollTrigger choreography with progressive fallbacks', async () => {
  const [universe, features, progress, css] = await Promise.all([
    read('src/components/VisualUniverse.tsx'),
    read('src/components/FeatureStory.tsx'),
    read('src/motion/progress.ts'),
    read('src/index.css'),
  ]);

  assert.match(universe, /ScrollTrigger\.create/);
  assert.match(universe, /pin:\s*stage/);
  assert.match(universe, /pinSpacing:\s*false/);
  assert.match(universe, /getUniverseState\(progress\)/);
  assert.match(features, /pin:\s*visual/);
  assert.match(features, /window\.innerWidth < 900/);
  assert.match(progress, /clamp/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(max-width: 899px\)/);
  assert.match(css, /min-height:\s*44px/);
});

test('uses genuine product proof and avoids fabricated comparison claims', async () => {
  const paths = [
    'src/App.tsx',
    'src/content/landing.ts',
    'src/components/HeroSection.tsx',
    'src/components/PhoneFrame.tsx',
    'src/components/FeatureStory.tsx',
    'src/components/OfferProof.tsx',
    'src/components/FinalDownload.tsx',
    'src/components/SiteFooter.tsx',
  ];
  const sources = (await Promise.all(paths.map(read))).join('\n');

  assert.match(sources, /\/app\/krahaso-home\.webp/);
  assert.match(sources, /fito pikë kur pranohet/i);
  assert.doesNotMatch(sources, /€22\.45|€23\.30|€24\.10|€25\.05|7,000|milion|rating|partner zyrtar/i);
  assert.doesNotMatch(sources, /<video|cloudfront/i);
  assert.equal(await exists('src/motion/gsap.ts'), true);
});

test('keeps acquisition analytics, destinations, and utility links intact', async () => {
  const [cta, analytics, footer] = await Promise.all([
    read('src/components/AppAcquisitionCta.tsx'),
    read('src/lib/analytics.ts'),
    read('src/components/SiteFooter.tsx'),
  ]);

  assert.match(cta, /https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.krahaso\.app/);
  assert.match(cta, /preserveUtm/);
  assert.match(cta, /trackEvent/);
  assert.match(analytics, /dataLayer/);
  assert.match(analytics, /utm_/);
  assert.match(footer, /https:\/\/api\.krahaso\.app\/privacy/);
  assert.match(footer, /https:\/\/api\.krahaso\.app\/account-deletion/);
  assert.match(footer, /mailto:privacy@krahaso\.app/);
  assert.match(footer, /https:\/\/admin\.krahaso\.app/);
});
