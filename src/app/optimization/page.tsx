'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Image as ImageIcon,
  Type,
  Zap,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Eye,
  Gauge,
} from 'lucide-react';

export default function OptimizationPage() {
  const [showOptimized, setShowOptimized] = useState(true);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-purple)]/10 border border-[var(--color-accent-purple)]/30 mb-6">
            <Sparkles className="w-4 h-4 text-[var(--color-accent-purple)]" />
            <span className="text-sm font-medium text-[var(--color-accent-purple)]">
              Exercise 4: Optimization
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Image & Font <span className="gradient-text">Optimization</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Improve Core Web Vitals with next/image and next/font. See the difference between
            optimized and unoptimized assets in real-time.
          </p>
        </div>

        {/* Core Web Vitals Info */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--color-bg-card)] rounded-xl p-4 border border-[var(--color-border)]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[var(--color-accent-primary)]/10">
                <Gauge className="w-5 h-5 text-[var(--color-accent-primary)]" />
              </div>
              <span className="text-lg font-bold text-[var(--color-accent-primary)]">LCP</span>
            </div>
            <p className="font-medium">Largest Contentful Paint</p>
            <p className="text-sm text-[var(--color-text-secondary)]">Loading performance</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[var(--color-bg-card)] rounded-xl p-4 border border-[var(--color-border)]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[var(--color-accent-secondary)]/10">
                <Zap className="w-5 h-5 text-[var(--color-accent-secondary)]" />
              </div>
              <span className="text-lg font-bold text-[var(--color-accent-secondary)]">FID</span>
            </div>
            <p className="font-medium">First Input Delay</p>
            <p className="text-sm text-[var(--color-text-secondary)]">Interactivity</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--color-bg-card)] rounded-xl p-4 border border-[var(--color-border)]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[var(--color-accent-purple)]/10">
                <Eye className="w-5 h-5 text-[var(--color-accent-purple)]" />
              </div>
              <span className="text-lg font-bold text-[var(--color-accent-purple)]">CLS</span>
            </div>
            <p className="font-medium">Cumulative Layout Shift</p>
            <p className="text-sm text-[var(--color-text-secondary)]">Visual stability</p>
          </motion.div>
        </div>

        {/* Image Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)] mb-8"
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[var(--color-accent-purple)]/10">
                <ImageIcon className="w-6 h-6 text-[var(--color-accent-purple)]" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Image Optimization</h2>
                <p className="text-sm text-[var(--color-text-secondary)]">Compare optimized vs standard images</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowOptimized(true)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showOptimized
                    ? 'bg-[var(--color-accent-primary)] text-[var(--color-bg-primary)]'
                    : 'bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)]'
                }`}
              >
                next/image
              </button>
              <button
                onClick={() => setShowOptimized(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  !showOptimized
                    ? 'bg-[var(--color-accent-tertiary)] text-white'
                    : 'bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)]'
                }`}
              >
                Standard img
              </button>
            </div>
          </div>

          {/* Image Display */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Optimized with next/image */}
            <div className={`rounded-xl overflow-hidden border-2 transition-all ${
              showOptimized ? 'border-[var(--color-accent-primary)]' : 'border-transparent'
            }`}>
              <div className="relative h-64">
                <Image
                  src="https://picsum.photos/seed/nextjs-demo/800/400"
                  alt="Optimized with next/image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4 bg-[var(--color-bg-tertiary)]">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-[var(--color-accent-primary)]" />
                  <span className="font-medium">next/image Component</span>
                </div>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>✓ Automatic WebP/AVIF conversion</li>
                  <li>✓ Lazy loading by default</li>
                  <li>✓ Blur placeholder prevents CLS</li>
                  <li>✓ Responsive sizes attribute</li>
                </ul>
              </div>
            </div>

            {/* Standard img tag */}
            <div className={`rounded-xl overflow-hidden border-2 transition-all ${
              !showOptimized ? 'border-[var(--color-accent-tertiary)]' : 'border-transparent'
            }`}>
              <div className="relative h-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://picsum.photos/seed/nextjs-demo/800/400"
                  alt="Standard img tag"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-[var(--color-bg-tertiary)]">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-[var(--color-accent-tertiary)]" />
                  <span className="font-medium">Standard &lt;img&gt; Tag</span>
                </div>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>✗ No format optimization</li>
                  <li>✗ No lazy loading</li>
                  <li>✗ Causes layout shift (CLS)</li>
                  <li>✗ Full image downloaded</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Font Optimization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)] mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-[var(--color-accent-secondary)]/10">
              <Type className="w-6 h-6 text-[var(--color-accent-secondary)]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Font Optimization</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">Using next/font for zero layout shift</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Space Grotesk */}
            <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)]">
              <p className="text-xs text-[var(--color-text-muted)] mb-2">Display Font</p>
              <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                Space Grotesk
              </p>
              <p className="text-sm mt-2" style={{ fontFamily: 'var(--font-display)' }}>
                The quick brown fox jumps over the lazy dog
              </p>
              <code className="text-xs text-[var(--color-accent-secondary)] mt-2 block">
                --font-display
              </code>
            </div>

            {/* Inter */}
            <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)]">
              <p className="text-xs text-[var(--color-text-muted)] mb-2">Body Font</p>
              <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-body)' }}>
                Inter
              </p>
              <p className="text-sm mt-2" style={{ fontFamily: 'var(--font-body)' }}>
                The quick brown fox jumps over the lazy dog
              </p>
              <code className="text-xs text-[var(--color-accent-secondary)] mt-2 block">
                --font-body
              </code>
            </div>

            {/* JetBrains Mono */}
            <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)]">
              <p className="text-xs text-[var(--color-text-muted)] mb-2">Mono Font</p>
              <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
                JetBrains Mono
              </p>
              <p className="text-sm mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
                const code = &apos;beautiful&apos;;
              </p>
              <code className="text-xs text-[var(--color-accent-secondary)] mt-2 block">
                --font-mono
              </code>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[var(--color-accent-primary)]/10 border border-[var(--color-accent-primary)]/30">
            <h4 className="font-semibold mb-2 text-[var(--color-accent-primary)]">
              ✓ Zero Layout Shift
            </h4>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Fonts are downloaded at build time and self-hosted. CSS <code>size-adjust</code> ensures 
              the fallback font matches the web font metrics, preventing any text reflow when fonts load.
            </p>
          </div>
        </motion.div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)]"
        >
          <h3 className="font-semibold mb-4">Implementation Code</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-[var(--color-text-muted)] mb-2">next/image usage:</p>
              <pre className="bg-[var(--color-bg-tertiary)] rounded-xl p-4 overflow-x-auto text-sm">
                <code>{`import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={400}
  placeholder="blur"
  priority // for above-fold
/>`}</code>
              </pre>
            </div>
            <div>
              <p className="text-sm text-[var(--color-text-muted)] mb-2">next/font usage:</p>
              <pre className="bg-[var(--color-bg-tertiary)] rounded-xl p-4 overflow-x-auto text-sm">
                <code>{`import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

// In layout.tsx
<html className={inter.variable}>`}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
