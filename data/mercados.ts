export interface PaisDestino {
  codigo: string // ISO 3166-1 alpha-2
  nombre: string
  nombreEn: string
  bandera: string
  productos: string[] // ids de productos que se exportan
}

export interface RegionExportacion {
  id: string
  nombre: string
  nombreEn: string
  emoji: string
  color: string
  totalPaises: number
  paises: PaisDestino[]
}

export const regionesExportacion: RegionExportacion[] = [
  {
    id: 'norteamerica',
    nombre: 'Norteamérica',
    nombreEn: 'North America',
    emoji: '🇺🇸',
    color: '#3b82f6',
    totalPaises: 2,
    paises: [
      { codigo: 'US', nombre: 'Estados Unidos', nombreEn: 'United States', bandera: '🇺🇸', productos: ['mahi-mahi', 'merluza', 'pota'] },
      { codigo: 'MX', nombre: 'México', nombreEn: 'Mexico', bandera: '🇲🇽', productos: ['pota'] },
    ],
  },
  {
    id: 'centroamerica',
    nombre: 'Centroamérica',
    nombreEn: 'Central America',
    emoji: '🌎',
    color: '#10b981',
    totalPaises: 2,
    paises: [
      { codigo: 'CR', nombre: 'Costa Rica', nombreEn: 'Costa Rica', bandera: '🇨🇷', productos: ['pota', 'merluza'] },
      { codigo: 'PA', nombre: 'Panamá', nombreEn: 'Panama', bandera: '🇵🇦', productos: ['pota', 'merluza'] },
    ],
  },
  {
    id: 'sudamerica',
    nombre: 'Sudamérica',
    nombreEn: 'South America',
    emoji: '🇧🇷',
    color: '#f59e0b',
    totalPaises: 4,
    paises: [
      { codigo: 'BR', nombre: 'Brasil', nombreEn: 'Brazil', bandera: '🇧🇷', productos: ['merluza', 'pota'] },
      { codigo: 'AR', nombre: 'Argentina', nombreEn: 'Argentina', bandera: '🇦🇷', productos: ['pota'] },
      { codigo: 'CL', nombre: 'Chile', nombreEn: 'Chile', bandera: '🇨🇱', productos: ['pota', 'merluza'] },
      { codigo: 'CO', nombre: 'Colombia', nombreEn: 'Colombia', bandera: '🇨🇴', productos: ['pota'] },
    ],
  },
  {
    id: 'europa',
    nombre: 'Europa',
    nombreEn: 'Europe',
    emoji: '🇪🇺',
    color: '#6366f1',
    totalPaises: 5,
    paises: [
      { codigo: 'ES', nombre: 'España', nombreEn: 'Spain', bandera: '🇪🇸', productos: ['pota', 'merluza', 'pulpo', 'calamar'] },
      { codigo: 'FR', nombre: 'Francia', nombreEn: 'France', bandera: '🇫🇷', productos: ['merluza', 'concha-abanico'] },
      { codigo: 'IT', nombre: 'Italia', nombreEn: 'Italy', bandera: '🇮🇹', productos: ['pota', 'calamar', 'pulpo'] },
      { codigo: 'DE', nombre: 'Alemania', nombreEn: 'Germany', bandera: '🇩🇪', productos: ['merluza', 'pota'] },
      { codigo: 'GB', nombre: 'Reino Unido', nombreEn: 'United Kingdom', bandera: '🇬🇧', productos: ['merluza', 'mahi-mahi'] },
    ],
  },
  {
    id: 'africa',
    nombre: 'África',
    nombreEn: 'Africa',
    emoji: '🌍',
    color: '#f97316',
    totalPaises: 2,
    paises: [
      { codigo: 'MA', nombre: 'Marruecos', nombreEn: 'Morocco', bandera: '🇲🇦', productos: ['pota'] },
      { codigo: 'ZA', nombre: 'Sudáfrica', nombreEn: 'South Africa', bandera: '🇿🇦', productos: ['pota', 'merluza'] },
    ],
  },
  {
    id: 'rusia-cei',
    nombre: 'Rusia / CEI',
    nombreEn: 'Russia / CIS',
    emoji: '🇷🇺',
    color: '#ef4444',
    totalPaises: 1,
    paises: [
      { codigo: 'RU', nombre: 'Rusia', nombreEn: 'Russia', bandera: '🇷🇺', productos: ['pota', 'merluza'] },
    ],
  },
  {
    id: 'asia',
    nombre: 'Asia',
    nombreEn: 'Asia',
    emoji: '🇨🇳',
    color: '#ec4899',
    totalPaises: 4,
    paises: [
      { codigo: 'CN', nombre: 'China', nombreEn: 'China', bandera: '🇨🇳', productos: ['pota', 'jurel', 'caballa'] },
      { codigo: 'JP', nombre: 'Japón', nombreEn: 'Japan', bandera: '🇯🇵', productos: ['pota', 'mahi-mahi', 'concha-abanico'] },
      { codigo: 'KR', nombre: 'Corea del Sur', nombreEn: 'South Korea', bandera: '🇰🇷', productos: ['pota'] },
      { codigo: 'TH', nombre: 'Tailandia', nombreEn: 'Thailand', bandera: '🇹🇭', productos: ['pota'] },
    ],
  },
]

export const totalPaises = regionesExportacion.reduce((acc, r) => acc + r.totalPaises, 0)
export default regionesExportacion
