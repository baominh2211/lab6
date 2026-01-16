import Link from 'next/link';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">
              Next.js <span className="gradient-text">Complete Lab</span>
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-4 max-w-md">
              A comprehensive demonstration of Next.js 15 features including SSR, SSG, ISR, 
              App Router, Server Components, and more. Built for MSc. Tran Vinh Khiem&apos;s Module 6.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Exercises */}
          <div>
            <h4 className="font-semibold mb-4 text-[var(--color-text-primary)]">Exercises</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
                >
                  Ex1: Dynamic Blog (SSG)
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
                >
                  Ex2: Dashboard (Hybrid)
                </Link>
              </li>
              <li>
                <Link
                  href="/api-demo"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
                >
                  Ex3: API & Middleware
                </Link>
              </li>
              <li>
                <Link
                  href="/optimization"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
                >
                  Ex4: Optimization
                </Link>
              </li>
            </ul>
          </div>

          {/* Project */}
          <div>
            <h4 className="font-semibold mb-4 text-[var(--color-text-primary)]">Small Project</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/knowledge-base"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
                >
                  AI Knowledge Base
                </Link>
              </li>
              <li>
                <span className="text-[var(--color-text-muted)]">
                  RAG + Streaming UI
                </span>
              </li>
              <li>
                <span className="text-[var(--color-text-muted)]">
                  Server Actions
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[var(--color-text-secondary)] text-sm">
            © 2024 Next.js Complete Lab. All rights reserved.
          </p>
          <p className="text-[var(--color-text-secondary)] text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for Module 6
          </p>
        </div>
      </div>
    </footer>
  );
}
