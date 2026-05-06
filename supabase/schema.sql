-- =====================================================================
-- Speedtouch — Supabase schema
-- Run this once in the Supabase SQL editor (or via supabase CLI).
-- =====================================================================

-- ---------------------------------------------------------------------
-- Products table
-- ---------------------------------------------------------------------
create table if not exists public.products (
  id           text primary key,
  name         text not null,
  description  text,
  category     text not null default 'accessories',
  image_url    text,
  price        integer not null check (price >= 0),
  original     integer check (original is null or original >= price),
  stock        integer not null default 0 check (stock >= 0),
  rating       numeric(2,1) default 0 check (rating between 0 and 5),
  reviews      integer not null default 0 check (reviews >= 0),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Auto-compute discount % when reading
create or replace view public.products_with_discount as
select
  *,
  case
    when original is null or original = 0 then 0
    else round(((original - price)::numeric / original) * 100)::int
  end as discount
from public.products;

-- Auto-update updated_at on row change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- Row-Level Security
-- Anyone can read; only authenticated users can write.
-- ---------------------------------------------------------------------
alter table public.products enable row level security;

drop policy if exists "products are publicly readable" on public.products;
create policy "products are publicly readable"
  on public.products for select
  using (true);

drop policy if exists "authenticated users can insert products" on public.products;
create policy "authenticated users can insert products"
  on public.products for insert
  to authenticated
  with check (true);

drop policy if exists "authenticated users can update products" on public.products;
create policy "authenticated users can update products"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "authenticated users can delete products" on public.products;
create policy "authenticated users can delete products"
  on public.products for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------
-- Storage bucket for product images
-- (You can also create this from the Supabase dashboard: Storage → New bucket)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Anyone can read; only authenticated users can write
drop policy if exists "product images are publicly readable" on storage.objects;
create policy "product images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "authenticated users can upload product images" on storage.objects;
create policy "authenticated users can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "authenticated users can update product images" on storage.objects;
create policy "authenticated users can update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

drop policy if exists "authenticated users can delete product images" on storage.objects;
create policy "authenticated users can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
