import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

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
  assert.equal(pkg.dependencies["framer-motion"], undefined);

  assert.match(html, /id="root"/);
  assert.match(html, /fonts\.googleapis\.com/);
  assert.match(html, /Neue\+Haas\+Grotesk\+Text\+Pro/);
  assert.match(html, /Neue\+Haas\+Grotesk\+Display\+Pro\+55\+Roman/);
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
  const [app, css] = await Promise.all([
    read("src/App.tsx"),
    read("src/index.css"),
  ]);

  assert.match(app, /https:\/\/d8j0ntlcm91z4\.cloudfront\.net\/user_38xzZboKViGWJOttwIXH07lWA1P\/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6\.mp4/);
  assert.match(app, /LogIn, UserPlus, Play, Sparkles, Menu, X/);
  assert.match(app, /Krahaso[\s\S]*Skano[\s\S]*Fito/);
  assert.match(app, /https:\/\/admin\.krahaso\.app/);
  assert.match(app, /Së shpejti/);
  assert.match(app, /aria-expanded/);
  assert.match(app, /id="manifesti"/);
  assert.match(app, /id="krahaso"/);
  assert.match(app, /id="skano"/);
  assert.match(app, /id="fito"/);
  assert.match(app, /id="aplikacioni"/);
  assert.match(app, /id="shkarko"/);
  assert.doesNotMatch(app, /FAQ|partner zyrtar|milion|rating|shkarkime/i);
  assert.match(css, /hero-wash/);
  assert.match(css, /brand-panel/);
  assert.match(css, /reveal/);
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
