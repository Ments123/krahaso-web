import { FeatureStory } from './components/FeatureStory';
import { FinalDownload } from './components/FinalDownload';
import { HeroSection } from './components/HeroSection';
import { OfferProof } from './components/OfferProof';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { VisualUniverse } from './components/VisualUniverse';

function App() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <HeroSection />
        <VisualUniverse />
        <FeatureStory />
        <OfferProof />
        <FinalDownload />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
