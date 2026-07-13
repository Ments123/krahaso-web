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

test("the phone story exposes compare, scan and reward states accessibly", async () => {
  const [shell, compare, scan, reward] = await Promise.all([
    read("components/revamp/PhoneShell.tsx"),
    read("components/revamp/CompareScreen.tsx"),
    read("components/revamp/ScanScreen.tsx"),
    read("components/revamp/RewardScreen.tsx"),
  ]);
  assert.match(shell, /aria-label/);
  assert.match(compare, /Totali/);
  assert.match(compare, /Për produkt/);
  assert.match(scan, /Barkodi/);
  assert.match(scan, /Fatura/);
  assert.match(reward, /pikë/i);
  assert.match(reward, /shpërblim/i);
});
