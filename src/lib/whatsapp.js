// Business WhatsApp number in international format, digits only (no +, no spaces).
// e.g. Nigeria: 2347063026374. Set VITE_WHATSAPP_NUMBER in your .env.
const RAW = import.meta.env.VITE_WHATSAPP_NUMBER || '2348020776686'
export const WHATSAPP_NUMBER = String(RAW).replace(/\D/g, '')

const naira = (n) => `₦${Number(n).toLocaleString('en-NG')}`

/**
 * Build a readable order/quotation message from the cart.
 */
export function buildOrderMessage({
  items,
  subtotal,
  shipping,
  total,
  deliveryMethod,
  customer,
}) {
  const lines = []
  lines.push('*New order — Speedtouch*')
  lines.push('')
  lines.push('*Items*')
  items.forEach((it, i) => {
    lines.push(
      `${i + 1}. ${it.name} ×${it.quantity} — ${naira(it.price * it.quantity)}`,
    )
  })
  lines.push('')
  lines.push(`Subtotal: ${naira(subtotal)}`)
  lines.push(
    `${deliveryMethod === 'pickup' ? 'Pickup' : 'Shipping'}: ${
      shipping === 0 ? 'Free' : naira(shipping)
    }`,
  )
  lines.push(`*Total: ${naira(total)}*`)
  if (deliveryMethod) {
    lines.push('')
    lines.push(
      `Delivery: ${deliveryMethod === 'pickup' ? 'Pick up at station' : 'Home delivery'}`,
    )
  }
  if (customer?.name) lines.push(`Name: ${customer.name}`)
  if (customer?.phone) lines.push(`Phone: ${customer.phone}`)
  lines.push('')
  lines.push('Please confirm availability and payment options. Thank you!')
  return lines.join('\n')
}

/**
 * Open WhatsApp (app or web) with the pre-filled order message.
 */
export function sendOrderToWhatsApp(payload) {
  const text = encodeURIComponent(buildOrderMessage(payload))
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
