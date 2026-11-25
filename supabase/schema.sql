-- E o Vôlei? — esquema Supabase (execute no SQL Editor)
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.trainings (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('quadra','areia','casual')),
  title text not null,
  description text,
  video_url text
);

create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  training_id uuid not null references public.trainings(id) on delete cascade,
  title text not null,
  target_count integer not null default 1 check (target_count > 0),
  points integer not null default 10 check (points >= 0)
);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  unique (user_id, challenge_id)
);

create table if not exists public.courts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('quadra','areia','praça')),
  latitude double precision not null,
  longitude double precision not null,
  address text
);

create index if not exists idx_trainings_category on public.trainings(category);
create index if not exists idx_challenges_training on public.challenges(training_id);
create index if not exists idx_progress_user on public.user_progress(user_id);
create index if not exists idx_courts_category on public.courts(category);

-- RLS
alter table public.profiles enable row level security;
alter table public.trainings enable row level security;
alter table public.challenges enable row level security;
alter table public.user_progress enable row level security;
alter table public.courts enable row level security;

create policy "trainings: leitura pública" on public.trainings for select using (true);
create policy "challenges: leitura pública" on public.challenges for select using (true);
create policy "courts: leitura pública" on public.courts for select using (true);

create policy "profiles: ler o próprio" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profiles: inserir o próprio" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles: atualizar o próprio" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "progress: ler o próprio" on public.user_progress for select to authenticated using (auth.uid() = user_id);
create policy "progress: inserir o próprio" on public.user_progress for insert to authenticated with check (auth.uid() = user_id);
create policy "progress: atualizar o próprio" on public.user_progress for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "progress: apagar o próprio" on public.user_progress for delete to authenticated using (auth.uid() = user_id);

-- Perfil automático para cada novo usuário (inclui anônimos)
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'Craque convidado'))
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Seed (ids fixos = ids em src/data/content.ts)
insert into public.trainings (id, category, title, description) values
 ('00000000-0000-0000-0000-0000000000a1','quadra','Fundamentos de quadra','Manchete, toque e saque por baixo com técnica.'),
 ('00000000-0000-0000-0000-0000000000a2','areia','Vôlei de areia','Condicionamento e fundamentos sob o sol.'),
 ('00000000-0000-0000-0000-0000000000a3','casual','Rodinha','Jogo coletivo sem deixar a bola cair.')
on conflict (id) do nothing;

insert into public.challenges (id, training_id, title, target_count, points) values
 ('00000000-0000-0000-0000-0000000000c1','00000000-0000-0000-0000-0000000000a1','Realizar 20 manchetes consecutivas na parede',20,20),
 ('00000000-0000-0000-0000-0000000000c2','00000000-0000-0000-0000-0000000000a1','Realizar 20 toques na parede sem carregar',20,20),
 ('00000000-0000-0000-0000-0000000000c3','00000000-0000-0000-0000-0000000000a1','Dar 10 saques por baixo em campo aberto',10,15),
 ('00000000-0000-0000-0000-0000000000c4','00000000-0000-0000-0000-0000000000a2','Fazer 15 saltos de agachamento na areia',15,15),
 ('00000000-0000-0000-0000-0000000000c5','00000000-0000-0000-0000-0000000000a2','Dar 10 saques por baixo mirando uma marca na areia',10,15),
 ('00000000-0000-0000-0000-0000000000c6','00000000-0000-0000-0000-0000000000a2','Fazer 10 manchetes seguidas com a areia nos pés',10,20),
 ('00000000-0000-0000-0000-0000000000c7','00000000-0000-0000-0000-0000000000a3','Chamar 2 amigos para uma rodinha',3,10),
 ('00000000-0000-0000-0000-0000000000c8','00000000-0000-0000-0000-0000000000a3','Bater o recorde: 30 toques em roda sem a bola cair',30,25),
 ('00000000-0000-0000-0000-0000000000c9','00000000-0000-0000-0000-0000000000a3','Passar a bola para alguém diferente a cada toque',10,15)
on conflict (id) do nothing;

-- Quadras de exemplo (Porto Alegre) — confirme os locais antes de publicar
insert into public.courts (name, category, latitude, longitude, address) values
 ('Parque da Redenção', 'praça', -30.0346, -51.2177, 'Porto Alegre, RS'),
 ('Parque Marinha do Brasil', 'areia', -30.0480, -51.2310, 'Porto Alegre, RS'),
 ('Orla do Guaíba', 'quadra', -30.0346, -51.2437, 'Porto Alegre, RS');
