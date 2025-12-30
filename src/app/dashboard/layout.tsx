/**
 * Exercise 2: Dashboard Layout (Server Component)
 * 
 * This layout demonstrates:
 * - Static sidebar navigation (Server Component)
 * - Shared UI across dashboard routes
 * - App Router layout pattern
 */

import Link from 'next/link'

// This is a SERVER COMPONENT (default in App Router)
// No 'use client' directive = runs on server only

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This console.log runs on SERVER only
  console.log('DashboardLayout rendered on SERVER')

  const navItems = [
    { href: '/dashboard', label: '🏠 Overview', active: true },
    { href: '/dashboard/analytics', label: '📊 Analytics', active: false },
    { href: '/dashboard/settings', label: '⚙️ Settings', active: false },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Static Sidebar - Server Component */}
      <aside className="w-64 bg-slate-800 text-white p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <p className="text-sm text-slate-400 mt-1">Exercise 2: App Router</p>
        </div>

        {/* Info Badge */}
        <div className="bg-slate-700 rounded-lg p-3 mb-6">
          <p className="text-xs text-slate-300">
            🖥️ <strong>Server Component</strong>
            <br />
            This sidebar is rendered on the server
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-lg transition ${
                item.active
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-700 text-slate-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Server Component Badge */}
        <div className="mt-auto pt-8">
          <div className="bg-green-900/50 border border-green-700 rounded-lg p-3">
            <p className="text-xs text-green-400">
              ✓ No JavaScript sent to client
              <br />
              ✓ Direct database access possible
              <br />
              ✓ Server secrets safe
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-100">
        {children}
      </main>
    </div>
  )
}
