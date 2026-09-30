"use client";

import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

/** Fade-up on first entry into the viewport. Used to pace each section's reading order. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
