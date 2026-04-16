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
      titulo: 'ALIANZA PARA MODERNIZACIÓN',
      descripcion: 'Perú Frost firma acuerdo con Yantai Moon para la mejora tecnológica de su planta de procesamiento.',
      imagen: STORAGE_URL + 'news_yantai.webp',
    },
    {
      id: 2,
      titulo: 'AMPLIACIÓN DE PLANTA DE ÓSMOSIS',
      descripcion: 'Capacidad incrementada a 2,000 m³ diarios para optimizar el suministro de agua y los estándares sanitarios.',
      imagen: STORAGE_URL + 'news_osmosis.webp',
    },
    {
      id: 3,
      titulo: 'PLANTA PERÚ FROST SE MODERNIZA',
      descripcion: 'Planta de Perú Frost recibe la clasificación más alta de sanidad por parte de la autoridad operativa SANIPES.',
      imagen: STORAGE_URL + 'news_planta.webp',
    }
  ],
  en: [
    {
      id: 1,
      titulo: 'MODERNIZATION ALLIANCE',
      descripcion: 'Peru Frost signs an agreement with Yantai Moon to upgrade the processing plant\'s technology.',
      imagen: STORAGE_URL + 'news_yantai.webp',
    },
    {
      id: 2,
      titulo: 'OSMOSIS PLANT EXPANSION',
      descripcion: 'Capacity increased to 2,000 cubic meters per day to optimize our water supply and sanitary standards.',
      imagen: STORAGE_URL + 'news_osmosis.webp',
    },
    {
      id: 3,
      titulo: 'PERU FROST PLANT SURGES FORWARD',
      descripcion: 'The Peru Frost processing plant receives the highest sanitary classification ranking from SANIPES authority.',
      imagen: STORAGE_URL + 'news_planta.webp',
    }
  ]
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function NoticiasInicio() {
  const { lang } = useLang();
  const noticias = lang === 'es' ? noticiasEscritas.es : noticiasEscritas.en;

  return (
    <section className="py-28 relative overflow-hidden bg-[#0D1326]">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1000px] relative z-10">
        
        {/* Header de la seccion - Centrado estilo Nosotros */}
        <div className="text-center mb-16">
          <span className="highlight-tag mb-4 inline-block">
            {lang === 'es' ? 'Novedades y Actualidad' : 'Latest Updates'}
          </span>
          <h2 className="text-white font-black text-4xl lg:text-5xl font-tight tracking-tight leading-tight">
            {lang === 'es' ? (
              <>Últimas <span className="gradient-text">Noticias</span></>
            ) : (
              <>Latest <span className="gradient-text">News</span></>
            )}
          </h2>
        </div>

        {/* Grid de Noticias - Centrado y con espaciado consistente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {noticias.map((item, index) => (
            <motion.div 
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              transition={{ delay: index * 0.15 }}
              className={`group cursor-pointer flex flex-col ${index === 2 ? 'md:col-span-2 md:max-w-[484px] md:mx-auto lg:col-span-1 lg:max-w-none' : ''}`}
            >
              {/* Card Container Premium */}
              <div 
                className="flex-1 flex flex-col bg-[#1A2238]/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#0ea5e9]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative"
              >
                {/* Image Wrapper */}
                <div className="relative w-full h-[240px] overflow-hidden">
                  <div className="absolute inset-0 bg-[#0D1326]/30 z-10 transition-all duration-500 group-hover:bg-transparent" />
                  <Image 
                    src={item.imagen} 
                    alt={item.titulo} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-[#1A2238]/80 backdrop-blur-md rounded border border-white/10 text-[9px] font-black text-[#0ea5e9] uppercase tracking-widest">
                      {lang === 'es' ? 'Corporativo' : 'Corporate'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1 relative">
                  <h3 className="text-xl font-black text-white leading-snug mb-4 group-hover:text-[#00e5ff] transition-colors duration-300 font-tight">
                    {item.titulo}
                  </h3>
                  
                  <p className="text-[#8BA0B4] text-sm leading-relaxed mb-8 flex-1">
                    {item.descripcion}
                  </p>
                  
                  <div className="flex items-center gap-2 text-[#0ea5e9] group-hover:text-white transition-all duration-300">
                    <span className="text-xs font-black tracking-widest uppercase">
                      {lang === 'es' ? 'Leer Más' : 'Read More'}
                    </span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
