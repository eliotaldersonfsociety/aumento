// app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { FloatingIconsBackground } from '@/components/FloatingIconsBackground'
import { I18nProvider } from '@/components/I18nProvider'
import { DynamicHtml } from '@/components/DynamicHtml'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Aumento de Seguidores',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <DynamicHtml>
      <body className="font-sans antialiased">
        {/* ✅ Fondo animado en todo el sitio */}
        <FloatingIconsBackground />
        <I18nProvider>
          {children}
        </I18nProvider>
        <Analytics />
      </body>
    </DynamicHtml>
  )
}