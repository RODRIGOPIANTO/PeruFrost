'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useLang } from '@/components/LanguageContext';

const translations = {
  es: {
    back: 'Volver al inicio',
    tag: 'Ética Corporativa',
    title: 'Gestión Ética',
    subtitle: 'En Perú Frost S.A.C. la ética no es opcional — es el fundamento de cada decisión empresarial.',
    commitmentTitle: 'Nuestro Compromiso Ético',
    commitmentP1: 'PERÚ FROST S.A.C. opera bajo un marco de ética y transparencia absoluta, convencidos de que la integridad es el pilar de relaciones comerciales duraderas y de la confianza de nuestros clientes, colaboradores y comunidad.',
    commitmentP2: 'Nuestro programa de gestión ética está alineado con los más altos estándares internacionales de gobierno corporativo y los principios del Pacto Mundial de las Naciones Unidas.',
    principlesTitle: 'Principios Fundamentales',
    principles: [
      { title: 'Cero Tolerancia a la Corrupción', desc: 'Prohibición absoluta de sobornos, pagos indebidos o cualquier forma de corrupción en todas nuestras operaciones comerciales, independientemente del país o contexto.' },
      { title: 'Transparencia Total', desc: 'Actuamos con honestidad en todas nuestras comunicaciones internas y externas, manteniendo registros auditables y accesibles para la debida diligencia de nuestros clientes.' },
      { title: 'Respeto a los Derechos Humanos', desc: 'Garantizamos condiciones laborales dignas para nuestros más de 400 colaboradores, en cumplimiento estricto de la legislación laboral peruana e internacional.' },
      { title: 'Responsabilidad con el Medio Ambiente', desc: 'Implementamos prácticas de producción sostenible y participamos activamente en el Proyecto de Mejora Pesquera (FIP) de la pota peruana.' },
      { title: 'Canal de Denuncias', desc: 'Disponemos de un sistema confidencial y seguro para que cualquier colaborador, proveedor o tercero reporte irregularidades sin temor a represalias.' },
    ],
    codeTitle: 'Código de Conducta',
    codeContent: 'Todos nuestros colaboradores, proveedores y socios comerciales están sujetos a nuestro Código de Conducta, que establece los estándares de comportamiento esperados en cada interacción profesional. El código es de obligatorio cumplimiento y su incumplimiento tiene consecuencias definidas.',
    reportTitle: 'Reportar una irregularidad',
    reportContent: 'Si tiene conocimiento de alguna situación que pueda constituir una violación a nuestros principios éticos, puede reportarla de manera confidencial a través de:',
    reportConfidential: 'Todas las denuncias son tratadas con absoluta confidencialidad y sin represalias para el denunciante de buena fe.'
  },
  en: {
    back: 'Back to home',
    tag: 'Corporate Ethics',
    title: 'Ethical Management',
    subtitle: 'At Perú Frost S.A.C., ethics are not optional — they are the foundation of every business decision.',
    commitmentTitle: 'Our Ethical Commitment',
    commitmentP1: 'PERÚ FROST S.A.C. operates under a framework of absolute ethics and transparency, convinced that integrity is the pillar of lasting commercial relationships and the trust of our clients, collaborators, and community.',
    commitmentP2: 'Our ethical management program is aligned with the highest international standards of corporate governance and the principles of the United Nations Global Compact.',
    principlesTitle: 'Fundamental Principles',
    principles: [
      { title: 'Zero Tolerance for Corruption', desc: 'Absolute prohibition of bribes, improper payments, or any form of corruption in all our commercial operations, regardless of the country or context.' },
      { title: 'Total Transparency', desc: 'We act with honesty in all our internal and external communications, maintaining auditable and accessible records for our clients\' due diligence.' },
      { title: 'Respect for Human Rights', desc: 'We guarantee decent working conditions for our more than 400 collaborators, in strict compliance with Peruvian and international labor legislation.' },
      { title: 'Environmental Responsibility', desc: 'We implement sustainable production practices and actively participate in the Fishery Improvement Project (FIP) of Peruvian giant squid.' },
      { title: 'Whistleblowing Channel', desc: 'We have a confidential and secure system for any employee, supplier, or third party to report irregularities without fear of retaliation.' },
    ],
    codeTitle: 'Code of Conduct',
    codeContent: 'All our employees, suppliers, and business partners are subject to our Code of Conduct, which establishes the expected standards of behavior in every professional interaction. The code is mandatory, and non-compliance has defined consequences.',
    reportTitle: 'Report an irregularity',
    reportContent: 'If you are aware of any situation that may constitute a violation of our ethical principles, you can report it confidentially through:',
    reportConfidential: 'All reports are treated with absolute confidentiality and without retaliation for the good-faith whistleblower.'
  }
};

export default function GestionEticaPage() {
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
              <h2 className="text-2xl font-bold text-frost font-tight mb-4">{content.commitmentTitle}</h2>
              <p className="mb-4">{content.commitmentP1}</p>
              <p>{content.commitmentP2}</p>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-frost font-tight mb-6">{content.principlesTitle}</h2>
              <div className="space-y-4">
                {content.principles.map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 bg-midnight/50 rounded-xl">
                    <CheckCircle className="text-cyan mt-0.5 shrink-0" size={20} />
                    <div>
                      <h3 className="font-semibold text-frost mb-1">{item.title}</h3>
                      <p className="text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-frost font-tight mb-4">{content.codeTitle}</h2>
              <p>{content.codeContent}</p>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-frost font-tight mb-4">{content.reportTitle}</h2>
              <p className="mb-4">{content.reportContent}</p>
              <a href="mailto:mkt@perufrost.com" className="text-cyan hover:underline font-semibold">mkt@perufrost.com</a>
              <p className="text-sm mt-2">{content.reportConfidential}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

