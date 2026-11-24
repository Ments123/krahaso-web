import { retailerLogos } from '../content/landing';
import { PhoneFrame } from './PhoneFrame';

export function OfferProof() {
  return (
    <section id="ofertat" className="offer-proof" aria-labelledby="offers-title">
      <div className="offer-proof-inner section-shell">
        <div className="offer-proof-copy">
          <p className="eyebrow">Nga fletushkat e javës</p>
          <h2 id="offers-title">Ofertat e marketeve, në një vend.</h2>
          <p>
            Shfleto fletushkat, gjej produktin që të duhet dhe krahaso ofertat
            në zonën tënde. Marketet dhe ofertat ndryshojnë sipas qytetit.
          </p>
          <ul className="retailer-strip" role="list" aria-label="Disa nga marketet që shfaqen në Krahaso">
            {retailerLogos.map((logo) => (
              <li className="retailer-logo" key={logo.src}>
                <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>

        <div className="offer-proof-visual">
          <PhoneFrame
            className="offer-phone"
            screen="offers"
            label="Pamje reale e ofertave në aplikacionin Krahaso"
          />
          <p className="offer-caption">Një vështrim brenda aplikacionit · Ofertat</p>
        </div>
      </div>
    </section>
  );
}
