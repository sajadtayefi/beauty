import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustSection } from "@/components/trust-section";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";
import { Lightbox } from "@/components/lightbox";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustSection />
        <Services />
        <Portfolio />
        <CtaBand />
      </main>
      <Footer />
      <Lightbox />
    </>
  );
}
