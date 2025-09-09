import type { Metadata } from "next";
  import { Geist, Geist_Mono } from "next/font/google";
  import "./globals.css";
  import { Toaster } from "@/components/ui/toaster";

  const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  export const metadata: Metadata = {
    title: "ConectaCórdoba - Conecta con Profesionales Locales",
    description: "La plataforma que conecta clientes con profesionales de confianza en todas las zonas de Córdoba. Registro GRATIS para ambos.",
    keywords: ["ConectaCórdoba", "profesionales", "servicios", "Córdoba", "oficios", "trabajadores", "plomero", "electricista", "albañil"],
    authors: [{ name: "ConectaCórdoba Team" }],
    openGraph: {
      title: "ConectaCórdoba - Conecta con Profesionales Locales",
      description: "Encuentra profesionales de confianza en Córdoba o ofrece tus servicios",
      url: "https://conecta-cordoba.vercel.app",
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
