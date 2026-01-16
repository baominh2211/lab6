'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  Unlock,
  Send,
  Copy,
  Check,
  AlertCircle,
  CheckCircle,
  Key,
  Shield,
  Server,
  Sparkles,
} from 'lucide-react';

interface ApiResponse {
  success: boolean;
  error?: string;
  message?: string;
  secret?: string;
  timestamp?: string;
  hint?: string;
  [key: string]: unknown;
}

export default function ApiDemoPage() {
  const [apiKey, setApiKey] = useState('');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');

  const correctKey = 'nextjs-is-awesome-2024';

  const testApi = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/secret', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        ...(method === 'POST' && {
          body: JSON.stringify({ test: 'data', timestamp: Date.now() }),
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({
        success: false,
        error: 'Network error',
        message: 'Failed to connect to API',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyKey = () => {
    navigator.clipboard.writeText(correctKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-tertiary)]/10 border border-[var(--color-accent-tertiary)]/30 mb-6">
            <Sparkles className="w-4 h-4 text-[var(--color-accent-tertiary)]" />
            <span className="text-sm font-medium text-[var(--color-accent-tertiary)]">
              Exercise 3: API & Middleware
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Secure <span className="gradient-text">API</span> Endpoint
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Test the protected API route that requires authentication via the x-api-key header.
            The middleware validates requests before they reach the route handler.
          </p>
        </div>

        {/* Architecture Info */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--color-bg-card)] rounded-xl p-4 border border-[var(--color-border)]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[var(--color-accent-tertiary)]/10">
                <Shield className="w-5 h-5 text-[var(--color-accent-tertiary)]" />
              </div>
              <h3 className="font-semibold">Middleware</h3>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Validates x-api-key header before request reaches the route handler.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[var(--color-bg-card)] rounded-xl p-4 border border-[var(--color-border)]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[var(--color-accent-secondary)]/10">
                <Server className="w-5 h-5 text-[var(--color-accent-secondary)]" />
              </div>
              <h3 className="font-semibold">Route Handler</h3>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              app/api/secret/route.ts handles GET and POST methods.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--color-bg-card)] rounded-xl p-4 border border-[var(--color-border)]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[var(--color-accent-primary)]/10">
                <Key className="w-5 h-5 text-[var(--color-accent-primary)]" />
              </div>
              <h3 className="font-semibold">Environment</h3>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              API key stored in .env.local (server-side only).
            </p>
          </motion.div>
        </div>

        {/* API Tester */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)]"
        >
          <h2 className="text-xl font-bold mb-6">API Tester</h2>

          {/* API Key Hint */}
          <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                  Valid API Key (for testing):
                </p>
                <code className="text-[var(--color-accent-primary)] font-mono">
                  {correctKey}
                </code>
              </div>
              <button
                onClick={copyKey}
                className="p-2 rounded-lg hover:bg-[var(--color-border)] transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-[var(--color-accent-primary)]" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Method Selector */}
          <div className="flex gap-2 mb-4">
            {(['GET', 'POST'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  method === m
                    ? 'bg-[var(--color-accent-tertiary)] text-white'
                    : 'bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* API Key Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              x-api-key Header
            </label>
            <div className="relative">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API key..."
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] focus:border-[var(--color-accent-tertiary)] focus:outline-none transition-colors pr-12"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {apiKey === correctKey ? (
                  <Unlock className="w-5 h-5 text-[var(--color-accent-primary)]" />
                ) : (
                  <Lock className="w-5 h-5 text-[var(--color-text-muted)]" />
                )}
              </div>
            </div>
          </div>

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={testApi}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--color-accent-tertiary)] to-[var(--color-accent-primary)] text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Test {method} /api/secret
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Response */}
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 rounded-2xl p-6 border ${
              response.success
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              {response.success ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-500" />
              )}
              <h3 className="font-semibold">
                {response.success ? 'Success!' : 'Error'}
              </h3>
            </div>
            <pre className="bg-[var(--color-bg-primary)] rounded-xl p-4 overflow-x-auto text-sm">
              <code>{JSON.stringify(response, null, 2)}</code>
            </pre>
          </motion.div>
        )}

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)]"
        >
          <h3 className="font-semibold mb-4">Middleware Code</h3>
          <pre className="bg-[var(--color-bg-tertiary)] rounded-xl p-4 overflow-x-auto text-sm">
            <code className="text-[var(--color-text-secondary)]">{`// middleware.ts
export function middleware(request: NextRequest) {
  if (pathname.startsWith('/api/secret')) {
    const apiKey = request.headers.get('x-api-key');
    
    if (apiKey !== process.env.API_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }
  return NextResponse.next();
}`}</code>
          </pre>
        </motion.div>
      </div>
    </div>
  );
}
