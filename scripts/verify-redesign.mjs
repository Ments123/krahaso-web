import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const readBytes = (path) => readFile(new URL(`../${path}`, import.meta.url));
const exists = async (path) => stat(new URL(`../${path}`, import.meta.url)).then(() => true, () => false);

const sourcePaths = [
  'src/App.tsx',
  'src/components/SiteHeader.tsx',
  'src/components/AppAcquisitionCta.tsx',
  'src/components/MobileInstallBar.tsx',
  'src/components/AppProof.tsx',
  'src/components/ProductJourney.tsx',
  'src/components/FeatureGrid.tsx',
  'src/components/DownloadSection.tsx',
  'src/components/RewardsSection.tsx',
  'src/components/PartnerTeaser.tsx',
  'src/components/SiteFooter.tsx',
];

test('the production foundation and approved Krahaso identity remain intact', async () => {
  const [pkgRaw, html, css, vite, main, nodeConfig, screenshot, socialImage, favicon] = await Promise.all([
    read('package.json'),
    read('index.html'),
    read('src/index.css'),
    read('vite.config.ts'),
    read('src/main.tsx'),
    read('tsconfig.node.json'),
    readBytes('public/app/krahaso-home.webp'),
    readBytes('public/krahaso-social.webp'),
    readBytes('public/favicon.png'),
  ]);
  const pkg = JSON.parse(pkgRaw);

  assert.equal(pkg.scripts.dev, 'vite');
  assert.equal(pkg.scripts.build, 'tsc -b && vite build');
  assert.equal(pkg.scripts['verify:design'], 'node --test scripts/verify-redesign.mjs');
  assert.ok(pkg.devDependencies.vite);
  assert.ok(pkg.devDependencies['@vitejs/plugin-react']);
  assert.ok(pkg.dependencies.react);
  assert.ok(pkg.dependencies['framer-motion']);
  assert.equal(pkg.dependencies.next, undefined);

  assert.match(html, /<html lang="sq">/);
  assert.match(html, /id="root"/);
  assert.match(html, /rel="canonical" href="https:\/\/krahaso\.app\/"/);
  assert.match(html, /property="og:image" content="https:\/\/krahaso\.app\/krahaso-social\.webp"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /href="\/favicon\.png"/);
  assert.match(css, /--krahaso-green:\s*#08a64a/i);
  assert.match(css, /--krahaso-deep:\s*#063d24/i);
  assert.match(css, /--krahaso-paper:\s*#f5f7f3/i);
  assert.match(css, /Neue Haas Grotesk Display Pro 55 Roman/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /\.site-footer nav a\s*\{[^}]*min-width:\s*44px/);
  assert.match(vite, /react\(\)/);
  assert.match(main, /createRoot/);
  assert.match(main, /<App/);
  assert.doesNotMatch(nodeConfig, /allowImportingTsExtensions/);

  assert.equal(screenshot.subarray(0, 4).toString('ascii'), 'RIFF');
  assert.equal(screenshot.subarray(8, 12).toString('ascii'), 'WEBP');
  assert.equal(socialImage.subarray(0, 4).toString('ascii'), 'RIFF');
  assert.equal(favicon.subarray(1, 4).toString('ascii'), 'PNG');
});

test('launch state and acquisition destinations are centralised and honest', async () => {
  const [launch, platform, analytics, cta, env] = await Promise.all([
    read('src/config/launch.ts'),
    read('src/lib/platform.ts'),
    read('src/lib/analytics.ts'),
    read('src/components/AppAcquisitionCta.tsx'),
    read('.env.example'),
  ]);
  const infrastructure = [launch, platform, analytics, cta].join('\n');

  assert.match(launch, /export type LaunchMode = 'prelaunch' \| 'preorder' \| 'live'/);
  assert.match(launch, /VITE_LAUNCH_MODE/);
  assert.match(launch, /prelaunch/);
  assert.match(launch, /VITE_APP_STORE_URL/);
  assert.match(launch, /VITE_PLAY_STORE_URL/);
  assert.match(launch, /VITE_APP_STORE_PREORDER_URL/);
  assert.match(launch, /VITE_PLAY_PREREG_URL/);
  assert.match(launch, /VITE_WAITLIST_URL/);
  assert.match(launch, /VITE_REWARDS_ENABLED/);
  assert.match(launch, /https?:/);
  assert.match(platform, /apple/);
  assert.match(platform, /android/);
  assert.match(platform, /unknown/);

  assert.match(infrastructure, /Më njofto kur të lansohet/);
  assert.match(infrastructure, /Porosite në App Store/);
  assert.match(infrastructure, /Regjistrohu në Google Play/);
  assert.match(infrastructure, /App Store/);
  assert.match(infrastructure, /Google Play/);
  assert.match(cta, /rel="noopener noreferrer"/);
  assert.doesNotMatch(cta, /href=["']#["']/);
  assert.doesNotMatch(infrastructure, /apps\.apple\.com\/fake|play\.google\.com\/fake|example\.com/i);

  assert.match(analytics, /dataLayer/);
  assert.match(analytics, /hero_store_click/);
  assert.match(analytics, /sticky_store_click/);
  assert.match(analytics, /waitlist_click/);
  assert.match(analytics, /partner_click/);
  assert.match(analytics, /admin_click/);
  assert.match(analytics, /utm_/);

  for (const key of [
    'VITE_LAUNCH_MODE',
    'VITE_APP_STORE_URL',
    'VITE_PLAY_STORE_URL',
    'VITE_APP_STORE_PREORDER_URL',
    'VITE_PLAY_PREREG_URL',
    'VITE_WAITLIST_URL',
    'VITE_REWARDS_ENABLED',
  ]) {
    assert.match(env, new RegExp(`^${key}=`, 'm'));
  }
});

test('the homepage is ordered as an app-acquisition journey', async () => {
  const sources = await Promise.all(sourcePaths.map(read));
  const [app, header, cta, sticky, proof, journey, features, download, rewards, partner, footer] = sources;
  const pageSource = sources.join('\n');

  assert.match(app, /Kalo te[\s\S]*më e lira/);
  assert.match(app, /Skano barkodin\. Krahaso çmimet në supermarketet e Kosovës\. Shih ku kushton më pak\./);
  assert.match(app, /<AppProof[\s\S]*<ProductJourney[\s\S]*<FeatureGrid[\s\S]*<DownloadSection/);
  assert.match(app, /rewardsEnabled[\s\S]*<RewardsSection/);
  assert.match(app, /<PartnerTeaser[\s\S]*<SiteFooter/);
  assert.equal((pageSource.match(/<h1\b/g) ?? []).length, 1);

  assert.match(header, /Si funksionon/);
  assert.match(header, /Aplikacioni/);
  assert.match(header, /Shkarko/);
  assert.match(header, /aria-expanded/);
  assert.match(header, /Escape/);
  assert.equal((header.match(/Shkarko/g) ?? []).length, 1);
  assert.doesNotMatch(header, />\s*Admin\s*</);
  assert.doesNotMatch(header, />\s*Partnerët\s*</);
  assert.doesNotMatch(header, />\s*Fito\s*</);

  assert.match(cta, /AppAcquisitionCta/);
  assert.match(sticky, /sessionStorage/);
  assert.match(sticky, /IntersectionObserver/);
  assert.match(sticky, /AppAcquisitionCta/);
  assert.match(sticky, /Mbyll/);
  assert.match(sticky, /!heroPassed/);
  assert.match(sticky, /has-mobile-install-bar/);

  assert.match(proof, /\/app\/krahaso-home\.webp/);
  assert.match(proof, /Pamje reale e ballinës së aplikacionit Krahaso/);
  assert.match(proof, /loading="lazy"/);
  assert.match(proof, /decoding="async"/);

  assert.match(journey, /id="si-funksionon"/);
  assert.match(journey, /01[\s\S]*Skano[\s\S]*02[\s\S]*Krahaso[\s\S]*03[\s\S]*Zgjidh/);
  assert.match(journey, /Drejto kamerën te barkodi i produktit/);
  assert.match(journey, /supermarketet ku kemi çmime të disponueshme/);
  assert.match(journey, /Shih diferencën dhe vendos ku ia vlen të blesh/);
  assert.doesNotMatch(journey, /fatur|pikë|shpërblim/i);

  assert.match(features, /Kërko produktin/);
  assert.match(features, /Skano barkodin/);
  assert.match(features, /Krahaso çmimet/);
  assert.match(features, /Gjej ofertën më të mirë/);
  assert.doesNotMatch(features, /fatur|pikë|shpërblim/i);

  assert.match(download, /id="shkarko"/);
  assert.match(download, /Skano\. Krahaso\. Kalo te më e lira\./);
  assert.match(download, /AppAcquisitionCta/);
  assert.match(rewards, /VITE_REWARDS_ENABLED|rewardsEnabled/);
  assert.doesNotMatch(rewards, /1,240|2,000|72%/);
  assert.match(partner, /Je supermarket apo biznes/);
  assert.match(partner, /Bëhu pjesë e Krahaso/);
  assert.match(footer, /https:\/\/admin\.krahaso\.app/);
  assert.match(footer, /Për partnerët/);

  assert.doesNotMatch(pageSource, /7,000|milion|rating|shkarkime|partner zyrtar/i);
  assert.doesNotMatch(pageSource, /href=["']#["']/);
});

test('main section IDs are unique and navigation targets exist', async () => {
  const sources = await Promise.all(sourcePaths.map((path) => read(path).catch(() => '')));
  const pageSource = sources.join('\n');
  const ids = [...pageSource.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

  assert.deepEqual(duplicates, []);
  for (const id of ['fillimi', 'aplikacioni', 'si-funksionon', 'krahaso', 'shkarko', 'partneret']) {
    assert.ok(ids.includes(id), `missing #${id}`);
  }
  assert.doesNotMatch(pageSource, /id="manifesti"/);
});

test('the hero uses one efficient non-blocking video without frame caching', async () => {
  const [hero, app, css, poster] = await Promise.all([
    read('src/HeroVideoBg.tsx'),
    read('src/App.tsx'),
    read('src/index.css'),
    readBytes('public/hero-bridge.webp'),
  ]);
  const mediaSource = [hero, app].join('\n');

  assert.match(app, /<HeroVideoBg/);
  assert.match(hero, /<video/);
  assert.match(hero, /autoPlay/);
  assert.match(hero, /muted/);
  assert.match(hero, /loop/);
  assert.match(hero, /playsInline/);
  assert.match(hero, /preload="metadata"/);
  assert.match(hero, /matchMedia\(['"]\(min-width: 640px\)['"]\)/);
  assert.match(hero, /\.play\(\)/);
  assert.match(hero, /poster="\/hero-bridge\.webp"/);
  assert.equal(poster.subarray(0, 4).toString('ascii'), 'RIFF');
  assert.equal(poster.subarray(8, 12).toString('ascii'), 'WEBP');
  assert.match(css, /\.hero-video-wrap\s*\{[^}]*background-image:\s*url\(['"]?\/hero-bridge\.webp/);
  assert.doesNotMatch(css, /\.hero-video\s*\{[^}]*display:\s*none/);
  assert.doesNotMatch(mediaSource, /canvas|getContext|requestVideoFrameCallback|requestAnimationFrame|framesRef/i);
  assert.equal((mediaSource.match(/<video/g) ?? []).length, 1);
  assert.equal(await exists('src/BoomerangVideoBg.tsx'), false);
  assert.match(css, /hero-wash/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) and \(max-width: 639px\)/);
  assert.match(app, /className="hero-description/);
  assert.match(css, /@media \(min-width: 768px\)[\s\S]*?\.hero-description\s*\{[^}]*position:\s*absolute/);
  assert.match(css, /\.hero-description\s*\{[^}]*color:\s*#f7f2e7/);
  assert.match(app, /useReducedMotion/);
  assert.match(app, /reducedMotionProps/);
});

test('SEO metadata and crawler files target truthful Kosovo price comparison', async () => {
  const [html, robots, sitemap, growth, vercelSource] = await Promise.all([
    read('index.html'),
    read('public/robots.txt'),
    read('public/sitemap.xml'),
    read('docs/growth/krahaso-price-index.md'),
    read('vercel.json'),
  ]);
  const vercel = JSON.parse(vercelSource);

  assert.match(html, /<title>Krahaso Çmimet në Supermarkete në Kosovë \| Krahaso<\/title>/);
  assert.match(html, /Skano barkodin dhe krahaso çmimet e produkteve në supermarketet e Kosovës\. Shih ku kushton më pak dhe kurse me Krahaso\./);
  assert.match(html, /Krahaso — Kalo te më e lira/);
  assert.match(html, /Skano barkodin dhe shiko ku kushton më pak në supermarketet e Kosovës\./);
  assert.match(html, /"@type":\s*"Organization"/);
  assert.match(html, /"@type":\s*"WebSite"/);
  assert.doesNotMatch(html, /rating|review|download|shpërblim|pikë/i);

  assert.match(robots, /User-agent:\s*\*/);
  assert.match(robots, /Allow:\s*\//);
  assert.match(robots, /Sitemap:\s*https:\/\/krahaso\.app\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/krahaso\.app\/<\/loc>/);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 1);
  assert.deepEqual(vercel.redirects, [
    {
      source: '/(.*)',
      has: [{ type: 'host', value: 'www.krahaso.app' }],
      destination: 'https://krahaso.app/$1',
      permanent: true,
    },
  ]);
  assert.ok(
    vercel.headers.some(
      ({ source, headers }) =>
        source === '/(.*)' &&
        headers.some(
          ({ key, value }) =>
            key === 'X-Robots-Tag' && value === 'index, follow',
        ),
    ),
  );

  assert.match(growth, /\/cmimet\//);
  assert.match(growth, /\/produkt\/\[slug\]\//);
  assert.match(growth, /\/marketet\/\[slug\]\//);
  assert.match(growth, /\/kategori\/\[slug\]\//);
  assert.match(growth, /exact GTIN|GTIN i saktë/i);
  assert.match(growth, /at least two|të paktën dy/i);
  assert.match(growth, /Nga marketi/);
  assert.match(growth, /Nga oferta/);
  assert.match(growth, /Verifikuar nga Krahaso/);
  assert.match(growth, /Raportuar nga përdoruesi/);
});

test('mobile acquisition, reduced motion, and genuine assets stay protected', async () => {
  const [css, app, proof, features] = await Promise.all([
    read('src/index.css'),
    read('src/App.tsx'),
    read('src/components/AppProof.tsx'),
    read('src/components/FeatureGrid.tsx'),
  ]);
  const source = [app, proof, features].join('\n');

  assert.match(css, /100svh/);
  assert.match(css, /scroll-snap-type:\s*x mandatory/);
  assert.match(css, /scroll-snap-align:\s*start/);
  assert.match(css, /@media \(max-width: 639px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /env\(safe-area-inset-bottom/);
  assert.match(css, /\.has-mobile-install-bar \.site-footer/);
  assert.match(css, /\.site-nav > a[\s\S]*min-height:\s*44px/);
  assert.match(css, /\.site-footer nav a[\s\S]*min-height:\s*44px/);
  assert.match(source, /\/app\/krahaso-home\.webp/);
  assert.match(source, /#08a64a|#08A64A/);
  assert.doesNotMatch(source, /marquee|Backed by|subscriber|ChatGPT|Perplexity|Google AI/i);
});

test('the rejected Next runtime stays removed and operations are documented', async () => {
  const [readme, vercelRaw] = await Promise.all([read('README.md'), read('vercel.json')]);
  const vercel = JSON.parse(vercelRaw);

  assert.match(readme, /VITE_LAUNCH_MODE/);
  assert.match(readme, /VITE_WAITLIST_URL/);
  assert.match(readme, /dataLayer/);
  assert.match(readme, /npm run verify:design/);
  assert.match(readme, /npm run build/);
  assert.match(readme, /HeroVideoBg/);
  assert.doesNotMatch(readme, /BoomerangVideoBg/);
  assert.equal(vercel.framework, 'vite');
  assert.equal(vercel.buildCommand, 'npm run build');
  assert.equal(vercel.outputDirectory, 'dist');
  await assert.rejects(read('app/page.tsx'), { code: 'ENOENT' });
  await assert.rejects(read('next.config.mjs'), { code: 'ENOENT' });
});
