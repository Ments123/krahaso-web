import { ArrowUpRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export function PartnerTeaser() {
  return (
    <section id="partneret" className="partner-teaser" aria-labelledby="partner-title">
      <div className="partner-teaser-inner">
        <div>
          <p className="section-label">Për bizneset</p>
          <h2 id="partner-title">Je supermarket apo biznes?<br /><span className="editorial-accent">Bëhu pjesë e Krahaso.</span></h2>
        </div>
        <div className="partner-teaser-action">
          <p>Sill produktet dhe ofertat e tua aty ku konsumatorët po marrin vendimin e blerjes.</p>
          <a
            href="https://admin.krahaso.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('partner_click')}
          >
            Për partnerët <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
