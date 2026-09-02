import { SiGoogleplay } from 'react-icons/si';
import { PhoneFrame } from './PhoneFrame';
import { AppAcquisitionCta } from './AppAcquisitionCta';

export function HeroSection() {
  return (
    <section id="fillimi" className="hero" aria-labelledby="hero-title">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Krahaso</p>
          <h1 id="hero-title">Krahaso para se të blesh.</h1>
          <p className="hero-lede">
            Skano ose kërko produktin dhe shiko çmimet që kemi nga marketet e Kosovës.
          </p>
          <div className="hero-actions">
            <AppAcquisitionCta placement="hero" />
          </div>
          <p className="hero-trust">
            <span className="trust-dot" aria-hidden="true" />
            Çmime reale nga marketet e Kosovës
          </p>
        </div>

        <div className="hero-product" aria-label="Pamje e aplikacionit Krahaso">
          <div className="hero-phone-glow" aria-hidden="true" />
          <PhoneFrame className="hero-phone" priority />
          <div className="hero-float-card hero-float-search" aria-hidden="true">
            <span>Kërko</span>
            <strong>Produktin tënd</strong>
          </div>
          <div className="hero-float-card hero-float-offer" aria-hidden="true">
            <SiGoogleplay />
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
