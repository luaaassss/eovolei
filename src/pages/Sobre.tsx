import { useNavigate } from 'react-router-dom'
import WaveHeader from '../components/WaveHeader'
import Mascot from '../components/Mascot'

export default function Sobre() {
  const go = useNavigate()
  return (
    <main className="min-h-dvh pb-8">
      <WaveHeader color="#85D6FF"><Mascot mode="sobre" className="mt-4" /></WaveHeader>
      <section className="space-y-4 px-6" aria-labelledby="t-sobre">
        <h2 id="t-sobre" className="text-2xl text-abismo">O app é a ponte, a bola é o destino</h2>
        <p>Muito tempo de tela, pouco movimento. Aqui você aprende o fundamento em minutos e sai para jogar na parede, na praça ou com os amigos.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Vídeos curtos de cada fundamento</li>
          <li>Desafios para fazer fora da tela</li>
          <li>Mapa com lugares para jogar e marcar rodinha</li>
        </ul>
        <button onClick={() => go('/menu')} className="font-display mt-4 w-full rounded-md bg-cta py-3 text-lg text-abismo shadow">Ir para o menu</button>
      </section>
    </main>
  )
}
