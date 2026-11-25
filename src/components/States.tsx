import type { ReactNode } from 'react'
export const Skeleton = ({ className = '' }: { className?: string }) => <div className={`skeleton rounded-xl ${className}`} aria-hidden="true" />
export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-xl bg-fundo p-4 text-center text-sm font-bold" role="status">{children}</p>
}
export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-xl border-2 border-red-700 bg-red-50 p-4 text-sm" role="alert">
      <p className="font-bold text-red-900">Sem conexão com os pontos de jogo. {message}</p>
      <button onClick={onRetry} className="mt-3 rounded-lg bg-cta px-4 py-2 font-bold text-abismo">Tentar de novo</button>
    </div>
  )
}
