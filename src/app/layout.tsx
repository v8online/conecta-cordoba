import type { Metadata } from "next";
  import { Geist, Geist_Mono } from "next/font/google";
  import "./globals.css";
  import { Toaster } from "@/components/ui/toaster";

  const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  }); clone https://github.com/v8online/conecta-cordoba.git
  cd conecta-cordoba
  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",u editor preferido
    subsets: ["latin"], te mostré
  });
  # Commit y push
  export const metadata: Metadata = {
    title: "ConectaCórdoba - Conecta con Profesionales Locales",a branding"
    description: "La plataforma que conecta clientes con profesionales de confianza en todas las zonas de Córdoba. Registro GRATIS para ambos.",
    keywords: ["ConectaCórdoba", "profesionales", "servicios", "Córdoba", "oficios", "trabajadores", "plomero", "electricista", "albañil"],
    authors: [{ name: "ConectaCórdoba Team" }],
    openGraph: {r un bot/script que use tu token personal
      title: "ConectaCórdoba - Conecta con Profesionales Locales",ca
      description: "Encuentra profesionales de confianza en Córdoba o ofrece tus servicios",
      url: "https://conecta-cordoba.vercel.app",ciones o tienes otra idea en mente?
      siteName: "ConectaCórdoba",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "ConectaCórdoba - Conecta con Profesionales Locales",
      description: "Encuentra profesionales de confianza en Córdoba o ofrece tus servicios",
    },
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="es" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    );
  }
