# Krahaso Cinematic Vite Brand Redesign

## Goal

Replace the rejected product-dashboard landing page with a cinematic, brand-first Krahaso website based directly on the supplied LinkFlow visual reference.

## Direction

- The experience is a full landing page, but intentionally light on explanation.
- The supplied CloudFront video fills the opening viewport and runs through the supplied boomerang canvas component.
- Neue Haas Grotesk leads the visual identity, with Inter as the fallback/support font.
- The palette uses the exact supplied forest greens, muted sage and translucent white navigation treatment.
- Motion is restrained and CSS-only apart from the boomerang video renderer.
- The visual language remains consistent from hero to footer: full-bleed media, large type, soft glass, minimal controls and generous composition.

## Brand Story

The page communicates only three ideas:

1. **Krahaso** — understand the price before buying.
2. **Skano** — verify the purchase simply.
3. **Fito** — receive practical value from everyday shopping.

These ideas appear as short brand statements rather than detailed feature documentation.

## Page Shape

1. **Video Hero** — full-screen boomerang background, Krahaso mark, minimal navigation, one large Albanian headline, download CTA and admin access.
2. **Brand Manifesto** — oversized editorial statement with minimal supporting copy.
3. **Krahaso / Skano / Fito** — three large visual panels using the existing product imagery and concise language.
4. **App Glimpse** — one premium device composition, not a dense dashboard demonstration.
5. **Final Brand Scene** — strong closing line, honest “Së shpejti” download action and discreet admin link.

## Technical Contract

- Vite 5.4, React 18.3, TypeScript 5.5 and Tailwind CSS 3.4.
- `lucide-react` only for `LogIn`, `UserPlus`, `Play`, `Sparkles`, `Menu` and `X`.
- `src/BoomerangVideoBg.tsx` uses the user-supplied implementation and CloudFront URL.
- `src/App.tsx` owns the complete brand experience.
- `src/main.tsx` mounts the application and imports `src/index.css`.
- `index.html` loads the exact supplied Google and Neue Haas font links.
- No Next.js, Framer Motion or animation dependency.
- The site remains responsive, keyboard accessible and reduced-motion safe.
- Unavailable download actions respond with “Së shpejti”.
- `https://admin.krahaso.app` remains the admin destination.

## Success Standard

The result should feel like the supplied reference was designed for Krahaso from the start: cinematic, restrained, premium and memorable. It must not resemble the rejected dashboard-heavy version.
