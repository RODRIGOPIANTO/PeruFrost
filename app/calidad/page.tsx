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
  { n: '01', title: 'Análisis de Peligros', titleEn: 'Hazard Analysis', desc: 'Identificación de peligros biológicos, químicos y físicos en cada etapa del proceso.', descEn: 'Identification of biological, chemical and physical hazards at each stage of the process.', icon: <Microscope size={22} /> },
  { n: '02', title: 'Puntos Críticos de Control', titleEn: 'Critical Control Points', desc: 'Determinación y monitoreo continuo de CCPs en recepción, proceso y almacenamiento.', descEn: 'Determination and continuous monitoring of CCPs in reception, processing and storage.', icon: <ShieldCheck size={22} /> },
  { n: '03', title: 'Límites Críticos', titleEn: 'Critical Limits', desc: 'Establecimiento y control de límites de temperatura, tiempo y microbiología en cada PCC.', descEn: 'Establishment and control of temperature, time and microbiology limits in each CCP.', icon: <FlaskConical size={22} /> },
  { n: '04', title: 'Monitoreo Continuo', titleEn: 'Continuous Monitoring', desc: 'Sistema de vigilancia constante con registros digitales verificables en tiempo real.', descEn: 'Constant surveillance system with digital records verifiable in real time.', icon: <CheckCircle size={22} /> },
  { n: '05', title: 'Acciones Correctivas', titleEn: 'Corrective Actions', desc: 'Protocolos inmediatos ante cualquier desviación detectada en parámetros de calidad.', descEn: 'Immediate protocols for any deviation detected in quality parameters.', icon: <ShieldCheck size={22} /> },
  { n: '06', title: 'Verificación y Registros', titleEn: 'Verification and Records', desc: 'Auditorías internas periódicas y mantenimiento de registros 100% trazables.', descEn: 'Periodic internal audits and maintenance of 100% traceable records.', icon: <CheckCircle size={22} /> },
];

const labTests = [
  { test: 'Análisis Físico-Organoléptico', testEn: 'Physical-Organoleptic Analysis', freq: 'Cada lote', freqEn: 'Each batch', detail: 'Color, olor, textura y apariencia evaluados por panel certificado.', detailEn: 'Color, smell, texture and appearance evaluated by certified panel.' },
  { test: 'Análisis Microbiológico', testEn: 'Microbiological Analysis', freq: 'Por lote', freqEn: 'Per batch', detail: 'Recuento total, E. coli, Salmonella, Listeria según normativa internacional.', detailEn: 'Total count, E. coli, Salmonella, Listeria according to international regulations.' },
  { test: 'Control de Histamina', testEn: 'Histamine Control', freq: 'Continuo', freqEn: 'Continuous', detail: 'Monitoreo crítico para especies histamínicas según FDA/EU regulation.', detailEn: 'Critical monitoring for histamine species according to FDA/EU regulation.' },
  { test: 'Metales Pesados', testEn: 'Heavy Metals', freq: 'Periódico', freqEn: 'Periodic', detail: 'Mercurio, cadmio, plomo y arsénico bajo límites EU/FDA.', detailEn: 'Mercury, cadmium, lead and arsenic under EU/FDA limits.' },
  { test: 'Contaminantes', testEn: 'Contaminants', freq: 'Mensual', freqEn: 'Monthly', detail: 'Dioxinas, PCBs y pesticidas según regulación internacional.', detailEn: 'Dioxins, PCBs and pesticides according to international regulation.' },
  { test: 'Temperatura de Almacenamiento', testEn: 'Storage Temperature', freq: 'Cada hora', freqEn: 'Hourly', detail: 'Monitoreo automático 24/7 de todos los túneles y cámaras a -25°C.', detailEn: '24/7 automatic monitoring of all tunnels and chambers at -25°C.' },
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
        <section style={{ ...S.sectionBg, minHeight: '380px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <Image 
            src={STORAGE_URL + 'sanipes.webp'} 
            alt="Calidad Hero" 
            fill 
            className="object-cover" 
            style={{ opacity: 0.2, zIndex: 0 }} 
            priority
          />
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.12, zIndex: 1 }} />
          <div style={{ ...S.inner, position: 'relative', zIndex: 2 }}>
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}><span style={{ ...S.tag, color: '#00E5FF', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>{t('calidad.hero.tag')}</span></motion.div>
              <motion.h1 variants={fadeUp} style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)', lineHeight: 1.08, color: '#fff', marginBottom: '1.5rem', maxWidth: '780px' }}>
                {t('calidad.hero.h1')} <span className="gradient-text">{t('calidad.hero.h1.accent')}</span>
              </motion.h1>
              <motion.p variants={fadeUp} style={{ color: '#8BA0B4', fontSize: '1.1rem', maxWidth: '580px', lineHeight: 1.8 }}>
                {t('calidad.hero.body')}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Certifications Carousel */}
        <section style={S.section}>
          <div style={S.innerNarrow}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <motion.div variants={fadeUp}><span style={{ ...S.tag, color: '#00E5FF', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>{t('calidad.certs.tag')}</span></motion.div>
              <motion.h2 variants={fadeUp} style={S.h2}>
                {t('calidad.certs.h2')} <span className="gradient-text">{t('calidad.certs.h2.accent')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: '#8BA0B4', fontSize: '1rem', lineHeight: 1.75 }}>
                {t('calidad.certs.body')}
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
              <motion.h2 variants={fadeUp} style={S.h2}>
                {t('calidad.haccp.h2')}<br />
                <span className="gradient-text">{t('calidad.haccp.h2.accent')}</span>
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
                  <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: '0.75rem' }}>{lang === 'es' ? step.title : step.titleEn}</h3>
                  <p style={{ color: '#8BA0B4', fontSize: '0.9rem', lineHeight: 1.8 }}>{lang === 'es' ? step.desc : step.descEn}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lab Controls */}
        <section style={S.section}>
          <div style={S.innerNarrow}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <motion.div variants={fadeUp}><span style={{ ...S.tag, color: '#00E5FF', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>{t('calidad.lab.tag')}</span></motion.div>
              <motion.h2 variants={fadeUp} style={S.h2}>
                {t('calidad.lab.h2')} <span className="gradient-text">{t('calidad.lab.h2.accent')}</span>
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
                      <span style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{lang === 'es' ? test.test : test.testEn}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.75rem', color: '#00E5FF', background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '9999px', padding: '3px 12px', display: 'none' }} className="sm:inline">
                        {lang === 'es' ? test.freq : test.freqEn}
                      </span>
                      <ChevronDown size={18} color="#8BA0B4" style={{ transform: openLab === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                    </div>
                  </button>
                  {openLab === i && (
                    <div style={{ paddingInline: '1.75rem', paddingBottom: '1.4rem' }}>
                      <p style={{ color: '#8BA0B4', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.5rem', borderLeft: '2px solid rgba(0,229,255,0.25)' }}>{lang === 'es' ? test.detail : test.detailEn}</p>
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
                <span style={{ ...S.tag, color: '#00E5FF', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>{t('calidad.bpm.tag')}</span>
                <h2 style={S.h2}>{t('calidad.bpm.h2')} <span className="gradient-text">{t('calidad.bpm.h2.accent')}</span></h2>
                <p style={{ color: '#8BA0B4', fontSize: '1rem', lineHeight: 1.85, marginBottom: '2rem' }}>
                  {t('calidad.bpm.body')}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {(lang === 'es' 
                    ? [
                      'Control higiénico de personal y equipos',
                      'Saneamiento y desinfección programada',
                      'Control de plagas certificado',
                      'Gestión de alérgenos',
                      'Control de materiales extraños',
                      'Calibración de equipos de medición',
                    ]
                    : [
                      'Hygienic control of personnel and equipment',
                      'Scheduled sanitation and disinfection',
                      'Certified pest control',
                      'Allergen management',
                      'Foreign material control',
                      'Calibration of measuring equipment',
                    ]
                  ).map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                      <CheckCircle size={18} color="#00E5FF" style={{ flexShrink: 0 }} />
                      <span style={{ color: '#fff', fontSize: '0.97rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              {/* Image removed as requested */}
            </div>
          </div>
        </section>

        {/* Marel Technology */}
        <section style={S.section}>
          <div style={S.inner}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="lg:grid-cols-2">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: -0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ order: 2 }} className="lg:order-1">
                <div style={{ position: 'relative', height: '480px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(0,229,255,0.2)', boxShadow: '0 0 40px rgba(0,229,255,0.1)' }}>
                  <Image src={STORAGE_URL + 'marel.webp'} alt="Línea de procesamiento JBT Marel" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ order: 1 }} className="lg:order-2">
                <span style={{ ...S.tag, color: '#00E5FF', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem' }}>{t('calidad.tech.tag')}</span>
                <h2 style={S.h2}>{t('calidad.tech.h2')} <span className="gradient-text">{t('calidad.tech.h2.accent')}</span></h2>
                <p style={{ color: '#8BA0B4', fontSize: '1rem', lineHeight: 1.85, marginBottom: '2rem' }}>
                  {t('calidad.tech.body')}
                </p>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>100%</div>
                    <div style={{ fontSize: '0.8rem', color: '#00E5FF', textTransform: 'uppercase' }}>{t('calidad.tech.traceable')}</div>
                  </div>
                  <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>0%</div>
                    <div style={{ fontSize: '0.8rem', color: '#00E5FF', textTransform: 'uppercase' }}>{t('calidad.tech.contamination')}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ ...S.sectionBg, padding: '6rem 0' }}>
          <div style={{ ...S.innerNarrow, textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{ ...S.h2, textAlign: 'center' }}>{t('calidad.doc.h2')}</h2>
            <p style={{ color: '#8BA0B4', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              {t('calidad.doc.body')}
            </p>
            <Link href="/contacto" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              {t('calidad.doc.btn')} <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
