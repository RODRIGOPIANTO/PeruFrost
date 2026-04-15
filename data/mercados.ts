export interface PaisDestino {
  codigo: string // ISO 3166-1 alpha-2
  nombre: string
  bandera: string
  productos: string[] // ids de productos que se exportan
}

export interface RegionExportacion {
  id: string
  nombre: string
  emoji: string
  color: string
  totalPaises: number
  paises: PaisDestino[]
}

export const regionesExportacion: RegionExportacion[] = [
  {
    id: 'norteamerica',
    nombre: 'Norteamérica',
    emoji: '🇺🇸',
    color: '#3b82f6',
    totalPaises: 3,
    paises: [
      { codigo: 'US', nombre: 'Estados Unidos', bandera: '🇺🇸', productos: ['mahi-mahi', 'merluza', 'pota'] },
      { codigo: 'CA', nombre: 'Canadá', bandera: '🇨🇦', productos: ['mahi-mahi', 'pota'] },
      { codigo: 'MX', nombre: 'México', bandera: '🇲🇽', productos: ['pota'] },
    ],
  },
  {
    id: 'centroamerica',
    nombre: 'Centroamérica',
    emoji: '🌎',
    color: '#10b981',
    totalPaises: 6,
    paises: [
      { codigo: 'CR', nombre: 'Costa Rica', bandera: '🇨🇷', productos: ['pota', 'merluza'] },
      { codigo: 'GT', nombre: 'Guatemala', bandera: '🇬🇹', productos: ['pota'] },
      { codigo: 'HN', nombre: 'Honduras', bandera: '🇭🇳', productos: ['pota'] },
      { codigo: 'SV', nombre: 'El Salvador', bandera: '🇸🇻', productos: ['pota'] },
      { codigo: 'NI', nombre: 'Nicaragua', bandera: '🇳🇮', productos: ['pota'] },
      { codigo: 'PA', nombre: 'Panamá', bandera: '🇵🇦', productos: ['pota', 'merluza'] },
    ],
  },
  {
    id: 'sudamerica',
    nombre: 'Sudamérica',
    emoji: '🇧🇷',
    color: '#f59e0b',
    totalPaises: 8,
    paises: [
      { codigo: 'BR', nombre: 'Brasil', bandera: '🇧🇷', productos: ['merluza', 'pota'] },
      { codigo: 'AR', nombre: 'Argentina', bandera: '🇦🇷', productos: ['pota'] },
      { codigo: 'CL', nombre: 'Chile', bandera: '🇨🇱', productos: ['pota', 'merluza'] },
      { codigo: 'CO', nombre: 'Colombia', bandera: '🇨🇴', productos: ['pota'] },
      { codigo: 'EC', nombre: 'Ecuador', bandera: '🇪🇨', productos: ['pota'] },
      { codigo: 'BO', nombre: 'Bolivia', bandera: '🇧🇴', productos: ['pota'] },
      { codigo: 'PY', nombre: 'Paraguay', bandera: '🇵🇾', productos: ['pota'] },
      { codigo: 'UY', nombre: 'Uruguay', bandera: '🇺🇾', productos: ['pota'] },
    ],
  },
  {
    id: 'europa',
    nombre: 'Europa',
    emoji: '🇪🇺',
    color: '#6366f1',
    totalPaises: 9,
    paises: [
      { codigo: 'ES', nombre: 'España', bandera: '🇪🇸', productos: ['pota', 'merluza', 'pulpo', 'calamar'] },
      { codigo: 'PT', nombre: 'Portugal', bandera: '🇵🇹', productos: ['pota', 'merluza'] },
      { codigo: 'FR', nombre: 'Francia', bandera: '🇫🇷', productos: ['merluza', 'concha-abanico'] },
      { codigo: 'IT', nombre: 'Italia', bandera: '🇮🇹', productos: ['pota', 'calamar', 'pulpo'] },
      { codigo: 'DE', nombre: 'Alemania', bandera: '🇩🇪', productos: ['merluza', 'pota'] },
      { codigo: 'GR', nombre: 'Grecia', bandera: '🇬🇷', productos: ['pota'] },
      { codigo: 'NL', nombre: 'Países Bajos', bandera: '🇳🇱', productos: ['pota', 'merluza'] },
      { codigo: 'GB', nombre: 'Reino Unido', bandera: '🇬🇧', productos: ['merluza', 'mahi-mahi'] },
      { codigo: 'BE', nombre: 'Bélgica', bandera: '🇧🇪', productos: ['pota'] },
    ],
  },
  {
    id: 'africa',
    nombre: 'África',
    emoji: '🌍',
    color: '#f97316',
    totalPaises: 7,
    paises: [
      { codigo: 'MA', nombre: 'Marruecos', bandera: '🇲🇦', productos: ['pota'] },
      { codigo: 'EG', nombre: 'Egipto', bandera: '🇪🇬', productos: ['pota'] },
      { codigo: 'NG', nombre: 'Nigeria', bandera: '🇳🇬', productos: ['pota'] },
      { codigo: 'GH', nombre: 'Ghana', bandera: '🇬🇭', productos: ['pota'] },
      { codigo: 'SN', nombre: 'Senegal', bandera: '🇸🇳', productos: ['pota'] },
      { codigo: 'AO', nombre: 'Angola', bandera: '🇦🇴', productos: ['pota'] },
      { codigo: 'ZA', nombre: 'Sudáfrica', bandera: '🇿🇦', productos: ['pota', 'merluza'] },
    ],
  },
  {
    id: 'rusia-cei',
    nombre: 'Rusia / CEI',
    emoji: '🇷🇺',
    color: '#ef4444',
    totalPaises: 5,
    paises: [
      { codigo: 'RU', nombre: 'Rusia', bandera: '🇷🇺', productos: ['pota', 'merluza'] },
      { codigo: 'UA', nombre: 'Ucrania', bandera: '🇺🇦', productos: ['pota'] },
      { codigo: 'KZ', nombre: 'Kazajistán', bandera: '🇰🇿', productos: ['pota'] },
      { codigo: 'BY', nombre: 'Bielorrusia', bandera: '🇧🇾', productos: ['pota'] },
      { codigo: 'GE', nombre: 'Georgia', bandera: '🇬🇪', productos: ['pota'] },
    ],
  },
  {
    id: 'asia',
    nombre: 'Asia',
    emoji: '🇨🇳',
    color: '#ec4899',
    totalPaises: 8,
    paises: [
      { codigo: 'CN', nombre: 'China', bandera: '🇨🇳', productos: ['pota', 'jurel', 'caballa'] },
      { codigo: 'JP', nombre: 'Japón', bandera: '🇯🇵', productos: ['pota', 'mahi-mahi', 'concha-abanico'] },
      { codigo: 'KR', nombre: 'Corea del Sur', bandera: '🇰🇷', productos: ['pota'] },
      { codigo: 'TH', nombre: 'Tailandia', bandera: '🇹🇭', productos: ['pota'] },
      { codigo: 'VN', nombre: 'Vietnam', bandera: '🇻🇳', productos: ['pota'] },
      { codigo: 'IN', nombre: 'India', bandera: '🇮🇳', productos: ['pota'] },
      { codigo: 'AU', nombre: 'Australia', bandera: '🇦🇺', productos: ['mahi-mahi', 'pota'] },
      { codigo: 'ID', nombre: 'Indonesia', bandera: '🇮🇩', productos: ['pota'] },
    ],
  },
]

export const totalPaises = regionesExportacion.reduce((acc, r) => acc + r.totalPaises, 0)
export default regionesExportacion
