'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Clock, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLang } from '@/components/LanguageContext';
import Image from 'next/image';

const STORAGE_URL = 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function ContactoPage() {
  const { lang, t } = useLang();

  const contactItems = [
    {
      icon: <Mail size={24} />, label: lang === 'es' ? 'Email Comercial' : 'Sales Email',
      value: 'mk@perufrost.com', href: 'mailto:mk@perufrost.com',
      note: lang === 'es' ? 'Respuesta en < 24h hábiles' : 'Reply within 24h',
    },
    {
      icon: <Phone size={24} />, label: lang === 'es' ? 'Línea de Ventas' : 'Sales Line',
      value: '+51 073 211 412', href: 'tel:+51073211412',
      note: lang === 'es' ? 'Lunes - Viernes, 8am-6pm (PET)' : 'Mon - Fri, 8am-6pm (PET)',
    },
  ];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px' }}>


        {/* ─── CONTACT SECTION ─── */}
        <section style={{ padding: '3rem 0 6rem' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }} className="lg:grid-cols-2">

              {/* Left col: Direct Contact */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div>
                  <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1.75rem', marginBottom: '1.5rem', color: '#fff' }}>
                    {lang === 'es' ? 'Contacto Directo' : 'Direct Contact'}
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }} className="sm:grid-cols-2">
                    {contactItems.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        style={{ background: 'rgba(26,34,56,0.6)', border: '1px solid rgba(0,229,255,0.15)', borderRadius: '20px', padding: '2rem' }}
                      >
                        <div style={{ width: '48px', height: '48px', background: 'rgba(0,229,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00E5FF', marginBottom: '1.25rem' }}>
                          {item.icon}
                        </div>
                        <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8BA0B4', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>{item.label}</p>
                        <a href={item.href || '#'} style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1.15rem', color: '#fff', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}>{item.value}</a>
                        <p style={{ color: '#8BA0B4', fontSize: '0.8rem' }}>{item.note}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Offices visual */}
                <div>
                  <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>
                    {lang === 'es' ? 'Sedes Perú Frost' : 'Perú Frost HQ'}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Paita */}
                    <a
                      href="https://maps.app.goo.gl/xdzzTju5SokJN8Ex9"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <div style={{ display: 'flex', gap: '1.25rem', background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.15)', borderRadius: '16px', padding: '1.25rem', alignItems: 'center', transition: 'border-color 0.2s', cursor: 'pointer' }}>
                        <div style={{ width: '90px', height: '90px', position: 'relative', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                          <Image src={STORAGE_URL + 'planta.webp'} alt="Paita" fill className="object-cover" />
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <MapPin size={14} color="#00E5FF" />
                            <span style={{ fontSize: '0.7rem', color: '#00E5FF', fontWeight: 800, textTransform: 'uppercase' }}>{lang === 'es' ? 'Planta de Procesamiento' : 'Processing Plant'}</span>
                          </div>
                          <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: '0.25rem' }}>Paita, Piura (Perú)</h3>
                          <p style={{ color: '#8BA0B4', fontSize: '0.85rem' }}>Jr. Los Pescadores Nº 946. Zona Industrial 1.</p>
                        </div>
                      </div>
                    </a>
                    {/* Lima */}
                    <div style={{ display: 'flex', gap: '1.25rem', background: 'rgba(26,34,56,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '1.25rem', alignItems: 'center' }}>
                      <div style={{ width: '90px', height: '90px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <MapPin size={32} color="#8BA0B4" />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '0.7rem', color: '#8BA0B4', fontWeight: 800, textTransform: 'uppercase' }}>{lang === 'es' ? 'Oficina Comercial' : 'Commercial Office'}</span>
                        </div>
                        <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: '0.25rem' }}>Lima Capital</h3>
                        <p style={{ color: '#8BA0B4', fontSize: '0.85rem' }}>Av. Manuel Olguín Nº 501. Santiago de Surco.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right col: Visual representation replacing form to make it more attractive */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(26,34,56,0.8), rgba(10,15,31,0.9))',
                  border: '1px solid rgba(0,229,255,0.2)', borderRadius: '32px',
                  padding: '3rem', width: '100%', position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #00E5FF, transparent)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <MessageSquare size={48} color="#00E5FF" />
                    <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '2rem', color: '#fff', lineHeight: 1.1 }}>
                      {lang === 'es' ? '¿Listo para cotizar?' : 'Ready to quote?'}
                    </h2>
                    <p style={{ color: '#8BA0B4', fontSize: '1.05rem', lineHeight: 1.8 }}>
                      {lang === 'es'
                        ? 'Escríbanos directamente a nuestro correo de ventas. Nos encargaremos de procesar su solicitud, confirmar stock, capacidad de producción y preparar su proforma CIF/FOB en tiempo récord.'
                        : 'Write directly to our sales email. We will process your request, confirm stock and production capacity, and prepare your CIF/FOB proforma in record time.'}
                    </p>

                    <div style={{ padding: '1.5rem', background: 'rgba(0,229,255,0.06)', borderRadius: '16px', border: '1px dashed rgba(0,229,255,0.3)' }}>
                      <p style={{ color: '#00E5FF', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{lang === 'es' ? 'Por favor incluya:' : 'Please include:'}</p>
                      <ul style={{ color: '#fff', fontSize: '0.9rem', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <li>{lang === 'es' ? 'Producto (y nombre científico si aplica)' : 'Product (and scientific name if applicable)'}</li>
                        <li>{lang === 'es' ? 'Talla / Peso / Formato' : 'Size / Weight / Format'}</li>
                        <li>{lang === 'es' ? 'Tipo de empaque requerido' : 'Required packaging type'}</li>
                        <li>{lang === 'es' ? 'Puerto de destino final' : 'Final destination port'}</li>
                      </ul>
                    </div>

                    <a href="mailto:mk@perufrost.com" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', padding: '1.1rem', fontSize: '1.1rem' }}>
                      <Mail size={18} /> {lang === 'es' ? 'Enviar solicitud a ventas' : 'Send request to sales'}
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
