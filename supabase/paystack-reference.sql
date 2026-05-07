-- =====================================================================
-- Speedtouch — Paystack reference column
-- Run this once in the Supabase SQL editor (after orders.sql).
-- Adds a column to store the Paystack transaction reference per order.
-- =====================================================================

alter table public.orders
  add column if not exists payment_reference text;

create index if not exists orders_payment_reference_idx
  on public.orders (payment_reference);
