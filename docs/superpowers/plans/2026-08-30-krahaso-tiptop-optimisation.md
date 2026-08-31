# Krahaso Tiptop Optimisation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a shorter, faster and more resilient Krahaso acquisition page with genuine scroll-linked motion on mobile and desktop, then publish the verified release.

**Architecture:** Keep the current Vite/React section architecture and visual system. Reuse one acquisition link, introduce progressive motion states around the existing GSAP chunk, use pure progress functions for deterministic mobile/desktop animation, and modernise existing raster delivery without inventing assets. Static semantic content remains the default; motion enhancement is applied only after successful setup.

**Tech Stack:** Vite 5.4, React 18.3, TypeScript 5.5, GSAP 3.15 with ScrollTrigger, Tailwind/PostCSS, Node test runner with `tsx`, Pillow 12 for deterministic WebP generation, Chromium/Playwright for QA

**Spec:** `docs/superpowers/specs/2026-08-30-krahaso-tiptop-optimisation-design.md`

## Global Constraints

- Preserve `Krahaso para se të blesh.` as the only H1.
- Google Play remains the only live store destination: `https://play.google.com/store/apps/details?id=com.krahaso.app`.
- iOS remains non-interactive status text: `iOS — së shpejti`.
- Hero supporting copy is exactly: `Skano ose kërko produktin dhe shiko çmimet që kemi nga marketet e Kosovës.`
- Hero supporting badge is exactly: `Falas`.
- Desktop Visual Universe runway is exactly `290svh` when motion setup succeeds.
- Mobile Visual Universe runway is exactly `230svh` with a CSS-sticky `100svh` stage when motion setup succeeds.
- Reduced motion creates no scroll-linked choreography, continuous drift or motion-only height.
- Mobile feature chapters remain in normal vertical flow and are never pinned.
- Combined Visual Universe and Feature Story scroll distance must fall by at least 35% at 1363x936.
- Preserve genuine screenshots, verified legal/support links, canonical URL, crawler files and factual coverage caveats.
- Add no fabricated prices, ratings, reviews, downloads, savings, testimonials, coverage or partnerships.
- Main JavaScript must remain at or below 55kB gzip and the GSAP chunk at or below 48kB gzip.
- Work only on `codex/krahaso-tiptop`; publish through a protected pull request after verification.

---

## File Responsibility Map

- `src/components/AppAcquisitionCta.tsx`: the only Google Play link UI and click instrumentation.
- `src/components/SiteHeader.tsx`: fixed navigation and compact direct store action.
- `src/components/HeroSection.tsx`: hero copy, phone proof and supporting labels.
- `src/components/VisualUniverse.tsx`: progressive desktop/mobile Visual Universe setup and cleanup.
- `src/components/FeatureStory.tsx`: desktop chapter treatment and mobile scroll-linked reveals.
- `src/components/PhoneFrame.tsx`: stable intrinsic image delivery and hero fetch priority.
- `src/content/landing.ts`: genuine screenshot/product paths and factual chapter copy.
- `src/motion/progress.ts`: pure deterministic mobile/desktop Visual Universe state mapping.
- `src/lib/analytics.ts`: UTM preservation and Google Play install-referrer encoding.
- `src/App.tsx`: skip link and semantic main target.
- `src/index.css`: visual system, responsive geometry, fallback layout, focus and motion styles.
- `index.html`: preload, metadata and truthful MobileApplication JSON-LD.
- `vercel.json`: caching, crawler and non-invasive security headers.
- `scripts/optimise-web-images.py`: reproducible WebP generation from approved source assets.
- `scripts/landing-page.test.tsx`: semantic, copy, acquisition, image and structure contracts.
- `scripts/acquisition.test.ts`: deterministic attribution URL tests.
- `scripts/verify-redesign.mjs`: source/config/performance guardrails.
- `docs/qa/tiptop/`: fresh rendered evidence and machine-readable browser results.

---

### Task 1: Direct Acquisition, Correct Copy And Keyboard Entry

**Files:**
- Modify: `scripts/landing-page.test.tsx`
- Modify: `src/components/AppAcquisitionCta.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `AppAcquisitionCta({ placement, inverse?, compact?, onNavigate? })` and `PLAY_STORE_URL`.
- Produces: one compact header CTA with `placement="nav"`, exact hero copy, `.skip-link`, and `main#main-content`.

- [ ] **Step 1: Extend the render contract and verify it fails**

```tsx
test('takes every download action directly to Google Play and fixes hero copy', () => {
  const html = renderToStaticMarkup(<App />);
  const storeUrl = 'https://play.google.com/store/apps/details?id=com.krahaso.app';

  assert.match(html, /Skano ose kërko produktin dhe shiko çmimet që kemi nga marketet e Kosovës\./);
  assert.match(html, />Falas</);
  assert.doesNotMatch(html, /Falë pagesë/);
  assert.match(html, /class="skip-link" href="#main-content"/);
  assert.match(html, /<main id="main-content" tabindex="-1">/);
  assert.doesNotMatch(html, /class="nav-download" href="#shkarko"/);
  assert.ok((html.match(new RegExp(storeUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) ?? []).length >= 3);
});
```

Run: `node --import tsx --test scripts/landing-page.test.tsx`

Expected: FAIL on hero copy, skip link, main target and header destination.

- [ ] **Step 2: Reuse the acquisition component in the fixed header**

```tsx
export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-nav section-shell" aria-label="Navigimi kryesor">
        <a href="#fillimi" className="site-brand" aria-label="Krahaso, në fillim">
          <BrandMark />
          <span>Krahaso</span>
        </a>
        <div className="site-nav-links">
          <a href="#veçorite">Si funksionon</a>
          <a href="#ofertat">Marketet</a>
          <AppAcquisitionCta placement="nav" compact />
        </div>
      </nav>
    </header>
  );
}
```

Add `.acquisition-links-compact .acquisition-link { min-height: 44px; padding-inline: 16px; }` and retain the current deep-green header-button appearance.

- [ ] **Step 3: Apply the approved hero copy and semantic skip target**

```tsx
<a className="skip-link" href="#main-content">Kalo te përmbajtja</a>
<SiteHeader />
<main id="main-content" tabIndex={-1}>...</main>
```

```tsx
<p className="hero-lede">
  Skano ose kërko produktin dhe shiko çmimet që kemi nga marketet e Kosovës.
</p>
```

Replace the supporting card text with `<span>Falas</span>`.

- [ ] **Step 4: Add explicit focus treatment and run the targeted test**

```css
.skip-link { position: fixed; z-index: 200; top: 10px; left: 10px; transform: translateY(-140%); }
.skip-link:focus { transform: translateY(0); }
:where(a, button):focus-visible { outline: 3px solid #14c963; outline-offset: 3px; }
```

Run: `node --import tsx --test scripts/landing-page.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the independently working acquisition slice**

```bash
git add scripts/landing-page.test.tsx src/components/AppAcquisitionCta.tsx src/components/SiteHeader.tsx src/components/HeroSection.tsx src/App.tsx src/index.css
git commit -m "feat: tighten Krahaso acquisition entry"
```

---

### Task 2: Google Play Attribution, SEO And Platform Headers

**Files:**
- Create: `scripts/acquisition.test.ts`
- Modify: `package.json`
- Modify: `src/lib/analytics.ts`
- Modify: `index.html`
- Modify: `vercel.json`
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: `preserveUtm(href: string): string`.
- Produces: `buildCampaignReferrer(current: URL): string`, Google Play `referrer` encoding, MobileApplication JSON-LD and explicit deployment headers.

- [ ] **Step 1: Write deterministic URL and metadata tests**

```ts
test('encodes inbound campaign values in the Google Play referrer', () => {
  const originalWindow = globalThis.window;
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { location: { href: 'https://krahaso.app/?utm_source=facebook&utm_campaign=launch' } },
  });

  const result = new URL(preserveUtm(PLAY_STORE_URL));
  assert.equal(result.searchParams.get('utm_source'), null);
  assert.equal(result.searchParams.get('referrer'), 'utm_source=facebook&utm_campaign=launch');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: originalWindow });
});
```

Extend `scripts/verify-redesign.mjs` to assert:

```js
assert.match(indexHtml, /"@type": "MobileApplication"/);
assert.match(indexHtml, /"operatingSystem": "Android"/);
assert.match(indexHtml, /"installUrl": "https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.krahaso\.app"/);
assert.match(vercel, /X-Content-Type-Options/);
assert.match(vercel, /strict-origin-when-cross-origin/);
assert.match(vercel, /max-age=31536000, immutable/);
```

Run: `node --import tsx --test scripts/acquisition.test.ts && node --test scripts/verify-redesign.mjs`

Expected: FAIL because referrer encoding, MobileApplication JSON-LD and headers are absent.

- [ ] **Step 2: Encode campaigns without changing non-Play destinations**

```ts
export function buildCampaignReferrer(current: URL) {
  const referrer = new URLSearchParams();
  UTM_KEYS.forEach((key) => {
    const value = current.searchParams.get(key);
    if (value) referrer.set(key, value);
  });
  return referrer.toString();
}

export function preserveUtm(href: string) {
  if (typeof window === 'undefined') return href;
  try {
    const destination = new URL(href);
    const current = new URL(window.location.href);
    const campaign = buildCampaignReferrer(current);
    const isPlayListing = destination.hostname === 'play.google.com' && destination.pathname === '/store/apps/details';
    if (isPlayListing && campaign) destination.searchParams.set('referrer', campaign);
    else UTM_KEYS.forEach((key) => {
      const value = current.searchParams.get(key);
      if (value && !destination.searchParams.has(key)) destination.searchParams.set(key, value);
    });
    return destination.toString();
  } catch {
    return href;
  }
}
```

Add `scripts/acquisition.test.ts` to the `npm test` command.

- [ ] **Step 3: Add factual metadata and structured data**

Set the title to `Krahaso çmimet në Kosovë | Krahaso` and use the approved barcode-first hero sentence as the meta description. Add this node to the existing JSON-LD graph:

```json
{
  "@type": "MobileApplication",
  "@id": "https://krahaso.app/#android-app",
  "name": "Krahaso: Çmimet në Kosovë",
  "operatingSystem": "Android",
  "applicationCategory": "ShoppingApplication",
  "installUrl": "https://play.google.com/store/apps/details?id=com.krahaso.app",
  "url": "https://krahaso.app/",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
}
```

- [ ] **Step 4: Add bounded cache and security headers**

Add immutable caching only to `/assets/(.*)`, one-day caching with stale revalidation to `/app/(.*)`, `/products/(.*)` and `/logos/(.*)`, and add these global headers without introducing CSP:

```json
{ "key": "X-Content-Type-Options", "value": "nosniff" },
{ "key": "X-Frame-Options", "value": "DENY" },
{ "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
{ "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
```

- [ ] **Step 5: Run the complete contract and commit**

Run: `npm test`

Expected: all tests PASS.

```bash
git add scripts/acquisition.test.ts scripts/verify-redesign.mjs package.json src/lib/analytics.ts index.html vercel.json
git commit -m "feat: improve acquisition attribution and metadata"
```

---

### Task 3: Reproducible Modern Image Delivery

**Files:**
- Create: `scripts/optimise-web-images.py`
- Create: `public/app/krahaso-home.webp`
- Create: `public/app/krahaso-home-feed.webp`
- Create: `public/app/krahaso-offers.webp`
- Create: `public/app/krahaso-scanner.webp`
- Create: `public/app/krahaso-basket.webp`
- Create: `public/app/krahaso-rewards.webp`
- Create: `public/products/coffee.webp`
- Create: `public/products/oil.webp`
- Create: `public/products/eggs.webp`
- Create: `public/products/detergent.webp`
- Modify: `src/content/landing.ts`
- Modify: `src/components/PhoneFrame.tsx`
- Modify: `index.html`
- Modify: `scripts/landing-page.test.tsx`
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: approved JPEG/PNG source assets already in `public/app` and `public/products`.
- Produces: WebP files with unchanged dimensions, `PhoneFrame({ priority })` using `fetchPriority`, and one hero preload.

- [ ] **Step 1: Make the image contract fail on current JPEG/PNG paths**

```tsx
for (const screen of ['home', 'home-feed', 'offers', 'scanner', 'basket', 'rewards']) {
  assert.match(html, new RegExp(`/app/krahaso-${screen}\\.webp`));
}
assert.doesNotMatch(html, /\/app\/krahaso-(?:home|home-feed|offers|scanner|basket|rewards)\.jpg/);
assert.match(html, /fetchpriority="high"/);
```

Add this preload assertion to `scripts/verify-redesign.mjs`:

```js
assert.match(indexHtml, /rel="preload"[^>]+href="\/app\/krahaso-home\.webp"[^>]+fetchpriority="high"/);
```

Extend the conversion script with a `--check` mode that exits non-zero unless every target exists, matches the source dimensions and is smaller than its source. Invoke it from the test command with `python3 scripts/optimise-web-images.py --check`.

Run: `npm test`

Expected: FAIL on WebP paths, preload and fetch priority.

- [ ] **Step 2: Add the deterministic Pillow conversion script**

```py
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
TARGETS = [
    ("public/app/krahaso-home.jpg", "public/app/krahaso-home.webp", 86),
    ("public/app/krahaso-home-feed.jpg", "public/app/krahaso-home-feed.webp", 86),
    ("public/app/krahaso-offers.jpg", "public/app/krahaso-offers.webp", 86),
    ("public/app/krahaso-scanner.jpg", "public/app/krahaso-scanner.webp", 86),
    ("public/app/krahaso-basket.jpg", "public/app/krahaso-basket.webp", 86),
    ("public/app/krahaso-rewards.jpg", "public/app/krahaso-rewards.webp", 86),
    ("public/products/coffee.png", "public/products/coffee.webp", 88),
    ("public/products/oil.png", "public/products/oil.webp", 88),
    ("public/products/eggs.png", "public/products/eggs.webp", 88),
    ("public/products/detergent.png", "public/products/detergent.webp", 88),
]

for source_name, target_name, quality in TARGETS:
    source = ROOT / source_name
    target = ROOT / target_name
    with Image.open(source) as image:
        image.save(target, "WEBP", quality=quality, method=6, exact=True)
        with Image.open(target) as converted:
            if converted.size != image.size:
                raise SystemExit(f"dimension mismatch: {target_name}")

if "--check" in sys.argv:
    for source_name, target_name, _ in TARGETS:
        source = ROOT / source_name
        target = ROOT / target_name
        with Image.open(source) as original, Image.open(target) as converted:
            if converted.size != original.size:
                raise SystemExit(f"dimension mismatch: {target_name}")
        if target.stat().st_size >= source.stat().st_size:
            raise SystemExit(f"output not smaller: {target_name}")
```

Run: `python3 scripts/optimise-web-images.py`.

- [ ] **Step 3: Switch content paths and prioritise only the hero**

Use `.webp` in `appScreens` and `universeTiles`. In `PhoneFrame`, add `fetchPriority={priority ? 'high' : 'auto'}` and retain stable `width="716" height="1536"`, eager loading only for the hero.

Add to `index.html`:

```html
<link rel="preload" as="image" href="/app/krahaso-home.webp" type="image/webp" fetchpriority="high" />
```

- [ ] **Step 4: Verify source/output dimensions and visual fidelity**

Run the script twice and confirm `git status --short` is unchanged after the second run. Use Pillow to print source/output byte totals and require at least a 35% reduction. Open all ten generated assets and reject any with lost transparency, smeared product labels or unreadable app text.

- [ ] **Step 5: Run tests/build and commit**

Run: `npm test && npm run build`

Expected: all tests PASS and build succeeds.

```bash
git add scripts/optimise-web-images.py public/app/*.webp public/products/*.webp src/content/landing.ts src/components/PhoneFrame.tsx index.html scripts/landing-page.test.tsx scripts/verify-redesign.mjs
git commit -m "perf: modernise Krahaso image delivery"
```

---

### Task 4: Progressive Desktop And Mobile Visual Universe

**Files:**
- Modify: `src/motion/progress.ts`
- Modify: `src/components/VisualUniverse.tsx`
- Modify: `src/index.css`
- Modify: `scripts/landing-page.test.tsx`
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Produces: `type UniverseMode = 'desktop' | 'mobile'` and `getUniverseState(progress: number, mode?: UniverseMode): UniverseState`.
- Consumes: `gsap`, `ScrollTrigger`, `.visual-universe`, `.universe-stage`, `.universe-gallery`, `.universe-phone`, `.universe-copy` and `.universe-exit-overlay`.

- [ ] **Step 1: Specify exact mobile/desktop progress states and progressive classes**

```ts
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
```

Add these exact source assertions to `scripts/verify-redesign.mjs`:

```js
assert.match(visualUniverse, /classList\.add\('motion-ready'\)/);
assert.match(visualUniverse, /gsap\.matchMedia\(\)/);
assert.match(visualUniverse, /media\.add\('\(max-width: 899px\)'/);
assert.doesNotMatch(visualUniverse, /max-width: 899px[\s\S]{0,900}pin:/);
assert.match(css, /\.visual-universe\.motion-ready\s*\{[^}]*height:\s*290svh/);
assert.match(css, /@media \(max-width: 899px\)[\s\S]*?\.visual-universe\.motion-ready\s*\{[^}]*height:\s*230svh/);
```

Run: `npm test`

Expected: FAIL because mode-aware progress and mobile choreography do not exist.

- [ ] **Step 2: Implement pure mode-aware progress mapping**

```ts
export type UniverseMode = 'desktop' | 'mobile';

export function getUniverseState(rawProgress: number, mode: UniverseMode = 'desktop'): UniverseState {
  const progress = clamp(rawProgress);
  if (mode === 'mobile') {
    return {
      galleryScale: map(progress, 0, 0.6, 0.86, 0.52),
      mediaScale: map(progress, 0, 0.6, 1.08, 0.96),
      phoneOpacity: map(progress, 0.24, 0.56, 0, 1),
      phoneScale: map(progress, 0.24, 0.56, 0.92, 1),
      copyOpacity: map(progress, 0.16, 0.44, 1, 0),
    };
  }
  return {
    galleryScale: map(progress, 0, 0.68, 1, 0.52),
    mediaScale: map(progress, 0, 0.68, 1.18, 1),
    phoneOpacity: map(progress, 0.25, 0.56, 0, 1),
    phoneScale: map(progress, 0.25, 0.56, 0.92, 1),
    copyOpacity: map(progress, 0.18, 0.46, 1, 0),
  };
}
```

- [ ] **Step 3: Make static content the default and add motion only after import succeeds**

Inside the successful GSAP import, create a context, set the initial state, then add `motion-ready`. Use `gsap.matchMedia()`:

```ts
const media = gsap.matchMedia();
root.classList.add('motion-ready');

media.add('(min-width: 900px)', () => {
  const trigger = ScrollTrigger.create({
    trigger: root,
    start: 'top top',
    end: 'bottom bottom',
    pin: stage,
    pinSpacing: false,
    onUpdate: ({ progress }) => render('desktop', progress),
  });
  return () => trigger.kill();
});

media.add('(max-width: 899px)', () => {
  const trigger = ScrollTrigger.create({
    trigger: root,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: ({ progress }) => render('mobile', progress),
  });
  return () => trigger.kill();
});
```

Do not add either branch when `prefers-reduced-motion: reduce` matches. Cleanup removes `motion-ready`, reverts media/context and clears transforms/visibility.

- [ ] **Step 4: Apply exact responsive geometry**

```css
.visual-universe { height: auto; }
.visual-universe.motion-ready { height: 290svh; }

@media (max-width: 899px) {
  .visual-universe.motion-ready { height: 230svh; }
  .visual-universe.motion-ready .universe-stage {
    position: sticky;
    top: 0;
    height: 100svh;
    min-height: 100svh;
    overflow: hidden;
  }
}
```

The non-ready mobile and reduced-motion selectors keep the current readable normal-flow composition with a visible phone.

- [ ] **Step 5: Run tests/build and commit**

Run: `npm test && npm run build`

Expected: all tests PASS; main and GSAP bundle budgets remain green.

```bash
git add src/motion/progress.ts src/components/VisualUniverse.tsx src/index.css scripts/landing-page.test.tsx scripts/verify-redesign.mjs
git commit -m "feat: add resilient mobile product motion"
```

---

### Task 5: Mobile Feature Motion, Hero Drift And Page Compression

**Files:**
- Modify: `src/components/FeatureStory.tsx`
- Modify: `src/index.css`
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: existing `.feature-chapter`, `.feature-copy`, `.feature-visual`, `.hero-phone`, `.hero-float-search` and `.hero-float-offer` elements.
- Produces: desktop chapter pins only at `min-width: 900px`; mobile scroll-linked copy/phone transforms without pins; transform-only hero drift.

- [ ] **Step 1: Add source contracts for mobile motion and compact geometry**

```js
assert.match(featureStory, /media\.add\('\(max-width: 899px\)'/);
assert.match(featureStory, /scrub: 0\.35/);
assert.match(featureStory, /scale: 0\.97/);
assert.doesNotMatch(featureStory, /max-width: 899px[\s\S]{0,1200}pin:/);
assert.match(css, /\.story-intro[^}]*min-height:\s*50svh/);
assert.match(css, /\.feature-chapter[^}]*min-height:\s*68svh/);
assert.match(css, /@keyframes hero-phone-drift/);
```

Run: `node --test scripts/verify-redesign.mjs`

Expected: FAIL on mobile feature motion, compact heights and hero drift.

- [ ] **Step 2: Split Feature Story motion with `gsap.matchMedia()`**

Keep the existing desktop approach under `(min-width: 900px)` but shorten its trigger windows. Add mobile normal-flow reveals:

```ts
media.add('(max-width: 899px)', () => {
  const tweens = cards.map((card) => {
    const copy = card.querySelector<HTMLElement>('.feature-copy');
    const visual = card.querySelector<HTMLElement>('.feature-visual');
    if (!copy || !visual) return undefined;
    return gsap.fromTo(
      [copy, visual],
      { autoAlpha: 0.45, y: 36, scale: 0.97 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top 88%', end: 'top 52%', scrub: 0.35 },
      },
    );
  }).filter(Boolean);
  return () => tweens.forEach((tween) => tween?.scrollTrigger?.kill());
});
```

Reduced motion returns before importing or initialising this choreography.

- [ ] **Step 3: Add restrained hero drift on both responsive branches**

```css
@keyframes hero-phone-drift {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(2deg); }
  50% { transform: translate3d(0, -9px, 0) rotate(1.4deg); }
}

@media (prefers-reduced-motion: no-preference) {
  .hero-phone { animation: hero-phone-drift 7s ease-in-out infinite; }
  .hero-float-search { animation: hero-card-drift 6.4s ease-in-out infinite; }
  .hero-float-offer { animation: hero-card-drift 7.2s .8s ease-in-out infinite reverse; }
}
```

Mobile overrides reduce the phone travel to 5px through a `hero-phone-drift-mobile` keyframe.

- [ ] **Step 4: Compress the journey without clipping phones**

Set desktop `.story-intro` to `min-height:50svh`, `.feature-chapter` to `min-height:68svh`, `.feature-chapter-inner` to `min-height:62svh`, `.feature-visual` to `min-height:58svh`, and `.feature-phone` to `min(20vw,250px)`. On mobile, use `padding-block:58px`, `.feature-visual { min-height:470px; }` and retain normal flow.

- [ ] **Step 5: Run tests/build and commit**

Run: `npm test && npm run build`

Expected: all tests PASS; bundle budgets hold.

```bash
git add src/components/FeatureStory.tsx src/index.css scripts/verify-redesign.mjs
git commit -m "feat: animate and shorten the product story"
```

---

### Task 6: Responsive Browser QA And Defect Closure

**Files:**
- Create: `docs/qa/tiptop/browser-audit.json`
- Create: `docs/qa/tiptop/desktop-1440x900.jpg`
- Create: `docs/qa/tiptop/desktop-universe-1440x900.jpg`
- Create: `docs/qa/tiptop/mobile-390x844.jpg`
- Create: `docs/qa/tiptop/mobile-universe-390x844.jpg`
- Create: `docs/qa/tiptop/tablet-768x1024.jpg`
- Modify: production files and tests only when a rendered defect proves the need.

**Interfaces:**
- Consumes: `dist/`, a single local preview server, the primary runtime Playwright module and the approved Chromium executable.
- Produces: evidence for viewport geometry, motion progress, reduced motion, focus, links, errors, image loading and scroll-distance reduction.

- [ ] **Step 1: Build and start one production preview**

Run: `npm run build`.

Start `npm run preview -- --host 127.0.0.1 --port 4173` in the same execution boundary as browser QA. Use the Playwright module at `$CODEX_PRIMARY_RUNTIME_NODE_MODULES/playwright/index.mjs` and pass the approved local Chromium path through `KRAHASO_CHROMIUM`; do not add Playwright to production dependencies.

- [ ] **Step 2: Exercise the exact viewport matrix**

For `1440x900`, `1280x800`, `768x1024`, `390x844` and `360x800`, collect:

```js
{
  viewport,
  documentHeight: document.documentElement.scrollHeight,
  horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  h1Count: document.querySelectorAll('h1').length,
  duplicateIds,
  brokenInternalAnchors,
  failedImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0),
  motionReady: document.querySelector('#universi')?.classList.contains('motion-ready'),
  consoleErrors,
}
```

Require zero overflow, one H1, no duplicate IDs, no broken anchors, no failed images and no application console errors.

- [ ] **Step 3: Prove desktop and mobile motion actually advances**

At each viewport, scroll to Visual Universe progress `0`, `.25`, `.55`, `.8` and `1`. Record the computed transform/opacity of `.universe-gallery`, `.universe-phone` and `.universe-copy`. Require the phone opacity to increase from `0` to `1`, gallery scale to decrease, and mobile `.universe-stage` to compute as `position: sticky` without a GSAP pin spacer.

Scroll backward and require the same values within `0.02`. Rotate from `390x844` to `844x390`, then back, and confirm choreography reinitialises without duplicate spacers or stale transforms.

- [ ] **Step 4: Prove reduced motion and keyboard behaviour**

Emulate `prefers-reduced-motion: reduce`; require no `motion-ready`, Visual Universe height below `120svh`, visible phone/copy, and no active animation on `.hero-phone`.

At 200% zoom, tab through the skip link, brand, navigation and CTA. Require a visible outline, header clearance, targets at least 44px high and no clipped text. Confirm the header CTA opens the exact Google Play listing with the encoded test referrer.

- [ ] **Step 5: Capture evidence, compare it with the production audit and fix every real defect test-first**

Capture hero, Visual Universe reveal, feature and offer/download states. Compare matching desktop states against `/workspace/scratch/krahaso-audit-01-hero.jpg`, `/workspace/scratch/krahaso-audit-04-feature.jpg`, `/workspace/scratch/krahaso-audit-05-offers.jpg` and `/workspace/scratch/krahaso-audit-05-download.jpg`. Preserve the current identity while rejecting new clipping, weaker contrast, empty phone shells or excessive whitespace.

For each defect, first add a failing test or audit assertion, then apply the smallest fix and recapture.

- [ ] **Step 6: Verify the 35% page-length target and commit evidence**

At 1363x936, measure `#universi` height plus `#veçorite` height. Compare against the production baseline captured before changes and require the new sum to be at most 65% of baseline.

```bash
git add docs/qa/tiptop scripts src index.html vercel.json
git commit -m "test: verify Krahaso responsive acquisition journey"
```

---

### Task 7: Final Review, Protected Publication And Live Verification

**Files:**
- Modify: `README.md`
- Modify: `docs/qa/tiptop/browser-audit.json` only if hosted verification adds evidence.

**Interfaces:**
- Consumes: final branch commits and Vercel/GitHub deployment checks.
- Produces: mergeable protected PR, production release and public-domain verification.

- [ ] **Step 1: Correct stale README architecture and launch information**

Document the six current genuine screenshots, live Google Play listing, mobile/desktop GSAP enhancement, WebP pipeline, verification commands and current legal links. Remove the stale claims that no store URL or approved contact exists.

- [ ] **Step 2: Run the complete local gate on the exact final tree**

Run:

```bash
npm test
npm run build
git diff --check origin/main...HEAD
git status --short
```

Require all tests passing, TypeScript/Vite success, no whitespace errors, no unintended files and bundle budgets within limits.

- [ ] **Step 3: Review React and motion quality**

Confirm effects clean up every `ScrollTrigger`, `gsap.context()` and media matcher; no render-time window reads; no duplicated content; stable image dimensions; no unnecessary state; no unbounded event listeners; and no animation of layout properties.

- [ ] **Step 4: Push the protected branch and open the PR**

Push `codex/krahaso-tiptop`, open a PR against `main`, include the spec, plan, before/after screenshots, test results, page-length change, image byte reduction, bundle sizes, motion matrix and truthful omissions. Do not merge until Vercel reports the exact PR head as ready.

- [ ] **Step 5: Inspect the hosted preview and merge the exact verified head**

Verify the public preview HTML, mobile/desktop motion, images, title, JSON-LD, crawler files, Google Play target and response headers. Merge only if the preview tree SHA equals the locally verified head.

- [ ] **Step 6: Verify production and close the release**

On `https://krahaso.app`, confirm HTTP 200, canonical host redirect, production asset hashes, mobile/desktop motion, reduced-motion fallback, CTA destination, `robots.txt`, `sitemap.xml`, cache/security headers, no overflow and no application console errors. Record the release SHA and PR URL in the final handoff.
