// Square-crop the provided emblem image into a favicon / app icon.
// Run: node scripts/make-favicon.mjs
import Jimp from 'jimp'

const SRC = 'src/assets/WhatsApp Image 2026-05-19 at 9.58.26 AM.jpeg'
const OUT = 'public/favicon.png'

const img = await Jimp.read(SRC)
const { width: W, height: H } = img.bitmap

// Center-crop to the largest square, then resize to 512.
const side = Math.min(W, H)
img.crop(Math.round((W - side) / 2), Math.round((H - side) / 2), side, side)
img.resize(512, 512)
img.deflateLevel(9).filterType(Jimp.PNG_FILTER_AUTO)

await img.writeAsync(OUT)
console.log('wrote', OUT, '512x512')
