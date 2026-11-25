# E o vôlei?

App mobile-first que usa a tela como ponte para jogar vôlei de verdade: vídeos curtos, desafios fora da tela e mapa de pontos de jogo.

Stack: React 18, Vite, TypeScript, Tailwind, Lucide, Supabase, Leaflet/OpenStreetMap, Vercel.

## Rodar localmente
```bash
npm install
cp .env.example .env      # preencha com a URL e a chave anon do Supabase
npm run dev
```
Sem `.env`, o app funciona em modo local (progresso no `localStorage`, locais de exemplo no mapa).

## Supabase
1. Crie um projeto em supabase.com.
2. Em **Authentication → Providers**, ative **Anonymous sign-ins** (login de convidado).
3. No **SQL Editor**, execute `supabase/schema.sql` (tabelas, índices, RLS, trigger de perfil e dados iniciais).
4. Copie `Project URL` e `anon public key` para o `.env`.

## Deploy na Vercel
1. Suba o repositório no GitHub e importe na Vercel (preset Vite).
2. Em **Settings → Environment Variables**, defina `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
3. `vercel.json` já reescreve as rotas para o `index.html` (SPA).

## Design system (extraído do print do Figma)
| Token | Hex | Uso |
|---|---|---|
| ceu → abismo | `#6091F9` → `#00019A` | gradiente da tela inicial (claro em cima, escuro embaixo) |
| quadra | `#85D6FF` | cabeçalho ondulado de Quadra e do Menu |
| areia | `#FFF4A6` | cabeçalho/itens de Areia |
| casual | `#A9FFF0` | cabeçalho/itens de Rodinha |
| nav | `#EAEAEA` | barra inferior |
| cta | `#FFDA59` | botão "Simbora?" e ações principais |

Os botões, o botão "Voltar" e o logo são recortes do `e_o_volei.svg` em `public/assets/`.
Tipografia: Eras Bold ITC, com fallback Montserrat 800 / Trebuchet MS.

## Pendências conhecidas
- Vídeos: `video_url` está vazio; o player mostra um aviso até você colocar os embeds.
- Login por e-mail e senha ainda não tem tela (só convidado anônimo).
- Locais do mapa são exemplos de Porto Alegre: confirme antes de publicar.
