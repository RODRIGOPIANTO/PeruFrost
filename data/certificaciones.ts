const STORAGE_URL = 'https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/'

export const certificaciones = [
  {
    id: 'brcgs',
    nombre: 'BRCGS',
    subtitulo: 'Grado AA',
    descripcion: 'Certificación GFSI requerida internacionalmente para estándares de calidad, seguridad y cumplimiento normativo en procesos.',
    emoji: '🏆',
    imagen: STORAGE_URL + 'cert_brcgs_new.webp',
    color: '#f59e0b',
    nivel: 'AA',
  },
  {
    id: 'haccp',
    nombre: 'HACCP',
    subtitulo: 'Certificado',
    descripcion: 'Hazard Analysis and Critical Control Points. Sistema riguroso de gestión preventiva de inocuidad alimentaria y peligros biológicos.',
    emoji: '🔬',
    imagen: STORAGE_URL + 'cert_haccp_new.webp',
    color: '#8b5cf6',
  },
  {
    id: 'smeta',
    nombre: 'SMETA',
    subtitulo: 'Auditoría Ética',
    descripcion: 'Estándar de auditoría Sedex que asegura prácticas laborales responsables, salud, seguridad y ética empresarial en la cadena de suministro.',
    emoji: '✅',
    imagen: STORAGE_URL + 'cert_smeta_new.webp',
    color: '#10b981',
  },
]
