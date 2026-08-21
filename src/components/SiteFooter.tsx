import { SiApple, SiGoogleplay } from 'react-icons/si';
import { BrandMark } from './BrandMark';
import { trackEvent } from '../lib/analytics';
import { PLAY_STORE_URL } from './AppAcquisitionCta';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <BrandMark inverse />
          <div>
            <strong>Krahaso</strong>
            <p>Skano barkodin, krahaso çmimet dhe shih ku kushton më pak.</p>
          </div>
        </div>
        <nav aria-label="Navigimi në fund">
          <a className="footer-store-link" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
            <SiGoogleplay aria-hidden="true" />
            <span>Google Play</span>
          </a>
          <span className="footer-store-status" aria-label="iOS coming soon">
            <SiApple aria-hidden="true" />
            <span>iOS coming soon</span>
          </span>
          <a
            href="https://admin.krahaso.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('admin_click')}
          >
            Admin
          </a>
        </nav>
        <span className="site-footer-copyright">© 2026 Krahaso</span>
      </div>
    </footer>
  );
}
