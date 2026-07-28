import { useEffect, useRef } from 'react';
import { trackEvent } from '../lib/analytics';

export function ProductJourney() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      trackEvent('barcode_demo_view');
      observer.disconnect();
    }, { threshold: 0.2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="si-funksionon"
      ref={sectionRef}
      className="product-journey bg-[#f5f7f3] px-3 pb-3 sm:px-4 sm:pb-4"
      aria-labelledby="journey-title"
    >
      <div className="mx-auto max-w-[1400px] px-3 pb-10 pt-16 sm:px-8 sm:pb-16 sm:pt-24 lg:flex lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#08A64A]">Si funksionon</p>
          <h2 id="journey-title" className="mt-4 max-w-4xl text-[clamp(2.8rem,7vw,6.8rem)] font-normal leading-[0.88] tracking-[-0.055em] text-[#1f2a1d]">
            Nga barkodi te <span className="editorial-accent text-[#08A64A]">më e lira.</span>
          </h2>
        </div>
        <p className="mt-6 max-w-md text-sm leading-6 text-[#4b5b47] sm:text-base lg:mb-2 lg:mt-0">
          Tre hapa që e bëjnë krahasimin e të njëjtit produkt më të qartë.
        </p>
      </div>

      <div className="journey-rail space-y-3 sm:space-y-4">
        <article id="skano" className="journey-step mobile-compact journey-step-scan relative overflow-hidden bg-[#1f2a1d] text-white" aria-labelledby="scan-title">
          <div className="journey-glow" aria-hidden="true" />
          <div className="journey-number" aria-hidden="true">01</div>
          <div className="journey-copy">
            <p className="journey-label">Skano</p>
            <h3 id="scan-title">Skano barkodin.</h3>
            <p>Drejto kamerën te barkodi i produktit.</p>
          </div>
          <div className="scan-stage journey-visual">
            <div className="scan-radar" aria-hidden="true" />
            <div className="scanner-phone" role="img" aria-label="Shembull i skanimit të barkodit">
              <div className="scanner-screen">
                <div className="scanner-frame">
                  <span className="scanner-corner scanner-corner-top" />
                  <span className="scanner-corner scanner-corner-bottom" />
                  <span className="scan-line" />
                  <div className="barcode" />
                </div>
                <p>Vendose barkodin brenda kornizës</p>
              </div>
            </div>
            <div className="scan-result">Barkodi u njoh</div>
          </div>
        </article>

        <article id="krahaso" className="journey-step mobile-compact journey-step-compare relative overflow-hidden bg-[#dcebdc]" aria-labelledby="compare-title">
          <div className="journey-number" aria-hidden="true">02</div>
          <div className="journey-copy">
            <p className="journey-label">Krahaso</p>
            <h3 id="compare-title">Shih çmimet menjëherë.</h3>
            <p>Krahaso të njëjtin produkt në supermarketet ku kemi çmime të disponueshme.</p>
          </div>
          <div className="comparison-stage journey-visual">
            <div className="comparison-orbit comparison-orbit-outer" aria-hidden="true" />
            <div className="comparison-orbit comparison-orbit-inner" aria-hidden="true" />
            <div className="comparison-signal comparison-signal-other">
              <span>Çmimi tjetër</span>
              <strong>€3.42</strong>
            </div>
            <img
              src="/products/coffee-cutout.svg"
              alt="Pako kafeje"
              loading="lazy"
              decoding="async"
              className="product-cutout"
            />
            <div className="comparison-signal comparison-signal-best">
              <span>Çmimi më i ulët</span>
              <strong>€3.19</strong>
            </div>
            <small>Çmime ilustruese</small>
          </div>
        </article>

        <article id="zgjidh" className="journey-step mobile-compact journey-step-choice relative overflow-hidden bg-[#08A64A] text-white" aria-labelledby="choose-title">
          <div className="journey-number" aria-hidden="true">03</div>
          <div className="journey-copy">
            <p className="journey-label">Zgjidh</p>
            <h3 id="choose-title">Kalo te <span>më e lira.</span></h3>
            <p>Shih diferencën dhe vendos ku ia vlen të blesh.</p>
          </div>
          <div className="choice-stage journey-visual" aria-label="Shembull ilustrues i zgjedhjes së çmimit më të ulët">
            <div className="choice-ring choice-ring-outer" aria-hidden="true" />
            <div className="choice-ring choice-ring-inner" aria-hidden="true" />
            <div className="choice-card">
              <span>Çmimi më i ulët</span>
              <strong>€3.19</strong>
              <small>− €0.23 nga çmimi tjetër</small>
            </div>
            <small className="choice-disclaimer">Çmime ilustruese</small>
          </div>
        </article>
      </div>
    </section>
  );
}
