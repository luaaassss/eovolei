import { NavLink } from 'react-router-dom'
import { Home, Map } from 'lucide-react'

const link = ({ isActive }: { isActive: boolean }) =>
  `flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-xs font-bold ${isActive ? 'text-abismo' : 'text-slate-700'}`

/** Barra inferior fixa (#EAEAEA) com Menu e Mapa. */
export default function BottomNav() {
  return (
    <nav aria-label="Navegação principal" className="fixed inset-x-0 bottom-0 z-[1000] mx-auto flex h-16 max-w-[480px] bg-nav pb-[env(safe-area-inset-bottom)]">
      <NavLink to="/menu" className={link} aria-label="Menu"><Home aria-hidden="true" size={26} />Menu</NavLink>
      <NavLink to="/mapa" className={link} aria-label="Mapa"><Map aria-hidden="true" size={26} />Mapa</NavLink>
    </nav>
  )
}
