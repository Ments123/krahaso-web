# Krahaso Hero Copy Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the vague hero wording with the approved anti-leaflet campaign and rewrite the manifesto immediately below it so the two sections complement rather than repeat one another.

**Architecture:** Change copy only inside the existing hero and manifesto markup. Preserve the video, layout, typography, palette, navigation, barcode/rewards story, product cutout, real app screenshot, partner language, and all current interactions.

**Tech Stack:** Vite 5, React 18, TypeScript 5, Tailwind CSS 3.4, Node test runner.

## Global Constraints

- Start from current `main` commit `00059f32d4f1dc35f56ebf3de4dfdb20d49ed290`.
- Work on `codex/krahaso-hero-copy-refinement`; do not write directly to `main`.
- Do not change the hero layout or CloudFront video.
- Keep the page barcode-first and receipt-for-rewards.
- Keep current partner terminology, real app screenshot, transparent SVG product cutout, and `Vjen së shpejti` states.
- Keep the pull request draft and unmerged.

---

### Task 1: Lock the approved copy contract

**Files:**
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: `src/App.tsx` as UTF-8 source.
- Produces: regression protection for the approved hero and complementary manifesto.

- [ ] Add these assertions to the existing brand-experience test:

```js
assert.match(app, /Harro fletushkat/);
assert.match(app, /Krahaso më zgjuar/);
assert.match(app, /Skano barkodin, krahaso çmimet dhe zgjidh më lirë, direkt nga telefoni/);
assert.match(app, /Ti zgjedh produktin/);
assert.match(app, /Krahaso të tregon ku/);
assert.match(app, /Çmimet e supermarketeve, të mbledhura në një vend që ti të zgjedhësh më lirë/);
assert.doesNotMatch(app, /Çmimet ndryshojnë|Zgjedhja jote nuk duhet|Mirë se erdhe te Krahaso/);
```

- [ ] Run `npm run verify:design` and confirm the brand-experience test fails before implementation.

- [ ] Commit the remote test update with message `test: lock the new Krahaso hero campaign`.

---

### Task 2: Replace hero and manifesto copy

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: the existing hero `h1`/paragraph and manifesto eyebrow/`h2`/paragraph.
- Produces: the final copy protected by Task 1.

- [ ] Replace the hero heading with:

```tsx
Harro fletushkat.
<span className="block text-[#85AB8B]">Krahaso më zgjuar.</span>
```

- [ ] Replace the hero supporting line with:

```text
Skano barkodin, krahaso çmimet dhe zgjidh më lirë, direkt nga telefoni.
```

- [ ] Replace the manifesto eyebrow with `Mënyra e re për të blerë`.

- [ ] Replace the manifesto heading with:

```tsx
Ti zgjedh produktin.<br />
<span className="text-[#85AB8B]">Krahaso të tregon ku.</span>
```

- [ ] Replace the manifesto supporting line with:

```text
Çmimet e supermarketeve, të mbledhura në një vend që ti të zgjedhësh më lirë.
```

- [ ] Run `npm run verify:design && npm run build`; expect all tests and the production build to pass.

- [ ] Commit the remote App update with message `feat: sharpen the Krahaso hero campaign`.

---

### Task 3: Document and verify the protected branch

**Files:**
- Modify: `docs/superpowers/specs/2026-07-13-krahaso-digital-leaflet-campaign-design.md`
- Create: `docs/superpowers/plans/2026-07-18-krahaso-hero-copy-refinement.md`

**Interfaces:**
- Consumes: the approved campaign wording and current draft branch.
- Produces: durable design/implementation records and deployment evidence.

- [ ] Update the spec with the approved hero copy and complementary manifesto rationale.

- [ ] Commit the spec and this plan to `codex/krahaso-hero-copy-refinement`.

- [ ] Open a new draft PR against `main` titled `feat: sharpen the Krahaso hero campaign`.

- [ ] Review hero and manifesto at a 390-pixel viewport and confirm both headings wrap cleanly without overlap.

- [ ] Confirm the PR is open, draft, mergeable, and unmerged; the branch is ahead of and not behind `main`; and Vercel reports `success` for the final head.

