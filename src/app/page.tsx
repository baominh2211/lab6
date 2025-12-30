import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  const exercises = [
    {
      title: 'Exercise 1: Dynamic Blog (Pages Router + SSG)',
      description: 'Blog system using getStaticProps và getStaticPaths với fallback behavior',
      href: '/blog',
      color: 'bg-blue-500',
    },
    {
      title: 'Exercise 2: Dashboard (App Router + Hybrid)',
      description: 'Server Components + Client Components với dark/light mode toggle',
      href: '/dashboard',
      color: 'bg-green-500',
    },
    {
      title: 'Exercise 3: API Route & Middleware',
      description: 'Protected API endpoint với x-api-key header và rate limiting',
      href: '/api-test',
      color: 'bg-purple-500',
    },
    {
      title: 'Exercise 4: Image & Font Optimization',
      description: 'next/image với lazy loading và next/font self-hosted',
      href: '/optimization',
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Lab 6: Advanced Next.js
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            Module 6: Advanced Next.js Framework Architecture and Application
          </p>
          <p className="text-lg text-blue-400">
            By Hoang Bao Minh | MSc. Tran Vinh Khiem
          </p>
          
          <div className="mt-8 flex justify-center gap-4">
            <Link 
              href="/knowledge-base"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
            >
              🤖 AI Knowledge Base (Capstone)
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition"
            >
              📚 View Exercises
            </Link>
          </div>
        </div>
      </section>

      {/* Rendering Strategies Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Rendering Strategies</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'CSR', desc: 'Client-Side Rendering', use: 'Dashboards', color: 'border-red-500' },
              { name: 'SSR', desc: 'Server-Side Rendering', use: 'Personalized Data', color: 'border-blue-500' },
              { name: 'SSG', desc: 'Static Site Generation', use: 'Blogs, Docs', color: 'border-green-500' },
              { name: 'ISR', desc: 'Incremental Static Regen', use: 'E-commerce, News', color: 'border-purple-500' },
            ].map((strategy) => (
              <div key={strategy.name} className={`p-6 bg-white rounded-xl shadow-lg border-t-4 ${strategy.color}`}>
                <h3 className="text-2xl font-bold mb-2">{strategy.name}</h3>
                <p className="text-gray-600 mb-2">{strategy.desc}</p>
                <p className="text-sm text-gray-500">Best for: {strategy.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Exercises */}
      <section className="py-16 px-4 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Student Exercises</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {exercises.map((exercise, index) => (
              <Link 
                key={index} 
                href={exercise.href}
                className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition group"
              >
                <div className={`w-12 h-12 ${exercise.color} rounded-lg flex items-center justify-center text-white font-bold mb-4`}>
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">
                  {exercise.title}
                </h3>
                <p className="text-gray-600">{exercise.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Capstone Project */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">🚀 Capstone Project: AI-Powered Knowledge Base</h2>
            <p className="text-lg mb-6">
              Documentation site với AI chatbot sử dụng RAG (Retrieval-Augmented Generation), 
              Streaming UI, Server Actions, và Edge Middleware.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-bold">RAG System</h4>
                <p className="text-sm">Vector database for smart retrieval</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-bold">Streaming UI</h4>
                <p className="text-sm">Real-time AI responses</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-bold">Server Actions</h4>
                <p className="text-sm">Direct server mutations</p>
              </div>
            </div>
            <Link
              href="/knowledge-base"
              className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-slate-100 transition"
            >
              Try AI Knowledge Base →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
