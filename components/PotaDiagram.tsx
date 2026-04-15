'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Corte } from '@/data/productos'
import { Package, Info } from 'lucide-react'
import Image from 'next/image'

interface PotaDiagramProps {
  cortes: Corte[]
  className?: string
}

export default function PotaDiagram({ cortes, className = "" }: PotaDiagramProps) {
  const [activeZone, setActiveZone] = useState<string | null>(null)

  const zones = [
    { id: 'manto', label: 'Manto / Fillet', path: 'M 100 50 Q 150 50 150 150 L 150 350 Q 100 400 50 350 L 50 150 Q 50 50 100 50 Z' },
    { id: 'alas', label: 'Alas / Wings', path: 'M 50 150 L 10 200 L 50 250 Z M 150 150 L 190 200 L 150 250 Z' },
    { id: 'cabeza', label: 'Cabeza / Head', path: 'M 70 360 L 130 360 L 130 400 L 70 400 Z' },
    { id: 'tentaculos', label: 'Tentáculos / Tentacles', path: 'M 80 400 Q 60 500 40 550 M 90 400 Q 80 500 70 550 M 110 400 Q 120 500 130 550 M 120 400 Q 140 500 160 550' },
  ]

  const activeCortes = cortes.filter(c => c.zona === activeZone)

  return (
    <div className={`flex flex-col lg:flex-row gap-8 items-center ${className}`}>
      {/* SVG Diagram with Real Image */}
      <div className="relative w-full max-w-[400px] aspect-[1/1.5] flex justify-center items-center">
        <div className="absolute inset-0 z-0 p-4">
          <Image src="/recursos/calamar-real.png" alt="Dosidicus Gigas Anatome" fill className="object-contain" />
        </div>
        <svg viewBox="0 0 200 600" className="relative z-10 w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Zones */}
          {zones.map((zone) => (
            <motion.path
              key={zone.id}
              d={zone.path}
              fill={activeZone === zone.id ? "#0ea5e9" : "transparent"}
              stroke={activeZone === zone.id ? "#0ea5e9" : "transparent"}
              strokeWidth="2"
              strokeOpacity={activeZone === zone.id ? "1" : "0"}
              fillOpacity={activeZone === zone.id ? "0.6" : "0"}
              initial={{ scale: 1 }}
              whileHover={{ fillOpacity: 0.3, fill: '#0ea5e9', stroke: '#0ea5e9', strokeOpacity: 0.5 }}
              animate={{ 
                filter: activeZone === zone.id ? "url(#glow)" : "none"
              }}
              onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
              className="cursor-pointer transition-all duration-300"
            />
          ))}

          {/* Botones (Decorative) removed for realism */}
        </svg>

        {/* Labels Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {zones.map((zone) => (
            <div 
              key={zone.id}
              className={`absolute transition-opacity duration-300 ${activeZone === zone.id ? 'opacity-100' : 'opacity-0'}`}
              style={{
                top: zone.id === 'manto' ? '20%' : zone.id === 'alas' ? '35%' : zone.id === 'cabeza' ? '65%' : '80%',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              <span className="bg-[#0ea5e9] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {zone.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      <div className="flex-1 w-full max-w-md">
        <AnimatePresence mode="wait">
          {activeZone ? (
            <motion.div
              key={activeZone}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-6 border-l-4 border-[#0ea5e9]"
            >
              <h3 className="text-2xl font-black text-white mb-2 font-tight uppercase tracking-tight">
                {zones.find(z => z.id === activeZone)?.label.split(' / ')[0]}
                <span className="block text-sm text-[#0ea5e9] font-medium tracking-normal mt-1 italic">
                  {zones.find(z => z.id === activeZone)?.label.split(' / ')[1]}
                </span>
              </h3>
              
              <div className="space-y-4 mt-6">
                {activeCortes.length > 0 ? (
                  activeCortes.map((corte) => (
                    <div key={corte.id} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#0ea5e9]/30 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{corte.emoji || '🦑'}</span>
                        <div>
                          <p className="font-bold text-white leading-none">{corte.nombre}</p>
                          <p className="text-xs text-[#8BA0B4] mt-1">{corte.nombreEN}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {corte.empaques.map(emp => (
                          <span key={emp} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#0ea5e9]/20 text-[#0ea5e9] rounded">
                            {emp}
                          </span>
                        ))}
                      </div>
                      {corte.descripcion && (
                        <p className="text-sm text-[#8BA0B4] mt-3 leading-relaxed">
                          {corte.descripcion}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-[#8BA0B4] italic text-sm">Seleccione una zona para ver los productos disponibles.</p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-12 border-2 border-dashed border-white/10 rounded-3xl"
            >
              <div className="w-16 h-16 bg-[#1e3a5f] rounded-full flex items-center justify-center mx-auto mb-4">
                <Info className="text-[#0ea5e9]" size={32} />
              </div>
              <h4 className="text-white font-bold mb-2">Exploración Anatómica</h4>
              <p className="text-[#8BA0B4] text-sm leading-relaxed">
                Haga clic en las diferentes partes del calamar gigante para conocer las presentaciones y cortes disponibles.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
