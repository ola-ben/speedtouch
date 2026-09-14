import '../index.css'
import ClientShell from '../components/ClientShell'

export const metadata = {
  metadataBase: new URL('https://speedtouch.com.ng'),
  title: {
    default: 'Speedtouch — Professional Cleaning Services & Supplies in Ibadan',
    template: '%s | Speedtouch',
  },
  description:
    'Professional home & office cleaning and eco-friendly cleaning supplies in Ibadan, Nigeria. Book trained, insured cleaners in 60 seconds.',
  keywords: [
    'cleaning service Ibadan',
    'cleaning service Nigeria',
    'deep cleaning',
    'office cleaning',
    'move in out cleaning',
    'cleaning supplies Nigeria',
    'Speedtouch',
  ],
  authors: [{ name: 'Speedtouch Cleanings and Hygiene Ltd' }],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Speedtouch',
    locale: 'en_NG',
    url: 'https://speedtouch.com.ng/',
    title: 'Speedtouch — Professional Cleaning Services & Supplies',
    description:
      'A spotless home, without the hassle. Trained, insured cleaners and eco-friendly supplies in Ibadan, Nigeria.',
    images: [{ url: 'https://speedtouch.com.ng/logo.jpeg', width: 1280, height: 720, alt: 'Speedtouch' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speedtouch — Professional Cleaning Services & Supplies',
    description:
      'A spotless home, without the hassle. Trained, insured cleaners and eco-friendly supplies in Ibadan, Nigeria.',
    images: ['https://speedtouch.com.ng/logo.jpeg'],
  },
}

export const viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
}
