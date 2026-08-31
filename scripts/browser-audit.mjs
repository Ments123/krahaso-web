import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = process.env.KRAHASO_DIST || join(root, 'dist');
const output = process.env.KRAHASO_QA_OUTPUT || join(root, 'docs/qa/tiptop');
const playwrightSource = process.env.KRAHASO_PLAYWRIGHT;
const executablePath = process.env.KRAHASO_CHROMIUM;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

if (!playwrightSource || !executablePath) {
  throw new Error(
    'Set KRAHASO_PLAYWRIGHT to Playwright index.mjs and KRAHASO_CHROMIUM to a Chromium executable.',
  );
}

const asImportSpecifier = (value) =>
  value.startsWith('/') ? pathToFileURL(value).href : value;

const { chromium } = await import(asImportSpecifier(playwrightSource));
let browserArgs = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'];

if (process.env.KRAHASO_CHROMIUM_ARGS_MODULE) {
  const module = await import(asImportSpecifier(process.env.KRAHASO_CHROMIUM_ARGS_MODULE));
  const chromiumPackage = module.default;
  chromiumPackage.setGraphicsMode = false;
  browserArgs = chromiumPackage.args;
} else if (process.env.KRAHASO_BROWSER_ARGS_JSON) {
  browserArgs = JSON.parse(process.env.KRAHASO_BROWSER_ARGS_JSON);
}

await readFile(join(dist, 'index.html'));
await mkdir(output, { recursive: true });

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

const failures = [];
const requireAudit = (condition, message) => {
  if (!condition) failures.push(message);
};

async function installStaticRoute(context, origin) {
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== origin) {
      await route.abort('blockedbyclient');
      return;
    }

    const relative = decodeURIComponent(url.pathname) === '/'
      ? 'index.html'
      : decodeURIComponent(url.pathname).replace(/^\/+/, '');
    const path = normalize(join(dist, relative));

    if (!path.startsWith(normalize(dist))) {
      await route.fulfill({ status: 403, body: 'Forbidden' });
      return;
    }

    try {
      const body = await readFile(path);
      await route.fulfill({
        status: 200,
        body,
        contentType: contentTypes.get(extname(path)) ?? 'application/octet-stream',
      });
    } catch {
      await route.fulfill({ status: 404, body: 'Not found' });
    }
  });
}

async function openPage(origin, viewport, options = {}) {
  const browser = await chromium.launch({
    executablePath,
    headless: true,
    args: browserArgs,
  });
  const context = await browser.newContext({
    viewport,
    reducedMotion: options.reducedMotion ?? 'no-preference',
    isMobile: options.isMobile ?? false,
    hasTouch: options.hasTouch ?? false,
    deviceScaleFactor: 1,
  });
  await installStaticRoute(context, origin);

  const page = await context.newPage();
  const consoleErrors = [];
  const failedRequests = [];

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  page.on('requestfailed', (request) => {
    if (request.url().startsWith(origin)) {
      failedRequests.push(
        `${request.url()}: ${request.failure()?.errorText ?? 'failed'}`,
      );
    }
  });

  await page.goto(`${origin}/?utm_source=qa&utm_campaign=tiptop`, {
    waitUntil: 'load',
  });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });

  return { browser, page, consoleErrors, failedRequests };
}

async function waitForMotion(page) {
  await page.waitForFunction(
    () => document.querySelector('#universi')?.classList.contains('motion-ready'),
    undefined,
    { timeout: 5000 },
  );
  await page.waitForTimeout(120);
}

async function loadLazyImages(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = await page.evaluate(() => Math.max(420, window.innerHeight * 0.82));

  for (let position = 0; position < height; position += step) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), position);
    await page.waitForTimeout(18);
  }

  await page.evaluate(() => {
    document.querySelectorAll('img[loading="lazy"]').forEach((image) => {
      image.loading = 'eager';
    });
  });
  await page.waitForFunction(
    () => [...document.images].every((image) => image.complete),
    undefined,
    { timeout: 5000 },
  );
  await page.evaluate(async () => {
    await Promise.all(
      [...document.images].map((image) => image.decode().catch(() => undefined)),
    );
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
}

async function collectPageState(page) {
  return page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
    const duplicateIds = [...new Set(
      ids.filter((id, index) => ids.indexOf(id) !== index),
    )];
    const brokenInternalAnchors = [...document.querySelectorAll('a[href^="#"]')]
      .map((anchor) => anchor.getAttribute('href'))
      .filter((href) => href && href !== '#' && !document.querySelector(href));
    const failedImages = [...document.images]
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.getAttribute('src'));
    const touchTargetFailures = [...document.querySelectorAll('a, button')]
      .filter((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' &&
          rect.width > 0 && rect.height > 0;
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          label: element.getAttribute('aria-label') ||
            element.textContent?.trim().slice(0, 60) || element.tagName,
          width: Math.round(rect.width * 10) / 10,
          height: Math.round(rect.height * 10) / 10,
        };
      })
      .filter(({ width, height }) => width < 44 || height < 44);

    return {
      title: document.title,
      documentHeight: document.documentElement.scrollHeight,
      horizontalOverflow:
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1Count: document.querySelectorAll('h1').length,
      duplicateIds,
      brokenInternalAnchors,
      failedImages,
      touchTargetFailures,
      motionReady:
        document.querySelector('#universi')?.classList.contains('motion-ready') ?? false,
    };
  });
}

async function sampleUniverse(page, progress) {
  await page.evaluate((value) => {
    const root = document.querySelector('#universi');
    const top = root.getBoundingClientRect().top + window.scrollY;
    const travel = Math.max(0, root.getBoundingClientRect().height - window.innerHeight);
    window.scrollTo({ top: top + travel * value, behavior: 'instant' });
  }, progress);
  await page.waitForTimeout(90);

  return page.evaluate((value) => {
    const scaleOf = (selector) => {
      const element = document.querySelector(selector);
      const transform = element ? getComputedStyle(element).transform : 'none';
      if (!element || transform === 'none') return 1;
      const matrix = new DOMMatrixReadOnly(transform);
      return Math.hypot(matrix.a, matrix.b);
    };
    const opacityOf = (selector) =>
      Number(getComputedStyle(document.querySelector(selector)).opacity);

    return {
      progress: value,
      galleryScale: scaleOf('.universe-gallery'),
      phoneScale: scaleOf('.universe-phone'),
      phoneOpacity: opacityOf('.universe-phone'),
      copyOpacity: opacityOf('.universe-copy'),
    };
  }, progress);
}

async function sampleFeatureMotion(page) {
  const positions = await page.evaluate(() => {
    const card = document.querySelector('.feature-chapter-kerko');
    const top = card.getBoundingClientRect().top + window.scrollY;
    return {
      start: Math.max(0, top - window.innerHeight * 0.88),
      end: Math.max(0, top - window.innerHeight * 0.52),
    };
  });
  const read = () => page.evaluate(() => {
    const copy = document.querySelector('.feature-chapter-kerko .feature-copy');
    const visual = document.querySelector('.feature-chapter-kerko .feature-visual');
    return {
      copyOpacity: Number(getComputedStyle(copy).opacity),
      copyTransform: getComputedStyle(copy).transform,
      visualOpacity: Number(getComputedStyle(visual).opacity),
      visualTransform: getComputedStyle(visual).transform,
    };
  });

  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), positions.start);
  await page.waitForTimeout(120);
  const start = await read();
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), positions.end);
  await page.waitForTimeout(180);
  return { start, end: await read() };
}

async function measureJourney() {
  const session = await openPage(
    'https://krahaso-measure.test',
    { width: 1363, height: 936 },
  );
  try {
    await session.page.waitForTimeout(250);
    return await session.page.evaluate(() => {
      const universe = document.querySelector('#universi').getBoundingClientRect().height;
      const features = document.querySelector('#veçorite').getBoundingClientRect().height;
      return {
        universe,
        features,
        combined: universe + features,
        documentHeight: document.documentElement.scrollHeight,
      };
    });
  } finally {
    await session.browser.close();
  }
}

let storedBaseline = {
  universe: 3931.1875,
  features: 6014,
  combined: 9945.1875,
  documentHeight: 12694,
};
try {
  const previous = JSON.parse(await readFile(join(output, 'browser-audit.json'), 'utf8'));
  if (previous.baseline?.combined) storedBaseline = previous.baseline;
} catch {
  // The checked-in production baseline above makes the first run deterministic.
}

const audit = {
  generatedAt: new Date().toISOString(),
  browser: { executablePath, version: null },
  reducedMotionQuery: REDUCED_MOTION_QUERY,
  bundles: (await readdir(join(dist, 'assets'))).sort(),
  baseline: storedBaseline,
  current: null,
  pageLengthReduction: null,
  viewports: [],
  reducedMotion: null,
  zoom200: null,
  failures,
};

{
  const browser = await chromium.launch({ executablePath, headless: true, args: browserArgs });
  audit.browser.version = await browser.version();
  await browser.close();
}

audit.current = await measureJourney();
audit.pageLengthReduction = 1 - audit.current.combined / audit.baseline.combined;
requireAudit(
  audit.pageLengthReduction >= 0.35,
  `combined journey reduction was ${(audit.pageLengthReduction * 100).toFixed(1)}%, expected at least 35%`,
);

const viewports = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'desktop-1280x800', width: 1280, height: 800 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'mobile-360x800', width: 360, height: 800 },
];

for (const viewport of viewports) {
  const mobile = viewport.width < 900;
  const session = await openPage(
    `https://krahaso-${viewport.name}.test`,
    { width: viewport.width, height: viewport.height },
    { isMobile: mobile, hasTouch: mobile },
  );
  const { page, consoleErrors, failedRequests } = session;

  try {
    await waitForMotion(page);
    await page.waitForTimeout(780);

    if (viewport.name === 'desktop-1440x900') {
      await page.screenshot({
        path: join(output, 'desktop-1440x900.jpg'), type: 'jpeg', quality: 90,
      });
    }
    if (viewport.name === 'tablet-768x1024') {
      await page.screenshot({
        path: join(output, 'tablet-768x1024.jpg'), type: 'jpeg', quality: 90,
      });
    }
    if (viewport.name === 'mobile-390x844') {
      await page.screenshot({
        path: join(output, 'mobile-390x844.jpg'), type: 'jpeg', quality: 90,
      });
    }

    let heroMotion = null;
    if (viewport.name === 'desktop-1440x900' || viewport.name === 'mobile-390x844') {
      const before = await page.evaluate(() =>
        getComputedStyle(document.querySelector('.hero-phone')).transform,
      );
      await page.waitForTimeout(620);
      heroMotion = {
        before,
        after: await page.evaluate(() =>
          getComputedStyle(document.querySelector('.hero-phone')).transform,
        ),
        animationName: await page.evaluate(() =>
          getComputedStyle(document.querySelector('.hero-phone')).animationName,
        ),
      };
      requireAudit(
        heroMotion.before !== heroMotion.after,
        `${viewport.name}: hero phone drift did not advance`,
      );
    }

    await loadLazyImages(page);
    const base = await collectPageState(page);
    const points = [0, 0.25, 0.55, 0.8, 1];
    const forward = [];
    for (const point of points) forward.push(await sampleUniverse(page, point));
    const reverse = [];
    for (const point of [...points].reverse()) reverse.push(await sampleUniverse(page, point));

    requireAudit(base.title === 'Krahaso çmimet në Kosovë | Krahaso', `${viewport.name}: wrong title`);
    requireAudit(base.horizontalOverflow <= 0, `${viewport.name}: horizontal overflow`);
    requireAudit(base.h1Count === 1, `${viewport.name}: expected one H1`);
    requireAudit(base.duplicateIds.length === 0, `${viewport.name}: duplicate IDs`);
    requireAudit(base.brokenInternalAnchors.length === 0, `${viewport.name}: broken anchors`);
    requireAudit(base.failedImages.length === 0, `${viewport.name}: failed images`);
    requireAudit(base.touchTargetFailures.length === 0, `${viewport.name}: undersized targets`);
    requireAudit(base.motionReady, `${viewport.name}: motion enhancement did not start`);
    requireAudit(
      forward.at(-1).phoneOpacity > forward[0].phoneOpacity + 0.8,
      `${viewport.name}: phone reveal did not advance`,
    );
    requireAudit(
      forward.at(-1).galleryScale < forward[0].galleryScale - 0.2,
      `${viewport.name}: gallery did not compress`,
    );

    for (const sample of forward) {
      const matching = reverse.find(({ progress }) => progress === sample.progress);
      requireAudit(
        matching && Math.abs(sample.galleryScale - matching.galleryScale) <= 0.03 &&
          Math.abs(sample.phoneOpacity - matching.phoneOpacity) <= 0.03,
        `${viewport.name}: universe state did not reverse at ${sample.progress}`,
      );
    }

    let featureMotion = null;
    let orientation = null;
    if (mobile) {
      const stagePosition = await page.evaluate(() =>
        getComputedStyle(document.querySelector('.universe-stage')).position,
      );
      const pinSpacers = await page.locator('.pin-spacer').count();
      requireAudit(stagePosition === 'sticky', `${viewport.name}: mobile stage was not sticky`);
      requireAudit(pinSpacers === 0, `${viewport.name}: mobile pin spacer found`);
      featureMotion = await sampleFeatureMotion(page);
      requireAudit(
        featureMotion.end.copyOpacity > featureMotion.start.copyOpacity + 0.35,
        `${viewport.name}: feature reveal did not advance`,
      );
    }

    if (viewport.name === 'desktop-1440x900') {
      await sampleUniverse(page, 0.55);
      await page.screenshot({
        path: join(output, 'desktop-universe-1440x900.jpg'), type: 'jpeg', quality: 90,
      });
      for (const [selector, filename] of [
        ['.feature-chapter-kerko', 'desktop-feature-1440x900.jpg'],
        ['#ofertat', 'desktop-offers-1440x900.jpg'],
        ['#shkarko', 'desktop-download-1440x900.jpg'],
      ]) {
        await page.locator(selector).scrollIntoViewIfNeeded();
        await page.waitForTimeout(180);
        await page.screenshot({ path: join(output, filename), type: 'jpeg', quality: 90 });
      }
    }

    if (viewport.name === 'mobile-390x844') {
      await sampleUniverse(page, 0.55);
      await page.screenshot({
        path: join(output, 'mobile-universe-390x844.jpg'), type: 'jpeg', quality: 90,
      });
      await page.setViewportSize({ width: 844, height: 390 });
      await page.waitForTimeout(220);
      await sampleUniverse(page, 0.55);
      const landscape = await page.evaluate(() => ({
        ready: document.querySelector('#universi')?.classList.contains('motion-ready'),
        pinSpacers: document.querySelectorAll('.pin-spacer').length,
        stagePosition: getComputedStyle(document.querySelector('.universe-stage')).position,
      }));
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForTimeout(220);
      const portrait = await page.evaluate(() => ({
        ready: document.querySelector('#universi')?.classList.contains('motion-ready'),
        pinSpacers: document.querySelectorAll('.pin-spacer').length,
        stagePosition: getComputedStyle(document.querySelector('.universe-stage')).position,
      }));
      orientation = { landscape, portrait };
      requireAudit(landscape.ready && portrait.ready, 'mobile rotation removed motion');
      requireAudit(
        landscape.pinSpacers === 0 && portrait.pinSpacers === 0,
        'mobile rotation created a pin spacer',
      );
      requireAudit(portrait.stagePosition === 'sticky', 'mobile rotation lost sticky stage');
    }

    requireAudit(consoleErrors.length === 0, `${viewport.name}: console errors`);
    requireAudit(failedRequests.length === 0, `${viewport.name}: failed local requests`);
    audit.viewports.push({
      ...viewport,
      base,
      heroMotion,
      forward,
      reverse,
      featureMotion,
      orientation,
      consoleErrors,
      failedRequests,
    });
  } finally {
    await session.browser.close();
  }
}

{
  const session = await openPage(
    'https://krahaso-reduced.test',
    { width: 390, height: 844 },
    { isMobile: true, hasTouch: true, reducedMotion: 'reduce' },
  );
  try {
    await session.page.waitForTimeout(420);
    const result = await session.page.evaluate(() => {
      const universe = document.querySelector('#universi');
      const phone = document.querySelector('.universe-phone');
      const copy = document.querySelector('.universe-copy');
      const hero = document.querySelector('.hero-phone');
      return {
        motionReady: universe.classList.contains('motion-ready'),
        universeHeight: universe.getBoundingClientRect().height,
        viewportHeight: window.innerHeight,
        phoneOpacity: Number(getComputedStyle(phone).opacity),
        phoneVisibility: getComputedStyle(phone).visibility,
        copyOpacity: Number(getComputedStyle(copy).opacity),
        heroAnimationName: getComputedStyle(hero).animationName,
        horizontalOverflow:
          document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
    audit.reducedMotion = {
      ...result,
      consoleErrors: session.consoleErrors,
      failedRequests: session.failedRequests,
    };
    requireAudit(!result.motionReady, 'reduced motion enabled choreography');
    requireAudit(
      result.universeHeight < result.viewportHeight * 1.2,
      'reduced motion retained a long runway',
    );
    requireAudit(
      result.phoneOpacity === 1 && result.phoneVisibility === 'visible',
      'reduced motion phone was not visible',
    );
    requireAudit(result.copyOpacity === 1, 'reduced motion copy was not visible');
    requireAudit(result.heroAnimationName === 'none', 'reduced motion hero kept animating');
    requireAudit(result.horizontalOverflow <= 0, 'reduced motion layout overflowed');
    requireAudit(session.consoleErrors.length === 0, 'reduced motion console errors');
  } finally {
    await session.browser.close();
  }
}

{
  const session = await openPage(
    'https://krahaso-zoom.test',
    { width: 640, height: 400 },
  );
  try {
    await waitForMotion(session.page);
    const focusSequence = [];
    for (let index = 0; index < 3; index += 1) {
      await session.page.keyboard.press('Tab');
      focusSequence.push(await session.page.evaluate(() => {
        const active = document.activeElement;
        const rect = active.getBoundingClientRect();
        const style = getComputedStyle(active);
        return {
          tag: active.tagName,
          className: active.className,
          text: active.textContent?.trim(),
          width: rect.width,
          height: rect.height,
          outlineStyle: style.outlineStyle,
          outlineWidth: style.outlineWidth,
        };
      }));
    }
    const result = await session.page.evaluate(() => ({
      horizontalOverflow:
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
      headerCta: document.querySelector('.site-header .acquisition-link')?.href,
    }));
    const referrer = new URL(result.headerCta).searchParams.get('referrer');
    audit.zoom200 = {
      ...result,
      referrer,
      focusSequence,
      consoleErrors: session.consoleErrors,
    };
    requireAudit(focusSequence[0]?.className === 'skip-link', 'zoom did not focus skip link first');
    requireAudit(
      focusSequence.every(({ outlineStyle, outlineWidth }) =>
        outlineStyle !== 'none' && outlineWidth !== '0px'),
      'zoom focus outline was missing',
    );
    requireAudit(
      focusSequence.every(({ width, height }) => width >= 44 && height >= 44),
      'zoom focus target was under 44px',
    );
    requireAudit(result.horizontalOverflow <= 0, 'zoom layout overflowed');
    requireAudit(
      referrer === 'utm_source=qa&utm_campaign=tiptop',
      `Play referrer was ${referrer}`,
    );
    requireAudit(session.consoleErrors.length === 0, 'zoom console errors');
  } finally {
    await session.browser.close();
  }
}

await writeFile(
  join(output, 'browser-audit.json'),
  `${JSON.stringify(audit, null, 2)}\n`,
);

console.log(JSON.stringify({
  browser: audit.browser.version,
  reductionPercent: Number((audit.pageLengthReduction * 100).toFixed(1)),
  viewports: audit.viewports.map(({ name, base }) => ({
    name,
    height: base.documentHeight,
    overflow: base.horizontalOverflow,
  })),
  failures,
}, null, 2));

if (failures.length) process.exitCode = 1;
