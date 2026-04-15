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
      {/* Auto-rotating spotlight */}
      <div
        className="relative mb-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="glass-card p-10 lg:p-16 text-center min-h-[300px] flex flex-col items-center justify-center gap-6 border-t-4"
            style={{ borderColor: activeCert.color }}
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 drop-shadow-[0_0_25px_rgba(0,229,255,0.2)]">
              {(activeCert as any).imagen ? (
                <Image src={(activeCert as any).imagen} alt={activeCert.nombre} fill className="object-contain" />
              ) : (
                <span className="text-6xl drop-shadow-xl flex h-full w-full justify-center items-center">{activeCert.emoji}</span>
              )}
            </div>
            <div>
              <h3 className="text-3xl lg:text-4xl font-black text-white mb-2 font-tight tracking-tight uppercase">
                {activeCert.nombre}
                {activeCert.nivel && <span className="text-[#0ea5e9] ml-3 text-xl">{activeCert.nivel}</span>}
              </h3>
              <p className="text-[#8BA0B4] text-lg font-medium">{activeCert.subtitulo}</p>
              <p className="text-white/60 text-sm mt-4 italic max-w-lg mx-auto">{activeCert.descripcion}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {certificaciones.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setPaused(true); }}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === active ? 'w-12 bg-[#0ea5e9]' : 'w-2 bg-white/10 hover:bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Static flex buttons - fully centered */}
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {certificaciones.map((cert, i) => (
          <button
            key={cert.id}
            onClick={() => { setActive(i); setPaused(true); }}
            className={`p-4 rounded-xl flex flex-col items-center gap-3 transition-all duration-300 border min-w-[120px] ${
              i === active 
              ? 'bg-[#163354]/80 border-[#0ea5e9] shadow-[0_0_15px_rgba(0,229,255,0.15)] scale-105 z-10' 
              : 'bg-[#0A0F1F]/40 border-white/5 grayscale hover:grayscale-0 hover:border-white/20'
            }`}
          >
            <div className="relative w-12 h-12">
              {(cert as any).imagen ? (
                <Image src={(cert as any).imagen} alt={cert.nombre} fill className="object-contain" />
              ) : (
                <span className="text-2xl flex h-full w-full justify-center items-center">{cert.emoji}</span>
              )}
            </div>
            <span className={`text-[10px] sm:text-xs font-black uppercase tracking-widest text-center leading-tight ${
              i === active ? 'text-[#0ea5e9]' : 'text-[#8BA0B4]'
            }`}>
              {cert.nombre}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
