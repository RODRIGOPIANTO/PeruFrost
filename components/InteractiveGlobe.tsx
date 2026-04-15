'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/components/LanguageContext'
import regionesExportacion, { PaisDestino } from '@/data/mercados'
import { Globe, ArrowRight, MapPin } from 'lucide-react'

// Puntos centrales aproximados para las regiones en el SVG 850x430
const regionPositions: Record<string, [number, number]> = {
  norteamerica: [150, 140],
  centroamerica: [165, 215],
  sudamerica: [180, 290],
  europa: [440, 110],
  africa: [450, 230],
  'rusia-cei': [580, 70],
  asia: [680, 150],
}

// Coordenadas de los países de destino para los puntos pulsantes
const countryPoints: Record<string, [number, number]> = {
  US: [140, 130], CA: [140, 80], MX: [160, 170],
  ES: [415, 125], PT: [405, 125], FR: [430, 110], IT: [450, 125], DE: [450, 100], GB: [420, 95],
  CN: [680, 140], JP: [750, 130], KR: [740, 140], TH: [680, 210], VN: [700, 200],
  BR: [220, 280], AR: [195, 360], CL: [175, 350],
  MA: [415, 175], EG: [485, 185], ZA: [470, 360],
  RU: [620, 70],
}

interface WorldMapProps {
  activeId: string | null
  onSelect: (id: string) => void
}

const WorldMap = ({ activeId, onSelect }: WorldMapProps) => {
  const { lang } = useLang()
  const activeRegion = regionesExportacion.find(r => r.id === activeId)

  return (
    <svg viewBox="0 0 850 430" className="w-full h-auto drop-shadow-2xl">
      <defs>
        <filter id="map-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        {regionesExportacion.map(r => (
          <marker key={`marker-${r.id}`} id={`marker-${r.id}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill={r.color} />
          </marker>
        ))}
      </defs>

      {/* Ocean Background */}
      <rect width="850" height="430" fill="#0c1a2e" rx="24" />
      
      {/* Grid Pattern */}
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(14,165,233,0.05)" strokeWidth="0.5" />
      </pattern>
      <rect width="850" height="430" fill="url(#grid)" rx="24" />

      {/* Base Continents (Static) */}
      <g opacity="0.4">
        {/* Simplified Continent Paths */}
        <path d="M 100 100 L 220 100 L 230 160 L 210 200 L 180 205 L 140 195 L 100 150 Z" fill="#1e3a5f" /> {/* N.America */}
        <path d="M 180 205 L 205 205 L 215 240 L 195 245 L 175 235 Z" fill="#1e3a5f" /> {/* C.America */}
        <path d="M 175 245 L 240 245 L 255 310 L 235 400 L 180 400 L 160 300 Z" fill="#1e3a5f" /> {/* S.America */}
        <path d="M 400 80 L 520 75 L 540 120 L 520 160 L 460 170 L 410 140 Z" fill="#1e3a5f" /> {/* Europe */}
        <path d="M 420 170 L 530 170 L 550 250 L 530 350 L 480 370 L 420 300 Z" fill="#1e3a5f" /> {/* Africa */}
        <path d="M 540 50 L 800 50 L 820 100 L 780 130 L 600 130 Z" fill="#1e3a5f" /> {/* Russia */}
        <path d="M 540 130 L 800 130 L 830 200 L 780 280 L 650 280 L 580 200 Z" fill="#1e3a5f" /> {/* Asia */}
      </g>

      {/* Origin: PAITA, PERU */}
      <g>
        <circle cx="185" cy="275" r="4" fill="#f59e0b">
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="185" cy="275" r="10" fill="rgba(245,158,11,0.2)">
          <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="185" y="260" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="800" className="font-tight tracking-widest">PAITA, PE</text>
      </g>

      {/* Routes & Destinations */}
      <g>
        {regionesExportacion.map((region) => {
          const isActive = activeId === region.id
          const pos = regionPositions[region.id] || [0, 0]
          
          return (
            <g key={region.id} className="cursor-pointer" onClick={() => onSelect(region.id)}>
              {/* Route line */}
              <motion.path
                d={`M 185 275 Q ${(185+pos[0])/2} ${((275+pos[1])/2)-40} ${pos[0]} ${pos[1]}`}
                fill="none"
                stroke={region.color}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray="4 4"
                opacity={isActive ? 0.8 : 0.2}
                animate={isActive ? { strokeDashoffset: [-20, 0] } : {}}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                markerEnd={`url(#marker-${region.id})`}
              />

              {/* Pulsing Dots in Destination Countries */}
              {isActive && region.paises.map(pais => {
                const pt = countryPoints[pais.codigo]
                if (!pt) return null
                return (
                  <g key={pais.codigo}>
                    <circle cx={pt[0]} cy={pt[1]} r="3" fill="#0ea5e9" />
                    <circle cx={pt[0]} cy={pt[1]} r="8" fill="rgba(14,165,233,0.3)">
                      <animate attributeName="r" values="5;10;5" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  </g>
                )
              })}

              {/* Region Trigger (Invisible Path for broader interaction if needed, or point) */}
              <circle 
                cx={pos[0]} cy={pos[1]} r="8" 
                fill={isActive ? region.color : "transparent"} 
                stroke={region.color} 
                strokeWidth="2"
                opacity={isActive ? 1 : 0.4}
              />
            </g>
          )
        })}
      </g>
    </svg>
  )
}

export default function InteractiveGlobe() {
  const [activeRegion, setActiveRegion] = useState<string | null>('europa')
  const { lang, t } = useLang()

  const selected = useMemo(() => 
    regionesExportacion.find(r => r.id === activeRegion), [activeRegion]
  )

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* LEFT: INFO */}
        <div className="lg:w-1/3 order-2 lg:order-1">
          <div className="mb-10">
            <span className="text-[#0ea5e9] font-black uppercase tracking-[0.2em] text-sm mb-4 block">Presencia Global</span>
            <h2 className="text-4xl lg:text-5xl font-black mb-6 font-tight">
              Exportación <br /><span className="gradient-text">Sin Límites</span>
            </h2>
            <p className="text-[#8BA0B4] text-lg leading-relaxed">
              Desde Paita para el mundo. Nuestra red logística asegura la frescura y trazabilidad de cada contenedor en 7 regiones estratégicas.
            </p>
          </div>

          <div className="space-y-3">
            {regionesExportacion.map((region) => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(region.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                  activeRegion === region.id 
                  ? 'bg-white/5 border-[#0ea5e9] shadow-lg shadow-[#0ea5e9]/10' 
                  : 'bg-transparent border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">{region.emoji}</span>
                  <div className="text-left">
                    <p className={`font-bold leading-none ${activeRegion === region.id ? 'text-[#0ea5e9]' : 'text-white'}`}>
                      {region.nombre}
                    </p>
                    <p className="text-[10px] text-[#8BA0B4] uppercase tracking-widest mt-1">
                      {region.totalPaises} {lang === 'es' ? 'Países' : 'Countries'}
                    </p>
                  </div>
                </div>
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: region.color }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: MAP */}
        <div className="lg:w-2/3 order-1 lg:order-2 w-full">
          <div className="glass-card p-6 relative">
            <WorldMap activeId={activeRegion} onSelect={setActiveRegion} />
            
            <AnimatePresence>
              {activeRegion && selected && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-10 left-10 right-10 lg:left-auto lg:right-10 lg:w-80 glass-card p-6 border-t-4"
                  style={{ borderColor: selected.color }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{selected.emoji}</span>
                    <h4 className="text-xl font-black">{selected.nombre}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selected.paises.map(p => (
                      <div key={p.codigo} className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-md border border-white/10">
                        <span className="text-xs">{p.bandera}</span>
                        <span className="text-[10px] font-bold text-[#8BA0B4]">{p.nombre}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
