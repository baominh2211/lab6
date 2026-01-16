import { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import { BlogPost } from '@/types';
import blogData from '@/data/blog-posts.json';
import { BookOpen, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Explore our collection of Next.js tutorials and guides built with Static Site Generation (SSG).',
};

// This page demonstrates Static Site Generation (SSG)
// Data is fetched at build time and the page is pre-rendered
export default function BlogPage() {
  const posts: BlogPost[] = blogData.posts;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-primary)]/10 border border-[var(--color-accent-primary)]/30 mb-6">
            <Sparkles className="w-4 h-4 text-[var(--color-accent-primary)]" />
            <span className="text-sm font-medium text-[var(--color-accent-primary)]">
              Exercise 1: Static Site Generation
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Dynamic <span className="gradient-text">Blog</span> System
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
            This blog demonstrates file-based routing with dynamic routes, SSG using 
            getStaticProps/getStaticPaths patterns, and ISR for content updates.
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'generateStaticParams',
              'Dynamic Routes [slug]',
              'SSG at Build Time',
              'ISR Revalidation',
              'next/image Optimization',
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)] mb-12">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[var(--color-accent-primary)]/10">
              <BookOpen className="w-6 h-6 text-[var(--color-accent-primary)]" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">How This Works</h3>
              <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                <li>• Pages are pre-rendered at <code className="text-[var(--color-accent-secondary)]">build time</code> using SSG</li>
                <li>• Dynamic routes use <code className="text-[var(--color-accent-secondary)]">generateStaticParams</code> to define paths</li>
                <li>• Content is fetched from <code className="text-[var(--color-accent-secondary)]">src/data/blog-posts.json</code></li>
                <li>• ISR with <code className="text-[var(--color-accent-secondary)]">revalidate: 60</code> refreshes content every minute</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Fallback Demo Note */}
        <div className="mt-12 p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <h4 className="font-semibold mb-2 text-[var(--color-accent-secondary)]">
            💡 Challenge: Test Fallback Behavior
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Add a new post to <code>blog-posts.json</code> with a new slug, then navigate 
            to <code>/blog/[new-slug]</code> without rebuilding. The fallback page will 
            render while the content generates in the background!
          </p>
        </div>
      </div>
    </div>
  );
}
