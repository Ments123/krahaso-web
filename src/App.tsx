import { useEffect, useRef, useState } from 'react';
import { LogIn, UserPlus, Play, Sparkles, Menu, X } from 'lucide-react';
import BoomerangVideoBg from './BoomerangVideoBg';

const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4';

const navLinks = [
  { href: '#krahaso', label: 'Krahaso' },
  { href: '#skano', label: 'Skano' },
  { href: '#fito', label: 'Fito' },
];

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-9 w-9 place-items-center rounded-[11px] text-lg font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,.35)] ${
        inverse ? 'bg-white text-[#336443]' : 'bg-[#336443] text-white'
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
    <main className="bg-[#f2f3ed] text-[#1f2a1d]">
      <section className="relative min-h-screen w-full overflow-hidden sm:h-screen" aria-labelledby="hero-title">
        <BoomerangVideoBg src={BG_VIDEO} className="absolute inset-0 h-full w-full" />
        <div className="hero-wash absolute inset-0" />

        <nav className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 md:px-10" aria-label="Navigimi kryesor">
          <a href="#fillimi" className="flex items-center gap-2.5 text-[#2d3a2a]" aria-label="Krahaso, në fillim">
            <BrandMark />
            <span className="text-lg font-semibold tracking-[-0.035em] sm:text-xl md:text-2xl">Krahaso</span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-white/60 bg-white/70 py-1 pl-6 pr-1 shadow-sm backdrop-blur-md lg:flex">
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
              <a href="#partneret" className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a] sm:hidden">
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

        <div id="fillimi" className="relative z-10 flex flex-col items-center px-4 pt-28 text-center sm:px-6 sm:pt-32 md:pt-36">
          <h1
            id="hero-title"
            className="max-w-6xl text-[2.65rem] font-normal leading-[0.92] tracking-[-0.045em] text-[#336443] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.3rem]"
          >
            Harro fletushkat.
            <span className="block text-[#85AB8B]">Krahaso më zgjuar.</span>
          </h1>
          <p className="mt-6 max-w-lg px-2 text-sm leading-relaxed text-[#4b5b47] sm:mt-8 sm:text-base md:text-lg">
            Skano barkodin, krahaso çmimet dhe zgjidh më lirë, direkt nga telefoni.
          </p>
        </div>

        <div className="absolute bottom-6 left-4 right-4 z-10 max-w-sm sm:bottom-8 sm:left-6 sm:right-auto md:bottom-10 md:left-10">
          <div className="mb-3 flex items-center gap-2 text-[#3d5638] sm:text-white/95">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold sm:font-medium">Krahaso. Skano. Fito.</span>
          </div>
          <p className="mb-6 max-w-xs text-xs font-medium leading-relaxed text-[#3d5638]/90 sm:font-normal sm:text-white/85">
            Shporta jote, çmimet e tua, një zgjedhje më e mirë.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#aplikacioni" className="rounded-full bg-[#3d5638] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2d4228] sm:bg-white sm:px-6 sm:py-3 sm:text-[#1f2a1d] sm:hover:bg-white/90">
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

      <section id="manifesti" className="relative overflow-hidden bg-[#f2f3ed] px-5 py-20 sm:px-10 sm:py-28 lg:flex lg:min-h-[82vh] lg:items-center lg:px-16" aria-labelledby="manifest-title">
        <span className="manifest-k absolute -right-12 top-1/2 -translate-y-1/2 select-none text-[78vw] font-medium leading-none tracking-[-0.1em] text-[#dfe5db] sm:-right-20 sm:text-[42vw]" aria-hidden="true">K</span>
        <div className="reveal relative z-10 mx-auto w-full max-w-[1400px]">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#85AB8B] sm:mb-9">Mënyra e re për të blerë</p>
          <h2 id="manifest-title" className="max-w-6xl text-[clamp(3.2rem,8vw,8.8rem)] font-normal leading-[0.88] tracking-[-0.055em] text-[#1f2a1d]">
            Ti zgjedh produktin.<br />
            <span className="text-[#85AB8B]">Krahaso të tregon ku.</span>
          </h2>
          <div className="mt-12 flex flex-col gap-8 border-t border-[#1f2a1d]/10 pt-6 sm:mt-16 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-lg text-base leading-7 text-[#4b5b47] sm:text-lg">Çmimet e supermarketeve, të mbledhura në një vend që ti të zgjedhësh më lirë.</p>
            <p className="text-sm font-semibold tracking-[-0.02em] text-[#336443]">Krahaso · Skano · Fito</p>
          </div>
        </div>
      </section>

      <section className="space-y-3 bg-[#f2f3ed] px-3 pb-3 sm:space-y-4 sm:px-4 sm:pb-4">
        <article id="krahaso" className="brand-panel relative overflow-hidden bg-[#dfe9dc] px-6 py-8 sm:px-12 sm:py-12 lg:min-h-[92vh] lg:px-20 lg:py-16" aria-labelledby="compare-title">
          <span className="comparison-k absolute -right-5 top-16 select-none text-[24rem] font-medium leading-none tracking-[-0.1em] text-white/30 sm:text-[32rem] lg:right-[6%] lg:top-1/2 lg:-translate-y-1/2 lg:text-[42rem]" aria-hidden="true">K</span>
          <div className="brand-scene reveal relative z-10 lg:flex lg:min-h-[72vh] lg:flex-col lg:justify-between">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-[#336443] sm:text-xs"><span>01</span><span>Krahaso</span></div>
            <div className="mt-12 grid items-end gap-6 sm:mt-16 lg:mt-10 lg:grid-cols-[.86fr_1.14fr] lg:gap-12">
              <div className="max-w-2xl">
                <h2 id="compare-title" className="text-[clamp(3.7rem,9vw,9rem)] font-normal leading-[0.84] tracking-[-0.06em] text-[#336443]">Shiko.<br /><span className="text-[#85AB8B]">Pastaj zgjidh.</span></h2>
                <p className="mt-5 max-w-sm text-sm leading-6 text-[#4b5b47] sm:mt-8 sm:text-base sm:leading-7">Çmimi i duhur bëhet i dukshëm.</p>
              </div>
              <div className="comparison-stage relative mx-auto h-[380px] w-full max-w-[660px] sm:h-[500px]">
                <div className="comparison-orbit absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#336443]/10 sm:h-[430px] sm:w-[430px]" aria-hidden="true" />
                <div className="comparison-orbit comparison-orbit-inner absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/55 sm:h-[310px] sm:w-[310px]" aria-hidden="true" />
                <div className="comparison-signal absolute left-0 top-[12%] z-20 rounded-[22px] px-4 py-3 sm:left-[2%] sm:px-5 sm:py-4">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.15em] text-[#4b5b47]">Çmimi tjetër</span>
                  <strong className="mt-1 block text-2xl font-normal tracking-[-0.04em] text-[#1f2a1d] sm:text-3xl">€3.42</strong>
                </div>
                <img src="/products/coffee-cutout.svg" alt="Pako kafeje" loading="lazy" decoding="async" className="product-cutout absolute left-1/2 top-1/2 z-10 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 object-contain sm:h-[360px] sm:w-[360px]" />
                <div className="comparison-signal comparison-signal-best absolute bottom-[15%] right-0 z-20 rounded-[24px] px-5 py-4 sm:right-[3%] sm:px-6 sm:py-5">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.15em] text-white/65">Çmimi më i mirë</span>
                  <strong className="mt-1 block text-3xl font-normal tracking-[-0.04em] text-white sm:text-4xl">€3.19</strong>
                </div>
                <span className="absolute bottom-0 left-0 text-[9px] text-[#4b5b47]/60">Çmime ilustruese</span>
              </div>
            </div>
          </div>
        </article>

        <article id="skano" className="brand-panel relative overflow-hidden bg-[#1f2a1d] px-6 py-8 text-white sm:px-12 sm:py-12 lg:min-h-[92vh] lg:px-20 lg:py-16" aria-labelledby="scan-title">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_52%,rgba(133,171,139,.15),transparent_32%)]" />
          <div className="brand-scene reveal relative z-10 lg:flex lg:min-h-[72vh] lg:flex-col lg:justify-between">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-[#85AB8B] sm:text-xs"><span>02</span><span>Skano</span></div>
            <div className="mt-12 grid items-end gap-5 sm:mt-16 lg:mt-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-12">
              <div className="max-w-2xl">
                <h2 id="scan-title" className="text-[clamp(3.25rem,8vw,8.5rem)] font-normal leading-[0.84] tracking-[-0.06em]">Skano barkodin.<br /><span className="text-[#85AB8B]">Shih ku kushton më lirë.</span></h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-white/60 sm:mt-8 sm:text-base sm:leading-7">Një skanim të çon te çmimet e produktit në supermarketet e listuara në Krahaso.</p>
              </div>
              <div className="scan-stage relative mx-auto flex h-[430px] w-full max-w-[620px] items-center justify-center sm:h-[540px]">
                <div className="price-plane price-plane-left absolute left-[8%] top-[15%] h-[280px] w-[190px] -rotate-[12deg] rounded-[24px] sm:h-[370px] sm:w-[240px]" aria-hidden="true" />
                <div className="price-plane price-plane-right absolute right-[6%] top-[10%] h-[300px] w-[200px] rotate-[13deg] rounded-[24px] sm:h-[390px] sm:w-[250px]" aria-hidden="true" />
                <div className="scan-radar absolute h-[330px] w-[330px] rounded-full border border-white/10 sm:h-[470px] sm:w-[470px]" aria-hidden="true" />
                <div className="relative z-10 h-[390px] w-[218px] rotate-[4deg] rounded-[38px] border border-white/15 bg-[#101710] p-2 shadow-[0_50px_100px_-40px_rgba(0,0,0,.9)] sm:h-[500px] sm:w-[270px] sm:rounded-[44px]">
                  <div className="relative h-full overflow-hidden rounded-[30px] bg-[#dbe4d8] sm:rounded-[36px]">
                    <div className="absolute inset-6 top-16 rounded-[24px] border border-[#336443]/30 bg-[#cbd8c7] sm:inset-7 sm:top-20 sm:rounded-[26px]">
                      <span className="absolute left-[-1px] top-[-1px] h-11 w-11 rounded-tl-[24px] border-l-[3px] border-t-[3px] border-[#336443]" />
                      <span className="absolute bottom-[-1px] right-[-1px] h-11 w-11 rounded-br-[24px] border-b-[3px] border-r-[3px] border-[#336443]" />
                      <span className="scan-line absolute left-4 right-4 top-8 h-[2px] bg-[#336443] shadow-[0_0_16px_#85AB8B]" />
                      <div className="absolute inset-x-0 bottom-16 flex justify-center sm:bottom-20"><div className="barcode h-16 w-32 rounded bg-white sm:h-20 sm:w-40" /></div>
                    </div>
                    <p className="absolute inset-x-0 bottom-6 text-center text-[10px] font-semibold text-[#336443] sm:bottom-8 sm:text-xs">Vendose barkodin brenda kornizës</p>
                  </div>
                </div>
                <div className="absolute bottom-[8%] left-[2%] z-20 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75 backdrop-blur-md sm:left-[8%] sm:text-xs">Barkodi u njoh</div>
              </div>
            </div>
          </div>
        </article>

        <article id="fito" className="brand-panel relative overflow-hidden bg-[#b8cdb9] px-6 py-8 sm:px-12 sm:py-12 lg:min-h-[92vh] lg:px-20 lg:py-16" aria-labelledby="earn-title">
          <span className="absolute -bottom-28 -left-10 select-none text-[28rem] font-medium leading-none tracking-[-0.1em] text-white/20 sm:text-[40rem]" aria-hidden="true">F</span>
          <div className="brand-scene reveal relative z-10 lg:flex lg:min-h-[72vh] lg:flex-col lg:justify-between">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-[#336443] sm:text-xs"><span>03</span><span>Fito</span></div>
            <div className="mt-12 grid items-end gap-6 sm:mt-16 lg:mt-10 lg:grid-cols-[1fr_.9fr] lg:gap-12">
              <div className="max-w-3xl">
                <h2 id="earn-title" className="text-[clamp(3.4rem,9vw,9rem)] font-normal leading-[0.82] tracking-[-0.065em] text-[#1f2a1d]">Skano faturën.<br /><span className="text-white/75">Fito shpërblime.</span></h2>
                <p className="mt-5 max-w-md text-sm leading-6 text-[#3d5638] sm:mt-8 sm:text-base sm:leading-7">Ruaje faturën, mblidh pikë dhe përfito nga blerjet e tua.</p>
              </div>
              <div className="reward-orbit relative mx-auto flex h-[410px] w-full max-w-[560px] items-center justify-center sm:h-[510px]">
                <div className="reward-ring reward-ring-large absolute h-[350px] w-[350px] rounded-full border border-white/30 sm:h-[470px] sm:w-[470px]" aria-hidden="true" />
                <div className="reward-ring absolute h-[250px] w-[250px] rounded-full border border-[#336443]/15 sm:h-[340px] sm:w-[340px]" aria-hidden="true" />
                <div className="absolute left-0 top-[8%] z-20 rounded-[24px] border border-white/35 bg-white/35 px-5 py-4 backdrop-blur-xl sm:left-[2%] sm:rounded-[28px] sm:px-6 sm:py-5">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#3d5638] sm:text-xs">Blerja u verifikua</span>
                  <strong className="mt-1 block text-2xl font-normal text-[#1f2a1d] sm:mt-2 sm:text-3xl">+85 pikë</strong>
                </div>
                <div className="relative z-10 w-[82%] rounded-[36px] border border-white/35 bg-[#336443] p-7 text-white shadow-[0_50px_100px_-45px_rgba(31,42,29,.75)] sm:w-auto sm:rounded-[42px] sm:p-10">
                  <div className="flex items-start justify-between gap-8"><p className="text-sm text-white/60">Pikët e tua</p><span className="text-sm font-semibold text-[#b8cdb9]">K</span></div>
                  <strong className="mt-2 block text-[clamp(4.5rem,10vw,7rem)] font-normal leading-none tracking-[-0.06em]">1,240</strong>
                  <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-white/20 sm:mt-9"><span className="block h-full w-[72%] rounded-full bg-white" /></div>
                  <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.12em] text-white/45"><span>Tani</span><span>2,000</span></div>
                </div>
                <div className="absolute bottom-[6%] right-0 z-20 rounded-full bg-[#1f2a1d] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white sm:right-[3%] sm:text-xs">Mblidh më shumë pikë</div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section id="aplikacioni" className="relative overflow-hidden bg-white px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36" aria-labelledby="app-title">
        <div className="reveal mx-auto max-w-[1400px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#85AB8B]">Aplikacioni që po prisje.</p>
          <h2 id="app-title" className="mx-auto mt-6 max-w-6xl text-[clamp(3.25rem,8vw,8rem)] font-normal leading-[0.86] tracking-[-0.055em] text-[#1f2a1d]">Harro fletushkat.<br /><span className="text-[#85AB8B]">Çmimet tani janë në xhepin tënd.</span></h2>
          <div className="relative mx-auto mt-12 h-[600px] max-w-5xl sm:mt-16 sm:h-[720px]">
            <span className="absolute left-0 top-[22%] hidden text-7xl tracking-[-0.05em] text-[#d9dfd5] lg:block">Krahaso</span>
            <span className="absolute right-0 top-[48%] hidden text-7xl tracking-[-0.05em] text-[#d9dfd5] lg:block">Skano</span>
            <span className="absolute bottom-[8%] left-[10%] hidden text-7xl tracking-[-0.05em] text-[#d9dfd5] lg:block">Fito</span>
            <div className="phone-stage relative z-10 mx-auto h-[590px] w-[286px] overflow-hidden rounded-[50px] bg-[#121812] p-[9px] shadow-[0_70px_130px_-55px_rgba(31,42,29,.7)] sm:h-[700px] sm:w-[340px] sm:rounded-[54px] sm:p-[10px]">
              <img
                src="/app/krahaso-home.webp"
                alt="Pamje reale e ballinës së aplikacionit Krahaso"
                className="block h-full w-full rounded-[42px] object-cover object-top sm:rounded-[45px]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="partneret" className="relative overflow-hidden bg-[#e8ece5] px-5 py-20 sm:px-10 sm:py-24 lg:px-16" aria-labelledby="stores-title">
        <span className="absolute -right-10 top-1/2 -translate-y-1/2 select-none text-[23rem] font-medium leading-none tracking-[-0.1em] text-white/45 sm:text-[34rem]" aria-hidden="true">K</span>
        <div className="reveal relative z-10 mx-auto flex max-w-[1400px] flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#85AB8B]">Për partnerët</p><h2 id="stores-title" className="mt-5 max-w-3xl text-[clamp(3.25rem,7vw,7.5rem)] font-normal leading-[0.88] tracking-[-0.055em]">Bëhu pjesë e zgjedhjes.</h2></div>
          <a href="https://admin.krahaso.app" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1f2a1d] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a3827]"><LogIn className="h-4 w-4" /> Hyr në admin</a>
        </div>
      </section>

      <section id="shkarko" className="relative flex min-h-[72svh] items-center overflow-hidden bg-[#1f2a1d] px-5 py-20 text-white sm:min-h-[82vh] sm:px-10 sm:py-24 lg:min-h-[92vh] lg:px-16" aria-labelledby="download-title">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(133,171,139,.24),transparent_34%),radial-gradient(circle_at_18%_82%,rgba(255,255,255,.08),transparent_32%)]" />
        <div className="closing-ring closing-ring-one absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[680px] sm:w-[680px]" aria-hidden="true" />
        <div className="closing-ring closing-ring-two absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#85AB8B]/20 sm:h-[500px] sm:w-[500px]" aria-hidden="true" />
        <span className="closing-k absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[24rem] font-medium leading-none tracking-[-0.11em] text-white/[0.055] sm:text-[44rem]" aria-hidden="true">K</span>
        <div className="reveal relative z-10 mx-auto w-full max-w-[1400px] text-center">
          <div className="mx-auto flex w-fit items-center gap-3"><BrandMark inverse /><span className="text-xl font-semibold tracking-[-0.04em]">Krahaso</span></div>
          <h2 id="download-title" className="mx-auto mt-8 max-w-6xl text-[clamp(4rem,10vw,10rem)] font-normal leading-[0.8] tracking-[-0.065em]">Krahaso.<br /><span className="text-[#85AB8B]">Skano. Fito.</span></h2>
          <span className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#1f2a1d] sm:mt-12">Vjen së shpejti</span>
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
