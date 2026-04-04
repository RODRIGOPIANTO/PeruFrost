import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Gestión Ética | Perú Frost S.A.C.',
};

export default function GestionEticaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
          <Link href="/" className="flex items-center gap-2 text-slate-frost hover:text-cyan transition-colors mb-10 text-sm">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>
          <div className="highlight-tag mb-6 inline-block">Ética Corporativa</div>
          <h1 className="text-4xl lg:text-5xl font-black font-tight text-frost mb-4">Gestión Ética</h1>
          <p className="text-slate-frost mb-12">
            En Perú Frost S.A.C. la ética no es optional — es el fundamento de cada decisión empresarial.
          </p>

          <div className="space-y-6 text-slate-frost leading-relaxed">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-frost font-tight mb-4">Nuestro Compromiso Ético</h2>
              <p className="mb-4">PERÚ FROST S.A.C. opera bajo un marco de ética y transparencia absoluta, convencidos de que la integridad es el pilar de relaciones comerciales duraderas y de la confianza de nuestros clientes, colaboradores y comunidad.</p>
              <p>Nuestro programa de gestión ética está alineado con los más altos estándares internacionales de gobierno corporativo y los principios del Pacto Mundial de las Naciones Unidas.</p>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-frost font-tight mb-6">Principios Fundamentales</h2>
              <div className="space-y-4">
                {[
                  { title: 'Cero Tolerancia a la Corrupción', desc: 'Prohibición absoluta de sobornos, pagos indebidos o cualquier forma de corrupción en todas nuestras operaciones comerciales, independientemente del país o contexto.' },
                  { title: 'Transparencia Total', desc: 'Actuamos con honestidad en todas nuestras comunicaciones internas y externas, manteniendo registros auditables y accesibles para la debida diligencia de nuestros clientes.' },
                  { title: 'Respeto a los Derechos Humanos', desc: 'Garantizamos condiciones laborales dignas para nuestros más de 400 colaboradores, en cumplimiento estricto de la legislación laboral peruana e internacional.' },
                  { title: 'Responsabilidad con el Medio Ambiente', desc: 'Implementamos prácticas de producción sostenible y participamos activamente en el Proyecto de Mejora Pesquera (FIP) de la pota peruana.' },
                  { title: 'Canal de Denuncias', desc: 'Disponemos de un sistema confidencial y seguro para que cualquier colaborador, proveedor o tercero reporte irregularidades sin temor a represalias.' },
                ].map((item) => (
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
              <h2 className="text-xl font-bold text-frost font-tight mb-4">Código de Conducta</h2>
              <p>Todos nuestros colaboradores, proveedores y socios comerciales están sujetos a nuestro Código de Conducta, que establece los estándares de comportamiento esperados en cada interacción profesional. El código es de obligatorio cumplimiento y su incumplimiento tiene consecuencias definidas.</p>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-frost font-tight mb-4">Reportar una irregularidad</h2>
              <p className="mb-4">Si tiene conocimiento de alguna situación que pueda constituir una violación a nuestros principios éticos, puede reportarla de manera confidencial a través de:</p>
              <a href="mailto:ventas@perufrost.com" className="text-cyan hover:underline font-semibold">ventas@perufrost.com</a>
              <p className="text-sm mt-2">Todas las denuncias son tratadas con absoluta confidencialidad y sin represalias para el denunciante de buena fe.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
