# Krahaso app-acquisition website

The Albanian-first public website for Krahaso. It explains one primary behaviour: scan a grocery-product barcode, compare the exact product where prices are available, and see where it costs less.

The production site uses the approved cinematic Krahaso identity, genuine application screenshot, green/off-white palette, editorial type and mobile-first composition. It does not claim full supermarket coverage, public store availability, partnerships, ratings, downloads or user totals.

## Stack

- Vite 5.4
- React 18.3 and TypeScript 5.5
- Tailwind CSS 3.4
- Framer Motion 11
- Lucide React

## Run locally

```bash
npm install
npm run dev
```

Vite serves the site at `http://localhost:5173` by default.

## Verify and build

```bash
npm run verify:design
npm run build
npm run preview
```

The source contract protects the approved brand, genuine screenshot, barcode-first hierarchy, launch-state honesty, unique anchors, metadata, crawler files, accessibility hooks and lightweight hero media.

## Launch configuration

Copy `.env.example` to a local `.env` and provide only real destinations.

| Variable | Purpose | Safe default |
| --- | --- | --- |
| `VITE_LAUNCH_MODE` | `prelaunch`, `preorder`, or `live` | `prelaunch` |
| `VITE_WAITLIST_URL` | Real prelaunch registration URL | blank |
| `VITE_APP_STORE_PREORDER_URL` | Real Apple preorder listing | blank |
| `VITE_PLAY_PREREG_URL` | Real Google Play preregistration listing | blank |
| `VITE_APP_STORE_URL` | Real live App Store listing | blank |
| `VITE_PLAY_STORE_URL` | Real live Google Play listing | blank |
| `VITE_REWARDS_ENABLED` | Enables the secondary receipt-rewards section | `false` |

URLs are validated as absolute HTTP(S) destinations. When the configured launch mode has no valid destination, the website shows a neutral launch status rather than a dead button.

Do not put secrets in Vite variables. Every `VITE_` value is included in the client build.

## Acquisition and analytics

`src/components/AppAcquisitionCta.tsx` is the single launch-aware conversion component used by the hero, download section and mobile install bar. Apple devices prioritise App Store links, Android devices prioritise Google Play, and desktop keeps both valid destinations visible.

`src/lib/analytics.ts` has no external dependency. When an existing `window.dataLayer` array is present it pushes named acquisition and engagement events; otherwise it safely does nothing. Configure the real analytics loader or measurement ID outside this repository. Existing inbound `utm_*` parameters are copied to outbound acquisition links where practical.

## Structure

```text
index.html                         factual metadata and JSON-LD
src/
  App.tsx                          page composition only
  HeroVideoBg.tsx                  one direct, non-blocking hero video
  config/launch.ts                 launch mode, URL validation and CTA choices
  lib/platform.ts                  device-aware store priority
  lib/analytics.ts                 optional dataLayer events and UTM handling
  components/
    AppAcquisitionCta.tsx          reusable waitlist/preorder/store action
    SiteHeader.tsx                 consumer-first accessible navigation
    AppProof.tsx                   genuine app screenshot
    ProductJourney.tsx             scan → compare → choose story
    FeatureGrid.tsx                approved core behaviours
    DownloadSection.tsx            primary acquisition section
    MobileInstallBar.tsx           dismissible mobile conversion control
    RewardsSection.tsx             feature-flagged secondary rewards
    PartnerTeaser.tsx              secondary business route
    SiteFooter.tsx                 utility navigation and Admin
public/
  robots.txt
  sitemap.xml
scripts/
  verify-redesign.mjs
```

## Performance and motion

`HeroVideoBg` renders one ordinary `<video autoplay muted loop playsinline preload="metadata">`. It does not buffer decoded frames into canvases or run a JavaScript redraw loop. Content renders independently of media loading. Reduced-motion mode suppresses moving hero media and all non-essential animation.

Below-fold imagery is lazy-loaded with async decoding and stable dimensions.

## Missing production inputs

- No waitlist URL is configured in source.
- No App Store or Google Play listing URL is configured in source.
- Approved Privacy and Terms copy is not present in this repository.
- An approved public support/contact address is not present in this repository.

The footer therefore omits legal/support links rather than publishing placeholder or invented wording. Add those routes only when approved copy and real contact details are available.

## Trust rules

- Barcode scanning is the primary product-identification route.
- Comparison copy says prices are shown where Krahaso has them available.
- Receipt rewards are secondary and disabled by default.
- Existing example prices remain explicitly illustrative.
- No supermarket is described as a partner.
- Future public price pages must satisfy the contract in `docs/growth/krahaso-price-index.md`.
