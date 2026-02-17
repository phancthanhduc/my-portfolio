import {
  CyberpunkSceneComponent,
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
  Footer
} from './components/cyberpunk';

export default function App() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">
      {/* 3D Scene Background */}
      <div className="fixed inset-0 z-0">
        <CyberpunkSceneComponent />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>

      {/* Scanline effect overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scanlines opacity-5" />
    </main>
  );
}
