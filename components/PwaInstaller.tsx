'use client'
import { useEffect, useState } from 'react'

export default function PwaInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const installApp = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    console.log('User choice:', choice)
    setDeferredPrompt(null)
  }

  // Falls du einen Button in der UI haben willst:
  if (!deferredPrompt) return null
  return (
    <button
      onClick={installApp}
      className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
    >
      App installieren
    </button>
  )
}
