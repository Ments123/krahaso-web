# Krahaso App-Acquisition QA

Result: compiled-browser QA passed at all four required viewports. Two defects
found during the rendered audit were fixed and re-verified.

## Scope verified

- The hero headline remains exactly `Kalo te më e lira`.
- The hero uses one ordinary autoplaying, muted, looping, inline video with
  metadata preload and no canvas frame cache.
- The genuine Krahaso app screenshot remains the first proof section after the
  hero.
- The primary journey is `Skano → Krahaso → Zgjidh`.
- Receipt rewards are separate from barcode comparison and disabled by default.
- Prelaunch mode creates no fake or empty store links.
- The mobile install bar appears only after the hero when a real acquisition
  destination is configured.
- SEO metadata, factual JSON-LD, robots.txt, sitemap.xml, analytics events and
  UTM preservation are present.

## Four-viewport browser matrix

The production bundle was rendered in headless Chromium with its compiled CSS,
JavaScript and local assets. The sandbox blocks the external CloudFront video
host, so the video request was excluded from application failure counts; the
video element and fallback surface were still rendered and inspected.

| Viewport | Overflow | H1 | Duplicate IDs | Internal anchors | App image | Touch targets | Console/page errors |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 390 × 844 | 0 px | 1 | 0 | all resolve | 716 × 1536 loaded | all ≥ 44 px | 0 |
| 430 × 932 | 0 px | 1 | 0 | all resolve | 716 × 1536 loaded | all ≥ 44 px | 0 |
| 768 × 1024 | 0 px | 1 | 0 | all resolve | 716 × 1536 loaded | all ≥ 44 px | 0 |
| 1440 × 900 | 0 px | 1 | 0 | all resolve | 716 × 1536 loaded | all ≥ 44 px | 0 |

At 390 px, 430 px and 768 px the mobile drawer was also verified:

- the menu button sets `aria-expanded=true`;
- the drawer sets `aria-hidden=false` and removes `inert`;
- Escape closes it;
- the closed drawer restores `aria-hidden=true` and `inert`.

Detailed machine-readable evidence is in
[`docs/qa/acquisition/browser-audit.json`](docs/qa/acquisition/browser-audit.json).

## Sticky acquisition audit

A separate build used a temporary test-only waitlist URL. No test URL was
written to source or retained in the final production build.

- hidden while the hero is visible;
- appears after the hero;
- CTA is 132.7 × 44 px;
- dismiss control is 44 × 44 px;
- footer receives 128 px clearance while the bar is active;
- `waitlist_click` and `sticky_store_click` events reach `dataLayer`;
- dismissal is written to session storage;
- body state is cleaned up;
- the bar does not reappear after further scrolling in that session.

Detailed evidence is in
[`docs/qa/acquisition/sticky-cta-audit.json`](docs/qa/acquisition/sticky-cta-audit.json).

## Reduced motion

- the hero video computes to `display: none`;
- document scroll behaviour computes to `auto`;
- no animation longer than 1 ms remains active;
- Framer Motion receives `initial: false` rather than running its 600 ms
  entrance.

## Defects found and fixed

1. The footer Admin link measured 43.3 px wide. Footer utility links now have a
   44 px minimum width.
2. The Framer Motion hero entrance ignored reduced-motion preferences. Motion
   props now switch to a non-animated initial state.

Both defects are protected by `scripts/verify-redesign.mjs`.

## Visual evidence

- [Mobile app-proof screenshot](docs/qa/acquisition/mobile-390x844-app-proof.jpg)
- [Desktop app-proof screenshot](docs/qa/acquisition/desktop-1440x900-app-proof.jpg)
- Additional hero viewport captures for all four required sizes are stored in
  `docs/qa/acquisition/`.

The screenshots use the genuine approved application image. No substitute app
interface was created.

## Automated evidence

- `npm run verify:design`: 8/8 passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- Final JavaScript: 282.73 kB raw / 90.46 kB gzip.
- Final CSS: 48.38 kB raw / 10.87 kB gzip.
- Published baseline JavaScript: 284.19 kB raw / 90.43 kB gzip.
- The acquisition build is 1.46 kB smaller raw and effectively flat when
  gzipped versus the published baseline.

## Legal and support review

No approved Privacy or Terms copy exists in the repository. No approved public
support address exists either. Old prototype files contain dead `href="#"`
labels and an unverified prototype email; these are not production evidence.

The public footer therefore omits legal/support destinations instead of
publishing placeholders, dead links or invented contact details. This is the
required safe behaviour until approved inputs are supplied.

## Missing production values

- App Store listing URL
- Google Play listing URL
- preorder or preregistration URL
- waitlist URL
- approved Privacy copy
- approved Terms copy
- approved public support/contact address

With no verified acquisition URL, the final production build shows the neutral
non-clickable status `Lansimi po përgatitet`.

## Hosted verification boundary

The Vercel preview build is Ready, but it is protected by a Vercel scope that is
not available to the connected account. Vercel returns 403 and cannot create a
share URL. The cloud browser is also policy-blocked from that protected host.

Following the authorised merge, the public `https://krahaso.app` deployment
must be checked for the final video request, rendered hero, metadata, console
errors and production alias before publication is reported complete.
