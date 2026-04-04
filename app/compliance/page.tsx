import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Política de Compliance | Perú Frost S.A.C.',
};

export default function CompliancePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
          <Link href="/" className="flex items-center gap-2 text-slate-frost hover:text-cyan transition-colors mb-10 text-sm">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>
          <div className="highlight-tag mb-6 inline-block">Compliance Corporativo</div>
          <h1 className="text-4xl lg:text-5xl font-black font-tight text-frost mb-4">Política de Compliance</h1>
          <p className="text-slate-frost mb-12">
            PERÚ FROST S.A.C. opera bajo un marco de ética y transparencia absoluta, con cero tolerancia a la corrupción.
          </p>

          <div className="space-y-6 text-slate-frost leading-relaxed">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-frost font-tight mb-4">Marco de Compliance</h2>
              <p>El programa de compliance corporativo de PERÚ FROST S.A.C. está diseñado para prevenir, detectar y responder a conductas que puedan constituir infracciones legales, éticas o regulatorias, en cumplimiento de la Ley N° 30424 (Responsabilidad Administrativa de las Personas Jurídicas) y sus modificatorias.</p>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-frost font-tight mb-6">Pilares del Programa</h2>
              <div className="space-y-5">
                {[
                  {
                    n: '1',
                    title: 'Cero Tolerancia a la Corrupción',
                    desc: 'Prohibición estricta y absoluta de sobornos, coimas, pagos de facilitación y cualquier forma de corrupción pública o privada, en cumplimiento con la Convención de la OCDE y la ley peruana.',
                  },
                  {
                    n: '2',
                    title: 'Ley 30424 — Modelo de Prevención',
                    desc: 'Implementación del Modelo de Prevención para la prevención de lavado de activos, cohecho activo transnacional, colusión y financiamiento del terrorismo.',
                  },
                  {
                    n: '3',
                    title: 'Canal de Denuncias Confidencial',
                    desc: 'Sistema seguro y confidencial disponible para colaboradores, proveedores y terceros. Todas las denuncias son investigadas de forma imparcial y las personas que reporten de buena fe están protegidas contra represalias.',
                  },
                  {
                    n: '4',
                    title: 'Debida Diligencia (Due Diligence)',
                    desc: 'Filtro riguroso de proveedores, socios comerciales y clientes mediante procesos de evaluación KYC (Know Your Customer) y KYS (Know Your Supplier) antes de establecer cualquier relación comercial.',
                  },
                  {
                    n: '5',
                    title: 'Transparencia Financiera',
                    desc: 'Mantenimiento de registros contables precisos y auditados bajo Normas Internacionales de Información Financiera (NIIF). Prohibición de contabilidad paralela o extracontable.',
                  },
                  {
                    n: '6',
                    title: 'Capacitación Continua',
                    desc: 'Todos los colaboradores, especialmente aquellos en posiciones de riesgo, reciben capacitación periódica sobre compliance, ética empresarial y prevención de delitos económicos.',
                  },
                ].map((item) => (
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
              <h2 className="text-xl font-bold text-frost font-tight mb-4">Normativa Aplicable</h2>
              <div className="flex flex-wrap gap-3">
                {['Ley N° 30424', 'D.L. N° 1352', 'Convención OCDE', 'FCPA (EE.UU.)', 'UK Bribery Act', 'FATF/GAFI'].map((norm) => (
                  <span key={norm} className="highlight-tag">{norm}</span>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 border border-cyan/20">
              <h2 className="text-xl font-bold text-frost font-tight mb-4">Contacto del Oficial de Compliance</h2>
              <p className="mb-4">Para consultas relacionadas con nuestro programa de compliance o para reportar una situación de riesgo ético:</p>
              <a href="mailto:ventas@perufrost.com" className="text-cyan hover:underline font-semibold text-lg">ventas@perufrost.com</a>
              <p className="text-sm mt-2 text-slate-frost">Toda comunicación es tratada con estricta confidencialidad.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
