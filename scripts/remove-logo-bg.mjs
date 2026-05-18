// One-off: turn the light background of the brand JPEG into transparency,
// then tightly crop to the artwork. Run: node scripts/remove-logo-bg.mjs
import Jimp from 'jimp'

const SRC = 'src/assets/WhatsApp Image 2026-05-14 at 3.50.12 PM.jpeg'
const OUTS = ['src/assets/logo.png', 'public/logo.png']

const img = await Jimp.read(SRC)
const { width: W, height: H, data } = img.bitmap

// 1. Knock out the low-saturation light background.
img.scan(0, 0, W, H, function (x, y, idx) {
  const r = data[idx]
  const g = data[idx + 1]
  const b = data[idx + 2]
  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  const sat = max - min

  if (sat < 28) {
    if (min >= 215) data[idx + 3] = 0
    else if (min > 185) data[idx + 3] = Math.round(((215 - min) / 30) * 255)
  }
})

// 2. Find the bounding box of pixels that are meaningfully opaque.
let minX = W
let minY = H
let maxX = 0
let maxY = 0
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const a = data[(y * W + x) * 4 + 3]
    if (a > 24) {
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
}

// 3. Crop to that box with a small breathing margin.
const pad = 16
minX = Math.max(0, minX - pad)
minY = Math.max(0, minY - pad)
maxX = Math.min(W - 1, maxX + pad)
maxY = Math.min(H - 1, maxY + pad)
img.crop(minX, minY, maxX - minX + 1, maxY - minY + 1)

// Downscale: it's displayed ~40px tall, so ~160px is crisp even on retina.
img.resize(Jimp.AUTO, 160)
img.deflateLevel(9).filterType(Jimp.PNG_FILTER_AUTO)

for (const out of OUTS) {
  await img.writeAsync(out)
  console.log('wrote', out, `${img.bitmap.width}x${img.bitmap.height}`)
}
