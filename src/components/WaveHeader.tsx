import type { ReactNode } from 'react'

/** Cabeçalho com borda inferior ondulada (Frames 2–5 do Figma). */
export default function WaveHeader({ color, children, className = '' }: { color: string; children?: ReactNode; className?: string }) {
  return (
    <header className={`relative w-full min-h-[250px] ${className}`}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 622 400" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path fill={color} d="M0 0H622V345C622 322 606 312 580 312C500 312 400 335 300 358C220 376 160 392 120 400C60 408 0 396 0 345Z" />
      </svg>
      <div className="relative z-10 flex h-full min-h-[250px] flex-col justify-start px-5 pb-12 pt-5">{children}</div>
    </header>
  )
}
