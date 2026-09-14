import ServiceDetailPage from '../../../views/ServiceDetailPage'
import { fetchServiceById } from '../../../lib/services'

export async function generateMetadata({ params }) {
  const resolved = await params
  const id = resolved?.id
  try {
    const service = await fetchServiceById(id)
    if (service) {
      const title = `${service.name} — Professional Cleaning Service`
      const desc = service.description || `Book ${service.name} in Ibadan with Speedtouch.`
      const img = service.image_url || 'https://speedtouch.com.ng/logo.jpeg'

      return {
        title,
        description: desc,
        openGraph: {
          title,
          description: desc,
          url: `https://speedtouch.com.ng/services/${id}`,
          images: [{ url: img, alt: service.name }],
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
    title: 'Cleaning Service Details | Speedtouch',
    description: 'Book professional cleaning services in Ibadan with Speedtouch.',
  }
}

export default async function Page({ params }) {
  const resolved = await params
  const id = resolved?.id
  let service = null
  try {
    service = await fetchServiceById(id)
  } catch (e) {}

  const serviceSchema = service
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        serviceType: 'Cleaning',
        description: service.description,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Speedtouch Cleanings and Hygiene Ltd',
          url: 'https://speedtouch.com.ng',
        },
        areaServed: {
          '@type': 'City',
          name: 'Ibadan',
        },
        offers: {
          '@type': 'Offer',
          price: service.price,
          priceCurrency: 'NGN',
        },
      }
    : null

  return (
    <>
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      <ServiceDetailPage />
    </>
  )
}
