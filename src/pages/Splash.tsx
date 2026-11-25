import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const go = useNavigate()
  return (
    <main className="on-dark flex min-h-dvh flex-col items-center justify-center gap-16 bg-gradient-to-b from-ceu to-abismo px-6">
      <h1 className="m-0 w-full max-w-[420px]">
        <img src="/assets/logo.svg" alt="E o vôlei?" className="flutuar w-full drop-shadow-xl" />
      </h1>
      <button onClick={() => go('/sobre')}
        className="font-display rounded-md bg-cta px-12 py-3 text-xl text-abismo shadow-lg transition-transform hover:scale-105 active:scale-95">
        Simbora?
      </button>
    </main>
  )
}
