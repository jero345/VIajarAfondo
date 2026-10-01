import Image from "next/image";

import { Reveal } from "@/components/motion";
import { mundo, planTripLink } from "@/lib/content";

export function Mundo() {
  return (
    <section className="mundo frame" aria-labelledby="mundo-title">
      <div className="mundo__panel">
        <Reveal>
          <h2 id="mundo-title" className="mundo__title ff-adelon">
            El mundo <br className="br-d" />
            tiene más que <br className="br-d" />
            mostrarte
          </h2>
          <p className="mundo__kicker ff-surt">
            Hay lugares que despiertan tu curiosidad y <br className="br-d" />
            encuentros que cambian tu manera de mirar.
          </p>
          <p className="mundo__body ff-surt">
            En AFondo diseñamos viajes para descubrir la <br className="br-d" />
            esencia de cada destino: sus historias, sus sabores y <br className="br-d" />
            las personas que le dan vida. Cuidamos cada detalle <br className="br-d" />
            y dejamos espacio para lo inesperado, para que <br className="br-d" />
            puedas ir más allá y vivir el lugar a tu propio ritmo.
          </p>
          <a href={planTripLink} target="_blank" rel="noopener noreferrer" className="mundo__cta ff-surt">
            Planea tu viaje con nosotros
          </a>
        </Reveal>
      </div>
      <div className="mundo__media">
        {/* TODO(cliente): esta foto solo existe a 640 px dentro del mockup; pedir el original para que no se vea blanda en pantallas grandes. */}
        <Image src={mundo.image} alt={mundo.alt} fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectPosition: "50% 65%" }} />
      </div>
    </section>
  );
}
