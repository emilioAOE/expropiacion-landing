import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "¿Te Están Expropiando? | Abogado Expropiación Chile | Evaluación Gratis",
  description:
    "Abogados especialistas en expropiación de propiedades en Chile. Defiende tu derecho a una justa indemnización bajo el Decreto Ley 2186. Evaluación gratuita de tu caso en 24 horas.",
  keywords: [
    "abogado expropiación chile",
    "expropiación de propiedades chile",
    "indemnización por expropiación",
    "reclamar expropiación chile",
    "decreto ley 2186",
    "justa indemnización expropiación",
    "defensa propiedad expropiación",
    "abogado defensa propiedad chile",
    "expropiación terreno chile",
    "me van a expropiar mi casa",
    "plazo reclamar expropiación",
    "servidumbre expropiación chile",
  ],
  openGraph: {
    title: "¿Te Están Expropiando? | Abogado Expropiación Chile",
    description:
      "Abogados especialistas en defensa ante expropiación. Protege tu propiedad y obtén una justa indemnización. Evaluación gratuita.",
    type: "website",
    locale: "es_CL",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
