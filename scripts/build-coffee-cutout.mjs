import { readFile, writeFile } from 'node:fs/promises';

const sourceUrl = new URL('../public/products/coffee.png', import.meta.url);
const outputUrl = new URL('../public/products/coffee-cutout.svg', import.meta.url);
const source = await readFile(sourceUrl);
const encoded = source.toString('base64');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="270" height="490" viewBox="160 55 270 490" role="img" aria-labelledby="title description">
  <title id="title">Pako Prince Caffe</title>
  <desc id="description">Pako kafeje e prerë pa sfondin e bardhë të fotografisë burimore.</desc>
  <defs>
    <clipPath id="coffee-bag-cutout" clipPathUnits="userSpaceOnUse">
      <path d="M207 84 394 66 401 91 418 473 412 500 400 516 386 529 184 516 173 513 170 505 172 315 176 267 183 228 190 194 199 146Z" />
    </clipPath>
  </defs>
  <image href="data:image/png;base64,${encoded}" x="0" y="0" width="600" height="600" preserveAspectRatio="xMidYMid meet" clip-path="url(#coffee-bag-cutout)" />
</svg>
`;

await writeFile(outputUrl, svg, 'utf8');
