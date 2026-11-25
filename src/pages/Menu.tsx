import { Link } from 'react-router-dom'
import WaveHeader from '../components/WaveHeader'
import Mascot from '../components/Mascot'
import BottomNav from '../components/BottomNav'
import { THEME, TRAININGS } from '../data/content'
import { useProgress } from '../hooks/useProgress'
import type { Category } from '../types'

export default function Menu() {
  const { done } = useProgress()
  const points = TRAININGS.flatMap(t => t.challenges).filter(c => done.includes(c.id)).reduce((s, c) => s + c.points, 0)
  return (
    <>
      <main className="min-h-dvh pb-24">
        <WaveHeader color="#85D6FF"><Mascot mode="menu" className="mt-4" /></WaveHeader>
        <h1 className="sr-only">Menu principal</h1>
        <nav aria-label="Modalidades" className="-mt-2 flex flex-col items-center gap-3 px-6">
          {(Object.keys(THEME) as Category[]).map(c => (
            <Link key={c} to={`/treino/${c}`} aria-label={`${THEME[c].label}: ${THEME[c].alt}`} className="block w-[72%] transition-transform hover:scale-[1.03] active:scale-95">
              <img src={THEME[c].button} alt="" className="w-full" />
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-center text-sm font-bold" aria-live="polite">Seus pontos: <span className="text-abismo">{points}</span></p>
      </main>
      <BottomNav />
    </>
  )
}
