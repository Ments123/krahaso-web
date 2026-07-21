import { useEffect, useRef, useState } from 'react';
import { LogIn, UserPlus, Play, Sparkles, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import BoomerangVideoBg from './BoomerangVideoBg';
import { ProductJourney } from './components/ProductJourney';
import { AppProof } from './components/AppProof';
import { FeatureGrid } from './components/FeatureGrid';

const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4';

const navLinks = [
  { href: '#krahaso', label: 'Krahaso' },
  { href: '#skano', label: 'Skano' },
  { href: '#fito', label: 'Fito' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-9 w-9 place-items-center rounded-[11px] text-lg font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,.35)] ${
        inverse ? 'bg-white text-[#08A64A]' : 'bg-[#08A64A] text-white'
      }`}
    >
      K
    </span>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (menuOpen) {
      drawerRef.current?.removeAttribute('inert');
    } else {
      drawerRef.current?.setAttribute('inert', '');
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    if (menuOpen) window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <main className="premium-shell bg-[#f5f7f3] text-[#162419]">
      <div className="hero-shell">
      <section className="hero-card relative w-full overflow-hidden" aria-labelledby="hero-title">
        <BoomerangVideoBg src={BG_VIDEO} className="absolute inset-0 h-full w-full" />
        <div className="hero-wash absolute inset-0" />

        <nav className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-4 py-4 sm:px-7 sm:py-7 md:px-10" aria-label="Navigimi kryesor">
          <a href="#fillimi" className="flex items-center gap-2.5 text-[#2d3a2a]" aria-label="Krahaso, në fillim">
            <BrandMark />
            <span className="text-lg font-semibold tracking-[-0.035em] sm:text-xl md:text-2xl">Krahaso</span>
          </a>

          <div className="liquid-glass hidden items-center gap-1 rounded-full py-1 pl-6 pr-1 lg:flex">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm transition-colors ${index === 0 ? 'font-semibold text-[#1f2a1d]' : 'font-medium text-[#4b5b47] hover:text-[#1f2a1d]'}`}
              >
                {link.label}
              </a>
            ))}
            <a href="#aplikacioni" className="ml-2 rounded-full bg-[#1f2a1d] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2a3827]">
              Vjen së shpejti
            </a>
          </div>

          <div className="flex items-center gap-3 text-[#2d3a2a] sm:gap-6">
            <a href="#partneret" className="hidden items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70 sm:flex">
              <UserPlus className="h-4 w-4" />
              Partnerët
            </a>
            <a href="https://admin.krahaso.app" className="hidden items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70 sm:flex">
              <LogIn className="h-4 w-4" />
              Admin
            </a>
            <button
              onClick={() => setMenuOpen((value) => !value)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/70 text-[#1f2a1d] backdrop-blur-md transition-all duration-300 hover:bg-white/90 lg:hidden"
              aria-label={menuOpen ? 'Mbyll menynë' : 'Hap menynë'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className={`absolute h-5 w-5 transition-all duration-300 ${menuOpen ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
              <X className={`absolute h-5 w-5 transition-all duration-300 ${menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`} />
            </button>
          </div>
        </nav>

        <div
          className={`fixed inset-0 z-20 bg-[#1f2a1d]/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        <aside
          id="mobile-menu"
          ref={drawerRef}
          className={`fixed bottom-0 right-0 top-0 z-20 w-[85%] max-w-sm bg-white/95 shadow-2xl backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          aria-label="Menyja mobile"
          aria-hidden={!menuOpen}
        >
          <div className="flex h-full flex-col px-8 pb-8 pt-24">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`border-b border-[#1f2a1d]/10 py-4 text-2xl font-semibold text-[#1f2a1d] transition-all duration-500 ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                  style={{ transitionDelay: menuOpen ? `${150 + index * 70}ms` : '0ms' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div
              className={`mt-8 flex flex-col gap-5 transition-all duration-500 ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? '400ms' : '0ms' }}
            >
              <a href="#partneret" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a] sm:hidden">
                <UserPlus className="h-4 w-4" /> Partnerët
              </a>
              <a href="https://admin.krahaso.app" className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a] sm:hidden">
                <LogIn className="h-4 w-4" /> Admin
              </a>
              <a href="#aplikacioni" onClick={() => setMenuOpen(false)} className="mt-2 rounded-full bg-[#1f2a1d] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2a3827]">
                Vjen së shpejti
              </a>
            </div>
          </div>
        </aside>

        <motion.div {...fadeUp(0.1)} id="fillimi" className="hero-copy relative z-10 flex h-full flex-col items-start justify-start px-5 pt-28 text-left sm:px-10 sm:pt-36 md:px-14">
          <h1
            id="hero-title"
            className="max-w-4xl text-[3.15rem] font-medium leading-[0.88] tracking-[-0.055em] text-[#063d24] sm:text-6xl md:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]"
          >
            Harro fletushkat.
            <span className="editorial-accent block text-[#08A64A]">Krahaso më zgjuar.</span>
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-6 text-[#274a35] sm:mt-7 sm:text-lg sm:leading-7">
            Skano barkodin, krahaso çmimet dhe zgjidh më lirë, direkt nga telefoni.
          </p>
        </motion.div>

        <div className="hero-actions absolute bottom-5 left-5 right-5 z-10 max-w-sm sm:bottom-10 sm:left-10 sm:right-auto md:left-14">
          <div className="mb-3 flex items-center gap-2 text-[#3d5638] sm:text-white/95">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold sm:font-medium">Krahaso. Skano. Fito.</span>
          </div>
          <p className="mb-6 max-w-xs text-xs font-medium leading-relaxed text-[#3d5638]/90 sm:font-normal sm:text-white/85">
            Shporta jote, çmimet e tua, një zgjedhje më e mirë.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#aplikacioni" className="primary-pill rounded-full bg-[#08A64A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#07883d] sm:px-7 sm:py-3.5">
              Vjen së shpejti
            </a>
            <a href="#manifesti" className="text-sm font-semibold text-[#3d5638] transition-opacity hover:opacity-70 sm:font-medium sm:text-white">Zbulo më shumë.</a>
          </div>
        </div>

        <a href="#aplikacioni" className="absolute bottom-8 right-6 z-10 hidden items-center gap-2 text-sm text-white/90 sm:flex md:bottom-10 md:right-10">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30"><Play className="ml-0.5 h-3 w-3 fill-white text-white" /></span>
          <span className="font-medium">Shiko aplikacionin</span>
        </a>
      </section>
      </div>

      <section id="manifesti" className="cinematic-statement" aria-labelledby="statement-title">
        <motion.div {...fadeUp()} className="cinematic-statement-inner">
          <p className="section-label">MËNYRA E RE PËR TË BLERË</p>
          <h2 id="statement-title">
            Krahaso ka ndryshuar mënyrën si i gjen çmimet.
            <span> A je gati të blesh më zgjuar?</span>
          </h2>
          <p className="statement-copy">Më pak kërkim. Më pak fletushka. Më shumë qartësi para çdo blerjeje.</p>
        </motion.div>
      </section>

      <motion.div {...fadeUp()} className="solution-wrap">
        <p className="solution-label">Zgjidhje</p>
        <FeatureGrid />
      </motion.div>

      <ProductJourney />
      <AppProof />

      <section id="partneret" className="relative overflow-hidden bg-[#e8ece5] px-3 py-3 sm:px-4 sm:py-4" aria-labelledby="stores-title">
        <div className="partner-card reveal relative mx-auto grid max-w-[1400px] overflow-hidden rounded-[32px] bg-[#dce5d9] px-6 py-10 sm:rounded-[48px] sm:px-12 sm:py-14 lg:grid-cols-[1fr_.75fr] lg:items-end lg:gap-20 lg:px-16 lg:py-20">
          <span className="absolute -right-10 top-1/2 -translate-y-1/2 select-none text-[23rem] font-medium leading-none tracking-[-0.1em] text-white/40 sm:text-[34rem]" aria-hidden="true">K</span>
          <div className="relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#85AB8B]">Për partnerët</p>
            <h2 id="stores-title" className="mt-4 max-w-3xl text-[clamp(3rem,6vw,6.8rem)] font-normal leading-[0.88] tracking-[-0.055em]">Bëhu pjesë e zgjedhjes.</h2>
          </div>
          <div className="relative z-10 mt-8 border-t border-[#1f2a1d]/10 pt-6 lg:mt-0">
            <p className="max-w-lg text-sm leading-6 text-[#4b5b47] sm:text-base sm:leading-7">Sill çmimet dhe ofertat e tua aty ku konsumatorët po marrin vendimin e blerjes.</p>
            <a href="https://admin.krahaso.app" className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[#1f2a1d] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2a3827]"><LogIn className="h-4 w-4" /> Hyr në admin</a>
          </div>
        </div>
      </section>

      <section id="shkarko" className="relative flex min-h-[72svh] items-center overflow-hidden bg-[#1f2a1d] px-5 py-20 text-white sm:min-h-[82vh] sm:px-10 sm:py-24 lg:min-h-[92vh] lg:px-16" aria-labelledby="download-title">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(133,171,139,.24),transparent_34%),radial-gradient(circle_at_18%_82%,rgba(255,255,255,.08),transparent_32%)]" />
        <div className="closing-ring closing-ring-one absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[680px] sm:w-[680px]" aria-hidden="true" />
        <div className="closing-ring closing-ring-two absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#85AB8B]/20 sm:h-[500px] sm:w-[500px]" aria-hidden="true" />
        <span className="closing-k absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[24rem] font-medium leading-none tracking-[-0.11em] text-white/[0.055] sm:text-[44rem]" aria-hidden="true">K</span>
        <div className="reveal relative z-10 mx-auto w-full max-w-[1400px] text-center">
          <div className="mx-auto flex w-fit items-center gap-3"><BrandMark inverse /><span className="text-xl font-semibold tracking-[-0.04em]">Krahaso</span></div>
          <h2 id="download-title" className="mx-auto mt-8 max-w-6xl text-[clamp(4rem,10vw,10rem)] font-normal leading-[0.8] tracking-[-0.065em]">Blerjet e zgjuara.<br /><span className="editorial-accent text-[#47e081]">Fillojnë këtu.</span></h2>
          <p className="mx-auto mt-7 max-w-md text-sm leading-6 text-white/55 sm:text-base">Krahasimi i çmimeve në Kosovë, direkt nga telefoni.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:mt-11">
            <span className="inline-flex min-h-12 items-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#1f2a1d]">Vjen së shpejti</span>
            <a href="#product-journey" className="inline-flex min-h-12 items-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">Shih si funksionon</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#1f2a1d] px-5 py-8 text-white sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold">Krahaso © 2026</span>
          <div className="flex flex-wrap items-center gap-6 text-white/55"><a href="#krahaso" className="hover:text-white">Krahaso</a><a href="#skano" className="hover:text-white">Skano</a><a href="#fito" className="hover:text-white">Fito</a><a href="https://admin.krahaso.app" className="hover:text-white">Admin</a></div>
        </div>
      </footer>
    </main>
  );
}

export default App;
