import HomePage from '../views/HomePage'

export const metadata = {
  title: 'Speedtouch — Professional Cleaning Services & Supplies in Ibadan',
  description:
    'Book trained, vetted cleaners and shop eco-friendly cleaning supplies in Ibadan, Nigeria. Fast 60-second booking, 100% satisfaction guaranteed.',
}

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Speedtouch Cleanings and Hygiene Ltd',
    image: 'https://speedtouch.com.ng/logo.jpeg',
    '@id': 'https://speedtouch.com.ng/#business',
    url: 'https://speedtouch.com.ng',
    telephone: '+2347063026374',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ibadan',
      addressRegion: 'Oyo State',
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 7.3775,
      longitude: 3.947,
    },
    priceRange: '₦₦',
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Speedtouch',
    url: 'https://speedtouch.com.ng',
    hasPart: [
      { '@type': 'WebPage', name: 'Cleaning Services', url: 'https://speedtouch.com.ng/services' },
      { '@type': 'WebPage', name: 'Cleaning Products & Supplies', url: 'https://speedtouch.com.ng/products' },
      { '@type': 'WebPage', name: 'Pricing & Packages', url: 'https://speedtouch.com.ng/pricing' },
      { '@type': 'WebPage', name: 'Customer Reviews', url: 'https://speedtouch.com.ng/reviews' },
      { '@type': 'WebPage', name: 'About Us', url: 'https://speedtouch.com.ng/about' },
      { '@type': 'WebPage', name: 'Contact & Support', url: 'https://speedtouch.com.ng/contact' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomePage />
    </>
  )
}
