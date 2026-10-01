import Image from "next/image";

import { Gaviota } from "@/components/Gaviota";
import { Reveal } from "@/components/motion";
import { historia } from "@/lib/content";

export function Historia() {
  return (
    <section id="historia" className="historia" aria-labelledby="historia-title">
      <div className="frame">
        <Reveal className="historia__head">
          <p className="historia__label ff-surt">Nuestra historia</p>
          <Gaviota className="historia__bird" title={null} />
        </Reveal>

        <Reveal>
          <h2 id="historia-title" className="historia__title ff-adelon">
            Porque viajar no es pasar por <br className="br-d" />
            un lugar, sino conocerlo <strong>AFondo</strong>
          </h2>
        </Reveal>

        <div className="historia__grid">
          <Reveal className="historia__text ff-adelon">
            <p>
              Más que una agencia de viajes, somos un estilo de vida activo e <br className="br-d" />
              intelectual. Una empresa familiar fundada en <strong>1988 por Eduardo <br className="br-d" />
              Calvete y Gloria Orrego</strong> con la misión de descubrir el mundo y <br className="br-d" />
              compartirlo con todos sus matices, desde una perspectiva integral, <br className="br-d" />
              viviendo cada destino desde su historia, cultura, arquitectura, <br className="br-d" />
              gastronomía, religión, naturaleza y hábitos.
            </p>
            <p className="historia__chapter">Capítulo 01</p>
            <p>
              La historia de AFondo, como todo viaje, comienza con un <br className="br-d" />
              encuentro. Eduardo Calvete, español, un alma curiosa que <br className="br-d" />
              trabajaba como economista y funcionario público, decidió guiar <br className="br-d" />
              un viaje por Europa siguiendo su pasión y hambre por recorrer el <br className="br-d" />
              mundo.
            </p>
            <a href={historia.link} target="_blank" rel="noopener noreferrer" className="historia__more ff-surt">
              Ver más
            </a>
          </Reveal>

          <Reveal delay={0.12} className="historia__photo">
            <Image src={historia.image} alt={historia.alt} fill sizes="(min-width: 1280px) 42vw, 100vw" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
