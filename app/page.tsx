import { DownloadFinale, RetailerSection, TrustSection } from "@/components/revamp/ClosingSections";
import { HeroStage } from "@/components/revamp/HeroStage";
import { PriceProblem } from "@/components/revamp/PriceProblem";
import { ProductJourney } from "@/components/revamp/ProductJourney";
import { SiteFooter, SiteHeader } from "@/components/revamp/SiteChrome";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="fillimi">
        <HeroStage />
        <PriceProblem />
        <ProductJourney />
        <TrustSection />
        <RetailerSection />
        <DownloadFinale />
      </main>
      <SiteFooter />
    </>
  );
}
