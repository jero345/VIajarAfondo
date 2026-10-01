import asyncio
from playwright.async_api import async_playwright
from PIL import Image
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="C:/Users/User/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe")
        pg = await b.new_page(viewport={"width": 1440, "height": 900})
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e))); pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        await pg.goto("http://localhost:3100/", wait_until="commit")
        frames = []
        for t in [350, 900, 2200]:
            await pg.wait_for_timeout(t - (frames and [350, 900, 2200][len(frames) - 1] or 0))
            await pg.screenshot(path=f"mockup/f_hero_{t}.png"); frames.append(t)
        async def at(sel, name, waits):
            await pg.evaluate(f"document.querySelector('{sel}').scrollIntoView({{block: 'center'}})")
            prev = 0
            for w in waits:
                await pg.wait_for_timeout(w - prev); prev = w
                await pg.screenshot(path=f"mockup/f_{name}_{w}.png")
        await at("#destinos-title", "dest", [250, 1600])
        await at(".mundo", "mundo", [300, 1800])
        await at(".historia__head", "hist", [350, 2000])
        await at(".porque__list", "porque", [400, 2200])
        await at(".proximos__viewport", "prox", [1500, 4500])
        # header behaviour: scrolling down hides it, scrolling up shows it with progress line
        await pg.mouse.wheel(0, 600); await pg.wait_for_timeout(900)
        down = await pg.evaluate("getComputedStyle(document.querySelector('.hdr')).transform")
        await pg.mouse.wheel(0, -300); await pg.wait_for_timeout(900)
        up = await pg.evaluate("getComputedStyle(document.querySelector('.hdr')).transform")
        print("header transform scrolling down:", down, "| up:", up)
        x1 = await pg.evaluate("getComputedStyle(document.querySelector('.proximos__track')).transform")
        await pg.wait_for_timeout(1500)
        x2 = await pg.evaluate("getComputedStyle(document.querySelector('.proximos__track')).transform")
        print("marquee moving:", x1 != x2, x1, x2)
        print("errors:", errs)
        await b.close()
    def sheet(names, out, w=720):
        ims = [Image.open(f"mockup/{n}.png").convert("RGB").resize((w, int(900 * w / 1440))) for n in names]
        s = Image.new("RGB", (w * 2 + 10, (ims[0].height + 10) * ((len(ims) + 1) // 2)), (255, 0, 0))
        for k, im in enumerate(ims): s.paste(im, ((k % 2) * (w + 10), (k // 2) * (im.height + 10)))
        s.save(out, quality=80)
    sheet(["f_hero_350", "f_hero_900", "f_dest_250", "f_dest_1600", "f_mundo_300", "f_mundo_1800"], "mockup/frames_a.jpg")
    sheet(["f_hist_350", "f_hist_2000", "f_porque_400", "f_porque_2200", "f_prox_1500", "f_prox_4500"], "mockup/frames_b.jpg")
asyncio.run(main())
