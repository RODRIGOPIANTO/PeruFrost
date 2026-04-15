'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Package, Globe } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/components/LanguageContext'
import { pota, peces, mariscos } from '@/data/productos'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

type FilterType = 'todos' | 'pota' | 'pez' | 'marisco'

export default function CatalogoPage() {
  const [filter, setFilter] = useState<FilterType>('todos')
  const { lang } = useLang()

  const categories = [
    { id: 'todos' as FilterType, label: lang === 'es' ? 'Todos los Productos' : 'All Products', emoji: '🌊' },
    { id: 'pota' as FilterType, label: lang === 'es' ? 'Calamar Gigante' : 'Giant Squid', emoji: '🦑' },
    { id: 'pez' as FilterType, label: lang === 'es' ? 'Peces' : 'Fish', emoji: '🐟' },
    { id: 'marisco' as FilterType, label: lang === 'es' ? 'Mariscos' : 'Shellfish', emoji: '🦐' },
  ]

  return (
    <>
      <Navbar />
      <main className="bg-[#0A0F1F] text-white pt-[72px] min-h-screen flex flex-col">

        {/* ─── SCALABLE HERO ─── */}
        <section className="relative flex-none flex flex-col items-center justify-center py-20 lg:py-32 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <Image src="/recursos/planta.webp" alt="Background" fill className="object-cover opacity-[0.07]" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1F] via-[#0A0F1F]/80 to-[#0A0F1F]" />
            <div className="grid-pattern absolute inset-0 opacity-[0.12]" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl w-full">
              <motion.div variants={fadeUp} className="mb-6 lg:mb-8">
                <span className="inline-block bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0ea5e9] text-xs lg:text-sm font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                  {lang === 'es' ? 'Catálogo Oficial 2026' : 'Official Catalog 2026'}
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 lg:mb-8 tracking-tight font-tight">
                {lang === 'es' ? 'Portafolio ' : 'Marine '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#0ea5e9] drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  {lang === 'es' ? 'Marino' : 'Portfolio'}
                </span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-[#8BA0B4] text-base md:text-lg lg:text-xl leading-relaxed mx-auto max-w-2xl px-4">
                {lang === 'es'
                  ? 'Más de 35 productos y presentaciones certificadas BRCGS, HACCP y SMETA. Procesados en Paita, Perú para los mercados más exigentes del mundo.'
                  : 'More than 35 products and presentations certified BRCGS, HACCP and SMETA. Processed in Paita, Peru for the world\'s most demanding markets.'}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── RESPONSIVE FILTER TABS ─── */}
        <section className="sticky top-[72px] z-40 bg-[#0A0F1F]/90 backdrop-blur-md border-b border-white/5 py-4 lg:py-5 shadow-2xl">
          <div className="container mx-auto px-4 sm:px-6 overflow-x-auto hide-scrollbar">
            <div className="flex gap-2 sm:gap-4 flex-nowrap w-max sm:w-auto sm:justify-center mx-auto pb-1 sm:pb-0">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-bold transition-colors whitespace-nowrap hover:scale-[1.02] active:scale-[0.98] ${
                    filter === cat.id
                      ? 'bg-[#0ea5e9] border-[#0ea5e9] text-white shadow-[0_4px_20px_-4px_rgba(14,165,233,0.4)]'
                      : 'bg-white/5 border-white/10 text-[#8BA0B4] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-base">{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="flex-1">
          {/* ══════════ GIANT SQUID / POTA ══════════ */}
          {(filter === 'todos' || filter === 'pota') && (
            <section className="py-16 lg:py-24 container mx-auto px-4 sm:px-6">

              {/* HERO CARD DE POTA */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp}
                className="mb-12 lg:mb-20 rounded-3xl overflow-hidden border border-[#0ea5e9]/20 bg-gradient-to-br from-[#0d1f3c] to-[#0a1628] shadow-[0_0_50px_-20px_rgba(14,165,233,0.15)]"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Contenedor de Imagen adaptativo */}
                  <div className="relative w-full lg:w-1/2 aspect-video lg:aspect-auto lg:min-h-[480px]">
                    <Image src={pota.imagen!} alt={pota.nombre} fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0a1628] lg:from-transparent to-transparent lg:to-[#0a1628]/80" />
                  </div>
                  
                  {/* Detalles T\u00e9cnicos */}
                  <div className="flex flex-col justify-center w-full lg:w-1/2 p-6 sm:p-8 lg:p-12">
                    <div className="mb-6">
                      <span className="inline-block bg-[#0ea5e9]/10 text-[#0ea5e9] border border-[#0ea5e9]/30 text-xs font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-md">
                        {pota.badge}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 text-white font-tight leading-none tracking-tight flex items-center gap-3">
                      <span>🦑</span> {pota.nombre}
                    </h2>
                    <p className="text-[#0ea5e9] text-base font-semibold italic mb-6">{pota.nombreCientifico}</p>
                    
                    <p className="text-[#8BA0B4] text-base lg:text-lg leading-relaxed mb-8">
                       {lang === 'es' ? pota.descripcion : 'Giant squid from FAO Zone 87 — Peru\'s flagship export product, processed under BRCGS Grade AA standards.'}
                    </p>
                    
                    <div className="flex flex-col gap-5">
                      <div>
                        <h4 className="text-xs uppercase font-bold text-white/50 mb-2 tracking-widest">{lang === 'es' ? 'Presentaciones' : 'Presentations'}</h4>
                        <div className="flex flex-wrap gap-2">
                          {pota.empaques.map(e => (
                            <div key={e} className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-bold text-white">
                              <Package size={14} className="text-[#0ea5e9]" />
                              <span>{e}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs uppercase font-bold text-white/50 mb-2 tracking-widest">{lang === 'es' ? 'Mercados Principales' : 'Main Markets'}</h4>
                        <div className="flex flex-wrap gap-2">
                          {pota.mercados.map(m => (
                            <div key={m} className="flex items-center gap-1 bg-[#0ea5e9]/5 border border-[#0ea5e9]/10 px-2.5 py-1 rounded md text-xs text-[#0ea5e9] font-medium">
                              <Globe size={12} />
                              <span>{m}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* GRID DE CORTES ESTRUCTURADA EN CARDS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                
                {/* Columna: Productos Principales */}
                <div className="bg-[#0b192c] border border-white/5 rounded-3xl p-6 lg:p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                    <div className="w-4 h-4 rounded-full bg-[#0ea5e9]" />
                    <h3 className="font-black text-white text-base uppercase tracking-widest">
                      {lang === 'es' ? 'Productos Principales' : 'Main Products'}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {pota.cortes?.map(c => (
                      <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-[#0ea5e9]/30 transition-all group">
                        <div className="flex items-center gap-3.5">
                          <span className="text-xl group-hover:scale-110 transition-transform">{c.emoji}</span>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-white leading-tight mb-0.5">{c.nombre}</span>
                            <span className="text-[11px] text-[#8BA0B4] italic leading-tight">{c.nombreEN}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-[#0ea5e9] bg-[#0ea5e9]/10 px-2.5 py-1 rounded-md max-w-[80px] text-center leading-tight">
                          {c.empaques.join(' / ')}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Columna: Subproductos */}
                <div className="bg-[#0b192c] border border-white/5 rounded-3xl p-6 lg:p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                    <div className="w-4 h-4 rounded-full bg-[#f59e0b]" />
                    <h3 className="font-black text-white text-base uppercase tracking-widest">
                      {lang === 'es' ? 'Subproductos' : 'By-Products'}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {pota.subProductos?.map(c => (
                      <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-[#f59e0b]/30 transition-all group">
                        <div className="flex items-center gap-3.5">
                          <span className="text-xl group-hover:scale-110 transition-transform">{c.emoji}</span>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-white leading-tight mb-0.5">{c.nombre}</span>
                            <span className="text-[11px] text-[#8BA0B4] italic leading-tight">{c.nombreEN}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-[#f59e0b] bg-[#f59e0b]/10 px-2.5 py-1 rounded-md max-w-[80px] text-center leading-tight">
                          {c.empaques.join(' / ')}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Columna: Valor Agregado */}
                <div className="bg-[#0b192c] border border-white/5 rounded-3xl p-6 lg:p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                    <div className="w-4 h-4 rounded-full bg-[#a855f7]" />
                    <h3 className="font-black text-white text-base uppercase tracking-widest">
                      {lang === 'es' ? 'Valor Agregado' : 'Value Added'}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {pota.valorAgregado?.map(c => (
                      <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-[#a855f7]/30 transition-all group">
                        <div className="flex items-center gap-3.5">
                          <span className="text-xl group-hover:scale-110 transition-transform">{c.emoji}</span>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-white leading-tight mb-0.5">{c.nombre}</span>
                            <span className="text-[11px] text-[#8BA0B4] italic leading-tight">{c.nombreEN}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-[#a855f7] bg-[#a855f7]/10 px-2.5 py-1 rounded-md max-w-[80px] text-center leading-tight">
                          {c.empaques.join(' / ')}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
          )}

          {/* ══════════ PECES / FISH ══════════ */}
          {(filter === 'todos' || filter === 'pez') && (
            <section className="py-16 lg:py-24 bg-[#0a1628] border-y border-white/5">
              <div className="container mx-auto px-4 sm:px-6">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10 lg:mb-16 text-center flex flex-col items-center">
                  <span className="highlight-tag mb-4">🐟 {lang === 'es' ? 'Peces' : 'Fish'}</span>
                  <h2 className="text-3xl md:text-5xl font-black font-tight tracking-tight">
                    {lang === 'es' ? 'Especies Pelágicas y Demersales' : 'Pelagic & Demersal Species'}
                  </h2>
                </motion.div>
                
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {peces.map(p => (
                    <motion.div key={p.id} variants={fadeUp} className="bg-[#0b192c] rounded-3xl overflow-hidden border border-white/5 hover:border-[#3b82f6]/40 transition-colors duration-300 flex flex-col group">
                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#060c17]">
                        <Image src={p.imagen!} alt={p.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c] via-[#0b192c]/20 to-transparent" />
                        <span className="absolute top-4 right-4 text-[10px] font-black uppercase px-2.5 py-1 rounded bg-[#0b192c]/80 backdrop-blur-sm border" style={{ borderColor: `${p.badgeColor}40`, color: p.badgeColor }}>
                          {p.badge}
                        </span>
                      </div>
                      <div className="p-6 lg:p-8 flex flex-col flex-1">
                        <h3 className="font-black text-white text-xl mb-1 font-tight tracking-tight">{p.nombre}</h3>
                        <p className="text-[11px] text-[#0ea5e9] mb-4 bg-[#0ea5e9]/10 w-fit px-2 py-0.5 rounded italic">
                          {p.nombreEN} · <span className="text-[#8BA0B4] ml-1">{p.nombreCientifico}</span>
                        </p>
                        <p className="text-[#8BA0B4] text-sm leading-relaxed mb-6 flex-1">{p.descripcion}</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {p.empaques.map(e => (
                             <span key={e} className="text-[10px] font-bold text-white bg-white/5 px-2.5 py-1 rounded-md border border-white/10 uppercase">{e}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          )}

          {/* ══════════ MARISCOS / SHELLFISH ══════════ */}
          {(filter === 'todos' || filter === 'marisco') && (
            <section className="py-16 lg:py-24">
              <div className="container mx-auto px-4 sm:px-6">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10 lg:mb-16 text-center flex flex-col items-center">
                  <span className="highlight-tag mb-4">🦐 {lang === 'es' ? 'Mariscos & Cefalópodos' : 'Shellfish & Cephalopods'}</span>
                  <h2 className="text-3xl md:text-5xl font-black font-tight tracking-tight">
                    {lang === 'es' ? 'Productos de Alta Demanda' : 'High-Demand Products'}
                  </h2>
                </motion.div>
                
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {mariscos.map(p => (
                    <motion.div key={p.id} variants={fadeUp} className="bg-[#0a1628] rounded-3xl overflow-hidden border border-white/5 hover:border-[#ec4899]/40 transition-colors duration-300 flex flex-col group">
                      <div className="relative w-full aspect-video sm:aspect-[4/3] overflow-hidden bg-[#060c17]">
                        <Image src={p.imagen!} alt={p.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/20 to-transparent" />
                        <span className="absolute top-4 right-4 text-[10px] font-black uppercase px-2.5 py-1 rounded bg-[#0a1628]/80 backdrop-blur-sm border" style={{ borderColor: `${p.badgeColor}40`, color: p.badgeColor }}>
                          {p.badge}
                        </span>
                      </div>
                      <div className="p-6 lg:p-8 flex flex-col flex-1">
                        <h3 className="font-black text-white text-xl mb-1 font-tight tracking-tight">{p.nombre}</h3>
                        <p className="text-[11px] text-[#ec4899] mb-4 bg-[#ec4899]/10 w-fit px-2 py-0.5 rounded italic">
                          {p.nombreEN} · <span className="text-[#8BA0B4] ml-1">{p.nombreCientifico}</span>
                        </p>
                        <p className="text-[#8BA0B4] text-sm leading-relaxed mb-6 flex-1">{p.descripcion}</p>
                        
                        <div className="flex flex-col gap-3 mt-auto">
                          <div className="flex flex-wrap gap-2">
                            {p.empaques.map(e => (
                              <span key={e} className="text-[10px] font-bold text-white bg-white/5 px-2.5 py-1 rounded-md border border-white/10 uppercase">{e}</span>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                            {p.mercados.map(m => (
                              <span key={m} className="flex items-center gap-1 text-[10px] text-[#8BA0B4] font-medium">
                                <Globe size={11} className="text-[#0ea5e9]" />{m}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          )}
        </div>

        {/* ─── SCALABLE CTA ─── */}
        <section className="py-20 lg:py-32 bg-[#060c17] flex-none">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6 font-tight tracking-tight">
                {lang === 'es' ? '¿Listo para cotizar?' : 'Ready to get a quote?'}
              </h2>
              <p className="text-[#8BA0B4] text-lg lg:text-xl mb-10 leading-relaxed max-w-2xl">
                {lang === 'es'
                  ? 'Contáctenos con sus especificaciones de empaque, volumen y destino. Nuestro equipo comercial le responderá en menos de 24 horas.'
                  : 'Contact us with your packaging, volume and destination specs. Our commercial team will reply within 24 hours.'}
              </p>
              <Link href="/contacto" className="btn-primary text-base md:text-lg px-10 py-5 w-full sm:w-auto flex justify-center">
                {lang === 'es' ? 'Solicitar cotización' : 'Request a quote'} <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

