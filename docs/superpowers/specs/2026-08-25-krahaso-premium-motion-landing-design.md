# Krahaso Premium Motion Landing Page Design

## Status

Approved implementation design, adapted to the production repository after the 25 August 2026 audit.

## Goal

Make `krahaso.app` feel like a premium consumer product while communicating, within seconds, that Krahaso helps Kosovo shoppers check prices and offers before buying. Google Play is the primary conversion; iOS remains `iOS — së shpejti`.

## Production findings

- The site is a Vite 5 React 18 SPA deployed through Vercel.
- The current homepage renders only a video-backed hero and footer.
- SEO metadata, canonicalisation, crawler files, JSON-LD, analytics, UTM preservation, the Play Store URL and Vercel headers/redirects already work and must remain.
- Framer Motion exists, but GSAP/ScrollTrigger and Lenis do not.
- Normal document scrolling is the only scroll coordinate system.
- The website contains one current, genuine Play-installed app screenshot: `public/app/krahaso-home.webp`. It visibly contains search, offers, basket, barcode scan and rewards entry points.
- The repository contains genuine retailer logos and product packshots, but its old numeric comparison examples are explicitly illustrative.
- Release evidence confirms that five current Play Store screenshots exist, but those files are not present in either repository and cannot be retrieved through the connected tools.
- There are not three repository-backed, genuine price comparisons suitable for the requested sequential price deck.

## Page structure

1. Compact fixed navigation
2. Calm product hero
3. Pinned Visual Universe
4. Feature Story: Kërko → Ofertat → Skano → Shporta → Fito
5. Genuine offers proof (not a fabricated price-card deck)
6. Calm download CTA
7. Minimal footer

One `h1` is used: `Krahaso para se të blesh.`

## Visual system

- Off-white paper background, near-black/deep-green text and restrained Krahaso green.
- The real app screenshot is the dominant artwork.
- The real favicon/app icon is used as the brand image in navigation and footer; no CSS-drawn generic K mark.
- Product packshots and retailer logos are supporting assets only.
- Borders, whitespace and surface contrast establish hierarchy. Shadows are reserved for phone separation and physical card overlap.
- The external fantasy bridge video and its visual treatment leave the public homepage.

## Motion architecture

- Add `gsap` as the only new runtime dependency and use `ScrollTrigger`.
- Do not add Lenis, Three.js or SplitText.
- Register ScrollTrigger once in `src/motion/gsap.ts`.
- Each motion section owns its root ref, `gsap.context()`, triggers, `gsap.matchMedia()` branch and cleanup.
- Desktop Visual Universe uses one non-scrubbed progress renderer, `pinSpacing:false`, an explicit runway and a separate scrubbed exit trigger.
- Desktop Feature Story uses one intro pin, four card pins and four Y-only inner peel triggers. Fito is not pinned.
- Mobile keeps the same semantic markup but replaces the desktop card pins with a readable document-flow/sticky treatment.
- The offers proof is deliberately static/lightly revealed because verified multi-card price data is unavailable.
- Reduced motion creates no long pins or scroll choreography.

## Real-screen strategy

The feature chapters reuse the single current app screenshot without redrawing or inventing UI. Each chapter changes only the phone crop/focus treatment to point at a genuine visible area: search, the offers rail, barcode controls, Shporta navigation and Fito/banner. The image pixels remain unchanged.

## Copy constraints

- `Kërko`: find a product by name or category.
- `Ofertat`: view offers Krahaso has available.
- `Skano`: scan a barcode to find a product faster; do not promise every barcode returns a comparison.
- `Shporta`: compare basket totals when the necessary data exists.
- `Fito`: submit a receipt for verification and earn points when accepted.
- Do not claim all supermarkets/products are covered or that every receipt earns points.

## Infrastructure preservation

- Keep the canonical URL, robots, sitemap, favicon, JSON-LD and Vercel host redirect.
- Keep analytics and UTM-preserving Play Store links.
- Keep the admin link as a quiet utility link.
- Add only verified legal/support links: privacy, account deletion and `privacy@krahaso.app`. Omit Terms because no approved Terms route exists.

## Accessibility and resilience

- Progressive HTML renders all headings, copy, screenshots and links before motion initialises.
- Focus states, 44px targets, meaningful alt text, logical heading order and safe-area padding remain.
- At reduced motion and large effective text widths, content stays in normal flow.
- No essential focusable control lives in a moving pinned layer.
- No horizontal overflow or duplicated desktop/mobile content.

## Verification

- Component-render and pure progress-math tests.
- Existing production-contract tests, updated to protect the new truthful structure.
- TypeScript and Vite production build.
- Real Chromium checks at 1440×900, 1280×800, 768px, 390×844 and 360px.
- Reduced-motion, 200% zoom, forward/backward scroll, console, overflow, hash navigation and CTA checks.
- Capture and inspect the required desktop/mobile screenshots, then perform a final design-removal pass.

## Intentional omission

The sequential numeric price deck is omitted until at least three current, genuine comparisons can be supplied. Shipping made-up prices would violate the product and the approved brief. The section becomes a genuine offers proof built from the current Play-installed screen.
