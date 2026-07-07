-- =====================================================================
-- Speedtouch — Orders schema
-- Run this once in the Supabase SQL editor (after schema.sql).
-- =====================================================================

create table if not exists public.orders (
  id               text primary key,
  customer_name    text not null,
  customer_email   text not null,
  customer_phone   text,
  delivery_method  text not null default 'delivery'
                   check (delivery_method in ('delivery', 'pickup')),
  shipping_address jsonb,
  payment_method   text not null default 'card',
  subtotal         integer not null check (subtotal >= 0),
  shipping         integer not null default 0 check (shipping >= 0),
  total            integer not null check (total >= 0),
  status           text not null default 'pending'
                   check (status in ('pending', 'paid', 'fulfilled', 'shipped', 'delivered', 'cancelled', 'refunded')),
  notes            text,
  user_id          uuid references auth.users(id) on delete set null,
  placed_at        timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists public.order_items (
  id          bigserial primary key,
  order_id    text not null references public.orders(id) on delete cascade,
  product_id  text references public.products(id) on delete set null,
  name        text not null,
  image_url   text,
  price       integer not null check (price >= 0),
  quantity    integer not null check (quantity > 0)
);

create index if not exists orders_placed_at_idx on public.orders (placed_at desc);
create index if not exists order_items_order_id_idx on public.order_items (order_id);

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- Row-Level Security
-- Anonymous shoppers may CREATE orders. Only signed-in admins may read,
-- update, or delete them.
-- ---------------------------------------------------------------------
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "anyone can create orders" on public.orders;
create policy "anyone can create orders"
  on public.orders for insert
  with check (true);

drop policy if exists "anyone can create order items" on public.order_items;
create policy "anyone can create order items"
  on public.order_items for insert
  with check (true);

drop policy if exists "authenticated can read orders" on public.orders;
create policy "admins can read all orders"
  on public.orders for select
  to authenticated
  using (auth.jwt() ->> 'email' = 'info@speedtouch.com.ng');

create policy "customers can read their own orders"
  on public.orders for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "authenticated can update orders" on public.orders;
create policy "admins can update orders"
  on public.orders for update
  to authenticated
  using (auth.jwt() ->> 'email' = 'info@speedtouch.com.ng')
  with check (auth.jwt() ->> 'email' = 'info@speedtouch.com.ng');

drop policy if exists "authenticated can delete orders" on public.orders;
create policy "admins can delete orders"
  on public.orders for delete
  to authenticated
  using (auth.jwt() ->> 'email' = 'info@speedtouch.com.ng');

drop policy if exists "authenticated can read order items" on public.order_items;
create policy "admins can read all order items"
  on public.order_items for select
  to authenticated
  using (auth.jwt() ->> 'email' = 'info@speedtouch.com.ng');

create policy "customers can read their own order items"
  on public.order_items for select
  to authenticated
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

drop policy if exists "authenticated can update order items" on public.order_items;
create policy "admins can update order items"
  on public.order_items for update
  to authenticated
  using (auth.jwt() ->> 'email' = 'info@speedtouch.com.ng')
  with check (auth.jwt() ->> 'email' = 'info@speedtouch.com.ng');

drop policy if exists "authenticated can delete order items" on public.order_items;
create policy "admins can delete order items"
  on public.order_items for delete
  to authenticated
  using (auth.jwt() ->> 'email' = 'info@speedtouch.com.ng');
