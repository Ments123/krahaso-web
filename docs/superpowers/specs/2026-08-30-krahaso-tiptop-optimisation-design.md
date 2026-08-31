# Krahaso Tiptop Optimisation Design

## Status

Approved in chat on 30 August 2026. The user added one explicit requirement after the initial design: meaningful motion must work on mobile as well as desktop.

## Goal

Turn `krahaso.app` into a tighter, faster and more resilient Google Play acquisition page without replacing its current premium identity. Preserve the off-white and deep-green visual system, genuine Krahaso screenshots, retailer proof and restrained editorial typography.

The primary outcome is a visitor understanding Krahaso quickly and reaching the verified Google Play listing with minimal friction. Motion supports that outcome; it must not create dead space, trap scrolling or hide essential content.

## Current Evidence

- The production homepage is 12,694px tall at a 1363x936 desktop viewport.
- The hero, market proof and final download sections are visually strong.
- The navigation button labelled `Shkarko` scrolls to the final section instead of opening Google Play.
- The Visual Universe uses a 420svh runway and hides its central phone until GSAP advances it.
- If the motion module does not initialise, the desktop fallback can leave a long dark section with no visible app proof.
- Mobile currently disables both the Visual Universe choreography and Feature Story choreography.
- Five near-full-screen feature chapters make the page repetitive.
- The hero contains the incorrect phrase `Falë pagesë`.
- Static app screenshots and packshots can be delivered more efficiently.
- Existing semantic structure, verified legal links, canonical URL, crawler files, one-H1 rule and factual market language are sound.

## Design Direction

Use a conversion-first premium refinement, not a wholesale redesign.

### Preserve

- Current hero composition and brand hierarchy.
- Current colours, typography, phone framing and genuine screenshots.
- `Krahaso para se të blesh.` as the H1.
- Market proof and verified retailer logos.
- Factual caveats around available data, barcode results and accepted receipts.
- Google Play as the primary conversion and `iOS — së shpejti` as status text.
- Privacy, account deletion, contact and Admin destinations.

### Improve

- Make every visible `Shkarko` action open the verified Google Play listing directly.
- Correct the hero badge to `Falas` and make the lede barcode-first without promising complete coverage.
- Add subtle continuous hero motion on both desktop and mobile.
- Reduce the combined Visual Universe and Feature Story scroll distance by at least 35% at the audited 1363x936 viewport.
- Keep the app visible as the progressive fallback before motion loads or when it fails.
- Add genuine mobile scroll choreography rather than a static mobile layout.
- Compress and modernise image delivery without redrawing or altering screenshots.
- Improve keyboard focus, skip navigation, reduced-motion behaviour, campaign attribution, metadata, structured data and cache/security headers.

## Page Structure

1. Fixed navigation with direct Google Play action
2. Product hero with subtle motion
3. Shortened Visual Universe with desktop and mobile scroll choreography
4. Shortened five-chapter Feature Story
5. Genuine market-offers proof
6. Final Google Play action
7. Minimal utility footer

No new route, testimonial, rating, fabricated saving, fabricated comparison or retailer partnership claim is introduced.

## Copy

### Hero

- H1: `Krahaso para se të blesh.`
- Supporting copy: `Skano ose kërko produktin dhe shiko çmimet që kemi nga marketet e Kosovës.`
- Primary action: `Shkarko në Google Play`
- Supporting badge: `Falas`
- Platform status: `iOS — së shpejti`

Feature and offer copy retain the existing truthful qualifications. Receipt rewards continue to say points are earned when a receipt is accepted.

## Motion Architecture

### Shared rules

- GSAP and ScrollTrigger remain the only JavaScript motion dependency.
- Normal document scrolling remains the only scroll coordinate system.
- Essential headings, screenshots and links render before animation initialises.
- Motion-enhanced heights and hidden states apply only after successful motion setup.
- Motion context and media-query listeners clean up on unmount.
- Orientation changes and breakpoint crossings refresh the correct choreography.
- `prefers-reduced-motion: reduce` receives a complete static composition with no long runway or continuous hero drift.

### Hero motion

- The phone and two supporting cards use a low-amplitude, long-duration drift.
- The movement is transform-only, never affects layout, and is disabled for reduced motion.
- Mobile uses smaller movement distances than desktop.

### Visual Universe on desktop

- Use a 290svh runway rather than 420svh.
- Keep the current gallery-to-phone reveal, but bring the phone in earlier.
- Use one ScrollTrigger progress renderer and a short exit treatment.
- The static default shows a readable gallery and visible app phone. A motion-ready class enables the animated initial state only after GSAP loads.

### Visual Universe on mobile

- Use a 230svh section with a CSS-sticky 100svh stage.
- Use ScrollTrigger only to map native touch-scroll progress; do not use a JavaScript pin.
- Scale the product/retailer gallery down, fade the headline and reveal the phone as the visitor scrolls.
- Keep the phone centred, fully legible and clear of the fixed navigation.
- Avoid horizontal swipes, nested scroll regions and scroll-jacking.

### Feature Story on desktop

- Retain all five genuine chapters.
- Reduce chapter and introduction heights.
- Keep restrained pin/reveal behaviour, but remove long blank intervals and ensure copy and the matching phone remain visible together.

### Feature Story on mobile

- Keep normal vertical document flow.
- Each chapter receives a scroll-linked copy and phone reveal using opacity, scale and Y translation only.
- Do not pin feature cards on mobile.
- The effect must remain smooth on touch devices and must not delay access to later sections.

## Acquisition And Measurement

- Reuse one acquisition-link component in navigation, hero and final CTA.
- Preserve inbound UTM values.
- For Google Play links, encode campaign values in the documented `referrer` parameter instead of appending loose UTM parameters that the app cannot reliably retrieve.
- Keep existing optional `dataLayer` click events.
- Do not add an analytics provider or tracking identifier that has not been supplied.

## Performance

- Convert the six current app screenshots to visually verified WebP assets and retain stable intrinsic dimensions.
- Convert large supporting product PNGs to WebP where transparency and quality remain intact.
- Preload only the hero screenshot and mark it high priority.
- Keep all below-fold imagery lazy and async-decoded.
- Keep GSAP in a separate dynamic chunk and initialise it close to the motion section.
- Add long immutable caching for hashed build assets and bounded revalidation caching for stable public imagery.
- The production JavaScript budget must not materially exceed the existing 52.19kB gzip main bundle plus 45.48kB gzip GSAP chunk.

## SEO And Platform Metadata

- Retain the canonical URL, Albanian language, robots, sitemap, social image and crawler header.
- Refine title/description around comparing prices in Kosovo.
- Add truthful `MobileApplication` structured data with Android, Shopping and the verified Google Play install URL.
- Do not add ratings, review counts, download totals or coverage claims.

## Accessibility And Resilience

- Add a visible-on-focus skip link.
- Add a consistent high-contrast `:focus-visible` treatment.
- Retain at least 44px interactive targets and one H1.
- Keep logical heading order and meaningful screenshot alternatives.
- Ensure 200% zoom, 320px width and mobile safe areas do not clip controls or content.
- Ensure hash navigation lands below the fixed header.
- If GSAP fails, the page remains complete, readable and normally sized.

## Verification

- Add failing source/component tests before each behavioural change.
- Run the complete Node test suite, TypeScript build and Vite production build.
- Verify 1440x900, 1280x800, 768x1024, 390x844 and 360x800 in Chromium.
- Verify mobile and desktop motion progress, backward scrolling, orientation/breakpoint changes, reduced motion, keyboard navigation, 200% zoom, overflow, image loading, console errors and every CTA destination.
- Compare fresh implementation screenshots against the accepted production screenshots at matching desktop states.
- Publish through a protected pull request only after the preview deployment and public production checks are green.

## Out Of Scope

- iOS download links before a verified App Store listing exists.
- New app features or app code changes.
- Invented prices, testimonials, ratings, savings or market coverage.
- Paid advertising, a new analytics vendor or a backend conversion service.
- New legal documents or routes.
