import { useEffect } from 'react'

const SUFFIX = 'Speedtouch'

/**
 * Sets the document <title> (and optionally the meta description) for the
 * current route, restoring nothing on unmount — the next route sets its own.
 */
export function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · ${SUFFIX}` : SUFFIX

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])
}
