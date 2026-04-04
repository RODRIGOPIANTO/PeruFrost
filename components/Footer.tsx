'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useLang } from '@/components/LanguageContext';

export default function Footer() {
  const { t, lang } = useLang();

  const navLinks = [
    { label: t('nav.about'), href: '/nosotros' },
    { label: t('nav.catalog'), href: '/catalogo' },
    { label: t('nav.quality'), href: '/calidad' },
    { label: t('nav.infra'), href: '/infraestructura' },
  ];

  const legalLinks = [
    { label: lang === 'es' ? 'Política de Privacidad' : 'Privacy Policy', href: '/privacidad' },
    { label: lang === 'es' ? 'Gestión Ética' : 'Ethics', href: '/gestion-etica' },
    { label: lang === 'es' ? 'Política SIG' : 'SIG Policy', href: '/politica-sig' },
    { label: 'Compliance', href: '/compliance' },
  ];

  return (
    <footer style={{ background: '#070D1A', borderTop: '1px solid rgba(0,229,255,0.12)', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingInline: '1.5rem' }}>
        
        {/* Top section - Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1.5fr) 1fr 1fr minmax(300px, 1.5fr)', gap: '3rem', marginBottom: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '0.5rem' }}>
              <img src="/recursos/logo_white.png" alt="Perú Frost" style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
              <div>
                <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: '13px', color: '#fff', lineHeight: 1.1 }}>PERÚ FROST</div>
                <div style={{ fontSize: '8px', fontWeight: 600, letterSpacing: '0.15em', color: '#00E5FF' }}>S.A.C.</div>
              </div>
            </Link>
            <p style={{ color: '#8BA0B4', fontSize: '0.85rem', lineHeight: 1.7 }}>
              {lang === 'es' 
                ? 'Exportamos productos marinos de primera calidad bajo estrictos estándares internacionales. Del mar peruano al mundo.' 
                : 'We export premium marine products under strict international standards. From the Peruvian sea to the world.'}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '0.8rem', color: '#00E5FF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{t('footer.nav')}</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navLinks.map(link => (
                <li key={link.href}><Link href={link.href} style={{ color: '#8BA0B4', fontSize: '0.85rem', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#00E5FF'} onMouseLeave={e => e.currentTarget.style.color = '#8BA0B4'}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '0.8rem', color: '#00E5FF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{t('footer.legal')}</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {legalLinks.map(link => (
                <li key={link.href}><Link href={link.href} style={{ color: '#8BA0B4', fontSize: '0.85rem', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#00E5FF'} onMouseLeave={e => e.currentTarget.style.color = '#8BA0B4'}>{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact Details (Combined to save space) */}
          <div>
             <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '0.8rem', color: '#00E5FF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{t('footer.contact')}</h3>
             <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                 <Mail size={16} color="#00E5FF" style={{ flexShrink: 0 }} />
                 <a href="mailto:ventas@perufrost.com" style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>ventas@perufrost.com</a>
               </li>
               <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                 <MapPin size={16} color="#00E5FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                 <div>
                   <p style={{ color: '#fff', fontSize: '0.85rem', lineHeight: 1.5 }}>
                     <strong>Planta:</strong> Paita, Piura (Perú)<br/>
                     <span style={{ color: '#8BA0B4' }}>Jr. Los Pescadores Nº 946</span>
                   </p>
                 </div>
               </li>
               <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                 <MapPin size={16} color="#8BA0B4" style={{ flexShrink: 0, marginTop: '2px' }} />
                 <div>
                   <p style={{ color: '#fff', fontSize: '0.85rem', lineHeight: 1.5 }}>
                     <strong>Oficina:</strong> Surco, Lima (Perú)<br/>
                     <span style={{ color: '#8BA0B4' }}>Av. Manuel Olguín Nº 501</span>
                   </p>
                 </div>
               </li>
             </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <p style={{ color: '#8BA0B4', fontSize: '0.8rem' }}>{t('footer.copy')}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,229,255,0.05)', padding: '6px 12px', borderRadius: '9999px', border: '1px solid rgba(0,229,255,0.2)' }}>
            <span style={{ color: '#00E5FF', fontSize: '0.75rem', fontWeight: 800 }}>BRCGS Food Safety — Grado AA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
