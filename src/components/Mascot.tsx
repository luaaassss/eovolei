import { useState } from 'react'
import type { Category } from '../types'
import { PHRASES } from '../data/content'

type Mode = Category | 'menu' | 'sobre'
const OUTFIT: Record<Category, string> = { quadra: 'uniforme esportivo com joelheiras', areia: 'boné e óculos de sol', casual: 'roupa casual' }

/** Voleizito: SVG dinâmico. A roupa muda conforme a modalidade. */
export default function Mascot({ mode, className = '' }: { mode: Mode; className?: string }) {
  const outfit: Category = mode === 'quadra' || mode === 'areia' ? mode : 'casual'
  const phrases = PHRASES[mode]
  const [i, setI] = useState(0)
  const shirt = outfit === 'quadra' ? '#00019A' : outfit === 'areia' ? '#FFDA59' : '#6091F9'
  const legs = outfit === 'casual' ? '#334155' : '#F5F5F5'

  return (
    <div className={`flex items-end gap-3 ${className}`}>
      <button type="button" onClick={() => setI(n => (n + 1) % phrases.length)}
        aria-label={`Voleizito com ${OUTFIT[outfit]}. Toque para ouvir outra frase.`} className="shrink-0">
        <svg viewBox="0 0 160 215" width="104" height="140" role="img" aria-hidden="true" focusable="false">
          {/* pernas */}
          <g stroke="#0F172A" strokeWidth="4" strokeLinecap="round">
            <path d="M68 150V205" stroke={legs} strokeWidth="13" />
            <path d="M92 150V205" stroke={legs} strokeWidth="13" />
          </g>
          {/* tênis */}
          <ellipse cx="66" cy="208" rx="12" ry="5" fill="#0F172A" /><ellipse cx="94" cy="208" rx="12" ry="5" fill="#0F172A" />
          {/* pele nas pernas curtas */}
          {outfit !== 'casual' && <><rect x="62" y="162" width="12" height="40" rx="6" fill="#F1C9A5" /><rect x="86" y="162" width="12" height="40" rx="6" fill="#F1C9A5" /></>}
          {outfit === 'quadra' && <><rect x="59" y="170" width="18" height="16" rx="6" fill="#6091F9" stroke="#00019A" strokeWidth="2.5" /><rect x="83" y="170" width="18" height="16" rx="6" fill="#6091F9" stroke="#00019A" strokeWidth="2.5" /></>}
          {/* shorts / calça */}
          <rect x="56" y="140" width="48" height="30" rx="8" fill={outfit === 'casual' ? '#334155' : '#0F172A'} />
          {/* tronco */}
          <rect x="52" y="104" width="56" height="48" rx="14" fill={shirt} stroke="#0F172A" strokeWidth="3" />
          {/* braços */}
          <path d="M54 114C38 124 34 140 40 150" stroke="#F1C9A5" strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M106 114C122 124 126 140 120 150" stroke="#F1C9A5" strokeWidth="10" strokeLinecap="round" fill="none" />
          {/* cabeça-bola */}
          <circle cx="80" cy="58" r="48" fill="#fff" stroke="#00019A" strokeWidth="4" />
          <path d="M34 50C58 56 70 40 80 10M126 50C102 56 90 40 80 10M46 92C60 78 76 82 80 106M114 92C100 78 84 82 80 106" stroke="#6091F9" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M32 66C52 70 64 90 66 104M128 66C108 70 96 90 94 104" stroke="#FFDA59" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* rosto */}
          {outfit === 'areia'
            ? <><rect x="50" y="48" width="26" height="16" rx="6" fill="#0F172A" /><rect x="84" y="48" width="26" height="16" rx="6" fill="#0F172A" /><path d="M76 55H84" stroke="#0F172A" strokeWidth="3" /></>
            : <><circle cx="64" cy="56" r="6" fill="#0F172A" /><circle cx="96" cy="56" r="6" fill="#0F172A" /><circle cx="66" cy="54" r="2" fill="#fff" /><circle cx="98" cy="54" r="2" fill="#fff" /></>}
          <path d="M62 76C70 88 90 88 98 76" stroke="#0F172A" strokeWidth="4" fill="none" strokeLinecap="round" />
          {outfit === 'areia' && <><path d="M34 34C40 8 120 8 126 34Z" fill="#FFDA59" stroke="#0F172A" strokeWidth="3" /><path d="M100 30H146C146 38 128 42 100 40Z" fill="#FFDA59" stroke="#0F172A" strokeWidth="3" /></>}
        </svg>
      </button>
      <p className="relative mb-12 max-w-[210px] rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm font-bold leading-snug text-tinta shadow" role="status">
        {phrases[i]}
      </p>
    </div>
  )
}
