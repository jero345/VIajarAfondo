import { Reveal } from "@/components/motion";
import { TripsCarousel } from "@/components/TripsCarousel";
import { tripFilters } from "@/lib/content";

// Chip widths are fixed in the mockup (97 / 151 / 100 px), so they are kept per chip.
const chipWidths = [97, 151, 100];

export function Destinos() {
  return (
    <section id="destinos" className="dest" aria-labelledby="destinos-title">
      <div className="frame">
        <Reveal>
          <h2 id="destinos-title" className="dest__title ff-adelon">
            ¿Qué lugar sueñas <br className="br-d" />
            con descubrir?
          </h2>
        </Reveal>

        <Reveal className="dest__bar" delay={0.08}>
          <p className="dest__lead ff-surt">
            Hagamos de ese destino <br />
            tu próximo gran viaje.
          </p>
          <div className="dest__chips">
            {tripFilters.map((chip, i) => (
              <a
                key={chip.label}
                href={chip.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`chip ff-adelon${chip.variant === "solid" ? " chip--solid" : ""}`}
                style={{ ["--w" as string]: chipWidths[i] }}
              >
                {chip.label}
              </a>
            ))}
          </div>
        </Reveal>

        <TripsCarousel />
      </div>
    </section>
  );
}
