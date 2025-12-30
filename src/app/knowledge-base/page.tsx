'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { sendMessage } from '../actions'

type Message = {
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
}

export default function KnowledgeBasePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isPending, startTransition] = useTransition()
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isPending) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])

    startTransition(async () => {
      setIsStreaming(true)
      try {
        const result = await sendMessage(userMessage)
        const words = result.response.split(' ')
        let currentContent = ''
        
        for (let i = 0; i < words.length; i++) {
          currentContent += (i > 0 ? ' ' : '') + words[i]
          setMessages((prev) => {
            const newMessages = [...prev]
            const lastMessage = newMessages[newMessages.length - 1]
            if (lastMessage?.role === 'assistant') {
              newMessages[newMessages.length - 1] = { ...lastMessage, content: currentContent, sources: result.sources }
            } else {
              newMessages.push({ role: 'assistant', content: currentContent, sources: result.sources })
            }
            return newMessages
          })
          await new Promise((r) => setTimeout(r, 30))
        }
      } catch {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Lỗi xảy ra. Vui lòng thử lại.' }])
      } finally {
        setIsStreaming(false)
      }
    })
  }

  const suggestions = ['SSR là gì?', 'So sánh SSG và ISR', 'Server Components hoạt động thế nào?', 'Khi nào dùng Client Components?']

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium mb-4">
            🚀 Capstone Project
          </span>
          <h1 className="text-4xl font-bold text-white mb-2">AI-Powered Knowledge Base</h1>
          <p className="text-slate-400">Hỏi đáp về Next.js với RAG + Streaming UI + Server Actions</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { icon: '🔍', label: 'RAG' },
            { icon: '⚡', label: 'Streaming' },
            { icon: '🖥️', label: 'Server Actions' },
            { icon: '🛡️', label: 'Rate Limit' },
          ].map((f, i) => (
            <div key={i} className="bg-slate-800 rounded-lg p-3 text-center">
              <span className="text-xl">{f.icon}</span>
              <p className="text-white text-sm mt-1">{f.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-xl shadow-xl overflow-hidden">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-5xl mb-4">🤖</p>
                <p className="text-slate-400 mb-6">Xin chào! Tôi có thể giúp gì về Next.js?</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestions.map((s, i) => (
                    <button key={i} onClick={() => setInput(s)} className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-600">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl px-4 py-3 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-100'}`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-600 text-xs text-slate-400">
                        Sources: {msg.sources.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {isStreaming && <div className="text-slate-400 text-sm">Đang trả lời...</div>}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi về Next.js..."
                className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={isPending}
              />
              <button type="submit" disabled={isPending || !input.trim()} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {isPending ? '...' : 'Gửi'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-slate-800 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">📝 Server Action Code:</h3>
          <pre className="text-sm text-green-400 overflow-x-auto">
{`// app/actions.ts
'use server'

export async function sendMessage(message: string) {
  const context = retrieveFromKnowledgeBase(message) // RAG
  const response = generateResponse(message, context)
  return { response, sources: [...] }
}

// Component sử dụng:
import { sendMessage } from './actions'
const result = await sendMessage(userInput)`}
          </pre>
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-blue-400 hover:underline">← Back to Home</a>
        </div>
      </div>
    </div>
  )
}
