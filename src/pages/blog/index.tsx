/**
 * Exercise 1: Dynamic Blog System (Pages Router + SSG)
 * 
 * This page demonstrates:
 * - getStaticProps for Static Site Generation
 * - Fetching data at build time
 * - SEO-friendly static HTML generation
 */

import Link from 'next/link'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import posts from '@/data/data.json'

type Post = {
  id: string
  title: string
  content: string
  author: string
  date: string
}

// getStaticProps - Runs at BUILD TIME (SSG)
export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  // In real app, fetch from API or database
  // Code here runs on server only - never shipped to client
  
  console.log('getStaticProps running at build time!') // Check terminal
  
  return {
    props: {
      posts: posts as Post[],
    },
    // ISR: Revalidate every 60 seconds
    revalidate: 60,
  }
}

export default function BlogIndex({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Exercise 1: Pages Router + SSG
          </span>
          <h1 className="text-4xl font-bold mb-4">📚 Blog với Static Site Generation</h1>
          <p className="text-gray-600">
            Sử dụng <code className="bg-gray-200 px-2 py-1 rounded">getStaticProps</code> và{' '}
            <code className="bg-gray-200 px-2 py-1 rounded">getStaticPaths</code>
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-bold text-blue-800 mb-2">💡 How it works:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>getStaticProps</strong>: Fetch data at build time → Static HTML</li>
            <li>• <strong>revalidate: 60</strong>: ISR - Regenerate page every 60 seconds</li>
            <li>• <strong>SEO Optimal</strong>: Full HTML sent to crawlers</li>
          </ul>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.id}`}
              className="block bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition">
                  {post.title}
                </h2>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <p className="text-gray-600 line-clamp-2">{post.content}</p>
              <p className="text-sm text-gray-500 mt-3">By {post.author}</p>
            </Link>
          ))}
        </div>

        {/* Code Example */}
        <div className="mt-12 bg-slate-900 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-4">📝 Code Example:</h3>
          <pre className="text-sm overflow-x-auto">
{`// pages/blog/index.tsx
export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetchPosts() // Runs at build time
  
  return {
    props: { posts },
    revalidate: 60, // ISR: Regenerate every 60s
  }
}`}
          </pre>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
