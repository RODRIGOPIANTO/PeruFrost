'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, X, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLang } from '@/components/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

interface Product {
  id: string;
  nameEs: string; nameEn: string;
  latin: string;
  tagEs: string; tagEn: string;
  originEs: string; originEn: string;
  descEs: string; descEn: string;
  formatsEs: string[]; formatsEn: string[];
  packaging: string[];
  image: string;
  marketsEs: string[]; marketsEn: string[];
}

const allProducts: Product[] = [
  {
    id: 'pota',
    nameEs: 'Calamar Gigante (Pota)', nameEn: 'Giant Squid (Pota)',
    latin: 'Dosidicus gigas',
    tagEs: 'Producto Principal', tagEn: 'Main Product',
    originEs: 'Zona FAO 87 — Perú', originEn: 'FAO Zone 87 — Peru',
    descEs: 'La pota peruana es nuestro producto estrella. Capturada en las ricas aguas del Pacífico Sur, procesada bajo estrictos estándares BRCGS.',
    descEn: 'Peruvian giant squid is our flagship product. Caught in the rich waters of the South Pacific, processed under strict BRCGS standards.',
    formatsEs: ['Tentáculos', 'Aletas', 'Filetes', 'Botones', 'Tubos', 'Manto'],
    formatsEn: ['Tentacles', 'Wings', 'Fillets', 'Buttons', 'Tubes', 'Mantle'],
    packaging: ['Block 10 kg', 'Block 7 kg', 'Saco 20 kg', 'IQF'],
    image: '/recursos/producto_1.jpeg',
    marketsEs: ['China', 'España', 'Japón', 'EE.UU.', 'Corea', 'Tailandia'],
    marketsEn: ['China', 'Spain', 'Japan', 'USA', 'Korea', 'Thailand'],
  },
  {
    id: 'merluza',
    nameEs: 'Merluza', nameEn: 'Hake',
    latin: 'Merluccius gayi peruanus',
    tagEs: 'Alta Demanda', tagEn: 'High Demand',
    originEs: 'Zona FAO 87 — Perú', originEn: 'FAO Zone 87 — Peru',
    descEs: 'Merluza peruana de alta calidad para mercados europeos y americanos. Procesada con equipos JBT Marel de clasificación automática.',
    descEn: 'High quality Peruvian hake for European and American markets. Processed with JBT Marel automatic grading equipment.',
    formatsEs: ['Filetes con piel', 'Filetes sin piel', 'HGT', 'Entera'],
    formatsEn: ['Skin-on fillets', 'Skinless fillets', 'HGT', 'Whole'],
    packaging: ['IQF', 'Block 10 kg', 'Block 5 kg', 'Vacuum pack'],
    image: '/recursos/producto_2.jpeg',
    marketsEs: ['España', 'Portugal', 'Francia', 'EE.UU.', 'Brasil'],
    marketsEn: ['Spain', 'Portugal', 'France', 'USA', 'Brazil'],
  },
  {
    id: 'mahi-mahi',
    nameEs: 'Mahi Mahi (Perico)', nameEn: 'Mahi Mahi',
    latin: 'Coryphaena hippurus',
    tagEs: 'Premium', tagEn: 'Premium',
    originEs: 'Océano Pacífico — Perú', originEn: 'Pacific Ocean — Peru',
    descEs: 'Apreciado en mercados premium por sabor y textura superiores. Presentaciones de alta gama para restaurantes y distribuidores.',
    descEn: 'Appreciated in premium markets for superior flavor and texture. High-end presentations for restaurants and distributors.',
    formatsEs: ['Filetes', 'Porciones', 'Lomos'],
    formatsEn: ['Fillets', 'Portions', 'Loins'],
    packaging: ['IQF', 'Vacuum pack', 'Block 10 kg'],
    image: '/recursos/producto_3.jpeg',
    marketsEs: ['EE.UU.', 'Canadá', 'Japón', 'Australia'],
    marketsEn: ['USA', 'Canada', 'Japan', 'Australia'],
  },
];

export default function CatalogoPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { lang, t } = useLang();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px' }}>
        {/* HERO */}
        <section style={{ padding: '6rem 0', background: '#1A2238', position: 'relative', overflow: 'hidden' }}>
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="highlight-tag" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
                  {lang === 'es' ? 'Portafolio 2026' : 'Portfolio 2026'}
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, color: '#fff', marginBottom: '1.5rem' }}>
                {lang === 'es' ? <>Catálogo de <span className="gradient-text">Productos</span></> : <>Product <span className="gradient-text">Catalog</span></>}
              </motion.h1>
              <motion.p variants={fadeUp} style={{ color: '#8BA0B4', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
                {lang === 'es'
                  ? 'Productos hidrobiológicos de alta calidad procesados en Paita. Tamaños, cortes y especificaciones exactas según su requerimiento.'
                  : 'High quality hydrobiological products processed in Paita. Exact sizes, cuts and specifications according to your requirements.'}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* PRODUCTS */}
        <div style={{ padding: '7rem 0' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8rem' }}>
            {allProducts.map((product, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={product.id} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="lg:grid-cols-2">
                  
                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                    style={{ order: isEven ? 1 : 2 }} className={!isEven ? 'lg:order-2' : ''}
                  >
                    <div style={{ position: 'relative', height: '400px', borderRadius: '24px', overflow: 'hidden' }}>
                      <Image src={product.image} alt={lang === 'es' ? product.nameEs : product.nameEn} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,31,0.85) 0%, transparent 60%)' }} />
                      <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {(lang === 'es' ? product.formatsEs : product.formatsEn).slice(0, 4).map(f => (
                            <span key={f} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.75rem', padding: '4px 12px', borderRadius: '9999px', fontWeight: 600 }}>{f}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Info */}
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ order: isEven ? 2 : 1 }} className={!isEven ? 'lg:order-1' : ''}>
                    <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <span className="highlight-tag">{lang === 'es' ? product.tagEs : product.tagEn}</span>
                      <span style={{ fontSize: '0.8rem', color: '#8BA0B4', fontWeight: 600 }}>{lang === 'es' ? product.originEs : product.originEn}</span>
                    </motion.div>
                    <motion.p variants={fadeUp} style={{ color: '#8BA0B4', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>{product.latin}</motion.p>
                    <motion.h2 variants={fadeUp} style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#fff', marginBottom: '1.25rem', lineHeight: 1.1 }}>
                      {lang === 'es' ? product.nameEs : product.nameEn}
                    </motion.h2>
                    <motion.p variants={fadeUp} style={{ color: '#8BA0B4', fontSize: '1rem', lineHeight: 1.85, marginBottom: '2.5rem' }}>
                      {lang === 'es' ? product.descEs : product.descEn}
                    </motion.p>
                    
                    <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '2.5rem' }}>
                      <div>
                        <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8BA0B4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                          {lang === 'es' ? 'Empaques' : 'Packaging'}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {product.packaging.map(p => (
                            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.85rem' }}>
                              <Package size={14} color="#00E5FF" /> {p}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                         <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8BA0B4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                          {lang === 'es' ? 'Mercados' : 'Markets'}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {(lang === 'es' ? product.marketsEs : product.marketsEn).map(m => (
                            <span key={m} style={{ background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.2)', color: '#00E5FF', fontSize: '0.75rem', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>{m}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem' }}>
                      <button onClick={() => setSelectedProduct(product)} className="btn-primary">
                        {lang === 'es' ? 'Ficha técnica' : 'Spec Sheet'} <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>

        {/* CTA global */}
        <section style={{ padding: '6rem 0', background: '#1A2238', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', paddingInline: '1.5rem' }}>
            <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: '2.5rem', marginBottom: '1.5rem' }}>
              {lang === 'es' ? '¿Busca una especificación distinta?' : 'Looking for a different specification?'}
            </h2>
            <p style={{ color: '#8BA0B4', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
              {lang === 'es' ? 'Contáctenos para desarrollar un producto a su medida.' : 'Contact us to develop a product customized to your needs.'}
            </p>
            <Link href="/contacto" className="btn-primary">
              {t('nav.cta')}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
