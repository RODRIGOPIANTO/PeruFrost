import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Perú Frost S.A.C.",
    short_name: "Perú Frost",
    description:
      "Exportación de pota y productos hidrobiológicos congelados. Certificada BRCGS, MSC, FDA y DG SANTE.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0F1F",
    theme_color: "#0A0F1F",
    lang: "es-PE",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
