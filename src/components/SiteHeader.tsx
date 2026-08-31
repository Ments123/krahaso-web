import { BrandMark } from './BrandMark';
import { AppAcquisitionCta } from './AppAcquisitionCta';

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-nav section-shell" aria-label="Navigimi kryesor">
        <a href="#fillimi" className="site-brand" aria-label="Krahaso, në fillim">
          <BrandMark />
          <span>Krahaso</span>
        </a>
        <div className="site-nav-links">
          <a href="#veçorite">Si funksionon</a>
          <a href="#ofertat">Marketet</a>
          <AppAcquisitionCta placement="nav" compact />
        </div>
      </nav>
    </header>
  );
}
