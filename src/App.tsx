import { motion } from 'framer-motion';
import { ScanBarcode } from 'lucide-react';
import HeroVideoBg from './HeroVideoBg';
import { AppAcquisitionCta } from './components/AppAcquisitionCta';
import { AppProof } from './components/AppProof';
import { DownloadSection } from './components/DownloadSection';
import { FeatureGrid } from './components/FeatureGrid';
import { MobileInstallBar } from './components/MobileInstallBar';
import { PartnerTeaser } from './components/PartnerTeaser';
import { ProductJourney } from './components/ProductJourney';
import { RewardsSection } from './components/RewardsSection';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { launchConfig } from './config/launch';

const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

function App() {
  return (
    <main className="premium-shell bg-[#f5f7f3] text-[#162419]">
      <div className="hero-shell">
        <section
          id="fillimi"
          className="hero-card relative w-full overflow-hidden"
          aria-labelledby="hero-title"
        >
          <HeroVideoBg src={BG_VIDEO} className="absolute inset-0 h-full w-full" />
          <div className="hero-wash absolute inset-0" />
          <SiteHeader />

          <motion.div
            {...fadeUp(0.1)}
            className="hero-copy relative z-10 flex h-full flex-col items-start justify-start px-5 pt-28 text-left sm:px-10 sm:pt-36 md:px-14"
          >
            <h1
              id="hero-title"
              className="max-w-4xl text-[3.15rem] font-medium leading-[0.88] tracking-[-0.055em] text-[#063d24] sm:text-6xl md:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]"
            >
              Kalo te
              <span className="editorial-accent block text-[#08A64A]">më e lira</span>
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-6 text-[#274a35] sm:mt-7 sm:text-lg sm:leading-7">
              Skano barkodin. Krahaso çmimet në supermarketet e Kosovës. Shih ku kushton më pak.
            </p>
          </motion.div>

          <div className="hero-actions absolute bottom-5 left-5 right-5 z-10 max-w-lg sm:bottom-10 sm:left-10 sm:right-auto md:left-14">
            <div className="mb-3 flex items-center gap-2 text-[#3d5638] sm:text-white/95">
              <ScanBarcode className="h-4 w-4" />
              <span className="text-sm font-semibold sm:font-medium">Kërko. Skano. Krahaso.</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <AppAcquisitionCta placement="hero" />
              <a
                href="#si-funksionon"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-[#3d5638] transition-opacity hover:opacity-70 sm:font-medium sm:text-white"
              >
                Shih si funksionon
              </a>
            </div>
          </div>
        </section>
      </div>

      <AppProof />
      <ProductJourney />
      <FeatureGrid />
      <DownloadSection />
      {launchConfig.rewardsEnabled && (
        <RewardsSection rewardsEnabled={launchConfig.rewardsEnabled} />
      )}

      <section className="cinematic-statement" aria-labelledby="statement-title">
        <motion.div {...fadeUp()} className="cinematic-statement-inner">
          <p className="section-label">MË PAK HAMENDËSIM</p>
          <h2 id="statement-title">
            Një barkod. Çmimet që kemi në dispozicion.
            <span> Një zgjedhje më e qartë.</span>
          </h2>
          <p className="statement-copy">
            Krahaso të ndihmon të shohësh ku i njëjti produkt kushton më pak, para se të vendosësh ku të blesh.
          </p>
        </motion.div>
      </section>

      <PartnerTeaser />
      <SiteFooter />
      <MobileInstallBar />
    </main>
  );
}

export default App;
