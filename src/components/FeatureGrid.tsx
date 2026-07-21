import { ArrowRight, BadgeEuro, ScanBarcode, Search, ShoppingBasket } from 'lucide-react';

const features = [
  {
    className: 'feature-card feature-card-compare',
    icon: Search,
    eyebrow: 'Krahaso',
    title: 'Krahaso çmimet',
    description: 'I njëjti produkt, çmime të ndryshme. Shih ku ia vlen të blesh.',
    visual: (
      <div className="mini-prices" aria-label="Shembull ilustrues i krahasimit të çmimeve">
        <div><span>Market A</span><strong>€3.42</strong></div>
        <div className="is-best"><span>Çmimi më i mirë</span><strong>€3.19</strong></div>
      </div>
    ),
  },
  {
    className: 'feature-card feature-card-scan',
    icon: ScanBarcode,
    eyebrow: 'Skano',
    title: 'Skano barkodin',
    description: 'Drejto kamerën te barkodi dhe hape produktin pa kërkime të gjata.',
    visual: <div className="mini-scanner" aria-hidden="true"><span /><ScanBarcode /></div>,
  },
  {
    className: 'feature-card feature-card-offer',
    icon: BadgeEuro,
    eyebrow: 'Zgjidh',
    title: 'Gjej ofertën më të mirë',
    description: 'Krahaso para se të nisesh dhe vendos me më shumë siguri.',
    visual: <div className="offer-badge" aria-hidden="true"><small>Kursen</small><strong>€1.80</strong></div>,
  },
  {
    className: 'feature-card feature-card-reward',
    icon: ShoppingBasket,
    eyebrow: 'Fito',
    title: 'Skano faturën dhe fito',
    description: 'Pas blerjes, ruaje faturën dhe mblidh pikë për shpërblime.',
    visual: <div className="reward-pill" aria-hidden="true"><span>Fatura u verifikua</span><strong>+85 pikë</strong></div>,
  },
] as const;

export function FeatureGrid() {
  return (
    <section id="manifesti" className="feature-section" aria-labelledby="feature-title">
      <div className="feature-intro reveal">
        <div>
          <p className="section-label">Mënyra e re për të blerë</p>
          <h2 id="feature-title">Njihu me <span className="editorial-accent">Krahaso.</span></h2>
        </div>
        <div className="feature-intro-copy">
          <p>Çmimet, produktet dhe ofertat e supermarketeve, të mbledhura në një vend.</p>
          <a href="#product-journey">Shih si funksionon <ArrowRight aria-hidden="true" /></a>
        </div>
      </div>

      <div className="feature-grid">
        {features.map(({ className, icon: Icon, eyebrow, title, description, visual }) => (
          <article key={title} className={`${className} reveal`}>
            <div className="feature-card-top">
              <span className="feature-icon"><Icon aria-hidden="true" /></span>
              <span>{eyebrow}</span>
            </div>
            <div className="feature-visual">{visual}</div>
            <div className="feature-copy">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
