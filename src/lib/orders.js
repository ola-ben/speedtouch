import { supabase, isSupabaseConfigured } from './supabase'

export const ORDER_STATUSES = [
  'pending',
  'paid',
  'fulfilled',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
]

function rowToOrder(row) {
  if (!row) return null
  return {
    id: row.id,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    deliveryMethod: row.delivery_method,
    shippingAddress: row.shipping_address,
    paymentMethod: row.payment_method,
    subtotal: row.subtotal,
    shipping: row.shipping,
    total: row.total,
    status: row.status,
    notes: row.notes,
    placedAt: row.placed_at,
    items: (row.order_items ?? [])
      .map((it) => ({
        productId: it.product_id,
        name: it.name,
        image: it.image_url,
        price: it.price,
        quantity: it.quantity,
      })),
  }
}

export async function createOrder(payload) {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured')

  const { error: orderError } = await supabase.from('orders').insert({
    id: payload.id,
    customer_name: payload.customerName,
    customer_email: payload.customerEmail,
    customer_phone: payload.customerPhone ?? null,
    delivery_method: payload.deliveryMethod,
    shipping_address: payload.shippingAddress ?? null,
    payment_method: payload.paymentMethod ?? 'card',
    subtotal: payload.subtotal,
    shipping: payload.shipping,
    total: payload.total,
    status: payload.status ?? 'pending',
    notes: payload.notes ?? null,
  })
  if (orderError) throw orderError

  if (payload.items?.length) {
    const rows = payload.items.map((it) => ({
      order_id: payload.id,
      product_id: it.productId ?? it.id ?? null,
      name: it.name,
      image_url: it.image ?? null,
      price: it.price,
      quantity: it.quantity,
    }))
    const { error: itemsError } = await supabase.from('order_items').insert(rows)
    if (itemsError) throw itemsError
  }

  return { id: payload.id }
}

export async function fetchOrders() {
  if (!isSupabaseConfigured) return []
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('placed_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(rowToOrder)
}

export async function fetchOrderById(id) {
  if (!isSupabaseConfigured) return null
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return rowToOrder(data)
}

export async function updateOrderStatus(id, status) {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured')
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select('*, order_items(*)')
    .single()
  if (error) throw error
  return rowToOrder(data)
}

export function generateOrderId() {
  return `ST-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}
