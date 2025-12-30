'use client'

/**
 * Exercise 2: Theme Toggle (Client Component)
 * 
 * This component demonstrates:
 * - 'use client' directive
 * - useState hook (only works in Client Components)
 * - Event handlers (onClick)
 * - Browser APIs
 */

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  // This runs in the BROWSER only
  useEffect(() => {
    console.log('ThemeToggle useEffect - runs in BROWSER')
    
    // Check initial theme from localStorage
    const savedTheme = localStorage.getItem('dashboard-theme')
    if (savedTheme === 'dark') {
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    localStorage.setItem('dashboard-theme', !isDark ? 'dark' : 'light')
  }

  return (
    <div className="space-y-4">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
          isDark
            ? 'bg-slate-800 text-white hover:bg-slate-700'
            : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500'
        }`}
      >
        {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>

      {/* Client Component Info */}
      <div className={`rounded-lg p-4 border ${
        isDark 
          ? 'bg-slate-800 text-white border-slate-700' 
          : 'bg-white border-gray-200'
      }`}>
        <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
          🔌 <strong>Client Component</strong>
        </p>
        <ul className={`text-xs mt-2 space-y-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          <li>• Uses useState hook</li>
          <li>• Has onClick handler</li>
          <li>• Accesses localStorage</li>
          <li>• JavaScript runs in browser</li>
        </ul>
      </div>

      {/* Preview Panel */}
      <div className={`rounded-lg p-6 transition-all ${
        isDark 
          ? 'bg-slate-900 text-white' 
          : 'bg-slate-100 text-slate-900'
      }`}>
        <h4 className="font-semibold mb-2">Preview Panel</h4>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          This panel changes based on the theme toggle above.
          The state is managed by React on the client side.
        </p>
      </div>
    </div>
  )
}
