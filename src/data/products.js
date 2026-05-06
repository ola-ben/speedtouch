export const categories = [
  { id: 'all', label: 'All' },
  { id: 'sprays', label: 'Sprays & Liquids' },
  { id: 'tools', label: 'Tools & Equipment' },
  { id: 'kits', label: 'Kits & Bundles' },
  { id: 'accessories', label: 'Accessories' },
]

export const products = [
  {
    id: 'multi-surface-cleaner',
    name: 'Multi-Surface Cleaner Spray (1L)',
    category: 'sprays',
    image:
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80&auto=format&fit=crop',
    price: 4500,
    original: 6000,
    discount: 25,
    stock: 42,
    rating: 4.7,
    reviews: 318,
    description:
      'Our signature plant-based formula tackles grease, grime, and fingerprints on countertops, glass, stainless steel, and tile. Streak-free and safe around kids and pets.',
  },
  {
    id: 'microfiber-cloth-pack',
    name: 'Microfiber Cloth Pack — 10 pieces',
    category: 'accessories',
    image:
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80&auto=format&fit=crop',
    price: 3200,
    original: 4500,
    discount: 29,
    stock: 120,
    rating: 4.8,
    reviews: 542,
    description:
      'Ultra-fine microfiber that traps dust, dirt, and bacteria without chemicals. Color-coded for kitchen, bath, glass, and dusting. Machine-washable up to 200 cycles.',
  },
  {
    id: 'steam-mop-pro',
    name: 'Steam Mop Pro — 1500W',
    category: 'tools',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80&auto=format&fit=crop',
    price: 45000,
    original: 60000,
    discount: 25,
    stock: 18,
    rating: 4.6,
    reviews: 87,
    description:
      'Sanitizes hard floors with chemical-free steam in seconds. 1500W heater, 350ml tank, 6m cord, swivel head, and two reusable pads. Kills 99.9% of germs.',
  },
  {
    id: 'cordless-stick-vacuum',
    name: 'Cordless Stick Vacuum',
    category: 'tools',
    image:
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&q=80&auto=format&fit=crop',
    price: 85000,
    original: 110000,
    discount: 23,
    stock: 9,
    rating: 4.7,
    reviews: 142,
    description:
      'Lightweight 2.4kg cordless vacuum with 40-min runtime, HEPA filtration, and a quick-release handheld mode for stairs, sofas, and cars. LED-lit head.',
  },
  {
    id: 'bathroom-deep-clean-kit',
    name: 'Bathroom Deep-Clean Kit',
    category: 'kits',
    image:
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&q=80&auto=format&fit=crop',
    price: 8900,
    original: 13500,
    discount: 34,
    stock: 31,
    rating: 4.8,
    reviews: 204,
    description:
      'Everything you need for a deep bathroom reset: tile spray, descaler, toilet gel, scrubber brush, microfiber cloths, and gloves. Lemon-fresh.',
  },
  {
    id: 'glass-window-cleaning-set',
    name: 'Glass & Window Cleaning Set',
    category: 'kits',
    image:
      'https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=800&q=80&auto=format&fit=crop',
    price: 6500,
    original: 9000,
    discount: 28,
    stock: 56,
    rating: 4.6,
    reviews: 165,
    description:
      'Streak-free formula plus a professional squeegee, scrubber pad, and lint-free cloth. Designed for windows, mirrors, glass tables, and shower doors.',
  },
  {
    id: 'heavy-duty-cleaning-gloves',
    name: 'Heavy-Duty Cleaning Gloves (3 pairs)',
    category: 'accessories',
    image:
      'https://images.unsplash.com/photo-1527515545081-5db817172677?w=800&q=80&auto=format&fit=crop',
    price: 2500,
    original: 3500,
    discount: 28,
    stock: 200,
    rating: 4.5,
    reviews: 96,
    description:
      'Long-cuff latex-free gloves with a textured grip. Fits sizes M / L / XL. Reusable, dishwasher-safe, and protects skin from harsh cleaners.',
  },
  {
    id: 'eco-laundry-detergent',
    name: 'Eco Laundry Detergent — 5L',
    category: 'sprays',
    image:
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&q=80&auto=format&fit=crop',
    price: 7800,
    original: 10500,
    discount: 25,
    stock: 67,
    rating: 4.7,
    reviews: 421,
    description:
      'Plant-based, hypoallergenic detergent that delivers up to 100 washes. Gentle on fabrics, tough on stains, biodegradable formula.',
  },
  {
    id: 'dish-soap-bundle',
    name: 'Dish Soap Bundle (3 bottles)',
    category: 'kits',
    image:
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&q=80&auto=format&fit=crop',
    price: 4200,
    original: 6000,
    discount: 30,
    stock: 84,
    rating: 4.6,
    reviews: 188,
    description:
      'Concentrated, pH-balanced dish soap that cuts grease without drying hands. Three 750ml bottles in citrus, lavender, and unscented.',
  },
  {
    id: 'toilet-cleaner-gel-pack',
    name: 'Toilet Cleaner Gel Pack',
    category: 'sprays',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80&auto=format&fit=crop',
    price: 3500,
    original: 5000,
    discount: 30,
    stock: 73,
    rating: 4.4,
    reviews: 91,
    description:
      'Thick gel formula clings to the bowl, killing 99.9% of germs and removing limescale. 3 x 750ml bottles per pack.',
  },
  {
    id: 'floor-mop-bucket-set',
    name: 'Floor Mop & Bucket Set',
    category: 'tools',
    image:
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80&auto=format&fit=crop',
    price: 12500,
    original: 17000,
    discount: 26,
    stock: 22,
    rating: 4.7,
    reviews: 137,
    description:
      'Self-wringing flat mop with a built-in spinner bucket. Two replaceable microfiber pads. No bending, no wet hands.',
  },
  {
    id: 'air-freshener-lavender',
    name: 'Air Freshener — Lavender 6-pack',
    category: 'accessories',
    image:
      'https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=800&q=80&auto=format&fit=crop',
    price: 5400,
    original: 7800,
    discount: 31,
    stock: 110,
    rating: 4.5,
    reviews: 256,
    description:
      'Long-lasting essential-oil air fresheners. Six 50ml bottles with adjustable wicks. Eight weeks of fragrance per bottle.',
  },
]
