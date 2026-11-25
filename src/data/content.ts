import type { Category, Court, Training } from '../types'

/** Cores por modalidade — amostradas do print do Figma */
export const THEME: Record<Category, { label: string; color: string; button: string; back: string; alt: string }> = {
  quadra: { label: 'Quadra', color: '#85D6FF', button: '/assets/btn-quadra.svg', back: '/assets/voltar-quadra.svg', alt: 'Treinos de quadra' },
  areia: { label: 'Areia', color: '#FFF4A6', button: '/assets/btn-areia.svg', back: '/assets/voltar-areia.svg', alt: 'Treinos de areia' },
  casual: { label: 'Rodinha', color: '#A9FFF0', button: '/assets/btn-casual.svg', back: '/assets/voltar-casual.svg', alt: 'Rodinha casual' }
}

export const PHRASES: Record<Category | 'menu' | 'sobre', string[]> = {
  menu: ['E aí, bora ficar craque no vôlei??', 'Larga o celular e pega a bola!', 'Hoje tem treino? Simbora!'],
  sobre: ['Eu sou o Voleizito! Bora tirar o vôlei da tela e levar pra rua?'],
  quadra: ['Joelheira no lugar, antebraço de tábua e foco!', 'Manchete firme é base de tudo, craque!'],
  areia: ['Boné na cabeça, protetor no rosto e bora pra areia!', 'Areia pesa, mas a vibe compensa!'],
  casual: ['Rodinha não pode deixar a bola cair, bora!', 'Chama a galera: aqui ninguém joga sozinho!']
}

export const TRAININGS: Training[] = [
  {
    id: '00000000-0000-0000-0000-0000000000a1', category: 'quadra', title: 'Fundamentos de quadra',
    description: 'Manchete com antebraços como uma tábua, toque com os dedos em formato de concha e saque por baixo.',
    video_url: null,
    challenges: [
      { id: '00000000-0000-0000-0000-0000000000c1', title: 'Realizar 20 manchetes consecutivas na parede', target_count: 20, points: 20 },
      { id: '00000000-0000-0000-0000-0000000000c2', title: 'Realizar 20 toques na parede sem carregar', target_count: 20, points: 20 },
      { id: '00000000-0000-0000-0000-0000000000c3', title: 'Dar 10 saques por baixo em campo aberto', target_count: 10, points: 15 }
    ]
  },
  {
    id: '00000000-0000-0000-0000-0000000000a2', category: 'areia', title: 'Vôlei de areia',
    description: 'Condicionamento sob o sol e fundamentos adaptados à areia: base baixa e passos curtos.',
    video_url: null,
    challenges: [
      { id: '00000000-0000-0000-0000-0000000000c4', title: 'Fazer 15 saltos de agachamento na areia', target_count: 15, points: 15 },
      { id: '00000000-0000-0000-0000-0000000000c5', title: 'Dar 10 saques por baixo mirando uma marca na areia', target_count: 10, points: 15 },
      { id: '00000000-0000-0000-0000-0000000000c6', title: 'Fazer 10 manchetes seguidas com a areia nos pés', target_count: 10, points: 20 }
    ]
  },
  {
    id: '00000000-0000-0000-0000-0000000000a3', category: 'casual', title: 'Rodinha',
    description: 'Jogo coletivo sem competição: a meta é a bola nunca cair e todo mundo tocar nela.',
    video_url: null,
    challenges: [
      { id: '00000000-0000-0000-0000-0000000000c7', title: 'Chamar 2 amigos para uma rodinha', target_count: 3, points: 10 },
      { id: '00000000-0000-0000-0000-0000000000c8', title: 'Bater o recorde: 30 toques em roda sem a bola cair', target_count: 30, points: 25 },
      { id: '00000000-0000-0000-0000-0000000000c9', title: 'Passar a bola para alguém diferente a cada toque', target_count: 10, points: 15 }
    ]
  }
]

/** Fallback offline — locais de exemplo, confirme antes de publicar */
export const FALLBACK_COURTS: Court[] = [
  { id: 'f1', name: 'Parque da Redenção', category: 'praça', latitude: -30.0346, longitude: -51.2177, address: 'Porto Alegre, RS' },
  { id: 'f2', name: 'Parque Marinha do Brasil', category: 'areia', latitude: -30.048, longitude: -51.231, address: 'Porto Alegre, RS' },
  { id: 'f3', name: 'Orla do Guaíba', category: 'quadra', latitude: -30.0346, longitude: -51.2437, address: 'Porto Alegre, RS' }
]
