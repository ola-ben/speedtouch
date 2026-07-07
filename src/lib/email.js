const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_CUSTOMER = import.meta.env.VITE_EMAILJS_TEMPLATE_CUSTOMER
const EMAILJS_TEMPLATE_ADMIN = import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'info@speedtouch.com.ng'

/**
 * Formats order items into a clean text block/HTML for the email template.
 */
function formatOrderItems(items) {
  if (!items?.length) return 'No items'
  return items
    .map(
      (it) =>
        `- ${it.name} (x${it.quantity}) — ₦${Number(it.price).toLocaleString('en-NG')}`
    )
    .join('\n')
}

/**
 * Formats shipping address into a single readable string.
 */
function formatShippingAddress(addr) {
  if (!addr) return 'N/A'
  if (typeof addr === 'string') return addr
  return `${addr.line1 || ''}, ${addr.city || ''}, ${addr.state || ''}, ${addr.country || 'Nigeria'}`
}

/**
 * Sends order emails to both the customer and the admin.
 * Uses EmailJS REST API. Gracefully skips if config is not present.
 */
export async function sendOrderEmails(order) {
  // If configuration is missing, log a warning and return.
  if (
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_PUBLIC_KEY
  ) {
    console.warn(
      'EmailJS config missing (VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_PUBLIC_KEY). Automated emails skipped.'
    )
    return
  }

  const itemsList = formatOrderItems(order.items)
  const addressStr = formatShippingAddress(order.shippingAddress)
  const formattedTotal = `₦${Number(order.total).toLocaleString('en-NG')}`

  const baseParams = {
    order_id: order.id,
    customer_name: order.customerName,
    customer_email: order.customerEmail,
    customer_phone: order.customerPhone || 'N/A',
    delivery_method: order.deliveryMethod === 'pickup' ? 'Pick up at station' : 'Home delivery',
    shipping_address: addressStr,
    order_items: itemsList,
    total_price: formattedTotal,
  }

  // 1. Send confirmation email to customer
  if (EMAILJS_TEMPLATE_CUSTOMER) {
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_CUSTOMER,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          ...baseParams,
          reply_to: ADMIN_EMAIL,
        },
      }),
    }).then((res) => {
      if (!res.ok) console.error('Failed to send email to customer:', res.statusText)
    }).catch((err) => {
      console.error('Error sending customer email:', err)
    })
  } else {
    console.warn('Customer EmailJS Template ID missing (VITE_EMAILJS_TEMPLATE_CUSTOMER).')
  }

  // 2. Send notification email to admin
  if (EMAILJS_TEMPLATE_ADMIN) {
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ADMIN,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          ...baseParams,
          admin_email: ADMIN_EMAIL,
        },
      }),
    }).then((res) => {
      if (!res.ok) console.error('Failed to send email to admin:', res.statusText)
    }).catch((err) => {
      console.error('Error sending admin email:', err)
    })
  } else {
    console.warn('Admin EmailJS Template ID missing (VITE_EMAILJS_TEMPLATE_ADMIN).')
  }
}
