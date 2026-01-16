import { NextRequest, NextResponse } from 'next/server';

// GET /api/secret - Protected endpoint
export async function GET(request: NextRequest) {
  // Check for API key in header (validated by middleware)
  const apiKey = request.headers.get('x-api-key');
  
  // Double-check authentication (defense in depth)
  const validKey = process.env.API_SECRET_KEY || 'nextjs-is-awesome-2024';
  
  if (apiKey !== validKey) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Unauthorized',
        message: 'Invalid or missing API key' 
      },
      { status: 401 }
    );
  }

  // Return secret data
  return NextResponse.json({
    success: true,
    secret: 'Next.js is cool! 🚀',
    timestamp: new Date().toISOString(),
    metadata: {
      authenticatedVia: 'x-api-key header',
      validatedBy: 'Middleware + Route Handler',
    },
  });
}

// POST /api/secret - Create secret (also protected)
export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');
  const validKey = process.env.API_SECRET_KEY || 'nextjs-is-awesome-2024';
  
  if (apiKey !== validKey) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    
    return NextResponse.json({
      success: true,
      message: 'Secret created successfully',
      data: {
        ...body,
        createdAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }
}
