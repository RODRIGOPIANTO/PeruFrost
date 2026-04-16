// ═══════════════════════════════════════════════════
// PERÚ FROST S.A.C. — Catálogo Oficial de Productos
// Fuente: Brochure Oficial 2026
// ═══════════════════════════════════════════════════

const STORAGE_URL = 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/'

export interface Empaque {
  tipo: string      // IQF, BLOCK, IWP, IVP, SKIN PACK, TRAY, BAGS
}

export interface Corte {
  id: string
  nombre: string
  nombreEN: string
  categoria: 'producto' | 'subproducto' | 'valorAgregado'
  empaques: string[]
  descripcion?: string
  zona?: string
  emoji?: string
}

export interface Producto {
  id: string
  nombre: string
  nombreEN: string
  nombreCientifico: string
  categoria: 'pota' | 'pez' | 'marisco'
  badge?: string
  badgeColor?: string
  zona?: string
  imagen?: string
  empaques: string[]
  mercados: string[]
  descripcion?: string
  cortes?: Corte[]
  subProductos?: Corte[]
  valorAgregado?: Corte[]
}

// ═══════════════════════════════════════════════════
// 🦑 GIANT SQUID / POTA — PRODUCTO ESTRELLA
// Dosidicus gigas — FAO 87, Pacífico Sur
// ═══════════════════════════════════════════════════
export const pota: Producto = {
  id: 'pota',
  nombre: 'Calamar Gigante / Pota',
  nombreEN: 'Giant Squid / Humboldt Squid',
  nombreCientifico: 'Dosidicus gigas',
  categoria: 'pota',
  badge: 'Producto Estrella',
  badgeColor: '#0ea5e9',
  zona: 'FAO 87 — Pacífico Sur',
  imagen: STORAGE_URL + 'calamar_real.webp',
  empaques: ['BLOCK 10kg', 'BLOCK 7kg', 'SACO 20kg', 'IQF'],
  mercados: ['China', 'España', 'Japón', 'EE.UU.', 'Corea', 'Tailandia'],
  descripcion: 'La pota peruana es nuestro producto estrella. Capturada en las ricas aguas del Pacífico Sur (FAO 87), procesada bajo estrictos estándares BRCGS Grado AA. Amplio portafolio de cortes para diferentes mercados y especificaciones.',

  cortes: [
    { id: 'filete', nombre: 'Filete', nombreEN: 'Fillet', categoria: 'producto', empaques: ['BLOCK'], descripcion: 'Manto limpio sin piel, presentación principal para mercados europeos y asiáticos', zona: 'manto', emoji: '🦑' },
    { id: 'alas', nombre: 'Alas', nombreEN: 'Wings', categoria: 'producto', empaques: ['BLOCK'], descripcion: 'Aletas laterales del manto, muy apreciadas en el mercado asiático', zona: 'alas', emoji: '🪶' },
    { id: 'tentaculos', nombre: 'Tentáculos', nombreEN: 'Tentacles', categoria: 'producto', empaques: ['BLOCK'], descripcion: 'Ocho tentáculos más dos largos, alta demanda en Asia y Europa del Sur', zona: 'tentaculos', emoji: '🐙' },
    { id: 'reproductor', nombre: 'Reproductor', nombreEN: 'Sexual Tentacle', categoria: 'producto', empaques: ['BLOCK'], descripcion: 'Tentáculos reproductores, presentación especial para mercados asiáticos', zona: 'tentaculos', emoji: '🎣' },
    { id: 'nucas', nombre: 'Nucas', nombreEN: 'Necks', categoria: 'producto', empaques: ['BLOCK'], descripcion: 'Parte superior del manto, popular en mercados de comida rápida', zona: 'manto', emoji: '✂️' },
  ],

  subProductos: [
    { id: 'membrana', nombre: 'Membrana', nombreEN: 'Membrane', categoria: 'subproducto', empaques: ['BLOCK'], emoji: '📋' },
    { id: 'membrana-cocida', nombre: 'Membrana Cocida', nombreEN: 'Boiled Membrane', categoria: 'subproducto', empaques: ['BLOCK'], emoji: '♨️' },
    { id: 'telilla', nombre: 'Telilla', nombreEN: 'Belly', categoria: 'subproducto', empaques: ['BLOCK'], emoji: '📋' },
    { id: 'telilla-cocida', nombre: 'Telilla Cocida', nombreEN: 'Boiled Belly', categoria: 'subproducto', empaques: ['BLOCK'], emoji: '♨️' },
    { id: 'pico', nombre: 'Pico', nombreEN: 'Mouth', categoria: 'subproducto', empaques: ['BLOCK'], emoji: '🦷' },
    { id: 'ventosa', nombre: 'Ventosa', nombreEN: 'Suckers', categoria: 'subproducto', empaques: ['BLOCK'], emoji: '🔵' },
    { id: 'recortes', nombre: 'Recortes', nombreEN: 'Bits & Pieces', categoria: 'subproducto', empaques: ['IQF', 'BLOCK'], emoji: '📦' },
    { id: 'recorte-precocido', nombre: 'Recorte Precocido', nombreEN: 'Boiled Bits & Pieces', categoria: 'subproducto', empaques: ['BLOCK'], emoji: '♨️' },
  ],

  valorAgregado: [
    { id: 'daruma', nombre: 'Daruma Cocida', nombreEN: 'Boiled Fillet', categoria: 'valorAgregado', empaques: ['BLOCK'], emoji: '🍣' },
    { id: 'anillas', nombre: 'Anillas', nombreEN: 'Rings', categoria: 'valorAgregado', empaques: ['BLOCK', 'IQF'], emoji: '⭕' },
    { id: 'alas-cocidas', nombre: 'Alas Cocidas', nombreEN: 'Boiled Wings', categoria: 'valorAgregado', empaques: ['BLOCK'], emoji: '♨️' },
    { id: 'labios', nombre: 'Labios', nombreEN: 'Squid Lips', categoria: 'valorAgregado', empaques: ['BLOCK'], emoji: '💋' },
    { id: 'cono', nombre: 'Cono', nombreEN: 'Squid Cone', categoria: 'valorAgregado', empaques: ['BLOCK'], emoji: '🔺' },
    { id: 'botones', nombre: 'Botones', nombreEN: 'Buttons', categoria: 'valorAgregado', empaques: ['BLOCK', 'IQF'], emoji: '🔘' },
    { id: 'rabas', nombre: 'Rabas', nombreEN: 'Squid Strips', categoria: 'valorAgregado', empaques: ['BLOCK', 'IQF'], emoji: '🍟' },
  ],
}

// ═══════════════════════════════════════════════════
// 🐟 PECES / FISH
// ═══════════════════════════════════════════════════
export const peces: Producto[] = [
  {
    id: 'merluza',
    nombre: 'Merluza Peruana',
    nombreEN: 'Peruvian Hake',
    nombreCientifico: 'Merluccius gayi',
    categoria: 'pez',
    badge: 'IQF / BLOCK / IWP',
    badgeColor: '#3b82f6',
    imagen: STORAGE_URL + 'merluza_premium.webp',
    empaques: ['IQF', 'BLOCK', 'IWP'],
    mercados: ['España', 'Francia', 'Italia', 'EE.UU.', 'Brasil'],
    descripcion: 'Capturada en las aguas peruanas con flota propia (11% de cuota nacional). Filetes, HGT y entera para los mercados más exigentes. Cadena de frío continua desde captura.',
  },
  {
    id: 'mahi-mahi',
    nombre: 'Perico / Mahi Mahi',
    nombreEN: 'Mahi Mahi / Dolphinfish',
    nombreCientifico: 'Coryphaena hippurus',
    categoria: 'pez',
    badge: 'IQF / IWP / IVP',
    badgeColor: '#f59e0b',
    imagen: STORAGE_URL + 'mahi_mahi_premium.webp',
    empaques: ['IQF', 'IWP', 'IVP'],
    mercados: ['EE.UU.', 'Alemania', 'Japón', 'Reino Unido'],
    descripcion: 'Perico peruano premium en filetes, porciones y lomos de la mejor calidad organoléptica. Altamente valorado en mercados premium de Europa y EE.UU.',
  },
  {
    id: 'pejerrey',
    nombre: 'Pejerrey',
    nombreEN: 'Silverside',
    nombreCientifico: 'Odontesthes regia regia',
    categoria: 'pez',
    badge: 'IQF / BLOCK',
    badgeColor: '#6366f1',
    imagen: STORAGE_URL + 'merluza_premium.webp',
    empaques: ['IQF', 'BLOCK'],
    mercados: ['Chile', 'Argentina', 'Brasil'],
    descripcion: 'Pejerrey peruano procesado en IQF y bloque. Presentación entera o en filetes según especificación del cliente.',
  },
  {
    id: 'bonito',
    nombre: 'Bonito',
    nombreEN: 'Bonito',
    nombreCientifico: 'Sarda chiliensis',
    categoria: 'pez',
    badge: 'BLOCK / IQF',
    badgeColor: '#ef4444',
    imagen: STORAGE_URL + 'mahi_mahi_premium.webp',
    empaques: ['BLOCK', 'IQF'],
    mercados: ['España', 'Italia', 'Colombia'],
    descripcion: 'Bonito del Pacífico peruano, ideal para conservas y filetes marinados. Procesado en planta propia bajo normas HACCP.',
  },
  {
    id: 'anchoveta',
    nombre: 'Anchoveta',
    nombreEN: 'Anchovy',
    nombreCientifico: 'Engraulis ringens',
    categoria: 'pez',
    badge: 'BLOCK / IQF',
    badgeColor: '#10b981',
    imagen: STORAGE_URL + 'merluza_premium.webp',
    empaques: ['BLOCK', 'IQF'],
    mercados: ['España', 'Portugal', 'Italia'],
    descripcion: 'Anchoveta peruana, base de la cocina mediterránea. Procesada entera o en filetes, ideal para conservas de alta calidad.',
  },
  {
    id: 'jurel',
    nombre: 'Jurel',
    nombreEN: 'Horse Mackerel',
    nombreCientifico: 'Trachurus murphyi',
    categoria: 'pez',
    badge: 'BLOCK / IQF',
    badgeColor: '#8b5cf6',
    imagen: STORAGE_URL + 'mahi_mahi_premium.webp',
    empaques: ['BLOCK', 'IQF'],
    mercados: ['China', 'Rusia', 'Alemania'],
    descripcion: 'Jurel del Pacífico Sur peruano, ideal para mercados asiáticos y europeos. Presentación entera o HGT.',
  },
  {
    id: 'caballa',
    nombre: 'Caballa',
    nombreEN: 'Mackerel',
    nombreCientifico: 'Scomber japonicus',
    categoria: 'pez',
    badge: 'BLOCK / IQF',
    badgeColor: '#0ea5e9',
    imagen: STORAGE_URL + 'mahi_mahi_premium.webp',
    empaques: ['BLOCK', 'IQF'],
    mercados: ['Japón', 'Corea', 'China', 'España'],
    descripcion: 'Caballa peruana de alto valor nutricional, rica en Omega-3. Exportada entera o en filetes para mercados en Asia y Europa.',
  },
  {
    id: 'chiri',
    nombre: 'Chiri',
    nombreEN: 'Pacific Butterfish',
    nombreCientifico: 'Peprilus medius',
    categoria: 'pez',
    badge: 'BLOCK / IQF',
    badgeColor: '#f97316',
    imagen: STORAGE_URL + 'merluza_premium.webp',
    empaques: ['BLOCK', 'IQF'],
    mercados: ['China', 'Tailandia', 'Vietnam'],
    descripcion: 'Chiri del Pacífico, especie de alto valor en mercados asiáticos. Carne suave y de fácil fileteo.',
  },
]

// ═══════════════════════════════════════════════════
// 🦐 MARISCOS Y CEFALÓPODOS / SHELLFISH & CEPHALOPODS
// ═══════════════════════════════════════════════════
export const mariscos: Producto[] = [
  {
    id: 'pulpo',
    nombre: 'Pulpo',
    nombreEN: 'Octopus',
    nombreCientifico: 'Octopus spp.',
    categoria: 'marisco',
    badge: 'BLOCK / SKIN PACK / TRAY',
    badgeColor: '#ec4899',
    imagen: STORAGE_URL + 'pulpo_premium.webp',
    empaques: ['BLOCK', 'SKIN PACK', 'TRAY', 'BAGS'],
    mercados: ['España', 'Italia', 'Portugal', 'Japón'],
    descripcion: 'Pulpo peruano de alta calidad, procesado en diversas presentaciones para el mercado gourmet europeo y asiático. Skin pack y tray pack para retail premium.',
  },
  {
    id: 'langostino-californicus',
    nombre: 'Langostino Californiensis',
    nombreEN: 'California Brown Shrimp',
    nombreCientifico: 'Farfantepenaeus californiensis',
    categoria: 'marisco',
    badge: 'BLOCK / IQF',
    badgeColor: '#f59e0b',
    imagen: STORAGE_URL + 'langostino_premium.webp',
    empaques: ['BLOCK', 'IQF'],
    mercados: ['EE.UU.', 'España', 'Japón'],
    descripcion: 'Langostino californiensis del Pacífico peruano, de carne firme y sabor pronunciado. Procesado entero o pelado según especificación.',
  },
  {
    id: 'langostino-blanco',
    nombre: 'Langostino Blanco',
    nombreEN: 'White Shrimp',
    nombreCientifico: 'Litopenaeus vannamei',
    categoria: 'marisco',
    badge: 'BLOCK / IQF',
    badgeColor: '#06b6d4',
    imagen: STORAGE_URL + 'langostino_premium.webp',
    empaques: ['BLOCK', 'IQF'],
    mercados: ['EE.UU.', 'China', 'Japón', 'Europa'],
    descripcion: 'Camarón blanco de alta producción, carne suave y sabor delicado. Preferido para mercados de retail en todo el mundo.',
  },
  {
    id: 'gambon-argentino',
    nombre: 'Gambón Argentino',
    nombreEN: 'Argentine Red Shrimp',
    nombreCientifico: 'Pleoticus muelleri',
    categoria: 'marisco',
    badge: 'BLOCK / IQF',
    badgeColor: '#ef4444',
    imagen: STORAGE_URL + 'langostino_premium.webp',
    empaques: ['BLOCK', 'IQF'],
    mercados: ['España', 'Italia', 'Francia', 'EE.UU.'],
    descripcion: 'Gambón argentino de color rojo intenso natural, sabor premium. Muy apreciado en mercados gourmet europeos y americanos. Sin colorantes.',
  },
  {
    id: 'concha-abanico',
    nombre: 'Concha de Abanico',
    nombreEN: 'Scallop',
    nombreCientifico: 'Argopecten purpuratus',
    categoria: 'marisco',
    badge: 'IQF',
    badgeColor: '#a855f7',
    imagen: STORAGE_URL + 'concha_premium.webp',
    empaques: ['IQF'],
    mercados: ['Francia', 'Japón', 'EE.UU.', 'Bélgica'],
    descripcion: 'Concha de abanico peruana, considera entre las mejores del mundo. Criada en las frías aguas de Tumbes y Ancash, con exclusivo programa de trazabilidad.',
  },
  {
    id: 'calamar',
    nombre: 'Calamar',
    nombreEN: 'Squid',
    nombreCientifico: 'Loligo spp.',
    categoria: 'marisco',
    badge: 'BLOCK / IQF',
    badgeColor: '#0ea5e9',
    imagen: STORAGE_URL + 'calamar_real.webp',
    empaques: ['BLOCK', 'IQF'],
    mercados: ['España', 'Italia', 'Japón', 'EE.UU.'],
    descripcion: 'Calamar patagónico (loligo) de la costa peruana, carne blanca y tierna. Presentación entera, en tubos o en anillas según requerimiento.',
  },
]
