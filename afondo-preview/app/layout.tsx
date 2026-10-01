import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Brand fonts from the client's mockup. Replace the files in app/fonts/ (same names) to update them.
const adelon = localFont({
  variable: "--font-adelon-face",
  display: "swap",
  fallback: ["Georgia", "serif"],
  src: [
    { path: "./fonts/AdelonSerial-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/AdelonSerial.woff2", weight: "400", style: "normal" },
    { path: "./fonts/AdelonSerial-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/AdelonSerial-Bold.woff2", weight: "700", style: "normal" },
  ],
});

const surt = localFont({
  variable: "--font-surt-face",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  src: [{ path: "./fonts/ATSurt-Light.woff2", weight: "300", style: "normal" }],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AFondo | Viajes a la medida y grupales desde 1988",
  description:
    "Agencia de viajes familiar de Medellín desde 1988. Viajes a la medida y grupales para conocer cada destino AFondo: su historia, su cultura, su mesa y su naturaleza.",
  // Redesign proposal: keep it out of search results so it never competes with viajarafondo.com.
  robots: { index: false, follow: false },
  openGraph: {
    title: "AFondo | Viajes a la medida y grupales",
    description: "Porque viajar no es pasar por un lugar, sino conocerlo AFondo.",
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#303f60",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${adelon.variable} ${surt.variable}`}>
      <body>{children}</body>
    </html>
  );
}
