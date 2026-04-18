'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '@/components/LanguageContext';

const translations = {
  es: {
    back: 'Volver al inicio',
    tag: 'Legal',
    title: 'Política de Privacidad',
    updated: 'Última actualización: Enero 2026 — Perú Frost S.A.C. — RUC 20607856517',
    sections: [
      { title: '1. Responsable del tratamiento', content: 'PERÚ FROST S.A.C., con RUC N° 20607856517, domiciliada en Av. Manuel Olguín Nº 501 Int. 902, Santiago de Surco, Lima, Perú, es responsable del tratamiento de sus datos personales.' },
      { title: '2. Datos que recopilamos', content: 'Podemos recopilar los siguientes tipos de información: datos de identificación (nombre, empresa, cargo), datos de contacto (correo electrónico, teléfono), datos de navegación (cookies técnicas), y datos comerciales proporcionados voluntariamente a través de formularios de contacto.' },
      { title: '3. Finalidad del tratamiento', content: 'Sus datos son tratados para: (a) gestionar consultas comerciales y solicitudes de cotización; (b) envío de información sobre nuestros productos y servicios cuando haya dado su consentimiento; (c) cumplimiento de obligaciones legales y contractuales; (d) mejora de nuestros servicios digitales.' },
      { title: '4. Base legal del tratamiento', content: 'El tratamiento se basa en: (a) la ejecución de un contrato o solicitud precontractual; (b) el cumplimiento de obligaciones legales; (c) el interés legítimo de la empresa; (d) el consentimiento del interesado cuando así se requiera.' },
      { title: '5. Conservación de datos', content: 'Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recopilados y, en todo caso, durante los plazos legalmente establecidos según la Ley N° 29733 de Protección de Datos Personales del Perú.' },
      { title: '6. Derechos del titular', content: 'Usted tiene derecho a: acceder a sus datos, rectificar datos inexactos, solicitar la supresión de sus datos, oponerse al tratamiento y solicitar la portabilidad de sus datos. Para ejercer estos derechos, diríjase a mkt@perufrost.com.' },
      { title: '7. Cookies', content: 'Este sitio web utiliza cookies técnicas necesarias para su funcionamiento. No utilizamos cookies de rastreo publicitario de terceros sin su consentimiento previo.' },
      { title: '8. Contacto', content: 'Para cualquier consulta relacionada con el tratamiento de sus datos personales, puede contactarnos en: mkt@perufrost.com' },
    ]
  },
  en: {
    back: 'Back to home',
    tag: 'Legal',
    title: 'Privacy Policy',
    updated: 'Last updated: January 2026 — Perú Frost S.A.C. — RUC 20607856517',
    sections: [
      { title: '1. Data Controller', content: 'PERÚ FROST S.A.C., with RUC No. 20607856517, based at Av. Manuel Olguin No. 501 Int. 902, Santiago de Surco, Lima, Peru, is responsible for the processing of your personal data.' },
      { title: '2. Data we collect', content: 'We may collect the following types of information: identification data (name, company, position), contact data (email, telephone), navigation data (technical cookies), and commercial data voluntarily provided through contact forms.' },
      { title: '3. Purpose of processing', content: 'Your data is processed to: (a) manage commercial inquiries and quote requests; (b) send information about our products and services when you have given your consent; (c) comply with legal and contractual obligations; (d) improve our digital services.' },
      { title: '4. Legal basis for processing', content: 'The processing is based on: (a) the execution of a contract or pre-contractual request; (b) compliance with legal obligations; (c) the legitimate interest of the company; (d) the consent of the interested party when required.' },
      { title: '5. Data retention', content: 'Data will be kept for the time necessary to fulfill the purpose for which it was collected and, in any case, during the periods legally established under Law No. 29733 on Protection of Personal Data of Peru.' },
      { title: '6. Rights of the holder', content: 'You have the right to: access your data, rectify inaccurate data, request the deletion of your data, object to processing and request the portability of your data. To exercise these rights, please contact mkt@perufrost.com.' },
      { title: '7. Cookies', content: 'This website uses technical cookies necessary for its operation. We do not use third-party advertising tracking cookies without your prior consent.' },
      { title: '8. Contact', content: 'For any questions related to the processing of your personal data, you can contact us at: mkt@perufrost.com' },
    ]
  }
};

export default function PrivacidadPage() {
  const { lang } = useLang();
  const content = translations[lang];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingInline: '1.5rem', paddingTop: '5rem', paddingBottom: '6rem' }}>
          <Link href="/" className="inline-flex items-center gap-2 text-[#8BA0B4] hover:text-[#00E5FF] no-underline text-sm mb-12 transition-colors duration-200">
            <ArrowLeft size={16} /> {content.back}
          </Link>

          <div className="highlight-tag" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>{content.tag}</div>
          <h1 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '0.75rem', lineHeight: 1.1 }}>
            {content.title}
          </h1>
          <p style={{ color: '#8BA0B4', marginBottom: '4rem', fontSize: '0.9rem' }}>
            {content.updated}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {content.sections.map((s) => (
              <div key={s.title} style={{
                background: 'rgba(26,34,56,0.6)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,229,255,0.12)', borderRadius: '16px',
                padding: '2.25rem 2.5rem',
              }}>
                <h2 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '1.15rem', color: '#fff', marginBottom: '1rem' }}>{s.title}</h2>
                <p style={{ color: '#8BA0B4', lineHeight: 1.85, fontSize: '0.97rem' }}>{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

