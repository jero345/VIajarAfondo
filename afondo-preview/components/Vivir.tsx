"use client";

import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { EASE, Reveal, SplitHeading } from "@/components/motion";
import { travelStyles } from "@/lib/content";

export function Vivir() {
  const [active, setActive] = useState(0);
  // The first panel animates when it scrolls into view; later tab changes animate immediately.
  const [interacted, setInteracted] = useState(false);
  const select = (i: number) => {
    setInteracted(true);
    setActive(i);
  };
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // The header links (#grupales, #a-la-medida) land on this section and open their tab.
  useEffect(() => {
    const sync = () => {
      const i = travelStyles.findIndex((s) => `#${s.id}` === window.location.hash);
      if (i >= 0) select(i);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = travelStyles.length - 1;
    const next = e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  const style = travelStyles[active];

  return (
    <section id="como-viajar" className="vivir" aria-labelledby="vivir-title">
      <div className="frame">
        <SplitHeading id="vivir-title" className="vivir__title ff-adelon" lines={["¿Cómo quieres vivir este viaje?"]} />
        <Reveal delay={0.2}>
          <p className="vivir__lead ff-surt">
            Descubre experiencias para viajar solo, en pareja, <br className="br-d" />
            en familia o en grupo.
          </p>
        </Reveal>

        <div className="tabs ff-surt" role="tablist" aria-label="Formas de viajar">
          {travelStyles.map((s, i) => (
            <button
              key={s.id}
              id={s.id}
              data-anchor
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              className="tab"
              aria-selected={i === active}
              aria-controls="vivir-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {s.tab}
              {i === active && (
                <m.span className="tab__line" layoutId="tab-underline" transition={{ type: "spring", stiffness: 320, damping: 32 }} />
              )}
            </button>
          ))}
        </div>

        <m.div
          id="vivir-panel"
          className="panel"
          role="tabpanel"
          aria-labelledby={style.id}
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <AnimatePresence initial={false}>
            <m.div
              key={`media-${style.id}`}
              className="panel__media"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <Image
                src={style.image}
                alt={style.alt}
                fill
                sizes="(min-width: 1280px) 88vw, 100vw"
                style={{ ["--pos-m" as string]: style.position.mobile, ["--pos-d" as string]: style.position.desktop }}
              />
            </m.div>
          </AnimatePresence>
          <div className={`panel__scrim${style.scrim ? "" : " panel__scrim--mobile-only"}`} aria-hidden />

          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={`copy-${style.id}`}
              className="panel__copy ff-surt"
              exit={{ opacity: 0, y: -14, transition: { duration: 0.3 } }}
            >
              <SplitHeading
                as="h3"
                className="panel__title ff-adelon"
                lines={style.title}
                trigger={interacted ? "mount" : "inView"}
                delay={0.15}
                stagger={0.07}
              />
              {style.paragraphs.map((lines, k) => (
                <m.p
                  key={lines[0]}
                  initial={{ opacity: 0, y: 16 }}
                  {...(interacted ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true } })}
                  transition={{ duration: 0.8, delay: 0.45 + k * 0.12, ease: EASE }}
                >
                  {lines.map((line, j) => (
                    <span key={line}>
                      {j > 0 && <br className="br-d" />}
                      {j > 0 && " "}
                      {line}
                    </span>
                  ))}
                </m.p>
              ))}
            </m.div>
          </AnimatePresence>
        </m.div>
      </div>
    </section>
  );
}
