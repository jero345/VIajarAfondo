"""Extract visible text blocks and image URLs from scraped Elementor pages."""
import re, sys, html, json, glob
from html.parser import HTMLParser

SKIP = {"script", "style", "noscript", "svg", "template"}

class P(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.out = []
        self.imgs = []
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in SKIP:
            self.skip += 1
        if tag == "img":
            src = a.get("data-src") or a.get("src") or ""
            srcset = a.get("data-srcset") or a.get("srcset") or ""
            self.imgs.append({"src": src, "srcset": srcset, "alt": a.get("alt", "")})
            self.out.append(f"[IMG {src} alt={a.get('alt','')}]")
        if tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self.out.append(f"\n<{tag}>")
        if tag in ("p", "li", "br", "div"):
            self.out.append("\n")
        style = a.get("style", "")
        m = re.search(r"url\(['\"]?([^'\")]+)", style)
        if m:
            self.imgs.append({"src": m.group(1), "srcset": "", "alt": "bg"})
            self.out.append(f"[BG {m.group(1)}]")
        if tag == "a" and a.get("href", "").startswith(("https://wa.me", "https://api.whatsapp", "tel:", "mailto:")):
            self.out.append(f"[LINK {a['href']}]")

    def handle_endtag(self, tag):
        if tag in SKIP:
            self.skip = max(0, self.skip - 1)

    def handle_data(self, d):
        if self.skip:
            return
        t = d.strip()
        if t:
            self.out.append(t + " ")


def run(path):
    raw = open(path, encoding="utf-8", errors="ignore").read()
    # Elementor background images live in inline <style> blocks too
    bgs = re.findall(r"background-image:url\(\"?([^\")]+)", raw)
    p = P()
    p.feed(raw)
    text = "".join(p.out)
    text = re.sub(r"\n\s*\n+", "\n", text)
    return text, p.imgs, bgs


if __name__ == "__main__":
    for f in sys.argv[1:]:
        text, imgs, bgs = run(f)
        name = f.rsplit(".", 1)[0]
        open(name + ".txt", "w", encoding="utf-8").write(text)
        json.dump({"imgs": imgs, "bgs": bgs}, open(name + ".imgs.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(f, len(text), len(imgs), len(bgs))
