import { BrandMark } from './BrandMark';
import { trackEvent } from '../lib/analytics';

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
          <a href="#si-funksionon">Si funksionon</a>
          <a href="#aplikacioni">Aplikacioni</a>
          <a href="#partneret">Për partnerët</a>
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
