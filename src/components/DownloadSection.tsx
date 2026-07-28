import { AppAcquisitionCta } from './AppAcquisitionCta';
import { BrandMark } from './BrandMark';

export function DownloadSection() {
  return (
    <section
      id="shkarko"
      className="download-section relative flex min-h-[76svh] items-center overflow-hidden bg-[#1f2a1d] px-5 py-20 text-white sm:px-10 sm:py-24 lg:min-h-[88vh] lg:px-16"
      aria-labelledby="download-title"
    >
      <div className="download-glow" aria-hidden="true" />
      <div className="closing-ring closing-ring-one absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[680px] sm:w-[680px]" aria-hidden="true" />
      <div className="closing-ring closing-ring-two absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#85AB8B]/20 sm:h-[500px] sm:w-[500px]" aria-hidden="true" />
      <span className="closing-k absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[24rem] font-medium leading-none tracking-[-0.11em] text-white/[0.055] sm:text-[44rem]" aria-hidden="true">K</span>

      <div className="reveal relative z-10 mx-auto w-full max-w-[1400px] text-center">
        <div className="mx-auto flex w-fit items-center gap-3">
          <BrandMark inverse />
          <span className="text-xl font-semibold tracking-[-0.04em]">Krahaso</span>
        </div>
        <h2 id="download-title" className="mx-auto mt-8 max-w-6xl text-[clamp(3.8rem,10vw,9rem)] font-normal leading-[0.82] tracking-[-0.065em]">
          Blerjet e zgjuara.<br />
          <span className="editorial-accent text-[#47e081]">Fillojnë këtu.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-md text-sm leading-6 text-white/60 sm:text-base">
          Skano. Krahaso. Kalo te më e lira.
        </p>
        <div className="mt-9 flex flex-col items-center gap-4 sm:mt-11">
          <AppAcquisitionCta placement="download" inverse />
          <a href="#si-funksionon" className="inline-flex min-h-12 items-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            Shih si funksionon
          </a>
        </div>
      </div>
    </section>
  );
}
