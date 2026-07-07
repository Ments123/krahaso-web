"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";

const LINKS = [
  { href: "#si-funksionon", label: "Si funksionon" },
  { href: "#krahaso", label: "Krahaso" },
  { href: "#skano", label: "Skano" },
  { href: "#fito", label: "Fito" },
  { href: "#partneret", label: "Për partnerët" },
  { href: "#pyetje", label: "Pyetje" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] border-b border-[#E4E8E1] bg-ground/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-[1180px] items-center gap-6 px-6 py-3.5">
        <a href="#top" className="mr-auto flex items-center gap-2.5">
          <BrandMark size={34} />
          <span className="font-display text-xl font-bold">Krahaso</span>
        </a>

        <div className="hidden items-center gap-6 text-[15px] font-medium text-[#3E4A43] md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-brand">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#shkarko"
          className="btn hidden whitespace-nowrap rounded-[11px] bg-brand px-5 py-[11px] text-sm font-semibold text-white hover:bg-brand-deep md:inline-flex"
        >
          Shkarko
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
          className="cursor-pointer p-2 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-0.5 border-t border-[#E4E8E1] px-6 pb-5 pt-2 md:hidden">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`py-[11px] font-medium ${i < LINKS.length - 1 ? "border-b border-[#EDF0EA]" : ""}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#shkarko"
            onClick={() => setOpen(false)}
            className="mt-3 rounded-[11px] bg-brand p-[13px] text-center font-semibold text-white"
          >
            Shkarko aplikacionin
          </a>
        </div>
      )}
    </header>
  );
}
