import { Store, Bell, CreditCard, Truck, KeyRound } from 'lucide-react'

const sections = [
  {
    icon: Store,
    title: 'Store details',
    body: 'Business name, support email, currency, time zone, and timezone.',
  },
  {
    icon: CreditCard,
    title: 'Payments',
    body: 'Connected processors, payout schedule, and currency settings.',
  },
  {
    icon: Truck,
    title: 'Shipping',
    body: 'Zones, rates, free-shipping thresholds, and pickup options.',
  },
  {
    icon: Bell,
    title: 'Notifications',
    body: 'Email and SMS templates for order events and customer messages.',
  },
  {
    icon: KeyRound,
    title: 'Team & permissions',
    body: 'Invite teammates and manage admin roles.',
  },
]

function AdminSettingsPage() {
  return (
    <div className="px-4 py-8 sm:px-6 md:py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Configure your store. (Coming soon — wire up to Supabase to persist.)
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-blue/40 hover:shadow-sm"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue">
                <s.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-base font-semibold text-slate-900">{s.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminSettingsPage
