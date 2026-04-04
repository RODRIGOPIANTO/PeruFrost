import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Términos y Condiciones | Perú Frost S.A.C.',
  description: 'Términos y condiciones de uso del sitio web de Perú Frost S.A.C.',
};

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
          <Link href="/" className="flex items-center gap-2 text-slate-frost hover:text-cyan transition-colors mb-10 text-sm">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>
          <div className="highlight-tag mb-6 inline-block">Legal</div>
          <h1 className="text-4xl lg:text-5xl font-black font-tight text-frost mb-4">Términos y Condiciones</h1>
          <p className="text-slate-frost mb-12">Última actualización: Enero 2026 — Perú Frost S.A.C.</p>

          <div className="space-y-6 text-slate-frost leading-relaxed">
            {[
              {
                title: '1. Introducción',
                content: 'Bienvenido a PERÚ FROST S.A.C. Al acceder y utilizar nuestro sitio web, usted acepta cumplir con los siguientes términos y condiciones. Si no está de acuerdo con estos términos, por favor no utilice nuestro sitio.',
              },
              {
                title: '2. Información General',
                content: 'Razón Social: PERÚ FROST SOCIEDAD ANÓNIMA CERRADA. RUC: 20607856517. Dirección Legal: Av. Manuel Olguín Nro. 501 Int. 902, Residencial Isabelita, Santiago de Surco, Lima, Perú. Fecha de Inicio de Actividades: 3 de mayo de 2021.',
              },
              {
                title: '3. Uso del Sitio Web',
                content: 'El acceso y uso del sitio web de PERÚ FROST está sujeto a las siguientes condiciones: Autorización de Uso: Usted puede acceder y utilizar nuestro sitio web solo para fines legales. Prohibiciones: No debe usar el sitio para actividades fraudulentas, difamatorias, ilícitas o que infrinjan derechos de terceros. Modificaciones: Nos reservamos el derecho de modificar cualquier parte del sitio en cualquier momento.',
              },
              {
                title: '4. Propiedad Intelectual',
                content: 'Todo el contenido del sitio web, incluyendo textos, gráficos, logotipos, imágenes y software, es propiedad de PERÚ FROST S.A.C. o de sus proveedores de contenido y está protegido por leyes de derechos de autor. No se permite la reproducción sin consentimiento previo y por escrito.',
              },
              {
                title: '5. Privacidad',
                content: 'El uso de la información personal que usted nos proporciona está regulado por nuestra Política de Privacidad. Le recomendamos revisar nuestra política para entender nuestras prácticas de tratamiento de datos.',
              },
              {
                title: '6. Responsabilidad Limitada',
                content: 'PERÚ FROST S.A.C. no será responsable por daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la incapacidad de uso de nuestro sitio web, incluyendo daños por pérdida de beneficios, datos u otros intangibles.',
              },
              {
                title: '7. Enlaces a Terceros',
                content: 'Nuestro sitio web puede contener enlaces a sitios web de terceros. Estos enlaces se proporcionan únicamente para su conveniencia y no implican que aprobamos el contenido de dichos sitios.',
              },
              {
                title: '8. Ley Aplicable y Jurisdicción',
                content: 'Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de Perú. Cualquier disputa estará sujeta a la jurisdicción exclusiva de los tribunales de Lima, Perú.',
              },
              {
                title: '9. Cambios a los Términos',
                content: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación. Su uso continuado constituye su aceptación de los nuevos términos.',
              },
            ].map((item) => (
              <div key={item.title} className="glass-card p-8 space-y-3">
                <h2 className="text-xl font-bold text-frost font-tight">{item.title}</h2>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
