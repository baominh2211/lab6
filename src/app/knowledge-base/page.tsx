import { Metadata } from 'next';
import knowledgeBase from '@/data/knowledge-base.json';
import { Brain, BookOpen, Search, Sparkles, Zap, Shield, Server } from 'lucide-react';
import AIChatWidget from '@/components/AIChatWidget';

export const metadata: Metadata = {
  title: 'AI Knowledge Base',
  description: 'AI-powered documentation site with RAG search and streaming responses.',
};

// Group documents by category (Server Component)
function groupByCategory(docs: typeof knowledgeBase.documents) {
  return docs.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, typeof knowledgeBase.documents>);
}

// Server Component for static documentation
export default function KnowledgeBasePage() {
  const groupedDocs = groupByCategory(knowledgeBase.documents);
  const categories = Object.keys(groupedDocs);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent-secondary)]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-accent-purple)]/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-purple)]/10 border border-[var(--color-accent-purple)]/30 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--color-accent-purple)]" />
              <span className="text-sm font-medium text-[var(--color-accent-purple)]">
                Small Project: AI-Powered Knowledge Base
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Next.js <span className="gradient-text">Documentation</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              A comprehensive documentation site with AI-powered search. Ask questions in natural language
              and get instant answers with source citations.
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { icon: Brain, label: 'RAG Search', desc: 'Retrieval-Augmented Generation' },
                { icon: Zap, label: 'Streaming UI', desc: 'Real-time responses' },
                { icon: Server, label: 'Server Actions', desc: 'Direct server calls' },
                { icon: Shield, label: 'Rate Limiting', desc: 'API protection' },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]"
                >
                  <feature.icon className="w-4 h-4 text-[var(--color-accent-secondary)]" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* Search Prompt */}
            <div className="p-4 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] inline-block">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-[var(--color-accent-primary)]" />
                <span className="text-[var(--color-text-secondary)]">
                  Click the chat bubble in the bottom right to ask AI anything!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-12 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Project Architecture</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                step: '1',
                title: 'User Query',
                desc: 'User asks a question through the AI chat widget',
                color: 'primary',
              },
              {
                step: '2',
                title: 'RAG Retrieval',
                desc: 'API searches knowledge base for relevant documents',
                color: 'secondary',
              },
              {
                step: '3',
                title: 'AI Generation',
                desc: 'Response generated based on retrieved context',
                color: 'purple',
              },
              {
                step: '4',
                title: 'Streaming UI',
                desc: 'Response streamed to user character by character',
                color: 'tertiary',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-[var(--color-bg-card)] rounded-xl p-4 border border-[var(--color-border)]"
              >
                <div className={`w-8 h-8 rounded-lg bg-[var(--color-accent-${item.color})]/20 flex items-center justify-center mb-3`}>
                  <span className={`text-sm font-bold text-[var(--color-accent-${item.color})]`}>
                    {item.step}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-[var(--color-accent-primary)]/10">
              <BookOpen className="w-6 h-6 text-[var(--color-accent-primary)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Documentation</h2>
              <p className="text-[var(--color-text-secondary)]">
                Static pages for SEO - Server Component rendered at build time
              </p>
            </div>
          </div>

          {/* Category Grid */}
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-4 text-[var(--color-accent-secondary)]">
                  {category}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedDocs[category].map((doc) => (
                    <article
                      key={doc.id}
                      className="bg-[var(--color-bg-card)] rounded-xl p-5 border border-[var(--color-border)] hover:border-[var(--color-accent-primary)]/50 transition-all group"
                    >
                      <h4 className="font-semibold mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors">
                        {doc.title}
                      </h4>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-3">
                        {doc.content}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {doc.keywords.slice(0, 3).map((keyword) => (
                          <span
                            key={keyword}
                            className="px-2 py-1 text-xs rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Details */}
      <section className="py-16 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Implementation Highlights</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Server Component */}
            <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)]">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-[var(--color-accent-secondary)]" />
                Server Component (This Page)
              </h3>
              <pre className="bg-[var(--color-bg-tertiary)] rounded-xl p-4 overflow-x-auto text-sm">
                <code>{`// Static documentation - Server Component
// Rendered at build time for optimal SEO

export default function KnowledgeBasePage() {
  // Direct data access - no fetch needed
  const docs = knowledgeBase.documents;
  
  return <DocsGrid docs={docs} />;
}`}</code>
              </pre>
            </div>

            {/* Client Component */}
            <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)]">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-[var(--color-accent-purple)]" />
                Client Component (AI Chat)
              </h3>
              <pre className="bg-[var(--color-bg-tertiary)] rounded-xl p-4 overflow-x-auto text-sm">
                <code>{`'use client';
// Interactive chat widget

const response = await fetch('/api/ai-search', {
  method: 'POST',
  body: JSON.stringify({ query })
});

// Typewriter effect for streaming feel
setInterval(() => {
  setContent(prev => prev + nextChar);
}, 15);`}</code>
              </pre>
            </div>

            {/* RAG API */}
            <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)]">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-[var(--color-accent-primary)]" />
                RAG Search API
              </h3>
              <pre className="bg-[var(--color-bg-tertiary)] rounded-xl p-4 overflow-x-auto text-sm">
                <code>{`// app/api/ai-search/route.ts

// 1. Score documents by relevance
const scored = docs.map(doc => ({
  ...doc,
  score: searchScore(doc.content, query)
}));

// 2. Get top 3 relevant docs
const context = scored
  .sort((a, b) => b.score - a.score)
  .slice(0, 3);

// 3. Generate response
return generateResponse(query, context);`}</code>
              </pre>
            </div>

            {/* Rate Limiting */}
            <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)]">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[var(--color-accent-tertiary)]" />
                Rate Limiting
              </h3>
              <pre className="bg-[var(--color-bg-tertiary)] rounded-xl p-4 overflow-x-auto text-sm">
                <code>{`// Prevent API abuse

const RATE_LIMIT = 10; // per minute
const rateLimitMap = new Map();

function isRateLimited(ip: string) {
  const record = rateLimitMap.get(ip);
  if (record?.count >= RATE_LIMIT) {
    return true; // 429 Too Many Requests
  }
  return false;
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat Widget - Client Component */}
      <AIChatWidget />
    </div>
  );
}
