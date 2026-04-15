'use client';

import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { useLang } from '@/components/LanguageContext';
import { infoEmpresa } from '@/data/empresa';

export default function Footer() {
  const { t, lang } = useLang();

  return (
    <footer style={{ background: '#070D1A', borderTop: '1px solid rgba(0,229,255,0.12)', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' }}>
        
        {/* Top section - Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1.5fr) 1fr 1fr minmax(300px, 1.5fr)', gap: '3rem', marginBottom: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '0.5rem' }}>
              <img src="/recursos/logo_white.png" alt={infoEmpresa.nombre} style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
              <div>
                <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: '13px', color: '#fff', lineHeight: 1.1 }}>{infoEmpresa.nombre.split(' ')[0]} {infoEmpresa.nombre.split(' ')[1]}</div>
                <div style={{ fontSize: '8px', fontWeight: 600, letterSpacing: '0.15em', color: '#00E5FF' }}>{infoEmpresa.nombre.split(' ')[2]}</div>
              </div>
            </Link>
            <p style={{ color: '#8BA0B4', fontSize: '0.85rem', lineHeight: 1.7 }}>
              {lang === 'es' ? infoEmpresa.branding.desc.es : infoEmpresa.branding.desc.en}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '0.8rem', color: '#00E5FF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{t('footer.nav')}</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link href="/nosotros" className="footer-link">{t('nav.about')}</Link></li>
              <li><Link href="/catalogo" className="footer-link">{t('nav.catalog')}</Link></li>
              <li><Link href="/calidad" className="footer-link">{t('nav.quality')}</Link></li>
              <li><Link href="/infraestructura" className="footer-link">{t('nav.infra')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '0.8rem', color: '#00E5FF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{t('footer.legal')}</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link href="/privacidad" className="footer-link">{lang === 'es' ? 'Privacidad' : 'Privacy'}</Link></li>
              <li><Link href="/terminos" className="footer-link">{lang === 'es' ? 'Términos' : 'Terms'}</Link></li>
              <li><Link href="/compliance" className="footer-link">Compliance</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
             <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '0.8rem', color: '#00E5FF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{t('footer.contact')}</h3>
             <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                 <Mail size={16} color="#00E5FF" />
                 <a href={`mailto:${infoEmpresa.contacto.email}`} style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>{infoEmpresa.contacto.email}</a>
               </li>
               {infoEmpresa.ubicaciones.map((loc) => (
                 <li key={loc.tipo} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                   <MapPin size={16} color="#00E5FF" style={{ marginTop: '2px' }} />
                   <div>
                     <p style={{ color: '#fff', fontSize: '0.85rem', lineHeight: 1.5 }}>
                       <strong>{loc.tipo}:</strong> {loc.ciudad}<br/>
                       <span style={{ color: '#8BA0B4' }}>{loc.direccion}</span>
                     </p>
                   </div>
                 </li>
               ))}
             </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <p style={{ color: '#8BA0B4', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} {infoEmpresa.nombre} — RUC {infoEmpresa.ruc}. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,229,255,0.05)', padding: '6px 24px', borderRadius: '12px', border: '1px solid rgba(0,229,255,0.2)' }}>
            <span style={{ color: '#00E5FF', fontSize: '0.75rem', fontWeight: 900 }}>{infoEmpresa.certificacionPrincipal.nombre} — Grado {infoEmpresa.certificacionPrincipal.grado}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
