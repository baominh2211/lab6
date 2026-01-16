'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen,
  LayoutDashboard,
  Lock,
  Image,
  Brain,
  ArrowRight,
  Sparkles,
  Zap,
  Server,
  Database,
  Code2,
  Layers,
} from 'lucide-react';

const exercises = [
  {
    id: 1,
    title: 'Dynamic Blog System',
    description: 'Routing & Static Site Generation (SSG) with getStaticProps and getStaticPaths',
    icon: BookOpen,
    href: '/blog',
    color: 'primary',
    features: ['File-based routing', 'Dynamic routes [slug]', 'SSG with fallback', 'ISR revalidation'],
  },
  {
    id: 2,
    title: 'Hybrid Dashboard',
    description: 'App Router with Server Components and Client Components mixed architecture',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'secondary',
    features: ['Server Components', 'Client Components', 'useState hooks', 'Real-time data'],
  },
  {
    id: 3,
    title: 'API & Middleware',
    description: 'Secure API endpoints with custom middleware authentication',
    icon: Lock,
    href: '/api-demo',
    color: 'tertiary',
    features: ['Route Handlers', 'Middleware', 'API authentication', 'Rate limiting'],
  },
  {
    id: 4,
    title: 'Image & Font Optimization',
    description: 'Core Web Vitals optimization with next/image and next/font',
    icon: Image,
    href: '/optimization',
    color: 'purple',
    features: ['next/image', 'next/font', 'Lazy loading', 'WebP conversion'],
  },
];

const features = [
  { icon: Server, label: 'SSR', desc: 'Server-Side Rendering' },
  { icon: Database, label: 'SSG', desc: 'Static Site Generation' },
  { icon: Zap, label: 'ISR', desc: 'Incremental Regeneration' },
  { icon: Code2, label: 'RSC', desc: 'React Server Components' },
  { icon: Layers, label: 'App Router', desc: 'Modern Routing System' },
  { icon: Lock, label: 'Middleware', desc: 'Edge Functions' },
];

const colorMap = {
  primary: {
    bg: 'from-[var(--color-accent-primary)]/20 to-[var(--color-accent-primary)]/5',
    border: 'hover:border-[var(--color-accent-primary)]/50',
    icon: 'text-[var(--color-accent-primary)]',
    iconBg: 'bg-[var(--color-accent-primary)]/10',
  },
  secondary: {
    bg: 'from-[var(--color-accent-secondary)]/20 to-[var(--color-accent-secondary)]/5',
    border: 'hover:border-[var(--color-accent-secondary)]/50',
    icon: 'text-[var(--color-accent-secondary)]',
    iconBg: 'bg-[var(--color-accent-secondary)]/10',
  },
  tertiary: {
    bg: 'from-[var(--color-accent-tertiary)]/20 to-[var(--color-accent-tertiary)]/5',
    border: 'hover:border-[var(--color-accent-tertiary)]/50',
    icon: 'text-[var(--color-accent-tertiary)]',
    iconBg: 'bg-[var(--color-accent-tertiary)]/10',
  },
  purple: {
    bg: 'from-[var(--color-accent-purple)]/20 to-[var(--color-accent-purple)]/5',
    border: 'hover:border-[var(--color-accent-purple)]/50',
    icon: 'text-[var(--color-accent-purple)]',
    iconBg: 'bg-[var(--color-accent-purple)]/10',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent-primary)]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-accent-secondary)]/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] mb-8"
            >
              <Sparkles className="w-4 h-4 text-[var(--color-accent-primary)]" />
              <span className="text-sm font-medium">Module 6 - MSc. Tran Vinh Khiem</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Master{' '}
              <span className="gradient-text animate-gradient bg-gradient-to-r from-[var(--color-accent-primary)] via-[var(--color-accent-secondary)] to-[var(--color-accent-purple)]">
                Next.js 15
              </span>
              <br />
              Framework Architecture
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
              A comprehensive hands-on demonstration covering SSR, SSG, ISR, App Router, 
              Server Components, API Routes, Middleware, and AI-powered features.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-[var(--color-bg-primary)] font-semibold hover:shadow-[var(--shadow-glow)] transition-all"
                >
                  Start Exercises
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/knowledge-base"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] font-semibold hover:border-[var(--color-accent-secondary)] transition-all"
                >
                  <Brain className="w-5 h-5" />
                  AI Knowledge Base
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mt-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-accent-primary)]/50 transition-all cursor-default"
              >
                <feature.icon className="w-4 h-4 text-[var(--color-accent-primary)]" />
                <span className="text-sm font-medium">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Exercises Section */}
      <section className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              4 Hands-on <span className="gradient-text">Exercises</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Each exercise reinforces core Next.js concepts from basic routing to advanced optimization.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {exercises.map((exercise, index) => {
              const colors = colorMap[exercise.color as keyof typeof colorMap];
              return (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={exercise.href}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className={`h-full p-6 rounded-2xl bg-gradient-to-br ${colors.bg} border border-[var(--color-border)] ${colors.border} transition-all group`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-xl ${colors.iconBg}`}>
                          <exercise.icon className={`w-6 h-6 ${colors.icon}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-[var(--color-text-muted)]">
                              Exercise {exercise.id}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors">
                            {exercise.title}
                          </h3>
                          <p className="text-[var(--color-text-secondary)] text-sm">
                            {exercise.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exercise.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1 text-xs rounded-full bg-[var(--color-bg-primary)]/50 text-[var(--color-text-secondary)]"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Project Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-accent-primary)]/20 via-[var(--color-accent-secondary)]/10 to-[var(--color-accent-purple)]/20 border border-[var(--color-border)] p-8 md:p-12"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-primary)]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-accent-purple)]/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)] text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Small Project
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  AI-Powered <span className="gradient-text">Knowledge Base</span>
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-6 max-w-xl">
                  A complete documentation site with AI-powered search. Uses RAG (Retrieval-Augmented Generation), 
                  streaming UI for real-time responses, Server Actions, and hybrid rendering for optimal SEO.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {['RAG Search', 'Streaming UI', 'Server Actions', 'Hybrid Rendering', 'Rate Limiting'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-[var(--color-bg-primary)]/50 border border-[var(--color-border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/knowledge-base"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent-purple)] text-white font-semibold hover:shadow-[var(--shadow-glow-blue)] transition-all"
                  >
                    <Brain className="w-5 h-5" />
                    Explore Knowledge Base
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
              <div className="flex-shrink-0">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-48 h-48 rounded-3xl bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center shadow-2xl"
                >
                  <Brain className="w-24 h-24 text-[var(--color-bg-primary)]" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rendering Strategies Table */}
      <section className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Rendering <span className="gradient-text">Strategies</span> Comparison
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Understanding when to use each strategy is key to building performant applications.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] bg-[var(--color-bg-card)] rounded-2xl overflow-hidden border border-[var(--color-border)]">
              <thead>
                <tr className="bg-[var(--color-bg-tertiary)]">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold text-[var(--color-accent-tertiary)]">CSR</th>
                  <th className="px-6 py-4 text-center font-semibold text-[var(--color-accent-secondary)]">SSR</th>
                  <th className="px-6 py-4 text-center font-semibold text-[var(--color-accent-primary)]">SSG</th>
                  <th className="px-6 py-4 text-center font-semibold text-[var(--color-accent-purple)]">ISR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {[
                  ['Render Timing', 'Browser', 'Server (Request)', 'Build Time', 'Build + Background'],
                  ['SEO Quality', '❌ Low', '✅ High', '✅ High', '✅ High'],
                  ['Server Load', '✅ Minimal', '❌ High', '✅ None', '✅ Low'],
                  ['Data Freshness', '✅ Real-time', '✅ Real-time', '❌ Stale', '⚡ Configurable'],
                  ['Best For', 'Dashboards', 'Personalized', 'Blogs, Docs', 'E-commerce'],
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[var(--color-bg-tertiary)]/50 transition-colors">
                    {row.map((cell, j) => (
                      <td key={j} className={`px-6 py-4 ${j === 0 ? 'font-medium' : 'text-center text-sm'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
