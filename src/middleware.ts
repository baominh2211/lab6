import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiting (for demo - use Redis in production)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

function getRateLimitResult(ip: string) {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 10

  const current = rateLimit.get(ip)
  
  if (!current || now > current.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (current.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  current.count++
  return { allowed: true, remaining: maxRequests - current.count }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Exercise 3: Protect /api/secret endpoint
  if (pathname === '/api/secret') {
    const apiKey = request.headers.get('x-api-key')
    const secretKey = process.env.API_SECRET_KEY

    if (!apiKey || apiKey !== secretKey) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid API Key' },
        { status: 401 }
      )
    }
  }

  // Rate limiting for AI API route
  if (pathname === '/api/chat') {
    const ip = request.headers.get('x-forwarded-for') || 'anonymous'
    const result = getRateLimitResult(ip)

    if (!result.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString())
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*']
}
