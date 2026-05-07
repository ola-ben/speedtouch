import { supabase, isSupabaseConfigured } from './supabase'

const TABLE = 'services'

export const SERVICE_TAGS = ['Home', 'Office', 'Special', 'Add-on']

function rowToService(row) {
  if (!row) return null
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? '',
    tag: row.tag ?? 'Home',
    image: row.image_url,
    price: row.price,
    duration: row.duration ?? '',
    popular: row.popular ?? false,
    sortOrder: row.sort_order ?? 0,
  }
}

function serviceToRow(s) {
  return {
    id: s.id,
    name: s.name,
    description: s.description ?? null,
    tag: s.tag ?? 'Home',
    image_url: s.image ?? null,
    price: Number(s.price) || 0,
    duration: s.duration ?? null,
    popular: !!s.popular,
    sort_order: Number(s.sortOrder) || 0,
  }
}

export async function fetchServices() {
  if (!isSupabaseConfigured) return []
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) throw error
  return (data ?? []).map(rowToService)
}

export async function fetchServiceById(id) {
  if (!isSupabaseConfigured) return null
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return rowToService(data)
}

export async function createService(s) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(serviceToRow(s))
    .select()
    .single()
  if (error) throw error
  return rowToService(data)
}

export async function updateService(id, patch) {
  const row = serviceToRow({ ...patch, id })
  delete row.id
  const { data, error } = await supabase
    .from(TABLE)
    .update(row)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return rowToService(data)
}

export async function deleteService(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

export function slugifyService(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}
