/**
 * Exercise 4: Image & Font Optimization
 * 
 * This page demonstrates:
 * - next/image component vs standard <img>
 * - Automatic image optimization
 * - Layout shift prevention
 * - next/font optimization (already in layout.tsx)
 */

import Image from 'next/image'

export default function OptimizationPage() {
  // Demo image URL (using placeholder since we can't add real images)
  const imageUrl = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800'
  
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
            Exercise 4: Image & Font Optimization
          </span>
          <h1 className="text-3xl font-bold mb-2">🖼️ Optimization Demo</h1>
          <p className="text-gray-600">
            So sánh <code className="bg-gray-200 px-2 py-1 rounded">&lt;img&gt;</code> vs{' '}
            <code className="bg-gray-200 px-2 py-1 rounded">next/image</code>
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Standard img tag */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-red-500 text-white">
              <h3 className="font-bold">❌ Standard &lt;img&gt; tag</h3>
            </div>
            <div className="p-4">
              <div className="bg-slate-200 rounded-lg overflow-hidden mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={imageUrl}
                  alt="Unoptimized"
                  className="w-full"
                />
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  No automatic optimization
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  Causes Layout Shift (CLS)
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  Full size download
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  No lazy loading by default
                </p>
              </div>
            </div>
          </div>

          {/* next/image */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-green-500 text-white">
              <h3 className="font-bold">✅ next/image Component</h3>
            </div>
            <div className="p-4">
              <div className="bg-slate-200 rounded-lg overflow-hidden mb-4 relative aspect-video">
                <Image
                  src={imageUrl}
                  alt="Optimized with next/image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  Auto WebP/AVIF conversion
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  Prevents Layout Shift
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  Responsive srcset
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  Lazy loading by default
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Font Optimization */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">🔤 Font Optimization (next/font)</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Benefits:</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  Self-hosted (no external requests)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  Zero layout shift (FOUT)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  Automatic CSS size-adjust
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  Preloaded at build time
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-100 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Font in use:</p>
              <p className="text-2xl font-sans">Geist Sans (Variable)</p>
              <p className="text-lg font-mono mt-2">Geist Mono (Code)</p>
              <p className="text-xs text-gray-500 mt-4">
                Check Network tab - no fonts.googleapis.com requests!
              </p>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Image Code */}
          <div className="bg-slate-900 rounded-xl p-6 text-white">
            <h3 className="font-bold mb-4">📝 next/image Usage:</h3>
            <pre className="text-sm overflow-x-auto text-green-300">
{`import Image from 'next/image'

// Fixed dimensions
<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={400}
  priority
/>

// Fill container
<div className="relative h-64">
  <Image
    src="/hero.jpg"
    alt="Hero"
    fill
    className="object-cover"
  />
</div>`}
            </pre>
          </div>

          {/* Font Code */}
          <div className="bg-slate-900 rounded-xl p-6 text-white">
            <h3 className="font-bold mb-4">📝 next/font Usage:</h3>
            <pre className="text-sm overflow-x-auto text-green-300">
{`// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export default function Layout({ children }) {
  return (
    <html>
      <body className={geistSans.variable}>
        {children}
      </body>
    </html>
  )
}`}
            </pre>
          </div>
        </div>

        {/* Core Web Vitals */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4">📊 Core Web Vitals Impact</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-2xl font-bold">LCP</p>
              <p className="text-sm">Largest Contentful Paint</p>
              <p className="text-xs mt-2 opacity-75">priority prop for above-fold images</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-2xl font-bold">CLS</p>
              <p className="text-sm">Cumulative Layout Shift</p>
              <p className="text-xs mt-2 opacity-75">Width/height prevents shift</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-2xl font-bold">FID</p>
              <p className="text-sm">First Input Delay</p>
              <p className="text-xs mt-2 opacity-75">Lazy loading reduces JS</p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <a href="/" className="text-orange-600 hover:underline">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
