-- Esquema inicial de PRISM
-- Ejecutar en el SQL Editor de Supabase o vía CLI (supabase db push).

-- Extensión para UUIDs
create extension if not exists "pgcrypto";

-- ───────────────────────────────────────────────────────────
-- Tabla: profiles
-- Perfil de cada usuario, ligado a auth.users de Supabase.
-- ───────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  email         text unique not null,
  is_premium    boolean not null default false,
  premium_until timestamptz,
  terms_accepted   boolean not null default false,
  marketing_opt_in boolean not null default false,
  preferences   jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now()
);

-- Crea automáticamente un perfil al registrarse un usuario en auth.users.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, terms_accepted, marketing_opt_in)
  values (
    new.id,
    new.email,
    coalesce((new.raw_user_meta_data ->> 'terms_accepted')::boolean, false),
    coalesce((new.raw_user_meta_data ->> 'marketing_opt_in')::boolean, false)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ───────────────────────────────────────────────────────────
-- Tabla: subscriptions
-- Historial de órdenes/suscripciones pagadas vía Flow.cl.
-- ───────────────────────────────────────────────────────────
create table if not exists public.subscriptions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references public.profiles (id) on delete set null,
  commerce_order  text unique not null,
  flow_order      bigint,
  email           text not null,
  amount          integer not null,        -- CLP
  currency        text not null default 'CLP',
  -- pending | paid | rejected | canceled
  status          text not null default 'pending',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists subscriptions_email_idx on public.subscriptions (email);
create index if not exists subscriptions_status_idx on public.subscriptions (status);

-- ───────────────────────────────────────────────────────────
-- Tabla: recommendations
-- Recomendaciones de apuestas mostradas en el dashboard.
-- ───────────────────────────────────────────────────────────
create table if not exists public.recommendations (
  id              uuid primary key default gen_random_uuid(),
  match           text not null,
  type            text not null,           -- Combinada | Doble Oportunidad | Goles | Resultado
  recommendation  text not null,
  probability     numeric(5,2) not null,   -- 0-100
  odds            numeric(6,2) not null,
  expected_value  numeric(6,2) not null,
  risk            text not null,           -- low | medium | high
  status          text not null default 'pending', -- pending | won | lost
  is_premium      boolean not null default false,  -- solo visible para Premium
  created_at      timestamptz not null default now()
);

create index if not exists recommendations_status_idx on public.recommendations (status);

-- ───────────────────────────────────────────────────────────
-- Row Level Security
-- ───────────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.recommendations enable row level security;

-- profiles: cada usuario ve y edita solo su propio perfil
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- subscriptions: cada usuario ve solo sus propias suscripciones
create policy "subscriptions_select_own"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- recommendations: las gratuitas son públicas; las premium solo para premium
create policy "recommendations_select_free"
  on public.recommendations for select
  using (
    is_premium = false
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.is_premium = true
    )
  );

-- Nota: las escrituras desde el backend (webhook de Flow) usan la
-- service role key, que omite RLS.
