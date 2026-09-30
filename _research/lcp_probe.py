import asyncio, json
from playwright.async_api import async_playwright
JS = """
window.__lcp = [];
new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lcp.push({t: Math.round(e.startTime), size: e.size, tag: e.element && e.element.tagName, cls: e.element && (e.element.className||'').toString().slice(0,60), url: (e.url||'').slice(-60)}); }).observe({type: 'largest-contentful-paint', buffered: true});
"""
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="C:/Users/User/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe")
        ctx = await b.new_context(viewport={"width": 412, "height": 823}, device_scale_factor=1.75, is_mobile=True, has_touch=True)
        page = await ctx.new_page()
        cdp = await ctx.new_cdp_session(page)
        await cdp.send("Emulation.setCPUThrottlingRate", {"rate": 4})
        await page.add_init_script(JS)
        await page.goto("http://localhost:3100/", wait_until="load")
        await page.wait_for_timeout(4000)
        print(json.dumps(await page.evaluate("window.__lcp"), indent=1))
        await b.close()
asyncio.run(main())
