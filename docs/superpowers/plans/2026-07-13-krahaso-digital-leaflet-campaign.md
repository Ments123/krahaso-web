# Krahaso Digital Leaflet Campaign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the visible product background and reposition the lower page around Krahaso as Kosovo's digital alternative to supermarket leaflets, with barcode-first comparison and receipt scanning reserved for rewards.

**Architecture:** Keep the current single-page React structure and CSS-only motion system. Update the design-contract test first, create one transparent product asset, then revise only the manifesto, Skano, Fito, and app-showcase content and decorative CSS; the approved hero and closing scene remain unchanged.

**Tech Stack:** Vite 5, React 18, TypeScript 5.5, Tailwind CSS 3.4, lucide-react, Node test runner, CSS animations.

## Global Constraints

- Keep the approved video hero unchanged.
- Use exactly one product image reference across the page.
- Use product-barcode scanning as the main scanning story.
- Mention receipt scanning only in the rewards scene.
- Do not claim that every supermarket is already connected and do not use a fixed supermarket count.
- Preserve CSS-only motion and `prefers-reduced-motion` support.
- Add no dependencies, supermarket logos, emojis, or extra grocery imagery.
- Keep PR #1 draft and unmerged.

---

### Task 1: Lock the revised brand contract

**Files:**
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: rendered copy and class names in `src/App.tsx` and `src/index.css`
- Produces: a regression contract for campaign wording, barcode-first scanning, receipt-only rewards, and the transparent product asset

- [ ] **Step 1: Write failing assertions**

Add assertions that require `Harro fletushkat`, `Skano barkodin`, `Barkodi u njoh`, `Skano faturën`, and `/products/coffee-cutout.svg`. Assert that `mix-blend-mode: multiply`, `/products/coffee.png`, `Një aplikacion. Një ritëm.`, and `3 shitore` are absent.

- [ ] **Step 2: Run the design test and confirm red**

Run: `npm run verify:design`

Expected: the brand-experience test fails because the new campaign copy and transparent asset reference are not implemented yet.

- [ ] **Step 3: Keep the failing test for implementation**

Do not weaken the assertions. The next tasks must make this exact contract pass.

---

### Task 2: Create the transparent product cutout

**Files:**
- Create: `public/products/coffee-cutout.svg`
- Retain: `public/products/coffee.png` as the source image only

**Interfaces:**
- Consumes: the existing Prince Caffe product photo
- Produces: `/products/coffee-cutout.svg`, a browser-renderable transparent cutout that preserves the package and its printed white areas

- [ ] **Step 1: Create a chroma-key edit**

Use the image-editing workflow with the existing coffee source as the edit target. Change only the outer white background to a perfectly flat green key; preserve the product, proportions, colours, branding, package text, and white printed areas.

- [ ] **Step 2: Convert the key to transparency and validate alpha**

Run the installed `remove_chroma_key.py` helper with border auto-keying, soft matte, despill, and a one-pixel edge contraction if required. Confirm transparent corners and no green fringe.

- [ ] **Step 3: Package the binary cutout for GitHub contents sync**

Encode the alpha WebP/PNG as a data URI inside `coffee-cutout.svg`. The SVG must contain only the transparent image at its native aspect ratio and no background rectangle.

- [ ] **Step 4: Inspect the asset**

Render the SVG over both white and `#dfe9dc`. Confirm that the original rectangular canvas is gone and the pack's white printing remains visible.

---

### Task 3: Reposition the lower-page story

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `/products/coffee-cutout.svg`
- Produces: the approved digital-leaflet campaign, barcode-first scanner scene, receipt-reward scene, and clearer app-showcase mockup

- [ ] **Step 1: Replace the product source and blend workaround**

Change the comparison image to `/products/coffee-cutout.svg`. Remove `mix-blend-mode: multiply` and retain only a restrained drop shadow and drift animation.

- [ ] **Step 2: Rewrite the manifesto**

Use `Harro fletushkat. Mirë se erdhe te Krahaso.` and `Po i sjellim çmimet e supermarketeve të Kosovës në një vend.`

- [ ] **Step 3: Convert Skano to barcode-first**

Use `Skano barkodin. Shih ku kushton më lirë.`, `Një skanim të çon te çmimet e produktit në supermarketet e listuara në Krahaso.`, `Vendose barkodin brenda kornizës.`, and `Barkodi u njoh.` Rename `receipt-plane` classes to `price-plane` and style the CSS-generated layers as digital product-price results rather than receipts.

- [ ] **Step 4: Isolate receipt scanning to rewards**

Use `Skano faturën. Fito shpërblime.`, `Ruaje faturën, mblidh pikë dhe përfito nga blerjet e tua.`, and `Mblidh më shumë pikë.` Keep the existing points composition.

- [ ] **Step 5: Rewrite the app showcase**

Use `Aplikacioni që po prisje.` and `Harro fletushkat. Çmimet tani janë në xhepin tënd.` In the phone use `Supermarketet e Kosovës`, `Një kërkim larg.`, `Krahasimi i produktit`, `Çmimet në një vend`, `Zgjidh më lirë`, `Skano / Barkodin`, and `Fito / Shpërblime`.

- [ ] **Step 6: Run design tests and build**

Run: `npm run verify:design && npm run build`

Expected: 4 tests pass, zero failures, and the Vite production build exits 0.

---

### Task 4: Review and deploy the draft revision

**Files:**
- Review: `src/App.tsx`
- Review: `src/index.css`
- Review: `scripts/verify-redesign.mjs`
- Review: `public/products/coffee-cutout.svg`

**Interfaces:**
- Consumes: the completed local revision
- Produces: an updated draft PR and Vercel preview ready for user review

- [ ] **Step 1: Run the React best-practices review**

Check semantic HTML, hooks, image alt/loading behaviour, menu accessibility, and reduced-motion behaviour. Make only scoped fixes.

- [ ] **Step 2: Run mobile visual verification**

Capture the manifesto, Krahaso, Skano, Fito, and app showcase at a mobile viewport. Confirm clean Albanian wrapping, no white product rectangle, barcode language only in Skano, and receipt language only in Fito.

- [ ] **Step 3: Sync reviewed files to the existing branch**

Update `codex/krahaso-apple-revisualisation` and keep PR #1 open, draft, and unmerged.

- [ ] **Step 4: Verify the remote head**

Confirm remote file parity, `main` remains untouched, the branch is not behind `main`, the PR is mergeable and unmerged, and Vercel reports `success`.

---

### Task 5: Complete the approved pre-publish pass

**Files:**
- Modify: `scripts/verify-redesign.mjs`
- Modify: `src/App.tsx`
- Modify: `index.html`
- Create: `public/app/krahaso-home.webp`
- Create: `public/favicon.png`
- Create: `public/krahaso-social.webp`

- [ ] **Step 1: Lock the real-screen and publishing contract**

Require the real app screenshot, honest launch state, barcode-first metadata, favicon, canonical URL, and social metadata. Confirm the test fails before implementation.

- [ ] **Step 2: Import the real screen and remove the fabricated UI**

Encode the supplied capture as WebP and render it edge-to-edge inside the existing phone frame. Remove the fake Dynamic Island, fabricated cards, tiles, and in-phone CTA.

- [ ] **Step 3: Finish the publishing surface**

Use **Vjen së shpejti** until store links exist, add the missing favicon and social metadata, and create a landscape share card from the approved brand surface.

- [ ] **Step 4: Verify locally and remotely**

Run the design contract, production build, mobile visual QA, remote parity checks, and Vercel deployment check while keeping PR #1 draft and unmerged.
