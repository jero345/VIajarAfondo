# Prompt para Claude Code: Preview rediseño AFondo

Vamos a construir un PREVIEW de rediseño de la web de un cliente de mi agencia para enviárselo como propuesta comercial. No es producción: es una demo visual de alto impacto que se debe desplegar como un link compartible.

## 0. Setup
1. Instala la skill: `npx skills add Leonxlnx/taste-skill`
2. Lee su SKILL.md completo ANTES de escribir código y aplica sus reglas de diseño en todo el proyecto. Si algo de este prompt contradice la skill en temas de gusto visual, gana la skill. Si contradice el contenido o la marca del cliente, gana este prompt.

## 1. Contexto
- Cliente: AFondo (viajarafondo.com). Es una agencia de viajes familiar de Medellín fundada en 1988 por Eduardo Calvete y Gloria Orrego. Es agencia IATA con más de 35 años de trayectoria y se posiciona como "Travel Coach". Ofrece viajes a la medida y viajes grupales (2026 y 2027). Su concepto es "viajar no es pasar por un lugar, sino conocerlo AFondo": historia, cultura, arquitectura, gastronomía y naturaleza.
- Web actual: hecha en WordPress con Elementor. Tiene menú duplicado, hero sin propuesta de valor clara, una grilla de destinos sin contexto, blog con posts de 2021 (uno se llama "hello-world"), un feed de Instagram roto que muestra placeholders y dos formularios de newsletter (uno en inglés). Transmite "agencia genérica", no viaje premium de autor.
- Referente de estilo: https://www.abercrombiekent.com/. Analízalo (navega y haz screenshots) SOLO para extraer el lenguaje visual: fotografía full-bleed y editorial, tipografía serif elegante combinada con sans limpia, mucho aire, jerarquía sobria, CTAs discretos pero claros y sensación de lujo silencioso. NO copies sus fotos, textos, logo, estructura exacta ni nombres. El resultado debe sentirse de la misma liga, no un clon.

## 2. Assets (obligatorio)
- Haz scraping de viajarafondo.com y de sus páginas internas (/viajes-a-la-medida/, /viajes-grupales/, /viajes-grupales-2027/, /quienes-somos/ y las páginas de destino como /kenia/) y descarga TODAS las fotos del cliente en su mejor resolución disponible (quita los sufijos -1024x1024, -300x200, etc. de las URLs de wp-content/uploads para obtener el original).
- Logo: https://viajarafondo.com/wp-content/uploads/2024/04/logo-afondo-azul.svg
- Logos de aliados: Air Europa, Emirates, Ezus, Marriott, Small Luxury Hotels y Turkish Airlines, que están en /wp-content/uploads/2025/06/.
- Guárdalo todo en /public/images, optimizado en WebP y con nombres descriptivos.
- Si falta foto para algún destino, deja un bloque con fondo de color de marca y un TODO visible en el código. No uses stock ni fotos de A&K.
- Usa los textos reales del cliente. Puedes pulir el copy para que suene más premium, pero sin inventar datos (años, cifras, premios, precios).

## 3. Estructura del home
1. Header transparente sobre el hero, que se vuelve sólido al hacer scroll. Menú: Viajes a la medida · Viajes grupales · Destinos · Nuestra historia · Historias. CTA "Diseña tu viaje".
2. Hero full-screen con la mejor foto del cliente, un headline editorial en torno a "Viajar AFondo" y la línea "Desde 1988".
3. Selector "¿Cómo quieres viajar?": dos caminos grandes con imagen (A la medida / Grupales).
4. Destinos: Croacia, Kenia, Sudáfrica, Grecia, Japón, Turquía, Vietnam, Namibia e India. Grilla editorial asimétrica o carrusel con hover elegante.
5. Próximas salidas grupales: tarjetas de Perú (13–22 nov 2026, últimos cupos), Egipto + Jordania (29 dic 2026 – 9 ene 2027) e Italia & la Nieve (4–15 ene 2027). Badge de cupos y CTA a WhatsApp.
6. Historia: "Todo empezó con un viaje". Bloque editorial con la historia de los fundadores y la línea de tiempo de 1988 a hoy.
7. Por qué AFondo: los 8 pilares (Travel Coach, Trayectoria IATA, Acompañamiento 24/7, Guías locales, Personalización, Hoteles memorables, etc.) en un layout sobrio, sin íconos genéricos de plantilla.
8. Aliados: franja de logos en monocromo.
9. Newsletter: UN solo formulario, en español, con nombre y correo (un solo paso).
10. Footer: dirección El Poblado, teléfono +57 311 7491153, IATA 7661954-6, links legales y redes.
- Botón flotante de WhatsApp al +57 311 7491153 con mensaje prellenado.

## 4. Stack y calidad
- Next.js (App Router) + Tailwind + Framer Motion para animaciones sutiles (reveal al hacer scroll y parallax suave en el hero; nada exagerado).
- Mobile-first impecable. El cliente lo va a abrir desde el celular.
- next/image con lazy loading. Lighthouse de performance por encima de 90.
- Todo el sitio en español.

## 5. Entrega
1. Despliega en Vercel y dame el link del preview.
2. Toma screenshots en desktop (1440px) y mobile (390px) del home completo y revísalos tú mismo contra el referente y las reglas de la skill. Itera al menos una vez sobre lo que se vea genérico o desbalanceado antes de darme el link.
3. Al final, dame un resumen de 5 bullets con las mejoras clave frente a la web actual. Lo voy a usar para el mensaje al cliente.

Antes de empezar, muéstrame el plan (paleta, tipografías elegidas y el mapa de secciones) y espera mi OK.
