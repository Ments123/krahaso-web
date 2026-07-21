# Krahaso — cinematic brand site

A minimal, Albanian-first brand experience for **Krahaso**, built around one simple rhythm: **Krahaso. Skano. Fito.**

The visual direction combines the supplied full-screen video reference with a compact mobile product story: restrained Neue Haas typography, editorial serif accents, forest greens, translucent navigation and purposeful CSS motion.

## Stack

- Vite 5.4
- React 18.3 and TypeScript 5.5
- Tailwind CSS 3.4
- lucide-react
- No Next.js, Framer Motion or animation dependency

## Run locally

```bash
npm install
npm run dev
```

Vite serves the site at `http://localhost:5173` by default.

## Verify and build

```bash
npm run verify:design
npm run build
npm run preview
```

The source-contract suite protects the approved stack, font treatment, video renderer, brand structure, accessibility hooks and honest CTA states.

## Structure

```text
index.html                    metadata and external font links
src/
  App.tsx                     hero, navigation, partner and launch composition
  BoomerangVideoBg.tsx        supplied frame-capture video renderer
  components/
    ProductJourney.tsx        compare → barcode scan → receipt rewards story
    AppProof.tsx              authentic app screenshot and product benefits
  index.css                   Tailwind layers and brand motion
  main.tsx                    Vite React entry
public/
  products/                   local grocery packshots
  logos/                      existing illustrative retailer marks
scripts/
  verify-redesign.mjs         source-contract tests
```

## Video and typography

The opening video is loaded from the supplied CloudFront URL and rendered by `BoomerangVideoBg` as a seamless forward/reverse loop. The component captures at a maximum width of 960 pixels and replays at 30fps.

`index.html` loads Inter plus Neue Haas Grotesk Text and Display. The Neue Haas stack is used throughout the brand experience with Helvetica fallbacks.

## Brand and honesty rules

- Public copy stays short and brand-led.
- The core story is **Krahaso. Skano. Fito.**
- Barcode scanning is the primary comparison action.
- Receipt scanning appears only in the rewards step.
- The real app screenshot is the main proof asset below the product journey.
- Example prices are marked as illustrative.
- Download actions answer with **Së shpejti** until store links exist.
- Admin access points to `https://admin.krahaso.app`.
- No fabricated metrics, ratings, testimonials or partnership claims.
- Motion respects `prefers-reduced-motion`.
