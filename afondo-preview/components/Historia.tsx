"use client";

import { m } from "motion/react";
import Image from "next/image";

import { Gaviota } from "@/components/Gaviota";
import { ClipReveal, EASE, MagneticLink, Reveal, SplitHeading } from "@/components/motion";
import { historia } from "@/lib/content";

export function Historia() {
  return (
    <section id="historia" className="historia" aria-labelledby="historia-title">
      <div className="frame">
        <div className="historia__head">
          <Reveal y={16}>
            <p className="historia__label ff-surt">Nuestra historia</p>
          </Reveal>
          {/* The seagull glides in once, then keeps a slow float; the star twinkles (CSS). */}
          <m.div
            className="historia__bird-wrap"
            initial={{ opacity: 0, x: -140, y: 70, rotate: -12 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 60, damping: 16, mass: 1.1 }}
          >
            <Gaviota className="historia__bird" title={null} />
          </m.div>
        </div>

        <SplitHeading
          id="historia-title"
          className="historia__title ff-adelon"
          lines={["Porque viajar no es pasar por", "un lugar, sino conocerlo AFondo"]}
          strong={["AFondo"]}
          stagger={0.045}
        />

        <div className="historia__grid">
          <div className="historia__text ff-adelon">
            <Reveal>
              <p>
                Más que una agencia de viajes, somos un estilo de vida activo e <br className="br-d" />
                intelectual. Una empresa familiar fundada en <strong>1988 por Eduardo <br className="br-d" />
                Calvete y Gloria Orrego</strong> con la misión de descubrir el mundo y <br className="br-d" />
                compartirlo con todos sus matices, desde una perspectiva integral, <br className="br-d" />
                viviendo cada destino desde su historia, cultura, arquitectura, <br className="br-d" />
                gastronomía, religión, naturaleza y hábitos.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="historia__chapter">Capítulo 01</p>
              <p>
                La historia de AFondo, como todo viaje, comienza con un <br className="br-d" />
                encuentro. Eduardo Calvete, español, un alma curiosa que <br className="br-d" />
                trabajaba como economista y funcionario público, decidió guiar <br className="br-d" />
                un viaje por Europa siguiendo su pasión y hambre por recorrer el <br className="br-d" />
                mundo.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <MagneticLink href={historia.link} className="historia__more ff-surt">
                Ver más
              </MagneticLink>
            </Reveal>
          </div>

          <m.div
            className="historia__photo"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <ClipReveal from="bottom" parallax={4}>
              <Image src={historia.image} alt={historia.alt} fill sizes="(min-width: 1280px) 42vw, 100vw" />
            </ClipReveal>
          </m.div>
        </div>
      </div>
    </section>
  );
}
