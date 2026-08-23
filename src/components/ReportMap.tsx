import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { Link } from 'react-router-dom'
import type { ReportStatus, VoiceReport } from '../data/mockData'
import { StatusBadge } from './StatusBadge'

const statusColor: Record<ReportStatus, string> = {
  verified: '#5a7589',
  pending: '#0d2234',
  flagged: '#d64545',
}

function pinIcon(status: ReportStatus) {
  return divIcon({
    className: '',
    html: `<span style="
      display:block;
      width:18px;height:18px;
      border-radius:50%;
      background:${statusColor[status]};
      border:2.5px solid white;
      box-shadow:0 1px 4px rgba(0,0,0,0.35);
    "></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -9],
  })
}

const KADUNA_CENTER: [number, number] = [10.6, 7.55]

type MapStyle = 'standard' | 'light' | 'dark'

const tileStyles: Record<MapStyle, { label: string; url: string }> = {
  standard: {
    label: 'Standard',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  light: {
    label: 'Light',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  },
  dark: {
    label: 'Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  },
}

const tileAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

export function ReportMap({
  reports,
  height = '480px',
  zoom = 9,
  interactive = true,
  styleSwitcher = false,
}: {
  reports: VoiceReport[]
  height?: string
  zoom?: number
  interactive?: boolean
  styleSwitcher?: boolean
}) {
  const [mapStyle, setMapStyle] = useState<MapStyle>('standard')

  return (
    <div
      style={{ height }}
      className="relative w-full overflow-hidden rounded-2xl border border-secondary/30"
    >
      {styleSwitcher && (
        <div className="absolute right-3 top-3 z-[1000] flex gap-1 rounded-full border border-secondary/30 bg-surface p-1 shadow-sm">
          {(Object.keys(tileStyles) as MapStyle[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setMapStyle(key)}
              className={`min-h-[32px] rounded-full px-3 text-xs font-semibold transition-colors ${
                mapStyle === key
                  ? 'bg-tertiary text-white'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {tileStyles[key].label}
            </button>
          ))}
        </div>
      )}
      <MapContainer
        center={KADUNA_CENTER}
        zoom={zoom}
        scrollWheelZoom={interactive}
        dragging={interactive}
        zoomControl={interactive}
        touchZoom={interactive}
        doubleClickZoom={interactive}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer attribution={tileAttribution} url={tileStyles[mapStyle].url} />
        {reports.map((report) => (
          <Marker key={report.id} position={[report.lat, report.lng]} icon={pinIcon(report.status)}>
            <Popup>
              <div className="min-w-[200px] space-y-2">
                <StatusBadge status={report.status} />
                <p className="text-sm font-semibold text-primary">{report.pollingUnit}</p>
                <p className="text-xs text-secondary">{report.lga} LGA</p>
                <Link
                  to={`/reports/${report.id}`}
                  className="inline-block text-sm font-semibold text-primary hover:text-tertiary hover:underline"
                >
                  View full report →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
