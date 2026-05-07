-- =====================================================================
-- Speedtouch — Services schema
-- Run this once in the Supabase SQL editor (after schema.sql).
-- =====================================================================

create table if not exists public.services (
  id           text primary key,
  name         text not null,
  description  text,
  tag          text not null default 'Home',
  image_url    text,
  price        integer not null check (price >= 0),
  duration     text,
  popular      boolean not null default false,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists services_sort_idx on public.services (sort_order, created_at);

drop trigger if exists services_updated_at on public.services;
create trigger services_updated_at
  before update on public.services
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- Row-Level Security
-- Anyone can read; only authenticated users can write.
-- ---------------------------------------------------------------------
alter table public.services enable row level security;

drop policy if exists "services are publicly readable" on public.services;
create policy "services are publicly readable"
  on public.services for select using (true);

drop policy if exists "authenticated users can insert services" on public.services;
create policy "authenticated users can insert services"
  on public.services for insert to authenticated with check (true);

drop policy if exists "authenticated users can update services" on public.services;
create policy "authenticated users can update services"
  on public.services for update to authenticated using (true) with check (true);

drop policy if exists "authenticated users can delete services" on public.services;
create policy "authenticated users can delete services"
  on public.services for delete to authenticated using (true);

-- ---------------------------------------------------------------------
-- Storage bucket for service images
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('service-images', 'service-images', true)
on conflict (id) do nothing;

drop policy if exists "service images are publicly readable" on storage.objects;
create policy "service images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'service-images');

drop policy if exists "authenticated users can upload service images" on storage.objects;
create policy "authenticated users can upload service images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'service-images');

drop policy if exists "authenticated users can update service images" on storage.objects;
create policy "authenticated users can update service images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'service-images');

drop policy if exists "authenticated users can delete service images" on storage.objects;
create policy "authenticated users can delete service images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'service-images');

-- ---------------------------------------------------------------------
-- Seed the 6 starter services. Run this only if you want them populated.
-- ---------------------------------------------------------------------
insert into public.services (id, name, description, tag, image_url, price, duration, popular, sort_order) values
('standard-clean', 'Standard Clean', 'Weekly or bi-weekly upkeep. Dusting, vacuuming, kitchen and bathrooms refreshed.', 'Home', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80&auto=format&fit=crop', 25000, '2 hrs', false, 1),
('deep-clean', 'Deep Clean', 'Top-to-bottom reset. Baseboards, behind appliances, grout, and every corner.', 'Home', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80&auto=format&fit=crop', 45000, '3 hrs', true, 2),
('move-in-out', 'Move In / Out', 'Ready-for-handover clean. Inside cabinets, ovens, and fridges included.', 'Special', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop', 80000, '4 hrs', false, 3),
('office-clean', 'Office Clean', 'After-hours commercial cleaning. Desks, common areas, and restrooms.', 'Office', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop', 55000, '2 hrs', false, 4),
('post-construction', 'Post-Construction', 'Dust, debris, and residue removed so your space is move-in ready.', 'Special', 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&q=80&auto=format&fit=crop', 120000, '5 hrs', false, 5),
('window-clean', 'Window Clean', 'Streak-free interior and exterior windows, sills, and tracks.', 'Add-on', 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&q=80&auto=format&fit=crop', 15000, '1.5 hrs', false, 6)
on conflict (id) do nothing;
