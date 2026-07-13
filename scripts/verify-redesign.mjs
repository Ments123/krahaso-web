import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("production shell carries the approved public-site contracts", async () => {
  const [layout, css, tailwind] = await Promise.all([
    read("app/layout.tsx"),
    read("app/globals.css"),
    read("tailwind.config.ts"),
  ]);
  assert.match(layout, /https:\/\/krahaso\.app/);
  assert.match(layout, /<html lang="sq"/);
  assert.match(layout, /Krahaso.*çmimet/i);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /--ease-apple/);
  for (const token of ["canvas", "surface", "ink", "forest", "stone", "compare", "reward"]) {
    assert.match(tailwind, new RegExp(`${token}:`));
  }
});
