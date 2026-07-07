# Krahaso — landing page

Marketing landing page for **Krahaso**, a grocery price-comparison and rewards
app for Kosovo (`krahaso.app`). Public marketing site only — no backend, auth,
or real price engine. All copy is in Kosovo Albanian.

This is the **Product-Led App Showcase** design (Variation 3 from the design
handoff), rebuilt as a production Next.js app. The original HTML prototypes and
the design chat transcript live in [`project/`](./project) and
[`chats/`](./chats) for reference.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**
- **lucide-react** icons
- **next/font** — Bricolage Grotesque (display) + Hanken Grotesk (body)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

## Project structure

```
app/
  layout.tsx          # fonts, metadata, <html lang="sq">
  page.tsx            # composes the sections in order
  globals.css         # base styles, keyframes, reduced-motion
components/
  sections/           # one component per landing-page section
  ui/                 # Reveal, CountUp, SoonButton, LogoTile, ContainImg, BrandMark
data/
  site.ts             # all typed demo data (basket, rows, FAQs, benefits…)
public/
  logos/  products/   # supermarket logos + product packshots
```

### Sections (single homepage)

Nav → Hero (interactive **Totali / Për produkt** toggle) → Krahaso·Skano·Fito
band → logo marquee → scroll journey (sticky phone stepping through
list → compare → cheapest → receipt → points → reward) → basket comparison →
product comparison → barcode scan → receipt scan → rewards → personalisation
(price-drop alerts + location) → why-Krahaso → for-partners → FAQ → final CTA →
footer.

### Interactions

Mobile nav, FAQ accordion, hero segmented toggle, scroll-driven journey phone,
reveal-on-scroll, count-up points, and the barcode/receipt scan animations.
Motion is disabled under `prefers-reduced-motion`.

## Demo data & honesty rules

All prices are **illustrative demonstration values only** ("Çmimet janë vetëm
shembuj demonstrues"). Supermarket logos are used for illustration only and do
not imply partnership. There are no fake ratings, reviews, download counts, or
partnerships anywhere. App-download / social / legal actions that aren't live
yet show **"Së shpejti"** on interaction — no dead buttons.

Demo basket (7 items): Qumësht 1L, Bukë, Vezë 10 copë, Vaj 1L, Kafe 500g,
Banane 1kg, Detergjent 2L. Totals — Viva Fresh **€22.45** (cheapest, 7/7),
Interex €23.30 (7/7), ETC €24.10 (6/7), Meridian Express €25.05 (7/7).
Savings **€2.60**.

### Images

Product packshots and all seven supermarket logos are local files in
`public/`. Two grocery photos (bread, banane) and one hero photo load from
Unsplash's CDN, so they need internet the first time they're served. To make
the site fully self-contained, drop local copies into `public/products/`
(`bread.jpg`, `banana.jpg`, `hero-groceries.jpg`) and update the three
Unsplash URLs in `data/site.ts`.

## Deploy

The app is a standard Next.js app — deploy to **Vercel** (recommended) or any
Node host.

### Vercel

1. Push this repo to GitHub/GitLab.
2. In Vercel, **Add New → Project** and import the repo. Framework preset
   **Next.js** is detected automatically; no extra config needed.
3. Deploy. You get a `*.vercel.app` URL.

### Point `krahaso.app` (GoDaddy) at the deployment

1. In Vercel: **Project → Settings → Domains → Add** `krahaso.app`. Vercel
   shows the exact DNS records to create.
2. In GoDaddy: **My Products → Domains → krahaso.app → DNS / Manage DNS**, then
   add the records Vercel gave you — typically:
   - **A** record — Host `@` → `76.76.21.21` (Vercel's apex IP; use whatever
     value Vercel shows).
   - **CNAME** record — Host `www` → `cname.vercel-dns.com`.
3. Wait for DNS propagation (minutes to a couple of hours). HTTPS is issued
   automatically once the domain resolves.

The domain stays registered at GoDaddy; you're only changing where it points.

## Going live checklist

- Wire the "Shkarko" / "Shkarko Krahaso" buttons to the real App Store /
  Google Play links (replace `SoonButton` usage in `Hero`, `Nav`, `FinalCta`).
- Swap the two remote Unsplash photos for local, optimised copies.
- Replace illustrative supermarket logos with cleared official assets once
  partnerships are confirmed.
