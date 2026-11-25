import { Link } from 'react-router-dom'
import type { Category } from '../types'
import { THEME } from '../data/content'

const TXT: Record<Category, string> = { quadra: '#00019A', areia: '#7A4A00', casual: '#004D43' }

export default function BackButton({ to, category }: { to: string; category: Category }) {
  return (
    <Link to={to} aria-label="Voltar" className="relative inline-block w-[150px] self-start">
      <img src={THEME[category].back} alt="" className="block w-full" />
      <span className="font-display absolute inset-y-0 left-[30%] flex items-center text-sm" style={{ color: TXT[category] }}>Voltar</span>
    </Link>
  )
}
