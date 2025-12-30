/**
 * Exercise 2: Dashboard Page (Server Component with async data fetching)
 * 
 * This page demonstrates:
 * - Server Component with async/await
 * - Direct data fetching without useEffect
 * - Embedding Client Component inside Server Component
 * - Simulated API delay with setTimeout
 */

import ThemeToggle from '@/components/ThemeToggle'

// Simulate fetching user profile from API
async function getUserProfile() {
  // Simulate network delay (2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000))
  
  return {
    name: 'Hoang Bao Minh',
    email: 'hoangbaominh@example.com',
    role: 'Full-Stack Developer',
    avatar: '👨‍💻',
    stats: {
      projects: 12,
      commits: 847,
      reviews: 156,
    }
  }
}

// This is an ASYNC Server Component
// No 'use client' = Server Component
export default async function DashboardPage() {
  // This runs on SERVER only - can access database directly
  console.log('DashboardPage rendered on SERVER')
  
  // Fetch data directly - no useEffect needed!
  const user = await getUserProfile()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
          Exercise 2: App Router - Server + Client Components
        </span>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Server Component với async data fetching + Client Component cho interactivity
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* User Profile - Server Component Data */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl">{user.avatar}</div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm text-blue-600">{user.role}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{user.stats.projects}</p>
              <p className="text-sm text-gray-500">Projects</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{user.stats.commits}</p>
              <p className="text-sm text-gray-500">Commits</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">{user.stats.reviews}</p>
              <p className="text-sm text-gray-500">Reviews</p>
            </div>
          </div>

          {/* Server Component Badge */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              🖥️ <strong>Server Component</strong> - Data fetched on server with 2s delay
            </p>
          </div>
        </div>

        {/* Settings Panel - Contains Client Component */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold mb-4">⚙️ Settings</h3>
          
          {/* Client Component embedded in Server Component */}
          <ThemeToggle />

          {/* Code Example */}
          <div className="mt-6 bg-slate-900 rounded-lg p-4 text-white">
            <p className="text-xs text-slate-400 mb-2">Composition Pattern:</p>
            <pre className="text-xs text-green-300 overflow-x-auto">
{`// page.tsx (Server Component)
import ThemeToggle from './ThemeToggle'

export default async function Page() {
  const data = await fetchData() // Server
  
  return (
    <div>
      <h1>{data.title}</h1>
      <ThemeToggle /> {/* Client */}
    </div>
  )
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="mt-8 bg-slate-800 rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-4">🏗️ Component Architecture</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-green-900/50 rounded-lg p-4">
            <p className="font-bold text-green-400">layout.tsx</p>
            <p className="text-sm text-green-300">Server Component</p>
            <p className="text-xs text-slate-400 mt-2">Static sidebar, no JS to client</p>
          </div>
          <div className="bg-blue-900/50 rounded-lg p-4">
            <p className="font-bold text-blue-400">page.tsx</p>
            <p className="text-sm text-blue-300">Server Component (async)</p>
            <p className="text-xs text-slate-400 mt-2">Fetches user data on server</p>
          </div>
          <div className="bg-purple-900/50 rounded-lg p-4">
            <p className="font-bold text-purple-400">ThemeToggle.tsx</p>
            <p className="text-sm text-purple-300">Client Component</p>
            <p className="text-xs text-slate-400 mt-2">useState, onClick, localStorage</p>
          </div>
        </div>
      </div>
    </div>
  )
}
