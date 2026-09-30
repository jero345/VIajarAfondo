import Image from "next/image";

import { Reveal } from "@/components/motion";
import { Container, SectionTitle } from "@/components/ui";
import { story } from "@/lib/content";

export function Story() {
  const [lead, ...body] = story.paragraphs;
  return (
    <section id="historia" aria-labelledby="historia-title" className="bg-bg-alt py-24 md:py-36">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <SectionTitle id="historia-title" className="md:text-7xl">
              Todo empezó con un viaje
            </SectionTitle>
            <p className="mt-8 max-w-[52ch] font-display text-[1.45rem] leading-snug text-ink md:text-[1.6rem]">{lead}</p>
            {body.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-6 lg:pt-28">
            <figure>
              <div className="relative aspect-[1300/930] overflow-hidden bg-navy">
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[14px] text-ink-soft">La familia Calvete Orrego.</figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Timeline: vertical rail on mobile, horizontal rail from lg. Only 1988 carries a year: the rest are not dated on the client's site. */}
        <ol className="mt-20 grid grid-cols-1 gap-10 border-l border-line pl-6 md:mt-28 lg:grid-cols-5 lg:gap-8 lg:border-t lg:border-l-0 lg:pt-10 lg:pl-0">
          {story.timeline.map((t, i) => (
            <li key={t.mark} className="relative">
              <span
                aria-hidden
                className="absolute top-[1.05rem] -left-[25px] h-[2px] w-3 bg-accent lg:-top-[42px] lg:left-0 lg:h-[3px] lg:w-10"
              />
              <Reveal delay={i * 0.08}>
                <p className="font-display text-[2.2rem] leading-none text-ink lining-nums tabular-nums">{t.mark}</p>
                <h3 className="mt-4 text-[15px] font-medium text-ink">{t.title}</h3>
                <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-ink-soft">{t.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
