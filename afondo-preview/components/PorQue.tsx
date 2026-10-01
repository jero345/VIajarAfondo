import { Reveal } from "@/components/motion";
import { pillars } from "@/lib/content";

export function PorQue() {
  return (
    <section className="porque frame" aria-labelledby="porque-title">
      <Reveal className="porque__left">
        <p className="porque__kicker ff-adelon">
          La curiosidad <br />
          nos lleva. AFondo nos <br />
          conecta.
        </p>
        <h2 id="porque-title" className="porque__title ff-adelon">
          ¿Por qué <br />
          descubrir el mundo <br />
          con AFondo?
        </h2>
        <p className="porque__body ff-surt">
          Porque un gran viaje nace de entender qué te mueve. <br className="br-d" />
          Diseñamos experiencias con intención, cuidamos cada <br className="br-d" />
          detalle y te acercamos a las historias, las personas y los <br className="br-d" />
          lugares que hacen único a cada destino.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <ul className="porque__list ff-surt">
          {pillars.map((p) => (
            <li key={p.title} className="porque__item">
              <p>{p.title}</p>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
