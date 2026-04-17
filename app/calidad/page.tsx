'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, CheckCircle, FlaskConical, ShieldCheck, Microscope } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CertificationCarousel from '@/components/CertificationCarousel';
import { useLang } from '@/components/LanguageContext';

const STORAGE_URL = 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/'

const S = {
  section: { padding: '6rem 0', position: 'relative' as const },
  sectionBg: { padding: '3.5rem 0 6rem', background: '#1A2238', position: 'relative' as const, overflow: 'hidden' as const },
  inner: { maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' },
  innerNarrow: { maxWidth: '900px', margin: '0 auto', paddingInline: '1.5rem' },
  tag: { marginBottom: '1.5rem', display: 'inline-block' },
  h2: { fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.15, marginBottom: '1.5rem' },
};

const haccpSteps = [
  { n: '01', title: 'Análisis de Peligros', desc: 'Identificación de peligros biológicos, químicos y físicos en cada etapa del proceso.', icon: <Microscope size={22} /> },
  { n: '02', title: 'Puntos Críticos de Control', desc: 'Determinación y monitoreo continuo de CCPs en recepción, proceso y almacenamiento.', icon: <ShieldCheck size={22} /> },
  { n: '03', title: 'Límites Críticos', desc: 'Establecimiento y control de límites de temperatura, tiempo y microbiología en cada PCC.', icon: <FlaskConical size={22} /> },
  { n: '04', title: 'Monitoreo Continuo', desc: 'Sistema de vigilancia constante con registros digitales verificables en tiempo real.', icon: <CheckCircle size={22} /> },
  { n: '05', title: 'Acciones Correctivas', desc: 'Protocolos inmediatos ante cualquier desviación detectada en parámetros de calidad.', icon: <ShieldCheck size={22} /> },
  { n: '06', title: 'Verificación y Registros', desc: 'Auditorías internas periódicas y mantenimiento de registros 100% trazables.', icon: <CheckCircle size={22} /> },
];

const labTests = [
  { test: 'Análisis Físico-Organoléptico', freq: 'Cada lote', detail: 'Color, olor, textura y apariencia evaluados por panel certificado.' },
  { test: 'Análisis Microbiológico', freq: 'Por lote', detail: 'Recuento total, E. coli, Salmonella, Listeria según normativa internacional.' },
  { test: 'Control de Histamina', freq: 'Continuo', detail: 'Monitoreo crítico para especies histamínicas según FDA/EU regulation.' },
  { test: 'Metales Pesados', freq: 'Periódico', detail: 'Mercurio, cadmio, plomo y arsénico bajo límites EU/FDA.' },
  { test: 'Contaminantes', freq: 'Mensual', detail: 'Dioxinas, PCBs y pesticidas según regulación internacional.' },
  { test: 'Temperatura de Almacenamiento', freq: 'Cada hora', detail: 'Monitoreo automático 24/7 de todos los túneles y cámaras a -25°C.' },
];

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function CalidadPage() {
  const [openLab, setOpenLab] = useState<number | null>(null);
  const { lang, t } = useLang();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px' }}>

        {/* Hero */}
        <section style={{ ...S.sectionBg, minHeight: '380px', display: 'flex', alignItems: 'center' }}>
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />
          <div style={{ ...S.inner, position: 'relative', zIndex: 1 }}>
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}><span className="highlight-tag" style={S.tag}>{lang === 'es' ? 'Sistema de Calidad Total' : 'Total Quality System'}</span></motion.div>
              <motion.h1 variants={fadeUp} style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)', lineHeight: 1.08, color: '#fff', marginBottom: '1.5rem', maxWidth: '780px' }}>
                {lang === 'es' ? <>Calidad que <span className="gradient-text">inspira confianza</span></> : <>Quality that <span className="gradient-text">inspires confidence</span></>}
              </motion.h1>
              <motion.p variants={fadeUp} style={{ color: '#8BA0B4', fontSize: '1.1rem', maxWidth: '580px', lineHeight: 1.8 }}>
                {lang === 'es'
                  ? 'Nuestro sistema integrado garantiza que cada producto que exportamos cumple con las normativas más exigentes del mundo.'
                  : 'Our integrated system ensures that every product we export complies with the most demanding regulations in the world.'}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Certifications Carousel */}
        <section style={S.section}>
          <div style={S.innerNarrow}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <motion.div variants={fadeUp}><span className="highlight-tag" style={S.tag}>Aval Internacional</span></motion.div>
              <motion.h2 variants={fadeUp} style={S.h2}>
                Certificaciones <span className="gradient-text">globales</span>
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: '#8BA0B4', fontSize: '1rem', lineHeight: 1.75 }}>
                Haz clic en cada certificación para ver su alcance y los mercados que habilita.
              </motion.p>
            </motion.div>
            <CertificationCarousel />
          </div>
        </section>

        {/* HACCP Flow */}
        <section style={S.sectionBg}>
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
          <div style={{ ...S.inner, position: 'relative', zIndex: 1 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
              <motion.div variants={fadeUp}><span className="highlight-tag" style={S.tag}>HACCP</span></motion.div>
              <motion.h2 variants={fadeUp} style={S.h2}>
                Análisis de Peligros y<br />
                <span className="gradient-text">Puntos Críticos de Control</span>
              </motion.h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="md:grid-cols-2 lg:grid-cols-3">
              {haccpSteps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: 'rgba(26,34,56,0.6)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,229,255,0.12)', borderRadius: '18px',
                    padding: '2.25rem 2rem',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,255,0.4)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,255,0.12)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '44px', height: '44px', background: 'rgba(0,229,255,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00E5FF', flexShrink: 0 }}>
                      {step.icon}
                    </div>
                    <span style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: "'Inter Tight', sans-serif", color: 'rgba(0,229,255,0.25)', lineHeight: 1 }}>{step.n}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: '0.75rem' }}>{step.title}</h3>
                  <p style={{ color: '#8BA0B4', fontSize: '0.9rem', lineHeight: 1.8 }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lab Controls */}
        <section style={S.section}>
          <div style={S.innerNarrow}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <motion.div variants={fadeUp}><span className="highlight-tag" style={S.tag}>Control de Laboratorio</span></motion.div>
              <motion.h2 variants={fadeUp} style={S.h2}>
                Análisis en <span className="gradient-text">cada lote</span>
              </motion.h2>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {labTests.map((test, i) => (
                <motion.div
                  key={test.test}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    background: 'rgba(26,34,56,0.6)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0,229,255,0.12)', borderRadius: '14px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    style={{ width: '100%', padding: '1.4rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', gap: '1rem' }}
                    onClick={() => setOpenLab(openLab === i ? null : i)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '8px', height: '8px', background: '#00E5FF', borderRadius: '50%', flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{test.test}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.75rem', color: '#00E5FF', background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '9999px', padding: '3px 12px', display: 'none' }} className="sm:inline">
                        {test.freq}
                      </span>
                      <ChevronDown size={18} color="#8BA0B4" style={{ transform: openLab === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                    </div>
                  </button>
                  {openLab === i && (
                    <div style={{ paddingInline: '1.75rem', paddingBottom: '1.4rem' }}>
                      <p style={{ color: '#8BA0B4', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.5rem', borderLeft: '2px solid rgba(0,229,255,0.25)' }}>{test.detail}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* BPM & POES */}
        <section style={S.sectionBg}>
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
          <div style={{ ...S.inner, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="lg:grid-cols-2">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <span className="highlight-tag" style={S.tag}>BPM y POES</span>
                <h2 style={S.h2}>Buenas Prácticas de <span className="gradient-text">Manufactura</span></h2>
                <p style={{ color: '#8BA0B4', fontSize: '1rem', lineHeight: 1.85, marginBottom: '2rem' }}>
                  Cumplimiento estricto de las Buenas Prácticas de Manufactura (BPM) y Procedimientos Operacionales Estandarizados de Saneamiento (POES) en todas las áreas de nuestra planta.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    'Control higiénico de personal y equipos',
                    'Saneamiento y desinfección programada',
                    'Control de plagas certificado',
                    'Gestión de alérgenos',
                    'Control de materiales extraños',
                    'Calibración de equipos de medición',
                  ].map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                      <CheckCircle size={18} color="#00E5FF" style={{ flexShrink: 0 }} />
                      <span style={{ color: '#fff', fontSize: '0.97rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div style={{ position: 'relative', height: '420px', borderRadius: '20px', overflow: 'hidden' }}>
                  <video
                    src={STORAGE_URL + 'video_institucional_final.mp4'}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    poster={STORAGE_URL + 'news_planta.webp'}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,31,0.8) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
                    <div className="glass-card-strong" style={{ padding: '1rem 1.25rem' }}>
                      <p style={{ fontSize: '0.7rem', color: '#8BA0B4', marginBottom: '2px' }}>Planta Paita — Zona Industrial</p>
                      <p style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>Certificada BRCGS Grado AA</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '5rem 0' }}>
          <div style={{ ...S.innerNarrow, textAlign: 'center' }}>
            <h2 style={{ ...S.h2, textAlign: 'center' }}>¿Necesita documentación técnica?</h2>
            <p style={{ color: '#8BA0B4', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Nuestro equipo puede proveer fichas técnicas, certificados y especificaciones para cada producto según los requisitos de su mercado.
            </p>
            <Link href="/contacto" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              Solicitar documentación <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
