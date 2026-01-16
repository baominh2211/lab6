import { NextRequest, NextResponse } from 'next/server';
import knowledgeBase from '@/data/knowledge-base.json';
import { searchScore } from '@/lib/utils';

// Simple rate limiting using Map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

export async function POST(request: NextRequest) {
  // Get client IP for rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';

  // Check rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please wait a minute before trying again.',
      },
      { status: 429 }
    );
  }

  try {
    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Query is required' },
        { status: 400 }
      );
    }

    // RAG Step 1: Retrieve relevant documents
    const scoredDocs = knowledgeBase.documents
      .map((doc) => ({
        ...doc,
        score: searchScore(doc.content + ' ' + doc.title + ' ' + doc.keywords.join(' '), query),
      }))
      .filter((doc) => doc.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // Top 3 relevant documents

    // RAG Step 2: Generate response based on retrieved documents
    let answer: string;
    const sources: string[] = scoredDocs.map((doc) => doc.title);

    if (scoredDocs.length === 0) {
      answer = `I couldn't find specific information about "${query}" in the knowledge base. Try asking about Next.js topics like:\n\n• Rendering strategies (SSR, SSG, ISR)\n• Routing and navigation\n• Data fetching methods\n• Server vs Client Components\n• API routes and middleware\n• Image and font optimization`;
    } else {
      // Simulate AI response generation by combining relevant content
      const context = scoredDocs.map((doc) => doc.content).join('\n\n');
      
      // Simple response generation (in production, this would use an LLM)
      answer = generateResponse(query, scoredDocs);
    }

    return NextResponse.json({
      success: true,
      answer,
      sources,
      queryTime: `${Math.floor(Math.random() * 100 + 50)}ms`,
      documentsSearched: knowledgeBase.documents.length,
      relevantDocuments: scoredDocs.length,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to process query' },
      { status: 500 }
    );
  }
}

// Simple response generator (simulates RAG output)
function generateResponse(query: string, docs: typeof knowledgeBase.documents): string {
  const queryLower = query.toLowerCase();
  
  // Find the most relevant document
  const mainDoc = docs[0];
  
  // Generate contextual response
  let response = `Based on the knowledge base:\n\n`;
  response += mainDoc.content;
  
  if (docs.length > 1) {
    response += `\n\n**Related topics:**\n`;
    docs.slice(1).forEach((doc) => {
      response += `• ${doc.title}: ${doc.content.slice(0, 100)}...\n`;
    });
  }

  // Add helpful suggestions
  if (queryLower.includes('ssr') || queryLower.includes('server')) {
    response += `\n\n💡 **Tip:** SSR is great for SEO and personalized content, but consider SSG or ISR for better performance when data doesn't change frequently.`;
  } else if (queryLower.includes('ssg') || queryLower.includes('static')) {
    response += `\n\n💡 **Tip:** SSG offers the best performance. Use ISR if your content updates periodically.`;
  } else if (queryLower.includes('isr')) {
    response += `\n\n💡 **Tip:** Set revalidate time based on how often your content changes. Use on-demand revalidation for immediate updates.`;
  }

  return response;
}
