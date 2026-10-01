"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { heroInitialSlide, heroSlides } from "@/lib/content";

const AUTOPLAY_MS = 7000;

export function Hero() {
  const [active, setActive] = useState(heroInitialSlide);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
            <div className="hero__media">
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
            <div className="hero__content">
              <h2 className="hero__title ff-adelon">
                {slide.lines.map((line, k) => (
                  <span key={line}>
                    {line}
                    {k < slide.lines.length - 1 && " "}
                  </span>
                ))}
              </h2>
              <a
                href={slide.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__cta ff-surt"
                tabIndex={isActive ? 0 : -1}
              >
                {slide.cta.label}
              </a>
            </div>
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
