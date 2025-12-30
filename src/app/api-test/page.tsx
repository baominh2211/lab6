'use client'

/**
 * Exercise 3: API Route & Middleware Test Page
 * 
 * This page demonstrates:
 * - Testing protected API endpoints
 * - Middleware authentication
 * - API key header handling
 */

import { useState } from 'react'

export default function ApiTestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')

  const testApi = async (withKey: boolean) => {
    setLoading(true)
    setResult(null)

    try {
      const headers: HeadersInit = {}
      if (withKey && apiKey) {
        headers['x-api-key'] = apiKey
      }

      const res = await fetch('/api/secret', { headers })
      const data = await res.json()
      
      setResult({
        status: res.status,
        statusText: res.status === 200 ? 'OK' : 'Unauthorized',
        data,
      })
    } catch (error) {
      setResult({ error: 'Failed to fetch' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
            Exercise 3: API Route & Middleware
          </span>
          <h1 className="text-3xl font-bold mb-2">🔐 Protected API Test</h1>
          <p className="text-gray-600">
            Test the protected <code className="bg-gray-200 px-2 py-1 rounded">/api/secret</code> endpoint
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8">
          <h3 className="font-bold text-purple-800 mb-2">🔑 How it works:</h3>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Middleware checks for <code className="bg-purple-200 px-1">x-api-key</code> header</li>
            <li>• Valid key: <code className="bg-purple-200 px-1">my-secret-key-12345</code></li>
            <li>• Without key → 401 Unauthorized</li>
            <li>• With valid key → 200 OK + secret data</li>
          </ul>
        </div>

        {/* API Key Input */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="font-bold mb-4">Enter API Key:</h3>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="my-secret-key-12345"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <p className="text-sm text-gray-500 mt-2">
            Hint: The correct key is <code className="bg-gray-100 px-1">my-secret-key-12345</code>
          </p>
        </div>

        {/* Test Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => testApi(false)}
            disabled={loading}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition"
          >
            ❌ Test WITHOUT API Key
          </button>
          <button
            onClick={() => testApi(true)}
            disabled={loading || !apiKey}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition"
          >
            ✅ Test WITH API Key
          </button>
        </div>

        {/* Result */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Testing API...</p>
          </div>
        )}

        {result && (
          <div className={`rounded-xl shadow-lg p-6 ${
            result.status === 200 ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-2xl ${result.status === 200 ? '✅' : '❌'}`}>
                {result.status === 200 ? '✅' : '❌'}
              </span>
              <div>
                <p className="font-bold">
                  Status: {result.status} {result.statusText}
                </p>
              </div>
            </div>
            <pre className="bg-slate-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        )}

        {/* Middleware Code */}
        <div className="mt-8 bg-slate-900 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-4">📝 middleware.ts Code:</h3>
          <pre className="text-sm overflow-x-auto text-green-300">
{`// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/api/secret') {
    const apiKey = request.headers.get('x-api-key')
    const secretKey = process.env.API_SECRET_KEY

    if (!apiKey || apiKey !== secretKey) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid API Key' },
        { status: 401 }
      )
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*']
}`}
          </pre>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <a href="/" className="text-purple-600 hover:underline">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
