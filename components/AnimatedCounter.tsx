'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

export function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2.5, label, sublabel, icon }: CounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = counterRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration,
          ease: 'power3.out',
          onUpdate() {
            if (el) el.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix;
          },
        });
      },
    });
    return () => trigger.kill();
  }, [end, suffix, prefix, duration]);

  return (
    <div style={{
      background: 'rgba(26,34,56,0.6)', backdropFilter: 'blur(20px)',
      border: '1px solid rgba(0,229,255,0.15)', borderRadius: '16px',
      padding: '2.25rem 1.5rem', textAlign: 'center',
      transition: 'all 0.3s ease',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,255,0.4)';
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,255,0.15)';
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
      }}
    >
      {icon && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem', color: '#00E5FF', opacity: 0.85 }}>
          {icon}
        </div>
      )}
      <div className="stat-number" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '0.875rem' }}>
        <span ref={counterRef}>{prefix}0{suffix}</span>
      </div>
      <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#fff', marginBottom: '0.4rem' }}>
        {label}
      </div>
      {sublabel && (
        <div style={{ color: '#8BA0B4', fontSize: '0.82rem' }}>{sublabel}</div>
      )}
    </div>
  );
}
