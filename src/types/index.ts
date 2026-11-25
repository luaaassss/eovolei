export type Category = 'quadra' | 'areia' | 'casual'
export type CourtCategory = 'quadra' | 'areia' | 'praça'

export interface Challenge { id: string; title: string; target_count: number; points: number }
export interface Training {
  id: string; category: Category; title: string; description: string
  video_url: string | null; challenges: Challenge[]
}
export interface Court {
  id: string; name: string; category: CourtCategory
  latitude: number; longitude: number; address: string | null
}
export interface Meetup { id: string; courtName: string; when: string }
