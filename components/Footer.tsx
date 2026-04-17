'use client';

import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { useLang } from '@/components/LanguageContext';
import { infoEmpresa } from '@/data/empresa';

const STORAGE_URL = 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/'

export default function Footer() {
  const { t, lang } = useLang();

  return (
    <footer style={{ background: '#04111f', borderTop: '1px solid rgba(0,200,230,0.1)' }}>
      <div className="footer-grid">
        
        {/* Brand Column */}
        <div>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '20px' }}>
            <img src={STORAGE_URL + 'logo_white.webp'} alt={infoEmpresa.nombre} style={{ height: '30px', width: 'auto' }} />
            <div>
              <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: '12px', color: '#fff', lineHeight: 1.1 }}>{infoEmpresa.nombre.split(' ')[0]} {infoEmpresa.nombre.split(' ')[1]}</div>
              <div style={{ fontSize: '8px', fontWeight: 600, letterSpacing: '0.15em', color: '#00c8e6' }}>{infoEmpresa.nombre.split(' ')[2]}</div>
            </div>
          </Link>
          <p className="footer-desc">
            {lang === 'es' ? infoEmpresa.branding.desc.es : infoEmpresa.branding.desc.en}
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <h3 className="footer-title">{t('footer.nav')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/nosotros" className="footer-link">{t('nav.about')}</Link>
            <Link href="/catalogo" className="footer-link">{t('nav.catalog')}</Link>
            <Link href="/calidad" className="footer-link">{t('nav.quality')}</Link>
            <Link href="/infraestructura" className="footer-link">{t('nav.infra')}</Link>
          </div>
        </div>

        {/* Legal Column */}
        <div>
          <h3 className="footer-title">{t('footer.legal')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/privacidad" className="footer-link">{lang === 'es' ? 'Privacidad' : 'Privacy'}</Link>
            <Link href="/terminos" className="footer-link">{lang === 'es' ? 'Términos' : 'Terms'}</Link>
            <Link href="/compliance" className="footer-link">Compliance</Link>
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="footer-title">{t('footer.contact')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="footer-contact-item">
              <Mail size={16} color="#00c8e6" style={{ minWidth: '16px' }} />
              <a href={`mailto:${infoEmpresa.contacto.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{infoEmpresa.contacto.email}</a>
            </div>
            {infoEmpresa.ubicaciones.map((loc) => (
              <div key={loc.tipo} className="footer-contact-item">
                <MapPin size={16} color="#00c8e6" style={{ minWidth: '16px' }} />
                <span>
                  <strong>{loc.tipo}:</strong> {loc.ciudad}<br/>
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>{loc.direccion}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div>
          © {new Date().getFullYear()} {infoEmpresa.nombre} — RUC {infoEmpresa.ruc}. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
        </div>
        
        {/* BRCGS Badge */}
        <div style={{
          border: '1px solid rgba(0,200,230,0.25)',
          color: '#00c8e6',
          padding: '6px 14px',
          borderRadius: '6px',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {infoEmpresa.certificacionPrincipal.nombre} — Grado {infoEmpresa.certificacionPrincipal.grado}
        </div>
      </div>
    </footer>
  );
}
