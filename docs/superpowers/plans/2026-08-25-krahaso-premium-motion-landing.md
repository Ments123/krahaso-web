# Krahaso Premium Motion Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the compact bridge hero with a truthful, premium, responsive Krahaso product journey that converts visitors to Google Play.

**Architecture:** Keep the Vite/React SPA and production infrastructure. Compose focused semantic sections from one content model, add GSAP/ScrollTrigger for desktop-only progress choreography, and fall back to normal flow for mobile/reduced motion. Use only repository-backed imagery and omit the numeric price deck until genuine data exists.

**Tech Stack:** Vite 5, React 18, TypeScript 5.5, Tailwind 3, GSAP + ScrollTrigger, Node test runner with `tsx`

**Spec:** `docs/superpowers/specs/2026-08-25-krahaso-premium-motion-landing-design.md`

## Global Constraints

- One page H1: `Krahaso para se të blesh.`
- Primary conversion URL: `https://play.google.com/store/apps/details?id=com.krahaso.app`.
- iOS copy remains `iOS — së shpejti`.
- No fabricated price, discount, retailer relationship, review, testimonial or coverage claim.
- No Three.js, Lenis, SplitText, nested pins or duplicated desktop/mobile content.
- Visual Universe main trigger has no scrub; its exit uses `scrub:true`.
- Feature peel uses `scrub:true`, `ease:'none'` and Y translation only.
- Reduced motion initialises no long pinned choreography.
- Preserve canonical, metadata, JSON-LD, robots, sitemap, analytics, UTM handling and Vercel redirect/header rules.

---

### Task 1: Behaviour contracts and progress maths

**Files:**
- Create: `scripts/landing-page.test.tsx`
- Create: `src/motion/progress.ts`
- Modify: `package.json`
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Produces: `clamp01(value: number): number`, `mapRange(value, start, end): number`, `getUniverseState(progress): UniverseState`.
- Produces: component-render expectations for page structure, CTA destinations, unique IDs, genuine screenshot usage and truthful offer fallback.

- [ ] **Step 1: Add the TypeScript test runner and write failing tests**

```tsx
test('renders the approved semantic journey and genuine store actions', () => {
  const html = renderToStaticMarkup(<App />);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /Krahaso para se të blesh/);
  assert.match(html, /id="universi"/);
  assert.match(html, /id="veçoritë"/);
  assert.match(html, /id="ofertat"/);
  assert.match(html, /id="shkarko"/);
  assert.match(html, /\/app\/krahaso-home\.webp/);
  assert.match(html, /com\.krahaso\.app/);
});
```

```ts
test('visual universe state is deterministic at progress boundaries', () => {
  assert.deepEqual(getUniverseState(0), {
    galleryScale: 1,
    mediaScale: 1.25,
    phoneOpacity: 0,
    phoneScale: 0.9,
  });
  assert.deepEqual(getUniverseState(0.75), {
    galleryScale: 0.5,
    mediaScale: 1,
    phoneOpacity: 1,
    phoneScale: 1,
  });
});
```

- [ ] **Step 2: Run the targeted tests and confirm RED**

Run: `node --import tsx --test scripts/landing-page.test.tsx`

Expected: FAIL because the new section IDs, copy and progress module do not exist.

- [ ] **Step 3: Implement the minimal pure progress helpers**

Use literal interpolation windows from the approved spec and clamp every public input to `[0,1]`.

- [ ] **Step 4: Keep the component test red until the real sections ship**

Run: `node --import tsx --test scripts/landing-page.test.tsx`

Expected: maths PASS; page render contract FAIL.

### Task 2: Content model, brand shell and calm hero

**Files:**
- Create: `src/content/landing.ts`
- Create: `src/components/PhoneFrame.tsx`
- Create: `src/components/HeroSection.tsx`
- Modify: `src/components/BrandMark.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/AppAcquisitionCta.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Produces: stable `features`, `universeAssets` and verified footer-link arrays.
- Produces: `PhoneFrame({ crop, priority, alt, className })` using `/app/krahaso-home.webp` unchanged.
- Consumes: the existing UTM/analytics helpers and Play Store URL.

- [ ] **Step 1: Implement the smallest semantic shell that satisfies the hero portion of the render test**

Use `header → main → hero → placeholder section IDs → footer`, one H1, stable hero CTA and non-link iOS status.

- [ ] **Step 2: Run the component contract**

Expected: hero/CTA assertions PASS; motion-section content assertions still FAIL.

- [ ] **Step 3: Style the calm hero and responsive navigation**

Reserve phone dimensions with `aspect-ratio`, use the real brand image in header/footer, and keep nav outside transformed layers.

### Task 3: Visual Universe motion section

**Files:**
- Create: `src/motion/gsap.ts`
- Create: `src/components/VisualUniverse.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `universeAssets`, `getUniverseState()` and the shared GSAP/ScrollTrigger registration.
- Produces: `section#universi`, explicit runway, pinned stage, `HeroInner`, visual-only exit overlay and exit sentinel.

- [ ] **Step 1: Add GSAP and render the progressive-enhancement DOM before any animation state**

- [ ] **Step 2: Add the desktop main trigger in document order**

```ts
ScrollTrigger.create({
  id: 'krahaso-universe',
  trigger: root,
  start: 'top top',
  end: () => `+=${window.innerHeight * 3.25}`,
  pin: stage,
  pinSpacing: false,
  onUpdate: self => renderUniverse(self.progress),
});
```

- [ ] **Step 3: Add the separate scrubbed exit and mobile/reduced-motion branches**

Cleanup with `ctx.revert()`, explicit `clearProps` for `onUpdate` targets, then `mm.revert()`.

- [ ] **Step 4: Run tests and production build**

Expected: universe render assertions PASS; zero TypeScript errors.

### Task 4: Five-chapter Feature Story

**Files:**
- Create: `src/components/FeatureStory.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Modify: `scripts/landing-page.test.tsx`

**Interfaces:**
- Consumes: `features` and `PhoneFrame`.
- Produces: `section#veçoritë`, one intro, five `FeatureCard > FeatureCardInner` chapters and one outro sentinel.

- [ ] **Step 1: Extend the render test with the literal journey order and receipt-acceptance copy**

Expected: FAIL because the five chapters are absent.

- [ ] **Step 2: Render the five semantic chapters from one content array**

Use the unmodified current app image with chapter-specific crop/focus classes. Do not duplicate the content for mobile.

- [ ] **Step 3: Implement the desktop pin/peel contract**

Create one intro pin, four outer pins and four inner Y-only peel triggers sharing `FeatureStoryOutro` as their end boundary. Card five receives neither pin nor peel.

- [ ] **Step 4: Implement the mobile and reduced-motion normal-flow branch**

- [ ] **Step 5: Run the component contract and build**

Expected: feature order, truthful copy and heading assertions PASS.

### Task 5: Genuine offers proof, final CTA and footer

**Files:**
- Create: `src/components/OfferProof.tsx`
- Create: `src/components/FinalDownload.tsx`
- Modify: `src/components/SiteFooter.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Modify: `index.html`

**Interfaces:**
- Produces: `section#ofertat` with the real in-app offers crop and retailer context, without numeric comparison cards.
- Produces: stable `section#shkarko` CTA and verified privacy/account-deletion/contact links.

- [ ] **Step 1: Extend the render test to reject illustrative price-deck copy and require legal/support destinations**

- [ ] **Step 2: Implement the genuine offers proof and final CTA**

Use `Ofertat e marketeve, në një vend.` and avoid unverified numeric values.

- [ ] **Step 3: Update metadata wording while retaining every production tag**

- [ ] **Step 4: Run all tests and build**

Expected: all component, source-contract and build gates PASS.

### Task 6: Browser QA, refinement and delivery

**Files:**
- Create: `docs/qa/motion-landing/desktop-hero.png`
- Create: `docs/qa/motion-landing/desktop-universe.png`
- Create: `docs/qa/motion-landing/desktop-features.png`
- Create: `docs/qa/motion-landing/desktop-offers.png`
- Create: `docs/qa/motion-landing/desktop-full.png`
- Create: `docs/qa/motion-landing/mobile-hero.png`
- Create: `docs/qa/motion-landing/mobile-features.png`
- Create: `docs/qa/motion-landing/mobile-full.png`

**Interfaces:**
- Consumes: the local Vite server and production build.
- Produces: visual evidence and browser audit results for the final PR.

- [ ] **Step 1: Capture the required states in real Chromium**

Inspect 1440×900, 1280×800, 768×1024, 390×844 and 360×800.

- [ ] **Step 2: Exercise progress and release boundaries**

Check Visual Universe progress 0/.25/.5/.75/1, every feature stack transition, backward scroll, fast wheel, refresh mid-page and hash navigation.

- [ ] **Step 3: Exercise accessibility variants**

Check reduced motion, 125%/200% zoom, keyboard focus, text clipping, touch targets and horizontal overflow.

- [ ] **Step 4: Write a failing browser regression for every defect found, fix, and recapture**

- [ ] **Step 5: Run final gates**

Run component tests, `node --test scripts/verify-redesign.mjs`, `tsc -b`, `vite build`, console scan, asset/reference scan and git diff review.

- [ ] **Step 6: Commit, push and open a draft PR**

Use branch `codex/premium-motion-landing`, wait for Vercel preview deployment, inspect its build status and verify the preview URL before handoff.
