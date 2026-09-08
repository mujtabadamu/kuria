import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'
import { Link } from 'react-router-dom'
import type { ReportRead } from '../api/kuria'
import { REPORT_STATUS_CONFIG } from '../lib/reportStatus'
import { StatusBadge } from './StatusBadge'

function pinIcon(status: ReportRead['status']) {
  const color = REPORT_STATUS_CONFIG[status].dotColor
  return divIcon({
    className: '',
    html: `<span style="
      display:block;
      width:18px;height:18px;
      border-radius:50%;
      background:${color};
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
  reports: ReportRead[]
  height?: string
  zoom?: number
  interactive?: boolean
  styleSwitcher?: boolean
}) {
  const [mapStyle, setMapStyle] = useState<MapStyle>('standard')
  // Location is optional on a real report (no PU matched yet, or lat/lng
  // never resolved) — only plottable reports get a pin.
  const plottable = reports.filter(
    (r): r is ReportRead & { lat: number; lng: number } => r.lat != null && r.lng != null,
  )

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
        {plottable.map((report) => (
          <Marker key={report.id} position={[report.lat, report.lng]} icon={pinIcon(report.status)}>
            <Popup>
              <div className="min-w-[200px] space-y-2">
                <StatusBadge status={report.status} />
                <p className="text-sm font-semibold text-primary">
                  {report.pu?.pu_name ?? report.location_text ?? 'Unknown location'}
                </p>
                <p className="text-xs text-secondary">{report.pu?.lga ?? '—'} LGA</p>
                <Link
                  to={`/reports/${report.public_ref}`}
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
