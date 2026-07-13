# Krahaso Dense Editorial Polish

## Goal

Keep the approved video hero intact and rebuild the remaining brand scenes so every mobile viewport feels deliberately composed, visually full and premium.

## Selected Direction

Use a dense editorial product-theatre treatment. This keeps the page brand-led while giving the product, scanner and reward visuals enough scale and depth to fill the available space.

Two alternatives were rejected:

- A UI-heavy app showcase would make the landing page feel like a product dashboard again.
- A more minimal luxury treatment would preserve the empty-space problem visible in the supplied screenshots.

## Visual Changes

### Hero

- Preserve the current hero video, typography, composition and primary calls to action.

### Krahaso Scene

- Remove the emoji-style bread illustration.
- Use only real grocery packshots and designed interface elements.
- Eliminate visible white image rectangles. On the pale comparison scene, packshots use controlled multiply blending, isolation and shadows so the white source background disappears into the composition.
- Increase product scale and arrange the packshots, prices and comparison result as one overlapping composition rather than scattered objects.
- Move the heading and product theatre higher on mobile so the label, message and main visual are visible together.

### Skano Scene

- Move the scanner device directly below the message on mobile.
- Enlarge the device and add receipt planes, a scan beam and restrained metadata to occupy the scene without adding feature copy.
- Preserve the dark cinematic treatment while removing the large unused upper area.

### Fito Scene

- Create a denser reward composition using the points balance, progress track and compact reward cards.
- Keep the typography dominant and avoid badges, emojis or gamified cartoon imagery.

### App Glimpse and Retailer Scene

- Tighten vertical spacing and make the device composition start earlier on mobile.
- Keep the content minimal and brand-led.

### Closing Scene

- Remove the banana illustration and coffee image.
- Replace them with an oversized dimensional Krahaso K, subtle rings, light fields and typographic motion.
- Reduce the mobile section height so the brand statement and footer feel connected rather than separated by empty space.

## Motion

- Continue using CSS-only motion.
- Retain restrained floating, scanning and reveal effects.
- Add slow parallax-like drift to the product and closing compositions.
- Honour `prefers-reduced-motion`.

## Responsive Acceptance Criteria

- No emoji-style grocery artwork appears anywhere.
- No visible rectangular white backgrounds appear around product images.
- Each Krahaso, Skano and Fito mobile panel shows its label, headline, supporting line and primary visual without a large dead zone between them.
- The final mobile scene contains no isolated corner imagery or large unused lower area.
- The hero remains visually unchanged.
- Existing links, mobile navigation, admin destination and honest `Së shpejti` states continue to work.

## Verification

- Extend the design contract tests to forbid the removed emoji assets and require the denser scene primitives.
- Run the full design test suite and Vite production build.
- Verify the updated Vercel preview and keep the pull request as a draft.
