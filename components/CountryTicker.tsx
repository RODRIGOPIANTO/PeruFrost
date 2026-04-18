'use client'

import { motion } from 'framer-motion'
import regionesExportacion from '@/data/mercados'

import { useLang } from './LanguageContext'

export default function CountryTicker() {
  const { lang } = useLang()
  const allCountries = regionesExportacion.flatMap(r => r.paises)
  // Duplicar para el scroll infinito
  const tickerItems = [...allCountries, ...allCountries, ...allCountries]

  return (
    <div className="w-full bg-white/[0.03] border-y border-white/5 py-6 overflow-hidden flex whitespace-nowrap">
      <motion.div
        className="flex gap-12 items-center"
        animate={{ x: [0, -2000] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {tickerItems.map((pais, idx) => (
          <div key={`${pais.codigo}-${idx}`} className="flex items-center gap-3">
            <span className="text-2xl grayscale hover:grayscale-0 transition-all duration-300 cursor-default opacity-60 hover:opacity-100">
              {pais.bandera}
            </span>
            <span className="text-sm font-black uppercase tracking-[0.2em] text-[#8BA0B4]">
              {lang === 'es' ? pais.nombre : (pais.nombreEn || pais.nombre)}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]/30 mx-4" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
