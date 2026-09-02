import { BrandMark } from './BrandMark';
import { trackEvent } from '../lib/analytics';
import { AppAcquisitionCta } from './AppAcquisitionCta';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <BrandMark inverse />
          <div>
            <strong>Krahaso</strong>
            <p>Krahaso para se të blesh.</p>
          </div>
        </div>
        <nav aria-label="Navigimi në fund">
          <AppAcquisitionCta placement="footer" compact />
          <a href="https://api.krahaso.app/privacy" target="_blank" rel="noopener noreferrer">
            Privatësia
          </a>
          <a href="https://api.krahaso.app/account-deletion" target="_blank" rel="noopener noreferrer">
            Fshi llogarinë
          </a>
          <a href="mailto:privacy@krahaso.app">Kontakti</a>
          <a
            href="https://admin.krahaso.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('admin_click')}
          >
            Admin
          </a>
        </nav>
        <span className="site-footer-copyright">© 2026 Krahaso · Kosovë</span>
      </div>
    </footer>
  );
}
