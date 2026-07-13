# Krahaso Cinematic Vite Brand Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the rejected Next.js landing experience with a cinematic, brand-first Vite site built from the supplied LinkFlow reference and video.

**Architecture:** Vite mounts one React application from `src/main.tsx`. `src/BoomerangVideoBg.tsx` owns the supplied frame-capture renderer, while `src/App.tsx` owns the complete responsive brand page. Tailwind and a small global stylesheet provide every transition and reduced-motion fallback.

**Tech Stack:** Vite 5.4, React 18.3, TypeScript 5.5, Tailwind CSS 3.4, lucide-react 0.344

## Global Constraints

- Use the supplied CloudFront video URL unchanged.
- Load the supplied Inter and Neue Haas font URLs in `index.html`.
- Use the supplied green palette exactly.
- Do not install Next.js, Framer Motion or another animation library.
- Keep copy minimal and Albanian-first.
- Use only `LogIn`, `UserPlus`, `Play`, `Sparkles`, `Menu` and `X` from lucide-react.
- Unavailable download actions must answer with “Së shpejti”.
- Admin links must target `https://admin.krahaso.app`.
- All looping or transform-heavy motion must stop under `prefers-reduced-motion`.

---

### Task 1: Replace the runtime foundation with Vite

**Files:**
- Modify: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Modify: `tailwind.config.ts`
- Create: `postcss.config.js`
- Modify: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `src/vite-env.d.ts`
- Create: `src/main.tsx`
- Create: `src/index.css`
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Produces: a Vite entry that renders `App` into `#root` and scripts `dev`, `build`, `preview`, `verify:design`.

- [ ] **Step 1: Replace the source-contract test with Vite foundation assertions**

Assert that `package.json` uses `vite`, `index.html` contains `#root` and the three supplied font links, the stylesheet contains the Neue Haas stack and reduced-motion media query, and Next/Framer are absent.

- [ ] **Step 2: Run the contract test and verify it fails**

Run: `npm run verify:design`
Expected: FAIL because the Vite entry files do not exist yet.

- [ ] **Step 3: Add the Vite foundation**

Use scripts:

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "verify:design": "node --test scripts/verify-redesign.mjs"
}
```

Mount the app with:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
);
```

- [ ] **Step 4: Install dependencies and verify the foundation**

Run: `npm install --cache /tmp/krahaso-vite-npm-cache && npm run verify:design`
Expected: foundation contract passes; component contracts may still fail.

### Task 2: Add the supplied boomerang video renderer

**Files:**
- Create: `src/BoomerangVideoBg.tsx`
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Produces: `default function BoomerangVideoBg({ src, className }: Props)`.
- Consumes: a CloudFront video URL from `App.tsx`.

- [ ] **Step 1: Add a failing boomerang contract**

Check for `requestVideoFrameCallback`, `MAX_WIDTH = 960`, canvas rendering, 30fps timing, `muted`, `playsInline` and `crossOrigin="anonymous"`.

- [ ] **Step 2: Run the contract and verify it fails**

Run: `npm run verify:design`
Expected: FAIL because `src/BoomerangVideoBg.tsx` does not exist.

- [ ] **Step 3: Add the user-supplied component unchanged**

Copy the supplied implementation into `src/BoomerangVideoBg.tsx`, preserving its props and capture/render effects.

- [ ] **Step 4: Run the contract**

Run: `npm run verify:design`
Expected: boomerang contract passes.

### Task 3: Build the complete Krahaso brand page

**Files:**
- Create: `src/App.tsx`
- Modify: `src/index.css`
- Modify: `scripts/verify-redesign.mjs`

**Interfaces:**
- Consumes: `BoomerangVideoBg` and the supplied CloudFront URL.
- Produces: the entire public landing page as the default `App` export.

- [ ] **Step 1: Add failing brand-page contracts**

Assert the source contains the video URL, `Krahaso`, `Skano`, `Fito`, mobile-menu state, the six allowed icon names, `https://admin.krahaso.app`, `Së shpejti`, and five semantic page scenes.

- [ ] **Step 2: Run the contract and verify it fails**

Run: `npm run verify:design`
Expected: FAIL because `src/App.tsx` does not exist.

- [ ] **Step 3: Implement the video hero**

Adapt the supplied reference with:

```tsx
const navLinks = [
  { href: '#krahaso', label: 'Krahaso' },
  { href: '#skano', label: 'Skano' },
  { href: '#fito', label: 'Fito' },
];
```

Use headline `Çmimet ndryshojnë. Zgjedhja jote nuk duhet.` and accent `Krahaso. Skano. Fito.` Keep admin access and a download CTA that changes to `Së shpejti`.

- [ ] **Step 4: Continue the reference language below the fold**

Add a short manifesto, three oversized brand panels, one clean phone-shaped app glimpse, and a final video/forest closing scene. Keep copy short; do not add FAQs, dashboards, fake metrics, partner claims or long explanations.

- [ ] **Step 5: Complete responsive and reduced-motion behavior**

Keep the supplied mobile drawer transition and stagger. Use CSS hover/reveal transitions, ensure navigation and CTAs are keyboard operable, and disable looping/staggered motion in reduced-motion mode.

- [ ] **Step 6: Run contracts and production build**

Run: `npm run verify:design && npm run build`
Expected: all tests pass and Vite writes `dist/` successfully.

### Task 4: Remove the rejected runtime and update the draft PR

**Files:**
- Delete from the feature branch: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `next-env.d.ts`, `next.config.mjs`, `components/revamp/*`
- Modify: `README.md`
- Modify: draft PR #1

**Interfaces:**
- Produces: a branch whose active runtime is exclusively Vite and whose PR description matches the replacement design.

- [ ] **Step 1: Remove rejected branch-only components and Next runtime files**

Delete the files through GitHub’s contents API after the Vite build is green. Leave reusable public logos and product packshots intact.

- [ ] **Step 2: Replace the README**

Document the Vite commands, video source, Neue Haas/Inter fonts, minimal page structure, honesty rules and `Së shpejti` behavior.

- [ ] **Step 3: Run fresh completion verification**

Run: `npm run verify:design && npm run build`
Expected: zero contract failures, zero TypeScript errors and a successful Vite production build.

- [ ] **Step 4: Update GitHub and wait for Vercel**

Push file replacements to `codex/krahaso-apple-revisualisation`, update draft PR #1 title/body, confirm the PR is mergeable, and confirm Vercel reports `success` for the new head SHA.
