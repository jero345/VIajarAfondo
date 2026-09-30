import { FacebookLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/ssr";

import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui";
import { contact } from "@/lib/content";

const legal = [
  { label: "Política de tratamiento de datos personales", href: contact.privacy },
  { label: "Políticas de turismo, términos y condiciones", href: contact.terms },
  { label: "Registro Nacional de Turismo", href: contact.rnt },
];

const socials = [
  { label: "Instagram", href: contact.instagram, Icon: InstagramLogo },
  { label: "Facebook", href: contact.facebook, Icon: FacebookLogo },
  { label: "LinkedIn", href: contact.linkedin, Icon: LinkedinLogo },
];

const columnTitle = "text-[12px] font-medium tracking-[0.2em] text-footer-soft uppercase";
const link = "transition-colors duration-300 hover:text-white";

export function Footer() {
  return (
    <footer className="bg-footer text-footer-ink">
      <Container className="grid grid-cols-1 gap-14 py-20 md:py-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Logo className="h-16 w-auto" />
          <blockquote className="mt-10 max-w-[20ch] font-display text-[2rem] leading-[1.1] md:text-[2.4rem]">
            “Porque viajar no es pasar por un lugar, sino conocerlo <em className="italic">AFondo</em>.”
          </blockquote>
        </div>

        <div className="lg:col-span-3 lg:col-start-7">
          <h2 className={columnTitle}>Contacto</h2>
          <address className="mt-5 space-y-1 text-[15px] leading-relaxed not-italic">
            {contact.addressLines.map((l) => (
              <p key={l}>{l}</p>
            ))}
            <p className="pt-3">
              <a href={contact.phoneHref} className={link}>
                {contact.phoneDisplay}
              </a>
            </p>
            <p className="text-footer-soft">{contact.iata}</p>
          </address>
        </div>

        <div className="lg:col-span-3">
          <h2 className={columnTitle}>Información legal</h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-snug">
            {legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className={link}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex items-center gap-5" aria-label="Redes sociales">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={link}>
                  <Icon size={24} weight="light" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-7 text-[13px] text-footer-soft md:flex-row md:items-center md:justify-between">
          <p>© 2026 AFondo. Viajes y turismo desde 1988.</p>
          <p>Medellín, Colombia</p>
        </Container>
      </div>
    </footer>
  );
}
