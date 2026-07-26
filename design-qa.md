# Krahaso App-Acquisition QA

Result: automated checks passed; hosted visual verification pending.

## Scope verified

- Hero headline remains exactly `Kalo te më e lira`.
- The hero keeps one ordinary autoplaying, muted, looping, inline video with metadata preload.
- The real Krahaso home screenshot remains the first proof section after the hero.
- The primary journey is `Skano → Krahaso → Zgjidh`.
- Receipt rewards are separate from barcode price comparison and disabled by default.
- Prelaunch mode does not create fake or empty store links.
- The mobile install bar appears only after the hero, is dismissible for the session, and does not remain focusable while hidden.
- SEO metadata, robots.txt, sitemap.xml, factual JSON-LD, analytics events, and UTM preservation are present.

## Automated evidence

- `npm run verify:design`: 8/8 checks passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- Production JavaScript: 282.62 kB raw / 90.42 kB gzip.
- Production CSS: 48.37 kB raw / 10.86 kB gzip.
- Compared with the production baseline, JavaScript decreased by 1.57 kB raw and remained effectively flat when gzipped.
- Independent code review found no critical issues. Its mobile accessibility and fictitious-data findings were corrected before this report.

## Visual verification status

The local headless Chromium runtime aborts in its system graphics library before creating a page, so no new browser screenshots are claimed here. Responsive visual and console verification must be completed against the Vercel preview generated from this branch.

## Known content dependency

Store, preorder, preregistration, and waitlist URLs remain deliberately unset. Until verified URLs are supplied, the page shows the neutral non-clickable status `Lansimi po përgatitet`.
