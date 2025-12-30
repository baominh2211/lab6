/**
 * Capstone: AI Chat API Route Handler
 * 
 * This demonstrates:
 * - Route Handlers (App Router)
 * - Streaming responses
 * - RAG (Retrieval-Augmented Generation) pattern
 * - Rate limiting via middleware
 */

import { NextRequest, NextResponse } from 'next/server'

// Simple knowledge base for RAG
const knowledgeBase = [
  {
    topic: 'SSR',
    content: 'Server-Side Rendering (SSR) renders HTML on every request. Use getServerSideProps in Pages Router or cache: no-store in App Router. Best for personalized data.',
  },
  {
    topic: 'SSG',
    content: 'Static Site Generation generates HTML at build time. Use getStaticProps and getStaticPaths. Best for blogs, docs, and marketing pages.',
  },
  {
    topic: 'ISR', 
    content: 'Incremental Static Regeneration updates static pages after deployment. Use revalidate option. Combines SSG speed with dynamic updates.',
  },
  {
    topic: 'Server Components',
    content: 'Server Components render on server only, no JavaScript sent to client. Can access database directly. Default in App Router.',
  },
  {
    topic: 'Client Components',
    content: 'Client Components use "use client" directive. Can use hooks (useState, useEffect) and event handlers. Required for interactivity.',
  },
  {
    topic: 'Server Actions',
    content: 'Server Actions allow calling server functions from Client Components. Use "use server" directive. Great for form submissions.',
  },
  {
    topic: 'Middleware',
    content: 'Middleware runs before every request. Use for authentication, rate limiting, redirects. Runs on Edge Runtime.',
  },
  {
    topic: 'next/image',
    content: 'next/image component auto-optimizes images. Converts to WebP/AVIF, lazy loads, prevents layout shift. Use for all images.',
  },
  {
    topic: 'next/font',
    content: 'next/font self-hosts Google Fonts. Eliminates external requests, prevents FOUT (Flash of Unstyled Text).',
  },
  {
    topic: 'App Router',
    content: 'App Router (app/ directory) is the modern Next.js routing. Uses Server Components by default, supports layouts, loading states, and parallel routes.',
  },
]

// Simple RAG: Find relevant knowledge
function retrieveContext(query: string): string {
  const lowerQuery = query.toLowerCase()
  const relevant = knowledgeBase.filter(
    (item) => 
      lowerQuery.includes(item.topic.toLowerCase()) ||
      item.content.toLowerCase().includes(lowerQuery.split(' ').filter(w => w.length > 3)[0] || '')
  )
  
  if (relevant.length === 0) {
    return 'No specific documentation found. Here is general Next.js info: Next.js is a React framework for production with SSR, SSG, and API routes.'
  }
  
  return relevant.map((r) => `[${r.topic}]: ${r.content}`).join('\n\n')
}

// Generate AI-like response
function generateResponse(query: string, context: string): string {
  const responses: Record<string, string> = {
    ssr: `## Server-Side Rendering (SSR)

SSR renders HTML on **every request** on the server.

### Pages Router:
\`\`\`javascript
export async function getServerSideProps(context) {
  const data = await fetchData()
  return { props: { data } }
}
\`\`\`

### App Router:
\`\`\`javascript
// Use cache: 'no-store' to force SSR
const data = await fetch(url, { cache: 'no-store' })
\`\`\`

**Best for:** Personalized content, real-time data`,

    ssg: `## Static Site Generation (SSG)

SSG generates HTML at **build time** - fastest possible performance!

### Implementation:
\`\`\`javascript
export async function getStaticProps() {
  const data = await fetchData()
  return { props: { data } }
}

export async function getStaticPaths() {
  return { paths: [...], fallback: false }
}
\`\`\`

**Best for:** Blogs, documentation, marketing pages`,

    isr: `## Incremental Static Regeneration (ISR)

ISR combines static generation with dynamic updates.

### Usage:
\`\`\`javascript
export async function getStaticProps() {
  return {
    props: { data },
    revalidate: 60, // Regenerate every 60 seconds
  }
}
\`\`\`

**How it works:**
1. First request → Serve cached page
2. After revalidate period → Trigger background regeneration
3. Next request → Serve new page`,

    'server component': `## React Server Components

Server Components are the **default** in App Router.

### Features:
- Run on server only
- No JavaScript sent to client
- Can access database directly
- Cannot use hooks or event handlers

\`\`\`javascript
// This is a Server Component (no 'use client')
export default async function Page() {
  const data = await db.query('SELECT * FROM posts')
  return <div>{data.map(...)}</div>
}
\`\`\``,

    'client component': `## Client Components

Use \`'use client'\` directive for interactive components.

\`\`\`javascript
'use client'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
\`\`\`

**Use when:** You need hooks, event handlers, or browser APIs`,
  }

  const lowerQuery = query.toLowerCase()
  
  for (const [key, response] of Object.entries(responses)) {
    if (lowerQuery.includes(key)) {
      return response
    }
  }

  return `## Next.js Knowledge Base

Based on your question about "${query}", here's what I found:

${context}

### Quick Tips:
- Use **SSG** for static content (blogs, docs)
- Use **SSR** for personalized/real-time data  
- Use **ISR** for frequently updated content
- Use **Server Components** to reduce client JS

Would you like me to explain any of these topics in more detail?`
}

// POST handler for chat
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // RAG: Retrieve relevant context
    const context = retrieveContext(message)
    
    // Generate response
    const response = generateResponse(message, context)

    // Simulate streaming delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      response,
      sources: knowledgeBase
        .filter((k) => context.includes(k.topic))
        .map((k) => k.topic),
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET handler for health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'AI Chat API is running',
    topics: knowledgeBase.map((k) => k.topic),
  })
}
