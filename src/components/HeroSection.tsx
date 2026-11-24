import { liveMarkets } from '../content/landing';
import { PhoneFrame } from './PhoneFrame';
import { AppAcquisitionCta } from './AppAcquisitionCta';

export function HeroSection() {
  return (
    <section id="fillimi" className="hero" aria-labelledby="hero-title">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Çmimet e marketeve</p>
          <h1 id="hero-title">Krahaso <em>para se të blesh.</em></h1>
          <p className="hero-lede">
            Skano ose kërko produktin dhe krahaso çmimet e marketeve në qytetin tënd.
          </p>
          <div className="hero-actions">
            <AppAcquisitionCta placement="hero" />
          </div>
          <div className="hero-coverage">
            <p className="coverage-label" id="coverage-label">
              <span className="trust-dot" aria-hidden="true" />
              Tani në {liveMarkets.length} vende
            </p>
            <ul className="coverage-countries" aria-labelledby="coverage-label" role="list">
              {liveMarkets.map((country) => <li key={country}>{country}</li>)}
            </ul>
            <p className="coverage-next"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></svg> Së shpejti në gjithë Ballkanin.</p>
          </div>
        </div>

        <div className="hero-product" aria-label="Pamje e aplikacionit Krahaso">
          <div className="hero-phone-glow" aria-hidden="true" />
          <PhoneFrame className="hero-phone" priority />
          <div className="hero-float-card hero-float-search" aria-hidden="true">
            <span>Kërko</span>
            <strong>Produktin tënd</strong>
          </div>
          <div className="hero-float-card hero-float-offer" aria-hidden="true">
            <span>Falas</span>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#universi" aria-label="Vazhdo te pamja e aplikacionit">
        <span>Shiko si funksionon</span>
        <span className="scroll-cue-line" aria-hidden="true" />
      </a>
    </section>
  );
}
