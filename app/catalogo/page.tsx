'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/components/LanguageContext'

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE ASSETS (SUPABASE)
// ─────────────────────────────────────────────────────────────────────────────
const STORAGE_URL = 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/'

// ─────────────────────────────────────────────────────────────────────────────
// DATOS DE PRODUCTOS
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
  BLOCK: { label: 'BLOCK', color: '#00e5ff', bg: 'rgba(0,229,255,0.12)' },
  IQF: { label: 'IQF', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  IWP: { label: 'IWP', color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  IVP: { label: 'IVP', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  SKIN_PACK: { label: 'SKIN PACK', color: '#f472b6', bg: 'rgba(244,114,182,0.12)' },
  TRAY: { label: 'TRAY', color: '#fb923c', bg: 'rgba(251,146,60,0.12)' },
  BAGS: { label: 'BAGS', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
}

const POTA: Producto[] = [
  // PRINCIPALES
  { id: 'filete', nombre: 'Filete de Pota', nombreEN: 'Giant Squid Fillet', cientifico: 'Dosidicus gigas', descripcion: 'Filete premium limpio y calibrado. El corte más comercializado en mercados asiáticos y europeos.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/filetee.webp', formatos: [FMT.BLOCK], subSeccion: 'principal', destacado: true },
  { id: 'alas', nombre: 'Alas de Pota', nombreEN: 'Giant Squid Wings', cientifico: 'Dosidicus gigas', descripcion: 'Textura firme y sabor intenso. Alta demanda en mercados españoles y coreanos.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/ala2.webp', formatos: [FMT.BLOCK], subSeccion: 'principal' },
  { id: 'tentaculos', nombre: 'Tentáculos de Pota', nombreEN: 'Giant Squid Tentacles', cientifico: 'Dosidicus gigas', descripcion: 'Presentación entera. Mercado objetivo: España, Portugal y Japón.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/tentaculo2.webp', formatos: [FMT.BLOCK], subSeccion: 'principal' },
  { id: 'reproductor', nombre: 'Reproductor', nombreEN: 'Sexual Tentacle', cientifico: 'Dosidicus gigas', descripcion: 'Corte especializado con alta valorización en mercados asiáticos.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/reproductor2.webp', formatos: [FMT.BLOCK], subSeccion: 'principal' },
  { id: 'nucas', nombre: 'Nucas de Pota', nombreEN: 'Giant Squid Necks', cientifico: 'Dosidicus gigas', descripcion: 'Parte dorsal con músculo de alta proteína. Presentado en bloques.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/nuca2.webp', formatos: [FMT.BLOCK], subSeccion: 'principal' },
  // SUBPRODUCTOS
  { id: 'membrana', nombre: 'Membrana', nombreEN: 'Membrane', cientifico: 'Dosidicus gigas', descripcion: 'Subproducto de alto rendimiento para mercados industriales.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/mebrana1.webp', formatos: [FMT.BLOCK], subSeccion: 'subproducto' },
  { id: 'membranaCoc', nombre: 'Membrana Cocida', nombreEN: 'Boiled Membrane', cientifico: 'Dosidicus gigas', descripcion: 'Procesada en planta bajo estrictos controles HACCP.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/membrana cocida1.webp', formatos: [FMT.BLOCK], subSeccion: 'subproducto' },
  { id: 'telilla', nombre: 'Telilla', nombreEN: 'Belly', cientifico: 'Dosidicus gigas', descripcion: 'Capa interna gelatinosa. Uso industrial en Asia.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/telilla.webp', formatos: [FMT.BLOCK], subSeccion: 'subproducto' },
  { id: 'telillaCoc', nombre: 'Telilla Cocida', nombreEN: 'Boiled Belly', cientifico: 'Dosidicus gigas', descripcion: 'Proceso térmico controlado para eliminar riesgo microbiológico.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/telilla cocida.webp', formatos: [FMT.BLOCK], subSeccion: 'subproducto' },
  { id: 'pico', nombre: 'Pico (Boca)', nombreEN: 'Mouth / Beak', cientifico: 'Dosidicus gigas', descripcion: 'Subproducto de uso industrial con alta demanda en China.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/pico2.webp', formatos: [FMT.BLOCK], subSeccion: 'subproducto' },
  { id: 'ventosa', nombre: 'Ventosas', nombreEN: 'Suckers', cientifico: 'Dosidicus gigas', descripcion: 'Uso culinario en Asia Oriental. Textura crujiente apreciada.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/ventosas.webp', formatos: [FMT.BLOCK], subSeccion: 'subproducto' },
  { id: 'recortes', nombre: 'Recortes', nombreEN: 'Bits & Pieces', cientifico: 'Dosidicus gigas', descripcion: 'Trozos irregulares de alta proteína para procesadores de surimi.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/recortes2.webp', formatos: [FMT.IQF, FMT.BLOCK], subSeccion: 'subproducto' },
  { id: 'recortesCoc', nombre: 'Recorte Precocido', nombreEN: 'Boiled Bits & Pieces', cientifico: 'Dosidicus gigas', descripcion: 'Tratamiento térmico completo. Reducción enzimática garantizada.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/recorte-pre5.webp', formatos: [FMT.BLOCK], subSeccion: 'subproducto' },
  // VALOR AGREGADO
  { id: 'daruma', nombre: 'Daruma Cocida', nombreEN: 'Boiled Fillet (Daruma)', cientifico: 'Dosidicus gigas', descripcion: 'Filete cocido y laminado tipo japonés. Producto estrella de exportación a Japón.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/daruma cocida2.webp', formatos: [FMT.BLOCK], subSeccion: 'valorAgregado' },
  { id: 'anillas', nombre: 'Anillas de Pota', nombreEN: 'Squid Rings', cientifico: 'Dosidicus gigas', descripcion: 'Corte transversal uniforme ideal para calamares a la romana. Mercado europeo.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/anillas1.webp', formatos: [FMT.BLOCK, FMT.IQF], subSeccion: 'valorAgregado' },
  { id: 'alasCoc', nombre: 'Alas Cocidas', nombreEN: 'Boiled Wings', cientifico: 'Dosidicus gigas', descripcion: 'Wings procesadas por cocción al vapor. Listas para marinar o servir.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/ala-co.webp', formatos: [FMT.BLOCK], subSeccion: 'valorAgregado' },
  { id: 'labios', nombre: 'Labios de Pota', nombreEN: 'Squid Lips', cientifico: 'Dosidicus gigas', descripcion: 'Producto inusual de alta valorización en gastronomía asiática de vanguardia.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/labios.webp', formatos: [FMT.BLOCK], subSeccion: 'valorAgregado' },
  { id: 'cono', nombre: 'Cono de Pota', nombreEN: 'Squid Cone', cientifico: 'Dosidicus gigas', descripcion: 'Sifón completo ideal para relleno. Alta demanda en España.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/cono4.webp', formatos: [FMT.BLOCK], subSeccion: 'valorAgregado' },
  { id: 'botones', nombre: 'Botones de Pota', nombreEN: 'Squid Buttons', cientifico: 'Dosidicus gigas', descripcion: 'Porciones circulares de tamaño uniforme. Producto para foodservice y retail.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/botones.webp', formatos: [FMT.BLOCK, FMT.IQF], subSeccion: 'valorAgregado' },
  { id: 'rabas', nombre: 'Rabas de Pota', nombreEN: 'Squid Strips (Rabas)', cientifico: 'Dosidicus gigas', descripcion: 'Tiras longitudinales empanizables. El producto de mayor crecimiento en mercados latinoeuropeos.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/rabas3.webp', formatos: [FMT.BLOCK, FMT.IQF], subSeccion: 'valorAgregado' },
]

const PECES: Producto[] = [
  { id: 'merluza', nombre: 'Merluza Peruana', nombreEN: 'Peruvian Hake', cientifico: 'Merluccius gayi peruanus', descripcion: 'Especie de alta valorización en mercados europeos. Filetes blancos, sin espinas, de textura suave y delicada.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/merluza_1.webp', formatos: [FMT.IQF, FMT.BLOCK, FMT.IWP] },
  { id: 'perico', nombre: 'Perico / Mahi Mahi', nombreEN: 'Mahi Mahi', cientifico: 'Coryphaena hippurus', descripcion: 'Pesca de temporada del Pacífico sur peruano. Alta valorización en EEUU y Asia. Sabor suave y versátil.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/perico_1.webp', formatos: [FMT.IQF, FMT.IWP, FMT.IVP] },
  { id: 'pejerrey', nombre: 'Pejerrey', nombreEN: 'Silverside', cientifico: 'Odontesthes regia regia', descripcion: 'Especie artesanal del litoral peruano. Carne blanca y firme. Base de la gastronomía costeña peruana.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/pejerrey_1.webp', formatos: [FMT.IQF, FMT.BLOCK] },
  { id: 'anchoveta', nombre: 'Anchoveta', nombreEN: 'Peruvian Anchovy', cientifico: 'Engraulis ringens', descripcion: 'La especie más abundante del Pacífico sur. Base de la cadena trófica marina y de la industria harinera.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/anchoveta.webp', formatos: [FMT.BLOCK, FMT.IQF] },
  { id: 'bonito', nombre: 'Bonito', nombreEN: 'Pacific Bonito', cientifico: 'Sarda chiliensis', descripcion: 'Túnido de aguas frías del Perú. Carne oscura y robusta ideal para conservas y mercados asiáticos.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/Bonito.webp', formatos: [FMT.BLOCK, FMT.IQF] },
  { id: 'jurel', nombre: 'Jurel', nombreEN: 'Horse Mackerel', cientifico: 'Trachurus murphyi', descripcion: 'Pelágico de alta productividad. Exportado principalmente a mercados africanos y del este europeo.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/Jurel.webp', formatos: [FMT.BLOCK, FMT.IQF] },
  { id: 'caballa', nombre: 'Caballa', nombreEN: 'Mackerel', cientifico: 'Scomber japonicus', descripcion: 'Alto contenido en Omega-3. Ideal para conservas y filetes ahumados. Exportado entero o en filetes.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/Caballa.webp', formatos: [FMT.BLOCK, FMT.IQF] },
  { id: 'chiri', nombre: 'Chiri', nombreEN: 'Pacific Butterfish', cientifico: 'Peprilus medius', descripcion: 'Carne suave y de fácil digestión. Alta demanda en mercados asiáticos por su sabor neutro y textura delicada.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/Chiri.webp', formatos: [FMT.BLOCK, FMT.IQF] },
]

const MARISCOS: Producto[] = [
  { id: 'pulpo', nombre: 'Pulpo del Pacífico', nombreEN: 'Pacific Octopus', cientifico: 'Octopus spp.', descripcion: 'Capturado por pesquería artesanal. Cocido y limpiado en planta. Alta demanda en España, Japón y Corea.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/pulpo_pacifico.webp', formatos: [FMT.BLOCK, FMT.SKIN_PACK, FMT.TRAY, FMT.BAGS] },
  { id: 'langostinoCal', nombre: 'Langostino Californiensis', nombreEN: 'California Brown Shrimp', cientifico: 'Farfantepenaeus californiensis', descripcion: 'Camarón salvaje del norte peruano. Sabor intenso y dulce. Ruto hacia España, Italia y EE.UU.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/california.webp', formatos: [FMT.BLOCK, FMT.IQF] },
  { id: 'langostinoBlc', nombre: 'Langostino Blanco', nombreEN: 'White Shrimp', cientifico: 'Litopenaeus vannamei', descripcion: 'De acuicultura certificada. Consistencia uniforme y sabor neutro ideal para mercados de foodservice global.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/langostino_blanco.webp', formatos: [FMT.BLOCK, FMT.IQF] },
  { id: 'gambon', nombre: 'Gambón Argentino', nombreEN: 'Argentine Red Shrimp', cientifico: 'Pleoticus muelleri', descripcion: 'Captura silvestre en el Atlántico Sur. Dulzor superior y color rojo intenso que lo diferencia en el mercado premium.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/gambon_argentino.webp', formatos: [FMT.BLOCK, FMT.IQF] },
  { id: 'concha', nombre: 'Concha de Abanico', nombreEN: 'Peruvian Scallop', cientifico: 'Argopecten purpuratus', descripcion: 'La joya de la acuicultura peruana. Cultivada en la bahía de Sechura. Textura mantecosa y perfil de sabor dulce.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/concha_abanico_1.webp', formatos: [FMT.IQF] },
  { id: 'calamar', nombre: 'Calamar del Pacífico', nombreEN: 'Pacific Squid', cientifico: 'Loligo spp.', descripcion: 'Especie de talla menor que la pota. Textura más fina y terneza superior. Exportado a España y EE.UU.', imagen: 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/calamar_pacifico.webp', formatos: [FMT.BLOCK, FMT.IQF] },
]

// ─────────────────────────────────────────────────────────────────────────────
// SHARED LAYOUT CONSTANTS — Igual al resto del sitio
// ─────────────────────────────────────────────────────────────────────────────
const INNER = { maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' } as const
const NAVBAR_H = 72 // px — debe coincidir con la altura real del Navbar

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
type Tab = 'pota' | 'peces' | 'mariscos'
type SubTab = 'principal' | 'subproducto' | 'valorAgregado'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

// ─────────────────────────────────────────────────────────────────────────────
// SMALL COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function FormatoBadge({ f }: { f: Formato }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 10px', borderRadius: '9999px',
      fontSize: '10px', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
      color: f.color, background: f.bg, border: `1px solid ${f.color}30`,
    }}>
      {f.label}
    </span>
  )
}

function ProductCard({ p, index }: { p: Produto; index: number }) {
  const placeholder = `https://placehold.co/600x400/0d2137/00e5ff?text=${encodeURIComponent(p.nombreEN)}`
  const imgSrc = p.imagen ?? placeholder

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      style={{
        display: 'flex', flexDirection: 'column',
        borderRadius: '16px', overflow: 'hidden',
        border: '1px solid rgba(0,229,255,0.1)',
        background: '#0F1829',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
      }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,229,255,0.12)', borderColor: 'rgba(0,229,255,0.4)' } as never}
    >
      {/* Imagen */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#0d2137' }}>
        <Image
          src={imgSrc}
          alt={p.nombre}
          fill
          unoptimized={!p.imagen}
          style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0F1829 0%, transparent 55%)' }} />
        {p.destacado && (
          <div style={{
            position: 'absolute', top: '1rem', left: '1rem',
            display: 'flex', alignItems: 'center', gap: '6px',
            background: '#00E5FF', color: '#0A0F1F',
            fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' as const, letterSpacing: '0.15em',
            padding: '4px 12px', borderRadius: '9999px',
          }}>
            <Star size={10} fill="currentColor" />
            Producto Estrella
          </div>
        )}
      </div>

      {/* Contenido — padding uniforme de 2rem como el resto del sitio */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '2rem', gap: 0 }}>

        {/* Título — margen generoso abajo */}
        <div style={{ marginBottom: '1.25rem', overflow: 'hidden' }}>
          <h3 style={{
            fontFamily: "'Inter Tight', sans-serif", fontWeight: 900,
            fontSize: '1.25rem', lineHeight: 1.2, color: '#fff',
            marginBottom: '0.375rem',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {p.nombre}
          </h3>
          <p style={{ color: 'rgba(0,229,255,0.65)', fontSize: '12px', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {p.nombreEN} · <span style={{ color: '#8BA0B4' }}>{p.cientifico}</span>
          </p>
        </div>

        {/* Descripción */}
        <p style={{
          color: '#8BA0B4', fontSize: '0.9rem', lineHeight: 1.7, flex: 1,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as never, overflow: 'hidden',
          marginBottom: '1.5rem',
        }}>
          {p.descripcion}
        </p>

        {/* Formatos */}
        <div style={{ marginBottom: '1.75rem' }}>
          <p style={{ fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.18em', color: 'rgba(138,160,180,0.5)', fontWeight: 700, marginBottom: '0.625rem' }}>
            Formatos de exportación
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {p.formatos.map(f => <FormatoBadge key={f.label} f={f} />)}
          </div>
        </div>

        {/* CTA */}
        <button style={{
          marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          background: 'rgba(0,229,255,0.08)', color: '#00E5FF',
          border: '1px solid rgba(0,229,255,0.2)',
          borderRadius: '10px', padding: '0.875rem 1.5rem',
          fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer',
          transition: 'all 0.2s',
          width: '100%',
        }}>
          Ver Ficha Técnica <ArrowRight size={16} />
        </button>
      </div>
    </motion.article>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

// Workaround: alias para evitar error de TS en la función
type Produto = Producto

export default function CatalogoPage() {
  const { lang } = useLang()
  const [tab, setTab] = useState<Tab>('pota')
  const [subTab, setSubTab] = useState<SubTab>('principal')

  const TABS = [
    { id: 'pota' as Tab, label: 'Calamar Gigante', labelEN: 'Giant Squid', emoji: '🦑', count: POTA.length },
    { id: 'peces' as Tab, label: 'Peces', labelEN: 'Fish', emoji: '🐟', count: PECES.length },
    { id: 'mariscos' as Tab, label: 'Mariscos', labelEN: 'Shellfish & Octopus', emoji: '🦐', count: MARISCOS.length },
  ]

  const SUB_TABS = [
    { id: 'principal' as SubTab, label: 'Productos Principales', labelEN: 'Main Products' },
    { id: 'subproducto' as SubTab, label: 'Subproductos', labelEN: 'By-Products' },
    { id: 'valorAgregado' as SubTab, label: 'Valor Agregado', labelEN: 'Value Added' },
  ]

  const potaFiltrada = POTA.filter(p => p.subSeccion === subTab)

  return (
    <>
      <Navbar />

      {/* ── MAIN: paddingTop exacto a la altura del Navbar fijo ── */}
      <main style={{ minHeight: '100vh', background: '#0A0F1F', color: '#fff', paddingTop: `${NAVBAR_H}px` }}>

        {/* ═══ HERO ═══ */}
        <section style={{ padding: '3.5rem 0 5rem', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', borderRadius: '50%', opacity: 0.06, filter: 'blur(120px)', background: 'radial-gradient(circle, #00e5ff, transparent 70%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '400px', height: '400px', borderRadius: '50%', opacity: 0.04, filter: 'blur(100px)', background: 'radial-gradient(circle, #a78bfa, transparent 70%)' }} />
          </div>
          <div style={{ ...INNER, position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} style={{ marginBottom: '1.5rem' }}>
                <span className="highlight-tag">Catálogo Oficial 2026</span>
              </motion.div>
              <motion.h1 variants={fadeUp} style={{
                fontFamily: "'Inter Tight', sans-serif", fontWeight: 900,
                fontSize: 'clamp(2.25rem, 6vw, 4.5rem)', lineHeight: 1.05,
                letterSpacing: '-0.03em', marginBottom: '1.25rem',
              }}>
                Portafolio <span className="gradient-text">Marino</span>
              </motion.h1>
              <motion.p variants={fadeUp} style={{ color: '#8BA0B4', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
                {lang === 'es'
                  ? '+35 productos certificados BRCGS, HACCP y SMETA. Procesados en Paita, Perú para los mercados más exigentes del mundo.'
                  : '+35 products certified BRCGS, HACCP and SMETA. Processed in Paita, Peru for the world\'s most demanding markets.'}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ═══ TABS PRINCIPALES — Sticky Premium Centrado ═══ */}
        <div style={{
          position: 'sticky', top: `${NAVBAR_H}px`, zIndex: 40,
          background: 'rgba(10,15,31,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={INNER}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '3rem',
              overflowX: 'auto',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }} className="no-scrollbar">
              {TABS.map(t => {
                const isActive = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    style={{
                      position: 'relative',
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '1.5rem 0.5rem',
                      cursor: 'pointer', background: 'none', border: 'none',
                      color: isActive ? '#00E5FF' : '#8BA0B4',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                    }}
                  >
                    {/* Icono con Glass/Glow */}
                    <span style={{
                      fontSize: '1.75rem',
                      filter: isActive ? 'drop-shadow(0 0 12px rgba(0,229,255,0.5))' : 'grayscale(0.4) opacity(0.7)',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}>
                      {t.emoji}
                    </span>

                    <span style={{
                      fontSize: '1.125rem',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      whiteSpace: 'nowrap'
                    }}>
                      {lang === 'es' ? t.label : t.labelEN}
                    </span>

                    {/* Pill Badge */}
                    <span style={{
                      fontSize: '11px', fontWeight: 900,
                      padding: '3px 10px', borderRadius: '99px',
                      background: isActive ? 'rgba(0,229,255,0.15)' : 'rgba(255,255,255,0.03)',
                      color: isActive ? '#00E5FF' : '#5C7285',
                      border: isActive ? '1px solid rgba(0,229,255,0.2)' : '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.3s'
                    }}>
                      {t.count}
                    </span>

                    {/* Underline Interactivo (Premium Sliding Indicator) */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0,
                          height: '4px', background: '#00E5FF',
                          borderRadius: '12px 12px 0 0',
                          boxShadow: '0 -4px 15px rgba(0,229,255,0.4)'
                        }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ═══════════════════ POTA ═══════════════════ */}
          {tab === 'pota' && (
            <motion.div key="pota" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>

              {/* Hero Pota */}
              <section style={{ padding: '5rem 0' }}>
                <div style={INNER}>
                  <motion.div
                    initial="hidden" animate="visible" variants={stagger}
                    style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(0,229,255,0.12)', boxShadow: '0 0 80px -30px rgba(0,229,255,0.15)', background: 'linear-gradient(135deg, rgba(0,229,255,0.04), rgba(14,25,44,0.85) 50%, rgba(96,165,250,0.04))' }}
                  >
                    {/* flex-wrap: permite que baje en mobile */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                      <motion.div variants={fadeUp} style={{ position: 'relative', flex: '1 1 320px', aspectRatio: '1', overflow: 'hidden', minHeight: '280px' }}>
                        <Image src={STORAGE_URL + 'calamar_1.webp'} alt="Calamar Gigante Pota" fill style={{ objectFit: 'contain', padding: '2.5rem' }} priority sizes="(max-width:1024px) 100vw, 50vw" />
                        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
                      </motion.div>
                      <motion.div variants={fadeUp} style={{ flex: '1 1 320px', padding: '3rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#00E5FF', color: '#0A0F1F', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.18em', padding: '5px 14px', borderRadius: '9999px', marginBottom: '1.5rem' }}>
                          <Star size={11} fill="currentColor" /> Producto Estrella
                        </span>
                        <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.05, color: '#fff', marginBottom: '0.375rem' }}>
                          Calamar Gigante
                        </h2>
                        <h3 className="gradient-text" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.05, marginBottom: '0.875rem' }}>
                          Pota del Pacífico
                        </h3>
                        <p style={{ color: 'rgba(138,160,180,0.7)', fontStyle: 'italic', marginBottom: '1rem', fontSize: '1rem' }}>Dosidicus gigas</p>
                        <p style={{ color: '#8BA0B4', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2rem', maxWidth: '500px' }}>
                          Capturada en las aguas peruanas con flota propia (98% de cuota nacional). El calamar más grande del Pacífico sur. Procesado bajo estricta cadena de frío en nuestra planta certificada BRCGS AA en Paita.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                          {[FMT.BLOCK, FMT.IQF].map(f => <FormatoBadge key={f.label} f={f} />)}
                          <span style={{ fontSize: '12px', color: '#8BA0B4', fontWeight: 600 }}>+20 cortes</span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Sub-tabs — Centrados e Interactivos con Layout Animation */}
              <div style={{ ...INNER, marginBottom: '3.5rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '4px',
                  padding: '6px',
                  borderRadius: '18px',
                  background: 'rgba(15,24,41,0.9)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  {SUB_TABS.map(st => {
                    const isSubActive = subTab === st.id;
                    return (
                      <button
                        key={st.id}
                        onClick={() => setSubTab(st.id)}
                        style={{
                          position: 'relative',
                          padding: '12px 26px', borderRadius: '13px',
                          fontSize: '0.925rem', fontWeight: 800,
                          cursor: 'pointer', border: 'none', whiteSpace: 'nowrap',
                          color: isSubActive ? '#0A0F1F' : '#8BA0B4',
                          background: 'transparent',
                          transition: 'color 0.3s ease',
                          outline: 'none',
                        }}
                      >
                        {isSubActive && (
                          <motion.div
                            layoutId="subTabHighlight"
                            style={{
                              position: 'absolute', inset: 0,
                              background: '#00E5FF',
                              borderRadius: '13px',
                              zIndex: 0,
                              boxShadow: '0 4px 12px rgba(0,229,255,0.3)'
                            }}
                            transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                          />
                        )}
                        <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {lang === 'es' ? st.label : st.labelEN}
                          <span style={{
                            fontSize: '11px',
                            padding: '2px 6px',
                            borderRadius: '6px',
                            background: isSubActive ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)',
                            fontWeight: 900
                          }}>
                            {POTA.filter(p => p.subSeccion === st.id).length}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Grid Pota */}
              <div style={{ ...INNER, paddingBottom: '6rem' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={subTab}
                    initial="hidden" animate="visible" variants={stagger}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.75rem' }}
                  >
                    {potaFiltrada.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════ PECES ═══════════════════ */}
          {tab === 'peces' && (
            <motion.div key="peces" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <div style={{ ...INNER, paddingTop: '5rem', paddingBottom: '6rem' }}>
                <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                  <span className="highlight-tag" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>🐟 Especies Pelágicas y Demersales</span>
                  <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.1, color: '#fff', marginBottom: '1rem' }}>
                    Peces del Pacífico Sur
                  </h2>
                  <p style={{ color: '#8BA0B4', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>
                    Captura sostenible certificada. 8 especies de alta valorización para los mercados más exigentes.
                  </p>
                </motion.div>
                <motion.div initial="hidden" animate="visible" variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.75rem' }}>
                  {PECES.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════ MARISCOS ═══════════════════ */}
          {tab === 'mariscos' && (
            <motion.div key="mariscos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <div style={{ ...INNER, paddingTop: '5rem', paddingBottom: '6rem' }}>
                <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                  <span className="highlight-tag" style={{ marginBottom: '1.25rem', display: 'inline-block', borderColor: 'rgba(244,114,182,0.3)', background: 'rgba(244,114,182,0.08)', color: '#f472b6' }}>
                    🦐 Mariscos &amp; Cefalópodos
                  </span>
                  <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.1, color: '#fff', marginBottom: '1rem' }}>
                    Mariscos Selectos
                  </h2>
                  <p style={{ color: '#8BA0B4', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>
                    Desde el langostino artesanal hasta la concha de abanico de acuicultura certificada. La élite del mar peruano.
                  </p>
                </motion.div>
                <motion.div initial="hidden" animate="visible" variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.75rem' }}>
                  {MARISCOS.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
                </motion.div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ═══ CTA FINAL ═══ */}
        <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(180deg, rgba(0,229,255,0.03) 0%, transparent 100%)' }}>
          <div style={{ ...INNER, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="highlight-tag" style={{ marginBottom: '1.5rem' }}>¿Listo para cotizar?</span>
            <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.1, color: '#fff', marginBottom: '1.25rem', maxWidth: '600px' }}>
              Solicita tu cotización en menos de 24h
            </h2>
            <p style={{ color: '#8BA0B4', fontSize: '1.05rem', maxWidth: '520px', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Compártenos las especificaciones de volumen, empaque y destino y nuestro equipo comercial te responderá con una propuesta detallada.
            </p>
            <Link href="/contacto" className="btn-primary" style={{ fontSize: '0.875rem' }}>
              Solicitar Cotización <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
