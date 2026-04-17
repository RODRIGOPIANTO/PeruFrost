'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Thermometer, Droplets, Cpu, Ship, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLang } from '@/components/LanguageContext';

const S = {
  section: { padding: '6rem 0', position: 'relative' as const },
  sectionBg: { padding: '3.5rem 0 7rem', background: '#1A2238', position: 'relative' as const, overflow: 'hidden' as const },
  inner: { maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' },
  tag: { marginBottom: '1.5rem', display: 'inline-block' },
  h2: { fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.15, marginBottom: '1.5rem' },
};

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const STORAGE_URL = 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/'

const galleryImages = [
  { src: STORAGE_URL + 'planta.webp', caption: 'Planta principal — Zona Industrial Paita' },
  { src: STORAGE_URL + '120m.webp', caption: 'Instalaciones de alta tecnología' },
  { src: STORAGE_URL + 'planta_osmosis.webp', caption: 'Planta de ósmosis inversa — 2,000 m³/día' },
  { src: STORAGE_URL + 'merluza_premium.webp', caption: 'Flota pesquera — captura de merluza peruana' },
];

const techSpecs = [
  {
    category: 'Refrigeración', icon: <Thermometer size={24} />, title: 'Sistema IQF de Alta Performance',
    specs: [
      { label: 'Temperatura de almacenamiento', value: '-25°C' },
      { label: 'Capacidad total', value: '5,000 TM' },
      { label: 'Tipo de sistema', value: 'Túnel y placas' },
      { label: 'Tecnología', value: 'IQF Premium' },
    ],
    color: 'rgba(0,229,255,0.08)', border: 'rgba(0,229,255,0.25)',
  },
  {
    category: 'Agua Purificada', icon: <Droplets size={24} />, title: 'Planta de Ósmosis Inversa',
    specs: [
      { label: 'Capacidad diaria', value: '2,000 m³' },
      { label: 'Sistema', value: 'Ósmosis inversa' },
      { label: 'Propiedad', value: 'Propia' },
      { label: 'Uso', value: 'Proceso y CIP' },
    ],
    color: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.25)',
  },
  {
    category: 'Automatización', icon: <Cpu size={24} />, title: 'JBT Marel — Equipamiento',
    specs: [
      { label: 'Clasificadora', value: 'SmartLine' },
      { label: 'Clasificadora compacta', value: 'Compact Grader' },
      { label: 'Dosificador', value: 'SpeedBatcher' },
      { label: 'Beneficio', value: 'Reducción error humano' },
    ],
    color: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.25)',
  },
  {
    category: 'Acceso Marítimo', icon: <Ship size={24} />, title: 'Puerto Directo',
    specs: [
      { label: 'Muelle', value: 'Acceso directo' },
      { label: 'Descarga', value: 'Controlada' },
      { label: 'Ubicación', value: 'Paita, Piura' },
      { label: 'Zona', value: 'Industrial 1' },
    ],
    color: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)',
  },
];

export default function InfraestructuraPage() {
  const [galleryIdx, setGalleryIdx] = useState(0);
  const { lang } = useLang();
  const prev = () => setGalleryIdx((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setGalleryIdx((i) => (i + 1) % galleryImages.length);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px' }}>

        {/* Hero */}
        <section style={{ ...S.sectionBg, minHeight: '480px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <video
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
              src="/recursos/infra.mp4"
              autoPlay muted loop playsInline preload="auto"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,34,56,0.7), rgba(26,34,56,0.95))' }} />
          </div>
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />
          <div style={{ ...S.inner, position: 'relative', zIndex: 1 }}>
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}><span className="highlight-tag" style={S.tag}>{lang === 'es' ? 'Planta Paita — Piura' : 'Paita Plant — Piura'}</span></motion.div>
              <motion.h1 variants={fadeUp} style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)', lineHeight: 1.08, color: '#fff', marginBottom: '1.5rem', maxWidth: '780px' }}>
                {lang === 'es' ? <>Infraestructura de <span className="gradient-text">clase mundial</span></> : <>World-class <span className="gradient-text">infrastructure</span></>}
              </motion.h1>
              <motion.p variants={fadeUp} style={{ color: '#8BA0B4', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.8 }}>
                {lang === 'es'
                  ? 'Nuestra planta en la Zona Industrial de Paita combina tecnología de última generación con procesos certificados para garantizar la máxima inocuidad y eficiencia productiva.'
                  : 'Our plant in the Paita Industrial Zone combines latest-generation technology with certified processes to guarantee maximum safety and productive efficiency.'}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        <section style={S.section}>
          <div style={S.inner}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <motion.div variants={fadeUp}><span className="highlight-tag" style={S.tag}>Galería de Instalaciones</span></motion.div>
              <motion.h2 variants={fadeUp} style={S.h2}>
                Recorrido <span className="gradient-text">virtual</span>
              </motion.h2>
            </motion.div>

            {/* Main image */}
            <div style={{ position: 'relative', height: '480px', borderRadius: '24px', overflow: 'hidden', marginBottom: '1rem' }}>
              <Image
                src={galleryImages[galleryIdx].src} alt={`Instalación ${galleryIdx + 1}`} fill
                className="object-cover" style={{ transition: 'all 0.7s ease' }} sizes="100vw"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,31,0.8) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem' }}>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', fontFamily: "'Inter Tight', sans-serif" }}>{galleryImages[galleryIdx].caption}</p>
                <div style={{ display: 'flex', gap: '0.625rem', flexShrink: 0 }}>
                  <button onClick={prev} className="glass-card-strong" style={{ padding: '0.75rem', border: 'none', cursor: 'pointer', color: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={next} className="glass-card-strong" style={{ padding: '0.75rem', border: 'none', cursor: 'pointer', color: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
              {galleryImages.map((img, i) => (
                <button key={i} onClick={() => setGalleryIdx(i)} style={{
                  position: 'relative', height: '80px', borderRadius: '12px', overflow: 'hidden',
                  border: `2px solid ${i === galleryIdx ? '#00E5FF' : 'transparent'}`,
                  opacity: i === galleryIdx ? 1 : 0.6, cursor: 'pointer',
                  transition: 'all 0.3s ease', padding: 0, background: 'none',
                }}>
                  <Image src={img.src} alt={img.caption} fill className="object-cover" sizes="25vw" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Specs */}
        <section style={S.sectionBg}>
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
          <div style={{ ...S.inner, position: 'relative', zIndex: 1 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
              <motion.div variants={fadeUp}><span className="highlight-tag" style={S.tag}>Tecnología</span></motion.div>
              <motion.h2 variants={fadeUp} style={S.h2}>
                Equipamiento de <span className="gradient-text">vanguardia</span>
              </motion.h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="md:grid-cols-2">
              {techSpecs.map((tech, i) => (
                <motion.div
                  key={tech.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: tech.color, border: `1.5px solid ${tech.border}`,
                    borderRadius: '20px', padding: '2.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', marginBottom: '2rem' }}>
                    <div style={{ width: '52px', height: '52px', background: 'rgba(0,229,255,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00E5FF', flexShrink: 0 }}>
                      {tech.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.7rem', color: '#00E5FF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{tech.category}</p>
                      <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>{tech.title}</h3>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {tech.specs.map((spec) => (
                      <div key={spec.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <span style={{ color: '#8BA0B4', fontSize: '0.875rem' }}>{spec.label}</span>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem' }}>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Flota Section */}
        <section style={S.section}>
          <div style={S.inner}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="lg:grid-cols-2">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <span className="highlight-tag" style={S.tag}>{lang === 'es' ? 'Nuestra Flota' : 'Our Fleet'}</span>
                <h2 style={S.h2}>Embarcaciones propias para una <span className="gradient-text">pesca sostenible</span></h2>
                <p style={{ color: '#8BA0B4', fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '1.5rem' }}>
                  {lang === 'es'
                    ? 'Operamos con tres embarcaciones exclusivamente dedicadas a la pesca de merluza, asegurando así el cumplimiento del 11% de la cuota nacional en Perú.'
                    : 'We operate three vessels exclusively dedicated to hake fishing, ensuring compliance with 11% of the national quota in Peru.'}
                </p>
                <div style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.15)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem' }}>
                  <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Droplets size={18} color="#00E5FF" /> Tecnología de Preservación
                  </h4>
                  <p style={{ color: '#8BA0B4', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    {lang === 'es'
                      ? 'Nuestras bodegas de barcos están equipadas con sistemas innovadores de agua de mar refrigerada para mantener la frescura durante todo el viaje. Este método preservativo es completamente natural, sin químicos, asegurando la calidad y protegiendo el ecosistema.'
                      : 'Our ship holds are equipped with innovative refrigerated seawater systems to maintain freshness throughout the trip. This preservation method is completely natural, chemical-free, ensuring quality and protecting the ecosystem.'}
                  </p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div style={{ position: 'relative', height: '440px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <Image
                    src="/recursos/embarcacion_merluza.jpg"
                    alt="Flota pesquera de merluza"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,31,0.85) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
                    <div className="glass-card-strong" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', borderRadius: '16px' }}>
                      <div>
                        <p style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>3 Embarcaciones Industriales</p>
                        <p style={{ fontSize: '0.85rem', color: '#8BA0B4' }}>{lang === 'es' ? '11% de la cuota de Merluza Peruana' : '11% of the Peruvian Hake quota'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Three highlights */}
        <section style={S.section}>
          <div style={S.inner}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="md:grid-cols-3">
              {/* Ósmosis 2000m³ */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                style={{ background: 'rgba(26,34,56,0.6)', border: '1px solid rgba(0,229,255,0.15)', borderRadius: '20px', padding: '2.5rem 2rem', textAlign: 'center' }}>
                <div style={{ position: 'relative', height: '120px', borderRadius: '14px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <Image src={STORAGE_URL + 'news_osmosis.webp'} alt="Planta de ósmosis" fill className="object-cover" sizes="33vw" />
                </div>
                <div className="stat-number" style={{ fontSize: '2rem', marginBottom: '0.875rem' }}>2,000 m³</div>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: '0.875rem' }}>Planta de Ósmosis</p>
                <p style={{ color: '#8BA0B4', fontSize: '0.9rem', lineHeight: 1.75 }}>Capacidad diaria de producción de agua purificada para garantizar la inocuidad en todos los procesos.</p>
              </motion.div>
              {/* JBT Marel — con imagen de maquinaria */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                style={{ background: 'rgba(26,34,56,0.6)', border: '1px solid rgba(0,229,255,0.15)', borderRadius: '20px', padding: '2.5rem 2rem', textAlign: 'center' }}>
                <div style={{ position: 'relative', height: '120px', borderRadius: '14px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <Image src={STORAGE_URL + 'maquinaria_marel.webp'} alt="Maquinaria JBT Marel" fill className="object-cover" sizes="33vw" />
                </div>
                <p style={{ fontSize: '0.7rem', color: '#00E5FF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Automatización</p>
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#fff', marginBottom: '0.875rem' }}>JBT Marel</p>
                <p style={{ color: '#8BA0B4', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>Clasificadoras SmartLine y Compact Grader, más SpeedBatcher, optimizan el rendimiento y minimizan el error humano.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                  {['SmartLine', 'Compact Grader', 'SpeedBatcher'].map((eq) => (
                    <span key={eq} className="highlight-tag" style={{ fontSize: '0.7rem' }}>{eq}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Osmosis focus */}
        <section style={S.sectionBg}>
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
          <div style={{ ...S.inner, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="lg:grid-cols-2">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div style={{ position: 'relative', height: '380px', borderRadius: '20px', overflow: 'hidden' }}>
                  <Image src={STORAGE_URL + 'planta_osmosis.webp'} alt="Planta de ósmosis inversa" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <span className="highlight-tag" style={S.tag}>Agua de Proceso</span>
                <h2 style={S.h2}>Pureza garantizada en <span className="gradient-text">cada proceso</span></h2>
                <p style={{ color: '#8BA0B4', fontSize: '1rem', lineHeight: 1.85, marginBottom: '1.5rem' }}>
                  Nuestra planta de ósmosis inversa propia con capacidad de{' '}
                  <strong style={{ color: '#00E5FF' }}>2,000 m³ diarios</strong> garantiza que toda el agua utilizada en el procesamiento cumple con los estándares de pureza más exigentes a nivel internacional.
                </p>
                <p style={{ color: '#8BA0B4', fontSize: '1rem', lineHeight: 1.85 }}>
                  Esta infraestructura es un diferencial competitivo clave que nos permite garantizar la inocuidad total y mantener las certificaciones BRCGS AA, FDA y DG SANTE.
                </p>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Localización Google Maps — Planta exacta */}
        <section style={{ padding: '7rem 0', background: '#0D1326' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="highlight-tag" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>
                {lang === 'es' ? 'Nuestra Planta' : 'Our Plant'}
              </span>
              <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.15 }}>
                {lang === 'es' ? <>Encuéntranos en <span className="gradient-text">Paita, Piura</span></> : <>Find us in <span className="gradient-text">Paita, Piura</span></>}
              </h2>
              <p style={{ color: '#8BA0B4', marginTop: '1rem', fontSize: '1rem' }}>
                Av. Fortunato Chirichigno s/n, Zona Industrial — Paita, Piura, Perú
              </p>
            </div>
            <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(0,229,255,0.15)', boxShadow: '0 0 60px rgba(0,229,255,0.06)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.3155871547553!2d-81.11420312484658!3d-5.077000194886786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x90361e6f5b9c0001%3A0x5f0b86462a9b810!2sPer%C3%BA%20Frost%20S.A.C.!5e0!3m2!1ses-419!2spe!4v1714000000000!5m2!1ses-419!2spe"
                width="100%"
                height="520"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a
                href="https://maps.app.goo.gl/xdzzTju5SokJN8Ex9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', padding: '0.875rem 2rem' }}
              >
                📍 {lang === 'es' ? 'Ver en Google Maps' : 'Open in Google Maps'}
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '5rem 0' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', paddingInline: '1.5rem', textAlign: 'center' }}>
            <h2 style={{ ...S.h2, textAlign: 'center' }}>¿Le gustaría visitar nuestras instalaciones?</h2>
            <p style={{ color: '#8BA0B4', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Estamos listos para recibir a importadores y auditores internacionales en nuestra planta de Paita. Coordine su visita con nuestro equipo comercial.
            </p>
            <Link href="/contacto" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              Coordinar visita <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
