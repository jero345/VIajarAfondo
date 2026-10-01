import type { StaticImageData } from "next/image";

import imgHeroAfrica from "@/public/images/v2/hero-africa-jirafa-atardecer.webp";
import imgHeroPeru from "@/public/images/grupales-peru-machu-picchu.webp";
import imgHeroEgipto from "@/public/images/salida-egipto-piramides-globo.webp";
import imgCardEgipto from "@/public/images/v2/card-egipto-esfinge.webp";
import imgCardChina from "@/public/images/v2/card-china-gran-muralla.webp";
import imgCardKenia from "@/public/images/v2/card-kenia-elefantes.webp";
import imgCardGrecia from "@/public/images/v2/card-grecia-santorini.webp";
import imgMundo from "@/public/images/v2/mundo-viajera-binoculares-safari.webp";
import imgGrupales from "@/public/images/v2/vivir-grupales-safari.webp";
import imgALaMedida from "@/public/images/v2/vivir-a-la-medida-dunas.webp";
import imgFamiliar from "@/public/images/v2/vivir-familiar-nieve.webp";
import imgPareja from "@/public/images/v2/vivir-pareja-santorini.webp";
import imgFamilia from "@/public/images/v2/historia-familia-calvete-orrego.webp";
import imgIndia from "@/public/images/v2/proximo-india.webp";
import imgPeruTren from "@/public/images/v2/proximo-peru-en-tren.webp";
import imgRoma from "@/public/images/v2/proximo-roma.webp";
import imgSudafrica from "@/public/images/v2/proximo-sudafrica.webp";

export const contact = {
  whatsapp: "573117491153",
  phoneDisplay: "+57 311 7491153",
  phoneHref: "tel:+573117491153",
  addressLines: ["Cra 43A # 16A Sur - 38, oficina 1504", "El Poblado, Medellín, Antioquia"],
  iata: "IATA 7661954-6",
  instagram: "https://www.instagram.com/viajarafondo/",
  facebook: "https://facebook.com/viajarafondo",
  linkedin: "https://www.linkedin.com/company/afondo-viajes-y-tur%C3%ADsmo/",
  privacy: "https://viajarafondo.com/politicas-de-privacidad/",
  terms: "https://viajarafondo.com/politica-turismo-terminos-y-condiciones-afondo/",
  rnt: "https://viajarafondo.com/wp-content/uploads/2024/05/REGISTRO-NACIONAL-DE-TURISMO-2021.pdf",
  groupTrips: "https://viajarafondo.com/viajes-grupales/",
  calendar2027: "https://viajarafondo.com/viajes-grupales-2027/",
  story: "https://viajarafondo.com/quienes-somos/",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const planTripLink = whatsappLink("Hola AFondo, quiero empezar a planear mi viaje.");

export const nav = [
  { label: "Viajes a la medida", href: "#a-la-medida" },
  { label: "Viajes grupales", href: "#grupales" },
  { label: "Destinos", href: "#destinos" },
  { label: "Nuestra historia", href: "#historia" },
];

/** Extra links that only live in the hamburger menu. */
export const menuExtra = [
  { label: "Próximos destinos", href: "#proximos" },
  { label: "Historias", href: contact.instagram, external: true },
];

export type HeroSlide = {
  id: string;
  /** Each entry is one line of the headline as drawn in the mockup. */
  lines: string[];
  image: StaticImageData;
  alt: string;
  position: string;
  cta: { label: string; href: string };
};

// The mockup draws three dots with the middle one active, so África is slide 2 of 3 and loads first.
// PROPUESTA: the mockup only designs the África slide. Perú and Egipto reuse the client's photos with
// copy in the same voice; confirm or replace with the client.
export const heroSlides: HeroSlide[] = [
  {
    id: "peru",
    lines: ["RECORRE PERÚ AL", "RITMO DE LOS ANDES."],
    image: imgHeroPeru,
    alt: "La ciudadela de Machu Picchu entre montañas y nubes",
    position: "50% 55%",
    cta: { label: "Déjanos asesorarte", href: whatsappLink("Hola AFondo, quiero asesoría para un viaje a Perú.") },
  },
  {
    id: "africa",
    lines: ["DESCUBRE ÁFRICA EN", "SU ESTADO MÁS SALVAJE."],
    image: imgHeroAfrica,
    alt: "Jirafa entre acacias en la sabana africana al atardecer",
    position: "50% 100%",
    cta: { label: "Déjanos asesorarte", href: whatsappLink("Hola AFondo, quiero asesoría para un viaje a África.") },
  },
  {
    id: "egipto",
    lines: ["VIAJA A EGIPTO, DONDE", "LA HISTORIA SIGUE EN PIE."],
    image: imgHeroEgipto,
    alt: "Globo aerostático sobre las pirámides de Giza",
    position: "50% 60%",
    cta: { label: "Déjanos asesorarte", href: whatsappLink("Hola AFondo, quiero asesoría para un viaje a Egipto.") },
  },
];
export const heroInitialSlide = 1;

export type TripCard = {
  destination: string;
  /** Title colour, sampled from the mockup. */
  color: string;
  image: StaticImageData;
  alt: string;
  /** Photo placement inside the 375x474 card, in % of the card, measured from the mockup PDF. */
  frame: { left: string; top: string; width: string; height: string };
  label: string[];
  group: string[];
  dates: string[];
};

// MOCKUP: the four cards share "10-21 DE MAYO DE 2027" and "grupo mínimo 20 personas".
// Confirm the real dates and group size for each trip with the client before publishing.
export const tripCards: TripCard[] = [
  {
    destination: "Egipto",
    color: "#f8c901",
    image: imgCardEgipto,
    alt: "La Esfinge y una pirámide de Giza bajo el cielo azul",
    frame: { left: "-2.133%", top: "-17.722%", width: "104.267%", height: "131.435%" },
    label: ["Viaje grupal", "2027"],
    group: ["Grupo", "mínimo 20", "personas"],
    dates: ["10–21 de", "mayo de 2027"],
  },
  {
    destination: "China",
    color: "#fdc2a9",
    image: imgCardChina,
    alt: "La Gran Muralla China recorriendo las montañas en otoño",
    frame: { left: "-8.267%", top: "-38.397%", width: "121.867%", height: "153.586%" },
    label: ["Viaje grupal", "2027"],
    group: ["Grupo", "mínimo 20", "personas"],
    dates: ["10–21 de", "mayo de 2027"],
  },
  {
    destination: "Kenia",
    color: "#9cff99",
    image: imgCardKenia,
    alt: "Dos elefantes bebiendo en una charca de la sabana",
    frame: { left: "-0.8%", top: "-31.435%", width: "105.6%", height: "133.333%" },
    label: ["Viaje grupal", "2027"],
    group: ["Grupo", "mínimo 20", "personas"],
    dates: ["10–21 de", "mayo de 2027"],
  },
  {
    destination: "Grecia",
    color: "#aae2f7",
    image: imgCardGrecia,
    alt: "Cúpulas azules de Santorini sobre el mar Egeo al atardecer",
    frame: { left: "-6.4%", top: "-37.342%", width: "116.8%", height: "147.257%" },
    label: ["Viaje grupal", "2027"],
    group: ["Grupo", "mínimo 20", "personas"],
    dates: ["10–21 de", "mayo de 2027"],
  },
];

export const tripFilters = [
  { label: "Ofertas", href: whatsappLink("Hola AFondo, quiero conocer las ofertas vigentes."), variant: "outline" as const },
  { label: "Ver por fechas", href: contact.calendar2027, variant: "outline" as const },
  { label: "Ver más", href: contact.groupTrips, variant: "solid" as const },
];

export const mundo = {
  image: imgMundo,
  alt: "Viajera con binoculares en un vehículo de safari observando jirafas",
};

export type TravelStyle = {
  id: string;
  tab: string;
  title: string[];
  paragraphs: string[][];
  image: StaticImageData;
  alt: string;
  position: { mobile: string; desktop: string };
  /** The Grupales photo comes pre-graded from the designer; the others need a scrim behind the copy. */
  scrim: boolean;
  proposal: boolean;
};

export const travelStyles: TravelStyle[] = [
  {
    id: "grupales",
    tab: "Grupales",
    title: ["Comparte el", "asombro"],
    paragraphs: [
      ["Hay experiencias que se disfrutan aún más cuando se comparten.", "Descubre nuevos destinos junto a personas que sienten la misma", "curiosidad por el mundo."],
      ["En AFondo cuidamos cada detalle para que te dediques a vivir el", "viaje, compartir historias y crear conexiones que continúan más", "allá del regreso."],
    ],
    image: imgGrupales,
    alt: "Viajeros en un vehículo de safari con el logo de AFondo observando la sabana",
    position: { mobile: "72% 50%", desktop: "50% 50%" },
    scrim: false,
    proposal: false,
  },
  // PROPUESTA: the mockup only designs the Grupales tab. Copy below comes from the client's
  // "Viajes a la medida" page; Familiar and Pareja are written in the same voice. Validate with the client.
  {
    id: "a-la-medida",
    tab: "A la medida",
    title: ["Diseña tu", "propio viaje"],
    paragraphs: [
      ["Viajas para cumplir una promesa que algún día te hiciste", "y no solo para conocer un lugar."],
      ["Creamos juntos tu ruta personalizada, sin itinerarios", "preestablecidos, poniendo atención a tus prioridades."],
    ],
    image: imgALaMedida,
    alt: "Viajera sentada en una duna al atardecer",
    position: { mobile: "60% 60%", desktop: "50% 62%" },
    scrim: true,
    proposal: true,
  },
  {
    id: "familiar",
    tab: "Familiar",
    title: ["Viajar en", "familia"],
    paragraphs: [
      ["Hay viajes que se convierten en historias familiares para siempre.", "Descubran el mundo a un ritmo pensado para grandes y pequeños."],
      ["En AFondo cuidamos cada detalle para que solo se ocupen de", "disfrutar, aprender y crear recuerdos juntos."],
    ],
    image: imgFamiliar,
    alt: "Madre e hija saludando desde una moto de nieve en un viaje grupal de AFondo",
    position: { mobile: "30% 50%", desktop: "50% 40%" },
    scrim: true,
    proposal: true,
  },
  {
    id: "pareja",
    tab: "Pareja",
    title: ["Un viaje", "para dos"],
    paragraphs: [
      ["Algunos destinos se descubren mejor de a dos: atardeceres,", "mesas para compartir y momentos que no se repiten."],
      ["Diseñamos cada detalle a su medida para que solo se ocupen de", "vivir el viaje y celebrar lo que los une."],
    ],
    image: imgPareja,
    alt: "Pareja contemplando el atardecer sobre el mar en Santorini",
    position: { mobile: "55% 50%", desktop: "50% 30%" },
    scrim: true,
    proposal: true,
  },
];

export const historia = {
  image: imgFamilia,
  alt: "La familia Calvete Orrego, fundadores y equipo de AFondo",
  link: contact.story,
};

export const pillars = [
  { title: "Somos Travel Coach", body: "Te guiamos según tus gustos y tus necesidades, desde la primera idea." },
  { title: "Trayectoria IATA", body: "Agencia de viajes IATA con más de 35 años recorriendo el mundo AFondo." },
  { title: "Acompañamiento 24/7", body: "Asesoría de principio a fin. Más que un apoyo, un compromiso AFondo." },
  { title: "Guías locales", body: "En los viajes grupales, para que la inmersión en la cultura sea completa." },
  { title: "Personalización", body: "Tú eres único y tu viaje también. Nos tomamos cada viaje como propio." },
  { title: "Hoteles memorables", body: "De alta calidad en servicio, bien ubicados y con arquitectura acorde al destino." },
  { title: "Innovación y creatividad", body: "Rutas en tendencia que mezclan experiencias locales con los íconos del destino." },
];

export const upcoming = [
  { name: "India", image: imgIndia, alt: "Estatua de Buda entre hojas de palma", whatsapp: "India" },
  { name: "Perú en tren", image: imgPeruTren, alt: "Bailarines con trajes típicos dentro de un tren panorámico en Perú", whatsapp: "Perú en tren" },
  { name: "Roma", image: imgRoma, alt: "El Coliseo de Roma bajo el cielo azul", whatsapp: "Roma" },
  { name: "Sudáfrica", image: imgSudafrica, alt: "Leopardo entre la hierba alta mirando a la cámara", whatsapp: "Sudáfrica" },
].map((d) => ({ ...d, href: whatsappLink(`Hola AFondo, quiero información sobre el viaje a ${d.whatsapp}.`) }));
