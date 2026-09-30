import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import Image from "next/image";

import { Reveal } from "@/components/motion";
import { Container, SectionTitle } from "@/components/ui";
import { travelModes } from "@/lib/content";

// md+: large panel on the left spanning two rows; heading and the second panel stack on the right.
// < md: heading, then each panel with its copy below the photo (keeps text off busy image areas).
const placement = [
  { cell: "md:col-span-7 md:col-start-1 md:row-span-2 md:row-start-1 md:h-full", frame: "md:aspect-auto md:h-full md:min-h-[36rem]", sizes: "(min-width: 768px) 56vw, 100vw" },
  { cell: "md:col-span-5 md:col-start-8 md:row-start-2 md:self-end", frame: "md:aspect-[4/5]", sizes: "(min-width: 768px) 40vw, 100vw" },
];

export function TravelModes() {
  return (
    <section id="como-viajar" aria-labelledby="como-viajar-title" className="bg-bg py-24 md:py-36">
      <Container>
        <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-6 md:gap-y-16">
          <Reveal className="md:col-span-5 md:col-start-8 md:row-start-1">
            <SectionTitle id="como-viajar-title">¿Cómo quieres viajar?</SectionTitle>
            <p className="mt-6 max-w-[40ch] text-[17px] leading-relaxed text-ink-soft">
              A tu medida o en grupo, siempre con el acompañamiento de AFondo de principio a fin.
            </p>
          </Reveal>

          {travelModes.map((mode, i) => (
            <Reveal key={mode.id} delay={i * 0.12} className={placement[i].cell}>
              <article className="group relative isolate md:h-full">
                <div className={`relative aspect-[4/5] overflow-hidden bg-navy ${placement[i].frame}`}>
                  <Image
                    src={mode.image}
                    alt={mode.alt}
                    fill
                    sizes={placement[i].sizes}
                    style={{ objectPosition: mode.position }}
                    className="object-cover transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 hidden bg-[linear-gradient(to_top,rgb(3_17_36/0.8)_0%,rgb(3_17_36/0.25)_42%,transparent_68%)] md:block"
                  />
                </div>
                <div className="pt-6 md:absolute md:inset-x-0 md:bottom-0 md:p-10 md:text-white">
                  <h3 className="font-display text-[2.4rem] leading-none font-normal md:text-5xl">{mode.title}</h3>
                  <p className="mt-4 max-w-[38ch] text-[16px] leading-relaxed text-ink-soft md:text-white/85">{mode.body}</p>
                  <a
                    href={mode.cta.href}
                    {...(mode.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.16em] uppercase after:absolute after:inset-0 after:content-['']"
                  >
                    <span className="border-b border-current/40 pb-1 transition-colors duration-300 group-hover:border-current">
                      {mode.cta.label}
                    </span>
                    <ArrowUpRight
                      size={16}
                      weight="light"
                      aria-hidden
                      className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
