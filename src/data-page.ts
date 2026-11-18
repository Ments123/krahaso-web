import { afterInitialPaint } from './motion/afterInitialPaint';

const marketPicker = document.querySelector<HTMLElement>('.market-picker');
const marketSelect = marketPicker?.querySelector('select');
const marketRows = document.querySelectorAll<HTMLLIElement>('#market-chart > li');

if (marketPicker && marketSelect && marketRows.length) {
  for (const row of marketRows) {
    const name = row.firstElementChild?.textContent;
    if (name && row.dataset.market) marketSelect.add(new Option(name, row.dataset.market));
  }
  marketPicker.hidden = false;
  marketSelect.addEventListener('change', () => {
    for (const row of marketRows) {
      row.toggleAttribute('data-selected', row.dataset.market === marketSelect.value);
    }
  });
}

afterInitialPaint(() => {
  if (!('IntersectionObserver' in window)) return;

  const reveal = new IntersectionObserver((entries, observer) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      target.classList.add('data-entered');
      observer.unobserve(target);
    }
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-reveal]').forEach(element => reveal.observe(element));
});
