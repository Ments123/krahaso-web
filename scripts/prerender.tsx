import { readFile, writeFile } from 'node:fs/promises';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';

const output = new URL('../dist/index.html', import.meta.url);
const html = await readFile(output, 'utf8');
const mountPoint = '<div id="root"></div>';

if (!html.includes(mountPoint)) throw new Error('Homepage mount point is missing from the build output.');

const markup = renderToString(<App />);
await writeFile(output, html.replace(mountPoint, () => '<div id="root">' + markup + '</div>'));
