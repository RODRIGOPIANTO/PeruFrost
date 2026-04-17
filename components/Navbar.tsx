'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useLang } from '@/components/LanguageContext';

const STORAGE_URL = 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/nosotros' },
    { label: t('nav.catalog'), href: '/catalogo' },
    { label: t('nav.quality'), href: '/calidad' },
    { label: t('nav.infra'), href: '/infraestructura' },
    { label: t('nav.contact'), href: '/contacto' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled || menuOpen ? 'bg-[#04111f] border-b border-[#00c8e6]/15' : 'bg-transparent'}`}>
        <div className="nav-container">
          
          {/* Logo Section */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img 
              src={scrolled || menuOpen ? '/recursos/logo_dark.png' : '/recursos/logo_white.png'} 
              alt="Perú Frost" 
              style={{ height: '32px', width: 'auto' }} 
            />
            <div style={{ borderLeft: `1px solid ${scrolled || menuOpen ? 'rgba(255,255,255,0.15)' : 'rgba(4,17,31,0.15)'}`, paddingLeft: '12px' }}>
              <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: '13px', color: scrolled || menuOpen ? '#fff' : '#04111f', lineHeight: 1.1, letterSpacing: '0.04em' }}>PERÚ FROST</div>
              <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.15em', color: '#00c8e6' }}>S.A.C.</div>
            </div>
          </Link>

          {/* Center Links (Desktop Only) */}
          <div className="nav-links">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '13px', fontWeight: active ? 700 : 500,
                    color: active ? '#00c8e6' : 'rgba(255,255,255,0.65)',
                    textDecoration: 'none', transition: 'color 0.2s', padding: '10px 0'
                  }}
                  onMouseEnter={e => !active && (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => !active && (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Lang Toggle (Desktop) */}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="hidden lg:flex"
              style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
                fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '4px'
              }}
            >
              <span style={{ color: lang === 'es' ? '#00c8e6' : 'inherit' }}>ES</span>
              <span>/</span>
              <span style={{ color: lang === 'en' ? '#00c8e6' : 'inherit' }}>EN</span>
            </button>

            {/* CTA button (Desktop) */}
            <Link href="/contacto" className="cta-desktop btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.78rem' }}>
              {t('nav.cta')}
            </Link>

            {/* Hamburger (Mobile) */}
            <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        
        {/* Mobile Language Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Globe size={14} color="#00c8e6" />
            <button 
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '14px', fontWeight: 600, padding: 0 }}
            >
                {lang === 'es' ? 'English Version' : 'Versión en Español'}
            </button>
        </div>

        <Link href="/contacto" className="cta-mobile" onClick={() => setMenuOpen(false)}>
          {t('nav.cta')}
        </Link>
      </div>
    </>
  );
}
