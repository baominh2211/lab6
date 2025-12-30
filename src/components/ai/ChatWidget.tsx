'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chat } from '@/actions/chat';
import { Button, Icon, X, Send, Sparkles, ThumbsUp, ThumbsDown, Loader2, Copy, Check } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ChatMessage, DocSource } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface AIChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIChatWidget({ isOpen, onClose }: AIChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => uuidv4());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat(input.trim(), sessionId);
      
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: result.response,
        timestamp: new Date(),
        sources: result.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    'SSR và SSG khác nhau thế nào?',
    'Cách sử dụng App Router?',
    'Tối ưu hóa hình ảnh trong Next.js',
    'Server Actions là gì?',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
          />

          {/* Chat Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed z-50',
              'bottom-4 right-4 w-[calc(100vw-2rem)] max-w-md',
              'lg:bottom-6 lg:right-6 lg:w-[420px]',
              'bg-white dark:bg-surface-900',
              'rounded-2xl shadow-2xl',
              'border border-surface-200 dark:border-surface-700',
              'flex flex-col',
              'max-h-[80vh] lg:max-h-[600px]'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 dark:text-white">
                    AI Assistant
                  </h3>
                  <p className="text-xs text-surface-500">
                    Hỏi đáp về Next.js
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              >
                <X size={20} className="text-surface-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center">
                    <Sparkles size={28} className="text-primary-500" />
                  </div>
                  <h4 className="font-semibold text-surface-900 dark:text-white mb-2">
                    Xin chào! 👋
                  </h4>
                  <p className="text-sm text-surface-500 mb-6">
                    Tôi có thể giúp bạn tìm hiểu về Next.js. Hãy đặt câu hỏi!
                  </p>
                  
                  {/* Suggested Questions */}
                  <div className="space-y-2">
                    <p className="text-xs text-surface-400 uppercase tracking-wider">
                      Gợi ý
                    </p>
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(question)}
                        className="w-full text-left px-3 py-2 rounded-lg bg-surface-100 dark:bg-surface-800 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))
              )}
              
              {isLoading && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-surface-100 dark:bg-surface-800">
                    <Loader2 size={18} className="animate-spin text-primary-500" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-surface-200 dark:border-surface-700">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Hỏi về Next.js..."
                  disabled={isLoading}
                  className={cn(
                    'flex-1 px-4 py-2.5 rounded-xl',
                    'bg-surface-100 dark:bg-surface-800',
                    'border border-surface-200 dark:border-surface-700',
                    'text-surface-900 dark:text-white placeholder:text-surface-400',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
                    'disabled:opacity-50',
                    'transition-all'
                  )}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="!p-2.5"
                >
                  <Send size={18} />
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Message Bubble Component
function MessageBubble({ message }: { message: ChatMessage }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      {/* Avatar */}
      <div
        className={cn(
          'w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center',
          isUser
            ? 'bg-surface-200 dark:bg-surface-700'
            : 'bg-gradient-to-br from-primary-500 to-accent-500'
        )}
      >
        {isUser ? (
          <Icon name="user" size={16} className="text-surface-600 dark:text-surface-300" />
        ) : (
          <Sparkles size={16} className="text-white" />
        )}
      </div>

      {/* Content */}
      <div className={cn('flex-1 max-w-[80%]', isUser && 'text-right')}>
        <div
          className={cn(
            'inline-block px-4 py-3 rounded-2xl text-sm',
            isUser
              ? 'bg-primary-500 text-white rounded-tr-md'
              : 'bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-surface-100 rounded-tl-md'
          )}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
            {message.content}
          </div>
        </div>

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 space-y-1">
            <p className="text-xs text-surface-500">Nguồn tham khảo:</p>
            {message.sources.slice(0, 2).map((source, index) => (
              <div
                key={index}
                className="text-xs px-2 py-1 rounded bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400"
              >
                {source.sectionTitle} → {source.articleTitle}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {!isUser && (
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              title="Sao chép"
            >
              {copied ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <Copy size={14} className="text-surface-400" />
              )}
            </button>
            <button
              className="p-1.5 rounded hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              title="Hữu ích"
            >
              <ThumbsUp size={14} className="text-surface-400" />
            </button>
            <button
              className="p-1.5 rounded hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              title="Không hữu ích"
            >
              <ThumbsDown size={14} className="text-surface-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
