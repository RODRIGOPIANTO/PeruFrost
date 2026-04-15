'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/components/LanguageContext'
import regionesExportacion from '@/data/mercados'
import { Globe, ArrowRight, MapPin } from 'lucide-react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'

// Topolog\u00eda est\u00e1ndar
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"

// Coordenadas reales [Longitud, Latitud]
const geoCoords: Record<string, [number, number]> = {
  US: [-95.7, 37.0], CA: [-106.3, 56.1], MX: [-102.5, 23.6], CR: [-83.7, 9.7], PA: [-80.7, 8.5],
  BR: [-51.9, -14.2], AR: [-63.6, -38.4], CL: [-71.5, -35.6], CO: [-74.2, 4.5],
  ES: [-3.7, 40.4], PT: [-8.2, 39.3], FR: [2.2, 46.2], IT: [12.5, 41.8], DE: [10.4, 51.1], GB: [-3.4, 55.3],
  CN: [104.1, 35.8], JP: [138.2, 36.2], KR: [127.7, 35.9], TH: [100.9, 15.8], VN: [108.2, 14.0],
  MA: [-7.0, 31.7], EG: [30.8, 26.8], ZA: [22.9, -30.5],
  RU: [62.0, 55.0], // moved west (European Russia) so line doesn't wrap
}

// Origen Paita, Per\u00fa
const paitaCoord: [number, number] = [-81.11, -5.08]

// Proyecci\u00f3n Mercator — width=900, height=450, scale=140, center=[20,20]
// Convertir [lon,lat] a [x,y] para esta proyecci\u00f3n
function lonLatToXY(lon: number, lat: number, width: number, height: number, scale: number, centerLon: number, centerLat: number): [number, number] {
  const lambda = (lon - centerLon) * Math.PI / 180
  const phi = lat * Math.PI / 180
  const centerPhi = centerLat * Math.PI / 180
  const x = scale * lambda + width / 2
  const mercatorY = Math.log(Math.tan(Math.PI / 4 + phi / 2))
  const centerMercatorY = Math.log(Math.tan(Math.PI / 4 + centerPhi / 2))
  const y = height / 2 - scale * (mercatorY - centerMercatorY)
  return [x, y]
}

const MAP_W = 900, MAP_H = 450, MAP_SCALE = 140, MAP_CX = 20, MAP_CY = 15

interface ArcProps {
  from: [number, number]
  to: [number, number]
  color: string
  animated?: boolean
}

function Arc({ from, to, color, animated }: ArcProps) {
  const [x1, y1] = lonLatToXY(from[0], from[1], MAP_W, MAP_H, MAP_SCALE, MAP_CX, MAP_CY)
  const [x2, y2] = lonLatToXY(to[0], to[1], MAP_W, MAP_H, MAP_SCALE, MAP_CX, MAP_CY)

  // Control point: mid-point pulled upward for parabolic arc
  const cx = (x1 + x2) / 2
  const cy = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.18 - 40

  const d = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
  const pathLen = Math.hypot(x2 - x1, y2 - y1) * 1.5 + 60

  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeOpacity={0.85}
      strokeDasharray={animated ? "6 4" : "none"}
      style={animated ? {
        strokeDashoffset: pathLen,
        animation: `arcDash ${pathLen / 40}s linear infinite`,
      } : {}}
      markerEnd={`url(#arrow-${color.replace('#', '')})`}
    />
  )
}

interface WorldMapProps {
  activeId: string | null
  onSelect: (id: string) => void
}

const WorldMap = ({ activeId, onSelect }: WorldMapProps) => {
  const activeRegion = regionesExportacion.find(r => r.id === activeId)
  const [paitaX, paitaY] = lonLatToXY(paitaCoord[0], paitaCoord[1], MAP_W, MAP_H, MAP_SCALE, MAP_CX, MAP_CY)

  // Unique colors for arrow markers
  const uniqueColors = [...new Set(regionesExportacion.map(r => r.color))]

  return (
    <div className="w-full drop-shadow-2xl rounded-[24px] overflow-hidden" style={{ background: '#060d1f', position: 'relative' }}>
      <style>{`@keyframes arcDash { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -200; } }`}</style>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: MAP_SCALE, center: [MAP_CX, MAP_CY] }}
        width={MAP_W}
        height={MAP_H}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          {uniqueColors.map(color => (
            <marker key={color} id={`arrow-${color.replace('#', '')}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill={color} opacity="0.8" />
            </marker>
          ))}
        </defs>

        {/* Oc\u00e9ano */}
        <rect width={MAP_W} height={MAP_H} fill="#060d1f" />

        {/* Pa\u00edses base */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#162040"
                stroke="rgba(14,165,233,0.12)"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#1e3a5f", outline: "none", cursor: "default" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Arcos activos — dibujados ANTES del punto de origen para que quede encima */}
        {activeRegion && activeRegion.paises.map(pais => {
          const pt = geoCoords[pais.codigo]
          if (!pt) return null
          return (
            <Arc
              key={pais.codigo}
              from={paitaCoord}
              to={pt}
              color={activeRegion.color}
              animated
            />
          )
        })}

        {/* Marcadores destino */}
        {activeRegion && activeRegion.paises.map(pais => {
          const pt = geoCoords[pais.codigo]
          if (!pt) return null
          return (
            <Marker key={pais.codigo} coordinates={pt}>
              <circle r={4} fill={activeRegion.color} opacity={0.9} />
              <circle r={9} fill={activeRegion.color} opacity={0.2}>
                <animate attributeName="r" values="6;12;6" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur="1.8s" repeatCount="indefinite" />
              </circle>
            </Marker>
          )
        })}

        {/* Origen: PAITA, PER\u00da */}
        <Marker coordinates={paitaCoord}>
          <circle r={5} fill="#f59e0b">
            <animate attributeName="r" values="4;7;4" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle r={13} fill="rgba(245,158,11,0.15)">
            <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <text textAnchor="middle" y={-14} fill="#f59e0b" fontSize={9} fontWeight={800} style={{ letterSpacing: '0.1em' }}>
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
