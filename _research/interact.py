import asyncio
from playwright.async_api import async_playwright
URL = "https://afondo-preview.vercel.app/"
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="C:/Users/User/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe")
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True, locale="es-CO")
        page = await ctx.new_page()
        errs = []
        page.on("pageerror", lambda e: errs.append(str(e)))
        page.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        await page.goto(URL, wait_until="networkidle")
        await page.wait_for_timeout(1500)
        await page.screenshot(path="shots/final/m_hero.png")
        await page.get_by_role("button", name="Menú").click()
        await page.wait_for_timeout(1200)
        await page.screenshot(path="shots/final/m_menu.png")
        await page.get_by_role("button", name="Cerrar").click()
        await page.wait_for_timeout(600)
        await page.evaluate("window.scrollTo(0, 1400)")
        await page.wait_for_timeout(1200)
        await page.screenshot(path="shots/final/m_header_solid.png")
        form = page.locator("#newsletter")
        await form.scroll_into_view_if_needed()
        await page.wait_for_timeout(900)
        await page.get_by_role("button", name="Suscribirme").click()
        await page.wait_for_timeout(500)
        await form.screenshot(path="shots/final/m_form_errors.png")
        await page.get_by_label("Nombre").fill("Mariana Restrepo")
        await page.get_by_label("Correo electrónico").fill("mariana@correo.com")
        await page.locator("input[name=autorizacion]").check()
        await page.get_by_role("button", name="Suscribirme").click()
        await page.wait_for_timeout(1800)
        await form.screenshot(path="shots/final/m_form_ok.png")
        wa = await page.eval_on_selector_all("a[href*='wa.me']", "els => [...new Set(els.map(e => decodeURIComponent(e.href)))]")
        print("whatsapp links:", len(wa)); [print("  ", w) for w in wa[:6]]
        print("errors:", errs)
        await b.close()
asyncio.run(main())
