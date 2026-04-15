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
    totalPaises: 2,
    paises: [
      { codigo: 'US', nombre: 'Estados Unidos', bandera: '🇺🇸', productos: ['mahi-mahi', 'merluza', 'pota'] },
      { codigo: 'MX', nombre: 'México', bandera: '🇲🇽', productos: ['pota'] },
    ],
  },
  {
    id: 'centroamerica',
    nombre: 'Centroamérica',
    emoji: '🌎',
    color: '#10b981',
    totalPaises: 2,
    paises: [
      { codigo: 'CR', nombre: 'Costa Rica', bandera: '🇨🇷', productos: ['pota', 'merluza'] },
      { codigo: 'PA', nombre: 'Panamá', bandera: '🇵🇦', productos: ['pota', 'merluza'] },
    ],
  },
  {
    id: 'sudamerica',
    nombre: 'Sudamérica',
    emoji: '🇧🇷',
    color: '#f59e0b',
    totalPaises: 4,
    paises: [
      { codigo: 'BR', nombre: 'Brasil', bandera: '🇧🇷', productos: ['merluza', 'pota'] },
      { codigo: 'AR', nombre: 'Argentina', bandera: '🇦🇷', productos: ['pota'] },
      { codigo: 'CL', nombre: 'Chile', bandera: '🇨🇱', productos: ['pota', 'merluza'] },
      { codigo: 'CO', nombre: 'Colombia', bandera: '🇨🇴', productos: ['pota'] },
    ],
  },
  {
    id: 'europa',
    nombre: 'Europa',
    emoji: '🇪🇺',
    color: '#6366f1',
    totalPaises: 5,
    paises: [
      { codigo: 'ES', nombre: 'España', bandera: '🇪🇸', productos: ['pota', 'merluza', 'pulpo', 'calamar'] },
      { codigo: 'FR', nombre: 'Francia', bandera: '🇫🇷', productos: ['merluza', 'concha-abanico'] },
      { codigo: 'IT', nombre: 'Italia', bandera: '🇮🇹', productos: ['pota', 'calamar', 'pulpo'] },
      { codigo: 'DE', nombre: 'Alemania', bandera: '🇩🇪', productos: ['merluza', 'pota'] },
      { codigo: 'GB', nombre: 'Reino Unido', bandera: '🇬🇧', productos: ['merluza', 'mahi-mahi'] },
    ],
  },
  {
    id: 'africa',
    nombre: 'África',
    emoji: '🌍',
    color: '#f97316',
    totalPaises: 2,
    paises: [
      { codigo: 'MA', nombre: 'Marruecos', bandera: '🇲🇦', productos: ['pota'] },
      { codigo: 'ZA', nombre: 'Sudáfrica', bandera: '🇿🇦', productos: ['pota', 'merluza'] },
    ],
  },
  {
    id: 'rusia-cei',
    nombre: 'Rusia / CEI',
    emoji: '🇷🇺',
    color: '#ef4444',
    totalPaises: 1,
    paises: [
      { codigo: 'RU', nombre: 'Rusia', bandera: '🇷🇺', productos: ['pota', 'merluza'] },
    ],
  },
  {
    id: 'asia',
    nombre: 'Asia',
    emoji: '🇨🇳',
    color: '#ec4899',
    totalPaises: 4,
    paises: [
      { codigo: 'CN', nombre: 'China', bandera: '🇨🇳', productos: ['pota', 'jurel', 'caballa'] },
      { codigo: 'JP', nombre: 'Japón', bandera: '🇯🇵', productos: ['pota', 'mahi-mahi', 'concha-abanico'] },
      { codigo: 'KR', nombre: 'Corea del Sur', bandera: '🇰🇷', productos: ['pota'] },
      { codigo: 'TH', nombre: 'Tailandia', bandera: '🇹🇭', productos: ['pota'] },
    ],
  },
]

export const totalPaises = regionesExportacion.reduce((acc, r) => acc + r.totalPaises, 0)
export default regionesExportacion
