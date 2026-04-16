import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Perú Frost S.A.C. | Exportación de Pota y Productos del Mar",
  description: "Empresa 100% peruana con 20+ años de experiencia en elaboración y exportación de productos hidrobiológicos congelados. Certificada BRCGS AA, MSC, FDA y DG SANTE. Planta en Paita, Piura.",
  keywords: "exportación pota perú, calamar gigante, dosidicus gigas, exportación hidrobiológicos, peru frost, paita piura, BRCGS, MSC",
  openGraph: {
    title: "Perú Frost S.A.C. | Exportación de Pota y Productos del Mar",
    description: "20+ años protegiendo la inversión de nuestros clientes. Exportamos a +20 países.",
    url: "https://perufrost.com",
    siteName: "Perú Frost S.A.C.",
    locale: "es_PE",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org", "@type": "Organization",
              "name": "Perú Frost S.A.C.", "url": "https://perufrost.com",
              "description": "Empresa 100% peruana con más de 20 años de experiencia en exportación de productos hidrobiológicos congelados.",
              "address": { "@type": "PostalAddress", "streetAddress": "Av. Manuel Olguín Nº 501 – Of. 901/902", "addressLocality": "Santiago de Surco, Lima", "addressCountry": "PE" },
              "contactPoint": { "@type": "ContactPoint", "email": "mk@perufrost.com", "telephone": "+51073211412", "contactType": "sales" }
            })
          }}
        />
      </head>
      <body className="bg-base text-frost antialiased">
        <LanguageProvider>
          <ScrollProgress />
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

