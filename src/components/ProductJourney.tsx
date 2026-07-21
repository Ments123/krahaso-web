export function ProductJourney() {
  return (
    <section
      id="product-journey"
      className="product-journey bg-[#f5f7f3] px-3 pb-3 sm:px-4 sm:pb-4"
      aria-labelledby="journey-title"
    >
      <div className="mx-auto max-w-[1400px] px-3 pb-10 pt-6 sm:px-8 sm:pb-16 sm:pt-10 lg:flex lg:items-end lg:justify-between">
        <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#08A64A]">Si funksionon</p>
          <h2 id="journey-title" className="mt-4 max-w-4xl text-[clamp(2.8rem,7vw,6.8rem)] font-normal leading-[0.88] tracking-[-0.055em] text-[#1f2a1d]">
            Tre hapa. <span className="editorial-accent text-[#08A64A]">Një zgjedhje më e mirë.</span>
          </h2>
        </div>
        <p className="mt-6 max-w-md text-sm leading-6 text-[#4b5b47] sm:text-base lg:mb-2 lg:mt-0">
          Nga rafti te çmimi më i mirë, Krahaso ta bën vendimin më të thjeshtë.
        </p>
      </div>

      <div className="journey-rail space-y-3 sm:space-y-4">
        <article id="krahaso" className="journey-step mobile-compact journey-step-compare relative overflow-hidden bg-[#dcebdc]" aria-labelledby="compare-title">
          <div className="journey-number" aria-hidden="true">01</div>
          <div className="journey-copy">
            <p className="journey-label">Krahaso</p>
            <h3 id="compare-title">Gjeje produktin.<br /><span>Zgjidh çmimin.</span></h3>
            <p>Krahaso çmimet e të njëjtit produkt dhe shih ku ia vlen të blesh.</p>
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
              <span>Çmimi më i mirë</span>
              <strong>€3.19</strong>
            </div>
            <small>Çmime ilustruese</small>
          </div>
        </article>

        <article id="skano" className="journey-step mobile-compact journey-step-scan relative overflow-hidden bg-[#1f2a1d] text-white" aria-labelledby="scan-title">
          <div className="journey-glow" aria-hidden="true" />
          <div className="journey-number" aria-hidden="true">02</div>
          <div className="journey-copy">
            <p className="journey-label">Skano</p>
            <h3 id="scan-title">Skano barkodin.<br /><span>Shih çmimet menjëherë.</span></h3>
            <p>Një skanim të çon te çmimet e produktit në supermarketet e listuara në Krahaso.</p>
          </div>
          <div className="scan-stage journey-visual">
            <div className="price-plane price-plane-left" aria-hidden="true" />
            <div className="price-plane price-plane-right" aria-hidden="true" />
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

        <article id="fito" className="journey-step mobile-compact journey-step-reward relative overflow-hidden bg-[#b8cdb9]" aria-labelledby="earn-title">
          <div className="journey-number" aria-hidden="true">03</div>
          <div className="journey-copy">
            <p className="journey-label">Fito · Vetëm për shpërblime</p>
            <h3 id="earn-title">Skano faturën.<br /><span>Fito shpërblime.</span></h3>
            <p>Pas blerjes, ruaje faturën dhe mblidh pikë. Krahasimi i çmimeve vazhdon të nisë nga barkodi.</p>
          </div>
          <div className="reward-orbit journey-visual">
            <div className="reward-ring reward-ring-large" aria-hidden="true" />
            <div className="reward-ring reward-ring-small" aria-hidden="true" />
            <div className="reward-confirmation">
              <span>Blerja u verifikua</span>
              <strong>+85 pikë</strong>
            </div>
            <div className="reward-card">
              <div><span>Pikët e tua</span><b>K</b></div>
              <strong>1,240</strong>
              <div className="reward-progress"><span /></div>
              <small><span>Tani</span><span>2,000</span></small>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
