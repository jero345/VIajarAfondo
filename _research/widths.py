import asyncio
from playwright.async_api import async_playwright
from PIL import Image
Image.MAX_IMAGE_PIXELS=None
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="C:/Users/User/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe")
        for w, h in [(390, 844), (768, 1024), (1024, 768), (1440, 900)]:
            ctx = await b.new_context(viewport={"width": w, "height": h}, is_mobile=w < 800, has_touch=w < 800)
            pg = await ctx.new_page(); await pg.emulate_media(reduced_motion="reduce")
            errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto("http://localhost:3100/", wait_until="networkidle")
            H = await pg.evaluate("document.documentElement.scrollHeight")
            for y in range(0, H, 500):
                await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(80)
            await pg.evaluate("window.scrollTo(0,0)"); await pg.wait_for_timeout(900)
            overflow = await pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
            await pg.screenshot(path=f"shots/v2m/w{w}.png", full_page=True)
            print(w, "height", H, "horizontal overflow", overflow, "errors", errs[:3])
            await ctx.close()
        await b.close()
asyncio.run(main())
