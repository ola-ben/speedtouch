-- =====================================================================
-- Speedtouch — Customer Reviews
-- Run once in the Supabase SQL editor (after schema.sql).
-- =====================================================================

create table if not exists public.reviews (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text,                       -- optional, never displayed publicly
  location   text,
  rating     integer not null check (rating between 1 and 5),
  comment    text not null,
  service    text,
  status     text not null default 'pending'
             check (status in ('pending', 'approved', 'rejected')),
  honeypot   text,                       -- bot trap; must stay empty
  created_at timestamptz not null default now(),
  check (honeypot is null or honeypot = '')
);

create index if not exists reviews_status_created_idx
  on public.reviews (status, created_at desc);

alter table public.reviews enable row level security;

-- ---------------------------------------------------------------------
-- Policies
-- ---------------------------------------------------------------------
drop policy if exists "anyone can submit a review" on public.reviews;
create policy "anyone can submit a review"
  on public.reviews for insert
  with check (true);

drop policy if exists "public can read approved reviews" on public.reviews;
create policy "public can read approved reviews"
  on public.reviews for select
  using (status = 'approved');

drop policy if exists "authenticated can read all reviews" on public.reviews;
create policy "authenticated can read all reviews"
  on public.reviews for select
  to authenticated
  using (true);

drop policy if exists "authenticated can update reviews" on public.reviews;
create policy "authenticated can update reviews"
  on public.reviews for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "authenticated can delete reviews" on public.reviews;
create policy "authenticated can delete reviews"
  on public.reviews for delete
  to authenticated
  using (true);
