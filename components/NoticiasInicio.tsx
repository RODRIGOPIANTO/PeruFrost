'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLang } from './LanguageContext';
import { ArrowRight } from 'lucide-react';

const STORAGE_URL = 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/'

const noticiasEscritas = {
  es: [
    {
      id: 1,
      titulo: 'Alianza para Modernización Tecnológica',
      descripcion: 'Perú Frost firma acuerdo para la modernización tecnológica de su planta de procesamiento, incorporando equipos de congelado de última generación.',
      imagen: STORAGE_URL + 'news_yantai.webp',
      featured: true,
    },
    {
      id: 2,
      titulo: 'Ampliación de Planta de Ósmosis',
      descripcion: 'Capacidad incrementada a 2,000 m³ diarios para optimizar el suministro de agua y los estándares sanitarios.',
      imagen: STORAGE_URL + 'news_osmosis.webp',
      featured: false,
    },
    {
      id: 3,
      titulo: 'Perú Frost Alcanza Máxima Calificación SANIPES',
      descripcion: 'La planta recibe la clasificación más alta de sanidad por parte de la autoridad operativa SANIPES.',
      imagen: STORAGE_URL + 'news_planta.webp',
      featured: false,
    },
  ],
  en: [
    {
      id: 1,
      titulo: 'Modernization Technology Alliance',
      descripcion: 'Peru Frost signs a strategic agreement to modernize its processing plant with state-of-the-art freezing equipment.',
      imagen: STORAGE_URL + 'news_yantai.webp',
      featured: true,
    },
    {
      id: 2,
      titulo: 'Osmosis Plant Expansion',
      descripcion: 'Capacity increased to 2,000 cubic meters per day to optimize our water supply and sanitary standards.',
      imagen: STORAGE_URL + 'news_osmosis.webp',
      featured: false,
    },
    {
      id: 3,
      titulo: 'Peru Frost Achieves Top SANIPES Rating',
      descripcion: 'The processing plant receives the highest sanitary classification ranking from the SANIPES authority.',
      imagen: STORAGE_URL + 'news_planta.webp',
      featured: false,
    },
  ],
};

export default function NoticiasInicio() {
  const { lang } = useLang();
  const noticias = lang === 'es' ? noticiasEscritas.es : noticiasEscritas.en;
  const label = lang === 'es' ? 'Corporativo' : 'Corporate';
  const readMore = lang === 'es' ? 'LEER MÁS' : 'READ MORE';

  return (
    <section style={{ background: '#04111f', padding: '80px 32px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&family=DM+Sans:wght@400;500&display=swap');

        .news-card {
          background: #071828;
          border: 1px solid rgba(0,200,230,0.10);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.25s, transform 0.25s;
          display: flex;
          flex-direction: column;
        }
        .news-card:hover {
          border-color: rgba(0,200,230,0.45);
          transform: translateY(-4px);
        }
        .news-read-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #00c8e6;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: gap 0.2s;
          text-decoration: none;
        }
        .news-card:hover .news-read-more {
          gap: 10px;
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Eyebrow + Headline */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            border: '1px solid rgba(0,200,230,0.3)', borderRadius: '20px',
            padding: '5px 14px', marginBottom: '20px',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00c8e6', flexShrink: 0 }} />
            <span style={{ color: '#00c8e6', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {lang === 'es' ? 'NOVEDADES Y ACTUALIDAD' : 'LATEST UPDATES'}
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(40px, 5vw, 56px)',
            lineHeight: 1.05,
            color: '#ffffff',
            margin: 0,
          }}>
            {lang === 'es'
              ? <>Últimas <span style={{ color: '#00c8e6' }}>Noticias</span></>
              : <>Latest <span style={{ color: '#00c8e6' }}>News</span></>}
          </h2>
        </div>

        {/* Asymmetric Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.35fr 1fr 1fr',
          gap: '20px',
        }}
          className="news-grid-responsive"
        >
          {noticias.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (item.id - 1) * 0.12 }}
              className="news-card"
            >
              {/* Image with overlay badge */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: item.featured ? '16/9' : '16/10',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <Image
                  src={item.imagen}
                  alt={item.titulo}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(transparent 40%, rgba(4,17,31,0.85))',
                  zIndex: 1,
                }} />
                {/* Badge on bottom-left */}
                <div style={{
                  position: 'absolute', bottom: '12px', left: '12px', zIndex: 2,
                  background: 'rgba(0,200,230,0.18)',
                  color: '#00c8e6',
                  border: '1px solid rgba(0,200,230,0.3)',
                  borderRadius: '6px',
                  padding: '3px 10px',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>{label}</div>
              </div>

              {/* Card body */}
              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: item.featured ? '1.3rem' : '1.1rem',
                  color: '#fff',
                  lineHeight: 1.2,
                  margin: 0,
                }}>{item.titulo}</h3>

                <p style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.6,
                  margin: 0,
                  flex: 1,
                }}>{item.descripcion}</p>

                <div style={{ borderTop: '1px solid rgba(0,200,230,0.08)', paddingTop: '12px' }}>
                  <span className="news-read-more">
                    {readMore} <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 900px) {
          .news-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 601px) and (max-width: 900px) {
          .news-grid-responsive {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
