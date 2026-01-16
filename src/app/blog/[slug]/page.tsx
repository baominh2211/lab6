import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { BlogPost } from '@/types';
import blogData from '@/data/blog-posts.json';
import { formatDate } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static paths at build time (equivalent to getStaticPaths)
export async function generateStaticParams() {
  const posts: BlogPost[] = blogData.posts;
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts: BlogPost[] = blogData.posts;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// Enable ISR with revalidation every 60 seconds
export const revalidate = 60;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const posts: BlogPost[] = blogData.posts;
  const post = posts.find((p) => p.slug === slug);

  // If post not found, show 404
  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  return (
    <article className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 flex items-center gap-1 w-fit">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--color-text-secondary)] mb-8 pb-8 border-b border-[var(--color-border)]">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
          <button className="flex items-center gap-2 hover:text-[var(--color-accent-primary)] transition-colors ml-auto">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              className="text-[var(--color-text-secondary)] leading-relaxed mb-6"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* ISR Info Box */}
        <div className="mt-12 p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <h4 className="font-semibold mb-2 text-[var(--color-accent-secondary)]">
            🔄 ISR (Incremental Static Regeneration)
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
            This page uses ISR with <code className="text-[var(--color-accent-primary)]">revalidate: 60</code>. 
            The page is statically generated at build time but will be regenerated in the background 
            after 60 seconds if there&apos;s a request.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Generated at: {new Date().toLocaleString()}
          </p>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-[var(--color-bg-card)] rounded-xl p-4 border border-[var(--color-border)] hover:border-[var(--color-accent-primary)]/50 transition-all"
                >
                  <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-semibold line-clamp-2 group-hover:text-[var(--color-accent-primary)] transition-colors">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-[var(--color-text-muted)] mt-2">
                    {relatedPost.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
