"""Compare the top-left of the first glyph run of each text block against the mockup PDF span (x0, y0)."""
import asyncio, json, sys
from playwright.async_api import async_playwright
URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100/"
# (label, text that starts the block in the page, mockup x0, mockup y0)
TARGETS = [
 ("nav VIAJES A LA MEDIDA|.hdr", "Viajes a la medida", 566, 58),
 ("header cta|.hdr__cta", "Empieza a planear tu viaje", 1564, 60),
 ("hero line1", "DESCUBRE ÁFRICA EN", 416, 359),
 ("hero line2", "SU ESTADO MÁS SALVAJE.", 332, 500),
 ("hero cta", "Déjanos asesorarte", 850, 713),
 ("dest title", "¿Qué lugar sueñas", 564, 1024),
 ("dest title 2", "con descubrir?", 646, 1127),
 ("dest lead", "Hagamos de ese destino", 140, 1300),
 ("chip ofertas|.dest", "Ofertas", 1439, 1328),
 ("card EGIPTO|.carousel", "Egipto", 182, 1465),
 ("card label", "Viaje grupal", 264, 1667),
 ("card group", "Grupo", 173, 1844),
 ("card dates", "10–21 de", 423, 1861),
 ("mundo title", "El mundo", 106, 2139),
 ("mundo kicker", "Hay lugares que despiertan", 107, 2478),
 ("mundo body", "En AFondo diseñamos", 106, 2551),
 ("mundo cta", "Planea tu viaje con nosotros", 114, 2786),
 ("vivir title", "¿Cómo quieres vivir este viaje?", 333, 3086),
 ("vivir lead", "Descubre experiencias", 568, 3228),
 ("tab grupales|.tabs", "Grupales", 224, 3421),
 ("tab a la medida|.tabs", "A la medida", 660, 3421),
 ("tab familiar", "Familiar", 1213, 3421),
 ("tab pareja", "Pareja", 1618, 3421),
 ("panel title", "Comparte el", 169, 3690),
 ("panel p1", "Hay experiencias que se disfrutan", 169, 3956),
 ("panel p2", "En AFondo cuidamos cada detalle", 169, 4047),
 ("historia label|.historia", "Nuestra historia", 123, 4379),
 ("historia title", "Porque viajar no es pasar por", 123, 4497),
 ("historia p1", "Más que una agencia de viajes", 123, 4765),
 ("historia chapter", "Capítulo 01", 123, 5018),
 ("historia p2", "La historia de AFondo, como todo viaje", 123, 5083),
 ("historia more|.historia", "Ver más", 185, 5322),
 ("porque kicker", "La curiosidad", 122, 5532),
 ("porque title", "¿Por qué", 115, 5648),
 ("porque body", "Porque un gran viaje nace", 108, 6000),
 ("porque item1", "Somos Travel Coach", 1038, 5531),
 ("porque item2 title", "Trayectoria IATA", 1038, 5588),
 ("proximos title", "Próximos destinos", 76, 6428),
 ("proximos explorar", "Explorar", 1697, 6474),
 ("place india", "India", 216, 6953),
]
JS = r"""(targets) => {
  const out = [];
  const walker = () => document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (const [labelScope, text, mx, my] of targets) {
    const [label, scope] = labelScope.split('|');
    const root = scope ? document.querySelector(scope) : document.body;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n, found = null;
    while ((n = w.nextNode())) {
      const v = n.nodeValue.replace(/\s+/g, ' ').trim();
      if (!v) continue;
      const el = n.parentElement; const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || el.closest('[aria-hidden="true"]')) continue;
      const shown = cs.textTransform === 'uppercase' ? v.toUpperCase() : v;
      const want = text.toUpperCase();
      if (shown.toUpperCase().startsWith(want.slice(0, Math.min(want.length, 12)))) { found = n; break; }
    }
    if (!found) {
      // Split headings: match the element's whole text, then take its first glyph.
      const want = text.toUpperCase().replace(/\s+/g, ' ');
      const el = [...root.querySelectorAll('h1,h2,h3,p')].find(e => !e.closest('[aria-hidden="true"]') && e.textContent.replace(/\s+/g, ' ').trim().toUpperCase().startsWith(want));
      if (el) { const w2 = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let t; while ((t = w2.nextNode())) { if (t.nodeValue.trim()) { found = t; break; } } }
    }
    if (!found) { out.push([label, 'NOT FOUND']); continue; }
    const idx = found.nodeValue.search(/\S/);
    const r = document.createRange(); r.setStart(found, idx); r.setEnd(found, idx + 1);
    const b = r.getBoundingClientRect();
    out.push([label, Math.round(b.left + scrollX), Math.round(b.top + scrollY), mx, my, Math.round(b.left + scrollX - mx), Math.round(b.top + scrollY - my)]);
  }
  return out;
}"""
BOXES = [
 ("hero section", ".hero", 0, 0, 1920, 937),
 ("hero cta box", ".hero__slide.is-active .hero__cta", 835, 703, 249, 40),
 ("chip VER MAS box", ".chip--solid", 1703, 1323, 100, 33),
 ("first trip card", ".carousel__track > a:nth-child(5)", 140, 1441, 375, 474),
 ("carousel dots", ".carousel__dots", 0, 1993, 0, 24),
 ("mundo section", ".mundo", 0, 2083, 1920, 820),
 ("mundo cta box", ".mundo__cta", 107, 2770, 245, 43),
 ("tab underline (active)", ".tab[aria-selected=true]", 0, 3474, 0, 0),
 ("vivir panel", ".panel", 123, 3529, 1673, 680),
 ("gaviota", ".historia__bird", 1565, 4397, 235, 122),
 ("familia photo", ".historia__photo", 1004, 4771, 793, 577),
 ("historia more box", ".historia__more", 124, 5311, 223, 43),
 ("porque section", ".porque", 0, 5431, 1920, 819),
 ("porque first rule", ".porque__item", 1033, 5633, 887, 0),
 ("place india media", ".place__media", 46, 6622, 431, 293),
]
BOXJS = r"""(boxes) => boxes.map(([label, sel, mx, my, mw, mh]) => {
  const e = document.querySelector(sel); if (!e) return [label, 'NOT FOUND'];
  const r = e.getBoundingClientRect();
  return [label, Math.round(r.left + scrollX), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height), mx, my, mw, mh, Math.round(r.left + scrollX - mx), Math.round(r.top + scrollY - my)];
})"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="C:/Users/User/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe")
        pg = await b.new_page(viewport={"width": 1920, "height": 1080})
        await pg.emulate_media(reduced_motion="reduce")
        await pg.goto(URL, wait_until="networkidle"); await pg.wait_for_timeout(800)
        hdr = await pg.evaluate("(() => { const n = document.querySelector('.hdr__cta a').firstChild; const r = document.createRange(); r.setStart(n,0); r.setEnd(n,1); const b = r.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.top)]; })()")
        print("header cta text at", hdr, "mockup (1564, 60)")
        # Let every scroll-reveal finish so elements sit at their final position before measuring.
        h = await pg.evaluate("document.documentElement.scrollHeight")
        for y in range(0, h, 400):
            await pg.evaluate(f"window.scrollTo(0, {y})"); await pg.wait_for_timeout(120)
        await pg.wait_for_timeout(1200)
        res = await pg.evaluate(JS, TARGETS)
        print(f"{'element':24} {'x':>6} {'y':>6} {'mx':>6} {'my':>6} {'dx':>5} {'dy':>5}")
        for r in res:
            print(f"{r[0]:24} " + " ".join(f"{v:>6}" if isinstance(v, int) else str(v) for v in r[1:]))
        print()
        print(f"{'box':24} {'x':>6} {'y':>6} {'w':>6} {'h':>6} {'mx':>6} {'my':>6} {'mw':>6} {'mh':>6} {'dx':>5} {'dy':>5}")
        for r in await pg.evaluate(BOXJS, BOXES):
            print(f"{r[0]:24} " + " ".join(f"{v:>6}" if isinstance(v, int) else str(v) for v in r[1:]))
        await b.close()
asyncio.run(main())
