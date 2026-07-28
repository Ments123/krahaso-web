import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';

const navLinks = [
  { href: '#si-funksionon', label: 'Si funksionon' },
  { href: '#aplikacioni', label: 'Aplikacioni' },
  { href: '#shkarko', label: 'Shkarko' },
] as const;

export function SiteHeader() {
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
    <>
      <nav
        className="site-nav absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-4 py-4 sm:px-7 sm:py-7 md:px-10"
        aria-label="Navigimi kryesor"
      >
        <a href="#fillimi" className="flex items-center gap-2.5 text-[#2d3a2a]" aria-label="Krahaso, në fillim">
          <BrandMark />
          <span className="text-lg font-semibold tracking-[-0.035em] sm:text-xl md:text-2xl">Krahaso</span>
        </a>

        <div className="liquid-glass hidden items-center gap-1 rounded-full py-1 pl-4 pr-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={link.href === '#shkarko'
                ? 'ml-1 rounded-full bg-[#1f2a1d] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2a3827]'
                : 'rounded-full px-4 py-2 text-sm font-medium text-[#4b5b47] transition-colors hover:text-[#1f2a1d]'}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen((value) => !value)}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/70 text-[#1f2a1d] backdrop-blur-md transition-colors hover:bg-white/90 lg:hidden"
          aria-label={menuOpen ? 'Mbyll menynë' : 'Hap menynë'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <Menu className={`absolute h-5 w-5 transition-all duration-300 ${menuOpen ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
          <X className={`absolute h-5 w-5 transition-all duration-300 ${menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`} />
        </button>
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
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`${link.href === '#shkarko' ? 'mt-7 rounded-full border-0 bg-[#08A64A] px-5 text-center text-base text-white' : 'border-b border-[#1f2a1d]/10 text-2xl text-[#1f2a1d]'} py-4 font-semibold transition-all duration-500 ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? `${120 + index * 70}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
