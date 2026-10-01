import asyncio, json, base64
from playwright.async_api import async_playwright
F = "fonts/"
samples = [
 ("AdelonSerial-Light", 119.01, "DESCUBRE ÁFRICA EN", 1088),
 ("AdelonSerial-Light", 119.01, "SU ESTADO MÁS SALVAJE.", 1256),
 ("AdelonSerial-Light", 82.48, "¿QUÉ LUGAR SUEÑAS", 792),
 ("AdelonSerial-Light", 82.48, "PRÓXIMOS DESTINOS", 758),
 ("AdelonSerial-Light", 91.33, "TIENE MÁS QUE ", 674),
 ("AdelonSerial-Light", 19.06, "VER POR FECHAS", 135),
 ("AdelonSerial-Medium", 83.34, "EGIPTO", 291),
 ("AdelonSerial-Medium", 75.31, "AFONDO", 296),
 ("AdelonSerial", 26.73, "Más que una agencia de viajes, somos un estilo de vida activo e ", 651),
 ("AdelonSerial-Bold", 26.73, "CHAPTER 01", 150),
 ("AdelonSerial-Bold", 22.48, "NOS LLEVA. AFONDO NOS ", 278),
 ("ATSurt-Light", 13.76, "VIAJES A LA MEDIDA", 158),
 ("ATSurt-Light", 11.63, "EMPIEZA A PLANEAR TU VIAJE", 198),
 ("ATSurt-Light", 17.12, "DÉJANOS ASESORARTE", 220),
 ("ATSurt-Light", 28.68, "tu próximo gran viaje.", 317),
 ("ATSurt-Light", 15.98, "VIAJE GRUPAL", 127),
 ("ATSurt-Light", 14.19, "MAYO DE 2027", 118),
 ("ATSurt-Light", 18.57, "Hay lugares que despiertan tu curiosidad y ", 398),
 ("ATSurt-Light", 26.88, "En A fondo diseñamos viajes para descubrir la ", 609),
 ("ATSurt-Light", 12.12, "PLANEA TU VIAJE CON NOSOTROS", 229),
 ("ATSurt-Light", 32.74, "en familia o en grupo.", 338),
 ("ATSurt-Light", 26.22, "A LA MEDIDA", 180),
 ("ATSurt-Light", 18.88, "Hay experiencias que se disfrutan aún más cuando se comparten. ", 601),
 ("ATSurt-Light", 32.62, "NUESTRA HISTORIA", 348),
 ("ATSurt-Light", 20.57, "VER MÁS", 101),
 ("ATSurt-Light", 21.22, "Somos Travel Coach", 211),
 ("ATSurt-Light", 22.6, "Porque un gran viaje nace de entender qué te mueve. ", 580),
 ("ATSurt-Light", 32.39, "EXPLORAR", 194),
 ("ATSurt-Light", 32.39, "PERÚ EN TREN", 267),
]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="C:/Users/User/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe")
        pg = await b.new_page()
        faces = {name: base64.b64encode(open(F + name + ".otf", "rb").read()).decode() for name in set(s[0] for s in samples)}
        await pg.set_content("<html><body></body></html>")
        res = await pg.evaluate("""async ([faces, samples]) => {
          for (const [n, b64] of Object.entries(faces)) { const f = new FontFace(n, `url(data:font/otf;base64,${b64})`); await f.load(); document.fonts.add(f); }
          const c = document.createElement('canvas').getContext('2d');
          return samples.map(([font, size, text, target]) => { c.font = `${size}px "${font}"`; const w = c.measureText(text).width; return [font, size, text, target, Math.round(w*10)/10, Math.round((target - w) / text.length * 1000) / 1000, Math.round((target - w) / text.length / size * 1000) / 1000]; });
        }""", [faces, samples])
        for r in res: print(r)
        await b.close()
asyncio.run(main())
