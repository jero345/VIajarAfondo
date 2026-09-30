import type { StaticImageData } from "next/image";

import imgHero from "@/public/images/hero-globo-masai-mara-atardecer.webp";
import imgALaMedida from "@/public/images/a-la-medida-viajera-masai-mara-globos.webp";
import imgGrupales from "@/public/images/grupales-peru-machu-picchu.webp";
import imgCroacia from "@/public/images/destino-croacia-dubrovnik.webp";
import imgKenia from "@/public/images/destino-kenia-maasai.webp";
import imgSudafrica from "@/public/images/destino-sudafrica-leopardo.webp";
import imgGrecia from "@/public/images/destino-grecia-mar-buganvillas.webp";
import imgJapon from "@/public/images/destino-japon-castillo-osaka.webp";
import imgTurquia from "@/public/images/destino-turquia-santa-sofia.webp";
import imgVietnam from "@/public/images/destino-vietnam-bahia-karst.webp";
import imgNamibia from "@/public/images/destino-namibia-dunas.webp";
import imgIndia from "@/public/images/destino-india-taj-mahal-aves.webp";
import imgPeru from "@/public/images/salida-peru-valle-sagrado.webp";
import imgEgipto from "@/public/images/salida-egipto-piramides-globo.webp";
import imgItalia from "@/public/images/salida-italia-skyway-monte-bianco.webp";
import imgFamilia from "@/public/images/historia-familia-calvete-orrego.webp";
import imgLeonas from "@/public/images/porque-leonas-jeep-afondo.webp";
import imgNilo from "@/public/images/newsletter-nilo-feluccas-atardecer.webp";

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
  calendar2027: "https://viajarafondo.com/viajes-grupales-2027/",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const designTripLink = whatsappLink("Hola AFondo, quiero diseñar un viaje a la medida.");

export const nav = [
  { label: "Viajes a la medida", href: "#como-viajar" },
  { label: "Viajes grupales", href: "#salidas" },
  { label: "Destinos", href: "#destinos" },
  { label: "Nuestra historia", href: "#historia" },
  // The 2021 blog is stale; Instagram is where the agency publishes its stories today.
  { label: "Historias", href: contact.instagram, external: true },
];

export const hero = {
  image: imgHero,
  alt: "Globo aerostático sobre la sabana del Masai Mara al atardecer, con ñus pastando",
};

export const travelModes = [
  {
    id: "a-la-medida",
    title: "Viajes a la medida",
    body: "Tu viaje comienza con un sueño. Diseñamos contigo una ruta personal, sin itinerarios preestablecidos.",
    cta: { label: "Diseña tu viaje", href: designTripLink, external: true },
    image: imgALaMedida,
    alt: "Viajera de AFondo en la sabana del Masai Mara con globos al fondo",
    position: "50% 30%",
  },
  {
    id: "grupales",
    title: "Viajes grupales",
    body: "Grupos pequeños, rutas curadas y guías locales. Hay viajes que recorren mapas y otros que recorren emociones.",
    cta: { label: "Ver salidas grupales", href: "#salidas", external: false },
    image: imgGrupales,
    alt: "La ciudadela de Machu Picchu entre montañas y nubes",
    position: "45% 50%",
  },
];

export type Destination = {
  name: string;
  line: string;
  image: StaticImageData;
  alt: string;
  position?: string;
  /** Tailwind grid placement for the desktop bento (lg and up). */
  cell: string;
  sizes: string;
};

export const destinations: Destination[] = [
  {
    name: "Kenia",
    line: "Sabanas doradas y culturas que laten desde hace milenios.",
    image: imgKenia,
    alt: "Guerreros maasai con mantas rojas saltando en la sabana de Kenia",
    position: "50% 35%",
    cell: "lg:col-span-6 lg:row-span-2",
    sizes: "(min-width: 1024px) 50vw, 80vw",
  },
  {
    name: "Croacia",
    line: "Un viaje a las joyas del Adriático.",
    image: imgCroacia,
    alt: "Murallas y tejados de Dubrovnik sobre el mar Adriático al atardecer",
    position: "40% 50%",
    cell: "lg:col-span-3 lg:row-span-2",
    sizes: "(min-width: 1024px) 25vw, 80vw",
  },
  {
    name: "Grecia",
    line: "La belleza eterna del Mediterráneo.",
    image: imgGrecia,
    alt: "Buganvillas fucsias frente al mar azul de una isla griega",
    position: "50% 60%",
    cell: "lg:col-span-3",
    sizes: "(min-width: 1024px) 25vw, 80vw",
  },
  {
    name: "Turquía",
    line: "Imperios, mezquitas y bazares entre dos continentes.",
    // TODO(cliente): la única foto disponible de Turquía mide 477 px. Pedir el original en alta resolución.
    image: imgTurquia,
    alt: "La basílica de Santa Sofía en Estambul con sus minaretes",
    cell: "lg:col-span-3",
    sizes: "(min-width: 1024px) 25vw, 80vw",
  },
  {
    name: "Japón",
    line: "Santuarios, rituales y la belleza de lo efímero.",
    image: imgJapon,
    alt: "Castillo de Osaka con tejados verde jade sobre un bosque",
    position: "50% 40%",
    cell: "lg:col-span-4 lg:row-span-2",
    sizes: "(min-width: 1024px) 34vw, 80vw",
  },
  {
    name: "Vietnam",
    line: "Bahías de piedra caliza y una cocina que se vive en la calle.",
    // TODO(cliente): la única foto disponible de Vietnam mide 477 px. Pedir el original en alta resolución.
    image: imgVietnam,
    alt: "Islotes de piedra caliza sobre el mar al atardecer",
    cell: "lg:col-span-3",
    sizes: "(min-width: 1024px) 25vw, 80vw",
  },
  {
    name: "India",
    line: "Colores, templos y un caos armonioso que cambia la mirada.",
    image: imgIndia,
    alt: "El Taj Mahal al atardecer con una bandada de aves",
    position: "50% 55%",
    cell: "lg:col-span-5",
    sizes: "(min-width: 1024px) 42vw, 80vw",
  },
  {
    name: "Namibia",
    line: "Silencio, arena y horizonte.",
    image: imgNamibia,
    alt: "Duna naranja de Sossusvlei bajo un cielo azul",
    cell: "lg:col-span-3",
    sizes: "(min-width: 1024px) 25vw, 80vw",
  },
  {
    name: "Sudáfrica",
    line: "Vida salvaje en el sur de África.",
    image: imgSudafrica,
    alt: "Leopardo entre la hierba alta mirando a la cámara",
    position: "50% 30%",
    cell: "lg:col-span-5",
    sizes: "(min-width: 1024px) 42vw, 80vw",
  },
];

export type Departure = {
  destination: string;
  dates: string;
  status: string;
  route: string;
  body?: string;
  price: string;
  image: StaticImageData;
  alt: string;
  whatsapp: string;
};

export const departures: Departure[] = [
  {
    destination: "Perú",
    dates: "13 al 22 de noviembre de 2026",
    status: "Últimos cupos",
    route: "Lima, Cusco, Valle Sagrado y Machu Picchu.",
    body: "Piedras que ningún cemento sostiene, pueblos que el tiempo no logró borrar y una ciudadela que toca el cielo.",
    price: "USD 4.890",
    image: imgPeru,
    alt: "Atardecer sobre el Valle Sagrado de los Incas en Perú",
    whatsapp: whatsappLink("Hola AFondo, quiero información del viaje grupal a Perú del 13 al 22 de noviembre de 2026."),
  },
  {
    destination: "Egipto + Jordania",
    dates: "29 de diciembre de 2026 al 9 de enero de 2027",
    status: "Cupos limitados",
    route: "Del Nilo y los templos de los faraones a Petra y Wadi Rum.",
    price: "USD 6.890",
    image: imgEgipto,
    alt: "Globo aerostático sobre las pirámides de Giza",
    whatsapp: whatsappLink(
      "Hola AFondo, quiero información del viaje grupal a Egipto + Jordania del 29 de diciembre de 2026 al 9 de enero de 2027.",
    ),
  },
  {
    destination: "Italia & la Nieve",
    dates: "4 al 15 de enero de 2027",
    status: "Cupos limitados",
    route: "Turín, Lago de Orta, Aosta, Courmayeur y Milán.",
    price: "EUR 6.820",
    image: imgItalia,
    alt: "Mirador sobre los Alpes nevados en el macizo del Mont Blanc",
    whatsapp: whatsappLink("Hola AFondo, quiero información del viaje grupal Italia & la Nieve del 4 al 15 de enero de 2027."),
  },
];

export const story = {
  image: imgFamilia,
  alt: "La familia Calvete Orrego, fundadores y equipo de AFondo",
  paragraphs: [
    "La historia de AFondo, como todo viaje, comienza con un encuentro. Eduardo Calvete, un español de alma curiosa, guiaba un recorrido de cuarenta días por Europa. Gloria Orrego, abogada colombiana, era una de las viajeras. Un primer beso en la Fontana di Trevi lo cambió todo.",
    "Se casaron en Medellín, vivieron en España y volvieron para criar una familia. En 1988, en un garaje de Envigado, nació la agencia con el logo de una gaviota, porque el sueño siempre fue volar.",
    "El propósito sigue siendo el mismo: enseñarles a los colombianos cómo se conoce el mundo con las seis letras de su nombre.",
  ],
  timeline: [
    { mark: "El viaje", title: "Cuarenta días por Europa", body: "Eduardo guía, Gloria viaja. Un amor de verano que no terminó." },
    { mark: "1988", title: "Un garaje en Envigado", body: "Nace la agencia y su gaviota, porque el sueño siempre fue volar." },
    { mark: "Familia", title: "Tres hijos a bordo", body: "Varinia, David y Juan Manuel hacen crecer la fábrica de sueños cumplidos." },
    { mark: "Hoy", title: "Agencia IATA en El Poblado", body: "Más de 35 años y aliados en 120 países que viven sus mismos valores." },
    { mark: "2026 - 2027", title: "Nuevos capítulos", body: "Un calendario de viajes grupales que recorre emociones." },
  ],
};

export const pillars = {
  image: imgLeonas,
  alt: "Dos leonas caminan junto al vehículo de safari con el logo de AFondo",
  items: [
    { title: "Somos Travel Coach", body: "Te guiamos según tus gustos y tus necesidades, desde la primera idea." },
    { title: "Trayectoria IATA", body: "Agencia de viajes IATA con más de 35 años recorriendo el mundo AFondo." },
    { title: "Acompañamiento 24/7", body: "Asesoría de principio a fin. Más que un apoyo, un compromiso AFondo." },
    { title: "Guías locales", body: "En los viajes grupales, para que la inmersión en la cultura sea completa." },
    { title: "Personalización", body: "Tú eres único y tu viaje también. Nos tomamos cada viaje como propio." },
    { title: "Hoteles memorables", body: "De alta calidad en servicio, bien ubicados y con arquitectura acorde al destino." },
    { title: "Innovación y creatividad", body: "Rutas en tendencia que mezclan experiencias locales con los íconos del destino." },
    { title: "Enamoramos", body: "Lealtad y satisfacción, el resultado de crear experiencias de calidad superior." },
  ],
};

// Heights are tuned per logo so wordmarks and emblems read at a similar optical size.
export const allies = [
  { name: "Air Europa", src: "/images/aliados/air-europa.webp", width: 357, height: 94, size: "h-7 md:h-8" },
  { name: "Emirates", src: "/images/aliados/emirates.webp", width: 153, height: 94, size: "h-10 md:h-12" },
  { name: "Ezus", src: "/images/aliados/ezus.webp", width: 234, height: 94, size: "h-7 md:h-8" },
  { name: "Marriott", src: "/images/aliados/marriott.webp", width: 153, height: 94, size: "h-10 md:h-12" },
  { name: "Small Luxury Hotels of the World", src: "/images/aliados/small-luxury-hotels.webp", width: 131, height: 94, size: "h-12 md:h-14" },
  { name: "Turkish Airlines", src: "/images/aliados/turkish-airlines.webp", width: 256, height: 94, size: "h-8 md:h-9" },
];

export const newsletter = {
  image: imgNilo,
  alt: "Veleros faluca navegando el Nilo al atardecer",
};
