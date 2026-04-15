export interface Corte {
  id: string
  nombre: string
  nombreEN: string
  categoria: 'producto' | 'subproducto' | 'valorAgregado'
  empaques: string[]
  descripcion?: string
  zona?: string // zona del cuerpo para el diagrama SVG
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

// ═══════════════════════════════════════════════
// GIANT SQUID / POTA — PRODUCTO ESTRELLA
// Dosidicus gigas — FAO 87, Pacífico Sur
// ═══════════════════════════════════════════════
export const pota: Producto = {
  id: 'pota',
  nombre: 'Calamar Gigante / Pota',
  nombreEN: 'Giant Squid',
  nombreCientifico: 'Dosidicus gigas',
  categoria: 'pota',
  badge: 'Producto Estrella',
  badgeColor: '#0ea5e9',
  zona: 'FAO 87 — Pacífico Sur',
  empaques: ['BLOCK 10kg', 'BLOCK 7kg', 'SACO 20kg', 'IQF'],
  mercados: ['China', 'España', 'Japón', 'EE.UU.', 'Corea', 'Tailandia'],
  descripcion: 'La pota peruana es nuestro producto estrella. Capturada en las ricas aguas del Pacífico Sur, procesada bajo estrictos estándares BRCGS Grado AA.',

  // PRODUCTOS PRINCIPALES
  cortes: [
    {
      id: 'filete',
      nombre: 'Filete',
      nombreEN: 'Fillet',
      categoria: 'producto',
      empaques: ['BLOCK'],
      descripcion: 'Manto limpio sin piel, presentación principal para mercados europeos y asiáticos',
      zona: 'manto',
      emoji: '🦑',
    },
    {
      id: 'alas',
      nombre: 'Alas',
      nombreEN: 'Wings',
      categoria: 'producto',
      empaques: ['BLOCK'],
      descripcion: 'Aletas laterales del manto, muy apreciadas en el mercado asiático',
      zona: 'alas',
      emoji: '🪶',
    },
    {
      id: 'tentaculos',
      nombre: 'Tentáculos',
      nombreEN: 'Tentacles',
      categoria: 'producto',
      empaques: ['BLOCK'],
      descripcion: 'Ocho tentáculos más dos largos, alta demanda en Asia y Europa del Sur',
      zona: 'tentaculos',
      emoji: '🐙',
    },
    {
      id: 'reproductor',
      nombre: 'Reproductor',
      nombreEN: 'Sexual Tentacle',
      categoria: 'producto',
      empaques: ['BLOCK'],
      descripcion: 'Tentáculo reproductor, nicho de mercado especializado',
      zona: 'cabeza',
      emoji: '🔬',
    },
    {
      id: 'nucas',
      nombre: 'Nucas',
      nombreEN: 'Necks',
      categoria: 'producto',
      empaques: ['BLOCK'],
      descripcion: 'Zona de unión entre cabeza y manto',
      zona: 'cabeza',
      emoji: '🔗',
    },
  ],

  // SUB PRODUCTOS
  subProductos: [
    {
      id: 'membrana',
      nombre: 'Membrana',
      nombreEN: 'Membrane',
      categoria: 'subproducto',
      empaques: ['BLOCK'],
      emoji: '📄',
    },
    {
      id: 'membrana-cocida',
      nombre: 'Membrana Cocida',
      nombreEN: 'Boiled Membrane',
      categoria: 'subproducto',
      empaques: ['BLOCK'],
      emoji: '♨️',
    },
    {
      id: 'telilla',
      nombre: 'Telilla',
      nombreEN: 'Belly',
      categoria: 'subproducto',
      empaques: ['BLOCK'],
      emoji: '🧬',
    },
    {
      id: 'telilla-cocida',
      nombre: 'Telilla Cocida',
      nombreEN: 'Boiled Belly',
      categoria: 'subproducto',
      empaques: ['BLOCK'],
      emoji: '♨️',
    },
    {
      id: 'pico',
      nombre: 'Pico',
      nombreEN: 'Mouth',
      categoria: 'subproducto',
      empaques: ['BLOCK'],
      emoji: '🦷',
    },
  ],

  // VALOR AGREGADO
  valorAgregado: [
    {
      id: 'daruma',
      nombre: 'Daruma Cocida',
      nombreEN: 'Boiled Fillet',
      categoria: 'valorAgregado',
      empaques: ['BLOCK'],
      descripcion: 'Filete precocido listo para consumo o procesamiento mínimo',
      emoji: '🍱',
    },
    {
      id: 'anillas',
      nombre: 'Anillas',
      nombreEN: 'Rings',
      categoria: 'valorAgregado',
      empaques: ['BLOCK', 'IQF'],
      descripcion: 'Anillas de calamar para food service y retail',
      emoji: '⭕',
    },
    {
      id: 'alas-cocidas',
      nombre: 'Alas Cocidas',
      nombreEN: 'Boiled Wings',
      categoria: 'valorAgregado',
      empaques: ['BLOCK'],
      emoji: '🍳',
    },
    {
      id: 'labios',
      nombre: 'Labios',
      nombreEN: 'Squid Lips',
      categoria: 'valorAgregado',
      empaques: ['BLOCK'],
      emoji: '💋',
    },
    {
      id: 'cono',
      nombre: 'Cono',
      nombreEN: 'Squid Cone',
      categoria: 'valorAgregado',
      empaques: ['BLOCK'],
      emoji: '🔺',
    },
    {
      id: 'recortes',
      nombre: 'Recortes',
      nombreEN: 'Bits & Pieces',
      categoria: 'valorAgregado',
      empaques: ['IQF', 'BLOCK'],
      emoji: '✂️',
    },
    {
      id: 'botones',
      nombre: 'Botones',
      nombreEN: 'Buttons',
      categoria: 'valorAgregado',
      empaques: ['BLOCK', 'IQF'],
      descripcion: 'Porciones pequeñas ideales para mezclas y preparaciones',
      emoji: '🔘',
    },
    {
      id: 'rabas',
      nombre: 'Rabas',
      nombreEN: 'Squid Strips',
      categoria: 'valorAgregado',
      empaques: ['BLOCK', 'IQF'],
      descripcion: 'Tiras de calamar para fritura y food service',
      emoji: '🍟',
    },
    {
      id: 'recorte-precocido',
      nombre: 'Recorte Precocido',
      nombreEN: 'Boiled Bits & Pieces',
      categoria: 'valorAgregado',
      empaques: ['BLOCK'],
      emoji: '♨️',
    },
    {
      id: 'ventosa',
      nombre: 'Ventosa',
      nombreEN: 'Suckers',
      categoria: 'valorAgregado',
      empaques: ['BLOCK'],
      emoji: '🔵',
    },
  ],
}

// ═══════════════════════════════════════════════
// PECES / FISH
// ═══════════════════════════════════════════════
export const peces: Producto[] = [
  {
    id: 'merluza',
    nombre: 'Merluza',
    nombreEN: 'Peruvian Hake',
    nombreCientifico: 'Merluccius gayi',
    categoria: 'pez',
    badge: 'Alta Demanda',
    badgeColor: '#10b981',
    zona: 'FAO 87 — Perú',
    empaques: ['IQF', 'BLOCK', 'IWP'],
    mercados: ['España', 'Portugal', 'Francia', 'EE.UU.', 'Brasil'],
    descripcion: 'Merluza peruana de alta calidad para mercados europeos y americanos. Procesada con equipos JBT Marel de clasificación automática.',
    cortes: [
      { id: 'filete-piel', nombre: 'Filete con piel', nombreEN: 'Skin-on Fillet', categoria: 'producto', empaques: ['IQF', 'BLOCK'] },
      { id: 'filete-sin-piel', nombre: 'Filete sin piel', nombreEN: 'Skinless Fillet', categoria: 'producto', empaques: ['IQF', 'BLOCK'] },
      { id: 'hgt', nombre: 'HGT', nombreEN: 'HGT', categoria: 'producto', empaques: ['BLOCK', 'IWP'] },
      { id: 'entera', nombre: 'Entera', nombreEN: 'Whole', categoria: 'producto', empaques: ['BLOCK'] },
    ],
  },
  {
    id: 'mahi-mahi',
    nombre: 'Perico / Mahi Mahi',
    nombreEN: 'Mahi Mahi / Dolphinfish',
    nombreCientifico: 'Coryphaena hippurus',
    categoria: 'pez',
    badge: 'Premium',
    badgeColor: '#f59e0b',
    zona: 'Océano Pacífico — Perú',
    empaques: ['IQF', 'IWP', 'IVP'],
    mercados: ['EE.UU.', 'Canadá', 'Japón', 'Australia'],
    descripcion: 'Apreciado en mercados premium por sabor y textura superiores. Presentaciones de alta gama para restaurantes y distribuidores.',
    cortes: [
      { id: 'filetes', nombre: 'Filetes', nombreEN: 'Fillets', categoria: 'producto', empaques: ['IQF', 'IVP'] },
      { id: 'porciones', nombre: 'Porciones', nombreEN: 'Portions', categoria: 'producto', empaques: ['IQF', 'IVP'] },
      { id: 'lomos', nombre: 'Lomos', nombreEN: 'Loins', categoria: 'producto', empaques: ['IQF'] },
    ],
  },
  {
    id: 'pejerrey',
    nombre: 'Pejerrey',
    nombreEN: 'Silverside',
    nombreCientifico: 'Odontesthes regia regia',
    categoria: 'pez',
    empaques: ['IQF', 'BLOCK'],
    mercados: [],
    descripcion: 'Pequeño pez pelágico de alta rotación en mercados latinoamericanos.',
  },
  {
    id: 'bonito',
    nombre: 'Bonito',
    nombreEN: 'Bonito',
    nombreCientifico: 'Sarda chiliensis',
    categoria: 'pez',
    empaques: ['BLOCK', 'IQF'],
    mercados: [],
    descripcion: 'Atún menor de la Corriente de Humboldt, alta demanda en conservas.',
  },
  {
    id: 'anchoveta',
    nombre: 'Anchoveta',
    nombreEN: 'Anchovy',
    nombreCientifico: 'Engraulis ringens',
    categoria: 'pez',
    empaques: ['BLOCK', 'IQF'],
    mercados: [],
    descripcion: 'Base de la cadena trófica del Pacífico Sur. Alta demanda en Europa.',
  },
  {
    id: 'jurel',
    nombre: 'Jurel',
    nombreEN: 'Horse Mackerel',
    nombreCientifico: 'Trachurus murphyi',
    categoria: 'pez',
    empaques: ['BLOCK', 'IQF'],
    mercados: [],
    descripcion: 'Especie pelágica de alto valor nutricional.',
  },
  {
    id: 'caballa',
    nombre: 'Caballa',
    nombreEN: 'Mackerel',
    nombreCientifico: 'Scomber japonicus',
    categoria: 'pez',
    empaques: ['BLOCK', 'IQF'],
    mercados: [],
    descripcion: 'Especie grasa con alto contenido de Omega-3.',
  },
  {
    id: 'chiri',
    nombre: 'Chiri',
    nombreEN: 'Pacific Butterfish',
    nombreCientifico: 'Peprilus medius',
    categoria: 'pez',
    empaques: ['BLOCK', 'IQF'],
    mercados: [],
    descripcion: 'Pez de carne blanca y textura suave.',
  },
]

// ═══════════════════════════════════════════════
// MARISCOS Y CEFALÓPODOS / SHELLFISH & CEPHALOPODS
// ═══════════════════════════════════════════════
export const mariscos: Producto[] = [
  {
    id: 'pulpo',
    nombre: 'Pulpo',
    nombreEN: 'Octopus',
    nombreCientifico: 'Octopus spp.',
    categoria: 'marisco',
    empaques: ['BLOCK', 'SKIN PACK', 'TRAY', 'BAGS'],
    mercados: ['España', 'Japón', 'Italia'],
    descripcion: 'Pulpo entero o en porciones, múltiples presentaciones para retail y food service.',
  },
  {
    id: 'langostino-california',
    nombre: 'Langostino Californiensis',
    nombreEN: 'California Brown Shrimp',
    nombreCientifico: 'Farfantepenaeus californiensis',
    categoria: 'marisco',
    empaques: ['BLOCK', 'IQF'],
    mercados: [],
    descripcion: 'Langostino del Pacífico norte peruano, muy apreciado por su sabor.',
  },
  {
    id: 'langostino-blanco',
    nombre: 'Langostino Blanco',
    nombreEN: 'White Shrimp',
    nombreCientifico: 'Litopenaeus vannamei',
    categoria: 'marisco',
    empaques: ['BLOCK', 'IQF'],
    mercados: [],
    descripcion: 'La especie de camarón más cultivada mundialmente.',
  },
  {
    id: 'gambon-argentino',
    nombre: 'Gambón Argentino',
    nombreEN: 'Argentine Red Shrimp',
    nombreCientifico: 'Pleoticus muelleri',
    categoria: 'marisco',
    empaques: ['BLOCK', 'IQF'],
    mercados: ['España', 'EE.UU.', 'Japón'],
    descripcion: 'Gamba salvaje del Atlántico Sur, sabor excepcional y carne firme.',
  },
  {
    id: 'concha-abanico',
    nombre: 'Concha de Abanico',
    nombreEN: 'Scallop',
    nombreCientifico: 'Argopecten purpuratus',
    categoria: 'marisco',
    empaques: ['IQF'],
    mercados: ['Francia', 'Japón', 'EE.UU.'],
    descripcion: 'El mejillón de abanico peruano, joya gastronómica del Pacífico.',
  },
  {
    id: 'calamar',
    nombre: 'Calamar',
    nombreEN: 'Squid',
    nombreCientifico: 'Loligo spp.',
    categoria: 'marisco',
    empaques: ['BLOCK', 'IQF'],
    mercados: ['España', 'Italia', 'Japón'],
    descripcion: 'Calamar de menor tamaño, ideal para presentaciones enteras y anillas.',
  },
]

// EXPORT AGRUPADO
export const todosLosProductos: Producto[] = [pota, ...peces, ...mariscos]
export default todosLosProductos
