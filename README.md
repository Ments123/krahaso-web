# Krahaso — public product showcase

The production marketing site for **Krahaso**, a grocery price-comparison and rewards app built for Kosovo. The experience is Albanian-first, mobile-responsive, and structured around one clear product story: **Krahaso → Skano → Fito**.

This redesign uses an Apple-inspired visual approach—large editorial type, focused product demonstrations, generous space, premium device framing, and restrained motion—without copying Apple layouts or branding.

## Stack

- Next.js 14 App Router and TypeScript
- Tailwind CSS
- Lucide icons
- `next/font` with Manrope for display and Inter for body copy
- CSS motion plus `IntersectionObserver`; no heavy animation runtime

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Run the source-contract suite and production build before publishing:

```bash
npm run verify:design
npm run build
npm run start
```

## Experience structure

The single public route is composed in `app/page.tsx`:

1. Cinematic product hero
2. Transparent basket-price problem
3. Scroll-led product journey with compare, receipt scan, and rewards states
4. Trust and price-context principles
5. Retailer/admin story
6. Final download scene and footer

Desktop uses a sticky product stage for the core journey. Mobile renders the same chapters as a direct linear sequence, so no content depends on scroll pinning. All animation respects `prefers-reduced-motion`.

## Project structure

```text
app/
  layout.tsx                 metadata, fonts, locale
  page.tsx                   homepage composition
  globals.css                tokens, motion, responsive behavior
components/
  revamp/                    redesigned public experience and phone states
  ui/                        shared image, logo, reveal, brand, and CTA utilities
data/
  site.ts                    typed illustrative product, price, and logo data
scripts/
  verify-redesign.mjs        design and honesty source-contract tests
docs/superpowers/
  specs/                     approved design direction
  plans/                     implementation plan
```

The previous section components remain in the repository for reference, but the production page is composed exclusively from `components/revamp/` and shared `components/ui/` utilities.

## Demo data and honesty rules

- Prices are illustrative demonstration values and are labeled as such.
- Supermarket marks are used illustratively and do not imply a partnership.
- No ratings, testimonials, download totals, or partner claims are invented.
- Unavailable app-download actions use `SoonButton` and answer with **“Së shpejti”**.
- The public admin destination is `https://admin.krahaso.app`.

The sample basket contains seven grocery items. Its totals range from €22.45 to €25.05, producing the €2.60 comparison shown in the interface.

## Images

Product packshots and supermarket marks live under `public/products/` and `public/logos/`. The configured grocery-market photo is served from Unsplash and allowed in `next.config.mjs`; the redesigned page currently prioritizes the local packshots.

## Deployment

The project is ready for Vercel or any compatible Node host. No environment variables are required for the public frontend.

Before launch:

- Connect the real App Store and Google Play destinations when available.
- Confirm rights and final production usage for retailer marks.
- Replace illustrative prices with the approved live data source.
- Review canonical-domain and deployment settings for `krahaso.app`.
