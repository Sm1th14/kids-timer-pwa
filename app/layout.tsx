import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import RegisterSW from "../components/RegisterSW"
import PwaInstaller from "../components/PwaInstaller"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kids Timer PWA",
  description: "A child-friendly timer app with analog clock interface",
  manifest: "/kids-timer-pwa/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kids Timer",
    startupImage: [
      {
        url: "/kids-timer-pwa/icon-512.png",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  generator: "v0.dev",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#111827",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-gray-900">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/kids-timer-pwa/manifest.json" />

        {/* iOS-specific Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Kids Timer" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* iOS Icons */}
        <link rel="apple-touch-icon" href="/kids-timer-pwa/icon-180.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/kids-timer-pwa/icon-180.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/kids-timer-pwa/icon-192.png" />

        {/* Prevent zoom on input focus */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={inter.className + " text-white"}>
         {/* Registriere den SW und zeige den Install-Button */}
      <RegisterSW />        <PwaInstaller />
        <div className="pt-[env(safe-area-inset-top)]">{children}</div>
      </body>
    </html>
  )
}
