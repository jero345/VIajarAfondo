import Image from "next/image";

import { ClipReveal, MagneticLink, Reveal, SplitHeading } from "@/components/motion";
import { mundo, planTripLink } from "@/lib/content";

export function Mundo() {
  return (
    <section className="mundo frame" aria-labelledby="mundo-title">
      <div className="mundo__panel">
        <SplitHeading id="mundo-title" className="mundo__title ff-adelon" lines={["El mundo", "tiene más que", "mostrarte"]} />
        <Reveal delay={0.25}>
          <p className="mundo__kicker ff-surt">
            Hay lugares que despiertan tu curiosidad y <br className="br-d" />
            encuentros que cambian tu manera de mirar.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <p className="mundo__body ff-surt">
            En AFondo diseñamos viajes para descubrir la <br className="br-d" />
            esencia de cada destino: sus historias, sus sabores y <br className="br-d" />
            las personas que le dan vida. Cuidamos cada detalle <br className="br-d" />
            y dejamos espacio para lo inesperado, para que <br className="br-d" />
            puedas ir más allá y vivir el lugar a tu propio ritmo.
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <MagneticLink href={planTripLink} className="mundo__cta ff-surt">
            Planea tu viaje con nosotros
          </MagneticLink>
        </Reveal>
      </div>
      <div className="mundo__media">
        <ClipReveal from="right" parallax={5}>
          {/* TODO(cliente): esta foto solo existe a 640 px dentro del mockup; pedir el original para que no se vea blanda en pantallas grandes. */}
          <Image src={mundo.image} alt={mundo.alt} fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectPosition: "50% 65%" }} />
        </ClipReveal>
      </div>
    </section>
  );
}
