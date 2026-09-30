import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

/** Small uppercase label. Rationed: hero, departures and allies only. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[12px] font-medium uppercase tracking-[0.22em] ${className}`}>{children}</p>;
}

export function SectionTitle({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <h2
      id={id}
      className={`font-display text-[2.6rem] leading-[1.02] font-normal tracking-[-0.01em] md:text-6xl ${className}`}
    >
      {children}
    </h2>
  );
}

const buttonBase =
  "inline-flex h-12 items-center justify-center gap-3 px-6 text-[12px] font-medium uppercase tracking-[0.16em] whitespace-nowrap transition-[background-color,color,border-color,transform] duration-300 ease-out-soft active:scale-[0.98]";

export const buttonStyles = {
  /** Solid, for paper backgrounds. */
  solid: `${buttonBase} bg-ink text-bg hover:bg-ink/85`,
  /** Solid light, for photography. */
  onPhoto: `${buttonBase} bg-mist text-navy hover:bg-white`,
  /** Hairline outline, for photography. */
  outlineOnPhoto: `${buttonBase} border border-white/70 text-white hover:border-white hover:bg-white/10`,
};

export function ArrowLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group/link inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] ${className}`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-out-soft group-hover/link:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowUpRight
        size={16}
        weight="light"
        aria-hidden
        className="transition-transform duration-300 ease-out-soft group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      />
    </a>
  );
}
