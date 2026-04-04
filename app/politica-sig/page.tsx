import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Política del Sistema Integrado de Gestión | Perú Frost S.A.C.',
};

export default function PoliticaSigPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
          <Link href="/" className="flex items-center gap-2 text-slate-frost hover:text-cyan transition-colors mb-10 text-sm">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>
          <div className="highlight-tag mb-6 inline-block">Sistema de Gestión</div>
          <h1 className="text-4xl lg:text-5xl font-black font-tight text-frost mb-4">
            Política del Sistema Integrado de Gestión
          </h1>
          <p className="text-slate-frost mb-12">
            Perú Frost S.A.C. gestiona su operación bajo un Sistema Integrado que unifica Calidad, Inocuidad, Medio Ambiente y Seguridad.
          </p>

          <div className="space-y-6 text-slate-frost leading-relaxed">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-frost font-tight mb-4">Declaración de Política</h2>
              <p className="mb-4">PERÚ FROST S.A.C., empresa dedicada al procesamiento y exportación de productos hidrobiológicos congelados, declara su firme compromiso con la implementación y mejora continua de su Sistema Integrado de Gestión, que abarca las dimensiones de:</p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {['Calidad del Producto (BRCGS AA)', 'Inocuidad Alimentaria (HACCP)', 'Sostenibilidad Ambiental', 'Seguridad y Salud Ocupacional'].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-midnight/50 px-4 py-3 rounded-xl">
                    <span className="w-2 h-2 bg-cyan rounded-full shrink-0" />
                    <span className="text-frost text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-frost font-tight mb-4">Objetivos del Sistema</h2>
              <ol className="space-y-3 list-none">
                {[
                  'Garantizar la inocuidad y calidad de todos nuestros productos en cumplimiento de las normativas nacionales e internacionales.',
                  'Satisfacer los requisitos de nuestros clientes y superar sus expectativas de forma consistente.',
                  'Minimizar el impacto ambiental de nuestra operación mediante prácticas de producción limpia.',
                  'Proteger la salud y seguridad de nuestros colaboradores en todas las etapas del proceso.',
                  'Cumplir con todos los requisitos legales y reglamentarios aplicables a nuestra actividad.',
                  'Mejorar continuamente la eficacia de nuestro Sistema Integrado de Gestión.',
                ].map((obj, i) => (
                  <li key={i} className="flex gap-4 p-4 bg-midnight/30 rounded-xl">
                    <span className="text-cyan font-bold font-tight text-lg shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-frost font-tight mb-4">Normas de Referencia</h2>
              <div className="flex flex-wrap gap-3">
                {['BRCGS Food Safety V9', 'HACCP Codex Alimentarius', 'ISO 22000', 'MSC Chain of Custody', 'MarinTrust Standard', 'FDA 21 CFR', 'DG SANTE 854/2004', 'SANIPES'].map((norm) => (
                  <span key={norm} className="highlight-tag">{norm}</span>
                ))}
              </div>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-frost font-tight mb-4">Revisión y Actualización</h2>
              <p>Esta política es revisada anualmente por la Alta Dirección de PERÚ FROST S.A.C. o cuando se produzcan cambios significativos en la organización, los procesos o el contexto normativo. La Alta Dirección se compromete a proporcionar los recursos necesarios para el cumplimiento de esta política.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
