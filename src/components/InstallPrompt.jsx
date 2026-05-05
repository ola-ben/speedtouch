import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone
    ) {
      setInstalled(true)
      return
    }

    const onBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    const onInstalled = () => {
      setInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (installed || !deferredPrompt) return null

  const handleInstall = async () => {
    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted' || outcome === 'dismissed') {
        setDeferredPrompt(null)
      }
    } catch {
      setDeferredPrompt(null)
    }
  }

  return (
    <button
      type="button"
      onClick={handleInstall}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-medium text-white shadow-lg shadow-brand-blue/30 transition hover:bg-blue-700 sm:bottom-6 sm:right-6"
    >
      <Download className="h-4 w-4" />
      Install app
    </button>
  )
}

export default InstallPrompt
