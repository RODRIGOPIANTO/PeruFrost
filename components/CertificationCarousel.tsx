'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const certifications = [
  { name: 'BRCGS', sub: 'Grado AA — Calidad Alimentaria Global', icon: '🏆', color: 'rgba(234,179,8,0.15)', border: 'rgba(234,179,8,0.35)' },
  { name: 'MSC', sub: 'Marine Stewardship Council', icon: '🌊', color: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.35)' },
  { name: 'MarinTrust', sub: 'Cadena de Suministro Sostenible', icon: '🐟', color: 'rgba(20,184,166,0.15)', border: 'rgba(20,184,166,0.35)' },
  { name: 'FDA', sub: 'Registrado — Estados Unidos', icon: '🇺🇸', color: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.35)' },
  { name: 'DG SANTE', sub: 'Habilitado Unión Europea', icon: '🇪🇺', color: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.35)' },
  { name: 'SANIPES', sub: 'Habilitación Clase A — Perú', icon: '🏅', color: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.35)' },
];

export default function CertificationCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % certifications.length);
    }, 2800);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div>
      {/* Auto-rotating spotlight */}
      <div
        style={{ position: 'relative', marginBottom: '2.5rem' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            style={{
              background: certifications[active].color,
              border: `1.5px solid ${certifications[active].border}`,
              borderRadius: '20px',
              padding: '2.5rem 3rem',
              textAlign: 'center',
              minHeight: '160px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
            }}
          >
            <span style={{ fontSize: '3.5rem', lineHeight: 1 }}>{certifications[active].icon}</span>
            <div>
              <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: '2rem', color: '#fff', marginBottom: '0.4rem' }}>
                {certifications[active].name}
              </p>
              <p style={{ color: '#8BA0B4', fontSize: '1rem', fontWeight: 500 }}>{certifications[active].sub}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1.25rem' }}>
          {certifications.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
              style={{
                width: i === active ? '28px' : '8px',
                height: '8px',
                borderRadius: '9999px',
                background: i === active ? '#00E5FF' : 'rgba(139,160,180,0.4)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.35s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Static grid - all badges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}
        className="md:grid-cols-3 lg:grid-cols-6"
      >
        {certifications.map((cert, i) => (
          <button
            key={cert.name}
            onClick={() => { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
            style={{
              background: i === active ? cert.color : 'rgba(26,34,56,0.5)',
              border: `1.5px solid ${i === active ? cert.border : 'rgba(0,229,255,0.12)'}`,
              borderRadius: '14px',
              padding: '1rem 0.75rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
              cursor: 'pointer', transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              if (i !== active) {
                (e.currentTarget as HTMLElement).style.background = cert.color;
                (e.currentTarget as HTMLElement).style.borderColor = cert.border;
              }
            }}
            onMouseLeave={e => {
              if (i !== active) {
                (e.currentTarget as HTMLElement).style.background = 'rgba(26,34,56,0.5)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,255,0.12)';
              }
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{cert.icon}</span>
            <span style={{
              fontFamily: "'Inter Tight', sans-serif", fontWeight: 800,
              fontSize: '0.85rem', color: i === active ? '#fff' : '#8BA0B4',
              transition: 'color 0.3s',
            }}>
              {cert.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
