```typescript
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import PortfolioSection from "../components/PortfolioSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Lightbox from "../components/ui/lightbox";

export default function HomePage() {
  return (
    <div className="relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
      <Lightbox />
    </div>
  );
}
```
