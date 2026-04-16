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
      imagen: STORAGE_URL + 'noticia_alianza.webp',
    },
    {
      id: 2,
      titulo: 'AMPLIACIÓN DE PLANTA DE ÓSMOSIS',
      descripcion: 'Capacidad incrementada a 2,000 m³ diarios para optimizar el suministro de agua y los estándares sanitarios.',
      imagen: STORAGE_URL + 'noticia_osmosis.webp',
    },
    {
      id: 3,
      titulo: 'PLANTA PERÚ FROST SE MODERNIZA',
      descripcion: 'Planta de Perú Frost recibe la clasificación más alta de sanidad por parte de la autoridad operativa SANIPES.',
      imagen: STORAGE_URL + 'noticia_planta.webp',
    }
  ],
  en: [
    {
      id: 1,
      titulo: 'MODERNIZATION ALLIANCE',
      descripcion: 'Peru Frost signs an agreement with Yantai Moon to upgrade the processing plant\'s technology.',
      imagen: STORAGE_URL + 'noticia_alianza.webp',
    },
    {
      id: 2,
      titulo: 'OSMOSIS PLANT EXPANSION',
      descripcion: 'Capacity increased to 2,000 cubic meters per day to optimize our water supply and sanitary standards.',
      imagen: STORAGE_URL + 'noticia_osmosis.webp',
    },
    {
      id: 3,
      titulo: 'PERU FROST PLANT SURGES FORWARD',
      descripcion: 'The Peru Frost processing plant receives the highest sanitary classification ranking from SANIPES authority.',
      imagen: STORAGE_URL + 'noticia_planta.webp',
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
    <section className="py-24 relative overflow-hidden bg-[#0A0F1F]">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header de la seccion */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-[#0ea5e9] font-black uppercase tracking-[0.2em] text-sm mb-4 block">
            {lang === 'es' ? 'Novedades y Actualidad' : 'Latest Updates'}
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white font-tight tracking-tight">
            {lang === 'es' ? 'NOTICIAS' : 'NEWS'}
          </h2>
          <div className="w-20 h-1 bg-[#0ea5e9] mx-auto mt-6 rounded-full" />
        </div>

        {/* Grid de Noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {noticias.map((item, index) => (
            <motion.div 
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              transition={{ delay: index * 0.15 }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Card Container Premium */}
              <div 
                className="flex-1 flex flex-col bg-[#1A2238]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#0ea5e9]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-2 relative"
              >
                {/* Image Wrapper */}
                <div className="relative w-full h-[220px] sm:h-[250px] overflow-hidden">
                  <div className="absolute inset-0 bg-[#0A0F1F]/40 z-10 transition-all duration-500 group-hover:bg-transparent" />
                  <Image 
                    src={item.imagen} 
                    alt={item.titulo} 
                    fill 
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  {/* Decorative corner tag */}
                  <div className="absolute top-4 left-4 z-20 bg-[#0ea5e9]/90 backdrop-blur-md rounded border border-white/10 px-3 py-1">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      {lang === 'es' ? 'Corporativo' : 'Corporate'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1 relative">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0ea5e9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <h3 className="text-xl font-black text-white leading-tight mb-4 group-hover:text-[#00e5ff] transition-colors duration-300 uppercase">
                    {item.titulo}
                  </h3>
                  
                  <p className="text-[#8BA0B4] text-sm leading-relaxed mb-6 flex-1">
                    {item.descripcion}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-auto text-[#0ea5e9] group-hover:text-white transition-colors duration-300">
                    <span className="text-sm font-bold tracking-wide uppercase">
                      {lang === 'es' ? 'Leer Más' : 'Read More'}
                    </span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
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
