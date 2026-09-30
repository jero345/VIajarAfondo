import { Allies } from "@/components/Allies";
import { Departures } from "@/components/Departures";
import { Destinations } from "@/components/Destinations";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MotionProvider } from "@/components/motion";
import { Newsletter } from "@/components/Newsletter";
import { Pillars } from "@/components/Pillars";
import { Story } from "@/components/Story";
import { TravelModes } from "@/components/TravelModes";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <MotionProvider>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <TravelModes />
        <Destinations />
        <Departures />
        <Story />
        <Pillars />
        <Allies />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppFloat />
    </MotionProvider>
  );
}
