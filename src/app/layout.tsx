import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

// Exercise 4: Font Optimization - Self-hosted Google Fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Metadata API (App Router)
export const metadata: Metadata = {
  title: {
    default: 'Lab 6 Next.js - Hoang Bao Minh',
    template: '%s | Lab 6 Next.js'
  },
  description: 'AI-Powered Knowledge Base - Advanced Next.js Module by Hoang Bao Minh',
  keywords: ['Next.js', 'React', 'SSR', 'SSG', 'ISR', 'Hoang Bao Minh'],
  authors: [{ name: 'Hoang Bao Minh' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}>
        {/* Navigation */}
        <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <a href="/" className="text-xl font-bold">
              🚀 Lab 6 - Hoang Bao Minh
            </a>
            <div className="flex gap-6">
              <a href="/" className="hover:text-blue-400 transition">Home</a>
              <a href="/blog" className="hover:text-blue-400 transition">Blog (SSG)</a>
              <a href="/dashboard" className="hover:text-blue-400 transition">Dashboard</a>
              <a href="/knowledge-base" className="hover:text-blue-400 transition">AI Knowledge Base</a>
            </div>
          </div>
        </nav>
        
        <main>
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white p-6 mt-auto">
          <div className="max-w-6xl mx-auto text-center">
            <p>© 2024 Lab 6 Next.js - Hoang Bao Minh</p>
            <p className="text-sm text-slate-400 mt-2">
              Advanced Next.js Framework Architecture - MSc. Tran Vinh Khiem
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
