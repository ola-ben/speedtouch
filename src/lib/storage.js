import { supabase } from './supabase'

const PRODUCT_BUCKET = 'product-images'
const SERVICE_BUCKET = 'service-images'

// Downscale + re-encode big uploads in the browser so visitors don't have to
// download multi-MB phone photos. Vectors/GIFs pass through untouched.
async function compressImage(file, maxDim = 1280, quality = 0.82) {
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') return file
  if (typeof createImageBitmap !== 'function' || typeof document === 'undefined') {
    return file
  }

  let bitmap
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    return file
  }

  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height))
  const w = Math.round(bitmap.width * scale)
  const h = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h)
  bitmap.close?.()

  const blob = await new Promise((res) =>
    canvas.toBlob(res, 'image/jpeg', quality),
  )
  if (!blob || blob.size >= file.size) return file

  return new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', {
    type: 'image/jpeg',
  })
}

async function uploadToBucket(file, bucket, idHint = '') {
  if (!file) throw new Error('No file provided')
  if (!file.type.startsWith('image/')) throw new Error('File must be an image')

  const optimized = await compressImage(file)
  const ext =
    optimized.type === 'image/jpeg'
      ? 'jpg'
      : (optimized.name.split('.').pop() || 'jpg').toLowerCase()
  const safeId = idHint ? `${idHint}-` : ''
  const filename = `${safeId}${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filename, optimized, {
      cacheControl: '31536000',
      contentType: optimized.type,
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
