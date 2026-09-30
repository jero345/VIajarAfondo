"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";

import { buttonStyles } from "@/components/ui";
import { designTripLink, hero } from "@/lib/content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // The photo trails the page slightly as the hero scrolls away: a quiet sense of depth.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const delay = (seconds: number) => ({ "--rise-delay": `${seconds}s` }) as CSSProperties;

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative isolate flex min-h-[100dvh] items-end overflow-hidden bg-navy text-white"
    >
      <m.div className="absolute inset-x-0 -top-[8%] -z-10 h-[116%]" style={reduce ? undefined : { y: imageY }}>
        <Image
          src={hero.image}
          alt={hero.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover object-[55%_50%] md:object-center"
        />
      </m.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(3_17_36/0.82)_0%,rgb(3_17_36/0.35)_45%,rgb(3_17_36/0.05)_70%,rgb(3_17_36/0.35)_100%)]"
      />

      <m.div
        style={reduce ? undefined : { opacity: copyOpacity }}
        className="mx-auto w-full max-w-[1400px] px-4 pt-40 pb-24 sm:px-6 md:pb-20 lg:px-10"
      >
        {/* Headline is static on purpose: it is the LCP element and must paint with the first frame. */}
        <div>
          <p className="text-[12px] font-medium tracking-[0.22em] text-white/85 uppercase">Desde 1988</p>
          <h1 className="mt-5 font-display text-[clamp(3.6rem,15vw,10.5rem)] leading-[0.95] font-normal tracking-[-0.02em]">
            Viajar <em className="italic">AFondo</em>
          </h1>
        </div>
        <p style={delay(0.2)} className="rise mt-6 max-w-[34ch] text-lg leading-relaxed text-white/88 md:text-xl">
          Viajar no es pasar por un lugar, sino conocerlo: su historia, su cultura, su mesa y su naturaleza.
        </p>
        <div style={delay(0.35)} className="rise mt-10 grid gap-3 sm:flex sm:flex-wrap">
          <a href={designTripLink} target="_blank" rel="noopener noreferrer" className={buttonStyles.onPhoto}>
            Diseña tu viaje
          </a>
          <a href="#salidas" className={buttonStyles.outlineOnPhoto}>
            Ver salidas grupales
          </a>
        </div>
      </m.div>
    </section>
  );
}
