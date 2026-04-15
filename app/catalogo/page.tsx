'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Package, Filter, Search, ChevronRight, Globe } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLang } from '@/components/LanguageContext'
import { pota, peces, mariscos, Producto } from '@/data/productos'
import PotaDiagram from '@/components/PotaDiagram'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function CatalogoPage() {
  const [filter, setFilter] = useState<'todos' | 'pota' | 'pez' | 'marisco'>('todos')
  const [searchTerm, setSearchTerm] = useState('')
  const { lang, t } = useLang()

  const categories = [
    { id: 'todos', label: lang === 'es' ? 'Todos' : 'All' },
    { id: 'pota', label: lang === 'es' ? 'Giant Squid' : 'Giant Squid' },
    { id: 'pez', label: lang === 'es' ? 'Peces' : 'Fish' },
    { id: 'marisco', label: lang === 'es' ? 'Mariscos' : 'Shellfish' },
  ]

  const filteredPeces = useMemo(() => 
    peces.filter(p => 
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.nombreEN.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm])

  const filteredMariscos = useMemo(() => 
    mariscos.filter(p => 
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.nombreEN.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm])

  return (
    <>
      <Navbar />
      <main className="bg-[#0A0F1F] text-white pt-[72px]">
        
        {/* HERO SECTION */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/recursos/planta.webp" 
              alt="Background" 
              fill 
              className="object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1F] via-transparent to-[#0A0F1F]" />
            <div className="grid-pattern absolute inset-0 opacity-20" />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-6">
                <span className="highlight-tag">
                  {lang === 'es' ? 'Catálogo Oficial 2026' : 'Official Catalog 2026'}
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="hero-title mb-6">
                {lang === 'es' ? 'Nuestro ' : 'Our '}
                <span className="gradient-text glow-cyan">Portafolio</span>
                {lang === 'es' ? ' Marino' : ' Portfolio'}
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-[#8BA0B4] text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                {lang === 'es' 
                  ? 'Más de 30 presentaciones de productos hidrobiológicos premium, procesados bajo los más altos estándares de inocuidad mundial (BRCGS AA).'
                  : 'More than 30 presentations of premium hydrobiological products, processed under the highest global safety standards (BRCGS AA).'}
              </motion.p>

              {/* FILTER BAR */}
              <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-center justify-center gap-4 bg-white/5 backdrop-blur-md p-2 rounded-2xl border border-white/10 max-w-4xl mx-auto">
                <div className="flex p-1 bg-white/5 rounded-xl w-full md:w-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilter(cat.id as any)}
                      className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                        filter === cat.id 
                        ? 'bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20' 
                        : 'text-[#8BA0B4] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
                
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8BA0B4]" size={18} />
                  <input 
                    type="text" 
                    placeholder={lang === 'es' ? 'Buscar producto...' : 'Search product...'}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0ea5e9]/50 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 🦑 GIANT SQUID SECTION */}
        <AnimatePresence mode="wait">
          {(filter === 'todos' || filter === 'pota') && !searchTerm && (
            <motion.section 
              key="pota-section"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="py-24 border-y border-white/5 bg-gradient-to-b from-transparent via-[#111827] to-transparent"
            >
              <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                  <div className="lg:w-1/2">
                    <div className="mb-10">
                      <span className="text-[#0ea5e9] font-black uppercase tracking-[0.2em] text-sm mb-4 block">Producto Estrella</span>
                      <h2 className="text-4xl lg:text-6xl font-black mb-6 font-tight">
                        Calamar <span className="gradient-text">Gigante</span>
                        <br /><span className="text-2xl text-[#8BA0B4] font-medium tracking-normal italic">Dosidicus gigas</span>
                      </h2>
                      <p className="text-[#8BA0B4] text-lg leading-relaxed mb-8">
                        La pota peruana es el recurso de mayor volumen de exportación en Perú Frost. 
                        Ofrecemos 20 cortes distintos divididos en productos principales, subproductos y valor agregado.
                      </p>
                    </div>
                    
                    <PotaDiagram cortes={[...(pota.cortes || []), ...(pota.subProductos || []), ...(pota.valorAgregado || [])]} />
                  </div>

                  <div className="lg:w-1/2 flex flex-col justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-card p-8 border-l-4 border-emerald-500">
                        <div className="bg-emerald-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                          <Package className="text-emerald-500" size={24} />
                        </div>
                        <h4 className="text-xl font-bold mb-4">Certificaciones</h4>
                        <ul className="space-y-3 text-[#8BA0B4]">
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> BRCGS Food Safety AA</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> HACCP Certified</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> FDA Registered</li>
                        </ul>
                      </div>
                      
                      <div className="glass-card p-8 border-l-4 border-[#0ea5e9]">
                        <div className="bg-[#0ea5e9]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                          <Globe className="text-[#0ea5e9]" size={24} />
                        </div>
                        <h4 className="text-xl font-bold mb-4">Mercados</h4>
                        <div className="flex flex-wrap gap-2">
                          {pota.mercados.map(m => (
                            <span key={m} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium border border-white/10">{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 space-y-8">
                      <div>
                        <h5 className="text-sm font-black uppercase text-[#8BA0B4] tracking-widest mb-6">Valor Agregado (Precocidos/IQF)</h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {pota.valorAgregado?.map(v => (
                            <div key={v.id} className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                              <span className="text-xl">{v.emoji}</span>
                              <span className="text-xs font-bold leading-tight">{v.nombre}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* 🐟 FISH SECTION */}
          {(filter === 'todos' || filter === 'pez') && filteredPeces.length > 0 && (
            <motion.section 
              key="peces-section"
              className="py-24 container mx-auto px-6"
            >
              <div className="mb-12">
                <h2 className="text-3xl lg:text-5xl font-black mb-4 font-tight">Peces / <span className="text-[#0ea5e9]">Fish</span></h2>
                <p className="text-[#8BA0B4]">Especies capturadas en las ricas aguas de la Corriente de Humboldt.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPeces.map((pez) => (
                  <ProductCard key={pez.id} producto={pez} />
                ))}
              </div>
            </motion.section>
          )}

          {/* 🦀 SHELLFISH SECTION */}
          {(filter === 'todos' || filter === 'marisco') && filteredMariscos.length > 0 && (
            <motion.section 
              key="mariscos-section"
              className="py-24 container mx-auto px-6 bg-white/[0.02] rounded-[40px]"
            >
              <div className="mb-12">
                <h2 className="text-3xl lg:text-5xl font-black mb-4 font-tight">Mariscos / <span className="text-[#0ea5e9]">Shellfish</span></h2>
                <p className="text-[#8BA0B4]">Cefalópodos y crustáceos de alta demanda internacional.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredMariscos.map((marisco) => (
                  <ProductCard key={marisco.id} producto={marisco} />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* CTA FINAL */}
        <section className="py-24 container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto glass-card p-12 lg:p-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Search size={120} className="text-[#0ea5e9]" />
              </div>
              <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">
                ¿Busca una <span className="gradient-text">especificación</span> propia?
              </h2>
              <p className="text-[#8BA0B4] text-lg mb-12 max-w-2xl mx-auto">
                Desarrollamos marcas propias (Private Label) y cortes a medida bajo sus requerimientos técnicos exactos.
              </p>
              <Link href="/contacto" className="btn-primary px-10 py-5 text-lg">
                Cotizar ahora <ArrowRight size={24} />
              </Link>
            </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function ProductCard({ producto }: { producto: Producto }) {
  return (
    <motion.div 
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="glass-card overflow-hidden group hover:border-[#0ea5e9]/50 transition-all duration-500 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden bg-white/5">
        {producto.imagen ? (
          <Image 
            src={producto.imagen} 
            alt={producto.nombre} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Package size={64} />
          </div>
        )}
        {producto.badge && (
          <div className="absolute top-4 left-4">
            <span 
              className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg"
              style={{ backgroundColor: producto.badgeColor || '#0ea5e9', color: '#fff' }}
            >
              {producto.badge}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <p className="text-[10px] text-[#0ea5e9] font-black uppercase tracking-widest mb-1 italic opacity-80">
          {producto.nombreCientifico}
        </p>
        <h3 className="text-xl font-black mb-4 group-hover:text-[#0ea5e9] transition-colors line-clamp-1">
          {producto.nombre}
        </h3>
        
        <div className="flex flex-wrap gap-1.5 mb-6">
          {producto.empaques.map(e => (
            <span key={e} className="text-[9px] font-bold px-2 py-0.5 bg-white/5 border border-white/10 rounded uppercase tracking-tighter text-[#8BA0B4]">
              {e}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <Link href="/contacto" className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all text-[#8BA0B4] hover:text-[#0ea5e9]">
            Ficha técnica <ChevronRight size={14} />
          </Link>
          <div className="flex items-center -space-x-1.5">
             <div className="w-5 h-5 rounded-full bg-white/10 border border-[#0A0F1F]" />
             <div className="w-5 h-5 rounded-full bg-white/10 border border-[#0A0F1F]" />
             <div className="w-5 h-5 rounded-full bg-white/10 border border-[#0A0F1F]" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
