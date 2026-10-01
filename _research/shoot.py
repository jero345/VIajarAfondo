"""Full-page screenshots of a URL at desktop and mobile widths.

usage: python shoot.py <url> <outprefix> [--full] [--wait ms]
"""
import sys, asyncio
from playwright.async_api import async_playwright

url, prefix = sys.argv[1], sys.argv[2]
full = "--full" in sys.argv
wait = int(sys.argv[sys.argv.index("--wait") + 1]) if "--wait" in sys.argv else 2500
only = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else None
scheme = sys.argv[sys.argv.index("--scheme") + 1] if "--scheme" in sys.argv else "light"

VIEWPORTS = {"desktop": (1440, 900, 1), "mobile": (390, 844, 3)}


async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="C:/Users/User/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe")
        for name, (w, h, dpr) in VIEWPORTS.items():
            if only and name != only:
                continue
            ctx = await b.new_context(
                viewport={"width": w, "height": h},
                device_scale_factor=1 if (name == "desktop" or full) else 2,
                is_mobile=name == "mobile",
                has_touch=name == "mobile",
                color_scheme=scheme,
                locale="es-CO",
                user_agent=(
                    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
                    if name == "mobile"
                    else "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36"
                ),
            )
            page = await ctx.new_page()
            await page.emulate_media(reduced_motion='reduce')
            errors = []
            page.on("console", lambda m: errors.append(f"{m.type}: {m.text}") if m.type in ("error",) else None)
            page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
            try:
                await page.goto(url, wait_until="networkidle", timeout=60000)
            except Exception as e:
                print("goto warn", e)
            await page.wait_for_timeout(wait)
            if full:
                # scroll through the page so lazy images and in-view reveals fire
                height = await page.evaluate("document.documentElement.scrollHeight")
                y = 0
                while y < height:
                    await page.evaluate(f"window.scrollTo(0, {y})")
                    await page.wait_for_timeout(250)
                    y += h // 2
                    height = await page.evaluate("document.documentElement.scrollHeight")
                await page.evaluate("window.scrollTo(0, 0)")
                await page.wait_for_timeout(800)
            await page.screenshot(path=f"{prefix}_{name}.png", full_page=full)
            print(name, "ok", await page.evaluate("document.documentElement.scrollHeight"))
            for e in errors[:15]:
                print("  ", e)
            await ctx.close()
        await b.close()


asyncio.run(main())
