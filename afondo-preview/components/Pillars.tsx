import Image from "next/image";

import { Reveal } from "@/components/motion";
import { Container, SectionTitle } from "@/components/ui";
import { pillars } from "@/lib/content";

export function Pillars() {
  return (
    <section aria-labelledby="porque-title" className="bg-bg py-24 md:py-36">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/3] overflow-hidden bg-navy lg:aspect-[4/5]">
                <Image
                  src={pillars.image}
                  alt={pillars.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-[50%_62%] lg:object-center"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <SectionTitle id="porque-title">¿Por qué viajar con AFondo?</SectionTitle>
              <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-ink-soft">
                Porque nuestro propósito es cumplir tu sueño de vivir el mundo AFondo.
              </p>
            </Reveal>

            <dl className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
              {pillars.items.map((item, i) => (
                <Reveal key={item.title} delay={(i % 2) * 0.08} className="border-t border-line pt-6">
                  <dt className="font-display text-[1.75rem] leading-tight text-ink">{item.title}</dt>
                  <dd className="mt-2 max-w-[40ch] text-[16px] leading-relaxed text-ink-soft">{item.body}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
