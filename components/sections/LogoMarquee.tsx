import Image from "next/image";
import { MARQUEE_LOGOS } from "@/data/site";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div
      className="flex flex-none items-center gap-14 px-7"
      aria-hidden={hidden ? "true" : undefined}
    >
      {MARQUEE_LOGOS.map((l, i) => (
        <Image
          key={`${l.src}-${i}`}
          src={l.src}
          alt={hidden ? "" : l.alt}
          width={150}
          height={l.h}
          className="block w-auto flex-none object-contain"
          style={{ height: l.h, maxWidth: 150 }}
        />
      ))}
    </div>
  );
}

/** An infinite, scrolling strip of all seven supermarket logos. */
export function LogoMarquee() {
  return (
    <section className="overflow-hidden border-y border-[#E7EBE4] bg-white py-[26px]">
      <div
        className="flex w-max items-center"
        style={{ animation: "v3marq 36s linear infinite" }}
      >
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
