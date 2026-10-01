import { FacebookLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/ssr";

import { LogoCompleto } from "@/components/LogoCompleto";
import { contact } from "@/lib/content";

// The mockup ends at "Próximos destinos"; this footer carries the legal and contact data the site needs,
// drawn with the mockup's colours and type.
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

export function Footer() {
  return (
    <footer className="footer ff-surt">
      <div className="footer__inner frame">
        <div>
          <LogoCompleto className="footer__logo" />
        </div>
        <div>
          <h2>Contacto</h2>
          <address style={{ fontStyle: "normal" }}>
            {contact.addressLines.map((l) => (
              <p key={l}>{l}</p>
            ))}
            <p>
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            </p>
            <p>{contact.iata}</p>
          </address>
        </div>
        <div>
          <h2>Información legal</h2>
          <ul>
            {legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="footer__social" aria-label="Redes sociales">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon size={24} weight="light" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer__legal">
        <p className="frame">© 2026 AFondo. Viajes y turismo desde 1988.</p>
      </div>
    </footer>
  );
}
