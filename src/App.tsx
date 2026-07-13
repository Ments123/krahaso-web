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
  const [soon, setSoon] = useState(false);
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

  const showSoon = () => setSoon(true);

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
            <button onClick={showSoon} className="ml-2 rounded-full bg-[#1f2a1d] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2a3827]">
              {soon ? 'Së shpejti' : 'Shkarko'}
            </button>
          </div>

          <div className="flex items-center gap-3 text-[#2d3a2a] sm:gap-6">
            <a href="#per-shitoret" className="hidden items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70 sm:flex">
              <UserPlus className="h-4 w-4" />
              Për shitoret
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
              <a href="#per-shitoret" className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a] sm:hidden">
                <UserPlus className="h-4 w-4" /> Për shitoret
              </a>
              <a href="https://admin.krahaso.app" className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a] sm:hidden">
                <LogIn className="h-4 w-4" /> Admin
              </a>
              <button onClick={showSoon} className="mt-2 rounded-full bg-[#1f2a1d] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2a3827]">
                {soon ? 'Së shpejti' : 'Shkarko aplikacionin'}
              </button>
            </div>
          </div>
        </aside>

        <div id="fillimi" className="relative z-10 flex flex-col items-center px-4 pt-28 text-center sm:px-6 sm:pt-32 md:pt-36">
          <h1
            id="hero-title"
            className="max-w-6xl text-[2.65rem] font-normal leading-[0.92] tracking-[-0.045em] text-[#336443] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.3rem]"
          >
            Çmimet ndryshojnë.
            <span className="block text-[#85AB8B]">Zgjedhja jote nuk duhet.</span>
          </h1>
          <p className="mt-6 max-w-lg px-2 text-sm leading-relaxed text-[#4b5b47] sm:mt-8 sm:text-base md:text-lg">
            Një mënyrë më e qartë për të blerë më zgjuar, çdo ditë.
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
            <button onClick={showSoon} className="rounded-full bg-[#3d5638] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2d4228] sm:bg-white sm:px-6 sm:py-3 sm:text-[#1f2a1d] sm:hover:bg-white/90">
              {soon ? 'Së shpejti' : 'Shkarko'}
            </button>
            <a href="#manifesti" className="text-sm font-semibold text-[#3d5638] transition-opacity hover:opacity-70 sm:font-medium sm:text-white">Zbulo më shumë.</a>
          </div>
        </div>

        <a href="#aplikacioni" className="absolute bottom-8 right-6 z-10 hidden items-center gap-2 text-sm text-white/90 sm:flex md:bottom-10 md:right-10">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30"><Play className="ml-0.5 h-3 w-3 fill-white text-white" /></span>
          <span className="font-medium">Shiko aplikacionin</span>
        </a>
      </section>

      <section id="manifesti" className="relative flex min-h-[88vh] items-center overflow-hidden bg-[#f2f3ed] px-5 py-28 sm:px-10 lg:px-16" aria-labelledby="manifest-title">
        <span className="absolute right-[-3vw] top-[-10vw] select-none text-[38vw] font-medium leading-none tracking-[-0.08em] text-[#dfe5db]" aria-hidden="true">K</span>
        <div className="reveal relative z-10 mx-auto w-full max-w-[1400px]">
          <p className="mb-9 text-xs font-semibold uppercase tracking-[0.16em] text-[#85AB8B]">Për blerjet e përditshme</p>
          <h2 id="manifest-title" className="max-w-6xl text-[clamp(3.2rem,8vw,8.8rem)] font-normal leading-[0.9] tracking-[-0.055em] text-[#1f2a1d]">
            Më pak hamendësime.<br />
            <span className="text-[#85AB8B]">Më shumë kontroll.</span>
          </h2>
          <p className="ml-auto mt-12 max-w-md text-base leading-7 text-[#4b5b47] sm:text-lg">Krahaso e kthen një vendim të zakonshëm në një zgjedhje të qartë.</p>
        </div>
      </section>

      <section className="space-y-4 bg-[#f2f3ed] px-3 pb-4 sm:px-4">
        <article id="krahaso" className="brand-panel relative min-h-[92vh] overflow-hidden bg-[#dfe9dc] px-6 py-16 sm:px-12 lg:px-20" aria-labelledby="compare-title">
          <div className="reveal relative z-10 flex h-full min-h-[72vh] flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#336443]"><span>01</span><span>Krahaso</span></div>
            <div className="grid items-end gap-12 lg:grid-cols-[.9fr_1.1fr]">
              <div className="max-w-2xl">
                <h2 id="compare-title" className="text-[clamp(4rem,9vw,9rem)] font-normal leading-[0.86] tracking-[-0.06em] text-[#336443]">Shiko.<br /><span className="text-[#85AB8B]">Pastaj zgjidh.</span></h2>
                <p className="mt-8 max-w-sm text-base leading-7 text-[#4b5b47]">Çmimi i duhur bëhet i dukshëm.</p>
              </div>
              <div className="relative mx-auto h-[430px] w-full max-w-[650px] sm:h-[520px]">
                <div className="absolute inset-[8%] rounded-[48%] bg-white/35 blur-3xl" />
                <img src="/products/milk.png" alt="Qumësht" className="float-slow absolute left-[8%] top-[6%] h-44 w-32 object-contain sm:h-56 sm:w-44" />
                <img src="/products/bread.svg" alt="Bukë" className="float-reverse absolute right-[4%] top-[12%] h-40 w-48 object-contain sm:h-52 sm:w-64" />
                <img src="/products/coffee.png" alt="Kafe" className="float-slow absolute bottom-[4%] left-[38%] h-48 w-36 object-contain sm:h-60 sm:w-48" />
                <div className="glass-card absolute left-[2%] top-[48%] rounded-full px-5 py-3 text-sm font-semibold text-[#336443]">€1.15</div>
                <div className="glass-card absolute right-[8%] top-[52%] rounded-full px-5 py-3 text-sm font-semibold text-[#336443]">€1.22</div>
                <div className="glass-card absolute bottom-[5%] right-[5%] rounded-full px-5 py-3 text-sm font-semibold text-[#336443]">€1.35</div>
                <span className="absolute bottom-0 left-0 text-[10px] text-[#4b5b47]/60">Çmime ilustruese</span>
              </div>
            </div>
          </div>
        </article>

        <article id="skano" className="brand-panel relative min-h-[92vh] overflow-hidden bg-[#1f2a1d] px-6 py-16 text-white sm:px-12 lg:px-20" aria-labelledby="scan-title">
          <div className="reveal relative z-10 flex min-h-[72vh] flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#85AB8B]"><span>02</span><span>Skano</span></div>
            <div className="grid items-end gap-12 lg:grid-cols-2">
              <div className="max-w-2xl">
                <h2 id="scan-title" className="text-[clamp(4rem,9vw,9rem)] font-normal leading-[0.86] tracking-[-0.06em]">Një skanim.<br /><span className="text-[#85AB8B]">Kaç.</span></h2>
                <p className="mt-8 max-w-sm text-base leading-7 text-white/60">Blerja bëhet pjesë e historisë tënde.</p>
              </div>
              <div className="relative mx-auto flex h-[520px] w-full max-w-[620px] items-center justify-center">
                <div className="absolute h-[360px] w-[360px] rounded-full border border-white/10 sm:h-[470px] sm:w-[470px]" />
                <div className="relative h-[470px] w-[250px] rotate-[5deg] rounded-[42px] border border-white/15 bg-[#101710] p-2 shadow-[0_50px_100px_-40px_rgba(0,0,0,.8)] sm:h-[540px] sm:w-[286px]">
                  <div className="relative h-full overflow-hidden rounded-[34px] bg-[#dbe4d8]">
                    <div className="absolute inset-7 top-20 rounded-[26px] border border-[#336443]/30 bg-[#cbd8c7]">
                      <span className="absolute left-[-1px] top-[-1px] h-12 w-12 rounded-tl-[26px] border-l-[3px] border-t-[3px] border-[#336443]" />
                      <span className="absolute bottom-[-1px] right-[-1px] h-12 w-12 rounded-br-[26px] border-b-[3px] border-r-[3px] border-[#336443]" />
                      <span className="scan-line absolute left-4 right-4 top-8 h-[2px] bg-[#336443] shadow-[0_0_16px_#85AB8B]" />
                      <div className="absolute inset-x-0 bottom-20 flex justify-center"><div className="barcode h-20 w-40 rounded bg-white" /></div>
                    </div>
                    <p className="absolute inset-x-0 bottom-8 text-center text-xs font-semibold text-[#336443]">Mbaje faturën brenda kornizës</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article id="fito" className="brand-panel relative min-h-[92vh] overflow-hidden bg-[#b8cdb9] px-6 py-16 sm:px-12 lg:px-20" aria-labelledby="earn-title">
          <div className="reveal relative z-10 flex min-h-[72vh] flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-[#336443]"><span>03</span><span>Fito</span></div>
            <div className="grid items-end gap-12 lg:grid-cols-[1fr_.9fr]">
              <div className="max-w-3xl">
                <h2 id="earn-title" className="text-[clamp(4rem,10vw,10rem)] font-normal leading-[0.84] tracking-[-0.065em] text-[#1f2a1d]">Çdo blerje.<br /><span className="text-white/75">Pak më shumë.</span></h2>
                <p className="mt-8 max-w-sm text-base leading-7 text-[#3d5638]">Pikë të qarta. Shpërblime praktike.</p>
              </div>
              <div className="relative mx-auto flex h-[480px] w-full max-w-[520px] items-center justify-center">
                <div className="float-slow absolute left-[3%] top-[12%] rounded-[28px] border border-white/35 bg-white/35 px-6 py-5 backdrop-blur-xl"><span className="text-xs uppercase tracking-[0.14em] text-[#3d5638]">Blerja u verifikua</span><strong className="mt-2 block text-3xl font-normal text-[#1f2a1d]">+85 pikë</strong></div>
                <div className="relative rounded-[42px] border border-white/35 bg-[#336443] p-8 text-white shadow-[0_50px_100px_-45px_rgba(31,42,29,.75)] sm:p-10">
                  <p className="text-sm text-white/60">Pikët e tua</p>
                  <strong className="mt-2 block text-[clamp(4.5rem,10vw,7rem)] font-normal leading-none tracking-[-0.06em]">1,240</strong>
                  <div className="mt-9 h-1.5 overflow-hidden rounded-full bg-white/20"><span className="block h-full w-[72%] rounded-full bg-white" /></div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section id="aplikacioni" className="relative overflow-hidden bg-white px-5 py-28 sm:px-10 lg:px-16 lg:py-40" aria-labelledby="app-title">
        <div className="reveal mx-auto max-w-[1400px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#85AB8B]">Një aplikacion. Një ritëm.</p>
          <h2 id="app-title" className="mx-auto mt-7 max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-normal leading-[0.88] tracking-[-0.055em] text-[#1f2a1d]">Gjithçka që duhet.<br /><span className="text-[#85AB8B]">Asgjë që s’duhet.</span></h2>
          <div className="relative mx-auto mt-20 h-[680px] max-w-5xl sm:h-[760px]">
            <span className="absolute left-0 top-[22%] hidden text-7xl tracking-[-0.05em] text-[#d9dfd5] lg:block">Krahaso</span>
            <span className="absolute right-0 top-[48%] hidden text-7xl tracking-[-0.05em] text-[#d9dfd5] lg:block">Skano</span>
            <span className="absolute bottom-[8%] left-[10%] hidden text-7xl tracking-[-0.05em] text-[#d9dfd5] lg:block">Fito</span>
            <div className="phone-stage relative z-10 mx-auto h-[650px] w-[310px] rounded-[54px] bg-[#121812] p-[10px] shadow-[0_70px_130px_-55px_rgba(31,42,29,.7)] sm:h-[730px] sm:w-[350px]">
              <div className="relative h-full overflow-hidden rounded-[45px] bg-[#f2f3ed] px-5 pb-6 pt-16 text-left">
                <span className="absolute left-1/2 top-3 h-7 w-24 -translate-x-1/2 rounded-full bg-[#121812]" />
                <div className="flex items-center gap-2"><BrandMark /><span className="text-lg font-semibold tracking-[-0.04em]">Krahaso</span></div>
                <p className="mt-14 text-sm text-[#4b5b47]">Shporta jote</p>
                <h3 className="mt-2 text-5xl font-normal tracking-[-0.055em] text-[#336443]">Më e qartë.</h3>
                <div className="mt-10 rounded-[28px] bg-[#336443] p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.14em] text-white/60">Zgjedhja e ditës</p>
                  <p className="mt-4 text-3xl font-normal tracking-[-0.04em]">Shporta ime</p>
                  <div className="mt-10 flex items-end justify-between"><span className="text-sm text-white/65">Krahasuar</span><strong className="text-5xl font-normal">✓</strong></div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-[22px] bg-white p-4"><span className="text-xs text-[#4b5b47]">Skano</span><strong className="mt-6 block text-xl font-normal text-[#1f2a1d]">Faturën</strong></div>
                  <div className="rounded-[22px] bg-[#dfe9dc] p-4"><span className="text-xs text-[#4b5b47]">Fito</span><strong className="mt-6 block text-xl font-normal text-[#1f2a1d]">Pikë</strong></div>
                </div>
                <button onClick={showSoon} className="absolute bottom-6 left-5 right-5 rounded-full bg-[#1f2a1d] px-5 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2a3827]">{soon ? 'Së shpejti' : 'Shkarko'}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="per-shitoret" className="bg-[#e8ece5] px-5 py-24 sm:px-10 lg:px-16" aria-labelledby="stores-title">
        <div className="reveal mx-auto flex max-w-[1400px] flex-col justify-between gap-12 lg:flex-row lg:items-end">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#85AB8B]">Për shitoret</p><h2 id="stores-title" className="mt-6 max-w-3xl text-[clamp(3.4rem,7vw,7.5rem)] font-normal leading-[0.9] tracking-[-0.055em]">Bëhu pjesë e zgjedhjes.</h2></div>
          <a href="https://admin.krahaso.app" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1f2a1d] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a3827]"><LogIn className="h-4 w-4" /> Hyr në admin</a>
        </div>
      </section>

      <section id="shkarko" className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#1f2a1d] px-5 py-28 text-white sm:px-10 lg:px-16" aria-labelledby="download-title">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(133,171,139,.24),transparent_34%),radial-gradient(circle_at_15%_85%,rgba(255,255,255,.08),transparent_32%)]" />
        <img src="/products/banana.svg" alt="" className="float-reverse absolute -right-20 top-[8%] h-72 w-80 rotate-12 object-contain opacity-70 sm:h-96 sm:w-[28rem]" />
        <img src="/products/coffee.png" alt="" className="float-slow absolute -bottom-24 -left-16 h-80 w-60 -rotate-12 object-contain opacity-65 sm:h-[30rem] sm:w-80" />
        <div className="reveal relative z-10 mx-auto w-full max-w-[1400px] text-center">
          <div className="mx-auto flex w-fit items-center gap-3"><BrandMark inverse /><span className="text-xl font-semibold tracking-[-0.04em]">Krahaso</span></div>
          <h2 id="download-title" className="mx-auto mt-10 max-w-6xl text-[clamp(4rem,10vw,10rem)] font-normal leading-[0.82] tracking-[-0.065em]">Krahaso.<br /><span className="text-[#85AB8B]">Skano. Fito.</span></h2>
          <button onClick={showSoon} className="mt-12 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#1f2a1d] transition-colors hover:bg-white/85">{soon ? 'Së shpejti' : 'Shkarko aplikacionin'}</button>
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
