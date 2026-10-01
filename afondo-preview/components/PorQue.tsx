"use client";

import { m } from "motion/react";

import { DrawLine, EASE, Reveal, SplitHeading } from "@/components/motion";
import { pillars } from "@/lib/content";

export function PorQue() {
  return (
    <section className="porque frame" aria-labelledby="porque-title">
      <div className="porque__left">
        <SplitHeading
          as="p"
          className="porque__kicker ff-adelon"
          lines={["La curiosidad", "nos lleva. AFondo nos", "conecta."]}
          breaks="always"
          stagger={0.035}
        />
        <SplitHeading
          id="porque-title"
          className="porque__title ff-adelon"
          lines={["¿Por qué", "descubrir el mundo", "con AFondo?"]}
          breaks="always"
          delay={0.2}
        />
        <Reveal delay={0.3}>
          <p className="porque__body ff-surt">
            Porque un gran viaje nace de entender qué te mueve. <br className="br-d" />
            Diseñamos experiencias con intención, cuidamos cada <br className="br-d" />
            detalle y te acercamos a las historias, las personas y los <br className="br-d" />
            lugares que hacen único a cada destino.
          </p>
        </Reveal>
      </div>

      <ul className="porque__list ff-surt">
        {pillars.map((p, i) => (
          <m.li
            key={p.title}
            className="porque__item"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: i * 0.07, ease: EASE }}
          >
            <p>{p.title}</p>
            <p>{p.body}</p>
            <DrawLine className="porque__rule" delay={0.15 + i * 0.07} />
          </m.li>
        ))}
      </ul>
    </section>
  );
}
