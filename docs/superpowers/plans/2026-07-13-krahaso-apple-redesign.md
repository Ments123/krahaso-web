# Krahaso Apple-Inspired Public Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Krahaso landing page with an eight-scene, production-ready, Apple-inspired experience that demonstrates Krahaso, Skano and Fito through one evolving interactive phone.

**Architecture:** Keep Next.js App Router and static server rendering for the page shell, with client components limited to the hero phone, scroll journey and existing reveal/soon-action primitives. Centralised typed demo data feeds three focused phone-screen components; CSS and browser-native observers provide motion without a new animation dependency.

**Tech Stack:** Next.js 14.2, React 18.3, TypeScript 5.6, Tailwind CSS 3.4, next/font, next/image, lucide-react, Node built-in test runner.

## Global Constraints

- Public production site at `https://krahaso.app`; keep it indexable with `<html lang="sq">`.
- Albanian-first copy and the public story `Krahaso → Skano → Fito`.
- Preserve the green square with white “K” and use emerald as the dominant accent.
- Prices and supermarket logos are illustrative; do not invent ratings, users, reviews, downloads or partnerships.
- Keep unavailable destinations honest with `Së shpejti` feedback.
- No animation package, global state library, autoplay video or backend request.
- No scroll hijacking; mobile uses normal vertical flow.
- WCAG AA contrast, visible focus, 44×44 touch targets and `prefers-reduced-motion` support.
- Reuse contained local packshots/logos; never distort or crop recognition-critical packaging.
- `main` remains untouched until branch verification and visual approval.

---

## File Map

### Create

- `components/revamp/PhoneShell.tsx` — accessible shared device frame and status chrome.
- `components/revamp/CompareScreen.tsx` — basket total and per-product comparison UI.
- `components/revamp/ScanScreen.tsx` — barcode and receipt verification UI.
- `components/revamp/RewardScreen.tsx` — points and practical reward UI.
- `components/revamp/HeroStage.tsx` — hero narrative, CTAs, ambient grocery composition and interactive phone.
- `components/revamp/PriceProblem.tsx` — basket-to-supermarket price divergence scene.
- `components/revamp/ProductJourney.tsx` — desktop pinned and mobile linear three-chapter experience.
- `components/revamp/ClosingSections.tsx` — trust, retailer and download-finale sections.
- `components/revamp/SiteChrome.tsx` — production navigation and footer.
- `scripts/verify-redesign.mjs` — zero-dependency source contract checks.

### Modify

- `app/page.tsx` — compose the eight-scene story only.
- `app/layout.tsx` — production metadata and cleaner type system.
- `app/globals.css` — design tokens, motion system, responsive journey behaviour and reduced-motion fallback.
- `tailwind.config.ts` — revised premium palette and type tokens.
- `data/site.ts` — retain typed product data and add chapter/trust/retailer content.
- `package.json` — add `verify:design` and make lint compatible with the existing Next version.
- `README.md` — document the new architecture, verification and truthful-demo constraints.

### Reuse Unchanged

- `components/ui/BrandMark.tsx`
- `components/ui/ContainImg.tsx`
- `components/ui/LogoTile.tsx`
- `components/ui/Reveal.tsx`
- `components/ui/SoonButton.tsx`
- `public/logos/*`
- `public/products/*`

---

### Task 1: Lock the production shell and design contracts

**Files:**
- Create: `scripts/verify-redesign.mjs`
- Modify: `package.json`
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing Next.js App Router and CSS classes used by `Reveal` and `SoonButton`.
- Produces: `npm run verify:design`, colour tokens `canvas`, `surface`, `ink`, `forest`, `stone`, `brand`, `compare`, `reward`, and global classes used by later tasks.

- [ ] **Step 1: Write a failing zero-dependency contract test**

Create `scripts/verify-redesign.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("production shell carries the approved public-site contracts", async () => {
  const [layout, css, tailwind] = await Promise.all([
    read("app/layout.tsx"),
    read("app/globals.css"),
    read("tailwind.config.ts"),
  ]);
  assert.match(layout, /https:\/\/krahaso\.app/);
  assert.match(layout, /<html lang="sq"/);
  assert.match(layout, /Krahaso.*çmimet/i);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /--ease-apple/);
  for (const token of ["canvas", "surface", "ink", "forest", "stone", "compare", "reward"]) {
    assert.match(tailwind, new RegExp(`${token}:`));
  }
});
```

- [ ] **Step 2: Add and run the script to prove the contract initially fails**

Add to `package.json` scripts:

```json
"verify:design": "node --test scripts/verify-redesign.mjs"
```

Run: `npm run verify:design`  
Expected: FAIL because the revised design tokens and `--ease-apple` do not yet exist.

- [ ] **Step 3: Implement the production shell**

Update `tailwind.config.ts` with the exact public palette:

```ts
colors: {
  canvas: "#F4F5F1",
  surface: "#FFFFFF",
  ink: "#101612",
  forest: "#0A1410",
  stone: "#DDE2DC",
  brand: { DEFAULT: "#16A466", deep: "#087A49", soft: "#7BE2B0", tint: "#E8F7EF" },
  compare: "#FF8A3D",
  reward: "#4285F4",
},
```

Update `app/layout.tsx` to use a clean grotesk pair, Albanian language, canonical metadata, Open Graph metadata and theme colour `#16A466`. Update `app/globals.css` with the palette variables, `--ease-apple: cubic-bezier(.2,.8,.2,1)`, visible focus styles, button/reveal primitives and reduced-motion overrides. Retain `.reveal`, `.btn`, `.logotile` and `.barfill` compatibility.

- [ ] **Step 4: Verify the shell**

Run: `npm run verify:design`  
Expected: PASS for `production shell carries the approved public-site contracts`.

- [ ] **Step 5: Commit**

```bash
git add scripts/verify-redesign.mjs package.json tailwind.config.ts app/layout.tsx app/globals.css
git commit -m "feat: establish Krahaso cinematic design foundation"
```

---

### Task 2: Build the shared phone and three truthful product states

**Files:**
- Create: `components/revamp/PhoneShell.tsx`
- Create: `components/revamp/CompareScreen.tsx`
- Create: `components/revamp/ScanScreen.tsx`
- Create: `components/revamp/RewardScreen.tsx`
- Modify: `data/site.ts`
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: `ROWS`, `BASKET_PRODUCTS`, `PRODUCT_ROWS`, `IMG`, `LOGOS`, `SAVINGS`, `LogoTile`, `ContainImg`.
- Produces: `PhoneShell({ children, tone, label })`, `CompareScreen({ compact? })`, `ScanScreen({ mode })`, and `RewardScreen()`.

- [ ] **Step 1: Add failing component-contract tests**

Append:

```js
test("the phone story exposes compare, scan and reward states accessibly", async () => {
  const [shell, compare, scan, reward] = await Promise.all([
    read("components/revamp/PhoneShell.tsx"),
    read("components/revamp/CompareScreen.tsx"),
    read("components/revamp/ScanScreen.tsx"),
    read("components/revamp/RewardScreen.tsx"),
  ]);
  assert.match(shell, /aria-label/);
  assert.match(compare, /Totali/);
  assert.match(compare, /Për produkt/);
  assert.match(scan, /Barkodi/);
  assert.match(scan, /Fatura/);
  assert.match(reward, /pikë/i);
  assert.match(reward, /shpërblim/i);
});
```

Run: `npm run verify:design`  
Expected: FAIL with `ENOENT` for `PhoneShell.tsx`.

- [ ] **Step 2: Implement the bounded phone components**

`PhoneShell` owns the outer frame, accessible label, status row and screen clipping. `CompareScreen` owns the manual `Totali`/`Për produkt` buttons and never has its selection overridden after a user action. `ScanScreen` accepts `mode: "barcode" | "receipt"` and only applies the scanning animation when active. `RewardScreen` uses a static initial balance plus one view-triggered count-up and practical reward cards.

The public labels must include:

```ts
export const JOURNEY_CHAPTERS = [
  { id: "compare", eyebrow: "Krahaso", title: "E njëjta shportë. Një zgjedhje më e zgjuar." },
  { id: "scan", eyebrow: "Skano", title: "Nga barkodi te fatura, pa hamendësime." },
  { id: "reward", eyebrow: "Fito", title: "Blerjet e verifikuara kthehen në shpërblime." },
] as const;
```

- [ ] **Step 3: Run source contracts and production build**

Run: `npm run verify:design && npm run build`  
Expected: all source contracts PASS and Next production build exits 0.

- [ ] **Step 4: Commit**

```bash
git add components/revamp/PhoneShell.tsx components/revamp/CompareScreen.tsx components/revamp/ScanScreen.tsx components/revamp/RewardScreen.tsx data/site.ts scripts/verify-redesign.mjs
git commit -m "feat: create Krahaso interactive phone story"
```

---

### Task 3: Replace the opening with a cinematic hero and price problem

**Files:**
- Create: `components/revamp/HeroStage.tsx`
- Create: `components/revamp/PriceProblem.tsx`
- Create: `components/revamp/SiteChrome.tsx`
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: `BrandMark`, `SoonButton`, `CompareScreen`, `PhoneShell`, `ROWS`, `IMG`, `LOGOS`.
- Produces: `SiteHeader()`, `HeroStage()`, `PriceProblem()`, and later `SiteFooter()` from `SiteChrome.tsx`.

- [ ] **Step 1: Add failing narrative tests**

```js
test("the opening explains Krahaso immediately without invented proof", async () => {
  const [hero, problem, chrome] = await Promise.all([
    read("components/revamp/HeroStage.tsx"),
    read("components/revamp/PriceProblem.tsx"),
    read("components/revamp/SiteChrome.tsx"),
  ]);
  assert.match(hero, /Krahaso.*Skano.*Fito/s);
  assert.match(hero, /Shkarko/);
  assert.match(problem, /e njëjta shportë/i);
  assert.match(chrome, /admin\.krahaso\.app/);
  assert.doesNotMatch(hero + problem, /milion|rating|shkarkime|partner zyrtar/i);
});
```

Run: `npm run verify:design`  
Expected: FAIL because the new opening components do not exist.

- [ ] **Step 2: Implement the hero**

Build a near-full-viewport composition with concise Albanian copy, `CompareScreen` inside a large `PhoneShell`, one primary `SoonButton`, one anchor to `#pervoja`, and contained ambient product/price cards. Use CSS variables driven by pointer movement only on fine-pointer devices; the default server-rendered composition is complete without pointer events.

Use the exact primary message:

```text
Çdo shportë. Çdo çmim. Një zgjedhje më e zgjuar.
```

Use the supporting story:

```text
Krahaso çmimet, skano blerjet dhe fito shpërblime — në një aplikacion të ndërtuar për Kosovën.
```

- [ ] **Step 3: Implement the price problem and navigation**

`PriceProblem` maps `ROWS` into four diverging totals, then highlights the cheapest complete basket and states that prices are examples. `SiteHeader` stays minimal: brand, `Login` to `https://admin.krahaso.app`, and `Shkarko` anchor.

- [ ] **Step 4: Verify**

Run: `npm run verify:design && npm run build`  
Expected: PASS and production build exits 0.

- [ ] **Step 5: Commit**

```bash
git add components/revamp/HeroStage.tsx components/revamp/PriceProblem.tsx components/revamp/SiteChrome.tsx scripts/verify-redesign.mjs
git commit -m "feat: add cinematic Krahaso opening"
```

---

### Task 4: Build the pinned Krahaso, Skano and Fito journey

**Files:**
- Create: `components/revamp/ProductJourney.tsx`
- Modify: `app/globals.css`
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: `JOURNEY_CHAPTERS`, `PhoneShell`, `CompareScreen`, `ScanScreen`, `RewardScreen`, `Reveal`.
- Produces: `ProductJourney()` with `id="pervoja"`, accessible manual chapter buttons and scroll-derived active state.

- [ ] **Step 1: Add failing journey tests**

```js
test("the journey supports manual, scroll and mobile-linear navigation", async () => {
  const [journey, css] = await Promise.all([
    read("components/revamp/ProductJourney.tsx"),
    read("app/globals.css"),
  ]);
  assert.match(journey, /IntersectionObserver/);
  assert.match(journey, /aria-pressed/);
  assert.match(journey, /JOURNEY_CHAPTERS/);
  assert.match(css, /journey-mobile/);
  assert.match(css, /@media.*max-width:\s*767px/s);
});
```

Run: `npm run verify:design`  
Expected: FAIL because `ProductJourney.tsx` does not exist.

- [ ] **Step 2: Implement desktop journey state**

Use one observer over three narrative articles and set `active: 0 | 1 | 2`. Manual chapter buttons set the same state and mark user intent long enough to avoid an observer immediately undoing the click. Render one phone in the sticky desktop stage and crossfade the three pure screen components.

- [ ] **Step 3: Implement the mobile fallback**

Below 768 px, hide the sticky stage and render three normal document-flow cards, each with its matching phone state. Do not require scroll position to understand the sequence.

- [ ] **Step 4: Verify reduced motion and build**

Run: `npm run verify:design && npm run build`  
Expected: PASS; reduced-motion media query disables phone crossfades and scanning loops.

- [ ] **Step 5: Commit**

```bash
git add components/revamp/ProductJourney.tsx app/globals.css scripts/verify-redesign.mjs
git commit -m "feat: add scroll-led Krahaso product journey"
```

---

### Task 5: Complete trust, retailer, finale and page composition

**Files:**
- Create: `components/revamp/ClosingSections.tsx`
- Modify: `components/revamp/SiteChrome.tsx`
- Modify: `app/page.tsx`
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: all completed revamp sections, `BrandMark`, `SoonButton`, `PhoneShell`, `RewardScreen`, `PARTNER_BENEFITS`.
- Produces: `TrustSection()`, `RetailerSection()`, `DownloadFinale()`, `SiteFooter()` and the final public page order.

- [ ] **Step 1: Add failing page-composition tests**

```js
test("the public page contains exactly the approved story and disclosures", async () => {
  const [page, closing, chrome] = await Promise.all([
    read("app/page.tsx"),
    read("components/revamp/ClosingSections.tsx"),
    read("components/revamp/SiteChrome.tsx"),
  ]);
  for (const component of ["SiteHeader", "HeroStage", "PriceProblem", "ProductJourney", "TrustSection", "RetailerSection", "DownloadFinale", "SiteFooter"]) {
    assert.match(page, new RegExp(`<${component}`));
  }
  assert.match(closing, /Çmimet.*shembuj/i);
  assert.match(closing, /supermarket/i);
  assert.match(chrome, /Logot.*ilustruese/i);
});
```

Run: `npm run verify:design`  
Expected: FAIL because `ClosingSections.tsx` does not exist and the old page composition remains.

- [ ] **Step 2: Implement trust and retailer scenes**

Trust copy explains branch variance, verification and illustrative data in plain language. The retailer scene offers price/offer submission, visibility and local reach without implying an existing formal partnership.

- [ ] **Step 3: Implement the download finale and footer**

Use a dark cinematic close, `Krahaso. Skano. Fito.`, a `SoonButton` for download, secondary admin login, contained phone visual and disclaimers. Footer legal/social actions use `SoonButton`; do not render dead anchors.

- [ ] **Step 4: Replace `app/page.tsx`**

Compose only:

```tsx
<SiteHeader />
<main>
  <HeroStage />
  <PriceProblem />
  <ProductJourney />
  <TrustSection />
  <RetailerSection />
  <DownloadFinale />
</main>
<SiteFooter />
```

- [ ] **Step 5: Verify**

Run: `npm run verify:design && npm run build`  
Expected: all contract tests PASS and build exits 0.

- [ ] **Step 6: Commit**

```bash
git add components/revamp/ClosingSections.tsx components/revamp/SiteChrome.tsx app/page.tsx scripts/verify-redesign.mjs
git commit -m "feat: complete Krahaso public product story"
```

---

### Task 6: Final documentation, browser QA and release readiness

**Files:**
- Modify: `README.md`
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: completed production page and branch preview.
- Produces: documented verification commands and a release-ready pull request.

- [ ] **Step 1: Add final repository contracts**

```js
test("repository documentation describes the production redesign", async () => {
  const readme = await read("README.md");
  assert.match(readme, /Cinematic Interactive Product Story/);
  assert.match(readme, /npm run verify:design/);
  assert.match(readme, /illustrative/i);
});
```

Run: `npm run verify:design`  
Expected: FAIL until README is updated.

- [ ] **Step 2: Update README**

Document the eight-scene architecture, no-backend demo boundary, local assets, `npm run verify:design`, `npm run build`, reduced-motion behaviour and release checklist.

- [ ] **Step 3: Run the full automated gate**

Run:

```bash
npm run verify:design
npm run build
```

Expected: all tests PASS and production build exits 0.

- [ ] **Step 4: Verify browser viewports and interactions**

Check 360×800, 390×844, 768×1024, 1280×800 and 1440×900. Confirm no overflow or clipping, manual hero toggle persistence, keyboard chapter controls, mobile linear story, scanning-state-only motion, readable Albanian copy, contained logos/packshots and reduced-motion behaviour.

- [ ] **Step 5: Commit documentation**

```bash
git add README.md scripts/verify-redesign.mjs
git commit -m "docs: document Krahaso redesign verification"
```

- [ ] **Step 6: Open a draft pull request**

Create a draft PR from `codex/krahaso-apple-revisualisation` to `main` with build results, viewport QA, truthful-data constraints and preview URL. Do not merge until the user approves the preview.

