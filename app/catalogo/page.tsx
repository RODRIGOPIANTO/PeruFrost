'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, ChevronRight, Star } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/components/LanguageContext'

// ─────────────────────────────────────────────────────────────────────────────
// DATOS DE PRODUCTOS — Separados del componente para fácil mantenimiento
// ─────────────────────────────────────────────────────────────────────────────

type Formato = { label: string; color: string; bg: string }
type Producto = {
  id: string
  nombre: string
  nombreEN: string
  cientifico: string
  descripcion: string
  imagen?: string
  formatos: Formato[]
  destacado?: boolean
  subSeccion?: 'principal' | 'subproducto' | 'valorAgregado'
}

const FMT: Record<string, Formato> = {
  BLOCK:     { label: 'BLOCK',     color: '#00e5ff', bg: 'rgba(0,229,255,0.12)'    },
  IQF:       { label: 'IQF',       color: '#a78bfa', bg: 'rgba(167,139,250,0.12)'  },
  IWP:       { label: 'IWP',       color: '#34d399', bg: 'rgba(52,211,153,0.12)'   },
  IVP:       { label: 'IVP',       color: '#fbbf24', bg: 'rgba(251,191,36,0.12)'   },
  SKIN_PACK: { label: 'SKIN PACK', color: '#f472b6', bg: 'rgba(244,114,182,0.12)'  },
  TRAY:      { label: 'TRAY',      color: '#fb923c', bg: 'rgba(251,146,60,0.12)'   },
  BAGS:      { label: 'BAGS',      color: '#60a5fa', bg: 'rgba(96,165,250,0.12)'   },
}

const POTA: Producto[] = [
  // PRINCIPALES
  { id: 'filete',      nombre: 'Filete de Pota',          nombreEN: 'Giant Squid Fillet',        cientifico: 'Dosidicus gigas', descripcion: 'Filete premium limpio y calibrado. El corte más comercializado en mercados asiáticos y europeos.', imagen: '/recursos/product_squid.png', formatos: [FMT.BLOCK],           subSeccion: 'principal', destacado: true },
  { id: 'alas',        nombre: 'Alas de Pota',            nombreEN: 'Giant Squid Wings',         cientifico: 'Dosidicus gigas', descripcion: 'Textura firme y sabor intenso. Alta demanda en mercados españoles y coreanos.', imagen: '/recursos/calamar_real.png', formatos: [FMT.BLOCK],           subSeccion: 'principal' },
  { id: 'tentaculos',  nombre: 'Tentáculos de Pota',      nombreEN: 'Giant Squid Tentacles',     cientifico: 'Dosidicus gigas', descripcion: 'Presentación entera. Mercado objetivo: España, Portugal y Japón.', formatos: [FMT.BLOCK],           subSeccion: 'principal' },
  { id: 'reproductor', nombre: 'Reproductor',              nombreEN: 'Sexual Tentacle',           cientifico: 'Dosidicus gigas', descripcion: 'Corte especializado con alta valorización en mercados asiáticos.', formatos: [FMT.BLOCK],           subSeccion: 'principal' },
  { id: 'nucas',       nombre: 'Nucas de Pota',           nombreEN: 'Giant Squid Necks',         cientifico: 'Dosidicus gigas', descripcion: 'Parte dorsal con músculo de alta proteína. Presentado en bloques.', formatos: [FMT.BLOCK],           subSeccion: 'principal' },
  // SUBPRODUCTOS
  { id: 'membrana',    nombre: 'Membrana',                nombreEN: 'Membrane',                  cientifico: 'Dosidicus gigas', descripcion: 'Subproducto de alto rendimiento para mercados industriales.', formatos: [FMT.BLOCK],           subSeccion: 'subproducto' },
  { id: 'membranaCoc', nombre: 'Membrana Cocida',         nombreEN: 'Boiled Membrane',           cientifico: 'Dosidicus gigas', descripcion: 'Procesada en planta bajo estrictos controles HACCP.', formatos: [FMT.BLOCK],           subSeccion: 'subproducto' },
  { id: 'telilla',     nombre: 'Telilla',                 nombreEN: 'Belly',                     cientifico: 'Dosidicus gigas', descripcion: 'Capa interna gelatinosa. Uso industrial en Asia.', formatos: [FMT.BLOCK],           subSeccion: 'subproducto' },
  { id: 'telillaCoc',  nombre: 'Telilla Cocida',          nombreEN: 'Boiled Belly',              cientifico: 'Dosidicus gigas', descripcion: 'Proceso térmico controlado para eliminar riesgo microbiológico.', formatos: [FMT.BLOCK],           subSeccion: 'subproducto' },
  { id: 'pico',        nombre: 'Pico (Boca)',             nombreEN: 'Mouth / Beak',              cientifico: 'Dosidicus gigas', descripcion: 'Subproducto de uso industrial con alta demanda en China.', formatos: [FMT.BLOCK],           subSeccion: 'subproducto' },
  { id: 'ventosa',     nombre: 'Ventosas',                nombreEN: 'Suckers',                   cientifico: 'Dosidicus gigas', descripcion: 'Uso culinario en Asia Oriental. Textura crujiente apreciada.', formatos: [FMT.BLOCK],           subSeccion: 'subproducto' },
  { id: 'recortes',    nombre: 'Recortes',                nombreEN: "Bits & Pieces",             cientifico: 'Dosidicus gigas', descripcion: 'Trozos irregulares de alta proteína para procesadores de surimi.', formatos: [FMT.IQF, FMT.BLOCK], subSeccion: 'subproducto' },
  { id: 'recortesCoc', nombre: 'Recorte Precocido',       nombreEN: 'Boiled Bits & Pieces',     cientifico: 'Dosidicus gigas', descripcion: 'Tratamiento térmico completo. Reducción enzimática garantizada.', formatos: [FMT.BLOCK],           subSeccion: 'subproducto' },
  // VALOR AGREGADO
  { id: 'daruma',      nombre: 'Daruma Cocida',           nombreEN: 'Boiled Fillet (Daruma)',    cientifico: 'Dosidicus gigas', descripcion: 'Filete cocido y laminado tipo japonés. Producto estrella de exportación a Japón.', formatos: [FMT.BLOCK],           subSeccion: 'valorAgregado' },
  { id: 'anillas',     nombre: 'Anillas de Pota',         nombreEN: 'Squid Rings',               cientifico: 'Dosidicus gigas', descripcion: 'Corte transversal uniforme ideal para calamares a la romana. Mercado europeo.', formatos: [FMT.BLOCK, FMT.IQF], subSeccion: 'valorAgregado' },
  { id: 'alasCoc',     nombre: 'Alas Cocidas',            nombreEN: 'Boiled Wings',              cientifico: 'Dosidicus gigas', descripcion: 'Wings procesadas por cocción al vapor. Listas para marinar o servir.', formatos: [FMT.BLOCK],           subSeccion: 'valorAgregado' },
  { id: 'labios',      nombre: 'Labios de Pota',          nombreEN: 'Squid Lips',                cientifico: 'Dosidicus gigas', descripcion: 'Producto inusual de alta valorización en gastronomía asiática de vanguardia.', formatos: [FMT.BLOCK],           subSeccion: 'valorAgregado' },
  { id: 'cono',        nombre: 'Cono de Pota',            nombreEN: 'Squid Cone',                cientifico: 'Dosidicus gigas', descripcion: 'Sifón completo ideal para relleno. Alta demanda en España.', formatos: [FMT.BLOCK],           subSeccion: 'valorAgregado' },
  { id: 'botones',     nombre: 'Botones de Pota',         nombreEN: 'Squid Buttons',             cientifico: 'Dosidicus gigas', descripcion: 'Porciones circulares de tamaño uniforme. Producto para foodservice y retail.', formatos: [FMT.BLOCK, FMT.IQF], subSeccion: 'valorAgregado' },
  { id: 'rabas',       nombre: 'Rabas de Pota',           nombreEN: 'Squid Strips (Rabas)',      cientifico: 'Dosidicus gigas', descripcion: 'Tiras longitudinales empanizables. El producto de mayor crecimiento en mercados latinoeuropeos.', formatos: [FMT.BLOCK, FMT.IQF], subSeccion: 'valorAgregado' },
]

const PECES: Producto[] = [
  { id: 'merluza',    nombre: 'Merluza Peruana',         nombreEN: 'Peruvian Hake',             cientifico: 'Merluccius gayi peruanus', descripcion: 'Especie de alta valorización en mercados europeos. Filetes blancos, sin espinas, de textura suave y delicada.', imagen: '/recursos/product_merluza.png', formatos: [FMT.IQF, FMT.BLOCK, FMT.IWP] },
  { id: 'perico',     nombre: 'Perico / Mahi Mahi',      nombreEN: 'Mahi Mahi',                 cientifico: 'Coryphaena hippurus', descripcion: 'Pesca de temporada del Pacífico sur peruano. Alta valorización en EEUU y Asia. Sabor suave y versátil.', imagen: '/recursos/product_mahi.png', formatos: [FMT.IQF, FMT.IWP, FMT.IVP] },
  { id: 'pejerrey',   nombre: 'Pejerrey',                nombreEN: 'Silverside',                cientifico: 'Odontesthes regia regia', descripcion: 'Especie artesanal del litoral peruano. Carne blanca y firme. Base de la gastronomía costeña peruana.', formatos: [FMT.IQF, FMT.BLOCK] },
  { id: 'bonito',     nombre: 'Bonito',                  nombreEN: 'Pacific Bonito',            cientifico: 'Sarda chiliensis', descripcion: 'Túnido de aguas frías del Perú. Carne oscura y robusta ideal para conservas y mercados asiáticos.', formatos: [FMT.BLOCK, FMT.IQF] },
  { id: 'anchoveta',  nombre: 'Anchoveta',               nombreEN: 'Peruvian Anchovy',          cientifico: 'Engraulis ringens', descripcion: 'La especie más abundante del Pacífico sur. Base de la cadena trófica marina y de la industria harinera.', formatos: [FMT.BLOCK, FMT.IQF] },
  { id: 'jurel',      nombre: 'Jurel',                   nombreEN: 'Horse Mackerel',            cientifico: 'Trachurus murphyi', descripcion: 'Pelágico de alta productividad. Exportado principalmente a mercados africanos y del este europeo.', formatos: [FMT.BLOCK, FMT.IQF] },
  { id: 'caballa',    nombre: 'Caballa',                 nombreEN: 'Mackerel',                  cientifico: 'Scomber japonicus', descripcion: 'Alto contenido en Omega-3. Ideal para conservas y filetes ahumados. Exportado entero o en filetes.', formatos: [FMT.BLOCK, FMT.IQF] },
  { id: 'chiri',      nombre: 'Chiri',                   nombreEN: 'Pacific Butterfish',        cientifico: 'Peprilus medius', descripcion: 'Carne suave y de fácil digestión. Alta demanda en mercados asiáticos por su sabor neutro y textura delicada.', formatos: [FMT.BLOCK, FMT.IQF] },
]

const MARISCOS: Producto[] = [
  { id: 'pulpo',          nombre: 'Pulpo del Pacífico',         nombreEN: 'Pacific Octopus',            cientifico: 'Octopus spp.', descripcion: 'Capturado por pesquería artesanal. Cocido y limpiado en planta. Alta demanda en España, Japón y Corea.', imagen: '/recursos/product_pulpo.png', formatos: [FMT.BLOCK, FMT.SKIN_PACK, FMT.TRAY, FMT.BAGS] },
  { id: 'langostinoCal',  nombre: 'Langostino Californiensis',  nombreEN: 'California Brown Shrimp',   cientifico: 'Farfantepenaeus californiensis', descripcion: 'Camarón salvaje del norte peruano. Sabor intenso y dulce. Ruto hacia España, Italia y EE.UU.', imagen: '/recursos/product_langostino.png', formatos: [FMT.BLOCK, FMT.IQF] },
  { id: 'langostinoBlc',  nombre: 'Langostino Blanco',          nombreEN: 'White Shrimp',               cientifico: 'Litopenaeus vannamei', descripcion: 'De acuicultura certificada. Consistencia uniforme y sabor neutro ideal para mercados de foodservice global.', imagen: '/recursos/product_langostino.png', formatos: [FMT.BLOCK, FMT.IQF] },
  { id: 'gambon',         nombre: 'Gambón Argentino',           nombreEN: 'Argentine Red Shrimp',       cientifico: 'Pleoticus muelleri', descripcion: 'Captura silvestre en el Atlántico Sur. Dulzor superior y color rojo intenso que lo diferencia en el mercado premium.', formatos: [FMT.BLOCK, FMT.IQF] },
  { id: 'concha',         nombre: 'Concha de Abanico',          nombreEN: 'Peruvian Scallop',           cientifico: 'Argopecten purpuratus', descripcion: 'La joya de la acuicultura peruana. Cultivada en la bahía de Sechura. Textura mantecosa y perfil de sabor dulce.', imagen: '/recursos/product_concha.png', formatos: [FMT.IQF] },
  { id: 'calamar',        nombre: 'Calamar del Pacífico',       nombreEN: 'Pacific Squid',              cientifico: 'Loligo spp.', descripcion: 'Especie de talla menor que la pota. Textura más fina y terneza superior. Exportado a España y EE.UU.', formatos: [FMT.BLOCK, FMT.IQF] },
]

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

type Tab = 'pota' | 'peces' | 'mariscos'
type SubTab = 'principal' | 'subproducto' | 'valorAgregado'

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

function FormatoBadge({ f }: { f: Formato }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase border"
      style={{ color: f.color, background: f.bg, borderColor: `${f.color}30` }}
    >
      {f.label}
    </span>
  )
}

function ProductCard({ p, index }: { p: Producto; index: number }) {
  const placeholder = `https://placehold.co/600x400/0d2137/00e5ff?text=${encodeURIComponent(p.nombreEN)}`
  const imgSrc = p.imagen ?? placeholder

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-[#00e5ff]/40 hover:shadow-[0_0_40px_-10px_rgba(0,229,255,0.2)]"
      style={{ background: 'rgba(22,51,84,0.55)', backdropFilter: 'blur(12px)' }}
    >
      {/* Imagen */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0d2137]">
        <Image
          src={imgSrc}
          alt={p.nombre}
          fill
          unoptimized={!p.imagen}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c] via-transparent to-transparent opacity-80" />
        {p.destacado && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#00e5ff] text-[#0b192c] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-[#00e5ff]/30">
            <Star size={10} fill="currentColor" />
            Producto Estrella
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-5 lg:p-6 gap-3">
        <div>
          <h3 className="text-white font-black text-lg leading-tight tracking-tight mb-0.5 group-hover:text-[#00e5ff] transition-colors duration-300">
            {p.nombre}
          </h3>
          <p className="text-[#00e5ff]/60 text-xs italic font-medium">{p.nombreEN} · <em className="text-[#a0b2c6]">{p.cientifico}</em></p>
        </div>

        <p className="text-[#a0b2c6] text-sm leading-relaxed flex-1 line-clamp-3">
          {p.descripcion}
        </p>

        {/* Formatos */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.18em] text-[#a0b2c6]/50 font-bold mb-2">Formatos de exportación</p>
          <div className="flex flex-wrap gap-1.5">
            {p.formatos.map(f => <FormatoBadge key={f.label} f={f} />)}
          </div>
        </div>

        {/* Acción */}
        <button className="mt-1 flex items-center gap-2 text-[#00e5ff] text-xs font-bold group/btn hover:gap-3 transition-all duration-300 w-fit">
          <Download size={13} />
          <span className="underline underline-offset-4 decoration-[#00e5ff]/30 group-hover/btn:decoration-[#00e5ff]">
            Solicitar Ficha Técnica
          </span>
        </button>
      </div>
    </motion.article>
  )
}

export default function CatalogoPage() {
  const { lang } = useLang()
  const [tab, setTab] = useState<Tab>('pota')
  const [subTab, setSubTab] = useState<SubTab>('principal')

  const TABS: { id: Tab; label: string; labelEN: string; emoji: string; count: number }[] = [
    { id: 'pota',     label: 'Calamar Gigante', labelEN: 'Giant Squid',         emoji: '🦑', count: POTA.length     },
    { id: 'peces',    label: 'Peces',           labelEN: 'Fish',                emoji: '🐟', count: PECES.length    },
    { id: 'mariscos', label: 'Mariscos',        labelEN: 'Shellfish & Shellfish',emoji: '🦐', count: MARISCOS.length },
  ]

  const SUB_TABS: { id: SubTab; label: string; labelEN: string }[] = [
    { id: 'principal',     label: 'Productos Principales', labelEN: 'Main Products'   },
    { id: 'subproducto',   label: 'Subproductos',          labelEN: 'By-Products'     },
    { id: 'valorAgregado', label: 'Valor Agregado',        labelEN: 'Value Added'     },
  ]

  const potaFiltrada = POTA.filter(p => p.subSeccion === subTab)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0b192c] text-white pt-[72px]">

        {/* ═══ HERO ═══ */}
        <section className="relative py-20 lg:py-28 overflow-hidden border-b border-white/5">
          {/* Fondo decorativo */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[120px]" style={{ background: 'radial-gradient(circle, #00e5ff, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]" style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)' }} />
            {/* Grid pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00e5ff" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 text-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="inline-block text-[#00e5ff] text-xs font-black uppercase tracking-[0.25em] border border-[#00e5ff]/25 bg-[#00e5ff]/8 px-4 py-1.5 rounded-full mb-6">
                  Catálogo Oficial 2026
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-tighter leading-[0.95] mb-5">
                Portafolio{' '}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00e5ff, #60a5fa)' }}>
                  Marino
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-[#a0b2c6] text-lg max-w-2xl mx-auto leading-relaxed">
                {lang === 'es'
                  ? '+35 productos certificados BRCGS, HACCP y SMETA. Procesados en Paita, Perú para los mercados más exigentes del mundo.'
                  : '+35 products certified BRCGS, HACCP and SMETA. Processed in Paita, Peru for the world\'s most demanding markets.'}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ═══ TABS PRINCIPALES ═══ */}
        <div className="sticky top-[72px] z-40 border-b" style={{ background: 'rgba(11,25,44,0.92)', backdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="flex items-stretch overflow-x-auto hide-scrollbar">
              {TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative flex items-center gap-2.5 px-6 py-4 text-sm font-bold whitespace-nowrap transition-all duration-300 border-b-2 ${
                    tab === t.id
                      ? 'text-[#00e5ff] border-[#00e5ff]'
                      : 'text-[#a0b2c6] border-transparent hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="text-lg">{t.emoji}</span>
                  <span>{lang === 'es' ? t.label : t.labelEN}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full transition-colors ${tab === t.id ? 'bg-[#00e5ff]/15 text-[#00e5ff]' : 'bg-white/5 text-[#a0b2c6]'}`}>
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ═══════════════════ POTA ═══════════════════ */}
          {tab === 'pota' && (
            <motion.div key="pota" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

              {/* Hero Pota */}
              <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-14 lg:py-20">
                <motion.div
                  initial="hidden" animate="visible" variants={stagger}
                  className="rounded-3xl overflow-hidden border border-[#00e5ff]/15 shadow-[0_0_80px_-30px_rgba(0,229,255,0.2)]"
                  style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.06) 0%, rgba(14,25,44,0.8) 50%, rgba(96,165,250,0.06) 100%)' }}
                >
                  <div className="flex flex-col lg:flex-row items-center gap-0">
                    {/* Imagen */}
                    <motion.div variants={fadeUp} className="relative w-full lg:w-[45%] aspect-square lg:aspect-auto lg:h-[480px] flex-shrink-0 overflow-hidden">
                      <Image src="/recursos/product_squid.png" alt="Calamar Gigante Pota" fill className="object-contain p-8 lg:p-12 animate-[float_6s_ease-in-out_infinite]" priority sizes="(max-width:1024px) 100vw, 45vw" />
                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.08) 0%, transparent 65%)' }} />
                    </motion.div>

                    {/* Info */}
                    <motion.div variants={fadeUp} className="flex-1 p-8 lg:p-14 flex flex-col justify-center">
                      <span className="inline-flex items-center gap-2 bg-[#00e5ff] text-[#0b192c] text-[11px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full w-fit mb-6 shadow-lg shadow-[#00e5ff]/20">
                        <Star size={11} fill="currentColor" /> Producto Estrella
                      </span>
                      <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-[1.02] mb-3 text-white">
                        Calamar Gigante
                      </h2>
                      <h3 className="text-4xl lg:text-5xl font-black tracking-tighter leading-[1.02] mb-4 text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #00e5ff, #60a5fa)' }}>
                        Pota del Pacífico
                      </h3>
                      <p className="text-[#a0b2c6]/70 italic text-base mb-4 font-medium">Dosidicus gigas</p>
                      <p className="text-[#a0b2c6] text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
                        Capturada en las aguas peruanas con flota propia (98% de cuota nacional). El calamar más grande del Pacífico sur. Procesado bajo estricta cadena de frío en nuestra planta certificada BRCGS AA en Paita.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[FMT.BLOCK, FMT.IQF].map(f => <FormatoBadge key={f.label} f={f} />)}
                        <span className="inline-flex items-center gap-1 text-[#a0b2c6] text-xs font-semibold">+20 cortes</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </section>

              {/* Sub-tabs */}
              <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                  <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'rgba(22,51,84,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {SUB_TABS.map(st => (
                      <button
                        key={st.id}
                        onClick={() => setSubTab(st.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                          subTab === st.id
                            ? 'bg-[#00e5ff] text-[#0b192c] shadow-md'
                            : 'text-[#a0b2c6] hover:text-white'
                        }`}
                      >
                        {lang === 'es' ? st.label : st.labelEN}
                        <span className="ml-2 text-[10px] opacity-70">{POTA.filter(p => p.subSeccion === st.id).length}</span>
                      </button>
                    ))}
                  </div>
                  <div className="h-px flex-1 hidden sm:block" style={{ background: 'linear-gradient(90deg, rgba(0,229,255,0.15), transparent)' }} />
                  <p className="text-[#a0b2c6]/50 text-xs hidden sm:block font-medium italic">
                    {potaFiltrada.length} productos en esta categoría
                  </p>
                </div>
              </div>

              {/* Grid de pota */}
              <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 pb-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={subTab}
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6 auto-rows-fr"
                  >
                    {potaFiltrada.map((p, i) => (
                      <ProductCard key={p.id} p={p} index={i} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════ PECES ═══════════════════ */}
          {tab === 'peces' && (
            <motion.div key="peces" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-14 lg:py-20">
                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-12 text-center">
                  <span className="inline-block text-[#34d399] text-xs font-black uppercase tracking-[0.22em] border border-[#34d399]/25 bg-[#34d399]/8 px-4 py-1.5 rounded-full mb-4">
                    🐟 Especies Pelágicas y Demersales
                  </span>
                  <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-3">
                    Peces del Pacífico Sur
                  </h2>
                  <p className="text-[#a0b2c6] max-w-xl mx-auto leading-relaxed">
                    Captura sostenible certificada. 8 especies de alta valorización para los mercados más exigentes.
                  </p>
                </motion.div>
                <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6 auto-rows-fr">
                  {PECES.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════ MARISCOS ═══════════════════ */}
          {tab === 'mariscos' && (
            <motion.div key="mariscos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-14 lg:py-20">
                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-12 text-center">
                  <span className="inline-block text-[#f472b6] text-xs font-black uppercase tracking-[0.22em] border border-[#f472b6]/25 bg-[#f472b6]/8 px-4 py-1.5 rounded-full mb-4">
                    🦐 Mariscos &amp; Cefalópodos
                  </span>
                  <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-3">
                    Mariscos Selectos
                  </h2>
                  <p className="text-[#a0b2c6] max-w-xl mx-auto leading-relaxed">
                    Desde el langostino artesanal hasta la concha de abanico de acuicultura certificada. La élite del mar peruano.
                  </p>
                </motion.div>
                <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 auto-rows-fr">
                  {MARISCOS.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
                </motion.div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ═══ CTA FINAL ═══ */}
        <section className="py-20 lg:py-28 border-t" style={{ background: 'linear-gradient(180deg, rgba(0,229,255,0.03) 0%, transparent 100%)', borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
            <span className="text-[#00e5ff] text-xs font-black uppercase tracking-[0.25em] mb-6 opacity-70">¿Listo para cotizar?</span>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-5 text-white max-w-2xl">
              Solicita tu cotización en menos de 24h
            </h2>
            <p className="text-[#a0b2c6] text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Compártenos las especificaciones de volumen, empaque y destino y nuestro equipo comercial te responderá con una propuesta detallada.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 bg-[#00e5ff] text-[#0b192c] font-black text-sm uppercase tracking-widest px-8 py-4 rounded-xl hover:shadow-[0_8px_40px_-8px_rgba(0,229,255,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              Solicitar Cotización <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
