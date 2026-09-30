"use client";

import { List, X, InstagramLogo, FacebookLogo, LinkedinLogo } from "@phosphor-icons/react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/Logo";
import { EASE } from "@/components/motion";
import { contact, designTripLink, nav } from "@/lib/content";

export function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  // Only flips state when crossing the threshold; React bails out on equal values.
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 48));

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[var(--z-header)] border-b transition-[background-color,color,border-color] duration-500 ease-out-soft ${
          solid ? "border-line bg-bg/90 text-ink backdrop-blur-md" : "border-transparent bg-transparent text-white"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
          <a href="#inicio" aria-label="AFondo, volver al inicio" className="shrink-0">
            <Logo className="h-12 w-auto" />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 text-[14px] font-normal whitespace-nowrap transition-[background-size] duration-500 ease-out-soft hover:bg-[length:100%_1px]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={designTripLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden h-11 items-center px-5 text-[12px] font-medium tracking-[0.16em] whitespace-nowrap uppercase transition-[background-color,color,border-color,transform] duration-300 ease-out-soft active:scale-[0.98] sm:inline-flex ${
                solid
                  ? "border border-ink bg-ink text-bg hover:bg-ink/85"
                  : "border border-white/70 text-white hover:border-white hover:bg-white hover:text-navy"
              }`}
            >
              Diseña tu viaje
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="-mr-2 inline-flex h-11 items-center gap-2 px-2 text-[12px] font-medium tracking-[0.16em] uppercase lg:hidden"
            >
              Menú
              <List size={24} weight="light" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-0 z-[var(--z-menu)] flex flex-col overflow-y-auto bg-navy text-mist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between px-4 sm:px-6">
              <Logo className="h-12 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-2 inline-flex h-11 items-center gap-2 px-2 text-[12px] font-medium tracking-[0.16em] uppercase"
              >
                Cerrar
                <X size={24} weight="light" aria-hidden />
              </button>
            </div>

            <nav aria-label="Menú móvil" className="flex flex-1 flex-col justify-center px-4 py-10 sm:px-6">
              <ul className="space-y-2">
                {nav.map((item, i) => (
                  <m.li
                    key={item.label}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.08 + i * 0.06, ease: EASE }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="block py-1 font-display text-[2.6rem] leading-tight"
                    >
                      {item.label}
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>

            <m.div
              className="shrink-0 space-y-8 px-4 pb-10 sm:px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <a
                href={designTripLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center bg-mist px-6 text-[12px] font-medium tracking-[0.16em] text-navy uppercase active:scale-[0.98]"
              >
                Diseña tu viaje
              </a>
              <div className="flex items-center justify-between text-[15px] text-mist/80">
                <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                <div className="flex items-center gap-5">
                  <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <InstagramLogo size={22} weight="light" />
                  </a>
                  <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FacebookLogo size={22} weight="light" />
                  </a>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <LinkedinLogo size={22} weight="light" />
                  </a>
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
