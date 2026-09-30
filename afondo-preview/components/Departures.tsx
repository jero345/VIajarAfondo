import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import Image from "next/image";

import { Reveal } from "@/components/motion";
import { ArrowLink, Container, Eyebrow, SectionTitle } from "@/components/ui";
import { contact, departures, type Departure } from "@/lib/content";

function DepartureCard({ trip, feature = false }: { trip: Departure; feature?: boolean }) {
  return (
    <article className="group">
      <div className={`relative overflow-hidden bg-navy ${feature ? "aspect-[4/3] lg:aspect-square" : "aspect-[16/9]"}`}>
        <Image
          src={trip.image}
          alt={trip.alt}
          fill
          sizes={feature ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1024px) 38vw, 100vw"}
          className="object-cover transition-transform duration-[1400ms] ease-out-soft group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex items-center bg-accent px-2.5 py-1 text-[11px] font-medium tracking-[0.14em] text-navy uppercase">
            {trip.status}
          </span>
          <span className="text-[15px] text-ink-soft tabular-nums">{trip.dates}</span>
        </div>

        <h3 className={`mt-4 font-display leading-none font-normal ${feature ? "text-5xl md:text-6xl" : "text-4xl md:text-[2.75rem]"}`}>
          {trip.destination}
        </h3>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{trip.route}</p>
        {feature && trip.body && (
          <p className="mt-2 max-w-[52ch] text-[16px] leading-relaxed text-ink-soft">{trip.body}</p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <p className="text-[15px]">
            <span className="text-ink-soft">Desde </span>
            <span className="font-medium tabular-nums">{trip.price}</span>
          </p>
          <a
            href={trip.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2.5 border border-ink px-4 text-[12px] font-medium tracking-[0.16em] whitespace-nowrap uppercase transition-[background-color,color,transform] duration-300 ease-out-soft hover:bg-ink hover:text-bg active:scale-[0.98]"
          >
            <WhatsappLogo size={18} weight="light" aria-hidden />
            Consultar cupos
          </a>
        </div>
      </div>
    </article>
  );
}

export function Departures() {
  const [lead, ...rest] = departures;
  return (
    <section id="salidas" aria-labelledby="salidas-title" className="bg-bg py-24 md:py-36">
      <Container>
        <Reveal>
          <Eyebrow className="text-ink-soft">Viajes grupales 2026 · 2027</Eyebrow>
          <SectionTitle id="salidas-title" className="mt-4">
            Próximas salidas
          </SectionTitle>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-16 md:mt-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <DepartureCard trip={lead} feature />
          </Reveal>
          <div className="grid content-start gap-16 lg:col-span-5 lg:gap-12">
            {rest.map((trip, i) => (
              <Reveal key={trip.destination} delay={0.1 + i * 0.1}>
                <DepartureCard trip={trip} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-20 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[52ch] text-[16px] leading-relaxed text-ink-soft">
            Doce salidas grupales en 2027, de Italia & la Nieve en enero a Australia & Nueva Zelanda en diciembre.
          </p>
          <ArrowLink href={contact.calendar2027} external className="shrink-0">
            Ver calendario 2027
          </ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}
