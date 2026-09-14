import { fetchProducts } from '../lib/products'
import { fetchServices } from '../lib/services'

export default async function sitemap() {
  const baseUrl = 'https://speedtouch.com.ng'

  const staticRoutes = [
    '',
    '/products',
    '/services',
    '/about',
    '/reviews',
    '/pricing',
    '/work',
    '/faq',
    '/contact',
    '/terms',
    '/privacy',
    '/cancellation',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/products' || route === '/services' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : route === '/products' || route === '/services' ? 0.9 : 0.7,
  }))

  let productRoutes = []
  try {
    const products = await fetchProducts()
    if (products && products.length > 0) {
      productRoutes = products.map((p) => ({
        url: `${baseUrl}/products/${p.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
    }
  } catch (e) {}

  let serviceRoutes = []
  try {
    const services = await fetchServices()
    if (services && services.length > 0) {
      serviceRoutes = services.map((s) => ({
        url: `${baseUrl}/services/${s.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
    }
  } catch (e) {}

  return [...staticRoutes, ...productRoutes, ...serviceRoutes]
}
