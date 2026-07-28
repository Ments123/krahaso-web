# Krahaso App Acquisition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the published Krahaso brand website into a mobile-first app-acquisition funnel that sells one truthful behaviour: scan a grocery barcode, compare the exact product where prices are available, and choose where it costs less.

**Architecture:** Keep the existing Vite/React/Tailwind visual foundation and genuine Krahaso assets. Add a small launch-state domain layer, one reusable acquisition CTA, a no-dependency analytics adapter, and focused mobile conversion components. Reorder existing sections so authentic app proof and the barcode journey appear before editorial and partner content, while an environment flag keeps receipt rewards secondary and disabled by default.

**Tech Stack:** React 18, TypeScript 5.5, Vite 5.4, Tailwind CSS 3.4, Framer Motion 11, Lucide React, Node test runner.

## Global Constraints

- Work only in `Ments123/krahaso-web` on `codex/krahaso-app-acquisition`, based on production commit `d75320b`; do not modify the mobile app, backend, or `admin.krahaso.app`.
- Preserve `Kalo te më e lira`, Krahaso green `#08A64A`, deep green, off-white surfaces, existing K mark, approved video crop, real app screenshot, premium type hierarchy, rounded language, and reduced-motion handling.
- The primary story is barcode scan → exact-product price comparison where prices are available → cheapest choice.
- Receipt rewards are secondary and render only when `VITE_REWARDS_ENABLED=true`.
- Do not invent APIs, URLs, prices beyond clearly labelled existing illustrations, supermarket partnerships, reviews, ratings, downloads, savings totals, user totals, legal copy, or support details.
- Use one non-blocking hero video. Do not capture frames into canvases or retain decoded frames in JavaScript memory.
- Keep one H1, unique semantic section IDs, real links only, Escape-close navigation, `aria-expanded`, keyboard navigation, visible focus, at least 44px touch targets, no focus trap, and no horizontal overflow.
- Default `VITE_LAUNCH_MODE` to `prelaunch`; do not render a dead acquisition button when no configured waitlist or store URL exists.
- Do not add heavyweight runtime dependencies or fake analytics IDs.
- Do not merge or deploy over production. Deliver a verified draft PR and preview for review.

---

### Task 1: Replace obsolete design contracts with acquisition contracts

**Files:**
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: source files, metadata, public crawler files, and package scripts.
- Produces: source-level regression coverage for launch state, CTA honesty, barcode-first hierarchy, unique IDs, metadata, crawler files, performance architecture, accessibility hooks, and genuine assets.

- [ ] **Step 1: Write a failing launch/CTA contract**

Require `src/config/launch.ts`, `src/lib/platform.ts`, `src/lib/analytics.ts`, `src/components/AppAcquisitionCta.tsx`, and `src/components/MobileInstallBar.tsx`; assert the safe prelaunch default, supported environment keys, no `href="#"`, no fake store domains, and no hard-coded `Vjen së shpejti` outside the launch helper.

- [ ] **Step 2: Write a failing page-story contract**

Assert the H1 and full barcode explanation, navigation labels `Si funksionon`, `Aplikacioni`, and `Shkarko`, AppProof before ProductJourney before FeatureGrid, the journey ordering `Skano` → `Krahaso` → `Zgjidh`, and the absence of Admin/Partner/Rewards in primary navigation.

- [ ] **Step 3: Write failing performance, SEO, and crawler contracts**

Require `HeroVideoBg`, reject canvas/frame-caching APIs and `BoomerangVideoBg`, check title/description/Open Graph/Twitter/JSON-LD, and require `public/robots.txt` plus `public/sitemap.xml`.

- [ ] **Step 4: Run the contract and verify red**

Run: `npm run verify:design`

Expected: FAIL because the acquisition infrastructure and new hierarchy do not yet exist.

---

### Task 2: Build the launch-state and analytics domain layer

**Files:**
- Create: `.env.example`
- Create: `src/config/launch.ts`
- Create: `src/lib/platform.ts`
- Create: `src/lib/analytics.ts`
- Create: `src/components/AppAcquisitionCta.tsx`

**Interfaces:**
- `getLaunchConfig(): LaunchConfig`
- `getAcquisitionLinks(config: LaunchConfig, platform: Platform): AcquisitionLink[]`
- `detectPlatform(userAgent?: string): 'apple' | 'android' | 'unknown'`
- `trackEvent(name: AnalyticsEventName, payload?: Record<string, string>): void`
- `AppAcquisitionCta({ placement, inverse?, compact? }): JSX.Element`

- [ ] **Step 1: Verify the launch contract is red**

Run: `npm run verify:design`

- [ ] **Step 2: Implement validated environment parsing**

Support `VITE_LAUNCH_MODE`, store/preorder/waitlist URLs, and `VITE_REWARDS_ENABLED`. Accept only absolute `http:`/`https:` URLs, default mode to `prelaunch`, and default rewards to false.

- [ ] **Step 3: Implement platform-aware link priority**

Place Apple first on iOS/iPadOS, Google Play first on Android, and preserve both real links on unknown/desktop platforms.

- [ ] **Step 4: Implement safe analytics**

Push named events only when `window.dataLayer` is present; otherwise return without error. Copy inbound UTM parameters onto outbound acquisition destinations only when the destination does not already contain that key.

- [ ] **Step 5: Implement the reusable CTA**

Render configured waitlist, preorder, or live store links with external-link safety and placement-aware analytics. When no valid destination exists, render a neutral launch status with no button semantics.

- [ ] **Step 6: Run verification and build**

Run: `npm run verify:design`

Run: `npm run build`

Expected: launch infrastructure checks pass; remaining page-story checks stay red.

---

### Task 3: Rebuild the page as an acquisition journey

**Files:**
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/DownloadSection.tsx`
- Create: `src/components/PartnerTeaser.tsx`
- Create: `src/components/SiteFooter.tsx`
- Create: `src/components/RewardsSection.tsx`
- Create: `src/components/MobileInstallBar.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/AppProof.tsx`
- Modify: `src/components/ProductJourney.tsx`
- Modify: `src/components/FeatureGrid.tsx`
- Modify: `src/index.css`

**Interfaces:**
- `SiteHeader()` owns the accessible desktop/mobile navigation.
- `MobileInstallBar()` appears after the hero, respects session dismissal, and reuses launch state.
- `RewardsSection()` is rendered only when `launchConfig.rewardsEnabled`.
- App composition order is Hero → AppProof → ProductJourney → FeatureGrid → DownloadSection → optional RewardsSection → secondary editorial detail → PartnerTeaser → SiteFooter.

- [ ] **Step 1: Verify page-story checks are red**

Run: `npm run verify:design`

- [ ] **Step 2: Extract the header**

Use only `Si funksionon`, `Aplikacioni`, and `Shkarko` in primary navigation. Keep Admin and partner access in footer/business content. Preserve Escape close, `aria-expanded`, inert closed menu, and 44px targets.

- [ ] **Step 3: Rewrite the hero conversion copy**

Keep the visual hero and H1. Use `Skano barkodin. Krahaso çmimet në supermarketet e Kosovës. Shih ku kushton më pak.` and the acquisition CTA plus `Shih si funksionon` linking to `#si-funksionon`.

- [ ] **Step 4: Move genuine app proof directly below the hero**

Retain `/app/krahaso-home.webp`, stable dimensions, lazy loading, async decode, genuine alt text, and benefits centred on search, barcode identification, and price comparison.

- [ ] **Step 5: Rewrite the primary journey**

Use unique anchors and the locked sequence:
1. `01 — Skano`: camera to product barcode.
2. `02 — Krahaso`: prices for the same product where available.
3. `03 — Zgjidh`: identify the lower illustrative result.

Keep illustrative prices clearly labelled and remove receipt rewards from this component.

- [ ] **Step 6: Refactor the feature grid**

Use `Kërko produktin`, `Skano barkodin`, `Krahaso çmimet`, and `Gjej ofertën më të mirë`; preserve the existing premium cards and mobile snap behaviour.

- [ ] **Step 7: Add launch conversion, optional rewards, business teaser, and footer**

Reuse `AppAcquisitionCta` in the download section. Gate receipt content behind `rewardsEnabled`. Use `Je supermarket apo biznes? Bëhu pjesë e Krahaso.` for the secondary partner teaser. Keep Admin as a footer utility.

- [ ] **Step 8: Add the dismissible mobile bar**

Reveal only after the hero leaves view, store dismissal in `sessionStorage`, maintain 44px controls, and avoid covering footer/content by adding mobile bottom safe-area spacing while visible.

- [ ] **Step 9: Run verification and build**

Run: `npm run verify:design`

Run: `npm run build`

Expected: page hierarchy, copy, feature flag, accessibility hooks, and genuine asset checks pass.

---

### Task 4: Replace the frame-caching hero engine

**Files:**
- Create: `src/HeroVideoBg.tsx`
- Modify: `src/App.tsx`
- Delete: `src/BoomerangVideoBg.tsx`
- Modify: `src/index.css`

**Interfaces:**
- `HeroVideoBg({ src, className? }): JSX.Element`
- Uses one `<video autoPlay muted loop playsInline preload="metadata">`.
- Reduced motion pauses/hides movement and preserves a stable hero surface.

- [ ] **Step 1: Verify the performance contract is red**

Run: `npm run verify:design`

- [ ] **Step 2: Implement the direct video background**

Render content immediately, avoid loading state, canvas, frame callbacks, requestAnimationFrame, and decoded-frame retention. Preserve object-cover crop and existing hero wash.

- [ ] **Step 3: Remove the old implementation**

Delete `BoomerangVideoBg.tsx` after all imports migrate.

- [ ] **Step 4: Run verification and build**

Run: `npm run verify:design`

Run: `npm run build`

Expected: no frame-caching APIs and no visual layout regression in source structure.

---

### Task 5: Add factual SEO and crawler foundations

**Files:**
- Modify: `index.html`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Create: `docs/growth/krahaso-price-index.md`
- Modify: `README.md`

**Interfaces:**
- Static metadata describes barcode price comparison only.
- JSON-LD outputs factual `Organization` and `WebSite` objects for `https://krahaso.app/`.
- Crawler files expose only the real homepage.
- Growth document defines future routes without creating them.

- [ ] **Step 1: Verify metadata/crawler checks are red**

Run: `npm run verify:design`

- [ ] **Step 2: Update metadata and JSON-LD**

Use the exact approved title, description, Open Graph, and Twitter copy. Preserve `lang="sq"`, canonical, favicon, and real social image. Do not mention rewards by default.

- [ ] **Step 3: Add crawler files**

Allow the public site, reference the real sitemap, and list only `https://krahaso.app/`.

- [ ] **Step 4: Document the future price index**

Record route architecture, exact indexability contract, trust fields, source labels, and the rule that unsupported labels/pages are not rendered or indexed.

- [ ] **Step 5: Update operational documentation**

Document launch variables, safe defaults, analytics `dataLayer` integration, missing production URLs/legal copy, hero performance architecture, and verification commands.

- [ ] **Step 6: Run verification and build**

Run: `npm run verify:design`

Run: `npm run build`

Expected: all source contracts pass.

---

### Task 6: Browser, accessibility, performance, and release verification

**Files:**
- Modify: `design-qa.md`

**Interfaces:**
- Produces: verified local evidence and a draft PR from `codex/krahaso-app-acquisition`.

- [ ] **Step 1: Run clean automated checks**

Run: `npm run verify:design`

Run: `npm run build`

Record pre-change and post-change JS/CSS gzip sizes.

- [ ] **Step 2: Run browser QA**

Check 390×844, 430×932, 768×1024, and 1440×900 for hero crop, immediate copy, genuine app proof, menu keyboard operation, unique anchors, sticky acquisition/dismissal, footer, horizontal overflow, failed resources, console errors, and dead links.

- [ ] **Step 3: Check reduced motion and semantic accessibility**

Confirm one H1, labelled navigation, visible focus, 44px controls, non-trapping closed menu/sticky bar, motion suppression, and meaningful image alternatives.

- [ ] **Step 4: Record QA**

Update `design-qa.md` with exact commands, viewport results, bundle comparison, limitations, and missing production values.

- [ ] **Step 5: Commit logical changes**

Commit acquisition infrastructure, page conversion, hero/SEO performance, and documentation as reviewable chunks.

- [ ] **Step 6: Publish a protected draft PR**

Push without force, open a draft PR against `main`, include the twelve required delivery sections and screenshots, and wait for the Vercel preview to become healthy.

---

## Self-review

- Spec coverage: launch state, reusable CTA, platform priority, hero/nav hierarchy, duplicate anchors, page ordering, barcode journey, feature-flagged rewards, feature grid, hero performance, metadata, JSON-LD, robots/sitemap, legal restraint, partner demotion, final/sticky conversion, analytics, price-index documentation, regression tests, accessibility, performance, fonts, file organisation, QA, and draft-PR delivery all map to tasks above.
- Placeholder scan: the plan contains no implementation placeholders. Missing store/waitlist/legal/support values are deliberate production inputs and are handled with neutral UI or omitted links.
- Type consistency: `LaunchConfig`, `AcquisitionLink`, `Platform`, analytics event names, and component responsibilities are defined once and consumed consistently.
