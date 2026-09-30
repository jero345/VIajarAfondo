import Image from "next/image";

import { Reveal } from "@/components/motion";
import { Container, Eyebrow } from "@/components/ui";
import { allies } from "@/lib/content";

export function Allies() {
  return (
    <section aria-labelledby="aliados-title" className="border-t border-line bg-bg-alt py-16 md:py-20">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <Eyebrow className="shrink-0 text-ink-soft">
          <span id="aliados-title">Nuestros aliados</span>
        </Eyebrow>
        <Reveal className="flex-1">
          <ul className="grid grid-cols-3 items-center gap-x-8 gap-y-10 sm:grid-cols-6 lg:flex lg:justify-between lg:gap-10">
            {allies.map((a) => (
              <li key={a.name} className="flex justify-center lg:block">
                {/* Monochrome silhouettes generated from the client's partner logos. */}
                <Image
                  src={a.src}
                  alt={a.name}
                  width={a.width}
                  height={a.height}
                  unoptimized
                  className={`${a.size} w-auto opacity-75 transition-opacity duration-300 hover:opacity-100 dark:brightness-0 dark:invert`}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
