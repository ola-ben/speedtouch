// Business WhatsApp number in international format, digits only (no +, no spaces).
// e.g. Nigeria: 2347063026374. Set VITE_WHATSAPP_NUMBER in your .env.
const RAW = import.meta.env.VITE_WHATSAPP_NUMBER || '2348020776686'
export const WHATSAPP_NUMBER = String(RAW).replace(/\D/g, '')

const naira = (n) => `₦${Number(n).toLocaleString('en-NG')}`

/**
 * Build a readable order/quotation message from the cart.
 */
export function buildOrderMessage({
  orderId,
  items,
  subtotal,
  shipping,
  total,
  deliveryMethod,
  customer,
  shippingAddress,
}) {
  const lines = []
  lines.push('*New order — Speedtouch*')
  if (orderId) lines.push(`Order ID: *#${orderId}*`)
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

  lines.push('')
  lines.push('*Customer*')
  if (customer?.name) lines.push(`Name: ${customer.name}`)
  if (customer?.email) lines.push(`Email: ${customer.email}`)
  if (customer?.phone) lines.push(`Phone: ${customer.phone}`)

  lines.push('')
  if (deliveryMethod === 'pickup') {
    lines.push('*Delivery method*')
    lines.push('Pick up at station (Speedtouch — Bodija)')
  } else {
    lines.push('*Shipping address*')
    lines.push('Home delivery')
    if (shippingAddress) {
      if (shippingAddress.line1) lines.push(shippingAddress.line1)
      const cityState = [shippingAddress.city, shippingAddress.state]
        .filter(Boolean)
        .join(', ')
      if (cityState) lines.push(cityState)
      if (shippingAddress.postal) lines.push(`Postal: ${shippingAddress.postal}`)
      if (shippingAddress.country) lines.push(shippingAddress.country)
    }
  }

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
