"use client";

import { Check } from "@phosphor-icons/react";
import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import { useId, useState, type FormEvent } from "react";

import { EASE } from "@/components/motion";
import { contact, newsletter } from "@/lib/content";

type Errors = Partial<Record<"name" | "email" | "consent", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter() {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Escribe tu nombre.";
    if (!EMAIL.test(email.trim())) next.email = "Revisa tu correo, parece incompleto.";
    if (!consent) next.consent = "Necesitamos tu autorización para escribirte.";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("sending");
    // TODO(integración): conectar con el CRM de AFondo (su web actual carga Clientify). En el preview solo se simula el envío.
    await new Promise((r) => setTimeout(r, 700));
    setStatus("done");
  }

  const field =
    "mt-2 block h-12 w-full border bg-bg-alt px-4 text-[16px] text-ink transition-colors duration-200 placeholder:text-ink-soft/80 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const errorText = "mt-2 text-[13px] text-[#9d2f22] dark:text-[#f2a595]";

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-title"
      className="relative isolate overflow-hidden bg-navy pt-56 pb-16 md:py-40"
    >
      <Image
        src={newsletter.image}
        alt={newsletter.alt}
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[30%_50%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy/25" />

      <div className="mx-auto flex w-full max-w-[1400px] justify-end px-4 sm:px-6 lg:px-10">
        <div className="w-full max-w-[34rem] bg-bg p-7 text-ink shadow-[0_40px_90px_-40px_rgb(3_17_36/0.65)] sm:p-10 md:p-12">
          <AnimatePresence mode="wait" initial={false}>
            {status === "done" ? (
              <m.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                role="status"
                aria-live="polite"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center border border-line">
                  <Check size={22} weight="light" aria-hidden />
                </span>
                <h2 id="newsletter-title" className="mt-6 font-display text-4xl leading-tight font-normal md:text-5xl">
                  Gracias, {name.trim().split(" ")[0]}.
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                  Ya estás en la lista. Te escribiremos a {email.trim()} con rutas e ideas para tu próximo viaje.
                </p>
              </m.div>
            ) : (
              <m.div key="form" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                <h2 id="newsletter-title" className="font-display text-4xl leading-[1.05] font-normal md:text-5xl">
                  Inspiración para tu próximo viaje
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-ink-soft">
                  Te compartimos rutas exclusivas, recomendaciones y destinos que vale la pena vivir.
                </p>

                <form noValidate onSubmit={onSubmit} className="mt-8 grid gap-5">
                  <div>
                    <label htmlFor={`${uid}-name`} className="text-[14px] font-normal text-ink">
                      Nombre
                    </label>
                    <input
                      id={`${uid}-name`}
                      name="nombre"
                      autoComplete="given-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                      className={`${field} ${errors.name ? "border-[#9d2f22]" : "border-line"}`}
                    />
                    {errors.name && (
                      <p id={`${uid}-name-error`} className={errorText}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor={`${uid}-email`} className="text-[14px] font-normal text-ink">
                      Correo electrónico
                    </label>
                    <input
                      id={`${uid}-email`}
                      name="correo"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                      className={`${field} ${errors.email ? "border-[#9d2f22]" : "border-line"}`}
                    />
                    {errors.email && (
                      <p id={`${uid}-email-error`} className={errorText}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-ink-soft">
                      <input
                        type="checkbox"
                        name="autorizacion"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
                        className="mt-1 h-4 w-4 shrink-0 accent-[#031124] dark:accent-[#e8eaec]"
                      />
                      <span>
                        Autorizo el tratamiento de mis datos personales según la{" "}
                        <a
                          href={contact.privacy}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink underline underline-offset-4"
                        >
                          política de privacidad
                        </a>
                        .
                      </span>
                    </label>
                    {errors.consent && (
                      <p id={`${uid}-consent-error`} className={errorText}>
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-2 inline-flex h-12 w-full items-center justify-center bg-ink px-6 text-[12px] font-medium tracking-[0.16em] text-bg uppercase transition-[background-color,transform] duration-300 ease-out-soft hover:bg-ink/85 active:scale-[0.98] disabled:cursor-wait disabled:bg-ink/70"
                  >
                    {status === "sending" ? "Enviando…" : "Suscribirme"}
                  </button>
                </form>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
