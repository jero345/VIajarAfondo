import asyncio, sys
from playwright.async_api import async_playwright
url = sys.argv[1]; out = sys.argv[2]; width = int(sys.argv[3]) if len(sys.argv) > 3 else 1920
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="C:/Users/User/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe")
        ctx = await b.new_context(viewport={"width": width, "height": 1080}, device_scale_factor=1)
        pg = await ctx.new_page()
        await pg.emulate_media(reduced_motion="reduce")
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        await pg.goto(url, wait_until="networkidle")
        await pg.wait_for_timeout(1500)
        h = await pg.evaluate("document.documentElement.scrollHeight")
        y = 0
        while y < h:
            await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(200); y += 500
        await pg.evaluate("window.scrollTo(0,0)"); await pg.wait_for_timeout(1200)
        # freeze hero autoplay effects for a stable capture
        await pg.screenshot(path=out, full_page=True)
        print("height", h, "errors", errs[:5])
        await b.close()
asyncio.run(main())
