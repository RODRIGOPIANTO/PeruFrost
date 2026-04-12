'use client';

import { useState, useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { useLang } from '@/components/LanguageContext';

const regions = [
  { id: 'north-america', label: 'Norteamérica', labelEn: 'North America', flag: '🇺🇸', color: '#00E5FF', countries: ['Estados Unidos', 'Canadá', 'México'], countriesEn: ['United States', 'Canada', 'Mexico'], detail: '+18 años de relación comercial continua', detailEn: '+18 years of continuous trade relations', location: [40, -100] as [number, number] },
  { id: 'central-america', label: 'Centroamérica', labelEn: 'Central America', flag: '🌎', color: '#F59E0B', countries: ['Guatemala', 'Honduras', 'Costa Rica', 'Panamá', 'El Salvador', 'Nicaragua'], countriesEn: ['Guatemala', 'Honduras', 'Costa Rica', 'Panama', 'El Salvador', 'Nicaragua'], detail: 'Mercado en expansión', detailEn: 'Growing market', location: [15, -85] as [number, number] },
  { id: 'south-america', label: 'Sudamérica', labelEn: 'South America', flag: '🇧🇷', color: '#10B981', countries: ['Perú', 'Chile', 'Brasil', 'Argentina', 'Colombia', 'Ecuador', 'Bolivia', 'Uruguay'], countriesEn: ['Peru', 'Chile', 'Brazil', 'Argentina', 'Colombia', 'Ecuador', 'Bolivia', 'Uruguay'], detail: 'Mercado regional con crecimiento sostenido', detailEn: 'Regional market with sustained growth', location: [-15, -60] as [number, number] },
  { id: 'europe', label: 'Europa', labelEn: 'Europe', flag: '🇪🇺', color: '#6366F1', countries: ['España', 'Portugal', 'Francia', 'Italia', 'Alemania', 'Grecia', 'Países Bajos', 'Reino Unido', 'Bélgica'], countriesEn: ['Spain', 'Portugal', 'France', 'Italy', 'Germany', 'Greece', 'Netherlands', 'United Kingdom', 'Belgium'], detail: 'Principal mercado de exportación', detailEn: 'Primary export market', location: [48, 15] as [number, number] },
  { id: 'africa', label: 'África', labelEn: 'Africa', flag: '🌍', color: '#EF4444', countries: ['Senegal', 'Nigeria', 'Ghana', 'Costa de Marfil', 'Egipto', 'Sudáfrica', 'Camerún'], countriesEn: ['Senegal', 'Nigeria', 'Ghana', "Ivory Coast", 'Egypt', 'South Africa', 'Cameroon'], detail: 'Mercado en crecimiento acelerado', detailEn: 'Rapidly growing market', location: [0, 20] as [number, number] },
  { id: 'russia', label: 'Rusia / CEI', labelEn: 'Russia / CIS', flag: '🇷🇺', color: '#8B5CF6', countries: ['Rusia', 'Ucrania', 'Kazajistán', 'Bielorrusia', 'Georgia'], countriesEn: ['Russia', 'Ukraine', 'Kazakhstan', 'Belarus', 'Georgia'], detail: 'Gran potencial de volumen', detailEn: 'High volume potential', location: [60, 90] as [number, number] },
  { id: 'asia', label: 'Asia', labelEn: 'Asia', flag: '🇨🇳', color: '#F97316', countries: ['China', 'Japón', 'Corea del Sur', 'Tailandia', 'Vietnam', 'Singapur', 'Hong Kong', 'Taiwán'], countriesEn: ['China', 'Japan', 'South Korea', 'Thailand', 'Vietnam', 'Singapore', 'Hong Kong', 'Taiwan'], detail: 'Mayor volumen de toneladas exportadas', detailEn: 'Highest volume in tons exported', location: [35, 105] as [number, number] },
];

function hexToRgb(hex: string): string {
  const map: Record<string, string> = {
    '#00E5FF': '0,229,255', '#F59E0B': '245,158,11', '#10B981': '16,185,129',
    '#6366F1': '99,102,241', '#EF4444': '239,68,68', '#8B5CF6': '139,92,246',
    '#F97316': '249,115,22',
  };
  return map[hex] || '0,229,255';
}

function hexToRgbArray(hex: string): [number, number, number] {
  const rgbStr = hexToRgb(hex);
  return [parseInt(rgbStr.split(',')[0])/255, parseInt(rgbStr.split(',')[1])/255, parseInt(rgbStr.split(',')[2])/255];
}

const MapGlobe = ({ activeId }: { activeId: string | null; }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const springRef = useRef({ phi: 0, theta: 0, targetPhi: 0, targetTheta: 0 });
  const baseSize = useRef(800);

  useEffect(() => {
    let globPhi = 0;
    
    const activeRegion = regions.find(r => r.id === activeId);
    if (activeRegion) {
        springRef.current.targetPhi = -activeRegion.location[1] * (Math.PI / 180);
        springRef.current.targetTheta = activeRegion.location[0] * (Math.PI / 180);
    } else {
        springRef.current.targetTheta = 0; // equator
    }

    const markers = regions.map((r) => ({
      location: r.location,
      size: r.id === activeId ? 0.08 : 0.04,
    }));
    // Add Peru
    markers.push({ location: [-5.08, -81.1], size: 0.05 });

    let globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: baseSize.current,
      height: baseSize.current,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 4,
      baseColor: [0.05, 0.1, 0.18],
      markerColor: [0, 0.9, 1],
      glowColor: [0, 0.15, 0.3],
      markers,
      // @ts-ignore
      onRender: (state: any) => {
        if (!activeId && pointerInteracting.current === null) {
          globPhi += 0.005;
        }

        if (activeId !== null || pointerInteracting.current !== null) {
             const dt = 0.05;
             springRef.current.phi += (springRef.current.targetPhi + pointerInteractionMovement.current - springRef.current.phi) * dt;
             springRef.current.theta += (springRef.current.targetTheta - springRef.current.theta) * dt;
             state.phi = springRef.current.phi;
             state.theta = springRef.current.theta;
        } else {
            state.phi = globPhi + pointerInteractionMovement.current;
            state.theta = springRef.current.theta;
            springRef.current.phi = state.phi;
        }
      }
    });

    return () => {
      globe.destroy();
    };
  }, [activeId]);

  return (
      <div style={{ width: '100%', aspectRatio: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', maxWidth: '800px', cursor: 'grab', contain: 'layout paint size', opacity: 1, transition: 'opacity 1s ease' }}
            onPointerDown={(e) => {
              pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
              if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
            }}
            onMouseMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta * 0.01;
              }
            }}
            onTouchMove={(e) => {
              if (pointerInteracting.current !== null && e.touches[0]) {
                const delta = e.touches[0].clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta * 0.01;
              }
            }}
          />
      </div>
  )
}

export default function InteractiveGlobe() {
  const [active, setActive] = useState<string | null>(null);
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
            <MapGlobe activeId={active} />
            <p style={{ textAlign: 'center', color: '#8BA0B4', fontSize: '0.75rem', marginTop: '1rem', letterSpacing: '0.04em' }}>
              {t('globe.click') || 'Interact with the 3D globe to navigate.'}
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
