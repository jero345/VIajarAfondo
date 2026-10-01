"use client";

import { FacebookLogo, InstagramLogo, LinkedinLogo, X } from "@phosphor-icons/react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/Logo";
import { EASE } from "@/components/motion";
import { contact, menuExtra, nav, planTripLink } from "@/lib/content";

export function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  // Flips only when crossing the threshold; React bails out on equal values.
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));

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

  const menuLinks = [...nav, ...menuExtra];

  return (
    <>
      <header className={`hdr${solid ? " is-solid" : ""}`}>
        <div className="hdr__row frame">
          <a href="#inicio" className="hdr__logo" aria-label="AFondo, volver al inicio">
            <Logo title={null} />
          </a>

          <nav className="hdr__nav ff-surt" aria-label="Principal">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hdr__cta ff-surt">
            <a href={planTripLink} target="_blank" rel="noopener noreferrer">
              Empieza a planear tu viaje
            </a>
          </div>

          <button
            type="button"
            className="hdr__burger"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="menu"
            aria-label="Abrir menú"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="menu__top">
              <Logo className="logo" title="AFondo" />
              <button type="button" className="menu__close ff-surt" onClick={() => setOpen(false)}>
                Cerrar
                <X size={24} weight="light" aria-hidden />
              </button>
            </div>

            <nav className="menu__nav" aria-label="Menú">
              <ul>
                {menuLinks.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.08 + i * 0.05, ease: EASE }}
                  >
                    <a
                      href={item.href}
                      className="ff-adelon"
                      onClick={() => setOpen(false)}
                      {...("external" in item && item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {item.label}
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>

            <m.div
              className="menu__foot ff-surt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href={planTripLink} target="_blank" rel="noopener noreferrer" className="menu__cta">
                Empieza a planear tu viaje
              </a>
              <div className="menu__contact">
                <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                <div className="menu__social">
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
