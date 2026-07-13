# Krahaso Digital Leaflet Campaign

## Goal

Position Krahaso as the modern grocery-price app Kosovo shoppers have been waiting for: the digital replacement for supermarket leaflets, built to bring supermarket pricing into one clear experience.

## Scope

- Keep the approved video hero and the existing visual system unchanged.
- Replace the coffee image with a genuine transparent-background cutout. Preserve the pack and its printed white areas; remove the visible white canvas and remove the CSS blend workaround.
- Make product-barcode scanning the main scanning story.
- Mention receipt scanning only in the rewards scene.
- Remove fixed supermarket-count claims. The copy should communicate nationwide ambition without claiming that every supermarket is already connected.
- Keep the page as pure brand marketing rather than a detailed product manual.

## Campaign Narrative

The page should move through one simple story:

1. The old way is supermarket leaflets.
2. The new way is Krahaso.
3. Scan a product barcode to find and compare its prices.
4. Scan receipts separately to collect points and unlock rewards.
5. Krahaso is building one digital home for supermarket prices across Kosovo.

## Approved Copy Direction

### Manifesto

- Heading: **Harro fletushkat. Mirë se erdhe te Krahaso.**
- Supporting line: **Po i sjellim çmimet e supermarketeve të Kosovës në një vend.**

This is an ambitious direction statement, not a claim that every supermarket is already integrated.

### Krahaso

Keep the existing comparison headline and price theatre:

- **Shiko. Pastaj zgjidh.**
- **Çmimi i duhur bëhet i dukshëm.**

The single coffee pack remains the only product image on the site.

### Skano

- Heading: **Skano barkodin. Shih ku kushton më lirë.**
- Supporting line: **Një skanim të çon te çmimet e produktit në supermarketet e listuara në Krahaso.**
- Scanner instruction: **Vendose barkodin brenda kornizës.**
- Recognition state: **Barkodi u njoh.**

The decorative receipt planes become digital product/price result planes. No receipt language appears in this scene.

### Fito

- Heading: **Skano faturën. Fito shpërblime.**
- Supporting line: **Ruaje faturën, mblidh pikë dhe përfito nga blerjet e tua.**
- Verification card: **Fatura u verifikua.**
- Action chip: **Mblidh më shumë pikë.**

This is the only section that discusses receipt scanning.

### App Showcase

- Eyebrow: **Aplikacioni që po prisje.**
- Heading: **Harro fletushkat. Çmimet tani janë në xhepin tënd.**

Phone interface:

- Intro: **Supermarketet e Kosovës**
- Headline: **Një kërkim larg.**
- Main card label: **Krahasimi i produktit**
- Main card title: **Çmimet në një vend**
- Main card result: **Zgjidh më lirë**
- Tiles: **Skano / Barkodin** and **Fito / Shpërblime**

### Closing

Keep **Krahaso. Skano. Fito.** The closing remains image-free and brand-led.

## Visual Changes

- Replace `coffee.png` with a transparent PNG cutout referenced by the comparison scene.
- Remove `mix-blend-mode: multiply` from the product class so the white printing on the pack stays white.
- Rename receipt-specific decorative classes to product/price-result language and adjust the CSS-generated planes to resemble clean digital results rather than paper receipts.
- Retain CSS-only motion and the reduced-motion fallback.
- Do not add supermarket logos, additional product imagery, or new dependencies.

## Verification

- Design tests assert exactly one product reference.
- Design tests reject the old receipt-scanner copy in the Skano scene.
- Design tests require the barcode-first phrases and the campaign phrase **Harro fletushkat**.
- Design tests require the transparent packshot filename and reject the old `mix-blend-mode` workaround.
- TypeScript production build must pass.
- Mobile visual review must confirm that the copy wraps cleanly and the product has no visible rectangular background.

