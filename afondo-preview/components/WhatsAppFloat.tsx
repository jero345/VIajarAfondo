import { WhatsappLogo } from "@phosphor-icons/react/ssr";

import { whatsappLink } from "@/lib/content";

/** Persistent contact shortcut. Circular by design: the one documented exception to the square-corner system. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hola AFondo, quiero información para mi próximo viaje.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed right-4 bottom-4 z-[var(--z-float)] inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy text-mist shadow-[0_14px_34px_-12px_rgb(3_17_36/0.7)] ring-1 ring-white/20 transition-transform duration-300 ease-out-soft hover:-translate-y-0.5 active:scale-95 sm:right-6 sm:bottom-6"
    >
      <WhatsappLogo size={28} weight="light" aria-hidden />
    </a>
  );
}
