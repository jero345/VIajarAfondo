import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AFondo | Viajes a la medida y grupales desde 1988",
  description:
    "Agencia de viajes familiar de Medellín desde 1988. Viajes a la medida y grupales para conocer cada destino AFondo: su historia, su cultura, su mesa y su naturaleza.",
  // This is a redesign proposal; keep it out of search results so it never competes with viajarafondo.com.
  robots: { index: false, follow: false },
  openGraph: {
    title: "AFondo | Viajar AFondo, desde 1988",
    description: "Viajes a la medida y grupales para conocer el mundo AFondo.",
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f2ef" },
    { media: "(prefers-color-scheme: dark)", color: "#030b17" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="min-h-dvh bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
