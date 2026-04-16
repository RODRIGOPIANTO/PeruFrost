'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificaciones } from '@/data/certificaciones';
import Image from 'next/image';

export default function CertificationCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % certificaciones.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  const activeCert = certificaciones[active];

  return (
    <div className="w-full">
      {/* Cert Card */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCert.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ 
              borderRadius: '20px', 
              padding: '40px',
              background: 'linear-gradient(145deg, #0b2230, #07141c)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              marginTop: '20px'
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
              {/* Imagen (Protagonista) */}
              <div 
                className="relative flex-shrink-0 drop-shadow-[0_0_25px_rgba(0,229,255,0.2)]" 
                style={{ width: '120px', height: '120px' }}
              >
                {(activeCert as any).imagen ? (
                  <Image src={(activeCert as any).imagen} alt={activeCert.nombre} fill className="object-contain" />
                ) : (
                  <span className="text-6xl flex h-full w-full justify-center items-center">{activeCert.emoji}</span>
                )}
              </div>

              {/* Texto */}
              <div className="text-center md:text-left md:max-w-[400px]">
                <h3 className="text-2xl lg:text-3xl font-black text-white mb-2 font-tight tracking-tight uppercase">
                  {activeCert.nombre}
                  {activeCert.nivel && <span className="text-[#0ea5e9] ml-3 text-xl">{activeCert.nivel}</span>}
                </h3>
                <p className="text-[#8BA0B4] text-lg font-medium">{activeCert.subtitulo}</p>
                <p className="text-white/60 text-sm mt-3 italic">{activeCert.descripcion}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tabs bien hechos */}
      <div className="mt-[30px] flex flex-wrap justify-center gap-4">
        {certificaciones.map((cert, i) => {
          const isActive = i === active;
          return (
            <button
              key={cert.id}
              onClick={() => { setActive(i); setPaused(true); }}
              className="transition-all duration-300 font-bold tracking-wide"
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                background: isActive ? 'rgba(0,229,255,0.15)' : 'rgba(255,255,255,0.05)',
                border: isActive ? '1px solid rgba(0,229,255,0.4)' : '1px solid transparent',
                color: isActive ? '#fff' : '#8BA0B4',
                boxShadow: isActive ? '0 0 20px rgba(0,229,255,0.3)' : 'none',
              }}
              onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; } }}
              onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.color = '#8BA0B4'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; } }}
            >
              {cert.nombre}
            </button>
          );
        })}
      </div>
    </div>
  );
}
