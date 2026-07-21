import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const readBytes = (path) =>
  readFile(new URL(`../${path}`, import.meta.url)).catch(() => Buffer.alloc(0));

test("the active runtime is the approved Vite and Neue Haas foundation", async () => {
  const [pkgRaw, html, css, vite, main, nodeConfig] = await Promise.all([
    read("package.json"),
    read("index.html"),
    read("src/index.css"),
    read("vite.config.ts"),
    read("src/main.tsx"),
    read("tsconfig.node.json"),
  ]);
  const pkg = JSON.parse(pkgRaw);

  assert.equal(pkg.scripts.dev, "vite");
  assert.equal(pkg.scripts.build, "tsc -b && vite build");
  assert.ok(pkg.devDependencies.vite);
  assert.ok(pkg.devDependencies["@vitejs/plugin-react"]);
  assert.equal(pkg.dependencies.next, undefined);
  assert.ok(pkg.dependencies["framer-motion"]);

  assert.match(html, /id="root"/);
  assert.match(html, /fonts\.googleapis\.com/);
  assert.match(html, /Neue\+Haas\+Grotesk\+Text\+Pro/);
  assert.match(html, /Neue\+Haas\+Grotesk\+Display\+Pro\+55\+Roman/);
  assert.match(html, /rel="canonical" href="https:\/\/krahaso\.app\/"/);
  assert.match(html, /property="og:image" content="https:\/\/krahaso\.app\/krahaso-social\.webp"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /href="\/favicon\.png"/);
  assert.match(html, /skano barkodet/i);
  assert.match(css, /Neue Haas Grotesk Display Pro 55 Roman/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(vite, /react\(\)/);
  assert.match(main, /createRoot/);
  assert.match(main, /<App/);
  assert.doesNotMatch(nodeConfig, /allowImportingTsExtensions/);
});

test("the supplied boomerang renderer captures and replays video frames", async () => {
  const source = await read("src/BoomerangVideoBg.tsx");

  assert.match(source, /requestVideoFrameCallback/);
  assert.match(source, /MAX_WIDTH = 960/);
  assert.match(source, /getContext\('2d'\)/);
  assert.match(source, /1000 \/ 30/);
  assert.match(source, /direction = -1/);
  assert.match(source, /muted/);
  assert.match(source, /playsInline/);
  assert.match(source, /crossOrigin="anonymous"/);
});

test("the Krahaso page is a minimal cinematic brand experience", async () => {
  const [app, features, journey, proof, css, cutout] = await Promise.all([
    read("src/App.tsx"),
    read("src/components/FeatureGrid.tsx"),
    read("src/components/ProductJourney.tsx"),
    read("src/components/AppProof.tsx"),
    read("src/index.css"),
    read("public/products/coffee-cutout.svg"),
  ]);
  const pageSource = [app, features, journey, proof].join("\n");

  assert.match(app, /https:\/\/d8j0ntlcm91z4\.cloudfront\.net\/user_38xzZboKViGWJOttwIXH07lWA1P\/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6\.mp4/);
  assert.match(app, /LogIn, UserPlus, Play, Sparkles, Menu, X/);
  assert.match(pageSource, /Krahaso[\s\S]*Skano[\s\S]*Fito/);
  assert.match(app, /https:\/\/admin\.krahaso\.app/);
  assert.match(app, /Vjen së shpejti/);
  assert.match(app, /aria-expanded/);
  assert.match(pageSource, /id="manifesti"/);
  assert.match(pageSource, /id="krahaso"/);
  assert.match(pageSource, /id="skano"/);
  assert.match(pageSource, /id="fito"/);
  assert.match(pageSource, /id="aplikacioni"/);
  assert.match(app, /id="shkarko"/);
  assert.doesNotMatch(pageSource, /FAQ|partner zyrtar|milion|rating|shkarkime/i);
  assert.match(css, /hero-wash/);
  assert.match(css, /brand-panel/);
  assert.match(css, /reveal/);

  const productReferences = pageSource.match(/\/products\//g) ?? [];
  assert.equal(productReferences.length, 1);
  assert.doesNotMatch(pageSource, /bread\.svg|banana\.svg|✓|🥖|🍌/u);
  assert.match(pageSource, /comparison-signal/);
  assert.match(pageSource, /price-plane/);
  assert.match(pageSource, /reward-orbit/);
  assert.match(app, /closing-k/);
  assert.match(css, /product-cutout/);
  assert.match(css, /brand-drift/);
  assert.match(css, /closing-k/);

  assert.match(app, /Kalo te[\s\S]*më e lira/);
  assert.match(app, /Skano produktin dhe shiko menjëherë ku kushton më pak/);
  assert.match(pageSource, /Njihu me[\s\S]*Krahaso/);
  assert.match(pageSource, /Çmimet, produktet dhe ofertat e supermarketeve/);
  assert.doesNotMatch(app, /Çmimet ndryshojnë|Zgjedhja jote nuk duhet|Mirë se erdhe te Krahaso/);
  assert.match(pageSource, /Skano barkodin/);
  assert.match(pageSource, /Barkodi u njoh/);
  assert.match(pageSource, /Skano faturën/);
  assert.match(pageSource, /\/app\/krahaso-home\.webp/);
  assert.match(pageSource, /Pamje reale e ballinës së aplikacionit Krahaso/);
  assert.match(app, /Vjen së shpejti/);
  assert.doesNotMatch(app, /Një kërkim larg/);
  assert.doesNotMatch(app, /showSoon|setSoon/);
  assert.match(pageSource, /\/products\/coffee-cutout\.svg/);
  assert.doesNotMatch(pageSource, /\/products\/coffee\.png/);
  assert.doesNotMatch(app, /Një aplikacion\. Një ritëm\./);
  assert.doesNotMatch(app, /3 shitore/);
  assert.match(app, /Partnerët/);
  assert.match(app, /Për partnerët/);
  assert.match(app, /id="partneret"/);
  assert.doesNotMatch(app, /shitore/i);
  assert.doesNotMatch(css, /mix-blend-mode:\s*multiply/);
  assert.doesNotMatch(app, /receipt-plane/);
  assert.match(cutout, /data:image\/png;base64,/);
  assert.match(cutout, /clipPath/);
  assert.doesNotMatch(cutout, /href="coffee\.png"/);
});

test("the final launch assets are optimized and self-contained", async () => {
  const [appScreenshot, socialImage, favicon] = await Promise.all([
    readBytes("public/app/krahaso-home.webp"),
    readBytes("public/krahaso-social.webp"),
    readBytes("public/favicon.png"),
  ]);

  assert.equal(appScreenshot.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(appScreenshot.subarray(8, 12).toString("ascii"), "WEBP");
  assert.equal(socialImage.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(socialImage.subarray(8, 12).toString("ascii"), "WEBP");
  assert.equal(favicon.subarray(1, 4).toString("ascii"), "PNG");
});

test("the lower page is a continuous mobile-first product story", async () => {
  const [app, journey, proof, css] = await Promise.all([
    read("src/App.tsx"),
    read("src/components/ProductJourney.tsx"),
    read("src/components/AppProof.tsx"),
    read("src/index.css"),
  ]);

  assert.match(app, /<ProductJourney \/>/);
  assert.match(app, /<AppProof \/>/);
  assert.match(journey, /id="product-journey"/);
  assert.match(journey, /journey-step/g);
  assert.match(journey, /Skano barkodin/);
  assert.match(journey, /Skano faturën/);
  assert.match(journey, /Vetëm për shpërblime/);
  assert.match(proof, /app-proof/);
  assert.match(proof, /\/app\/krahaso-home\.webp/);
  assert.match(proof, /Fletushkat ishin dje/);
  assert.match(proof, /editorial-accent/);
  assert.match(app, /partner-card/);
  assert.match(css, /\.product-journey/);
  assert.match(css, /\.journey-step/);
  assert.match(css, /\.mobile-compact/);
  assert.match(css, /\.app-proof/);
  assert.match(css, /\.partner-card/);
  assert.match(css, /@media \(max-width: 639px\)/);
});

test("the Halo-inspired refinement stays green, useful and mobile-first", async () => {
  const [app, features, journey, proof, css] = await Promise.all([
    read("src/App.tsx"),
    read("src/components/FeatureGrid.tsx"),
    read("src/components/ProductJourney.tsx"),
    read("src/components/AppProof.tsx"),
    read("src/index.css"),
  ]);
  const pageSource = [app, features, journey, proof].join("\n");

  assert.match(app, /hero-shell/);
  assert.match(app, /hero-card/);
  assert.match(app, /<FeatureGrid \/>/);
  assert.match(features, /Njihu me[\s\S]*Krahaso/);
  assert.match(features, /Krahaso çmimet/);
  assert.match(features, /Skano barkodin/);
  assert.match(features, /Gjej ofertën më të mirë/);
  assert.match(features, /Skano faturën dhe fito/);
  assert.match(features, /feature-card/g);
  assert.match(pageSource, /#08a64a|#08A64A/);
  assert.match(css, /--krahaso-green:\s*#08a64a/i);
  assert.match(css, /--krahaso-paper:\s*#f5f7f3/i);
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /100svh/);
  assert.match(css, /scroll-snap-type:\s*x mandatory/);
  assert.match(css, /scroll-snap-align:\s*start/);
  assert.match(css, /@media \(max-width: 639px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(pageSource, /marquee|Backed by|partner zyrtar|7,000/i);
});

test("the Mindloop-inspired direction is cinematic without losing Krahaso", async () => {
  const [app, css] = await Promise.all([read("src/App.tsx"), read("src/index.css")]);

  assert.match(app, /motion/);
  assert.match(app, /Krahaso ka ndryshuar mënyrën si i gjen çmimet/);
  assert.match(app, /Më pak kërkim/);
  assert.match(app, /Zgjidhje/);
  assert.match(app, /Blerjet e zgjuara/);
  assert.match(app, /liquid-glass/);
  assert.match(css, /--krahaso-night:\s*#020b06/i);
  assert.match(css, /\.liquid-glass/);
  assert.match(css, /\.cinematic-statement/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(app, /7,000|subscriber|ChatGPT|Perplexity|Google AI/i);
});

test("the mobile hero preserves the video colour below the text wash", async () => {
  const css = await read("src/index.css");
  const mobileStyles = css.match(/@media \(max-width: 639px\) \{[\s\S]*?(?=\n@media|$)/)?.[0] ?? "";

  assert.match(mobileStyles, /\.hero-wash\s*\{[\s\S]*rgba\(239, 243, 232, 0\.08\) 58%[\s\S]*transparent 76%/);
  assert.doesNotMatch(mobileStyles, /rgba\(239, 243, 232, 0\.62\) 100%/);
});

test("the final implementation pack is mapped without altering the locked hero", async () => {
  const [app, features, journey, proof] = await Promise.all([
    read("src/App.tsx"),
    read("src/components/FeatureGrid.tsx"),
    read("src/components/ProductJourney.tsx"),
    read("src/components/AppProof.tsx"),
  ]);

  assert.match(app, /Kalo te[\s\S]*më e lira/);
  assert.match(app, /Skano produktin dhe shiko menjëherë ku kushton më pak/);
  assert.doesNotMatch(app, /Harro fletushkat|Krahaso më zgjuar/);

  assert.match(app, /Krahaso ka ndryshuar mënyrën si i gjen çmimet/);
  assert.match(features, /Njihu me[\s\S]*Krahaso/);
  assert.match(journey, /Tre hapa[\s\S]*Një zgjedhje më e mirë/);
  assert.match(journey, /Skano barkodin[\s\S]*Shih çmimet menjëherë/);
  assert.match(journey, /Skano faturën[\s\S]*Fito shpërblime/);
  assert.match(proof, /Fletushkat ishin dje[\s\S]*Çmimet tani janë në xhepin tënd/);
});

test("the rejected Next runtime is removed and the Vite handoff is documented", async () => {
  const [readme, vercelRaw] = await Promise.all([
    read("README.md"),
    read("vercel.json"),
  ]);
  const vercel = JSON.parse(vercelRaw);

  assert.match(readme, /Vite/);
  assert.match(readme, /npm run dev/);
  assert.match(readme, /npm run build/);
  assert.match(readme, /BoomerangVideoBg/);
  assert.match(readme, /Neue Haas/);
  assert.equal(vercel.framework, "vite");
  assert.equal(vercel.buildCommand, "npm run build");
  assert.equal(vercel.outputDirectory, "dist");
  await assert.rejects(read("app/page.tsx"), { code: "ENOENT" });
  await assert.rejects(read("next.config.mjs"), { code: "ENOENT" });
  await assert.rejects(read("components/revamp/HeroStage.tsx"), { code: "ENOENT" });
});
