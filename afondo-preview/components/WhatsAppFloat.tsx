import { WhatsappLogo } from "@phosphor-icons/react/ssr";

import { whatsappLink } from "@/lib/content";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hola AFondo, quiero información para mi próximo viaje.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="wa"
    >
      <WhatsappLogo size={28} weight="light" aria-hidden />
    </a>
  );
}
