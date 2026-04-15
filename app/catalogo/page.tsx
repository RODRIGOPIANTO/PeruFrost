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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

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
      <main className="bg-[#0A0F1F] text-white pt-[72px]">

        {/* HERO */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/recursos/planta.webp" alt="Background" fill className="object-cover opacity-8" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1F] via-[#0A0F1F]/90 to-[#0A0F1F]" />
            <div className="grid-pattern absolute inset-0 opacity-15" />
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-6">
                <span className="highlight-tag">{lang === 'es' ? 'Catálogo Oficial 2026' : 'Official Catalog 2026'}</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="hero-title mb-6">
                {lang === 'es' ? 'Portafolio ' : 'Marine '}
                <span className="gradient-text glow-cyan">{lang === 'es' ? 'Marino' : 'Portfolio'}</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-[#8BA0B4] text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                {lang === 'es'
                  ? 'Más de 35 productos y presentaciones certificadas BRCGS, HACCP y SMETA. Procesados en Paita, Perú para los mercados más exigentes del mundo.'
                  : 'More than 35 products and presentations certified BRCGS, HACCP and SMETA. Processed in Paita, Peru for the world\'s most demanding markets.'}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* FILTER TABS */}
        <section className="sticky top-[72px] z-30 bg-[#0A0F1F]/90 backdrop-blur-lg border-b border-white/5 py-4">
          <div className="container mx-auto px-6">
            <div className="flex gap-3 flex-wrap justify-center">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-bold transition-all duration-300 ${
                    filter === cat.id
                      ? 'bg-[#0ea5e9] border-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20'
                      : 'bg-transparent border-white/10 text-[#8BA0B4] hover:border-white/25 hover:text-white'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ GIANT SQUID / POTA ══════════ */}
        {(filter === 'todos' || filter === 'pota') && (
          <section className="py-20 container mx-auto px-6">

            {/* HERO CARD DE POTA */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="mb-16 rounded-3xl overflow-hidden border border-[#0ea5e9]/20"
              style={{ background: 'linear-gradient(135deg, #0d1f3c 0%, #0a1628 100%)' }}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-80 lg:h-auto min-h-[380px]">
                  <Image src={pota.imagen!} alt={pota.nombre} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a1628]/60" />
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <span className="inline-block bg-[#0ea5e9]/15 border border-[#0ea5e9]/30 text-[#0ea5e9] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 w-fit">
                    {pota.badge}
                  </span>
                  <h2 className="text-4xl font-black mb-2" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                    🦑 {pota.nombre}
                  </h2>
                  <p className="text-[#0ea5e9] text-sm font-semibold italic mb-4">{pota.nombreCientifico}</p>
                  <p className="text-[#8BA0B4] leading-relaxed mb-6">{lang === 'es' ? pota.descripcion : 'Giant squid from FAO Zone 87 — Peru\'s flagship export product, processed under BRCGS Grade AA standards.'}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pota.empaques.map(e => (
                      <span key={e} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-white">
                        <Package size={11} className="inline mr-1 text-[#0ea5e9]" />{e}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pota.mercados.map(m => (
                      <span key={m} className="px-2 py-0.5 rounded text-[10px] text-[#8BA0B4] font-semibold border border-white/5">
                        <Globe size={9} className="inline mr-1" />{m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* TABLA DE CORTES */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Productos Principales */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#0ea5e9]" />
                  <h3 className="font-black text-white text-sm uppercase tracking-widest">
                    {lang === 'es' ? 'Productos Principales' : 'Main Products'}
                  </h3>
                </div>
                <div className="space-y-2">
                  {pota.cortes?.map(c => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/6 hover:border-[#0ea5e9]/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span>{c.emoji}</span>
                        <div>
                          <p className="text-sm font-semibold text-white">{c.nombre}</p>
                          <p className="text-[10px] text-[#8BA0B4] italic">{c.nombreEN}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#0ea5e9] bg-[#0ea5e9]/10 px-2 py-0.5 rounded">
                        {c.empaques.join(' / ')}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Subproductos */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                  <h3 className="font-black text-white text-sm uppercase tracking-widest">
                    {lang === 'es' ? 'Subproductos' : 'By-Products'}
                  </h3>
                </div>
                <div className="space-y-2">
                  {pota.subProductos?.map(c => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/6 hover:border-[#f59e0b]/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span>{c.emoji}</span>
                        <div>
                          <p className="text-sm font-semibold text-white">{c.nombre}</p>
                          <p className="text-[10px] text-[#8BA0B4] italic">{c.nombreEN}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#f59e0b] bg-[#f59e0b]/10 px-2 py-0.5 rounded">
                        {c.empaques.join(' / ')}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Valor Agregado */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#a855f7]" />
                  <h3 className="font-black text-white text-sm uppercase tracking-widest">
                    {lang === 'es' ? 'Valor Agregado' : 'Value Added'}
                  </h3>
                </div>
                <div className="space-y-2">
                  {pota.valorAgregado?.map(c => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/6 hover:border-[#a855f7]/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span>{c.emoji}</span>
                        <div>
                          <p className="text-sm font-semibold text-white">{c.nombre}</p>
                          <p className="text-[10px] text-[#8BA0B4] italic">{c.nombreEN}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#a855f7] bg-[#a855f7]/10 px-2 py-0.5 rounded">
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
          <section className="py-16 bg-[#060d1f]">
            <div className="container mx-auto px-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 text-center">
                <span className="highlight-tag mb-4 inline-block">🐟 {lang === 'es' ? 'Peces' : 'Fish'}</span>
                <h2 className="text-3xl font-black" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  {lang === 'es' ? 'Especies Pelágicas y Demersales' : 'Pelagic & Demersal Species'}
                </h2>
              </motion.div>
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
              >
                {peces.map(p => (
                  <motion.div
                    key={p.id} variants={fadeUp}
                    className="rounded-2xl overflow-hidden border border-white/6 hover:border-[#3b82f6]/30 transition-all duration-300 group"
                    style={{ background: '#0d1828' }}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <Image src={p.imagen!} alt={p.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1828] via-transparent" />
                      <span
                        className="absolute top-3 right-3 text-[10px] font-black px-2 py-1 rounded-md"
                        style={{ background: p.badgeColor + '22', border: `1px solid ${p.badgeColor}44`, color: p.badgeColor }}
                      >
                        {p.badge}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-black text-white text-base mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                        {p.nombre}
                      </h3>
                      <p className="text-[11px] text-[#0ea5e9] italic mb-2">{p.nombreEN} · <em className="text-[#8BA0B4]">{p.nombreCientifico}</em></p>
                      <p className="text-[#8BA0B4] text-xs leading-relaxed mb-3 line-clamp-2">{p.descripcion}</p>
                      <div className="flex flex-wrap gap-1">
                        {p.empaques.map(e => (
                          <span key={e} className="text-[10px] font-bold text-white/70 bg-white/5 px-2 py-0.5 rounded border border-white/8">
                            {e}
                          </span>
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
          <section className="py-16">
            <div className="container mx-auto px-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 text-center">
                <span className="highlight-tag mb-4 inline-block">🦐 {lang === 'es' ? 'Mariscos & Cefalópodos' : 'Shellfish & Cephalopods'}</span>
                <h2 className="text-3xl font-black" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                  {lang === 'es' ? 'Mariscos de Alta Demanda' : 'High-Demand Shellfish'}
                </h2>
              </motion.div>
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {mariscos.map(p => (
                  <motion.div
                    key={p.id} variants={fadeUp}
                    className="rounded-2xl overflow-hidden border border-white/6 hover:border-[#ec4899]/30 transition-all duration-300 group"
                    style={{ background: '#0d1828' }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image src={p.imagen!} alt={p.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1828] via-transparent" />
                      <span
                        className="absolute top-3 right-3 text-[10px] font-black px-2 py-1 rounded-md"
                        style={{ background: p.badgeColor + '22', border: `1px solid ${p.badgeColor}44`, color: p.badgeColor }}
                      >
                        {p.badge}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-black text-white text-base mb-0.5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                        {p.nombre}
                      </h3>
                      <p className="text-[11px] text-[#0ea5e9] italic mb-2">{p.nombreEN} · <em className="text-[#8BA0B4]">{p.nombreCientifico}</em></p>
                      <p className="text-[#8BA0B4] text-xs leading-relaxed mb-3">{p.descripcion}</p>
                      <div className="flex flex-wrap gap-1">
                        {p.empaques.map(e => (
                          <span key={e} className="text-[10px] font-bold text-white/70 bg-white/5 px-2 py-0.5 rounded border border-white/8">
                            {e}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {p.mercados.map(m => (
                          <span key={m} className="text-[9px] text-[#8BA0B4] bg-white/3 px-1.5 py-0.5 rounded border border-white/5">
                            <Globe size={8} className="inline mr-0.5" />{m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 bg-[#060d1f]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              {lang === 'es' ? '¿Listo para cotizar?' : 'Ready to get a quote?'}
            </h2>
            <p className="text-[#8BA0B4] mb-8 leading-relaxed">
              {lang === 'es'
                ? 'Contáctenos con sus especificaciones de empaque, volumen y destino. Nuestro equipo comercial le responderá en menos de 24 horas.'
                : 'Contact us with your packaging, volume and destination specs. Our commercial team will reply within 24 hours.'}
            </p>
            <Link href="/contacto" className="btn-primary text-base px-8 py-4">
              {lang === 'es' ? 'Solicitar cotización' : 'Request a quote'} <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
