# Krahaso Apple-Inspired Public Website Redesign

**Date:** 13 July 2026  
**Repository:** `Ments123/krahaso-web`  
**Target:** Production public website at `https://krahaso.app`  
**Status:** Approved design specification

## Purpose

Rebuild the current Krahaso marketing website as a cinematic, motion-led, Apple-inspired product experience that demonstrates how the grocery comparison app helps people in Kosovo compare prices, scan purchases and earn practical rewards.

This is the production public website. It must remain truthful, indexable, accessible, fast and maintainable.

## Approved Direction

The selected direction is **Cinematic Interactive Product Story**.

Three approaches were considered:

1. **Bento-grid landing page:** efficient but too conventional and fragmented.
2. **Editorial campaign site:** distinctive but weaker at explaining the product.
3. **Cinematic interactive product story — selected:** one evolving phone and a controlled scroll narrative make the application the hero.

The design takes inspiration from Apple's restraint, product focus, typography, spacing, motion quality and pacing. It will not copy Apple branding, assets or product language.

## Product and Brand Truths

- Krahaso is a grocery price-comparison and rewards app for Kosovo.
- The public story is **Krahaso → Skano → Fito**.
- The website is Albanian-first.
- The green square and white “K” remain the identifying mark.
- Supermarket logos may appear as illustrative examples with a discreet disclaimer.
- Displayed prices are clearly labelled as illustrative demonstration values.
- No fake ratings, reviews, downloads, users or retailer partnerships.
- Unavailable store links, legal pages and social actions use an honest “Së shpejti” state.
- Admin login remains available but secondary to the consumer journey.

## Goals

1. Explain the product in under ten seconds.
2. Make the brand feel premium, established and intentional.
3. Demonstrate the complete consumer journey without requiring video.
4. Keep the benefit clear: compare a basket, save, scan and earn.
5. Build credibility with consumers, supermarkets, partners and press.
6. Preserve strong SEO, accessibility and mobile performance.
7. Create reusable components that can evolve as the app launches.

## Non-Goals

- Rebuilding the mobile application or connecting the website to the live backend.
- Redesigning the admin prototype or supermarket portal.
- Claiming app-store availability before real links exist.
- Publishing internal comparison-engine details or operational metrics.
- Adding a heavy animation framework, blog, account, checkout or marketplace.

## Visual System

### Colour and Typography

- Warm off-white canvas, clean white surfaces and deep forest-black cinematic sections.
- Krahaso emerald is the dominant accent.
- Orange appears only in comparison moments; blue appears only in reward or information moments.
- Neutral stone supports borders, dividers and secondary copy.
- Replace the playful display treatment with a cleaner premium grotesk.
- Use large concise headlines, generous negative space and narrow readable paragraphs.
- Maintain strong typographic hierarchy at every breakpoint.

### Shape, Surface and Imagery

- Large radii on main scenes and device shells; smaller consistent radii inside the phone.
- Prefer borders and tonal separation before broad, subtle shadows.
- Limit glass effects to navigation or small floating controls.
- Avoid excessive gradient text, neon effects and meaningless decorative blobs.
- The app interface is the primary visual asset.
- Reuse local supermarket logos and product packshots without distortion or cropping.
- Use grocery photography sparingly as a cinematic still life, never generic filler.
- No empty image placeholders.

## Page Architecture

The current long feature stack becomes eight stronger scenes.

### 1. Cinematic Hero

- Near-full-viewport opening with minimal sticky navigation.
- Primary Albanian saving message and concise supporting copy.
- Honest download CTA and secondary product-journey CTA.
- One large interactive phone showing a complete basket comparison.
- Ambient product cards and price labels with slow depth movement.
- Visitors can manually switch between total and per-product views.

### 2. The Price Problem

One basket separates into different supermarket totals. Krahaso aligns the comparison and highlights the cheapest complete option without unsupported statistics.

### 3. Krahaso

The first chapter of a central pinned product stage:

- View a weekly grocery list.
- Compare complete basket totals and availability.
- Highlight the cheapest complete basket.
- Toggle between totals and individual product prices.

### 4. Skano

The same phone transitions into:

- Barcode targeting and product recognition.
- Cross-store price reveal.
- Receipt capture and purchase verification.
- Clear separation between barcode comparison and post-purchase receipt verification.

### 5. Fito

- A verified purchase awards points.
- The balance updates with restrained number animation.
- A practical discount, product or reward becomes available.
- No crypto, gambling or game-like visual language.

### 6. Accuracy and Trust

Explain plainly that prices can vary by store and branch, Krahaso works to keep comparisons accurate, examples are illustrative and users may need to verify prices in store. Do not expose internal matching systems or make unsupported precision claims.

### 7. Supermarket Participation

Explain how retailers can provide prices and offers, improve visibility and reach local shoppers. Keep this secondary to the consumer story and do not turn the homepage into an admin dashboard.

### 8. Download Finale

- Dark cinematic phone composition.
- “Krahaso. Skano. Fito.” close.
- Honest App Store and Google Play availability state.
- Secondary admin login.
- Essential footer navigation and illustrative-data disclaimers.

## Interaction and Motion

Motion must feel calm, authored and useful.

- No scroll hijacking or forced horizontal scrolling.
- No continuous movement that distracts from reading.
- Interaction feedback completes within roughly 300 ms.
- Major scene transitions use controlled 500–800 ms easing.
- `prefers-reduced-motion` removes looping, transform-heavy and scroll-linked motion.
- The hero phone settles into place while price cards drift at different depths.
- Price totals resolve before the cheapest supermarket is highlighted.
- A single phone remains pinned on capable desktop viewports while copy advances.
- Screen changes use crossfades and short directional movement.
- Mobile uses normal vertical flow and never depends on sticky behaviour.
- Buttons, chapter controls and phone toggles remain keyboard and touch accessible.
- Price bars animate once, scan motion runs only during scanning, and reward confirmation occurs once.

## Technical Architecture

Retain the existing stack: Next.js 14 App Router, TypeScript, React 18, Tailwind CSS, `next/font`, `next/image` and the installed Lucide package.

No animation dependency is required. Use CSS, `IntersectionObserver`, pointer events and requestAnimationFrame-throttled scroll measurement.

### Proposed Components

- `SiteHeader`
- `HeroStage`
- `HeroPhone`
- `PriceProblem`
- `ProductJourney`
- `CompareScreen`
- `ScanScreen`
- `RewardScreen`
- `TrustSection`
- `RetailerSection`
- `DownloadFinale`
- `SiteFooter`
- Shared primitives: `BrandMark`, `PhoneShell`, `LogoTile`, `ProductImage`, `Reveal`, `SoonAction`, `SectionLabel`

Each section owns presentation only. Demonstration data remains centralised and typed.

### Data and Existing Code

- Keep product, basket, supermarket, price and FAQ data in `data/site.ts` or focused typed modules when useful.
- Keep state local to interactive client components. Do not add a global state library.
- Keep static rendering as the default.
- Reuse validated data, local assets, honest disclaimers and suitable small utilities.
- Replace the page composition rather than layering a skin over the current structure.
- Remove old sections only after their useful content is represented.
- Avoid unrelated refactoring.

## Responsive Behaviour

### Desktop

Cinematic two-column hero, pinned phone journey, controlled depth and substantial negative space.

### Tablet

Reduced parallax, shorter sticky duration, simplified ambient composition and touch-accessible chapter controls.

### Mobile

Normal vertical flow, app UI filling most of the viewport width, no hover dependency, simplified motion and 44×44 CSS-pixel minimum touch targets.

## Accessibility

- Semantic landmarks and heading order.
- WCAG AA text and control contrast.
- Visible keyboard focus and real buttons for phone controls.
- Appropriate alternative text and hidden decorative imagery.
- No information conveyed by colour alone.
- Reduced-motion support and accessible screen-state changes without noisy live regions.

## SEO and Public-Site Requirements

- Keep the production site indexable with `<html lang="sq">`.
- Use metadata focused on grocery price comparison in Kosovo.
- Canonical URL: `https://krahaso.app`.
- Complete Open Graph metadata.
- Use only factual organisation/software structured data.
- Never add fake review or rating schema.
- Keep meaningful copy server-rendered.
- Add legal routes only when approved content exists; otherwise retain honest unavailable states.

## Performance and Progressive Enhancement

- Keep most components server-rendered.
- Animate transform and opacity only where practical.
- Throttle scroll work and lazy-load below-fold media.
- Reserve dimensions to prevent layout shift.
- Prefer local optimised imagery and avoid autoplay video.
- Keep the value proposition understandable without JavaScript.
- Animation failure leaves all content visible.
- Missing non-critical images do not collapse layout.
- Unsupported sticky or observer behaviour falls back to normal document flow.
- No dead links.

## Verification

### Automated

- TypeScript, production build and lint pass without new warnings.
- No console errors in primary interactions.
- Internal anchors, metadata and canonical URL are correct.

### Responsive Viewports

Verify 360×800, 390×844, 768×1024, 1280×800 and 1440×900 for overflow, clipping, phone visibility, Albanian copy, sticky entry/exit and CTA reachability.

### Interaction

- Hero total/product toggle works and manual selection persists.
- Compare, scan and reward chapters work with keyboard and touch.
- Scan motion runs only in scanning state.
- Points animate once per intended entry.
- “Së shpejti” actions provide clear feedback.
- Reduced-motion mode removes loops and scroll-linked movement.

### Visual QA

- Every major section has a deliberate composition.
- No placeholder or broken images.
- Product packaging and supermarket logos are not distorted or cropped.
- Motion pacing is consistent.
- Apple inspiration remains present through restraint and polish, not imitation.

## Rollout

1. Implement on a dedicated branch when GitHub branch creation is available.
2. Preserve the current production version until build and visual QA pass.
3. Review a Vercel preview across desktop and mobile.
4. Confirm app-store links and legal destinations.
5. Merge only after full-page approval.
6. Monitor Core Web Vitals and client errors after deployment.

## Definition of Done

- The eight-scene narrative is implemented.
- The app is unmistakably the centrepiece.
- Krahaso, Skano and Fito are demonstrated clearly.
- The site feels consistently Apple-inspired from hero to footer.
- All claims remain truthful and suitable for the public website.
- The page is responsive, accessible and reduced-motion safe.
- Build, lint and interaction checks pass.
- A production preview is visually approved before replacing the current site.
