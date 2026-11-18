import { afterInitialPaint } from './motion/afterInitialPaint';

const indexUrl = 'https://stats.krahaso.app/pub/balkan.json';
const marketNames = new Intl.DisplayNames(['en-GB'], { type: 'region', fallback: 'none' });
const priceFormat = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });
const dateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' });

interface SamplePrice {
  market: string;
  euros: number;
}

interface SampleProduct {
  id: string;
  name: string;
  prices: SamplePrice[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseSnapshot(value: unknown) {
  if (!isRecord(value) || typeof value.asOf !== 'string' || !Array.isArray(value.examples)) return;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value.asOf)) return;
  const date = new Date(value.asOf + 'T00:00:00Z');
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value.asOf) return;

  const products: SampleProduct[] = [];
  for (const example of value.examples) {
    if (!isRecord(example) || typeof example.gtin !== 'string' || !/^\d{8,14}$/.test(example.gtin)) continue;
    if (typeof example.name !== 'string' || !example.name.trim() || !isRecord(example.prices)) continue;

    const prices: SamplePrice[] = [];
    for (const [code, price] of Object.entries(example.prices)) {
      if (!/^[A-Z]{2}$/.test(code) || !isRecord(price)) continue;
      if (typeof price.eur !== 'number' || !Number.isFinite(price.eur) || price.eur <= 0) continue;
      if (typeof price.chains !== 'number' || !Number.isInteger(price.chains) || price.chains < 2) continue;
      const market = marketNames.of(code);
      if (market) prices.push({ market, euros: price.eur });
    }
    if (prices.length >= 2) products.push({ id: example.gtin, name: example.name.trim(), prices });
  }
  if (products.length) return { date, asOf: value.asOf, products };
}

function drawPrices(chart: HTMLUListElement, product: SampleProduct) {
  const max = Math.ceil(Math.max(...product.prices.map(({ euros }) => euros)));
  const rows = product.prices.map(({ market, euros }) => {
    const row = document.createElement('li');
    const label = document.createElement('span');
    const price = document.createElement('data');
    const track = document.createElement('div');

    label.textContent = market;
    price.value = euros.toFixed(2);
    price.textContent = priceFormat.format(euros);
    row.style.setProperty('--share', String(euros / max));
    track.className = 'sample-track';
    track.setAttribute('aria-hidden', 'true');
    track.append(document.createElement('span'));
    row.append(label, price, track);
    return row;
  });
  chart.replaceChildren(...rows);
  return max;
}

async function loadSample(sample: HTMLElement) {
  const select = sample.querySelector<HTMLSelectElement>('#sample-product');
  const chart = sample.querySelector<HTMLUListElement>('#sample-markets');
  const time = sample.querySelector<HTMLTimeElement>('#sample-date');
  const status = sample.querySelector<HTMLParagraphElement>('#sample-status');
  const scaleMax = sample.querySelector<HTMLSpanElement>('#sample-scale-max');
  if (!select || !chart || !time || !status || !scaleMax) return;

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch(indexUrl, { credentials: 'omit', signal: controller.signal });
    if (!response.ok) return;
    const snapshot = parseSnapshot(await response.json());
    if (!snapshot || snapshot.asOf < time.dateTime) return;

    const selectedId = snapshot.products.find(({ id }) => id === select.value)?.id ?? snapshot.products[0].id;
    const options = snapshot.products.map(({ id, name }) => new Option(name, id, false, id === selectedId));
    select.replaceChildren(...options);
    select.disabled = snapshot.products.length < 2;
    time.dateTime = snapshot.asOf;
    time.textContent = dateFormat.format(snapshot.date);

    const render = (selected: string, announce = false) => {
      const product = snapshot.products.find(({ id }) => id === selected);
      if (!product) return;
      scaleMax.textContent = priceFormat.format(drawPrices(chart, product));
      if (announce) status.textContent = `${product.name}. Prices shown for ${product.prices.length} markets.`;
    };

    render(selectedId);
    select.addEventListener('change', () => {
      chart.dataset.changing = '';
      render(select.value, true);
    });
  } catch {
    // The dated HTML sample remains readable if the public feed is unavailable.
  } finally {
    window.clearTimeout(timeout);
  }
}

const sample = document.querySelector<HTMLElement>('#public-sample');
if (sample) {
  afterInitialPaint(() => {
    if (!('IntersectionObserver' in window)) {
      void loadSample(sample);
      return;
    }
    const visible = new IntersectionObserver((entries, observer) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        target.classList.add('data-entered');
        if (target === sample) void loadSample(sample);
        observer.unobserve(target);
      }
    }, { threshold: 0.1 });
    visible.observe(sample);
    document.querySelectorAll('[data-reveal]').forEach(element => visible.observe(element));
  });
}
