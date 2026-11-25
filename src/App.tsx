import { Navigate, Route, Routes } from 'react-router-dom'
import Splash from './pages/Splash'
import Sobre from './pages/Sobre'
import Menu from './pages/Menu'
import Treino from './pages/Treino'
import Mapa from './pages/Mapa'

export default function App() {
  return (
    <div className="relative mx-auto min-h-dvh max-w-[480px] bg-white shadow-xl">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/treino/:categoria" element={<Treino />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
