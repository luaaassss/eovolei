import { useCallback, useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import BottomNav from '../components/BottomNav'
import { Empty, ErrorBox, Skeleton } from '../components/States'
import { fetchCourts } from '../services/supabase'
import type { Court, CourtCategory, Meetup } from '../types'

const COLORS: Record<CourtCategory, string> = { quadra: '#85D6FF', areia: '#FFF4A6', 'praça': '#A9FFF0' }
const LABEL: Record<CourtCategory, string> = { quadra: 'Quadra', areia: 'Areia', 'praça': 'Praça com parede' }
const pin = (c: CourtCategory) => L.divIcon({ className: '', html: `<div class="pin" style="background:${COLORS[c]}"></div>`, iconSize: [28, 28], iconAnchor: [14, 28], popupAnchor: [0, -26] })
const MEET = 'eov:meetups'
const readMeets = (): Meetup[] => { try { return JSON.parse(localStorage.getItem(MEET) ?? '[]') } catch { return [] } }

export default function Mapa() {
  const [courts, setCourts] = useState<Court[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<CourtCategory | 'todas'>('todas')
  const [selected, setSelected] = useState<Court | null>(null)
  const [meets, setMeets] = useState<Meetup[]>(readMeets)

  const load = useCallback(() => {
    setError(null); setCourts(null)
    fetchCourts().then(setCourts).catch(e => setError(e instanceof Error ? e.message : 'Erro desconhecido.'))
  }, [])
  useEffect(load, [load])

  const shown = (courts ?? []).filter(c => filter === 'todas' || c.category === filter)
  const center: [number, number] = shown[0] ? [shown[0].latitude, shown[0].longitude] : [-30.0346, -51.2177]

  const mark = () => {
    if (!selected) return
    const next = [{ id: crypto.randomUUID(), courtName: selected.name, when: new Date(Date.now() + 3600e3).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }, ...meets]
    setMeets(next)
    try { localStorage.setItem(MEET, JSON.stringify(next)) } catch { /* ignore */ }
  }

  return (
    <>
      <main className="min-h-dvh space-y-4 px-4 pb-24 pt-4">
        <h1 className="text-2xl text-abismo">Onde jogar</h1>

        <div role="group" aria-label="Filtrar por modalidade" className="flex flex-wrap gap-2">
          {(['todas', 'quadra', 'areia', 'praça'] as const).map(f => (
            <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}
              className="rounded-full border-2 border-abismo px-4 py-1.5 text-sm font-bold aria-pressed:bg-abismo aria-pressed:text-white"
              style={filter !== f && f !== 'todas' ? { background: COLORS[f] } : undefined}>
              {f === 'todas' ? 'Todas' : LABEL[f]}
            </button>
          ))}
        </div>

        {error ? <ErrorBox message={error} onRetry={load} />
          : !courts ? <Skeleton className="h-[48vh]" />
          : shown.length === 0 ? <Empty>Nenhum ponto de jogo nessa modalidade ainda. Que tal marcar uma rodinha?</Empty>
          : (
            <div className="h-[48vh] overflow-hidden rounded-2xl border-2 border-abismo" aria-label="Mapa de pontos de jogo">
              <MapContainer key={filter + shown.length} center={center} zoom={13} className="h-full w-full">
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {shown.map(c => (
                  <Marker key={c.id} position={[c.latitude, c.longitude]} icon={pin(c.category)} title={c.name} eventHandlers={{ click: () => setSelected(c) }}>
                    <Popup><strong>{c.name}</strong><br />{LABEL[c.category]}{c.address ? <><br />{c.address}</> : null}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}

        <div className="space-y-2">
          <p className="text-sm font-bold" role="status">{selected ? `Local escolhido: ${selected.name}` : 'Toque em um marcador para escolher o local.'}</p>
          <button onClick={mark} disabled={!selected}
            className="font-display w-full rounded-md bg-cta py-3 text-lg text-abismo shadow disabled:cursor-not-allowed disabled:bg-nav disabled:text-slate-600">
            Marcar Rodinha
          </button>
        </div>

        <section aria-labelledby="t-meets">
          <h2 id="t-meets" className="font-display mb-2 text-lg">Rodinhas marcadas</h2>
          {meets.length === 0 ? <Empty>Nenhuma rodinha marcada. Escolha um local e chame a galera.</Empty>
            : <ul className="space-y-2">{meets.map(m => <li key={m.id} className="rounded-xl bg-casual p-3 font-bold">{m.courtName} às {m.when}</li>)}</ul>}
        </section>
      </main>
      <BottomNav />
    </>
  )
}
