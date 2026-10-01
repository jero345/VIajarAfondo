"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { m } from "motion/react";

import { whatsappLink } from "@/lib/content";

export function WhatsAppFloat() {
  return (
    <m.a
      href={whatsappLink("Hola AFondo, quiero información para mi próximo viaje.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="wa"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 15, delay: 1.6 }}
      whileHover={{ y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
    >
      <WhatsappLogo size={28} weight="light" aria-hidden />
    </m.a>
  );
}
