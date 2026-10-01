"use client";

import { m } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";

import { Logo } from "@/components/Logo";
import { EASE, useTilt } from "@/components/motion";
import { tripCards, whatsappLink, type TripCard } from "@/lib/content";

const N = tripCards.length;
// Three copies of the deck so the track can always move one card in either direction (circular).
const deck = [0, 1, 2].flatMap((copy) => tripCards.map((card, i) => ({ card, i, copy })));

function Chevron({ dir }: { dir: "prev" | "next" }) {
  // Thin chevron drawn to the mockup's 19x38 proportion.
  return (
    <svg viewBox="0 0 19 38" fill="none" stroke="currentColor" strokeLinecap="butt" strokeLinejoin="miter" aria-hidden>
      <polyline points={dir === "prev" ? "18 1 1.5 19 18 37" : "1 1 17.5 19 1 37"} />
    </svg>
  );
}

function Trip({ card, hidden, order }: { card: TripCard; hidden: boolean; order: number }) {
  const tilt = useTilt(6);
  return (
    <m.a
      className="trip ff-surt"
      href={whatsappLink(`Hola AFondo, quiero información del viaje grupal a ${card.destination} 2027.`)}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden || undefined}
      aria-label={`${card.destination}: viaje grupal 2027`}
      draggable={false}
      style={tilt.style}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      // Only the visible deck enters on scroll; the loop copies are already in place when they slide in.
      initial={hidden ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay: order * 0.1, ease: EASE }}
    >
      <m.span className="trip__glare" style={{ background: tilt.glare }} aria-hidden />
      <Image
        className="trip__photo"
        src={card.image}
        alt=""
        sizes="(min-width: 1280px) 26vw, 85vw"
        draggable={false}
        style={{ left: card.frame.left, top: card.frame.top, width: card.frame.width, height: card.frame.height }}
      />
      <h3 className="trip__title ff-adelon" style={{ color: card.color }}>
        {card.destination}
      </h3>
      <Logo className="trip__brand" title={null} style={{ color: card.color }} />
      <p className="trip__label" style={{ color: "var(--cream)" }}>
        {card.label[0]}
        <br />
        {card.label[1]}
      </p>
      <div className="trip__meta">
        <p>
          {card.group.map((l, k) => (
            <span key={l}>
              {k > 0 && <br />}
              {l}
            </span>
          ))}
        </p>
        <p>
          {card.dates.map((l, k) => (
            <span key={l}>
              {k > 0 && <br />}
              {l}
            </span>
          ))}
        </p>
      </div>
    </m.a>
  );
}

export function TripsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(N);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  // Below the desktop artboard the active card is centred so both neighbours peek in equally.
  const [offset, setOffset] = useState(0);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const cardW = first.getBoundingClientRect().width;
      const viewW = track.parentElement?.getBoundingClientRect().width ?? 0;
      setStep(cardW + gap);
      setOffset(window.matchMedia("(min-width: 1280px)").matches ? 0 : Math.max(0, (viewW - cardW) / 2));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  // After a jump without transition, turn the transition back on for the next move.
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const move = useCallback((delta: number) => {
    setAnimate(true);
    setPos((p) => p + delta);
  }, []);

  const goTo = (i: number) => {
    setAnimate(true);
    setPos(N + i);
  };

  const onTransitionEnd = () => {
    if (pos >= 2 * N || pos < N) {
      setAnimate(false);
      setPos(((pos % N) + N) % N + N);
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    drag.current = { x: e.clientX, moved: false };
  };
  const onPointerUp = (e: PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 40) {
      drag.current.moved = true;
      move(dx < 0 ? 1 : -1);
    }
  };

  const active = ((pos % N) + N) % N;

  return (
    <div className="carousel" aria-roledescription="carrusel" aria-label="Viajes grupales 2027">
      <button type="button" className="carousel__arrow carousel__arrow--prev" onClick={() => move(-1)} aria-label="Viaje anterior">
        <Chevron dir="prev" />
      </button>

      <div
        className="carousel__viewport"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClickCapture={(e) => {
          if (drag.current?.moved) {
            e.preventDefault();
            drag.current = null;
          }
        }}
      >
        <div
          ref={trackRef}
          className="carousel__track"
          onTransitionEnd={onTransitionEnd}
          style={{
            transform: `translate3d(${offset - pos * step}px, 0, 0)`,
            transition: animate && step ? "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
          }}
        >
          {deck.map(({ card, i, copy }) => (
            <Trip key={`${copy}-${i}`} card={card} hidden={copy !== 1} order={i} />
          ))}
        </div>
      </div>

      <button type="button" className="carousel__arrow carousel__arrow--next" onClick={() => move(1)} aria-label="Viaje siguiente">
        <Chevron dir="next" />
      </button>

      <div className="carousel__dots dots">
        {tripCards.map((card, i) => (
          <button
            key={card.destination}
            type="button"
            className={`dot${i === active ? " is-active" : ""}`}
            aria-label={`Ir a ${card.destination}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
