import CasesSection from "./components/CasesSection";
import HeroSection from "./components/HeroSection";

export default function Page() {
  return (
    <>
      <div className="scanline" aria-hidden="true"></div>

      <header>
        <div className="container header-inner">
          <div className="brand">Product Development Cases</div>
          <nav aria-label="section links">
            <a href="#cases">Cases</a>
          </nav>
        </div>
      </header>

      <main>
        <HeroSection />
        <CasesSection />
      </main>
    </>
  );
}
