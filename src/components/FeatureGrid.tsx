import { ArrowRight, BadgeEuro, ScanBarcode, Search } from 'lucide-react';

const features = [
  {
    className: 'feature-card feature-card-search',
    icon: Search,
    eyebrow: 'Kërko',
    title: 'Kërko produktin',
    description: 'Shkruaj emrin e produktit dhe gjeje pa humbur kohë.',
    visual: (
      <div className="search-result-card" aria-label="Shembull ilustrues i kërkimit">
        <Search aria-hidden="true" />
        <span>Kafe 500 g</span>
      </div>
    ),
  },
  {
    className: 'feature-card feature-card-scan',
    icon: ScanBarcode,
    eyebrow: 'Skano',
    title: 'Skano barkodin',
    description: 'Drejto kamerën te barkodi dhe hape produktin menjëherë.',
    visual: <div className="mini-scanner" aria-hidden="true"><span /><ScanBarcode /></div>,
  },
  {
    className: 'feature-card feature-card-compare',
    icon: BadgeEuro,
    eyebrow: 'Krahaso',
    title: 'Krahaso çmimet',
    description: 'Shih çmimet e të njëjtit produkt aty ku i kemi të disponueshme.',
    visual: (
      <div className="mini-prices" aria-label="Shembull ilustrues i krahasimit të çmimeve">
        <div><span>Çmimi tjetër</span><strong>€3.42</strong></div>
        <div className="is-best"><span>Çmimi më i mirë</span><strong>€3.19</strong></div>
      </div>
    ),
  },
  {
    className: 'feature-card feature-card-offer',
    icon: BadgeEuro,
    eyebrow: 'Zgjidh',
    title: 'Gjej ofertën më të mirë',
    description: 'Krahaso para se të nisesh dhe vendos ku ia vlen të blesh.',
    visual: <div className="offer-badge" aria-hidden="true"><small>Diferenca</small><strong>€0.23</strong></div>,
  },
] as const;

export function FeatureGrid() {
  return (
    <section className="feature-section" aria-labelledby="feature-title">
      <div className="feature-intro reveal">
        <div>
          <p className="section-label">Gjithçka që të duhet</p>
          <h2 id="feature-title">Nga kërkimi te <span className="editorial-accent">zgjedhja.</span></h2>
        </div>
        <div className="feature-intro-copy">
          <p>Katër mënyra të thjeshta për të gjetur produktin dhe për të kuptuar ku kushton më pak.</p>
          <a href="#si-funksionon">Shih si funksionon <ArrowRight aria-hidden="true" /></a>
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
