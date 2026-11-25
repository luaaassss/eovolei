import { createClient } from '@supabase/supabase-js'
import type { Court } from '../types'
import { FALLBACK_COURTS } from '../data/content'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase = url && key ? createClient(url, key) : null

/** Garante uma sessão (anônima/convidado) para gravar progresso. */
export async function ensureSession(): Promise<string | null> {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  if (data.session) return data.session.user.id
  const { data: anon, error } = await supabase.auth.signInAnonymously()
  return error ? null : anon.user?.id ?? null
}

export async function fetchCourts(): Promise<Court[]> {
  if (!supabase) return FALLBACK_COURTS
  const { data, error } = await supabase.from('courts').select('*')
  if (error) throw new Error(error.message)
  return (data as Court[]).length ? (data as Court[]) : FALLBACK_COURTS
}

export async function loadProgress(userId: string): Promise<string[]> {
  if (!supabase) return []
  const { data } = await supabase.from('user_progress').select('challenge_id').eq('user_id', userId).eq('completed', true)
  return (data ?? []).map((r: { challenge_id: string }) => r.challenge_id)
}

export async function saveProgress(userId: string, challengeId: string, completed: boolean) {
  if (!supabase) return
  await supabase.from('user_progress').upsert(
    { user_id: userId, challenge_id: challengeId, completed, completed_at: completed ? new Date().toISOString() : null },
    { onConflict: 'user_id,challenge_id' }
  )
}
