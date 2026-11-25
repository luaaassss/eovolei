import { useCallback, useEffect, useRef, useState } from 'react'
import { ensureSession, loadProgress, saveProgress } from '../services/supabase'

const KEY = 'eov:progress'
const read = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] } }

export function useProgress() {
  const [done, setDone] = useState<string[]>(read)
  const user = useRef<string | null>(null)

  useEffect(() => {
    let alive = true
    ensureSession().then(async id => {
      user.current = id
      if (id) {
        const remote = await loadProgress(id)
        if (alive) setDone(prev => Array.from(new Set([...prev, ...remote])))
      }
    })
    return () => { alive = false }
  }, [])

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(done)) } catch { /* modo privado */ } }, [done])

  const toggle = useCallback((challengeId: string) => {
    const completed = !done.includes(challengeId)
    setDone(prev => (prev.includes(challengeId) ? prev.filter(i => i !== challengeId) : [...prev, challengeId]))
    if (user.current) void saveProgress(user.current, challengeId, completed)
  }, [done])

  return { done, toggle }
}
