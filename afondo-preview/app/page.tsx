import { Destinos } from "@/components/Destinos";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Historia } from "@/components/Historia";
import { MotionProvider } from "@/components/motion";
import { Mundo } from "@/components/Mundo";
import { PorQue } from "@/components/PorQue";
import { Proximos } from "@/components/Proximos";
import { Vivir } from "@/components/Vivir";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <MotionProvider>
      <a href="#contenido" className="sr-only-focusable" style={{ position: "fixed", top: 8, left: 8, zIndex: 60, background: "var(--navy)", color: "var(--cream)", padding: "8px 14px" }}>
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Destinos />
        <Mundo />
        <Vivir />
        <Historia />
        <PorQue />
        <Proximos />
      </main>
      <Footer />
      <WhatsAppFloat />
    </MotionProvider>
  );
}
