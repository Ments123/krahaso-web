import { retailerLogos } from '../content/landing';
import { PhoneFrame } from './PhoneFrame';

export function OfferProof() {
  return (
    <section id="ofertat" className="offer-proof" aria-labelledby="offers-title">
      <div className="offer-proof-inner section-shell">
        <div className="offer-proof-copy">
          <p className="eyebrow">Oferta që mund t’i shohësh</p>
          <h2 id="offers-title">Ofertat e marketeve, në një vend.</h2>
          <p>
            Shfleto ofertat që Krahaso i ka në dispozicion dhe hyr te marketi
            ose produkti që të intereson. Çmimet në aplikacion pasqyrojnë të
            dhënat e mbledhura nga marketet.
          </p>
          <div className="retailer-strip" aria-label="Disa nga marketet që shfaqen në Krahaso">
            {retailerLogos.map((logo) => (
              <div className="retailer-logo" key={logo.src}>
                <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>

        <div className="offer-proof-visual">
          <div className="offer-proof-card offer-proof-card-left" aria-hidden="true">
            <span>Oferta</span>
            <strong>Kur i kemi, i sheh këtu.</strong>
          </div>
          <PhoneFrame
            className="offer-phone"
            focus="ofertat"
            label="Pamje reale e ofertave në aplikacionin Krahaso"
          />
          <div className="offer-proof-card offer-proof-card-right" aria-hidden="true">
            <span>Kosovë</span>
            <strong>Marketet në një aplikacion.</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
