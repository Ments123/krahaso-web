import { FeatureStory } from './components/FeatureStory';
import { FinalDownload } from './components/FinalDownload';
import { HeroSection } from './components/HeroSection';
import { OfferProof } from './components/OfferProof';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { VisualUniverse } from './components/VisualUniverse';
import { AppUpdates, DataTeaser } from './components/AppUpdates';

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Kalo te përmbajtja</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <VisualUniverse />
        <FeatureStory />
        <OfferProof />
        <AppUpdates />
        <DataTeaser />
        <FinalDownload />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
