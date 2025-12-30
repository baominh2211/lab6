/**
 * Exercise 1: Dynamic Blog Post Page
 * 
 * This page demonstrates:
 * - getStaticPaths for dynamic route generation
 * - getStaticProps for individual post data
 * - fallback behavior (true, false, 'blocking')
 */

import Link from 'next/link'
import { useRouter } from 'next/router'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import posts from '@/data/data.json'

type Post = {
  id: string
  title: string
  content: string
  author: string
  date: string
}

// getStaticPaths - Define which paths to pre-render at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all 5 posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  console.log('getStaticPaths - Generated paths:', paths)

  return {
    paths,
    // fallback: false → 404 for unknown paths
    // fallback: true → Show loading, then SSR
    // fallback: 'blocking' → Wait for SSR (no loading state)
    fallback: true, // Try adding new item to data.json and access its URL
  }
}

// getStaticProps - Fetch data for each post
export const getStaticProps: GetStaticProps<{ post: Post }> = async ({ params }) => {
  const id = params?.id as string
  const post = posts.find((p) => p.id === id)

  // If post not found, return 404
  if (!post) {
    return {
      notFound: true,
    }
  }

  // Simulate slow data fetching (for fallback demo)
  // await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    props: {
      post: post as Post,
    },
    revalidate: 60, // ISR
  }
}

export default function BlogPost({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  // Show loading state when fallback: true and page is being generated
  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Generating page...</p>
          <p className="text-sm text-gray-500 mt-2">
            (fallback: true - First request triggers SSR)
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to Blog
          </Link>
        </nav>

        {/* Post Content */}
        <article className="bg-white rounded-xl shadow-lg p-8">
          <header className="mb-6 pb-6 border-b">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mb-4">
              SSG with getStaticPaths
            </span>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-500">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
          </header>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {post.content}
            </p>
          </div>
        </article>

        {/* Technical Info */}
        <div className="mt-8 bg-slate-900 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-4">🔧 Technical Details:</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Route:</span>
              <code className="text-green-400">/blog/[id]</code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Rendering:</span>
              <span className="text-blue-400">Static (SSG)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Fallback:</span>
              <span className="text-yellow-400">true (show loading)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Revalidate:</span>
              <span className="text-purple-400">60 seconds (ISR)</span>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-8 bg-slate-800 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-4">📝 Code:</h3>
          <pre className="text-sm overflow-x-auto text-green-300">
{`// pages/blog/[id].tsx
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPosts()
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))
  
  return {
    paths,
    fallback: true, // or false, 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await fetchPost(params.id)
  
  if (!post) {
    return { notFound: true }
  }
  
  return {
    props: { post },
    revalidate: 60,
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}
