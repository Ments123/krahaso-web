import { gzipSync } from 'node:zlib';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const assetsDirectory = new URL('../dist/assets/', import.meta.url);
const assetsPath = fileURLToPath(assetsDirectory);
const files = await readdir(assetsDirectory);

const budgets = [
  {
    label: 'main JavaScript',
    pattern: /^index-[A-Za-z0-9_-]+\.js$/,
    limit: 55_000,
  },
  {
    label: 'GSAP chunk',
    pattern: /^gsap-[A-Za-z0-9_-]+\.js$/,
    limit: 48_000,
  },
];

let failed = false;

for (const budget of budgets) {
  const matches = files.filter((file) => budget.pattern.test(file));
  if (matches.length !== 1) {
    console.error(
      `${budget.label}: expected one matching asset, found ${matches.length}`,
    );
    failed = true;
    continue;
  }

  const file = matches[0];
  const source = await readFile(join(assetsPath, file));
  const gzipBytes = gzipSync(source, { level: 9 }).byteLength;
  const limitKb = budget.limit / 1000;
  const actualKb = gzipBytes / 1000;

  console.log(
    `${budget.label}: ${actualKb.toFixed(2)} kB gzip / ${limitKb.toFixed(0)} kB budget (${file})`,
  );

  if (gzipBytes > budget.limit) {
    console.error(`${budget.label} exceeds its gzip budget`);
    failed = true;
  }
}

if (failed) process.exitCode = 1;
