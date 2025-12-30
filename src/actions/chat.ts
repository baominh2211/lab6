'use server';

import { docArticles, docSections, searchDocs } from '@/data/docs';
import { DocSource } from '@/types';

// Simple in-memory rate limiting
const rateLimits = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const limit = rateLimits.get(identifier);
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10');
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000');

  if (!limit || now > limit.resetTime) {
    rateLimits.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (limit.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  limit.count++;
  return { allowed: true, remaining: maxRequests - limit.count };
}

// RAG: Find relevant documentation chunks
export async function findRelevantDocs(query: string): Promise<DocSource[]> {
  const results = searchDocs(query);
  
  return results.slice(0, 5).map((article) => {
    const section = docSections.find((s) => s.id === article.sectionId);
    const excerpt = article.content.slice(0, 300).replace(/[#*`]/g, '');
    
    return {
      articleId: article.id,
      articleTitle: article.title,
      sectionTitle: section?.title || '',
      excerpt: excerpt + '...',
      relevanceScore: 0.85,
    };
  });
}

// Build context from relevant docs
export async function buildRAGContext(query: string): Promise<string> {
  const sources = await findRelevantDocs(query);
  
  if (sources.length === 0) {
    return '';
  }

  let context = 'Dựa trên tài liệu Next.js:\n\n';
  
  for (const source of sources) {
    const article = docArticles.find((a) => a.id === source.articleId);
    if (article) {
      context += `## ${article.title}\n`;
      context += `${article.content.slice(0, 800)}\n\n`;
    }
  }

  return context;
}

// Chat action - this is a simplified version
// In production, you would integrate with OpenAI API
export async function chat(
  message: string,
  sessionId: string
): Promise<{
  response: string;
  sources: DocSource[];
  rateLimitRemaining: number;
}> {
  // Check rate limit
  const rateLimit = checkRateLimit(sessionId);
  if (!rateLimit.allowed) {
    return {
      response: 'Bạn đã gửi quá nhiều tin nhắn. Vui lòng đợi một phút.',
      sources: [],
      rateLimitRemaining: 0,
    };
  }

  // Find relevant docs for RAG
  const sources = await findRelevantDocs(message);
  const context = await buildRAGContext(message);

  // Generate response
  // In production, this would call OpenAI API with the context
  let response = '';
  
  if (sources.length > 0) {
    response = generateResponse(message, sources, context);
  } else {
    response = `Xin lỗi, tôi không tìm thấy thông tin liên quan đến "${message}" trong tài liệu. Bạn có thể thử:
    
- Hỏi về các chủ đề: Routing, Rendering, Data Fetching, Optimization, API Routes
- Sử dụng từ khóa cụ thể hơn
- Duyệt qua sidebar để xem các chủ đề có sẵn`;
  }

  return {
    response,
    sources,
    rateLimitRemaining: rateLimit.remaining,
  };
}

// Generate response based on context
function generateResponse(query: string, sources: DocSource[], context: string): string {
  const lowerQuery = query.toLowerCase();
  
  // Simple keyword-based response generation
  // In production, this would be replaced with AI model
  
  if (lowerQuery.includes('routing') || lowerQuery.includes('route')) {
    return `## Routing trong Next.js

Next.js sử dụng hệ thống **file-based routing**. Cấu trúc thư mục trực tiếp ánh xạ đến URL paths.

### App Router (Recommended)
\`\`\`
app/
├── page.tsx           → /
├── about/page.tsx     → /about
├── blog/[slug]/page.tsx → /blog/:slug
\`\`\`

### Special Files
- \`page.tsx\`: Định nghĩa UI cho route
- \`layout.tsx\`: Shared wrapper
- \`loading.tsx\`: Loading state
- \`error.tsx\`: Error boundary

Bạn có thể xem chi tiết tại mục **Routing** trong sidebar.`;
  }

  if (lowerQuery.includes('ssr') || lowerQuery.includes('server-side')) {
    return `## Server-Side Rendering (SSR)

SSR trong Next.js render HTML đầy đủ trên **mỗi request**.

### App Router
\`\`\`tsx
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // Force SSR
  });
  return res.json();
}
\`\`\`

### Pages Router
\`\`\`tsx
export async function getServerSideProps(context) {
  const data = await fetchData();
  return { props: { data } };
}
\`\`\`

**Ưu điểm**: SEO tốt, content hiển thị ngay
**Nhược điểm**: TTFB chậm hơn, server load cao`;
  }

  if (lowerQuery.includes('ssg') || lowerQuery.includes('static')) {
    return `## Static Site Generation (SSG)

SSG generate HTML tại **build time** - nhanh nhất có thể!

### App Router
\`\`\`tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
\`\`\`

### Pages Router
\`\`\`tsx
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}
\`\`\`

**Best for**: Blog, documentation, marketing pages`;
  }

  if (lowerQuery.includes('isr')) {
    return `## Incremental Static Regeneration (ISR)

ISR kết hợp SSG với khả năng update sau deployment:

\`\`\`tsx
// App Router
fetch('https://api.example.com/data', {
  next: { revalidate: 60 } // Revalidate mỗi 60 giây
});

// Pages Router
export async function getStaticProps() {
  return {
    props: { data },
    revalidate: 60,
  };
}
\`\`\`

### On-demand Revalidation
\`\`\`tsx
import { revalidateTag, revalidatePath } from 'next/cache';

revalidateTag('posts');
revalidatePath('/blog');
\`\`\``;
  }

  if (lowerQuery.includes('image') || lowerQuery.includes('hình ảnh')) {
    return `## Image Optimization

\`next/image\` component tự động tối ưu hóa hình ảnh:

\`\`\`tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={400}
  priority // Preload for LCP
/>
\`\`\`

### Benefits
- Auto WebP/AVIF conversion
- Lazy loading by default
- Prevents layout shift
- Responsive srcset

### Fill Mode
\`\`\`tsx
<div className="relative h-64">
  <Image src="/bg.jpg" alt="" fill className="object-cover" />
</div>
\`\`\``;
  }

  if (lowerQuery.includes('api') || lowerQuery.includes('backend')) {
    return `## API Routes

### App Router (Route Handlers)
\`\`\`tsx
// app/api/posts/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const post = await createPost(body);
  return NextResponse.json(post, { status: 201 });
}
\`\`\`

### Pages Router
\`\`\`tsx
// pages/api/posts.ts
export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.json(posts);
  }
}
\`\`\``;
  }

  if (lowerQuery.includes('server component') || lowerQuery.includes('client component')) {
    return `## Server vs Client Components

### Server Components (Default)
- Render on server only
- Can access database directly
- Zero JavaScript to client

\`\`\`tsx
// Server Component
export default async function Page() {
  const data = await db.query('SELECT * FROM posts');
  return <div>{data.map(...)}</div>;
}
\`\`\`

### Client Components
- Use \`'use client'\` directive
- Can use hooks & event handlers

\`\`\`tsx
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\`

**Rule**: Keep interactivity at the leaves!`;
  }

  // Default response with sources
  const topSource = sources[0];
  return `Tôi đã tìm thấy thông tin liên quan trong tài liệu **${topSource.sectionTitle}** > **${topSource.articleTitle}**:

${topSource.excerpt}

Bạn có thể xem chi tiết trong mục tương ứng ở sidebar hoặc hỏi cụ thể hơn về:
- SSR, SSG, ISR
- Routing và Navigation
- API Routes
- Image/Font Optimization
- Server/Client Components`;
}

// Feedback action
export async function submitFeedback(
  messageId: string,
  helpful: boolean,
  comment?: string
): Promise<{ success: boolean }> {
  // In production, this would save to database
  console.log('Feedback received:', { messageId, helpful, comment });
  return { success: true };
}
