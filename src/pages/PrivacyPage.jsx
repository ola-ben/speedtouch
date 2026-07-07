import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function PrivacyPage() {
  useDocumentTitle(
    'Privacy Policy',
    'Speedtouch Privacy Policy — how we collect, protect, and use your personal information honestly.',
  )

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-slate-900">Privacy Policy</span>
        </nav>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 text-base text-slate-700 md:text-lg">
          At Speedtouch, we respect your privacy. This policy explains what information we collect when you use our website or services and how we handle it.
        </p>

        <div className="mt-10 space-y-8 text-slate-700">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">1. Information We Collect</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              When you book a service, sign up for an account, or contact us, we collect details necessary to fulfill your request:
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1">
              <li><strong>Contact Info:</strong> Name, email address, phone number (used for WhatsApp coordination).</li>
              <li><strong>Service Location:</strong> Address, flat number, and any special directions for cleaning.</li>
              <li><strong>Payment Reference:</strong> Transaction reference for Paystack or transfer validation. We do not store card details on our servers.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">2. How We Use Your Data</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              We only use your personal information to provide, support, and improve our services:
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1">
              <li>To schedule cleaners and navigate to your address.</li>
              <li>To confirm your payments and send booking updates.</li>
              <li>To notify you about changes or resolve service issues.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">3. Cookies & Local Storage</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              We use standard local storage to save your active shopping cart items and session information. This is to ensure a smooth browsing experience and allow you to pick up where you left off.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">4. Third-Party Integrations</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              We integrate with trusted providers to securely run our application:
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 space-y-1">
              <li><strong>Supabase:</strong> For user authentication and secure database storage.</li>
              <li><strong>Paystack:</strong> For processing secure online payments directly from the app.</li>
              <li><strong>Google Auth:</strong> If you choose to log in with Google, we access your name and email to pre-fill details.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">5. Data Security</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              We apply Row Level Security (RLS) on our database so that customers can only view their own orders and details. We work continuously to protect our platform, but no online storage or transmission is 100% secure.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-700">
          <p>
            <strong>Last Updated:</strong> July 2026. If you have any questions or would like to request deletion of your information, please reach out to us at{' '}
            <a href="mailto:info@speedtouch.com.ng" className="font-medium text-brand-blue hover:underline">
              info@speedtouch.com.ng
            </a>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPage
