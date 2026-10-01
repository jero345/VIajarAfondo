import Image from "next/image";

import { Reveal } from "@/components/motion";
import { contact, upcoming } from "@/lib/content";

export function Proximos() {
  return (
    <section id="proximos" className="proximos" aria-labelledby="proximos-title">
      <div className="frame">
        <Reveal className="proximos__head">
          <h2 id="proximos-title" className="proximos__title ff-adelon">
            Próximos destinos
          </h2>
          <a href={contact.calendar2027} target="_blank" rel="noopener noreferrer" className="proximos__explore ff-surt">
            Explorar
          </a>
        </Reveal>

        <ul className="proximos__grid">
          {upcoming.map((d, i) => (
            <li key={d.name}>
              <Reveal delay={i * 0.06}>
                <a href={d.href} target="_blank" rel="noopener noreferrer" className="place">
                  <span className="place__media">
                    <Image src={d.image} alt={d.alt} fill sizes="(min-width: 1280px) 23vw, (min-width: 768px) 25vw, 50vw" />
                  </span>
                  <span className="place__name ff-surt">{d.name}</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
