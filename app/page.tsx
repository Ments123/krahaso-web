import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { KsfBand } from "@/components/sections/KsfBand";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { ScrollJourney } from "@/components/sections/ScrollJourney";
import { BasketComparison } from "@/components/sections/BasketComparison";
import { ProductComparison } from "@/components/sections/ProductComparison";
import { Barcode } from "@/components/sections/Barcode";
import { Receipt } from "@/components/sections/Receipt";
import { Rewards } from "@/components/sections/Rewards";
import { Personalisation } from "@/components/sections/Personalisation";
import { Why } from "@/components/sections/Why";
import { Partners } from "@/components/sections/Partners";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="max-w-full overflow-x-clip">
      <Nav />
      <span id="top" />
      <Hero />
      <KsfBand />
      <LogoMarquee />
      <ScrollJourney />
      <BasketComparison />
      <ProductComparison />
      <Barcode />
      <Receipt />
      <Rewards />
      <Personalisation />
      <Why />
      <Partners />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}
