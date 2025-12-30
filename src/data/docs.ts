import { DocSection, DocArticle } from '@/types';

export const docSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Bắt đầu',
    slug: 'getting-started',
    description: 'Hướng dẫn cài đặt và cấu hình Next.js',
    icon: 'rocket',
    order: 1,
  },
  {
    id: 'routing',
    title: 'Routing',
    slug: 'routing',
    description: 'Hệ thống routing file-based trong Next.js',
    icon: 'route',
    order: 2,
  },
  {
    id: 'rendering',
    title: 'Rendering',
    slug: 'rendering',
    description: 'Các chiến lược rendering: SSR, SSG, ISR, CSR',
    icon: 'layers',
    order: 3,
  },
  {
    id: 'data-fetching',
    title: 'Data Fetching',
    slug: 'data-fetching',
    description: 'Phương pháp fetch dữ liệu trong Next.js',
    icon: 'database',
    order: 4,
  },
  {
    id: 'optimization',
    title: 'Optimization',
    slug: 'optimization',
    description: 'Tối ưu hóa hiệu suất ứng dụng',
    icon: 'zap',
    order: 5,
  },
  {
    id: 'api-routes',
    title: 'API Routes',
    slug: 'api-routes',
    description: 'Xây dựng backend API với Next.js',
    icon: 'server',
    order: 6,
  },
];

export const docArticles: DocArticle[] = [
  {
    id: 'intro-nextjs',
    sectionId: 'getting-started',
    title: 'Giới thiệu Next.js',
    slug: 'introduction',
    description: 'Tổng quan về Next.js và vai trò trong hệ sinh thái React',
    content: `# Giới thiệu Next.js

Next.js là một **framework React** toàn diện được phát triển bởi Vercel. Nó không chỉ đơn thuần là một thư viện mà là một nền tảng hoàn chỉnh cho việc xây dựng ứng dụng web production-ready.

## Tại sao chọn Next.js?

Trong khi React tập trung vào **view layer** - xây dựng giao diện người dùng thông qua component composition - Next.js cung cấp toàn bộ **infrastructure** cần thiết để triển khai ứng dụng có khả năng mở rộng:

- **Robust Routing System**: Hệ thống routing dựa trên file system
- **Build-time Optimizations**: Tối ưu hóa tự động trong quá trình build
- **API Handling**: Xây dựng backend API trong cùng dự án
- **Flexible Rendering**: Hỗ trợ SSR, SSG, ISR và CSR

## Paradigm Shift

Next.js thay đổi tư duy từ "**How** to render a component" sang "**Where** and **When** to render a component".

\`\`\`javascript
// Ví dụ: Quyết định rendering strategy
export async function getStaticProps({ params }) {
  // Render at BUILD TIME
  const post = await fetchPost(params.slug);
  return { props: { post } };
}

export async function getServerSideProps({ params }) {
  // Render on EVERY REQUEST
  const post = await fetchPost(params.slug);
  return { props: { post } };
}
\`\`\`

## Core Features

| Feature | Description |
|---------|-------------|
| File-based Routing | URL paths mapped to file structure |
| API Routes | Backend endpoints trong \`/api\` |
| Image Optimization | Automatic WebP conversion |
| Font Optimization | Zero layout shift fonts |
| Code Splitting | Automatic per-route bundles |`,
    tags: ['introduction', 'overview', 'react', 'framework'],
    readTime: 5,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-28',
    order: 1,
  },
  {
    id: 'installation',
    sectionId: 'getting-started',
    title: 'Cài đặt và Cấu hình',
    slug: 'installation',
    description: 'Hướng dẫn chi tiết cài đặt Next.js',
    content: `# Cài đặt và Cấu hình Next.js

## Yêu cầu hệ thống

- **Node.js** 18.17 trở lên
- macOS, Windows, hoặc Linux

## Tạo Project mới

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

Trình cài đặt sẽ hỏi các tùy chọn:

\`\`\`
Would you like to use TypeScript? Yes
Would you like to use ESLint? Yes
Would you like to use Tailwind CSS? Yes
Would you like to use App Router? Yes
\`\`\`

## Cấu trúc thư mục

\`\`\`
my-app/
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── public/
├── next.config.js
└── package.json
\`\`\`

## File cấu hình

\`\`\`javascript
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.example.com' },
    ],
  },
};
module.exports = nextConfig;
\`\`\`

## Chạy Development Server

\`\`\`bash
npm run dev
\`\`\``,
    tags: ['installation', 'setup', 'configuration'],
    readTime: 4,
    createdAt: '2024-01-16',
    updatedAt: '2024-12-28',
    order: 2,
  },
  {
    id: 'file-based-routing',
    sectionId: 'routing',
    title: 'File-based Routing',
    slug: 'file-based-routing',
    description: 'Hệ thống routing dựa trên file system',
    content: `# File-based Routing trong Next.js

Next.js sử dụng **filesystem làm API** cho routing.

## App Router Structure

\`\`\`
app/
├── page.tsx           → /
├── about/
│   └── page.tsx       → /about
├── blog/
│   ├── page.tsx       → /blog
│   └── [slug]/
│       └── page.tsx   → /blog/:slug
\`\`\`

## Special Files

| File | Purpose |
|------|---------|
| page.tsx | UI cho route |
| layout.tsx | Shared UI wrapper |
| loading.tsx | Loading UI |
| error.tsx | Error boundary |
| not-found.tsx | 404 UI |

## Dynamic Routes

\`\`\`tsx
// app/blog/[slug]/page.tsx
interface PageProps {
  params: { slug: string }
}

export default function BlogPost({ params }: PageProps) {
  return <h1>Post: {params.slug}</h1>;
}

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
\`\`\`

## Catch-all Routes

\`\`\`
app/docs/[...slug]/page.tsx  → /docs/a/b/c
app/shop/[[...slug]]/page.tsx → /shop (optional)
\`\`\`

## Route Groups

\`\`\`
app/
├── (marketing)/
│   └── about/page.tsx    → /about
├── (shop)/
│   └── products/page.tsx → /products
\`\`\``,
    tags: ['routing', 'file-system', 'dynamic-routes'],
    readTime: 6,
    createdAt: '2024-01-17',
    updatedAt: '2024-12-28',
    order: 1,
  },
  {
    id: 'navigation',
    sectionId: 'routing',
    title: 'Navigation và Linking',
    slug: 'navigation',
    description: 'Các phương pháp điều hướng trong Next.js',
    content: `# Navigation trong Next.js

## Link Component

\`\`\`tsx
import Link from 'next/link';

<Link href="/about">About Us</Link>
<Link href={\`/blog/\${post.slug}\`}>{post.title}</Link>
<Link href="/login" replace>Login</Link>
\`\`\`

### Prefetching

Khi Link enters viewport, Next.js **automatically prefetches** code và data.

## Programmatic Navigation

\`\`\`tsx
'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleClick = () => {
    router.push('/dashboard');
    router.replace('/login');
    router.back();
    router.refresh();
  };

  return <button onClick={handleClick}>Navigate</button>;
}
\`\`\`

## Active Link Styling

\`\`\`tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href}
      className={isActive ? 'text-blue-500' : 'text-gray-600'}
    >
      {children}
    </Link>
  );
}
\`\`\``,
    tags: ['navigation', 'link', 'router'],
    readTime: 5,
    createdAt: '2024-01-18',
    updatedAt: '2024-12-28',
    order: 2,
  },
  {
    id: 'rendering-strategies',
    sectionId: 'rendering',
    title: 'Chiến lược Rendering',
    slug: 'strategies',
    description: 'So sánh CSR, SSR, SSG và ISR',
    content: `# Chiến lược Rendering trong Next.js

## Client-Side Rendering (CSR)

Server gửi HTML shell, browser execute React và fetch data.

- TTFB: Fast ✅
- FCP: Slow ❌
- SEO: Poor ❌

## Server-Side Rendering (SSR)

Server render HTML đầy đủ cho mỗi request.

\`\`\`tsx
// App Router
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // Force SSR
  });
  return res.json();
}
\`\`\`

## Static Site Generation (SSG)

HTML generated at **build time**.

\`\`\`tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
\`\`\`

## Incremental Static Regeneration (ISR)

Update static pages after deployment.

\`\`\`tsx
fetch('https://api.example.com/data', {
  next: { revalidate: 60 } // Revalidate every 60s
});
\`\`\`

## Comparison

| Feature | CSR | SSR | SSG | ISR |
|---------|-----|-----|-----|-----|
| SEO | ❌ | ✅ | ✅ | ✅ |
| TTFB | ✅ | ❌ | ✅✅ | ✅ |
| Server Load | Low | High | None | Low |`,
    tags: ['rendering', 'ssr', 'ssg', 'isr', 'csr'],
    readTime: 8,
    createdAt: '2024-01-19',
    updatedAt: '2024-12-28',
    order: 1,
  },
  {
    id: 'server-client-components',
    sectionId: 'rendering',
    title: 'Server vs Client Components',
    slug: 'server-client-components',
    description: 'React Server Components trong App Router',
    content: `# Server Components vs Client Components

## Server Components (Default)

- Execute on server only
- Can access database directly
- Cannot use hooks or event listeners

\`\`\`tsx
// Server Component (default)
import { db } from '@/lib/db';

export default async function ProductsPage() {
  const products = await db.product.findMany();
  return <div>{products.map(p => <Card key={p.id} {...p} />)}</div>;
}
\`\`\`

## Client Components

\`\`\`tsx
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\`

## Composition Patterns

\`\`\`tsx
// Server Component
import ClientButton from './ClientButton';

export default async function Page() {
  const data = await fetchData();
  return (
    <div>
      <h1>{data.title}</h1>
      <ClientButton />
    </div>
  );
}
\`\`\`

## Decision Tree

- Need interactivity? → Client Component
- Need browser APIs? → Client Component
- Everything else → Server Component (default)`,
    tags: ['server-components', 'client-components', 'rsc'],
    readTime: 6,
    createdAt: '2024-01-20',
    updatedAt: '2024-12-28',
    order: 2,
  },
  {
    id: 'data-fetching-app-router',
    sectionId: 'data-fetching',
    title: 'Data Fetching với App Router',
    slug: 'app-router',
    description: 'Extended fetch API trong App Router',
    content: `# Data Fetching trong App Router

## Extended Fetch API

\`\`\`tsx
// Force dynamic (SSR)
fetch('https://api.example.com/data', { cache: 'no-store' });

// Static (cached)
fetch('https://api.example.com/data', { cache: 'force-cache' });

// ISR
fetch('https://api.example.com/data', { next: { revalidate: 3600 } });

// Tag-based
fetch('https://api.example.com/products', { next: { tags: ['products'] } });
\`\`\`

## Parallel Data Fetching

\`\`\`tsx
// ✅ Parallel (fast)
const [user, posts] = await Promise.all([
  getUser(),
  getPosts()
]);
\`\`\`

## On-Demand Revalidation

\`\`\`tsx
import { revalidateTag, revalidatePath } from 'next/cache';

export async function createPost() {
  await db.post.create({...});
  revalidateTag('posts');
  revalidatePath('/posts');
}
\`\`\`

## Server Actions

\`\`\`tsx
'use server';
export async function createPost(formData: FormData) {
  const title = formData.get('title');
  await db.post.create({ data: { title } });
  revalidatePath('/posts');
}
\`\`\``,
    tags: ['data-fetching', 'app-router', 'server-actions'],
    readTime: 7,
    createdAt: '2024-01-21',
    updatedAt: '2024-12-28',
    order: 1,
  },
  {
    id: 'data-fetching-pages-router',
    sectionId: 'data-fetching',
    title: 'Data Fetching với Pages Router',
    slug: 'pages-router',
    description: 'getStaticProps, getServerSideProps, getStaticPaths',
    content: `# Data Fetching trong Pages Router

## getStaticProps (SSG)

\`\`\`tsx
export async function getStaticProps() {
  const posts = await getPosts();
  return {
    props: { posts },
    revalidate: 60, // ISR
  };
}
\`\`\`

## getStaticPaths

\`\`\`tsx
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map((post) => ({ params: { id: post.id } })),
    fallback: false, // or 'blocking' or true
  };
}
\`\`\`

## getServerSideProps (SSR)

\`\`\`tsx
export async function getServerSideProps(context) {
  const { req, res, query } = context;
  const token = req.cookies.token;
  
  if (!token) {
    return { redirect: { destination: '/login', permanent: false } };
  }
  
  const user = await fetchUser(token);
  return { props: { user } };
}
\`\`\`

## Fallback Options

| Value | Behavior |
|-------|----------|
| false | Unknown paths → 404 |
| true | Show loading, then SSR |
| 'blocking' | Wait for SSR |`,
    tags: ['data-fetching', 'pages-router', 'getStaticProps'],
    readTime: 6,
    createdAt: '2024-01-22',
    updatedAt: '2024-12-28',
    order: 2,
  },
  {
    id: 'image-optimization',
    sectionId: 'optimization',
    title: 'Image Optimization',
    slug: 'images',
    description: 'Tối ưu hóa hình ảnh với next/image',
    content: `# Image Optimization với next/image

## Benefits

- Layout Shift Prevention
- Modern Formats (WebP/AVIF)
- Lazy Loading
- Responsive srcset

## Basic Usage

\`\`\`tsx
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="Profile"
  width={500}
  height={300}
  priority
/>
\`\`\`

## Remote Images

\`\`\`javascript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};
\`\`\`

## Fill Mode

\`\`\`tsx
<div className="relative h-64 w-full">
  <Image src="/hero.jpg" alt="Hero" fill className="object-cover" />
</div>
\`\`\`

## Props

| Prop | Type | Description |
|------|------|-------------|
| src | string | Image source |
| width/height | number | Dimensions |
| fill | boolean | Fill container |
| priority | boolean | Preload for LCP |
| quality | number | 1-100 |`,
    tags: ['optimization', 'images', 'performance'],
    readTime: 5,
    createdAt: '2024-01-23',
    updatedAt: '2024-12-28',
    order: 1,
  },
  {
    id: 'font-script-optimization',
    sectionId: 'optimization',
    title: 'Font & Script Optimization',
    slug: 'fonts-scripts',
    description: 'Tối ưu hóa fonts và scripts',
    content: `# Font & Script Optimization

## next/font

\`\`\`tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

### Benefits

- Self-hosted fonts
- No external requests
- Zero layout shift

## next/script

\`\`\`tsx
import Script from 'next/script';

// After page interactive
<Script src="https://analytics.com/script.js" strategy="afterInteractive" />

// Before hydration
<Script src="/critical.js" strategy="beforeInteractive" />

// When idle
<Script src="/chatbot.js" strategy="lazyOnload" />
\`\`\`

| Strategy | When | Use Case |
|----------|------|----------|
| beforeInteractive | Before hydration | Critical |
| afterInteractive | After hydration | Analytics |
| lazyOnload | Browser idle | Widgets |`,
    tags: ['optimization', 'fonts', 'scripts'],
    readTime: 4,
    createdAt: '2024-01-24',
    updatedAt: '2024-12-28',
    order: 2,
  },
  {
    id: 'api-routes-pages',
    sectionId: 'api-routes',
    title: 'API Routes (Pages Router)',
    slug: 'pages-api',
    description: 'API endpoints trong Pages Router',
    content: `# API Routes trong Pages Router

## Basic Handler

\`\`\`tsx
// pages/api/hello.ts
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello!' });
}
\`\`\`

## HTTP Methods

\`\`\`tsx
export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json(await getUsers());
    case 'POST':
      return res.status(201).json(await createUser(req.body));
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end();
  }
}
\`\`\`

## Dynamic Routes

\`\`\`tsx
// pages/api/posts/[id].ts
export default async function handler(req, res) {
  const { id } = req.query;
  const post = await getPost(id);
  
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(post);
}
\`\`\`

## Request Helpers

\`\`\`tsx
const { page } = req.query;
const { name } = req.body;
const token = req.cookies.auth_token;
const auth = req.headers.authorization;
\`\`\``,
    tags: ['api', 'backend', 'pages-router'],
    readTime: 5,
    createdAt: '2024-01-25',
    updatedAt: '2024-12-28',
    order: 1,
  },
  {
    id: 'route-handlers-app',
    sectionId: 'api-routes',
    title: 'Route Handlers (App Router)',
    slug: 'app-api',
    description: 'API endpoints trong App Router',
    content: `# Route Handlers trong App Router

## Basic Handler

\`\`\`tsx
// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello!' });
}
\`\`\`

## Named Exports

\`\`\`tsx
// app/api/posts/route.ts
export async function GET(request: NextRequest) {
  return NextResponse.json(await getPosts());
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(await createPost(body), { status: 201 });
}
\`\`\`

## Dynamic Routes

\`\`\`tsx
// app/api/posts/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await getPost(params.id);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}
\`\`\`

## Request Utilities

\`\`\`tsx
const { searchParams } = new URL(request.url);
const page = searchParams.get('page');
const auth = request.headers.get('authorization');
const token = request.cookies.get('token')?.value;
const data = await request.json();
\`\`\``,
    tags: ['api', 'route-handlers', 'app-router'],
    readTime: 5,
    createdAt: '2024-01-26',
    updatedAt: '2024-12-28',
    order: 2,
  },
];

// Helper functions
export function getDocSection(slug: string): DocSection | undefined {
  return docSections.find((s) => s.slug === slug);
}

export function getDocArticle(sectionSlug: string, articleSlug: string): DocArticle | undefined {
  const section = getDocSection(sectionSlug);
  if (!section) return undefined;
  return docArticles.find((a) => a.sectionId === section.id && a.slug === articleSlug);
}

export function getArticlesBySection(sectionId: string): DocArticle[] {
  return docArticles.filter((a) => a.sectionId === sectionId).sort((a, b) => a.order - b.order);
}

export function searchDocs(query: string): DocArticle[] {
  const lowerQuery = query.toLowerCase();
  return docArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.description.toLowerCase().includes(lowerQuery) ||
      a.content.toLowerCase().includes(lowerQuery) ||
      a.tags.some((t) => t.toLowerCase().includes(lowerQuery))
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  docArticles.forEach((a) => a.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
