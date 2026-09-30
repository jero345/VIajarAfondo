import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import Image from "next/image";

import { Reveal } from "@/components/motion";
import { Container, SectionTitle } from "@/components/ui";
import { destinations, whatsappLink } from "@/lib/content";

export function Destinations() {
  return (
    <section id="destinos" aria-labelledby="destinos-title" className="bg-bg-alt py-24 md:py-36">
      <Container>
        <Reveal className="max-w-[46rem]">
          <SectionTitle id="destinos-title">Destinos para conocer AFondo</SectionTitle>
          <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-ink-soft">
            Nueve lugares para vivir desde su historia, su cultura, su arquitectura, su gastronomía y su naturaleza.
          </p>
        </Reveal>

        {/* < lg: horizontal scroll-snap carousel. lg+: 12-column editorial grid, exactly nine cells. */}
        <ul className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mt-16 lg:mx-0 lg:grid lg:auto-rows-[clamp(210px,18vw,280px)] lg:grid-cols-12 lg:gap-4 lg:overflow-visible lg:px-0">
          {destinations.map((d, i) => (
            <li
              key={d.name}
              className={`relative aspect-[4/5] w-[78%] shrink-0 snap-start sm:w-[44%] lg:aspect-auto lg:w-auto ${d.cell}`}
            >
              <Reveal delay={(i % 5) * 0.06} className="h-full">
                <a
                  href={whatsappLink(`Hola AFondo, quiero diseñar un viaje a ${d.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${d.name}: diseña tu viaje por WhatsApp`}
                  className="group relative isolate block h-full overflow-hidden bg-navy text-white"
                >
                  <Image
                    src={d.image}
                    alt={d.alt}
                    fill
                    sizes={d.sizes}
                    style={d.position ? { objectPosition: d.position } : undefined}
                    className="-z-10 object-cover transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(3_17_36/0.72)_0%,rgb(3_17_36/0.12)_50%,transparent_75%)] transition-opacity duration-700 group-hover:opacity-90"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 lg:p-6">
                    <div>
                      <h3 className="font-display text-[2rem] leading-none font-normal lg:text-[2.1rem]">{d.name}</h3>
                      <p className="mt-2 max-w-[30ch] text-[14px] leading-snug text-white/85 transition-[opacity,transform] duration-500 ease-out-soft lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
                        {d.line}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      weight="light"
                      aria-hidden
                      className="shrink-0 transition-[opacity,transform] duration-500 ease-out-soft lg:opacity-0 lg:group-hover:-translate-y-0.5 lg:group-hover:opacity-100"
                    />
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
