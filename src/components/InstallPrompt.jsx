import { useEffect, useState } from 'react'
import { Download, Share, Plus, X, MoreVertical } from 'lucide-react'

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)
  const [platform, setPlatform] = useState('desktop')
  const [hintOpen, setHintOpen] = useState(false)

  useEffect(() => {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone
    ) {
      setInstalled(true)
      return
    }

    const ua = window.navigator.userAgent
    const isIOS =
      /iphone|ipad|ipod/i.test(ua) && !/crios|fxios/i.test(ua)
    const isAndroid = /android/i.test(ua)

    if (isIOS) setPlatform('ios')
    else if (isAndroid) setPlatform('android')
    else setPlatform('desktop')

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

  if (installed) return null
  // Hide on desktop unless we have a prompt — desktop Chrome shows its own install icon in the URL bar.
  if (!deferredPrompt && platform === 'desktop') return null

  const handleClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        if (outcome === 'accepted' || outcome === 'dismissed') {
          setDeferredPrompt(null)
        }
      } catch {
        setDeferredPrompt(null)
      }
      return
    }
    setHintOpen(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-brand-blue/30 transition hover:bg-blue-700 sm:bottom-6 sm:right-6 sm:px-5 sm:py-3 sm:text-sm"
      >
        <Download className="h-4 w-4" />
        Install app
      </button>

      {hintOpen && (
        <div
          onClick={() => setHintOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Install instructions"
            className="relative w-full max-w-sm rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={() => setHintOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand-blue to-brand-pink-deep">
              <Download className="h-5 w-5 text-white" />
            </div>

            <h3 className="text-center text-lg font-semibold tracking-tight text-slate-900">
              {platform === 'ios'
                ? 'Install Speedtouch on iPhone'
                : 'Install Speedtouch on Android'}
            </h3>
            <p className="mt-1 text-center text-sm text-slate-600">
              Two taps and you're set.
            </p>

            {platform === 'ios' ? (
              <ol className="mt-5 space-y-3 text-sm text-slate-700">
                <Step n={1}>
                  Tap the{' '}
                  <Share className="mx-1 inline h-4 w-4 align-text-bottom text-brand-blue" />{' '}
                  <span className="font-semibold">Share</span> button at the
                  bottom of Safari.
                </Step>
                <Step n={2}>
                  Scroll down and tap{' '}
                  <Plus className="mx-1 inline h-4 w-4 align-text-bottom text-brand-blue" />{' '}
                  <span className="font-semibold">Add to Home Screen</span>.
                </Step>
              </ol>
            ) : (
              <ol className="mt-5 space-y-3 text-sm text-slate-700">
                <Step n={1}>
                  Tap the{' '}
                  <MoreVertical className="mx-1 inline h-4 w-4 align-text-bottom text-brand-blue" />{' '}
                  <span className="font-semibold">menu</span> in the top-right of Chrome.
                </Step>
                <Step n={2}>
                  Tap <span className="font-semibold">Install app</span> (or{' '}
                  <span className="font-semibold">Add to Home screen</span>).
                </Step>
              </ol>
            )}

            <button
              type="button"
              onClick={() => setHintOpen(false)}
              className="mt-5 w-full rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function Step({ n, children }) {
  return (
    <li className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
        {n}
      </span>
      <span>{children}</span>
    </li>
  )
}

export default InstallPrompt
