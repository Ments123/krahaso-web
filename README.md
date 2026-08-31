# Krahaso app-acquisition website

The Albanian-first public website for [Krahaso](https://krahaso.app). It leads with one clear promise: search or scan a grocery product, see the prices Krahaso has from Kosovo markets, and make a more informed choice.

The production acquisition path links directly to the verified Android listing:

- Google Play: <https://play.google.com/store/apps/details?id=com.krahaso.app>
- iOS: shown as `iOS — së shpejti`; it is not presented as a live download

## Stack

- Vite 5.4
- React 18.3 and TypeScript 5.5
- GSAP 3.15 with ScrollTrigger, loaded only when motion enhancement starts
- Tailwind/PostCSS and the existing Krahaso design tokens
- Node's test runner with `tsx`

## Run locally

```bash
npm ci
python3 -m pip install -r requirements-dev.txt
npm run dev
```

Vite serves the site at `http://localhost:5173` by default.

## Verify and build

```bash
npm test
npm run build
npm run preview
```

`npm test` covers semantic rendering, Google Play attribution, genuine asset mapping, motion-state math, reduced-motion fallbacks, metadata, crawler infrastructure and reproducible image optimisation. `npm run build` now fails if the main or GSAP JavaScript crosses its gzip budget.

Fresh rendered QA evidence lives in `docs/qa/tiptop/`. The browser audit checks five viewport sizes, forward and reverse scroll motion, mobile rotation, reduced motion, 200% zoom, focus treatment, target sizes, broken links, failed images, overflow and console errors.

The audit runner uses QA-only browser installations rather than production dependencies:

```bash
KRAHASO_PLAYWRIGHT=/path/to/playwright/index.mjs \
KRAHASO_CHROMIUM=/path/to/chromium \
npm run qa:browser
```

For serverless Chromium builds, set `KRAHASO_CHROMIUM_ARGS_MODULE` to the package's ESM entry so the runner uses its supported launch arguments.

## Product proof and imagery

The site uses six current, genuine Krahaso screenshots:

- `krahaso-home.webp`
- `krahaso-home-feed.webp`
- `krahaso-offers.webp`
- `krahaso-scanner.webp`
- `krahaso-basket.webp`
- `krahaso-rewards.webp`

Their approved JPG sources remain in `public/app/`. Product cut-outs keep their approved PNG sources in `public/products/`. The deterministic WebP pipeline preserves dimensions and verifies that every generated file is smaller:

```bash
python3 scripts/optimise-web-images.py
python3 scripts/optimise-web-images.py --check
```

The hero screenshot is eager-loaded with stable intrinsic dimensions; below-fold images use lazy loading and asynchronous decoding. Long-lived cache headers are limited to fingerprinted assets, while screenshot and product directories use bounded caching with stale revalidation.

## Motion and resilience

The Visual Universe uses pure progress mapping and progressive GSAP enhancement on both desktop and mobile:

- desktop uses a pinned stage only after successful motion setup
- mobile uses a native CSS-sticky stage and never creates a GSAP pin spacer
- feature chapters remain in normal mobile document flow with scroll-linked reveals
- motion reverses cleanly when the user scrolls back
- failed imports or disabled JavaScript leave visible, semantic content
- `prefers-reduced-motion: reduce` removes scroll choreography, continuous drift and motion-only page height

The GSAP code is split from the main application bundle. Current guardrails keep the main JavaScript at or below 55 kB gzip and the GSAP chunk at or below 48 kB gzip.

## Acquisition and attribution

`src/components/AppAcquisitionCta.tsx` is the single Google Play action used by the fixed header, hero and final download section. Every primary action opens the verified listing directly.

Inbound `utm_source`, `utm_medium`, `utm_campaign`, `utm_term` and `utm_content` values are encoded into Google Play's install `referrer` parameter. `src/lib/analytics.ts` pushes named events only when an existing `window.dataLayer` is available; it does not load an analytics vendor itself.

## Current page architecture

```text
index.html                         metadata, preload and JSON-LD
src/
  App.tsx                          semantic page composition and skip target
  content/landing.ts               genuine screenshot, product and market assets
  lib/analytics.ts                 events and Play install attribution
  motion/progress.ts               deterministic desktop/mobile motion states
  motion/gsap.ts                   lazy GSAP and ScrollTrigger registration
  components/
    AppAcquisitionCta.tsx          reusable verified Google Play action
    HeroSection.tsx                acquisition promise and primary proof
    VisualUniverse.tsx             resilient desktop/mobile scroll story
    FeatureStory.tsx               five genuine product chapters
    OfferProof.tsx                 factual market-offer proof
    FinalDownload.tsx              final conversion section
    SiteHeader.tsx / SiteFooter.tsx navigation and verified utility links
public/
  app/                             six genuine app screenshots, JPG + WebP
  products/                        approved product sources and WebP outputs
  robots.txt / sitemap.xml         crawler infrastructure
scripts/
  browser-audit.mjs               reproducible compiled-browser motion QA
  check-bundle-budgets.mjs        post-build gzip budget gate
  landing-page.test.tsx            rendering and content contracts
  acquisition.test.ts              attribution contracts
  optimise-web-images.py           deterministic image pipeline
  verify-redesign.mjs              source, SEO, motion and bundle guardrails
```

## Verified utility links

- Privacy: <https://api.krahaso.app/privacy>
- Account deletion: <https://api.krahaso.app/account-deletion>
- Contact: <mailto:privacy@krahaso.app>
- Admin: <https://admin.krahaso.app>

## Trust rules

- Barcode scanning and product search are the primary identification routes.
- Price and offer copy is limited to data Krahaso has available.
- No market is described as a partner without evidence.
- The site does not publish fabricated prices, ratings, savings, downloads, testimonials or coverage claims.
- iOS remains a truthful coming-soon status until a verified listing exists.
