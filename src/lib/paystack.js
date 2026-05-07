const PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY

export const isPaystackConfigured = Boolean(PUBLIC_KEY)

/**
 * Open the Paystack checkout popup.
 *
 * Returns a promise that resolves with the Paystack response on a successful
 * charge or rejects with `{ cancelled: true }` if the customer closed the
 * popup. Throws if Paystack isn't configured or its script hasn't loaded.
 */
export function openPaystack({ email, amount, reference, metadata = {} }) {
  return new Promise((resolve, reject) => {
    if (!PUBLIC_KEY) {
      reject(new Error('Paystack public key is not set. Add VITE_PAYSTACK_PUBLIC_KEY to your .env.'))
      return
    }
    if (typeof window === 'undefined' || !window.PaystackPop) {
      reject(new Error('Paystack failed to load. Check your internet connection and reload the page.'))
      return
    }
    if (!email) {
      reject(new Error('Customer email is required for Paystack.'))
      return
    }

    let resolved = false
    const handler = window.PaystackPop.setup({
      key: PUBLIC_KEY,
      email,
      // Paystack expects the smallest currency unit: kobo for NGN.
      amount: Math.round(Number(amount) * 100),
      currency: 'NGN',
      ref: reference,
      metadata,
      callback(response) {
        resolved = true
        resolve(response)
      },
      onClose() {
        if (!resolved) reject({ cancelled: true })
      },
    })

    handler.openIframe()
  })
}
