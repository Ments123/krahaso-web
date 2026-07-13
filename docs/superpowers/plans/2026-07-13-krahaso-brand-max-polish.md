# Krahaso Brand-Max Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the approved video hero while rebuilding every following scene into a denser, mobile-first Krahaso brand experience with no emoji artwork and only one product packshot.

**Architecture:** Keep the existing Vite single-page structure and user-supplied boomerang renderer. Recompose the brand sections in `src/App.tsx`, centralise the new visual primitives in `src/index.css`, and lock the visual contract in the existing Node test file.

**Tech Stack:** Vite 5.4, React 18, TypeScript 5.5, Tailwind CSS 3.4, lucide-react, CSS transitions/keyframes only.

## Global Constraints

- Preserve the current hero video, typography, copy and composition.
- Use no Framer Motion and add no dependencies.
- Use no emoji-style grocery artwork or emoji glyphs.
- Use no more than one grocery product image on the whole page.
- Ensure that product image has no visible white rectangle in the rendered pale scene.
- Keep `https://admin.krahaso.app`, the mobile menu and honest `Së shpejti` states working.
- Honour `prefers-reduced-motion`.
- Keep the pull request in draft and leave `main` untouched.

---

### Task 1: Lock the brand-max visual contract

**Files:**
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: the complete UTF-8 source of `src/App.tsx` and `src/index.css`.
- Produces: regression assertions for one product reference, removed emoji assets and required dense-scene primitives.

- [ ] **Step 1: Write the failing assertions**

Add these checks to the cinematic brand test:

```js
const productReferences = app.match(/\/products\//g) ?? [];
assert.equal(productReferences.length, 1);
assert.doesNotMatch(app, /bread\.svg|banana\.svg|✓|🥖|🍌/u);
assert.match(app, /comparison-signal/);
assert.match(app, /receipt-plane/);
assert.match(app, /reward-orbit/);
assert.match(app, /closing-k/);
assert.match(css, /product-cutout/);
assert.match(css, /brand-drift/);
assert.match(css, /closing-k/);
```

- [ ] **Step 2: Run the contract and verify red**

Run: `npm run verify:design`

Expected: the cinematic brand test fails because the current source contains four product references, the emoji-style SVGs and none of the new primitives.

- [ ] **Step 3: Keep the test red until Tasks 2 and 3 are complete**

Do not weaken the assertions or add marker-only comments. Each required class must correspond to a rendered visual element or active CSS rule.

---

### Task 2: Recompose the brand scenes

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: existing `BrandMark`, `showSoon`, navigation state and the single `/products/coffee.png` packshot.
- Produces: rendered elements with the class hooks `comparison-signal`, `receipt-plane`, `reward-orbit` and `closing-k`.

- [ ] **Step 1: Preserve the hero**

Leave the JSX from the opening `<section aria-labelledby="hero-title">` through its closing tag unchanged.

- [ ] **Step 2: Replace the comparison composition**

Use one coffee packshot inside a `product-cutout` wrapper. Surround it with a large K watermark, two restrained price signals and one highlighted decision card. The section order on mobile must be label, headline, supporting line, then composition, with no `justify-between` dead zone.

Required structure:

```tsx
<div className="comparison-signal ...">
  <span>Çmimi më i mirë</span>
  <strong>€3.19</strong>
</div>
<img src="/products/coffee.png" alt="Pako kafeje" className="product-cutout ..." />
```

Keep `Çmime ilustruese` visible near the price composition.

- [ ] **Step 3: Replace the scanner composition**

Move the phone directly below the message on mobile and place two abstract receipt sheets behind it. Each sheet uses `receipt-plane`; the foreground phone retains the moving scan line and barcode.

Required structure:

```tsx
<div className="receipt-plane receipt-plane-left" aria-hidden="true" />
<div className="receipt-plane receipt-plane-right" aria-hidden="true" />
```

- [ ] **Step 4: Densify the rewards composition**

Keep the 1,240 points card, add one compact `+85 pikë` card and wrap the composition in `reward-orbit`. Use rings, progress and typography only; include no grocery media.

- [ ] **Step 5: Tighten the app and retailer scenes**

Reduce mobile top/bottom spacing, start the phone composition earlier and replace the `✓` glyph with a typographic `K` state. Preserve existing calls to action and admin link.

- [ ] **Step 6: Rebuild the closing scene**

Remove both product `<img>` elements. Add one oversized `closing-k` element, two decorative orbit rings and the current brand statement and download button. Reduce the mobile minimum height so the footer follows the call to action without a dead lower region.

---

### Task 3: Build the dense responsive visual system

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: the class hooks emitted by Task 2.
- Produces: responsive composition, background suppression, depth and CSS-only motion.

- [ ] **Step 1: Add product background suppression**

```css
.product-cutout {
  mix-blend-mode: multiply;
  filter: drop-shadow(0 32px 28px rgba(31, 42, 29, 0.2));
  isolation: isolate;
}
```

The product appears only on the pale green comparison scene; do not use multiply-blended media on dark backgrounds.

- [ ] **Step 2: Add the brand primitives**

Define active styles for `.comparison-signal`, `.receipt-plane`, `.reward-orbit` and `.closing-k`. Use palette colours from the existing page, translucent borders, gradients and restrained shadows.

- [ ] **Step 3: Add CSS-only drift**

Create `@keyframes brand-drift` and apply it to the comparison K, receipt planes and closing rings at slow, differing durations. Do not animate core copy or controls.

- [ ] **Step 4: Fix mobile density**

In the `max-width: 639px` block:

```css
.brand-panel {
  min-height: auto;
}

.brand-scene {
  min-height: 0;
}
```

Support the class changes with Tailwind spacing in `App.tsx`: compact panel padding, explicit composition heights and normal flow. Ensure the label, message and visual occupy one coherent mobile screen.

- [ ] **Step 5: Preserve reduced motion**

Confirm the existing reduced-motion override disables `brand-drift`, scanner, float and reveal animations.

---

### Task 4: Remove rejected assets and verify the delivery

**Files:**
- Delete: `public/products/bread.svg`
- Delete: `public/products/banana.svg`
- Delete: `public/products/milk.png`
- Verify: `src/App.tsx`
- Verify: `src/index.css`
- Verify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: the completed brand scenes and CSS.
- Produces: a passing build, a green Vercel deployment and an updated draft PR.

- [ ] **Step 1: Delete unused product media**

Remove the bread, banana and milk files from the feature branch. Keep only `public/products/coffee.png`.

- [ ] **Step 2: Run the design contract**

Run: `npm run verify:design`

Expected: 4 tests pass, 0 fail.

- [ ] **Step 3: Run the production build**

Run: `npm run build`

Expected: TypeScript completes and Vite writes `dist/` with exit code 0.

- [ ] **Step 4: Review React quality**

Check hook cleanup, semantic elements, image alt text, mobile drawer focus safety and reduced-motion support. Make only fixes within the approved polish scope.

- [ ] **Step 5: Sync and verify GitHub**

Push the changed source, tests and asset deletions to `codex/krahaso-apple-revisualisation`. Confirm PR #1 remains open, draft, mergeable and unmerged.

- [ ] **Step 6: Verify Vercel**

Confirm the Vercel status for the final head SHA is `success` and hand off the new preview URL.
