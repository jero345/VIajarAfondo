"use client";

import {
  LazyMotion,
  MotionConfig,
  domMax,
  m,
  useMotionTemplate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { Fragment, useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  // domMax adds layout animations (shared tab underline) on top of domAnimation.
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

/** Fade-up on first entry into the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

const wordParent = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const wordChild: Variants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 0.95, ease: EASE } },
};

type SplitTag = "h2" | "h3" | "p";

/**
 * Headline whose words rise out of a mask, one after another.
 * `lines` are the mockup's lines; breaks between them are desktop-only unless `breaks="always"`.
 */
export function SplitHeading({
  as = "h2",
  id,
  className,
  style,
  lines,
  breaks = "desktop",
  strong = [],
  delay = 0,
  stagger = 0.055,
  trigger = "inView",
}: {
  as?: SplitTag;
  id?: string;
  className?: string;
  style?: CSSProperties;
  lines: string[];
  breaks?: "desktop" | "always";
  strong?: string[];
  delay?: number;
  stagger?: number;
  trigger?: "inView" | "mount";
}) {
  const Tag = (as === "h3" ? m.h3 : as === "p" ? m.p : m.h2) as typeof m.h2;
  const play = trigger === "mount" ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.4 } };
  return (
    <Tag id={id} className={className} style={style} initial="hidden" variants={wordParent(delay, stagger)} {...play}>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && (breaks === "always" ? <br /> : <br className="br-d" />)}
          {li > 0 && " "}
          {line.split(" ").map((word, k, words) => (
            <Fragment key={k}>
              <span className="sw">
                <m.span className="sw__i" variants={wordChild}>
                  {strong.includes(word.replace(/[.,¿?]/g, "")) ? <strong>{word}</strong> : word}
                </m.span>
              </span>
              {k < words.length - 1 && " "}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </Tag>
  );
}

/**
 * Photo that opens like a curtain the first time it is seen, then drifts slowly with the scroll.
 * Must sit inside a positioned box; the image goes in as a `fill` child.
 * Visibility is detected on an unclipped wrapper: IntersectionObserver applies ancestors' clip-path,
 * so a fully closed curtain would never report itself as visible.
 */
export function ClipReveal({
  children,
  from = "left",
  parallax = 6,
  className = "",
}: {
  children: ReactNode;
  from?: "left" | "right" | "bottom";
  parallax?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-parallax}%`, `${parallax}%`]);
  const closed = { left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)", bottom: "inset(100% 0% 0% 0%)" }[from];
  const open = "inset(0% 0% 0% 0%)";
  return (
    <div ref={ref} className={`clip ${className}`}>
      <m.div
        className="clip__curtain"
        initial={reduce ? false : { clipPath: closed }}
        animate={{ clipPath: reduce || seen ? open : closed }}
        transition={{ duration: 1.3, ease: EASE }}
      >
        <m.div
          className="clip__inner"
          style={reduce || !parallax ? undefined : { y }}
          initial={reduce ? false : { scale: 1.14 }}
          animate={{ scale: reduce || seen ? 1 : 1.14 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          {children}
        </m.div>
      </m.div>
    </div>
  );
}

/** A 1px rule that draws itself from the left when it enters the viewport. */
export function DrawLine({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <m.span
      aria-hidden
      className={className}
      style={{ originX: 0 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  );
}

/** Pointer-following pull for call-to-action buttons (fine pointers only). */
export function useMagnetic(strength = 0.25) {
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const reduce = useReducedMotion();
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };
  return { style: { x, y }, onPointerMove, onPointerLeave };
}

/** Magnetic link, for CTAs that are plain anchors. */
export function MagneticLink({
  className,
  href,
  children,
  external = true,
  strength,
}: {
  className?: string;
  href: string;
  children: ReactNode;
  external?: boolean;
  strength?: number;
}) {
  const mag = useMagnetic(strength);
  return (
    <m.a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={mag.style}
      onPointerMove={mag.onPointerMove}
      onPointerLeave={mag.onPointerLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </m.a>
  );
}

/** 3D tilt with a soft glare that follows the pointer. Returns props for an m.* element plus the glare style. */
export function useTilt(max = 7) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 20 });
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 20 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgb(255 244 227 / 0.22), transparent 55%)`;
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };
  return { style: { rotateX, rotateY, transformPerspective: 900 }, glare, onPointerMove, onPointerLeave };
}
