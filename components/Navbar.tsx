'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { useLang } from '@/components/LanguageContext';

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

  // Close mobile menu on route change
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
      <nav
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
        className={`transition-all duration-500 ${
          scrolled || menuOpen
            ? 'bg-[#0A0F1F]/96 backdrop-blur-xl border-b border-[#00E5FF]/10 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

            {/* Logo + Name */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <img
                src="/recursos/logo_white.png"
                alt="Perú Frost"
                style={{ height: '38px', width: 'auto', objectFit: 'contain', display: 'block', flexShrink: 0 }}
              />
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '12px' }}>
                <div style={{
                  fontFamily: "'Inter Tight', sans-serif", fontWeight: 900,
                  fontSize: '15px', color: '#fff', lineHeight: 1.1, letterSpacing: '0.03em',
                }}>PERÚ FROST</div>
                <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.18em', color: '#00E5FF', marginTop: '1px' }}>S.A.C.</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden lg:flex">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontSize: '0.85rem', fontWeight: active ? 700 : 500,
                      color: active ? '#00E5FF' : '#8BA0B4',
                      textDecoration: 'none', position: 'relative',
                      padding: '6px 12px', borderRadius: '8px',
                      background: active ? 'rgba(0,229,255,0.08)' : 'transparent',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.color = '#fff';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.color = '#8BA0B4';
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }
                    }}
                  >
                    {link.label}
                    {active && (
                      <span style={{
                        position: 'absolute', bottom: '-2px', left: '50%',
                        transform: 'translateX(-50%)',
                        width: '16px', height: '2px',
                        background: '#00E5FF', borderRadius: '9999px',
                      }} />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Language Toggle - Desktop */}
              <button
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="hidden lg:flex"
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em',
                  color: '#8BA0B4', background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px', padding: '6px 12px', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.color = '#00E5FF';
                  el.style.borderColor = 'rgba(0,229,255,0.4)';
                  el.style.background = 'rgba(0,229,255,0.08)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.color = '#8BA0B4';
                  el.style.borderColor = 'rgba(255,255,255,0.12)';
                  el.style.background = 'rgba(255,255,255,0.05)';
                }}
              >
                <Globe size={12} />
                <span>{lang === 'es' ? 'ES' : 'EN'}</span>
                <span style={{ opacity: 0.4 }}>|</span>
                <span>{lang === 'es' ? 'EN' : 'ES'}</span>
              </button>

              {/* CTA - Desktop */}
              <Link href="/contacto" className="btn-primary hidden lg:inline-flex" style={{ fontSize: '0.82rem', padding: '0.6rem 1.25rem' }}>
                {t('nav.cta')}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden"
                aria-label="Menú"
                style={{
                  padding: '8px', color: '#fff', background: menuOpen ? 'rgba(0,229,255,0.1)' : 'none',
                  border: menuOpen ? '1px solid rgba(0,229,255,0.3)' : '1px solid transparent',
                  borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — full screen overlay */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 40, background: 'rgba(8,12,25,0.98)', backdropFilter: 'blur(24px)',
          display: 'flex', flexDirection: 'column',
          paddingTop: '90px', paddingBottom: '2rem',
          transition: 'opacity 0.3s, transform 0.3s',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-12px)',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        className="lg:hidden"
      >
        {/* Nav links */}
        <div style={{ flex: 1, overflowY: 'auto', paddingInline: '1.75rem' }}>
          {navLinks.map((link, i) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontSize: '1.35rem', fontWeight: 800, fontFamily: "'Inter Tight', sans-serif",
                  color: active ? '#00E5FF' : '#fff', textDecoration: 'none',
                  padding: '1.1rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.35s ease ${i * 0.06}s`,
                }}
              >
                <span>{link.label}</span>
                {active && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00E5FF' }} />}
              </Link>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div style={{ paddingInline: '1.75rem', paddingTop: '1.5rem',  borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <button
            onClick={() => { setLang(lang === 'es' ? 'en' : 'es'); setMenuOpen(false); }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              fontSize: '0.9rem', fontWeight: 700, color: '#8BA0B4',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '12px', padding: '0.875rem', cursor: 'pointer',
            }}
          >
            <Globe size={16} />
            {lang === 'es' ? '🌐 Switch to English' : '🌐 Cambiar a Español'}
          </button>
          <Link
            href="/contacto"
            onClick={() => setMenuOpen(false)}
            className="btn-primary"
            style={{ justifyContent: 'center', fontSize: '0.95rem', padding: '0.95rem 2rem' }}
          >
            {t('nav.cta')}
          </Link>
        </div>
      </div>
    </>
  );
}
