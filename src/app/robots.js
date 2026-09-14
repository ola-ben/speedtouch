export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/checkout', '/account', '/order/'],
      },
    ],
    sitemap: 'https://speedtouch.com.ng/sitemap.xml',
  }
}
