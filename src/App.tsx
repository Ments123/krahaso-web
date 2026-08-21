import { motion, useReducedMotion } from 'framer-motion';
import HeroVideoBg from './HeroVideoBg';
import { AppAcquisitionCta } from './components/AppAcquisitionCta';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';

const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4';

function App() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="premium-shell bg-[#f5f7f3] text-[#162419]">
      <div className="hero-shell">
        <section
          id="fillimi"
          className="hero-card relative w-full overflow-hidden"
          aria-labelledby="hero-title"
        >
          <HeroVideoBg
            src={BG_VIDEO}
            className="absolute inset-0 h-full w-full"
            reducedMotion={Boolean(shouldReduceMotion)}
          />
          <div className="hero-wash absolute inset-0" />
          <SiteHeader />

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="hero-copy relative z-10 flex flex-col items-start justify-center px-5 pb-10 pt-24 text-left sm:px-10 md:px-14"
          >
            <h1
              id="hero-title"
              className="max-w-4xl text-[3.15rem] font-medium leading-[0.88] tracking-[-0.055em] text-[#063d24] sm:text-6xl md:text-7xl lg:text-[5.6rem]"
            >
              Kalo te
              <span className="editorial-accent block text-[#08A64A]">më e lira</span>
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-6 text-[#274a35] sm:mt-7 sm:text-lg sm:leading-7">
              Krahaso çmimet në marketet e Kosovës, skano barkodin dhe shiko menjëherë ku kushton më pak.
            </p>
            <div id="shkarko" className="mt-7 scroll-mt-6">
              <AppAcquisitionCta placement="hero" />
            </div>
          </motion.div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}

export default App;
