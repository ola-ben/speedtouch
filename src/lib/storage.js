import { supabase } from './supabase'

const PRODUCT_BUCKET = 'product-images'
const SERVICE_BUCKET = 'service-images'

async function uploadToBucket(file, bucket, idHint = '') {
  if (!file) throw new Error('No file provided')
  if (!file.type.startsWith('image/')) throw new Error('File must be an image')

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const safeId = idHint ? `${idHint}-` : ''
  const filename = `${safeId}${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filename, file, {
      cacheControl: '31536000',
      contentType: file.type,
      upsert: false,
    })
  if (error) throw error

  const { data } = supabase.storage.from(bucket).getPublicUrl(filename)
  return { path: filename, url: data.publicUrl }
}

async function deleteFromBucket(bucket, pathOrUrl) {
  if (!pathOrUrl) return
  const marker = '/storage/v1/object/public/' + bucket + '/'
  const path = pathOrUrl.includes(marker)
    ? pathOrUrl.split(marker)[1]
    : pathOrUrl
  await supabase.storage.from(bucket).remove([path])
}

export async function uploadProductImage(file, idHint = '') {
  return uploadToBucket(file, PRODUCT_BUCKET, idHint)
}

export async function deleteProductImage(pathOrUrl) {
  return deleteFromBucket(PRODUCT_BUCKET, pathOrUrl)
}

export async function uploadServiceImage(file, idHint = '') {
  return uploadToBucket(file, SERVICE_BUCKET, idHint)
}

export async function deleteServiceImage(pathOrUrl) {
  return deleteFromBucket(SERVICE_BUCKET, pathOrUrl)
}
