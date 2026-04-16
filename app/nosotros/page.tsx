'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Globe, Award, Shield, Leaf, CheckCircle, Star, Users, Package, Anchor } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLang } from '@/components/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const milestones = [
  {
    year: '2001', icon: '🚢', title: 'Fundación en Paita',
    desc: 'Inicio de operaciones en la costa norte del Perú, con visión exportadora desde el primer día. Primeros embarques hacia mercados asiáticos.',
    stats: 'Costa norte · Puerto de Paita',
  },
  {
    year: '2008', icon: '🌍', title: 'Expansión Internacional',
    desc: 'Primeras exportaciones directas a mercados europeos. Consolidación del modelo de trazabilidad completa desde la captura hasta el consumidor final.',
    stats: '+12 países de destino',
  },
  {
    year: '2015', icon: '🏆', title: 'Certificación BRCGS',
    desc: 'Obtención de la certificación BRCGS Food Safety, considerada el estándar de oro en inocuidad alimentaria. Hito que abrió las puertas a los mercados más exigentes.',
    stats: 'Estándar de oro de la industria',
  },
  {
    year: '2018', icon: '🏭', title: 'Nueva Planta Yantai Moon',
    desc: 'Inauguración de la planta de última generación en la Zona Industrial de Paita, equipada con tecnología Yantai Moon: túneles IQF, prensas de placas y sistema HACCP digital.',
    stats: '5 min del Puerto · 120m² de cámara',
  },
  {
    year: '2021', icon: '📋', title: 'Constitución S.A.C.',
    desc: 'Consolidación jurídica como PERÚ FROST S.A.C. con RUC 20607856517. Inicio de nueva etapa de crecimiento y acceso a nuevos mercados regulados.',
    stats: 'RUC 20607856517 · Lima, Perú',
  },
  {
    year: '2024', icon: '⭐', title: 'BRCGS Grado AA',
    desc: 'Renovación de BRCGS con calificación Grado AA — la más alta posible en la industria pesquera mundial. Reconocimiento a años de trabajo y disciplina operativa.',
    stats: 'Grado AA · Máxima calificación',
  },
];

const values = [
  {
    icon: <Shield size={28} />, title: 'Integridad', color: '#00E5FF',
    desc: 'Actuamos con honestidad y transparencia en cada relación comercial. La confianza de nuestros clientes es nuestra mayor responsabilidad.',
    bullets: ['Contratos claros y cumplidos', 'Trazabilidad total documentada', 'Comunicación proactiva ante imprevistos'],
  },
  {
    icon: <Award size={28} />, title: 'Excelencia', color: '#6EE7FA',
    desc: 'Exigimos los más altos estándares de calidad en cada etapa del proceso, desde la captura en el Pacífico hasta la entrega en destino.',
    bullets: ['BRCGS Grado AA — la más alta calificación', 'Análisis en laboratorio propio por lote', 'Equipos JBT Marel y Yantai Moon de última generación'],
  },
  {
    icon: <Heart size={28} />, title: 'Compromiso', color: '#00E5FF',
    desc: 'Comprometidos con nuestros clientes, proveedores, colaboradores y las comunidades pesqueras artesanales del norte del Perú.',
    bullets: ['Flota artesanal certificada y en régimen justo', 'Condiciones laborales dignas en planta', 'Apoyo a comunidades de Paita y alrededores'],
  },
  {
    icon: <Globe size={28} />, title: 'Visión Global', color: '#6EE7FA',
    desc: 'Pensamos en escala global actuando con conocimiento local. Exportamos a +20 países porque entendemos lo que cada mercado exige.',
    bullets: ['+20 países de destino directo', 'Equipo multilingüe (ES, EN, ZH)', 'Adaptación de especificaciones por mercado'],
  },
  {
    icon: <Leaf size={28} />, title: 'Sostenibilidad', color: '#10B981',
    desc: 'Gestionamos nuestros recursos con responsabilidad ambiental, participando activamente en el FIP de la pota peruana liderado por CAPECAL.',
    bullets: ['Miembro FIP pota — CAPECAL', 'Certificación MarinTrust activa', 'Reducción de descarte y uso integral'],
  },
];

const stats = [
  { icon: <Package size={20} />, value: '+200', label: 'Clientes activos' },
  { icon: <Globe size={20} />, value: '+20', label: 'Países de destino' },
  { icon: <Star size={20} />, value: '20+', label: 'Años de experiencia' },
  { icon: <Users size={20} />, value: '150+', label: 'Colaboradores' },
  { icon: <Anchor size={20} />, value: '-25°C', label: 'Temp. garantizada' },
];

const STORAGE_URL = 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/'

export default function NosotrosPage() {
  const { lang } = useLang();

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px' }}>

        {/* ─── HERO ─── */}
        <section style={{ padding: '6rem 0 5rem', background: '#1A2238', position: 'relative', overflow: 'hidden' }}>
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem', position: 'relative', zIndex: 1 }}>
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="highlight-tag" style={{ marginBottom: '1.75rem', display: 'inline-block' }}>
                  {lang === 'es' ? 'Empresa 100% Peruana' : '100% Peruvian Company'}
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} style={{
                fontFamily: "'Inter Tight', sans-serif", fontWeight: 900,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.08,
                color: '#fff', marginBottom: '1.75rem', maxWidth: '800px',
              }}>
                {lang === 'es' ? <>Más de 20 años de{' '}<span className="gradient-text">excelencia pesquera</span></> : <>Over 20 years of{' '}<span className="gradient-text">fishing excellence</span></>}
              </motion.h1>
              <motion.p variants={fadeUp} style={{ color: '#8BA0B4', fontSize: '1.15rem', maxWidth: '640px', lineHeight: 1.85, marginBottom: '3rem' }}>
                {lang === 'es'
                  ? 'Somos una empresa 100% peruana dedicada a procesar y exportar los mejores productos hidrobiológicos del mar peruano al mundo, con los más altos estándares de calidad, inocuidad y sostenibilidad.'
                  : 'We are a 100% Peruvian company dedicated to processing and exporting the finest hydrobiological products from the Peruvian sea to the world, with the highest standards of quality, safety and sustainability.'}
              </motion.p>

              {/* Stat bar */}
              <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                {stats.map((s) => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{ color: '#00E5FF' }}>{s.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: '1.35rem', color: '#fff', lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: '0.72rem', color: '#8BA0B4', marginTop: '1px' }}>{s.label}</div>
                    </div>
                    <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.1)', marginLeft: '0.5rem' }} />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── MISSION & VISION ─── */}
        <section style={{ padding: '7rem 0' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="highlight-tag" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>
                {lang === 'es' ? 'Nuestro Propósito' : 'Our Purpose'}
              </span>
              <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.15 }}>
                {lang === 'es' ? <>Por qué <span className="gradient-text">existimos</span></> : <>Why we <span className="gradient-text">exist</span></>}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                style={{ background: 'rgba(0,229,255,0.04)', border: '1.5px solid rgba(0,229,255,0.2)', borderRadius: '24px', padding: '2rem', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
                <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>🎯</div>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#00E5FF', display: 'block', marginBottom: '0.75rem' }}>
                  {lang === 'es' ? 'Misión' : 'Mission'}
                </span>
                <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: '1.4rem', color: '#fff', marginBottom: '1rem', lineHeight: 1.25 }}>
                  {lang === 'es' ? 'Satisfacer necesidades nutricionales de manera óptima' : 'Optimally satisfy nutritional needs'}
                </h3>
                <p style={{ color: '#8BA0B4', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  {lang === 'es'
                    ? 'Satisfacer las necesidades nutricionales de manera óptima y garantizar siempre la frescura, el sabor y la seguridad en cada uno de nuestros productos a nivel global.'
                    : 'To optimally satisfy nutritional needs and always guarantee freshness, flavor and safety in each of our products globally.'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {(lang === 'es'
                    ? ['Calidad certificada BRCGS Grado AA', 'Trazabilidad completa de cada lote', 'Cadena de frío -25°C garantizada', 'Especificaciones exactas por mercado']
                    : ['BRCGS Grade AA certified quality', 'Full traceability for every batch', 'Guaranteed -25°C cold chain', 'Exact specifications per market']
                  ).map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <CheckCircle size={14} color="#00E5FF" style={{ flexShrink: 0 }} />
                      <span style={{ color: '#fff', fontSize: '0.82rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                style={{ background: 'rgba(99,102,241,0.04)', border: '1.5px solid rgba(99,102,241,0.25)', borderRadius: '24px', padding: '2rem', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
                <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>🌟</div>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#818CF8', display: 'block', marginBottom: '0.75rem' }}>
                  {lang === 'es' ? 'Visión' : 'Vision'}
                </span>
                <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: '1.4rem', color: '#fff', marginBottom: '1rem', lineHeight: 1.25 }}>
                  {lang === 'es' ? 'Líderes indiscutibles en la industria pesquera' : 'Undisputed leaders in the fishing industry'}
                </h3>
                <p style={{ color: '#8BA0B4', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  {lang === 'es'
                    ? 'En nuestra visión, nos proyectamos como líderes indiscutibles en la industria pesquera. Buscamos ser reconocidos nacional e internacionalmente por nuestra calidad incomparable, sostenibilidad e innovación para superar las expectativas.'
                    : 'In our vision, we project ourselves as undisputed leaders in the fishing industry. We seek to be recognized nationally and internationally for our incomparable quality, sustainability and innovation to exceed expectations.'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {(lang === 'es'
                    ? ['Presencia en los 5 continentes', 'Referente de buenas prácticas del sector', 'Tecnología de vanguardia en cada proceso', 'Modelo de sostenibilidad replicable']
                    : ['Presence on all 5 continents', 'Reference for industry best practices', 'Cutting-edge technology in every process', 'Replicable sustainability model']
                  ).map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <Star size={14} color="#818CF8" style={{ flexShrink: 0 }} />
                      <span style={{ color: '#fff', fontSize: '0.82rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── ABOUT IMAGE + TEXT ─── */}
        <section style={{ padding: '7rem 0', background: '#1A2238', position: 'relative', overflow: 'hidden' }}>
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
          <div style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', alignItems: 'center' }} className="lg:grid-cols-2">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <span className="highlight-tag" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>{lang === 'es' ? 'Nuestra Historia' : 'Our Story'}</span>
                <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.15, marginBottom: '1.75rem' }}>
                  {lang === 'es' ? <>Conscientes del invaluable <span className="gradient-text">tesoro pesquero</span></> : <>Aware of the invaluable <span className="gradient-text">fishing treasure</span></>}
                </h2>
                <p style={{ color: '#8BA0B4', fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '1.5rem' }}>
                  {lang === 'es'
                    ? 'Conscientes del invaluable tesoro que es nuestro mar peruano, en Perú Frost nos hemos dedicado a extraer, procesar y entregar al mundo productos hidrobiológicos de la más alta calidad desde Paita, al norte del Perú.'
                    : 'Aware of the invaluable treasure that is our Peruvian sea, at Perú Frost we have dedicated ourselves to extracting, processing and delivering the highest quality hydrobiological products to the world from Paita, northern Peru.'}
                </p>
                <p style={{ color: '#8BA0B4', fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '2.75rem' }}>
                  {lang === 'es'
                    ? 'Estamos fuertemente comprometidos con aportar valor a las comunidades en las que operamos, integrando prácticas sostenibles con pescadores artesanales y aplicando el tratamiento de aguas residuales en toda nuestra operación.'
                    : 'We are strongly committed to adding value to the communities in which we operate, integrating sustainable practices with artisanal fishermen and applying wastewater treatment clean protocols throughout our operation.'}
                </p>
                <Link href="/infraestructura" className="btn-primary">
                  {lang === 'es' ? 'Ver Infraestructura' : 'View Infrastructure'} <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div style={{ position: 'relative', height: '480px', borderRadius: '24px', overflow: 'hidden' }}>
                  <Image src={STORAGE_URL + 'planta.webp'} alt="Planta Perú Frost Paita" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,31,0.75) 0%, transparent 50%)' }} />
                  <div style={{ position: 'absolute', bottom: '1.75rem', left: '1.75rem', right: '1.75rem' }}>
                    <div className="glass-card-strong" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '44px', height: '44px', background: 'rgba(0,229,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00E5FF', flexShrink: 0 }}>
                        <Anchor size={20} />
                      </div>
                      <div>
                        <p style={{ fontSize: '0.7rem', color: '#8BA0B4', marginBottom: '2px' }}>{lang === 'es' ? 'Planta de procesamiento' : 'Processing plant'}</p>
                        <p style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Zona Industrial Paita — Piura, Perú</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── TIMELINE ─── */}
        <section style={{ padding: '7rem 0' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', paddingInline: '1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <span className="highlight-tag" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>{lang === 'es' ? 'Hitos' : 'Milestones'}</span>
              <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.15 }}>
                {lang === 'es' ? <>Nuestra <span className="gradient-text">línea de tiempo</span></> : <>Our <span className="gradient-text">timeline</span></>}
              </h2>
            </div>

            {/* Timeline vertical con línea real */}
            <div style={{ position: 'relative' }}>
              {/* Línea vertical central */}
              <div style={{
                position: 'absolute', left: '50%', top: '30px', bottom: '30px',
                width: '2px', transform: 'translateX(-50%)',
                background: 'linear-gradient(to bottom, transparent, rgba(0,229,255,0.5) 10%, rgba(0,229,255,0.3) 80%, transparent)',
                zIndex: 0,
              }} className="hidden lg:block" />

              {/* Mobile: línea izquierda */}
              <div style={{
                position: 'absolute', left: '28px', top: '30px', bottom: '30px',
                width: '2px',
                background: 'linear-gradient(to bottom, transparent, rgba(0,229,255,0.4) 10%, rgba(0,229,255,0.25) 85%, transparent)',
                zIndex: 0,
              }} className="lg:hidden" />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {milestones.map((m, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={m.year}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.65, delay: i * 0.07 }}
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        paddingBottom: '3.5rem',
                        position: 'relative',
                      }}
                      className="lg:flex"
                    >
                      {/* Desktop layout */}
                      <div style={{ width: '100%', alignItems: 'flex-start', gap: '0' }} className="hidden lg:flex">
                        {/* Left side */}
                        <div style={{ flex: 1, paddingRight: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                          {isLeft && (
                            <div style={{
                              background: 'rgba(26,34,56,0.7)', backdropFilter: 'blur(20px)',
                              border: '1px solid rgba(0,229,255,0.18)', borderRadius: '18px',
                              padding: '2rem 2.25rem', maxWidth: '420px', width: '100%',
                              borderLeft: '3px solid rgba(0,229,255,0.4)',
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <div style={{
                                  background: 'rgba(0,229,255,0.12)', border: '1px solid rgba(0,229,255,0.3)',
                                  borderRadius: '9999px', padding: '4px 14px', fontSize: '0.8rem',
                                  fontWeight: 800, color: '#00E5FF', letterSpacing: '0.06em',
                                }}>{m.year}</div>
                                <span style={{ fontSize: '1.25rem' }}>{m.icon}</span>
                              </div>
                              <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#fff', marginBottom: '0.625rem' }}>{m.title}</h3>
                              <p style={{ color: '#8BA0B4', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '0.75rem' }}>{m.desc}</p>
                              <span style={{ fontSize: '0.72rem', color: '#00E5FF', fontWeight: 600, opacity: 0.8 }}>{m.stats}</span>
                            </div>
                          )}
                        </div>

                        {/* Center dot */}
                        <div style={{
                          width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                          background: 'linear-gradient(135deg, #00E5FF, #0099BB)',
                          border: '3px solid #0A0F1F',
                          boxShadow: '0 0 0 4px rgba(0,229,255,0.2), 0 0 16px rgba(0,229,255,0.4)',
                          marginTop: '1.75rem', zIndex: 1,
                        }} />

                        {/* Right side */}
                        <div style={{ flex: 1, paddingLeft: '2.5rem' }}>
                          {!isLeft && (
                            <div style={{
                              background: 'rgba(26,34,56,0.7)', backdropFilter: 'blur(20px)',
                              border: '1px solid rgba(0,229,255,0.18)', borderRadius: '18px',
                              padding: '2rem 2.25rem', maxWidth: '420px', width: '100%',
                              borderRight: '3px solid rgba(0,229,255,0.4)',
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <div style={{
                                  background: 'rgba(0,229,255,0.12)', border: '1px solid rgba(0,229,255,0.3)',
                                  borderRadius: '9999px', padding: '4px 14px', fontSize: '0.8rem',
                                  fontWeight: 800, color: '#00E5FF', letterSpacing: '0.06em',
                                }}>{m.year}</div>
                                <span style={{ fontSize: '1.25rem' }}>{m.icon}</span>
                              </div>
                              <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#fff', marginBottom: '0.625rem' }}>{m.title}</h3>
                              <p style={{ color: '#8BA0B4', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '0.75rem' }}>{m.desc}</p>
                              <span style={{ fontSize: '0.72rem', color: '#00E5FF', fontWeight: 600, opacity: 0.8 }}>{m.stats}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Mobile layout */}
                      <div style={{ paddingLeft: '56px', width: '100%', position: 'relative' }} className="lg:hidden">
                        {/* Mobile dot */}
                        <div style={{
                          position: 'absolute', left: '29px', top: '1.5rem',
                          width: '16px', height: '16px', borderRadius: '50%',
                          background: 'linear-gradient(135deg, #00E5FF, #0099BB)',
                          border: '3px solid #0A0F1F',
                          boxShadow: '0 0 0 3px rgba(0,229,255,0.2)',
                          transform: 'translateX(-50%)', zIndex: 1,
                        }} />
                        <div style={{
                          background: 'rgba(26,34,56,0.7)', backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(0,229,255,0.18)', borderRadius: '16px',
                          padding: '1.75rem', borderLeft: '3px solid rgba(0,229,255,0.4)',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
                            <div style={{ background: 'rgba(0,229,255,0.12)', borderRadius: '9999px', padding: '3px 12px', fontSize: '0.75rem', fontWeight: 800, color: '#00E5FF' }}>{m.year}</div>
                            <span>{m.icon}</span>
                          </div>
                          <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>{m.title}</h3>
                          <p style={{ color: '#8BA0B4', fontSize: '0.88rem', lineHeight: 1.7 }}>{m.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ─── VALUES ─── */}
        <section style={{ padding: '7rem 0', background: '#1A2238', position: 'relative', overflow: 'hidden' }}>
          <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} />
          <div style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
              <span className="highlight-tag" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>
                {lang === 'es' ? 'Valores Corporativos' : 'Corporate Values'}
              </span>
              <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
                {lang === 'es' ? <>Lo que nos <span className="gradient-text">define</span></> : <>What <span className="gradient-text">defines us</span></>}
              </h2>
              <p style={{ color: '#8BA0B4', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8 }}>
                {lang === 'es'
                  ? 'Estos principios guían cada decisión, proceso y relación comercial en Perú Frost.'
                  : 'These principles guide every decision, process and commercial relationship at Perú Frost.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  className={`w-full ${i === 4 ? 'md:col-span-2 md:max-w-[500px] md:mx-auto' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  style={{
                    background: 'rgba(10,15,31,0.6)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
                    padding: '2rem', cursor: 'default',
                    transition: 'all 0.35s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${v.color}40`;
                    el.style.transform = 'translateY(-4px)';
                    el.style.background = 'rgba(26,34,56,0.8)';
                    el.style.boxShadow = `0 15px 40px ${v.color}15`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.transform = 'translateY(0)';
                    el.style.background = 'rgba(10,15,31,0.6)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{
                      width: '44px', height: '44px',
                      background: `${v.color}18`, flexShrink: 0,
                      border: `1px solid ${v.color}30`,
                      borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: v.color,
                    }}>
                      {v.icon}
                    </div>
                    <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: '1.15rem', color: '#fff' }}>{v.title}</h3>
                  </div>
                  
                  <p style={{ color: '#8BA0B4', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{v.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {v.bullets.map((b) => (
                      <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: v.color, marginTop: '6px', flexShrink: 0 }} />
                        <span style={{ color: '#8BA0B4', fontSize: '0.8rem', lineHeight: 1.4 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SOCIOS ESTRATÉGICOS ─── */}
        <section style={{ padding: '7rem 0', background: '#0D1326' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', paddingInline: '1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="highlight-tag" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>
                {lang === 'es' ? 'Alianzas' : 'Alliances'}
              </span>
              <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.15 }}>
                {lang === 'es' ? <>Colaborando con la <span className="gradient-text">industria</span></> : <>Collaborating with the <span className="gradient-text">industry</span></>}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {/* SNP */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                style={{ background: 'rgba(26,34,56,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', flexShrink: 0, overflow: 'hidden' }}>
                  <img src="https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/partner_snp_new.webp" alt="SNP" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1rem', color: '#fff', marginBottom: '0.3rem', lineHeight: 1.2 }}>Sociedad Nacional de Pesquería</h3>
                  <p style={{ color: '#8BA0B4', fontSize: '0.85rem', lineHeight: 1.5 }}>Miembro institucional comprometido con la industria peruana.</p>
                </div>
              </motion.div>
              
              {/* SNI */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                style={{ background: 'rgba(26,34,56,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', flexShrink: 0, overflow: 'hidden' }}>
                  <img src="https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/partner_sni_new.webp" alt="SNI" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1rem', color: '#fff', marginBottom: '0.3rem', lineHeight: 1.2 }}>Sociedad Nacional de Industrias</h3>
                  <p style={{ color: '#8BA0B4', fontSize: '0.85rem', lineHeight: 1.5 }}>Participación en la estandarización y calidad industrial.</p>
                </div>
              </motion.div>

              {/* CAPECAL */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                style={{ background: 'rgba(26,34,56,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', flexShrink: 0, overflow: 'hidden' }}>
                  <img src="https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/partner_capecal_new.webp" alt="CAPECAL" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1rem', color: '#fff', marginBottom: '0.3rem', lineHeight: 1.2 }}>Cámara Peruana del Calamar Gigante</h3>
                  <p style={{ color: '#8BA0B4', fontSize: '0.85rem', lineHeight: 1.5 }}>Participación activa en el Proyecto de Mejora Pesquera (FIP).</p>
                </div>
              </motion.div>

              {/* Paita */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                style={{ background: 'rgba(26,34,56,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>⚓</div>
                <div>
                  <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1rem', color: '#fff', marginBottom: '0.3rem', lineHeight: 1.2 }}>Association of Fishing Companies</h3>
                  <p style={{ color: '#8BA0B4', fontSize: '0.85rem', lineHeight: 1.5 }}>Alianza de procesadores locales del norte del mar de Grau.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
