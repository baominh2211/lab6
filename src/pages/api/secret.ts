/**
 * Exercise 3: Protected API Route
 * 
 * This API route demonstrates:
 * - API Routes in Pages Router
 * - Protected endpoint with x-api-key header
 * - Middleware integration
 */

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  secret?: string
  error?: string
  message?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Only allow GET method
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  // Note: The actual API key check is handled by middleware.ts
  // If request reaches here, it means the API key is valid
  
  res.status(200).json({ 
    secret: 'Next.js is cool! 🚀',
    message: 'You have successfully accessed the protected API!'
  })
}
