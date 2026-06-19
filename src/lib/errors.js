// Turn raw Supabase / Postgres / network errors into short, friendly messages
// a non-technical customer can understand. Never surface DB jargon in the UI.
export function humanizeError(err) {
  const raw =
    (err &&
      (err.message ||
        err.error_description ||
        err.details ||
        err.hint ||
        (typeof err === 'string' ? err : ''))) ||
    ''
  const msg = raw.toLowerCase()

  // Cart references a product that no longer exists in the catalogue.
  if (msg.includes('foreign key') || msg.includes('_fkey')) {
    return 'Some items in your cart are no longer available. Please refresh your cart and try again.'
  }
  // Connection problems.
  if (
    msg.includes('failed to fetch') ||
    msg.includes('networkerror') ||
    msg.includes('network request') ||
    msg.includes('load failed')
  ) {
    return 'Network problem — please check your internet connection and try again.'
  }
  // Timeouts.
  if (msg.includes('timeout') || msg.includes('timed out')) {
    return 'That took too long to respond. Please try again.'
  }
  // Duplicates.
  if (msg.includes('duplicate') || msg.includes('already exists') || msg.includes('unique constraint')) {
    return 'This looks like a duplicate. Please refresh and try again.'
  }
  // Auth / permissions (mostly admin).
  if (
    msg.includes('jwt') ||
    msg.includes('not authorized') ||
    msg.includes('permission') ||
    msg.includes('row-level security') ||
    msg.includes('rls') ||
    msg.includes('401') ||
    msg.includes('403')
  ) {
    return "You don't have permission to do that. Please sign in again."
  }
  // Anything else — keep it calm and never show the raw text.
  return 'Something went wrong. Please try again, or reach us on WhatsApp if it persists.'
}
