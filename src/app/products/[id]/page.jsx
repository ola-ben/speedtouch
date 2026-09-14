import ProductDetailPage from '../../../views/ProductDetailPage'
import { fetchProductById } from '../../../lib/products'

export async function generateMetadata({ params }) {
  const resolved = await params
  const id = resolved?.id
  try {
    const product = await fetchProductById(id)
    if (product) {
      const title = `${product.name} — Cleaning Supplies`
      const desc = product.description || `Buy ${product.name} for ₦${product.price?.toLocaleString()} from Speedtouch in Ibadan.`
      const img = product.image || 'https://speedtouch.com.ng/logo.jpeg'

      return {
        title,
        description: desc,
        openGraph: {
          title,
          description: desc,
          url: `https://speedtouch.com.ng/products/${id}`,
          images: [{ url: img, alt: product.name }],
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description: desc,
          images: [img],
        },
      }
    }
  } catch (e) {}

  return {
    title: 'Product Details | Speedtouch',
    description: 'Shop quality cleaning supplies from Speedtouch in Ibadan, Nigeria.',
  }
}

export default async function Page({ params }) {
  const resolved = await params
  const id = resolved?.id
  let product = null
  try {
    product = await fetchProductById(id)
  } catch (e) {}

  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.image ? [product.image] : ['https://speedtouch.com.ng/logo.jpeg'],
        description: product.description || product.name,
        sku: product.id,
        gtin13: product.id?.length === 13 ? product.id : undefined,
        offers: {
          '@type': 'Offer',
          url: `https://speedtouch.com.ng/products/${product.id}`,
          priceCurrency: 'NGN',
          price: product.price,
          availability:
            product.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition',
        },
      }
    : null

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <ProductDetailPage />
    </>
  )
}
