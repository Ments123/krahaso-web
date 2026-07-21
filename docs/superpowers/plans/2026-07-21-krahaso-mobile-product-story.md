# Krahaso Mobile Product Story Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the content below Krahaso’s existing cinematic hero into a denser, mobile-first product story that explains barcode comparison quickly and converts naturally into app interest and partner interest.

**Architecture:** Keep the Vite/React/Tailwind runtime and hero video unchanged. Replace the poster-like middle stack with one continuous journey section composed from focused React components and CSS-only view reveals; retain the real app screenshot as the main proof asset and keep receipt rewards explicitly secondary.

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind CSS 3, Lucide React, CSS scroll-driven enhancement with a no-animation fallback.

## Global Constraints

- Preserve the live hero video, approved hero wording, Krahaso green palette and transparent coffee packshot.
- Product-barcode scanning is the primary action; receipt scanning appears only in rewards.
- Do not claim a fixed supermarket count, official partnerships, user totals, ratings or app-store availability.
- Use one hero video only; below-fold storytelling uses CSS, the existing packshot and the real app screenshot.
- Mobile uses normal vertical flow, at least 44px touch targets and no hover dependency.
- Reduced-motion mode must expose all content without animation.
- Work on a fresh branch from current `main`; production remains untouched until explicit approval.

---

### Task 1: Lock the new mobile-first design contract

**Files:**
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: current `src/App.tsx` and `src/index.css`.
- Produces: source assertions for the journey rail, editorial accent, barcode-first order, authentic screenshot and compact mobile behaviour.

- [ ] Add a failing test requiring `product-journey`, `journey-step`, `editorial-accent`, `app-proof`, `partner-card`, `mobile-compact`, and a receipt-only reward statement.
- [ ] Run `npm run verify:design` and confirm the new test fails because the new structure does not yet exist.
- [ ] Commit the red contract with the implementation files in the green commit.

### Task 2: Build the continuous product journey

**Files:**
- Create: `src/components/ProductJourney.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Produces: `ProductJourney()` containing three semantic articles: compare, barcode scan, receipt rewards.
- Reuses: `/products/coffee-cutout.svg`, existing illustrative prices and existing brand motion primitives.

- [ ] Move the three current scenes into `ProductJourney` and rewrite their shell as one top-down sequence with a numbered rail.
- [ ] Keep barcode scan in step 2 and receipt rewards only in step 3.
- [ ] Add compact mobile dimensions, smaller headings and shared visual stages that fit within normal document flow.
- [ ] Run the design test and build; confirm all checks pass.

### Task 3: Turn the real app screen into the proof moment

**Files:**
- Create: `src/components/AppProof.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Produces: `AppProof()` using `/app/krahaso-home.webp` inside the existing device shell.

- [ ] Introduce a short editorial transition: “Fletushkat ishin dje. Çmimet tani janë në xhepin tënd.”
- [ ] Place the authentic screenshot beside three concise benefits: search, barcode comparison and informed choice.
- [ ] Keep the image lazy-loaded with explicit alt text and stable dimensions.
- [ ] Run tests and production build.

### Task 4: Tighten partner and launch conversion

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Modify: `index.html`

**Interfaces:**
- Keeps: `#partneret`, `#shkarko`, honest `Vjen së shpejti`, and the admin URL.

- [ ] Convert the partner section to a compact premium card explaining the value to supermarkets without claiming partnership.
- [ ] Make the finale a concise launch moment with the K mark, an honest availability state and a route back to the product story.
- [ ] Confirm metadata remains barcode-first and factual.
- [ ] Run `npm run verify:design && npm run build`.

### Task 5: Visual and release verification

**Files:**
- Modify: `README.md`

**Interfaces:**
- Produces: a fresh preview branch and draft PR from current `main`.

- [ ] Review at 390px and 1440px widths, checking overflow, line wrapping, touch targets and screenshot crop.
- [ ] Confirm reduced-motion mode, keyboard navigation and no browser console errors.
- [ ] Update README architecture notes.
- [ ] Push the verified branch, open a draft PR and wait for Vercel preview success.

---

## Self-review

- Spec coverage: hero preservation, mobile rhythm, barcode priority, real screenshot, receipt-only rewards, partner story, honest CTA and lightweight motion are each covered.
- Placeholder scan: no TBD or deferred implementation steps.
- Type consistency: the two new components expose parameterless React component interfaces and reuse existing static assets.
