import asyncio
from playwright.async_api import async_playwright
from PIL import Image
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="C:/Users/User/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe")
        pg = await b.new_page(viewport={"width": 1920, "height": 1080})
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e))); pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        await pg.goto("http://localhost:3100/", wait_until="networkidle"); await pg.wait_for_timeout(800)
        # header link "Viajes a la medida" should open its tab
        await pg.click(".hdr__nav >> text=Viajes a la medida"); await pg.wait_for_timeout(1500)
        sel = await pg.evaluate("document.querySelector('.tab[aria-selected=true]').textContent")
        print("after header click, active tab:", sel, "| hash:", await pg.evaluate("location.hash"))
        shots = []
        for name in ["Grupales", "A la medida", "Familiar", "Pareja"]:
            await pg.click(f".tab >> text={name}"); await pg.wait_for_timeout(1000)
            el = await pg.query_selector(".panel")
            await el.screenshot(path=f"mockup/tab_{name.replace(' ', '_')}.png"); shots.append(f"mockup/tab_{name.replace(' ', '_')}.png")
        # keyboard nav on tabs
        await pg.focus(".tab[aria-selected=true]"); await pg.keyboard.press("ArrowRight"); await pg.wait_for_timeout(300)
        print("after ArrowRight:", await pg.evaluate("document.querySelector('.tab[aria-selected=true]').textContent"))
        # carousel next
        await pg.evaluate("document.querySelector('#destinos').scrollIntoView()"); await pg.wait_for_timeout(600)
        before = await pg.evaluate("[...document.querySelectorAll('.carousel__dots .dot')].findIndex(d => d.classList.contains('is-active'))")
        await pg.click(".carousel__arrow--next"); await pg.wait_for_timeout(900)
        await pg.click(".carousel__arrow--next"); await pg.wait_for_timeout(900)
        after = await pg.evaluate("[...document.querySelectorAll('.carousel__dots .dot')].findIndex(d => d.classList.contains('is-active'))")
        await pg.click(".carousel__arrow--prev"); await pg.wait_for_timeout(900)
        for _ in range(3):
            await pg.click(".carousel__arrow--prev"); await pg.wait_for_timeout(800)
        wrap = await pg.evaluate("[...document.querySelectorAll('.carousel__dots .dot')].findIndex(d => d.classList.contains('is-active'))")
        firstVisible = await pg.evaluate("(() => { const v = document.querySelector('.carousel__viewport').getBoundingClientRect(); const c = [...document.querySelectorAll('.carousel__track > a')].find(a => { const r = a.getBoundingClientRect(); return r.left >= v.left - 2 && r.left < v.left + 50; }); return c && c.querySelector('h3').textContent; })()")
        print("carousel dot before/after two nexts:", before, after, "| after 4 prevs (wraps):", wrap, "| first visible card:", firstVisible)
        await (await pg.query_selector(".carousel")).screenshot(path="mockup/carousel_after.png")
        # hamburger menu
        await pg.evaluate("window.scrollTo(0,0)"); await pg.wait_for_timeout(400)
        await pg.click(".hdr__burger"); await pg.wait_for_timeout(1000)
        await pg.screenshot(path="mockup/menu_open.png")
        await pg.keyboard.press("Escape"); await pg.wait_for_timeout(600)
        print("menu closed with Escape:", await pg.evaluate("!document.querySelector('#menu')"))
        # hero dots
        await pg.click(".hero__dots .dot >> nth=2"); await pg.wait_for_timeout(1200)
        print("hero active slide after clicking dot 3:", await pg.evaluate("document.querySelector('.hero__slide.is-active h2').textContent"))
        print("errors:", errs)
        await b.close()
    ims = [Image.open(s).convert("RGB") for s in shots]
    ims = [i.resize((836, int(i.height * 836 / i.width))) for i in ims]
    sheet = Image.new("RGB", (836 * 2 + 10, (ims[0].height + 10) * 2), (40, 40, 40))
    for k, im in enumerate(ims): sheet.paste(im, ((k % 2) * 846, (k // 2) * (ims[0].height + 10)))
    sheet.save("mockup/tabs_sheet.jpg", quality=82)
asyncio.run(main())
