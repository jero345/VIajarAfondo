"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { Reveal } from "@/components/motion";
import { travelStyles } from "@/lib/content";

export function Vivir() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // The header links (#grupales, #a-la-medida) land on this section and open their tab.
  useEffect(() => {
    const sync = () => {
      const i = travelStyles.findIndex((s) => `#${s.id}` === window.location.hash);
      if (i >= 0) setActive(i);
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
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const style = travelStyles[active];

  return (
    <section id="como-viajar" className="vivir" aria-labelledby="vivir-title">
      <div className="frame">
        <Reveal>
          <h2 id="vivir-title" className="vivir__title ff-adelon">
            ¿Cómo quieres vivir este viaje?
          </h2>
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
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {s.tab}
            </button>
          ))}
        </div>

        <div id="vivir-panel" className="panel" role="tabpanel" aria-labelledby={style.id}>
          <div className="panel__media" key={`media-${style.id}`}>
            <Image
              src={style.image}
              alt={style.alt}
              fill
              sizes="(min-width: 1280px) 88vw, 100vw"
              className="panel__img"
              style={{ ["--pos-m" as string]: style.position.mobile, ["--pos-d" as string]: style.position.desktop }}
            />
          </div>
          <div className={`panel__scrim${style.scrim ? "" : " panel__scrim--mobile-only"}`} aria-hidden />
          <div className="panel__copy ff-surt" key={`copy-${style.id}`}>
            <h3 className="panel__title ff-adelon">
              {style.title[0]} <br className="br-d" />
              {style.title[1]}
            </h3>
            {style.paragraphs.map((lines) => (
              <p key={lines[0]}>
                {lines.map((line, k) => (
                  <span key={line}>
                    {k > 0 && <br className="br-d" />}
                    {k > 0 && " "}
                    {line}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
