'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight, Shield, Award, Globe, Thermometer, Package, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InteractiveGlobe from '@/components/InteractiveGlobe';
import CertificationCarousel from '@/components/CertificationCarousel';
import ColdChainTimeline from '@/components/ColdChainTimeline';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { useLang } from '@/components/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

const products = [
  {
    name: 'Calamar Gigante',
    nameEn: 'Giant Squid',
    latin: 'Dosidicus gigas',
    tag: 'Producto estrella', tagEn: 'Star product',
    description: 'Pota peruana de la Zona FAO 87, procesada bajo los más estrictos estándares internacionales. Amplio portafolio de cortes para diferentes mercados.',
    descriptionEn: 'Peruvian jumbo squid from FAO Zone 87, processed under the strictest international standards. Wide range of cuts for different markets.',
    specs: ['Tentáculos', 'Aletas', 'Filetes', 'Botones', 'Bloques 10kg/7kg', 'Sacos 20kg/21kg'],
    specsEn: ['Tentacles', 'Fins', 'Fillets', 'Buttons', '10kg/7kg Blocks', '20kg/21kg Bags'],
    image: '/recursos/producto_1.jpeg',
  },
  {
    name: 'Merluza',
    nameEn: 'Hake',
    latin: 'Merluccius gayi peruanus',
    tag: 'Alta demanda', tagEn: 'High demand',
    description: 'Filetes, HGT y enteras en procesos IQF y bloque para los mercados más exigentes. Capturada en las ricas aguas de la corriente de Humboldt.',
    descriptionEn: 'Fillets, HGT and whole fish in IQF and block processes for the most demanding markets. Caught in the rich Humboldt Current waters.',
    specs: ['Filetes con/sin piel', 'HGT', 'Entera', 'IQF o Bloque'],
    specsEn: ['Fillets with/without skin', 'HGT', 'Whole', 'IQF or Block'],
    image: '/recursos/producto_2.jpeg',
  },
  {
    name: 'Mahi Mahi',
    nameEn: 'Mahi Mahi',
    latin: 'Coryphaena hippurus',
    tag: 'Premium', tagEn: 'Premium',
    description: 'Perico peruano en filetes, porciones y lomos de la mejor calidad organoléptica. Altamente valorado en mercados Premium de Europa y EE.UU.',
    descriptionEn: 'Peruvian mahi mahi in fillets, portions and loins of the best organoleptic quality. Highly valued in premium markets in Europe and the US.',
    specs: ['Filetes', 'Porciones', 'Lomos', 'Con/sin piel'],
    specsEn: ['Fillets', 'Portions', 'Loins', 'With/without skin'],
    image: '/recursos/producto_3.jpeg',
  },
];

const coldChainSteps = [
  { icon: '🎣', labelEs: 'Captura', labelEn: 'Catch', subEs: 'Flota artesanal certificada', subEn: 'Certified artisanal fleet' },
  { icon: '🏭', labelEs: 'Recepción', labelEn: 'Reception', subEs: 'Control de temperatura inmediato', subEn: 'Immediate temperature control' },
  { icon: '❄️', labelEs: 'Congelado', labelEn: 'Frozen', subEs: 'Túnel y placas -25°C', subEn: 'Tunnel and plate -25°C' },
  { icon: '🔬', labelEs: 'Control Lab', labelEn: 'Lab Control', subEs: 'Análisis microbiológico', subEn: 'Microbiological analysis' },
  { icon: '📦', labelEs: 'Empaque', labelEn: 'Packaging', subEs: 'IQF o Block según spec', subEn: 'IQF or Block per spec' },
  { icon: '🚢', labelEs: 'Exportación', labelEn: 'Export', subEs: '+56 países de destino', subEn: '+56 destination countries' },
];

export default function HomePage() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLang();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (parallaxRef.current) {
      const img = parallaxRef.current.querySelector('.parallax-img') as Element;
      if (img) {
        gsap.to(img, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px' }}>
        {/* ═══ HERO — Video fullscreen ═══ */}
        <section style={{ position: 'relative', height: 'calc(100vh - 72px)', minHeight: '640px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <video
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            src="/recursos/video_institucional.mp4"
            autoPlay muted loop playsInline preload="auto"
            poster="/recursos/planta.webp"
          />
          <div className="video-overlay" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.25 }} />

          <div ref={heroTextRef} style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} style={{ marginBottom: '1.75rem' }}>
                <span className="highlight-tag" style={{ fontSize: '0.78rem' }}>{t('hero.tag')}</span>
              </motion.div>

              <motion.h1 variants={fadeUp} style={{
                fontFamily: "'Inter Tight', sans-serif", fontWeight: 900,
                fontSize: 'clamp(2.2rem, 7vw, 5.5rem)',
                lineHeight: 1.08, color: '#fff',
                marginBottom: '1.75rem',
              }}>
                {t('hero.h1a')}{' '}
                <span className="gradient-text glow-cyan">{t('hero.h1b')}</span>{' '}
                <span className="gradient-text glow-cyan">{t('hero.h1c')}</span>{' '}
                <span style={{ color: '#fff' }}>{t('hero.h1d')}</span>
              </motion.h1>

              <motion.p variants={fadeUp} style={{
                color: '#8BA0B4', fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                maxWidth: '640px', margin: '0 auto', marginBottom: '2.5rem',
                lineHeight: 1.75,
              }}>
                {t('hero.sub')}{' '}
                <strong style={{ color: '#00E5FF' }}>{t('hero.countries')}</strong>.
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                <Link href="/catalogo" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
                  {t('hero.btn1')} <ArrowRight size={18} />
                </Link>
                <Link href="/contacto" className="btn-outline" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
                  {t('hero.btn2')}
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span style={{ fontSize: '0.7rem', color: '#8BA0B4', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>{t('hero.scroll')}</span>
            <ChevronDown color="#00E5FF" size={20} />
          </motion.div>
        </section>

        {/* ═══ STATS ═══ */}
        <section style={{ padding: '5rem 0', background: '#1A2238', borderTop: '1px solid rgba(0,229,255,0.08)', borderBottom: '1px solid rgba(0,229,255,0.08)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }} className="lg:grid-cols-4">
              <AnimatedCounter end={20} prefix="+" label={t('stats.years')} sublabel={t('stats.years.sub')} icon={<Award size={28} />} />
              <AnimatedCounter end={56} prefix="+" label={t('stats.countries')} sublabel={t('stats.countries.sub')} icon={<Globe size={28} />} />
              <AnimatedCounter end={5500} prefix="+" suffix=" TM" label={t('stats.capacity')} sublabel={t('stats.capacity.sub')} icon={<Thermometer size={28} />} />
              <AnimatedCounter end={200} prefix="+" label={t('stats.clients')} sublabel={t('stats.clients.sub')} icon={<Shield size={28} />} />
            </div>
          </div>
        </section>

        {/* ═══ QUALITY PARALLAX ═══ */}
        <section ref={parallaxRef} style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="lg:grid-cols-2">

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ position: 'relative', height: '480px', borderRadius: '20px', overflow: 'hidden' }}
                className="order-2 lg:order-1"
              >
                <div className="parallax-img" style={{ position: 'absolute', top: '-60px', bottom: '-60px', left: 0, right: 0 }}>
                  <Image src="/recursos/planta.webp" alt="Planta Perú Frost Paita" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,31,0.8) 0%, transparent 60%)', zIndex: 1 }} />
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', zIndex: 2 }}>
                  <div className="glass-card-strong" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(0,229,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Shield color="#00E5FF" size={20} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.7rem', color: '#8BA0B4', marginBottom: '2px' }}>{lang === 'es' ? 'Certificación más alta' : 'Highest certification'}</p>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', fontFamily: "'Inter Tight', sans-serif" }}>BRCGS Food Safety — Grado AA</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={stagger}
                className="order-1 lg:order-2"
              >
                <motion.div variants={fadeUp}>
                  <span className="highlight-tag" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>{t('quality.tag')}</span>
                </motion.div>
                <motion.h2 variants={fadeUp} style={{
                  fontFamily: "'Inter Tight', sans-serif", fontWeight: 900,
                  fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', lineHeight: 1.15,
                  marginBottom: '1.75rem',
                }}>
                  {t('quality.h2a')}{' '}
                  <span className="gradient-text">{t('quality.h2b')}</span>{' '}
                  {t('quality.h2c')}
                </motion.h2>
                <motion.p variants={fadeUp} style={{ color: '#8BA0B4', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                  {t('quality.body')}
                </motion.p>

                <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.75rem' }}>
                  {[
                    lang === 'es' ? 'HACCP en todas las etapas del proceso' : 'HACCP at every stage of the process',
                    lang === 'es' ? 'Trazabilidad 100% digital desde la captura' : '100% digital traceability from catch',
                    lang === 'es' ? 'Análisis de laboratorio en cada lote' : 'Laboratory analysis on every batch',
                    lang === 'es' ? 'Proveedores evaluados y certificados' : 'Evaluated and certified suppliers',
                  ].map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <CheckCircle color="#00E5FF" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: '#fff', fontSize: '1rem', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Link href="/calidad" className="btn-primary">
                    {t('quality.btn')} <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ COLD CHAIN ═══ */}
        <section style={{ padding: '7rem 0', background: '#1A2238', position: 'relative', overflow: 'hidden' }}>
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
          <div style={{ maxWidth: '1100px', margin: '0 auto', paddingInline: '1.5rem', position: 'relative', zIndex: 1 }}>
            {/* Heading */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <motion.div variants={fadeUp}>
                <span className="highlight-tag" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>{t('cold.tag')}</span>
              </motion.div>
              <motion.h2 variants={fadeUp} style={{
                fontFamily: "'Inter Tight', sans-serif", fontWeight: 900,
                fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', lineHeight: 1.15,
                marginBottom: '1.25rem',
              }}>
                {t('cold.h2a')}{' '}
                <span className="gradient-text">-25°C</span>
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: '#8BA0B4', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8 }}>
                {t('cold.body')}
              </motion.p>
            </motion.div>

            {/* Interactive Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <ColdChainTimeline />
            </motion.div>
          </div>
        </section>

        {/* ═══ PRODUCTS SHOWCASE ═══ */}
        <section style={{ padding: '7rem 0' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <motion.div variants={fadeUp}>
                <span className="highlight-tag" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>{t('products.tag')}</span>
              </motion.div>
              <motion.h2 variants={fadeUp} style={{
                fontFamily: "'Inter Tight', sans-serif", fontWeight: 900,
                fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', lineHeight: 1.15,
                marginBottom: '1.25rem',
              }}>
                {t('products.h2a')}{' '}
                <span className="gradient-text">{t('products.h2b')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: '#8BA0B4', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto', lineHeight: 1.8 }}>
                {t('products.body')}
              </motion.p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {products.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8 }}
                  className="glass-card product-card"
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr' }} className={`lg:grid-cols-2 ${i % 2 !== 0 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    {/* Image */}
                    <div style={{ position: 'relative', height: '320px', overflow: 'hidden', flexShrink: 0 }}>
                      <Image
                        src={product.image} alt={product.name} fill
                        className="object-cover"
                        style={{ transition: 'transform 0.7s ease' }}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: i % 2 !== 0 ? 'linear-gradient(to right, transparent, rgba(10,15,31,0.3))' : 'linear-gradient(to left, transparent, rgba(10,15,31,0.3))',
                      }} />
                      <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
                        <span className="highlight-tag">{lang === 'es' ? product.tag : product.tagEn}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0' }}>
                      <p style={{ color: '#8BA0B4', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '0.75rem' }}>{product.latin}</p>
                      <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', color: '#fff', marginBottom: '1.25rem' }}>
                        {lang === 'es' ? product.name : product.nameEn}
                      </h3>
                      <p style={{ color: '#8BA0B4', fontSize: '0.97rem', lineHeight: 1.8, marginBottom: '1.75rem' }}>
                        {lang === 'es' ? product.description : product.descriptionEn}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                        {(lang === 'es' ? product.specs : product.specsEn).map((spec) => (
                          <span key={spec} style={{
                            fontSize: '0.8rem', fontWeight: 500, color: '#fff',
                            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                            padding: '0.4rem 0.875rem', borderRadius: '8px',
                            transition: 'all 0.2s',
                          }}>
                            {spec}
                          </span>
                        ))}
                      </div>
                      <div>
                        <Link href="/catalogo" className="btn-outline" style={{ display: 'inline-flex', fontSize: '0.875rem' }}>
                          {t('products.sheet')} <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/catalogo" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                {t('products.all')} <Package size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ INTERACTIVE GLOBE ═══ */}
        <section style={{ padding: '7rem 0', background: '#1A2238', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 65%)', pointerEvents: 'none', borderRadius: '50%' }} />
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.12 }} />
          <div style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem', position: 'relative', zIndex: 1 }}>
            <InteractiveGlobe />
          </div>
        </section>

        {/* ═══ CERTIFICATIONS ═══ */}
        <section style={{ padding: '7rem 0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', paddingInline: '1.5rem' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <motion.div variants={fadeUp}>
                <span className="highlight-tag" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>{t('certs.tag')}</span>
              </motion.div>
              <motion.h2 variants={fadeUp} style={{
                fontFamily: "'Inter Tight', sans-serif", fontWeight: 900,
                fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.15, marginBottom: '1rem',
              }}>
                {t('certs.h2a')}{' '}
                <span className="gradient-text">{t('certs.h2b')}</span>{' '}
                {t('certs.h2c')}
              </motion.h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <CertificationCarousel />
            </motion.div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/calidad" className="btn-outline">
                {t('certs.btn')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section style={{ padding: '7rem 0', background: '#1A2238', position: 'relative', overflow: 'hidden' }}>
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 65%)', pointerEvents: 'none', borderRadius: '50%' }} />
          <div style={{ maxWidth: '800px', margin: '0 auto', paddingInline: '1.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="highlight-tag" style={{ marginBottom: '1.75rem', display: 'inline-block' }}>{t('cta.tag')}</span>
              </motion.div>
              <motion.h2 variants={fadeUp} style={{
                fontFamily: "'Inter Tight', sans-serif", fontWeight: 900,
                fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem',
              }}>
                {t('cta.h2')}
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: '#8BA0B4', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem' }}>
                {t('cta.body')}
              </motion.p>
              <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                <Link href="/contacto" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                  {t('cta.btn1')} <ArrowRight size={20} />
                </Link>
                <Link href="/infraestructura" className="btn-outline" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                  {t('cta.btn2')}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
