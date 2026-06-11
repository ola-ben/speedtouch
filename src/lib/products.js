import { supabase, isSupabaseConfigured } from './supabase'

const TABLE = 'products'

// Dev-only demo product. `import.meta.env.DEV` is `false` in production builds,
// so Vite strips this array — it never ships when you push/deploy. It only
// shows locally when Supabase isn't configured, so you can preview the cards.
const DEMO_PRODUCTS = import.meta.env.DEV
  ? [
      {
        id: 'demo-1',
        name: 'Multi-Surface Cleaning Spray (Eco-Friendly, 750ml)',
        description:
          'Plant-based, non-toxic spray that cuts through grease and grime on any surface — safe around kids and pets. Demo product (local preview only).',
        category: 'Supplies',
        image: 'https://picsum.photos/seed/speedtouch-demo/600/600',
        price: 4500,
        original: 6000,
        discount: 25,
        stock: 8,
        rating: 4.8,
        reviews: 23,
      },
    ]
  : []

function rowToProduct(row) {
  if (!row) return null
  const original = row.original ?? null
  const discount = original && original > row.price
    ? Math.round(((original - row.price) / original) * 100)
    : 0
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? '',
    category: row.category,
    image: row.image_url,
    price: row.price,
    original,
    discount,
    stock: row.stock ?? 0,
    rating: row.rating ?? 0,
    reviews: row.reviews ?? 0,
  }
}

function productToRow(p) {
  return {
    id: p.id,
    name: p.name,
    description: p.description ?? null,
    category: p.category,
    image_url: p.image ?? null,
    price: Number(p.price) || 0,
    original: p.original ? Number(p.original) : null,
    stock: Number(p.stock) || 0,
    rating: Number(p.rating) || 0,
    reviews: Number(p.reviews) || 0,
  }
}

export async function fetchProducts() {
  if (!isSupabaseConfigured) return DEMO_PRODUCTS
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(rowToProduct)
}

export async function fetchProductById(id) {
  if (!isSupabaseConfigured) return DEMO_PRODUCTS.find((p) => p.id === id) ?? null
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return rowToProduct(data)
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(productToRow(product))
    .select()
    .single()
  if (error) throw error
  return rowToProduct(data)
}

export async function updateProduct(id, patch) {
  const row = productToRow({ ...patch, id })
  delete row.id
  const { data, error } = await supabase
    .from(TABLE)
    .update(row)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return rowToProduct(data)
}

export async function deleteProduct(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

export function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}
