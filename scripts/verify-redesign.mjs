import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const readBytes = (path) => readFile(new URL(`../${path}`, import.meta.url));
const exists = (path) => stat(new URL(`../${path}`, import.meta.url)).then(() => true, () => false);

test('keeps the Vite production foundation and real brand assets', async () => {
  const screenshotPaths = [
    'public/app/krahaso-home.webp',
    'public/app/krahaso-home-feed.webp',
    'public/app/krahaso-offers.webp',
    'public/app/krahaso-scanner.webp',
    'public/app/krahaso-basket.webp',
    'public/app/krahaso-rewards.webp',
  ];
  const [pkgRaw, vite, main, screenshots, social, favicon] = await Promise.all([
    read('package.json'),
    read('vite.config.ts'),
    read('src/main.tsx'),
    Promise.all(screenshotPaths.map(readBytes)),
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
  for (const screenshot of screenshots) {
    assert.equal(screenshot.subarray(0, 4).toString('ascii'), 'RIFF');
  }
  assert.equal(social.subarray(0, 4).toString('ascii'), 'RIFF');
  assert.equal(favicon.subarray(1, 4).toString('ascii'), 'PNG');

  const imageCheck = spawnSync(
    'python3',
    ['scripts/optimise-web-images.py', '--check'],
    { cwd: new URL('..', import.meta.url), encoding: 'utf8' },
  );
  assert.equal(imageCheck.status, 0, imageCheck.stderr || imageCheck.stdout);
});

test('ships semantic metadata, app structured data and crawler infrastructure', async () => {
  const [html, robots, sitemap, vercelSource] = await Promise.all([
    read('index.html'),
    read('public/robots.txt'),
    read('public/sitemap.xml'),
    read('vercel.json'),
  ]);
  const vercel = JSON.parse(vercelSource);

  assert.match(html, /<html lang="sq">/);
  assert.match(html, /<title>Krahaso çmimet në Kosovë \| Krahaso<\/title>/);
  assert.match(
    html,
    /content="Skano ose kërko produktin dhe shiko çmimet që kemi nga marketet e Kosovës\."/,
  );
  assert.match(html, /rel="canonical" href="https:\/\/krahaso\.app\/"/);
  assert.match(
    html,
    /rel="preload"[^>]+href="\/app\/krahaso-home\.webp"[^>]+fetchpriority="high"/,
  );
  assert.match(html, /property="og:image" content="https:\/\/krahaso\.app\/krahaso-social\.webp"/);
  assert.match(html, /"@type":\s*"Organization"/);
  const structuredDataSource = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )?.[1];
  assert.ok(structuredDataSource, 'missing JSON-LD graph');
  const structuredData = JSON.parse(structuredDataSource);
  const application = structuredData['@graph'].find(
    (entry) => entry['@type'] === 'MobileApplication',
  );
  assert.deepEqual(application, {
    '@type': 'MobileApplication',
    '@id': 'https://krahaso.app/#android-app',
    name: 'Krahaso: Çmimet në Kosovë',
    operatingSystem: 'Android',
    applicationCategory: 'ShoppingApplication',
    installUrl: 'https://play.google.com/store/apps/details?id=com.krahaso.app',
    url: 'https://krahaso.app/',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  });
  assert.doesNotMatch(html, /fonts\.googleapis|onlinewebfonts|cloudfront/);
  assert.match(robots, /Sitemap:\s*https:\/\/krahaso\.app\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/krahaso\.app\/<\/loc>/);
  assert.equal(vercel.framework, 'vite');
  assert.ok(vercel.redirects.some(({ destination }) => destination === 'https://krahaso.app/$1'));

  const headersFor = (source) =>
    new Map(
      vercel.headers
        .find((rule) => rule.source === source)
        ?.headers.map(({ key, value }) => [key, value]) ?? [],
    );
  const globalHeaders = headersFor('/(.*)');
  assert.equal(globalHeaders.get('X-Content-Type-Options'), 'nosniff');
  assert.equal(globalHeaders.get('X-Frame-Options'), 'DENY');
  assert.equal(globalHeaders.get('Referrer-Policy'), 'strict-origin-when-cross-origin');
  assert.equal(
    globalHeaders.get('Permissions-Policy'),
    'camera=(), microphone=(), geolocation=()',
  );
  assert.equal(
    headersFor('/assets/(.*)').get('Cache-Control'),
    'public, max-age=31536000, immutable',
  );
  for (const source of ['/app/(.*)', '/products/(.*)', '/logos/(.*)']) {
    assert.equal(
      headersFor(source).get('Cache-Control'),
      'public, max-age=86400, stale-while-revalidate=604800',
    );
  }
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
  assert.match(universe, /getUniverseState\(progress, mode\)/);
  assert.match(universe, /gsap\.matchMedia\(\)/);
  assert.match(universe, /classList\.add\('motion-ready'\)/);
  assert.match(universe, /media\.add\('\(max-width: 899px\)'/);
  assert.doesNotMatch(universe, /window\.innerWidth < 900/);
  assert.match(features, /pin:\s*visual/);
  assert.match(features, /window\.innerWidth < 900/);
  assert.match(progress, /clamp/);
  assert.match(css, /\.visual-universe\.motion-ready\s*\{[^}]*height:\s*290svh/);
  assert.match(
    css,
    /@media \(max-width: 899px\)[\s\S]*?\.visual-universe\.motion-ready\s*\{[^}]*height:\s*230svh/,
  );
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(max-width: 899px\)/);
  assert.match(css, /min-height:\s*44px/);
});

test('uses genuine product proof and avoids fabricated comparison claims', async () => {
  const paths = [
    'src/App.tsx',
    'src/content/landing.ts',
    'src/components/HeroSection.tsx',
    'src/components/AppProof.tsx',
    'src/components/PhoneFrame.tsx',
    'src/components/FeatureStory.tsx',
    'src/components/OfferProof.tsx',
    'src/components/FinalDownload.tsx',
    'src/components/SiteFooter.tsx',
  ];
  const sources = (await Promise.all(paths.map(read))).join('\n');

  for (const screenshot of [
    'krahaso-home.webp',
    'krahaso-home-feed.webp',
    'krahaso-offers.webp',
    'krahaso-scanner.webp',
    'krahaso-basket.webp',
    'krahaso-rewards.webp',
  ]) {
    assert.match(sources, new RegExp(`/app/${screenshot.replaceAll('.', '\\.')}`));
  }
  assert.doesNotMatch(sources, /\/app\/krahaso-(?:home|home-feed|offers|scanner|basket|rewards)\.jpg/);
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
