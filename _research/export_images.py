"""Export the client's photographs to WebP with descriptive names.

Promo banners with baked-in text, maps, screenshots and AI-generated images are
skipped. Posters with a printed title get cropped above the title.
"""
import os
from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None
SRC = "raw"
OUT = "../afondo-preview/public/images"
os.makedirs(OUT, exist_ok=True)
os.makedirs(OUT + "/aliados", exist_ok=True)

# (source, output name, max long edge, crop box as fractions (l, t, r, b) or None)
PHOTOS = [
    # used on the home
    ("2025_11_shutterstock_2293998959.jpg", "hero-globo-masai-mara-atardecer", 2560, None),
    ("2026_03_IMG_0108.jpg", "a-la-medida-viajera-masai-mara-globos", 1800, None),
    ("2026_06_shutterstock_2534555653-1.jpg", "grupales-peru-machu-picchu", 2000, None),
    ("2026_03_CROACIA.png", "destino-croacia-dubrovnik", 1800, (0, 0.12, 1, 0.70)),
    ("2026_03_shutterstock_2185720307.jpg", "destino-kenia-maasai", 2000, None),
    ("2026_03_SUDAFRICAZIMBAWE.png", "destino-sudafrica-leopardo", 1800, (0, 0.0, 1, 0.61)),
    ("2026_03_GRECIA.png", "destino-grecia-mar-buganvillas", 1800, (0, 0.0, 1, 0.70)),
    ("2026_03_JAPON.png", "destino-japon-castillo-osaka", 1800, (0, 0.10, 1, 0.70)),
    ("2025_06_TURQUIA-HOME.webp", "destino-turquia-santa-sofia", 1200, None),
    ("2025_06_VIENTNAM-HOME.webp", "destino-vietnam-bahia-karst", 1200, None),
    ("2025_06_Destinos-13.webp", "destino-namibia-dunas", 1600, None),
    ("2025_07_banner-India-Viajes-grupales.webp", "destino-india-taj-mahal-aves", 1920, None),
    ("2026_06_2.png", "salida-peru-valle-sagrado", 1920, None),
    ("2026_07_sunset-view-of-pyramid-complex-of-giza-in-cairo-2026-03-16-03-28-40-utc-2.jpg", "salida-egipto-piramides-globo", 2000, None),
    ("2026_03_shutterstock_2050802543.jpg", "salida-italia-skyway-monte-bianco", 2000, None),
    ("2025_08_Familia-copia-1.webp", "historia-familia-calvete-orrego", 1400, None),
    ("2026_03_leon-afondo.png", "porque-leonas-jeep-afondo", 1400, None),
    ("2026_07_feluccas-sailboats-on-the-nile-river-at-dusk-2026-03-19-21-44-04-utc.jpg", "newsletter-nilo-feluccas-atardecer", 2560, None),
    # archive of the rest of the client's photographs
    ("2021_09_89781118_xl-scaled-1.jpeg", "portugal-oporto-azulejos", 2000, None),
    ("2024_04_banner-mujeres-africa.png", "africa-retrato-mujer", 1728, None),
    ("2024_04_img-popup.png", "grecia-santorini", 1200, None),
    ("2024_04_mixquic-tradicion-mexicana-min-scaled-1.jpeg", "mexico-mixquic-dia-de-muertos", 2000, None),
    ("2024_05_china.jpg", "china-gran-muralla-viajero", 1200, None),
    ("2025_04_Assets_Mesa-de-trabajo-1.webp", "japon-templo-pagoda-kioto", 1920, None),
    ("2025_05_Destinos-02.webp", "india-jaipur-jal-mahal", 1200, None),
    ("2025_05_Destinos-04.webp", "india-jaipur-celosias-rosadas", 1200, None),
    ("2025_05_Destinos-05.webp", "india-gastronomia-chapati", 1200, None),
    ("2025_05_Destinos-06.webp", "india-varanasi-ghats-lotos", 1200, None),
    ("2025_06_CROACIA-HOME-1.webp", "croacia-plitvice-cascadas-aerea", 1200, None),
    ("2025_06_CROACIA-HOME.webp", "croacia-plitvice-cascadas", 1200, None),
    ("2025_06_Destinos-15.webp", "namibia-etosha-cebras", 1200, None),
    ("2025_06_Destinos-16.webp", "namibia-windhoek-iglesia-cristo", 1200, None),
    ("2025_06_Destinos-17.webp", "namibia-swakopmund-arquitectura", 1200, None),
    ("2025_06_GRECIA-HOME-1.webp", "grecia-mykonos", 1200, None),
    ("2025_06_INDIA-HOME.webp", "india-taj-mahal-reflejo", 1200, None),
    ("2025_06_ImgAfondo-16.webp", "japon-cerezos-en-flor", 1200, None),
    ("2025_06_ImgAfondo-18.webp", "japon-monjes-sombrillas-rojas", 1200, None),
    ("2025_06_ImgAfondo-19.webp", "japon-monte-fuji-cerezos", 1200, None),
    ("2025_06_ImgAfondo-20.webp", "japon-castillo-himeji-cerezos", 1200, None),
    ("2025_06_ImgAfondo-56.webp", "japon-pagoda-otono", 1200, None),
    ("2025_06_ImgAfondo-58.webp", "japon-fushimi-inari-toriis", 1200, None),
    ("2025_06_ImgAfondo-59.webp", "japon-linternas-santuario", 1200, None),
    ("2025_06_ImgAfondo-60.webp", "japon-miyajima-torii-atardecer", 1200, None),
    ("2025_06_JAPON-HOME.webp", "japon-castillo-osaka-cerezos", 1200, None),
    ("2025_06_KENIA-HOME-.webp", "kenia-cebras-globo", 1200, None),
    ("2025_06_NAMIBIA-HOME-.webp", "namibia-deadvlei", 1200, None),
    ("2025_06_SUDAFRICA-HOME-.webp", "sudafrica-ciudad-del-cabo-aerea", 1200, None),
    ("2025_07_1-2.webp", "italia-venecia-gondolero-vertical", 1200, None),
    ("2025_07_2-1.webp", "rusia-porcelana-vertical", 1200, None),
    ("2025_07_3-1.webp", "rusia-moscu-kremlin-vertical", 1200, None),
    ("2025_07_4-1.webp", "islandia-cueva-de-hielo-vertical", 1200, None),
    ("2025_07_5-1.webp", "alpes-montanas-nevadas-vertical", 1200, None),
    ("2025_07_6-1.webp", "dubai-burj-khalifa-vertical", 1200, None),
    ("2025_07_7-1.webp", "japon-cerezos-templo-vertical", 1200, None),
    ("2025_07_8-1.webp", "arabia-saudita-torre-vertical", 1200, None),
    ("2025_07_ARABIA.webp", "arabia-saudita-hegra-via-lactea", 1200, None),
    ("2025_07_India.webp", "india-taj-mahal-amanecer", 1200, None),
    ("2025_07_Italia.webp", "italia-dolomitas-atardecer", 1200, None),
    ("2025_07_Japon-Cerezos.webp", "japon-castillo-osaka-rosa", 1200, None),
    ("2025_07_Japon-otono.webp", "japon-miyajima-otono", 1200, None),
    ("2025_07_Namibia.webp", "namibia-deadvlei-cielo", 1200, None),
    ("2025_07_Uganda.webp", "uganda-gorila", 1200, None),
    ("2025_07_oman-1.webp", "oman-desierto-viajero", 1200, None),
    ("2025_08_Banner-Nosotros-1.webp", "grecia-atenas-acropolis", 1400, None),
    ("2025_08_David-C.webp", "equipo-david-calvete-orrego", 600, None),
    ("2025_08_Eduardo.webp", "fundadores-eduardo-calvete-gloria-orrego", 600, None),
    ("2025_08_Juan-M.webp", "equipo-juan-manuel-calvete-orrego", 600, None),
    ("2025_08_Lucio-C.webp", "equipo-lucio-calvete-navarro", 600, None),
    ("2025_08_Varinia-C.webp", "equipo-varinia-calvete-orrego", 600, None),
    ("2025_11_KENIA-1.jpg", "kenia-safari-jeep-atardecer", 2000, None),
    ("2025_11_zebra-dashing-through-water-amidst-a-wildebeest-mi-2025-04-04-14-07-19-utc.jpg", "kenia-cebra-migracion-rio", 2000, None),
    ("2025_11_zebras-at-the-serengeti-national-park-tanzania-a-2024-09-27-06-26-39-utc.jpg", "tanzania-serengeti-cebras", 2000, None),
    ("2026_01_FOTO-1_BL1-.png", "viajera-dunas-atardecer", 1800, None),
    ("2026_02_patas-monkey-erythrocebus-patas-old-world-monk-2026-01-09-08-06-42-utc.jpg", "uganda-mono-patas", 2000, None),
    ("2026_03_1561f847-8bc5-4c34-b991-7ead33c15862.jpg", "kenia-jeep-safari-cebras", 1600, None),
    ("2026_03_BL-KENIA.png", "kenia-cebras-rayos-de-sol", 2000, None),
    ("2026_03_FOTO-EN-NIEVE.png", "italia-nieve-grupo-motos", 1920, None),
    ("2026_03_ITALIA-BAN-INT.png", "italia-valle-de-aosta-nevado", 1920, None),
    ("2026_03_Untitled-design-2.png", "kenia-nus-cebras-atardecer", 1000, None),
    ("2026_03_shutterstock_1051333253.jpg", "kenia-jirafa-atardecer-safari", 2000, None),
    ("2026_03_shutterstock_2287556607-2.jpg", "kenia-elefante-kilimanjaro", 2400, None),
    ("2026_03_shutterstock_2340834055.jpg", "kenia-jirafas-acacias", 2000, None),
    ("2026_03_shutterstock_2529815797.jpg", "kenia-cachorros-de-leon", 2000, None),
    ("2026_03_shutterstock_2597617703-3.jpg", "kenia-leon-y-cachorro", 2000, None),
    ("2026_03_shutterstock_2709673809.jpg", "kenia-leon-junto-al-jeep", 2000, None),
    ("2026_03_shutterstock_2714383951-2.jpg", "kenia-leopardo-en-arbol", 2000, None),
    ("2026_03_shutterstock_2734777571.jpg", "kenia-maasai-grupo", 2000, None),
    ("2026_06_3.png", "peru-ruinas-incas", 1920, None),
    ("2026_06_4.png", "peru-lima-costa-verde", 1920, None),
    ("2026_07_8.jpeg", "egipto-templo-de-filae", 735, None),
    ("2026_07_The-Great-Sphinx-of-Giza_-Riddle-of-the-Ages.jpeg", "egipto-esfinge-de-giza", 734, None),
    ("2026_07_hieroglyphs-of-karnak-temple-2026-03-09-08-43-55-utc.jpg", "egipto-karnak-columnas", 2000, None),
    ("2026_03_JORDANIA.png", "jordania-petra", 1800, (0, 0.0, 1, 0.68)),
    ("2026_03_KENIA-1.png", "kenia-leonas", 1800, (0, 0.0, 1, 0.68)),
    ("2026_03_PERU-.png", "peru-machu-picchu-vertical", 1800, (0, 0.0, 1, 0.70)),
    ("2026_03_DUBAI.png", "dubai-palmera-aerea", 1800, (0, 0.0, 1, 0.66)),
    ("2026_03_SINGAPUR.png", "singapur-skyline-noche", 1800, (0, 0.0, 1, 0.70)),
    ("2026_03_TAILANDIA.png", "tailandia-wat-arun-noche", 1800, (0, 0.0, 1, 0.70)),
    ("2026_03_COREA.png", "corea-seul-torre-otono", 1800, (0, 0.20, 1, 0.66)),
    ("2026_03_CAPITALES-IMP.png", "hungria-budapest-parlamento", 1800, (0, 0.0, 1, 0.62)),
]

LOGOS = [
    ("2025_06_AIR-EUROPA.webp", "air-europa"),
    ("2025_06_EMIRATES.webp", "emirates"),
    ("2025_06_EZUS.webp", "ezus"),
    ("2025_06_MARRIOT.webp", "marriott"),
    ("2025_06_SMALL.webp", "small-luxury-hotels"),
    ("2025_06_TURKISH.webp", "turkish-airlines"),
]


def export(src, name, max_edge, crop):
    im = Image.open(os.path.join(SRC, src))
    im = ImageOps.exif_transpose(im).convert("RGB")
    if crop:
        w, h = im.size
        l, t, r, b = crop
        im = im.crop((int(l * w), int(t * h), int(r * w), int(b * h)))
    im.thumbnail((max_edge, max_edge), Image.LANCZOS)
    path = os.path.join(OUT, name + ".webp")
    im.save(path, "WEBP", quality=80, method=6)
    return im.size, os.path.getsize(path) // 1024


def export_logo(src, name):
    # Monochrome silhouette on transparency: alpha = ink darkness x original alpha
    im = Image.open(os.path.join(SRC, src)).convert("RGBA")
    lum = im.convert("L")
    a = im.getchannel("A")
    ink = lum.point(lambda v: 255 - v)
    alpha = Image.composite(ink, Image.new("L", im.size, 0), a)
    # stretch so the darkest ink is fully opaque
    lo, hi = alpha.getextrema()
    if hi > 0:
        alpha = alpha.point(lambda v: min(255, int(v * 255 / hi)))
    out = Image.new("RGBA", im.size, (3, 17, 36, 0))
    out.putalpha(alpha)
    path = os.path.join(OUT, "aliados", name + ".webp")
    out.save(path, "WEBP", lossless=True)
    return im.size


if __name__ == "__main__":
    for src, name, edge, crop in PHOTOS:
        print(name, *export(src, name, edge, crop))
    for src, name in LOGOS:
        print("logo", name, export_logo(src, name))
