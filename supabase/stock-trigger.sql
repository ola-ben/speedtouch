-- =====================================================================
-- Speedtouch — Stock decrement
-- Run this once in the Supabase SQL editor (after orders.sql).
-- Whenever an order_item is inserted, the linked product's stock is
-- reduced by that quantity (never below 0).
-- =====================================================================

create or replace function public.decrement_product_stock()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.product_id is not null then
    update public.products
    set stock = greatest(0, stock - new.quantity)
    where id = new.product_id;
  end if;
  return new;
end;
$$;

drop trigger if exists order_items_decrement_stock on public.order_items;
create trigger order_items_decrement_stock
  after insert on public.order_items
  for each row execute function public.decrement_product_stock();
