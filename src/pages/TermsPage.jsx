import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function TermsPage() {
  useDocumentTitle(
    'Terms of Service',
    'Speedtouch Terms of Service — simple and straightforward terms for our cleaning services in Ibadan.',
  )

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Terms of Service</span>
        </nav>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-5 text-base text-slate-700 md:text-lg">
          Welcome to Speedtouch. We believe in keep things simple. These terms explain the agreement between us (Speedtouch Cleanings and Hygiene Ltd) and you (our customer).
        </p>

        <div className="mt-10 space-y-8 text-slate-700">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">1. Our Cleaning Services</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              We provide professional cleaning services and eco-friendly cleaning products in Ibadan, Nigeria. We send trained, vetted, and background-checked cleaners to your designated address.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">2. Bookings & Scheduling</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Bookings can be made online via our platform or through WhatsApp. We request accurate details about your space (number of rooms, bathrooms, etc.) so we can dispatch the right team and products.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">3. Payments</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Payments are processed securely via Paystack or via bank transfer to our Moniepoint account with confirmation on WhatsApp. Bookings are fully confirmed only after payment is received and processed.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">4. Cancellations & Rescheduling</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              We understand plans change. For details on refunds, cancellation fees, and rescheduling guidelines, please read our dedicated{' '}
              <Link to="/cancellation" className="font-medium text-brand-blue hover:underline">
                Cancellation Policy
              </Link>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">5. Access and Safety</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Please ensure our team has safe access to the premises at the scheduled time. For safety and security, please secure any valuables, cash, or sensitive jewelry before our team arrives.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">6. Liability & Satisfaction Guarantee</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              If you are not satisfied with the quality of our service, notify us within 24 hours and we will return to make it right at no extra cost. While we carry public liability insurance, we are not liable for pre-existing wear and tear or items that are not secured safely.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-700">
          <p>
            <strong>Last Updated:</strong> July 2026. If we change these terms, we will post the updated version here. If you have any questions, please{' '}
            <Link to="/contact" className="font-medium text-brand-blue hover:underline">
              contact us
            </Link>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default TermsPage
