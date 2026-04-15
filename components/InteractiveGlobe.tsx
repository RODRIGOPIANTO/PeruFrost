'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/components/LanguageContext'
import regionesExportacion, { PaisDestino } from '@/data/mercados'
import { Globe, ArrowRight, MapPin } from 'lucide-react'

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps'

// Topología estándar
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"

// Coordenadas reales aproximadas [Longitud, Latitud] para los destinos
const geoCoords: Record<string, [number, number]> = {
  US: [-95.7, 37.0], CA: [-106.3, 56.1], MX: [-102.5, 23.6], CR: [-83.7, 9.7], PA: [-80.7, 8.5],
  BR: [-51.9, -14.2], AR: [-63.6, -38.4], CL: [-71.5, -35.6], CO: [-74.2, 4.5],
  ES: [-3.7, 40.4], PT: [-8.2, 39.3], FR: [2.2, 46.2], IT: [12.5, 41.8], DE: [10.4, 51.1], GB: [-3.4, 55.3],
  CN: [104.1, 35.8], JP: [138.2, 36.2], KR: [127.7, 35.9], TH: [100.9, 15.8], VN: [108.2, 14.0],
  MA: [-7.0, 31.7], EG: [30.8, 26.8], ZA: [22.9, -30.5],
  RU: [105.3, 61.5],
}

// Origen
const paitaCoord: [number, number] = [-81.11, -5.08]

interface WorldMapProps {
  activeId: string | null
  onSelect: (id: string) => void
}

const WorldMap = ({ activeId, onSelect }: WorldMapProps) => {
  const activeRegion = regionesExportacion.find(r => r.id === activeId)

  return (
    <div className="w-full h-auto drop-shadow-2xl rounded-[24px] overflow-hidden" style={{ background: '#0c1a2e', position: 'relative' }}>
      {/* Grid Pattern para el océano */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 130,
          center: [10, 20] // Centro visual para abarcar desde Perú hasta Japón/Rusia
        }}
        width={850}
        height={430}
        style={{ width: "100%", height: "auto" }}
      >
        <defs>
          {regionesExportacion.map(r => (
            <marker key={`marker-${r.id}`} id={`marker-${r.id}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill={r.color} />
            </marker>
          ))}
        </defs>

        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1e3a5f"
                stroke="rgba(14,165,233,0.15)"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#274b7a", outline: "none", cursor: "pointer" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Renderizado de Regiones Activas */}
        {regionesExportacion.map((region) => {
          const isActive = activeId === region.id
          
          return (
            <g key={region.id}>
              {/* Rutas y Puntos si está activo */}
              {isActive && region.paises.map(pais => {
                const pt = geoCoords[pais.codigo]
                if (!pt) return null
                return (
                  <g key={pais.codigo}>
                    {/* Línea Curva (Trayectoria) */}
                    <Line
                      from={paitaCoord}
                      to={pt}
                      stroke={region.color}
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      strokeOpacity={0.8}
                      style={{
                        animation: "dash 20s linear infinite",
                      }}
                      className="transition-all duration-500"
                    />

                    {/* Marcador Destino */}
                    <Marker coordinates={pt}>
                      <circle r={3} fill="#0ea5e9" />
                      <circle r={8} fill="rgba(14,165,233,0.3)">
                        <animate attributeName="r" values="5;10;5" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    </Marker>
                  </g>
                )
              })}
            </g>
          )
        })}

        {/* Origen: PAITA, PERU */}
        <Marker coordinates={paitaCoord}>
          <circle r={4} fill="#f59e0b">
            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle r={10} fill="rgba(245,158,11,0.2)">
            <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
          </circle>
          <text textAnchor="middle" y={-10} fill="#f59e0b" fontSize={10} fontWeight={800} className="font-tight tracking-widest drop-shadow-lg">
            PAITA, PE
          </text>
        </Marker>

      </ComposableMap>
    </div>
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
