# Krahaso Partner Language Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the narrow retail term “shitoret” with the broader brand term “partnerët” everywhere it appears in the public interface.

**Architecture:** This is a copy-and-anchor migration contained within `src/App.tsx`, protected by the existing source-contract test. The admin destination and section headline remain unchanged.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind CSS 3.4, Node source-contract tests

## Global Constraints

- Use `Partnerët` in the navigation.
- Use `Për partnerët` as the retailer section eyebrow.
- Rename the section anchor to `partneret` and update every internal link.
- Preserve `Bëhu pjesë e zgjedhjes.` and `https://admin.krahaso.app`.
- Do not add dependencies or alter layout.

---

### Task 1: Partner terminology and anchor

**Files:**
- Modify: `scripts/verify-redesign.mjs`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: existing source-contract test runner and in-page anchor navigation
- Produces: `#partneret`, `Partnerët`, and `Për partnerët`

- [ ] **Step 1: Write the failing source-contract test**

Add assertions requiring `Partnerët`, `Për partnerët`, and `id="partneret"`, while rejecting `shitore` case-insensitively.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run verify:design`

Expected: FAIL because `src/App.tsx` still contains `Për shitoret` and `per-shitoret`.

- [ ] **Step 3: Implement the approved wording**

Replace both navigation labels with `Partnerët`, the section eyebrow with `Për partnerët`, and all `#per-shitoret`/`per-shitoret` anchors with `#partneret`/`partneret`.

- [ ] **Step 4: Verify the change**

Run: `npm run verify:design`

Expected: 5/5 source-contract tests pass.

Run: `npm run build`

Expected: Vite production build completes successfully.

- [ ] **Step 5: Publish and verify**

Commit the two source changes and this plan to `main`, wait for Vercel to report success, then confirm `https://krahaso.app/` contains `Partnerët` and no longer contains `shitore`.
