import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Aviso Legal | Perú Frost S.A.C.',
};

export default function AvisoLegalPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
          <Link href="/" className="flex items-center gap-2 text-slate-frost hover:text-cyan transition-colors mb-10 text-sm">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>
          <div className="highlight-tag mb-6 inline-block">Legal</div>
          <h1 className="text-4xl lg:text-5xl font-black font-tight text-frost mb-4">Aviso Legal</h1>
          <p className="text-slate-frost mb-12">Perú Frost S.A.C. — RUC 20607856517</p>

          <div className="space-y-6 text-slate-frost leading-relaxed">
            {[
              {
                title: 'Titular del Sitio Web',
                content: 'Este sitio web es propiedad y está operado por PERÚ FROST SOCIEDAD ANÓNIMA CERRADA (PERÚ FROST S.A.C.), empresa constituida bajo las leyes de la República del Perú, con RUC N° 20607856517, con domicilio legal en Av. Manuel Olguín Nro. 501 Int. 902, Residencial Isabelita, Santiago de Surco, Lima, Perú.',
              },
              {
                title: 'Objeto del Sitio',
                content: 'El presente sitio web tiene por objeto proporcionar información corporativa sobre las actividades, productos, servicios e infraestructura de PERÚ FROST S.A.C., empresa dedicada al procesamiento y exportación de productos hidrobiológicos congelados.',
              },
              {
                title: 'Exactitud de la Información',
                content: 'PERÚ FROST S.A.C. procura mantener actualizada la información publicada en este sitio. No obstante, no garantiza la exactitud, integridad o actualidad de la información en todo momento. La información sobre productos, certificaciones y capacidades puede estar sujeta a cambios sin previo aviso.',
              },
              {
                title: 'Propiedad Industrial e Intelectual',
                content: 'El nombre comercial "PERÚ FROST", sus logotipos, marcas registradas y todos los contenidos visuales y textuales de este sitio son propiedad exclusiva de PERÚ FROST S.A.C. Queda prohibida su reproducción total o parcial sin autorización expresa y por escrito.',
              },
              {
                title: 'Limitación de Responsabilidad',
                content: 'PERÚ FROST S.A.C. no asume responsabilidad alguna por los daños y perjuicios de cualquier naturaleza que pudieran derivarse del acceso o uso del sitio web, incluyendo interrupciones técnicas, virus informáticos o cualquier otra contingencia ajena a la empresa.',
              },
              {
                title: 'Legislación Aplicable',
                content: 'Este aviso legal se rige por la legislación peruana, en particular la Ley N° 29733 (Protección de Datos Personales), la Ley N° 27269 (Firmas y Certificados Digitales) y demás normativa aplicable. Para cualquier controversia, las partes se someten a la jurisdicción de los Juzgados y Tribunales de la ciudad de Lima.',
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
