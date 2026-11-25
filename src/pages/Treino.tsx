import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { PlayCircle, Trophy } from 'lucide-react'
import WaveHeader from '../components/WaveHeader'
import Mascot from '../components/Mascot'
import BackButton from '../components/BackButton'
import BottomNav from '../components/BottomNav'
import { THEME, TRAININGS } from '../data/content'
import { useProgress } from '../hooks/useProgress'
import type { Category } from '../types'

export default function Treino() {
  const { categoria } = useParams()
  const { done, toggle } = useProgress()
  const [won, setWon] = useState(false)
  const training = TRAININGS.find(t => t.category === categoria)
  if (!training) return <Navigate to="/menu" replace />

  const cat = training.category as Category
  const all = training.challenges.every(c => done.includes(c.id))
  const earned = training.challenges.filter(c => done.includes(c.id)).reduce((s, c) => s + c.points, 0)

  return (
    <>
      <main className="min-h-dvh pb-28">
        <WaveHeader color={THEME[cat].color}>
          <BackButton to="/menu" category={cat} />
          <Mascot mode={cat} className="mt-1" />
        </WaveHeader>

        <section className="space-y-5 px-6" aria-labelledby="t-treino">
          <div>
            <h1 id="t-treino" className="text-2xl text-abismo">{training.title}</h1>
            <p className="mt-1">{training.description}</p>
          </div>

          <div className="overflow-hidden rounded-2xl bg-tinta">
            {training.video_url
              ? <iframe className="aspect-video w-full" src={training.video_url} title={`Vídeo: ${training.title}`} allowFullScreen loading="lazy" />
              : <div className="flex aspect-video flex-col items-center justify-center gap-2 text-white" role="img" aria-label="Vídeo demonstrativo em breve">
                  <PlayCircle size={48} aria-hidden="true" /><span className="text-sm font-bold">Vídeo demonstrativo em breve</span>
                </div>}
          </div>

          <fieldset className="space-y-2">
            <legend className="font-display mb-2 text-lg">Desafios fora da tela</legend>
            {training.challenges.map(c => (
              <label key={c.id} className="flex cursor-pointer items-start gap-3 rounded-xl p-3" style={{ background: THEME[cat].color }}>
                <input type="checkbox" className="mt-1 h-6 w-6 shrink-0 accent-abismo" checked={done.includes(c.id)} onChange={() => { toggle(c.id); setWon(false) }} />
                <span className="flex-1 font-bold">{c.title}</span>
                <span className="text-xs font-bold">+{c.points} pts</span>
              </label>
            ))}
          </fieldset>

          <button disabled={!all} onClick={() => setWon(true)}
            className="font-display flex w-full items-center justify-center gap-2 rounded-md bg-cta py-3 text-lg text-abismo shadow disabled:cursor-not-allowed disabled:bg-nav disabled:text-slate-600">
            <Trophy aria-hidden="true" size={22} /> Concluir treino
          </button>
          <p role="status" className="text-center font-bold text-abismo">
            {won ? `Mandou bem! Conquista desbloqueada: +${earned} pontos.` : !all ? 'Marque todos os desafios para concluir.' : ''}
          </p>
        </section>
      </main>
      <BottomNav />
    </>
  )
}
