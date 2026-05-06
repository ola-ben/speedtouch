import { supabase } from './supabase'

const BUCKET = 'product-images'

export async function uploadProductImage(file, idHint = '') {
  if (!file) throw new Error('No file provided')
  if (!file.type.startsWith('image/')) throw new Error('File must be an image')

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const safeId = idHint ? `${idHint}-` : ''
  const filename = `${safeId}${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file, {
      cacheControl: '31536000',
      contentType: file.type,
      upsert: false,
    })
  if (error) throw error

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename)
  return { path: filename, url: data.publicUrl }
}

export async function deleteProductImage(pathOrUrl) {
  if (!pathOrUrl) return
  const path = pathOrUrl.includes('/storage/v1/object/public/' + BUCKET + '/')
    ? pathOrUrl.split('/storage/v1/object/public/' + BUCKET + '/')[1]
    : pathOrUrl
  await supabase.storage.from(BUCKET).remove([path])
}
