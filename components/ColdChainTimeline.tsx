'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/components/LanguageContext';

const steps = [
  {
    icon: '🎣',
    num: 1,
    labelEs: 'Captura',
    labelEn: 'Catch',
    subEs: 'Flota artesanal certificada',
    subEn: 'Certified artisanal fleet',
    detailEs: 'Trabajamos con flotas artesanales certificadas bajo estrictos protocolos de manipulación en frío desde el momento de la captura, garantizando la frescura y calidad del producto.',
    detailEn: 'We work with certified artisanal fleets under strict cold-handling protocols from the moment of catch, ensuring freshness and quality of the product.',
    color: '#00E5FF',
  },
  {
    icon: '🏭',
    num: 2,
    labelEs: 'Recepción',
    labelEn: 'Reception',
    subEs: 'Control de temperatura inmediato',
    subEn: 'Immediate temperature control',
    detailEs: 'Al arribar a planta, cada lote es recepcionado con control de temperatura, análisis organoléptico y registro de trazabilidad. Solo materia prima que cumple nuestros estándares es aceptada.',
    detailEn: 'Upon arrival at the plant, each batch is received with temperature control, organoleptic analysis and traceability record. Only raw material meeting our standards is accepted.',
    color: '#22D3EE',
  },
  {
    icon: '❄️',
    num: 3,
    labelEs: 'Congelado',
    labelEn: 'Freezing',
    subEs: 'Túnel y placas -25°C',
    subEn: 'Tunnel and plate -25°C',
    detailEs: 'Sistema de congelado de última generación: túneles de congelado rápido IQF y prensas de placas que alcanzan -25°C en tiempos mínimos para preservar la estructura celular del producto.',
    detailEn: 'State-of-the-art freezing system: rapid IQF freezing tunnels and plate presses reaching -25°C in minimum times to preserve the cellular structure of the product.',
    color: '#6EE7FA',
  },
  {
    icon: '🔬',
    num: 4,
    labelEs: 'Control Lab',
    labelEn: 'Lab Control',
    subEs: 'Análisis microbiológico',
    subEn: 'Microbiological analysis',
    detailEs: 'Laboratorio propio con análisis microbiológico, físico-químico y organoléptico en cada lote. Control de histamina, metales pesados y contaminantes según normativa FDA, EU y codex internacional.',
    detailEn: 'In-house laboratory with microbiological, physicochemical and organoleptic analysis on every batch. Control of histamine, heavy metals and contaminants according to FDA, EU and international codex.',
    color: '#00E5FF',
  },
  {
    icon: '📦',
    num: 5,
    labelEs: 'Empaque',
    labelEn: 'Packaging',
    subEs: 'IQF o Block según spec.',
    subEn: 'IQF or Block per spec.',
    detailEs: 'Empaque personalizado: bloques de 10kg/7kg o IQF individual en sacos de 20kg/21kg. Etiquetado en múltiples idiomas con trazabilidad completa y adaptado a las especificaciones de cada mercado.',
    detailEn: 'Custom packaging: 10kg/7kg blocks or individual IQF in 20kg/21kg bags. Multi-language labeling with full traceability, adapted to the specifications of each market.',
    color: '#22D3EE',
  },
  {
    icon: '🚢',
    num: 6,
    labelEs: 'Exportación',
    labelEn: 'Export',
    subEs: '+56 países de destino',
    subEn: '+56 destination countries',
    detailEs: 'Salida directa desde el Puerto de Paita — a 5 minutos de nuestra planta — en contenedores refrigerados a -25°C, garantizando la cadena de frío hasta el cliente final en más de 56 países.',
    detailEn: 'Direct departure from the Port of Paita — 5 minutes from our plant — in refrigerated containers at -25°C, guaranteeing the cold chain to the end customer in more than 56 countries.',
    color: '#6EE7FA',
  },
];

export default function ColdChainTimeline() {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!paused) startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, startInterval]);

  const handleSelect = (i: number) => {
    setActive(i);
    setPaused(true);
    // Resume auto-play after 8s of inactivity
    setTimeout(() => setPaused(false), 8000);
  };

  const current = steps[active];

  return (
    <div>
      {/* ── Progress line + step dots ── */}
      <div style={{ position: 'relative', marginBottom: '3.5rem' }}>
        {/* Background track */}
        <div style={{
          position: 'absolute', top: '28px', left: '0', right: '0',
          height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px',
        }} />

        {/* Animated fill */}
        <motion.div
          style={{
            position: 'absolute', top: '28px', left: '0',
            height: '2px', background: 'linear-gradient(90deg, #00E5FF, #6EE7FA)',
            borderRadius: '2px', transformOrigin: 'left',
            boxShadow: '0 0 12px rgba(0,229,255,0.6)',
          }}
          animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />

        {/* Step dots */}
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          {steps.map((step, i) => {
            const isDone = i < active;
            const isCurrent = i === active;
            return (
              <div
                key={step.num}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', cursor: 'pointer', flex: 1 }}
                onClick={() => handleSelect(i)}
              >
                {/* Circle */}
                <motion.div
                  animate={{
                    scale: isCurrent ? 1.25 : 1,
                    boxShadow: isCurrent
                      ? '0 0 0 4px rgba(0,229,255,0.2), 0 0 24px rgba(0,229,255,0.5)'
                      : isDone
                        ? '0 0 0 2px rgba(0,229,255,0.15)'
                        : 'none',
                    background: isCurrent
                      ? 'linear-gradient(135deg, #00E5FF 0%, #0099BB 100%)'
                      : isDone
                        ? 'rgba(0,229,255,0.25)'
                        : 'rgba(255,255,255,0.06)',
                    borderColor: isCurrent || isDone ? '#00E5FF' : 'rgba(255,255,255,0.2)',
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    border: '2px solid',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: isCurrent ? '1.6rem' : '1.3rem',
                    position: 'relative', zIndex: 1,
                    transition: 'font-size 0.3s',
                  }}
                >
                  {isDone ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{ fontSize: '1.1rem', color: '#00E5FF' }}
                    >✓</motion.span>
                  ) : (
                    <span>{step.icon}</span>
                  )}
                </motion.div>

                {/* Label below circle */}
                <div style={{ textAlign: 'center' }}>
                  <motion.p
                    animate={{ color: isCurrent ? '#fff' : isDone ? '#00E5FF' : '#8BA0B4' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: isCurrent ? 800 : 600,
                      fontSize: 'clamp(0.6rem, 1.1vw, 0.85rem)',
                      lineHeight: 1.3, marginBottom: '0.2rem',
                    }}
                  >
                    {lang === 'es' ? step.labelEs : step.labelEn}
                  </motion.p>
                  <motion.p
                    animate={{ color: isCurrent ? '#8BA0B4' : 'transparent' }}
                    style={{ fontSize: '0.65rem', lineHeight: 1.3, display: 'none' }}
                    className="lg:block"
                  >
                    {lang === 'es' ? step.subEs : step.subEn}
                  </motion.p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Detail card ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{
            background: 'rgba(0,229,255,0.04)',
            border: '1.5px solid rgba(0,229,255,0.25)',
            borderRadius: '20px',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
          className="md:flex-row md:items-center md:gap-8"
        >
          {/* Big icon */}
          <div style={{
            width: '80px', height: '80px', flexShrink: 0,
            background: 'rgba(0,229,255,0.1)',
            border: '1.5px solid rgba(0,229,255,0.3)',
            borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem',
            boxShadow: '0 0 30px rgba(0,229,255,0.2)',
          }}>
            {current.icon}
          </div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            {/* Step indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
              <span style={{
                fontSize: '0.7rem', fontWeight: 800, color: '#00E5FF',
                textTransform: 'uppercase', letterSpacing: '0.12em',
              }}>
                {lang === 'es' ? `Etapa ${current.num} de ${steps.length}` : `Step ${current.num} of ${steps.length}`}
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,229,255,0.2)' }} />
            </div>

            <h3 style={{
              fontFamily: "'Inter Tight', sans-serif", fontWeight: 900,
              fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', color: '#fff',
              marginBottom: '0.625rem',
            }}>
              {lang === 'es' ? current.labelEs : current.labelEn}
            </h3>
            <p style={{ color: '#00E5FF', fontWeight: 700, fontSize: '0.875rem', marginBottom: '1rem' }}>
              {lang === 'es' ? current.subEs : current.subEn}
            </p>
            <p style={{ color: '#8BA0B4', fontSize: '0.97rem', lineHeight: 1.85 }}>
              {lang === 'es' ? current.detailEs : current.detailEn}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Mobile step pills (visible only on small screens) ── */}
      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }} className="lg:hidden">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              border: `1.5px solid ${i === active ? '#00E5FF' : 'rgba(255,255,255,0.15)'}`,
              background: i === active ? 'rgba(0,229,255,0.15)' : 'transparent',
              color: i === active ? '#00E5FF' : '#8BA0B4',
              fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.25s',
            }}
          >
            {step.icon} {lang === 'es' ? step.labelEs : step.labelEn}
          </button>
        ))}
      </div>

      {/* ── Auto-play indicator ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
        {!paused ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00E5FF', animation: 'pulse 1.5s ease-in-out infinite' }} />
            <span style={{ fontSize: '0.7rem', color: '#8BA0B4' }}>
              {lang === 'es' ? 'Avanzando automáticamente' : 'Auto-advancing'}
            </span>
          </div>
        ) : (
          <button
            onClick={() => setPaused(false)}
            style={{ fontSize: '0.7rem', color: '#8BA0B4', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {lang === 'es' ? '▶ Reanudar avance' : '▶ Resume auto-play'}
          </button>
        )}
      </div>
    </div>
  );
}
