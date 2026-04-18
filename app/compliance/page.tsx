'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '@/components/LanguageContext';

const translations = {
  es: {
    back: 'Volver al inicio',
    tag: 'Compliance Corporativo',
    title: 'Política de Compliance',
    subtitle: 'PERÚ FROST S.A.C. opera bajo un marco de ética y transparencia absoluta, con cero tolerancia a la corrupción.',
    frameworkTitle: 'Marco de Compliance',
    frameworkContent: 'El programa de compliance corporativo de PERÚ FROST S.A.C. está diseñado para prevenir, detectar y responder a conductas que puedan constituir infracciones legales, éticas o regulatorias, en cumplimiento de la Ley N° 30424 (Responsabilidad Administrativa de las Personas Jurídicas) y sus modificatorias.',
    pillarsTitle: 'Pilares del Programa',
    pillars: [
      { n: '1', title: 'Cero Tolerancia a la Corrupción', desc: 'Prohibición estricta y absoluta de sobornos, coimas, pagos de facilitación y cualquier forma de corrupción pública o privada, en cumplimiento con la Convención de la OCDE y la ley peruana.' },
      { n: '2', title: 'Ley 30424 — Modelo de Prevención', desc: 'Implementación del Modelo de Prevención para la prevención de lavado de activos, cohecho activo transnacional, colusión y financiamiento del terrorismo.' },
      { n: '3', title: 'Canal de Denuncias Confidencial', desc: 'Sistema seguro y confidencial disponible para colaboradores, proveedores y terceros. Todas las denuncias son investigadas de forma imparcial y las personas que reporten de buena fe están protegidas contra represalias.' },
      { n: '4', title: 'Debida Diligencia (Due Diligence)', desc: 'Filtro riguroso de proveedores, socios comerciales y clientes mediante procesos de evaluación KYC (Know Your Customer) y KYS (Know Your Supplier) antes de establecer cualquier relación comercial.' },
      { n: '5', title: 'Transparencia Financiera', desc: 'Mantenimiento de registros contables precisos y auditados bajo Normas Internacionales de Información Financiera (NIIF). Prohibición de contabilidad paralela o extracontable.' },
      { n: '6', title: 'Capacitación Continua', desc: 'Todos los colaboradores, especialmente aquellos en posiciones de riesgo, reciben capacitación periódica sobre compliance, ética empresarial y prevención de delitos económicos.' },
    ],
    regulationsTitle: 'Normativa Aplicable',
    contactTitle: 'Contacto del Oficial de Compliance',
    contactContent: 'Para consultas relacionadas con nuestro programa de compliance o para reportar una situación de riesgo ético:',
    confidential: 'Toda comunicación es tratada con estricta confidencialidad.'
  },
  en: {
    back: 'Back to home',
    tag: 'Corporate Compliance',
    title: 'Compliance Policy',
    subtitle: 'PERÚ FROST S.A.C. operates under a framework of absolute ethics and transparency, with zero tolerance for corruption.',
    frameworkTitle: 'Compliance Framework',
    frameworkContent: 'PERÚ FROST S.A.C.\'s corporate compliance program is designed to prevent, detect, and respond to behaviors that may constitute legal, ethical, or regulatory infractions, in compliance with Law No. 30424 (Administrative Responsibility of Legal Entities) and its amendments.',
    pillarsTitle: 'Program Pillars',
    pillars: [
      { n: '1', title: 'Zero Tolerance for Corruption', desc: 'Strict and absolute prohibition of bribes, kickbacks, facilitation payments, and any form of public or private corruption, in compliance with the OECD Convention and Peruvian law.' },
      { n: '2', title: 'Law 30424 — Prevention Model', desc: 'Implementation of the Prevention Model for the prevention of money laundering, transnational active bribery, collusion, and terrorist financing.' },
      { n: '3', title: 'Confidential Whistleblowing Channel', desc: 'Secure and confidential system available to employees, suppliers, and third parties. All reports are investigated impartially, and individuals reporting in good faith are protected against retaliation.' },
      { n: '4', title: 'Due Diligence', desc: 'Rigorous vetting of suppliers, business partners, and clients through KYC (Know Your Customer) and KYS (Know Your Supplier) evaluation processes before establishing any business relationship.' },
      { n: '5', title: 'Financial Transparency', desc: 'Maintenance of accurate and audited accounting records under International Financial Reporting Standards (IFRS). Prohibition of parallel or off-book accounting.' },
      { n: '6', title: 'Continuous Training', desc: 'All employees, especially those in risk positions, receive periodic training on compliance, business ethics, and prevention of economic crimes.' },
    ],
    regulationsTitle: 'Applicable Regulations',
    contactTitle: 'Compliance Officer Contact',
    contactContent: 'For inquiries related to our compliance program or to report an ethical risk situation:',
    confidential: 'All communication is treated with strict confidentiality.'
  }
};

const regulations = ['Ley N° 30424', 'D.L. N° 1352', 'Convention OECD', 'FCPA (USA)', 'UK Bribery Act', 'FATF/GAFI'];

export default function CompliancePage() {
  const { lang } = useLang();
  const content = translations[lang];

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
          <Link href="/" className="flex items-center gap-2 text-slate-frost hover:text-cyan transition-colors mb-10 text-sm">
            <ArrowLeft size={16} /> {content.back}
          </Link>
          <div className="highlight-tag mb-6 inline-block">{content.tag}</div>
          <h1 className="text-4xl lg:text-5xl font-black font-tight text-frost mb-4">{content.title}</h1>
          <p className="text-slate-frost mb-12">{content.subtitle}</p>

          <div className="space-y-6 text-slate-frost leading-relaxed">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-frost font-tight mb-4">{content.frameworkTitle}</h2>
              <p>{content.frameworkContent}</p>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-frost font-tight mb-6">{content.pillarsTitle}</h2>
              <div className="space-y-5">
                {content.pillars.map((item) => (
                  <div key={item.n} className="flex gap-5 p-5 bg-midnight/40 rounded-xl">
                    <div className="w-10 h-10 bg-cyan/20 rounded-xl flex items-center justify-center text-cyan font-bold font-tight text-lg shrink-0">
                      {item.n}
                    </div>
                    <div>
                      <h3 className="font-bold text-frost mb-2">{item.title}</h3>
                      <p className="text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-frost font-tight mb-4">{content.regulationsTitle}</h2>
              <div className="flex flex-wrap gap-3">
                {regulations.map((norm) => (
                  <span key={norm} className="highlight-tag">{norm}</span>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 border border-cyan/20">
              <h2 className="text-xl font-bold text-frost font-tight mb-4">{content.contactTitle}</h2>
              <p className="mb-4">{content.contactContent}</p>
              <a href="mailto:mkt@perufrost.com" className="text-cyan hover:underline font-semibold text-lg">mkt@perufrost.com</a>
              <p className="text-sm mt-2 text-slate-frost">{content.confidential}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

