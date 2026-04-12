'use client';

import { useState } from 'react';
import { useLang } from '@/components/LanguageContext';

const regions = [
  {
    id: 'north-america',
    label: 'Norteamérica',
    labelEn: 'North America',
    flag: '🇺🇸',
    color: '#00E5FF',
    fill: 'rgba(0,229,255,0.75)',
    countries: ['Estados Unidos', 'Canadá', 'México'],
    countriesEn: ['United States', 'Canada', 'Mexico'],
    detail: '+18 años de relación comercial continua',
    detailEn: '+18 years of continuous trade relations',
    paths: 'M 85 110 L 195 110 L 200 160 L 185 190 L 160 195 L 130 185 L 100 175 L 80 155 Z',
  },
  {
    id: 'central-america',
    label: 'Centroamérica',
    labelEn: 'Central America',
    flag: '🌎',
    color: '#F59E0B',
    fill: 'rgba(245,158,11,0.75)',
    countries: ['Guatemala', 'Honduras', 'Costa Rica', 'Panamá', 'El Salvador', 'Nicaragua'],
    countriesEn: ['Guatemala', 'Honduras', 'Costa Rica', 'Panama', 'El Salvador', 'Nicaragua'],
    detail: 'Mercado en expansión',
    detailEn: 'Growing market',
    paths: 'M 155 193 L 180 193 L 185 220 L 168 230 L 150 225 L 148 205 Z',
  },
  {
    id: 'south-america',
    label: 'Sudamérica',
    labelEn: 'South America',
    flag: '🇧🇷',
    color: '#10B981',
    fill: 'rgba(16,185,129,0.75)',
    countries: ['Perú', 'Chile', 'Brasil', 'Argentina', 'Colombia', 'Ecuador', 'Bolivia', 'Uruguay'],
    countriesEn: ['Peru', 'Chile', 'Brazil', 'Argentina', 'Colombia', 'Ecuador', 'Bolivia', 'Uruguay'],
    detail: 'Mercado regional con crecimiento sostenido',
    detailEn: 'Regional market with sustained growth',
    paths: 'M 150 232 L 210 235 L 220 290 L 200 350 L 175 365 L 155 355 L 140 300 L 138 250 Z',
  },
  {
    id: 'europe',
    label: 'Europa',
    labelEn: 'Europe',
    flag: '🇪🇺',
    color: '#6366F1',
    fill: 'rgba(99,102,241,0.75)',
    countries: ['España', 'Portugal', 'Francia', 'Italia', 'Alemania', 'Grecia', 'Países Bajos', 'Reino Unido', 'Bélgica'],
    countriesEn: ['Spain', 'Portugal', 'France', 'Italy', 'Germany', 'Greece', 'Netherlands', 'United Kingdom', 'Belgium'],
    detail: 'Principal mercado de exportación',
    detailEn: 'Primary export market',
    paths: 'M 390 80 L 470 75 L 490 110 L 480 140 L 455 150 L 420 148 L 395 130 L 385 105 Z',
  },
  {
    id: 'africa',
    label: 'África',
    labelEn: 'Africa',
    flag: '🌍',
    color: '#EF4444',
    fill: 'rgba(239,68,68,0.75)',
    countries: ['Senegal', 'Nigeria', 'Ghana', 'Costa de Marfil', 'Egipto', 'Sudáfrica', 'Camerún'],
    countriesEn: ['Senegal', 'Nigeria', 'Ghana', "Ivory Coast", 'Egypt', 'South Africa', 'Cameroon'],
    detail: 'Mercado en crecimiento acelerado',
    detailEn: 'Rapidly growing market',
    paths: 'M 410 155 L 480 155 L 495 200 L 490 260 L 465 310 L 440 315 L 415 285 L 400 230 L 402 185 Z',
  },
  {
    id: 'russia',
    label: 'Rusia / CEI',
    labelEn: 'Russia / CIS',
    flag: '🇷🇺',
    color: '#8B5CF6',
    fill: 'rgba(139,92,246,0.75)',
    countries: ['Rusia', 'Ucrania', 'Kazajistán', 'Bielorrusia', 'Georgia'],
    countriesEn: ['Russia', 'Ukraine', 'Kazakhstan', 'Belarus', 'Georgia'],
    detail: 'Gran potencial de volumen',
    detailEn: 'High volume potential',
    paths: 'M 490 55 L 700 50 L 720 80 L 680 100 L 560 105 L 495 95 Z',
  },
  {
    id: 'asia',
    label: 'Asia',
    labelEn: 'Asia',
    flag: '🇨🇳',
    color: '#F97316',
    fill: 'rgba(249,115,22,0.75)',
    countries: ['China', 'Japón', 'Corea del Sur', 'Tailandia', 'Vietnam', 'Singapur', 'Hong Kong', 'Taiwán'],
    countriesEn: ['China', 'Japan', 'South Korea', 'Thailand', 'Vietnam', 'Singapore', 'Hong Kong', 'Taiwan'],
    detail: 'Mayor volumen de toneladas exportadas',
    detailEn: 'Highest volume in tons exported',
    paths: 'M 570 100 L 730 90 L 760 130 L 740 180 L 700 200 L 640 195 L 590 170 L 562 135 Z',
  },
];

const centers: Record<string, [number, number]> = {
  'north-america': [148, 148],
  'central-america': [166, 212],
  'south-america': [178, 295],
  'europe': [438, 112],
  'africa': [448, 228],
  'russia': [590, 68],
  'asia': [670, 142],
};

const WorldMap = ({ activeId, onSelect }: { activeId: string | null; onSelect: (id: string) => void }) => {
  const selected = regions.find(r => r.id === activeId);

  return (
    <svg viewBox="0 0 850 430" style={{ width: '100%', height: 'auto', display: 'block' }} aria-label="Mapa de exportación global Perú Frost">
      <defs>
        {regions.map(r => (
          <marker key={`arrow-${r.id}`} id={`arrow-${r.id}`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill={r.color} />
          </marker>
        ))}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Ocean background */}
      <rect width="850" height="430" fill="#0D1B30" rx="16" />
      {/* Grid lines */}
      {[85, 170, 255, 340, 425, 510, 595, 680, 765].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="430" stroke="rgba(0,229,255,0.05)" strokeWidth="1" />
      ))}
      {[86, 172, 258, 344].map(y => (
        <line key={y} x1="0" y1={y} x2="850" y2={y} stroke="rgba(0,229,255,0.05)" strokeWidth="1" />
      ))}

      {/* Continent shapes (simplified continents) */}
      <path d="M 80 95 L 200 85 L 215 125 L 205 165 L 188 192 L 162 198 L 130 188 L 100 172 L 78 148 Z" fill="rgba(26,42,70,0.85)" stroke="rgba(0,229,255,0.08)" strokeWidth="1" />
      <path d="M 152 195 L 182 196 L 188 225 L 170 236 L 148 230 L 147 208 Z" fill="rgba(26,42,70,0.85)" stroke="rgba(0,229,255,0.08)" strokeWidth="1" />
      <path d="M 148 235 L 215 238 L 228 295 L 220 355 L 192 372 L 165 362 L 138 312 L 132 258 Z" fill="rgba(26,42,70,0.85)" stroke="rgba(0,229,255,0.08)" strokeWidth="1" />
      <path d="M 385 72 L 482 68 L 498 112 L 488 145 L 460 158 L 420 154 L 392 133 L 380 102 Z" fill="rgba(26,42,70,0.85)" stroke="rgba(0,229,255,0.08)" strokeWidth="1" />
      <path d="M 405 152 L 485 152 L 500 205 L 496 268 L 468 318 L 438 322 L 410 290 L 398 232 L 400 182 Z" fill="rgba(26,42,70,0.85)" stroke="rgba(0,229,255,0.08)" strokeWidth="1" />
      <path d="M 488 48 L 760 40 L 778 75 L 745 92 L 565 98 L 492 88 Z" fill="rgba(26,42,70,0.85)" stroke="rgba(0,229,255,0.08)" strokeWidth="1" />
      <path d="M 490 145 L 570 140 L 575 190 L 490 188 Z" fill="rgba(26,42,70,0.85)" stroke="rgba(0,229,255,0.08)" strokeWidth="1" />
      <path d="M 565 92 L 760 82 L 792 128 L 770 185 L 718 208 L 640 200 L 588 175 L 558 138 Z" fill="rgba(26,42,70,0.85)" stroke="rgba(0,229,255,0.08)" strokeWidth="1" />
      <path d="M 680 210 L 760 208 L 770 235 L 740 242 L 700 238 L 678 225 Z" fill="rgba(26,42,70,0.85)" stroke="rgba(0,229,255,0.08)" strokeWidth="1" />
      <path d="M 680 290 L 790 285 L 808 340 L 785 375 L 720 380 L 675 350 L 665 315 Z" fill="rgba(20,28,48,0.7)" stroke="rgba(0,229,255,0.04)" strokeWidth="1" />

      {/* Overlay colors for each active region */}
      {regions.map((region) => {
        const isActive = activeId === region.id;
        return (
          <path
            key={region.id}
            d={region.paths}
            fill={isActive ? region.fill : 'transparent'}
            stroke={isActive ? region.color : 'transparent'}
            strokeWidth={isActive ? 2.5 : 0}
            style={{ 
              cursor: 'pointer', 
              transition: 'all 0.4s ease', 
              filter: isActive ? 'url(#glow)' : 'none' 
            }}
            onClick={() => onSelect(region.id)}
          />
        );
      })}

      {/* Clickable hotspot circles */}
      {regions.map((region) => {
        const [cx, cy] = centers[region.id] || [100, 100];
        const isActive = activeId === region.id;
        return (
          <g key={region.id} onClick={() => onSelect(region.id)} style={{ cursor: 'pointer' }}>
            {isActive && (
              <circle cx={cx} cy={cy} r={22} fill={region.color} opacity={0.15} filter="url(#glow)">
                <animate attributeName="r" values="18;26;18" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              cx={cx} cy={cy} r={isActive ? 9 : 6}
              fill={isActive ? region.color : 'rgba(0,229,255,0.5)'}
              stroke={isActive ? '#fff' : 'rgba(0,229,255,0.3)'}
              strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'all 0.3s ease' }}
            />
            {isActive && (
              <text
                x={cx} y={cy - 18}
                textAnchor="middle"
                fill="#fff"
                fontSize="10"
                fontWeight="800"
                fontFamily="Inter Tight, Inter, sans-serif"
                style={{ pointerEvents: 'none', filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' }}
              >
                {region.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Connection Arrows from Peru */}
      {activeId && selected && centers[activeId] && (
        <path
          d={`M 165 285 Q ${(165 + centers[activeId][0])/2} ${((285 + centers[activeId][1])/2)-60} ${centers[activeId][0]} ${centers[activeId][1]} `}
          fill="transparent"
          stroke={selected.color}
          strokeWidth="2.5"
          strokeDasharray="6 4"
          markerEnd={`url(#arrow-${activeId})`}
          style={{ filter: 'url(#glow)' }}
        >
           <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>
      )}

      {/* Peru marker (origin) */}
      <g>
        <circle cx="165" cy="285" r="5" fill="#00E5FF" stroke="#fff" strokeWidth="2" style={{filter: 'url(#glow)'}} />
        <circle cx="165" cy="285" r="10" fill="rgba(0,229,255,0.3)">
          <animate attributeName="r" values="8;16;8" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <text x="165" y="305" textAnchor="middle" fill="#00E5FF" fontSize="8" fontWeight="800" fontFamily="Inter, sans-serif" style={{filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.8))'}}>🇵🇪 PAITA</text>
      </g>
    </svg>
  );
};

export default function InteractiveGlobe() {
  const [active, setActive] = useState<string | null>('europe');
  const { lang, t } = useLang();

  const selected = regions.find((r) => r.id === active);

  const handleSelect = (id: string) => {
    setActive(prev => prev === id ? null : id);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="highlight-tag" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>
          {t('globe.tag')}
        </div>
        <h2 style={{
          fontFamily: "'Inter Tight', sans-serif", fontWeight: 900,
          fontSize: 'clamp(1.75rem, 4vw, 3.25rem)', color: '#fff',
          lineHeight: 1.15, marginBottom: '1.25rem',
        }}>
          {t('globe.h3a')}{' '}
          <span className="gradient-text">{t('globe.h3b')}</span>
        </h2>
        <p style={{ color: '#8BA0B4', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
          {t('globe.body')}{' '}
          <strong style={{ color: '#00E5FF' }}>{t('globe.countries')}</strong>{' '}
          {t('globe.in')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="lg:grid-cols-3">
        {/* Map */}
        <div style={{ gridColumn: 'span 2' }} className="lg:col-span-2">
          <div style={{
            background: 'rgba(13,27,48,0.8)', borderRadius: '20px',
            border: '1px solid rgba(0,229,255,0.12)', padding: '1.25rem',
            minHeight: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            <WorldMap activeId={active} onSelect={handleSelect} />
            <p style={{ textAlign: 'center', color: '#8BA0B4', fontSize: '0.75rem', marginTop: '1rem', letterSpacing: '0.04em' }}>
              {t('globe.click') || 'Haz clic en una región para ver las exportaciones.'}
            </p>
          </div>
        </div>

        {/* Region list + detail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {/* Stats bar */}
          <div style={{
            background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.18)',
            borderRadius: '14px', padding: '1rem 1.25rem',
            display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Inter Tight', sans-serif", fontWeight: 900,
                fontSize: '2.25rem', lineHeight: 1,
                background: 'linear-gradient(135deg, #00E5FF, #fff)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>+56</div>
              <div style={{ fontSize: '0.7rem', color: '#8BA0B4', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {lang === 'es' ? 'Países destino' : 'Destination countries'}
              </div>
            </div>
            <div style={{ flex: 1, borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '1rem' }}>
              {active && selected ? (
                <div>
                  <p style={{ fontSize: '0.7rem', color: '#00E5FF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '3px' }}>
                    {t('globe.active')}
                  </p>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                    {lang === 'es' ? selected.label : selected.labelEn}
                  </p>
                  <p style={{ color: '#8BA0B4', fontSize: '0.75rem', marginTop: '2px' }}>
                    {lang === 'es' ? selected.detail : selected.detailEn}
                  </p>
                </div>
              ) : (
                <p style={{ color: '#8BA0B4', fontSize: '0.78rem' }}>
                  {lang === 'es' ? 'Selecciona una región para ver detalles' : 'Select a region to see details'}
                </p>
              )}
            </div>
          </div>

          {/* Region cards */}
          {regions.map((region) => {
            const isActive = active === region.id;
            return (
              <button
                key={region.id}
                onClick={() => handleSelect(region.id)}
                style={{
                  background: isActive ? `rgba(${hexToRgb(region.color)},0.10)` : 'rgba(26,34,56,0.5)',
                  border: `1.5px solid ${isActive ? region.color : 'rgba(0,229,255,0.1)'}`,
                  borderRadius: '12px', padding: '0.85rem 1.1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: '0.75rem', cursor: 'pointer', transition: 'all 0.25s ease',
                  textAlign: 'left', width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{region.flag}</span>
                  <div>
                    <p style={{
                      fontFamily: "'Inter Tight', sans-serif", fontWeight: 700,
                      fontSize: '0.875rem', color: isActive ? region.color : '#fff',
                      transition: 'color 0.25s', marginBottom: '1px',
                    }}>
                      {lang === 'es' ? region.label : region.labelEn}
                    </p>
                    {isActive && (
                      <p style={{ color: '#8BA0B4', fontSize: '0.7rem' }}>
                        {(lang === 'es' ? region.countries : region.countriesEn).slice(0, 4).join(' · ')}
                        {(lang === 'es' ? region.countries : region.countriesEn).length > 4 ? ' ...' : ''}
                      </p>
                    )}
                  </div>
                </div>
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                  background: isActive ? region.color : 'rgba(0,229,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', color: isActive ? '#0A0F1F' : '#00E5FF', fontWeight: 700,
                  transition: 'all 0.25s',
                }}>
                  {(lang === 'es' ? region.countries : region.countriesEn).length}
                </div>
              </button>
            );
          })}

          {/* Selected countries detail */}
          {active && selected && (
            <div style={{
              background: `rgba(${hexToRgb(selected.color)},0.08)`,
              border: `1.5px solid ${selected.color}`,
              borderRadius: '12px', padding: '1rem 1.1rem', marginTop: '0.25rem',
            }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, color: selected.color, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.6rem' }}>
                {lang === 'es' ? 'Países de destino' : 'Destination countries'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(lang === 'es' ? selected.countries : selected.countriesEn).map((country) => (
                  <span
                    key={country}
                    style={{
                      background: `rgba(${hexToRgb(selected.color)},0.15)`,
                      border: `1px solid ${selected.color}`,
                      borderRadius: '9999px', padding: '3px 10px',
                      fontSize: '0.72rem', fontWeight: 600, color: '#fff',
                    }}
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const map: Record<string, string> = {
    '#00E5FF': '0,229,255', '#F59E0B': '245,158,11', '#10B981': '16,185,129',
    '#6366F1': '99,102,241', '#EF4444': '239,68,68', '#8B5CF6': '139,92,246',
    '#F97316': '249,115,22',
  };
  return map[hex] || '0,229,255';
}

