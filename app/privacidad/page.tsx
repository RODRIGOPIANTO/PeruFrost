import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Política de Privacidad | Perú Frost S.A.C.',
  description: 'Política de privacidad y tratamiento de datos personales de Perú Frost S.A.C.',
};

const sections = [
  { title: '1. Responsable del tratamiento', content: 'PERÚ FROST S.A.C., con RUC N° 20607856517, domiciliada en Av. Manuel Olguín Nº 501 Int. 902, Santiago de Surco, Lima, Perú, es responsable del tratamiento de sus datos personales.' },
  { title: '2. Datos que recopilamos', content: 'Podemos recopilar los siguientes tipos de información: datos de identificación (nombre, empresa, cargo), datos de contacto (correo electrónico, teléfono), datos de navegación (cookies técnicas), y datos comerciales proporcionados voluntariamente a través de formularios de contacto.' },
  { title: '3. Finalidad del tratamiento', content: 'Sus datos son tratados para: (a) gestionar consultas comerciales y solicitudes de cotización; (b) envío de información sobre nuestros productos y servicios cuando haya dado su consentimiento; (c) cumplimiento de obligaciones legales y contractuales; (d) mejora de nuestros servicios digitales.' },
  { title: '4. Base legal del tratamiento', content: 'El tratamiento se basa en: (a) la ejecución de un contrato o solicitud precontractual; (b) el cumplimiento de obligaciones legales; (c) el interés legítimo de la empresa; (d) el consentimiento del interesado cuando así se requiera.' },
  { title: '5. Conservación de datos', content: 'Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recopilados y, en todo caso, durante los plazos legalmente establecidos según la Ley N° 29733 de Protección de Datos Personales del Perú.' },
  { title: '6. Derechos del titular', content: 'Usted tiene derecho a: acceder a sus datos, rectificar datos inexactos, solicitar la supresión de sus datos, oponerse al tratamiento y solicitar la portabilidad de sus datos. Para ejercer estos derechos, diríjase a ventas@perufrost.com.' },
  { title: '7. Cookies', content: 'Este sitio web utiliza cookies técnicas necesarias para su funcionamiento. No utilizamos cookies de rastreo publicitario de terceros sin su consentimiento previo.' },
  { title: '8. Contacto', content: 'Para cualquier consulta relacionada con el tratamiento de sus datos personales, puede contactarnos en: ventas@perufrost.com' },
];

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingInline: '1.5rem', paddingTop: '5rem', paddingBottom: '6rem' }}>
          <Link href="/" className="inline-flex items-center gap-2 text-[#8BA0B4] hover:text-[#00E5FF] no-underline text-sm mb-12 transition-colors duration-200">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>

          <div className="highlight-tag" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Legal</div>
          <h1 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '0.75rem', lineHeight: 1.1 }}>
            Política de Privacidad
          </h1>
          <p style={{ color: '#8BA0B4', marginBottom: '4rem', fontSize: '0.9rem' }}>
            Última actualización: Enero 2026 — Perú Frost S.A.C. — RUC 20607856517
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {sections.map((s) => (
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
