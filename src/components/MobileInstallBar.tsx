import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { AppAcquisitionCta } from './AppAcquisitionCta';
import { BrandMark } from './BrandMark';
import { getAcquisitionLinks, launchConfig } from '../config/launch';
import { detectPlatform } from '../lib/platform';

const DISMISS_KEY = 'krahaso-install-bar-dismissed';

export function MobileInstallBar() {
  const [heroPassed, setHeroPassed] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const links = getAcquisitionLinks(launchConfig, detectPlatform());
  const active = links.length > 0 && heroPassed && !dismissed;

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === 'true');
    const hero = document.getElementById('fillimi');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroPassed(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0.05 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('has-mobile-install-bar', active);
    return () => document.body.classList.remove('has-mobile-install-bar');
  }, [active]);

  if (links.length === 0 || dismissed || !heroPassed) return null;

  return (
    <aside
      className="mobile-install-bar mobile-install-bar-visible"
      aria-label="Shkarko Krahaso"
    >
      <BrandMark />
      <div className="mobile-install-copy">
        <strong>Krahaso</strong>
        <span>Gjej ku kushton më pak</span>
      </div>
      <AppAcquisitionCta placement="sticky" compact />
      <button
        type="button"
        className="mobile-install-dismiss"
        aria-label="Mbyll njoftimin e shkarkimit"
        onClick={() => {
          sessionStorage.setItem(DISMISS_KEY, 'true');
          setDismissed(true);
        }}
      >
        <X aria-hidden="true" />
      </button>
    </aside>
  );
}
