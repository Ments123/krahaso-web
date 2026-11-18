import { afterInitialPaint } from './motion/afterInitialPaint';

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
