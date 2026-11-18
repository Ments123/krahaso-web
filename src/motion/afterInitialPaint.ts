export function afterInitialPaint(callback: () => void): () => void {
  let frame = 0;

  const schedule = () => {
    frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(callback);
    });
  };

  if (document.readyState === 'complete') {
    schedule();
  } else {
    window.addEventListener('load', schedule, { once: true });
  }

  return () => {
    window.removeEventListener('load', schedule);
    window.cancelAnimationFrame(frame);
  };
}
