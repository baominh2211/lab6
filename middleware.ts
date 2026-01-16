import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /api/secret endpoint
  if (pathname.startsWith('/api/secret')) {
    const apiKey = request.headers.get('x-api-key');
    const validKey = process.env.API_SECRET_KEY || 'nextjs-is-awesome-2024';

    // Check for valid API key
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          message: 'Missing x-api-key header',
          hint: 'Include the header: x-api-key: nextjs-is-awesome-2024',
        },
        { status: 401 }
      );
    }

    if (apiKey !== validKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          message: 'Invalid API key',
        },
        { status: 401 }
      );
    }

    // Valid key - allow request to proceed
    // Add custom header to indicate middleware validation
    const response = NextResponse.next();
    response.headers.set('x-middleware-validated', 'true');
    return response;
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all API routes
    '/api/:path*',
    // Exclude static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
