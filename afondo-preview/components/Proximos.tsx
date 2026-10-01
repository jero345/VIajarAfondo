"use client";

import {
  m,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Reveal, SplitHeading } from "@/components/motion";
import { contact, upcoming } from "@/lib/content";

const N = upcoming.length;
// Seconds for one full lap of the four destinations.
const LAP_SECONDS = 38;

function Place({
  d,
  hidden,
}: {
  d: (typeof upcoming)[number];
  hidden: boolean;
}) {
  return (
    <li className="proximos__item" aria-hidden={hidden || undefined}>
      <a
        href={d.href}
        target="_blank"
        rel="noopener noreferrer"
        className="place"
        tabIndex={hidden ? -1 : 0}
        draggable={false}
      >
        <span className="place__media">
          <Image
            src={d.image}
            alt={hidden ? "" : d.alt}
            fill
            sizes="(min-width: 1280px) 23vw, (min-width: 768px) 32vw, 64vw"
            draggable={false}
          />
        </span>
        <span className="place__name ff-surt">{d.name}</span>
      </a>
    </li>
  );
}

export function Proximos() {
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const inView = useInView(viewportRef, { margin: "200px 0px" });
  const x = useMotionValue(0);
  const speed = useRef(1);
  const target = useRef(1);
  const [lap, setLap] = useState(0);

  // Width of one set of four cards (the track holds three sets so the loop never shows a gap).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const items = track.children;
      if (items.length > N)
        setLap(
          (items[N] as HTMLElement).offsetLeft -
            (items[0] as HTMLElement).offsetLeft,
        );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView || !lap) return;
    // Ease the speed towards its target so hovering slows the loop down instead of stopping it dead.
    speed.current += (target.current - speed.current) * 0.06;
    let next =
      x.get() -
      (lap / LAP_SECONDS) * (Math.min(delta, 64) / 1000) * speed.current;
    if (next <= -lap) next += lap;
    x.set(next);
  });

  const hold = () => (target.current = 0);
  const release = () => (target.current = 1);
  const sets = reduce ? [0] : [0, 1, 2];

  return (
    <section
      id="proximos"
      className="proximos"
      aria-labelledby="proximos-title"
    >
      <div className="frame">
        <div className="proximos__head">
          <SplitHeading
            id="proximos-title"
            className="proximos__title ff-adelon"
            lines={["Próximos destinos"]}
          />
          <Reveal y={16} delay={0.2}>
            <a
              href={contact.calendar2027}
              target="_blank"
              rel="noopener noreferrer"
              className="proximos__explore ff-surt"
            >
              Explorar
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={50}>
          <div
            ref={viewportRef}
            className={`proximos__viewport${reduce ? " is-static" : ""}`}
            onPointerEnter={hold}
            onPointerLeave={release}
            onFocus={hold}
            onBlur={release}
          >
            <m.ul
              ref={trackRef}
              className="proximos__track"
              style={reduce ? undefined : { x }}
            >
              {sets.flatMap((set) =>
                upcoming.map((d) => (
                  <Place key={`${set}-${d.name}`} d={d} hidden={set !== 0} />
                )),
              )}
            </m.ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
