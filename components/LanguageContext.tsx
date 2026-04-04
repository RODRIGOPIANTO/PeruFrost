'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'es' | 'en';

const translations = {
  es: {
    'nav.home': 'Inicio', 'nav.about': 'Nosotros', 'nav.catalog': 'Catálogo',
    'nav.quality': 'Calidad', 'nav.infra': 'Infraestructura', 'nav.contact': 'Contacto',
    'nav.cta': 'Cotizar Ahora',
    'hero.tag': '🇵🇪 Empresa 100% Peruana · 20+ Años de Experiencia',
    'hero.h1a': 'Perú Frost:', 'hero.h1b': 'Protegemos la', 'hero.h1c': 'inversión de',
    'hero.h1d': 'nuestros clientes',
    'hero.sub': 'Procesamos y exportamos productos hidrobiológicos congelados con los más altos estándares de calidad, inocuidad y sostenibilidad hacia más de',
    'hero.countries': '56 países', 'hero.btn1': 'Ver Catálogo', 'hero.btn2': 'Cotizar Ahora',
    'hero.scroll': 'Descubrir',
    'stats.years': 'Años de experiencia', 'stats.years.sub': 'En la industria pesquera',
    'stats.countries': 'Países de destino', 'stats.countries.sub': 'Exportación global',
    'stats.capacity': 'Capacidad frigorífica', 'stats.capacity.sub': 'Almacenamiento a -25°C',
    'stats.clients': 'Clientes globales', 'stats.clients.sub': 'En todo el mundo',
    'quality.tag': 'Trazabilidad Total', 'quality.h2a': 'Exigimos los mismos',
    'quality.h2b': 'estándares', 'quality.h2c': 'que ofrecemos',
    'quality.body': 'Exigimos a nuestros proveedores los mismos permisos de calidad y trazabilidad que ofrecemos a nuestros clientes. Cada producto tiene historia verificable desde la captura hasta el contenedor.',
    'quality.btn': 'Ver Certificaciones',
    'cold.tag': 'Cadena de Frío', 'cold.h2a': 'Temperatura garantizada',
    'cold.body': 'Mantenemos la cadena de frío sin interrupción desde la captura hasta la entrega, garantizando la máxima inocuidad y calidad organoléptica.',
    'products.tag': 'Portafolio de Productos', 'products.h2a': 'Productos a',
    'products.h2b': 'su medida',
    'products.body': 'Tamaños, cortes y especificaciones exactas según sus requerimientos. Producimos bajo los estándares internacionales de los mercados más exigentes.',
    'products.sheet': 'Ficha técnica completa', 'products.all': 'Ver Catálogo Completo',
    'globe.tag': 'Red de Exportación Global', 'globe.h3a': 'Llevamos Perú al',
    'globe.h3b': 'mundo entero',
    'globe.body': 'Desde nuestra planta en Paita, Piura, exportamos productos de alta calidad a más de',
    'globe.countries': '56 países', 'globe.in': 'en todos los continentes.',
    'globe.click': '↑ Haz clic en una región del mapa o en las tarjetas para ver los países de destino',
    'globe.active': 'Mercado de destino activo',
    'certs.tag': 'Aval Internacional', 'certs.h2a': 'Certificaciones que',
    'certs.h2b': 'garantizan', 'certs.h2c': 'la calidad',
    'certs.btn': 'Ver detalle de certificaciones',
    'cta.tag': 'Personalización Total', 'cta.h2': 'Productos a su medida',
    'cta.body': 'Tamaños, cortes y especificaciones exactas según sus requerimientos. Trabajamos con usted para garantizar que cada lote cumpla exactamente con lo que su mercado demanda.',
    'cta.btn1': 'Solicitar Cotización', 'cta.btn2': 'Ver Infraestructura',
    'footer.desc': 'Empresa 100% peruana con más de 20 años protegiendo la inversión de nuestros clientes en la industria pesquera global.',
    'footer.nav': 'Navegación', 'footer.legal': 'Legal & Ética', 'footer.contact': 'Contacto',
    'footer.email.label': 'Email Comercial', 'footer.phone.label': 'Teléfono',
    'footer.lima.label': 'Oficina Lima', 'footer.paita.label': 'Planta Paita',
    'footer.copy': '© 2026 Perú Frost S.A.C. — RUC 20607856517. Todos los derechos reservados.',
    'footer.cert': 'Planta certificada',
  },
  en: {
    'nav.home': 'Home', 'nav.about': 'About Us', 'nav.catalog': 'Catalog',
    'nav.quality': 'Quality', 'nav.infra': 'Infrastructure', 'nav.contact': 'Contact',
    'nav.cta': 'Get a Quote',
    'hero.tag': '🇵🇪 100% Peruvian Company · 20+ Years of Experience',
    'hero.h1a': 'Perú Frost:', 'hero.h1b': 'We protect our', 'hero.h1c': "clients'",
    'hero.h1d': 'investment',
    'hero.sub': 'We process and export frozen fishery products with the highest standards of quality, food safety and sustainability to more than',
    'hero.countries': '56 countries', 'hero.btn1': 'View Catalog', 'hero.btn2': 'Get a Quote',
    'hero.scroll': 'Discover',
    'stats.years': 'Years of experience', 'stats.years.sub': 'In the fishing industry',
    'stats.countries': 'Destination countries', 'stats.countries.sub': 'Global exports',
    'stats.capacity': 'Cold storage capacity', 'stats.capacity.sub': 'Storage at -25°C',
    'stats.clients': 'Global clients', 'stats.clients.sub': 'Around the world',
    'quality.tag': 'Full Traceability', 'quality.h2a': 'We demand the same',
    'quality.h2b': 'standards', 'quality.h2c': 'we deliver',
    'quality.body': 'We require our suppliers to meet the same quality and traceability standards we offer our clients. Every product leaving our Paita plant has a verifiable history from catch to container.',
    'quality.btn': 'View Certifications',
    'cold.tag': 'Cold Chain', 'cold.h2a': 'Guaranteed temperature',
    'cold.body': 'We maintain an uninterrupted cold chain from catch to delivery, ensuring maximum food safety and organoleptic quality.',
    'products.tag': 'Product Portfolio', 'products.h2a': 'Products',
    'products.h2b': 'tailored to you',
    'products.body': 'Exact sizes, cuts and specifications per your requirements. We produce under the international standards of the most demanding markets.',
    'products.sheet': 'Full technical sheet', 'products.all': 'View Full Catalog',
    'globe.tag': 'Global Export Network', 'globe.h3a': 'We bring Peru to',
    'globe.h3b': 'the world',
    'globe.body': 'From our plant in Paita, Piura, we export high-quality products to more than',
    'globe.countries': '56 countries', 'globe.in': 'across all continents.',
    'globe.click': '↑ Click on a region or the cards to see destination countries',
    'globe.active': 'Active destination market',
    'certs.tag': 'International Endorsement', 'certs.h2a': 'Certifications that',
    'certs.h2b': 'guarantee', 'certs.h2c': 'quality',
    'certs.btn': 'View certification details',
    'cta.tag': 'Full Customization', 'cta.h2': 'Products tailored to your needs',
    'cta.body': 'Exact sizes, cuts and specifications per your requirements. We work with you to ensure every batch meets exactly what your market demands.',
    'cta.btn1': 'Request a Quote', 'cta.btn2': 'View Infrastructure',
    'footer.desc': '100% Peruvian company with over 20 years protecting our clients\' investments in the global fishing industry.',
    'footer.nav': 'Navigation', 'footer.legal': 'Legal & Ethics', 'footer.contact': 'Contact',
    'footer.email.label': 'Commercial Email', 'footer.phone.label': 'Phone',
    'footer.lima.label': 'Lima Office', 'footer.paita.label': 'Paita Plant',
    'footer.copy': '© 2026 Perú Frost S.A.C. — RUC 20607856517. All rights reserved.',
    'footer.cert': 'Certified plant',
  },
};

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; }
const Ctx = createContext<LangCtx>({ lang: 'es', setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es');
  const t = (key: string): string => (translations[lang] as Record<string, string>)[key] || key;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
