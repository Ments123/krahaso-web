import { afterInitialPaint } from './motion/afterInitialPaint';

const marketPicker = document.querySelector<HTMLElement>('.market-picker');
const marketSelect = marketPicker?.querySelector('select');
const marketView = marketPicker?.querySelector('button');
const marketChart = document.querySelector<HTMLElement>('#market-chart');
const marketSelection = document.querySelector<HTMLElement>('.market-selection');

if (marketPicker && marketSelect && marketView && marketChart && marketSelection) {
  const marketRows = Array.from(marketChart.querySelectorAll<HTMLLIElement>('li'));
  for (const row of marketRows) {
    const name = row.firstElementChild?.textContent;
    if (name && row.dataset.market) marketSelect.add(new Option(name, row.dataset.market));
  }
  const updateSelection = () => {
    const selected = marketRows.find(row => row.dataset.market === marketSelect.value);
    for (const row of marketRows) {
      row.toggleAttribute('data-selected', row === selected);
    }
    const name = selected?.firstElementChild?.textContent;
    const volume = selected?.querySelector('data')?.textContent;
    marketSelection.textContent = name && volume ? `${name} · ${volume} distinct daily observations` : '';
  };
  marketSelect.addEventListener('change', updateSelection);
  marketView.addEventListener('click', () => {
    const comparing = marketChart.toggleAttribute('data-compare');
    marketView.setAttribute('aria-pressed', String(comparing));
  });
  updateSelection();
  marketPicker.hidden = false;
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
