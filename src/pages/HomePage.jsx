import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Services from '../components/Services'
import Products from '../components/Products'
import Co from '../components/Co'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function HomePage() {
  useDocumentTitle(
    'Professional Cleaning Services & Supplies | Ibadan',
    'Speedtouch — professional home & office cleaning and eco-friendly cleaning supplies in Ibadan, Nigeria. Book trained, insured cleaners in 60 seconds.',
  )

  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Products />
      <Co />
    </>
  )
}

export default HomePage
