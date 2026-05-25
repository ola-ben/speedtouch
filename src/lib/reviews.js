import { supabase, isSupabaseConfigured } from './supabase'

const TABLE = 'reviews'

function rowToReview(row) {
  if (!row) return null
  return {
    id: row.id,
    name: row.name,
    email: row.email ?? null,
    location: row.location ?? '',
    rating: row.rating,
    comment: row.comment,
    service: row.service ?? '',
    status: row.status,
    createdAt: row.created_at,
  }
}

export async function fetchApprovedReviews() {
  if (!isSupabaseConfigured) return []
  const { data, error } = await supabase
    .from(TABLE)
    .select('id, name, location, rating, comment, service, created_at, status')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(rowToReview)
}

export async function fetchAllReviews() {
  if (!isSupabaseConfigured) return []
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(rowToReview)
}

export async function submitReview({
  name,
  email,
  location,
  rating,
  comment,
  service,
  honeypot,
}) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }
  const { error } = await supabase.from(TABLE).insert({
    name: String(name).trim(),
    email: email ? String(email).trim() : null,
    location: location ? String(location).trim() : null,
    rating: Number(rating),
    comment: String(comment).trim(),
    service: service ? String(service).trim() : null,
    honeypot: honeypot ?? null,
  })
  if (error) throw error
}

export async function updateReviewStatus(id, status) {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return rowToReview(data)
}

export async function deleteReview(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}
