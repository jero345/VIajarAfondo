"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { useMagnetic } from "@/components/motion";
import { heroInitialSlide, heroSlides } from "@/lib/content";

const AUTOPLAY_MS = 7000;

function HeroCta({ href, label, active }: { href: string; label: string; active: boolean }) {
  const mag = useMagnetic(0.3);
  return (
    <m.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hero__cta ff-surt"
      tabIndex={active ? 0 : -1}
      style={mag.style}
      onPointerMove={mag.onPointerMove}
      onPointerLeave={mag.onPointerLeave}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </m.a>
  );
}

export function Hero() {
  const [active, setActive] = useState(heroInitialSlide);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Photos trail the page as the hero scrolls away; the copy lifts and fades a little earlier.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const go = useCallback((i: number) => setActive((i + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    if (reduce || paused) return;
    timer.current = setTimeout(() => go(active + 1), AUTOPLAY_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, paused, reduce, go]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <section
      id="inicio"
      ref={ref}
      className="hero"
      aria-roledescription="carrusel"
      aria-label="Destinos destacados"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <h1 className="sr-only">AFondo, viajes a la medida y grupales desde 1988</h1>

      {heroSlides.map((slide, i) => {
        const isActive = i === active;
        return (
          <div
            key={slide.id}
            className={`hero__slide${isActive ? " is-active" : ""}`}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${heroSlides.length}`}
            aria-hidden={!isActive}
          >
            <m.div className="hero__media" style={reduce ? undefined : { y: mediaY }}>
              {/* Slow zoom-out (Ken Burns) runs in CSS on the active slide. */}
              <div className="hero__kb">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  preload={i === heroInitialSlide}
                  loading={i === heroInitialSlide ? "eager" : "lazy"}
                  style={{ objectPosition: slide.position }}
                />
              </div>
            </m.div>
            <m.div className="hero__content" style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
              <h2 className="hero__title ff-adelon">
                {slide.lines.map((line, k) => (
                  <span key={line} className="hero__line" style={{ "--i": k } as CSSProperties}>
                    <span className="hero__line-i">{line}</span>
                    {k < slide.lines.length - 1 && " "}
                  </span>
                ))}
              </h2>
              <HeroCta href={slide.cta.href} label={slide.cta.label} active={isActive} />
            </m.div>
          </div>
        );
      })}

      <div className="hero__dots dots">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            className={`dot${i === active ? " is-active" : ""}`}
            aria-label={`Ver diapositiva ${i + 1}`}
            aria-current={i === active}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  );
}
