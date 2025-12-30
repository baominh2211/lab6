'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { searchDocs, docSections } from '@/data/docs';
import { Input, Icon, Search, X, ArrowRight, Clock, FileCode } from '@/components/ui';
import { cn } from '@/lib/utils';
import { DocArticle } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DocArticle[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Search logic
  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchDocs(query);
      setResults(searchResults.slice(0, 8));
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            const section = docSections.find((s) => s.id === results[selectedIndex].sectionId);
            if (section) {
              router.push(`/docs/${section.slug}/${results[selectedIndex].slug}`);
              onClose();
            }
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [isOpen, results, selectedIndex, router, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl mx-auto mt-[15vh] px-4">
        <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-2xl border border-surface-200 dark:border-surface-700 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 border-b border-surface-200 dark:border-surface-700">
            <Search size={20} className="text-surface-400" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm tài liệu..."
              className="flex-1 py-4 bg-transparent text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            >
              <X size={18} className="text-surface-400" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              // Quick Links
              <div className="p-4">
                <p className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-3">
                  Truy cập nhanh
                </p>
                <div className="space-y-1">
                  {docSections.slice(0, 4).map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        router.push(`/docs/${section.slug}`);
                        onClose();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors group"
                    >
                      <Icon name={section.icon} size={18} className="text-surface-400 group-hover:text-primary-500" />
                      <span className="flex-1 text-surface-700 dark:text-surface-300">
                        {section.title}
                      </span>
                      <ArrowRight size={16} className="text-surface-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              // Search Results
              <div className="p-2">
                {results.map((article, index) => {
                  const section = docSections.find((s) => s.id === article.sectionId);
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={article.id}
                      onClick={() => {
                        if (section) {
                          router.push(`/docs/${section.slug}/${article.slug}`);
                          onClose();
                        }
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        'w-full flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-colors',
                        isSelected
                          ? 'bg-primary-50 dark:bg-primary-900/20'
                          : 'hover:bg-surface-100 dark:hover:bg-surface-800'
                      )}
                    >
                      <div className={cn(
                        'mt-0.5 p-2 rounded-lg',
                        isSelected
                          ? 'bg-primary-100 dark:bg-primary-800/30 text-primary-600 dark:text-primary-400'
                          : 'bg-surface-100 dark:bg-surface-800 text-surface-500'
                      )}>
                        <FileCode size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          'font-medium truncate',
                          isSelected
                            ? 'text-primary-700 dark:text-primary-300'
                            : 'text-surface-900 dark:text-surface-100'
                        )}>
                          {article.title}
                        </p>
                        <p className="text-sm text-surface-500 truncate">
                          {section?.title} · {article.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock size={12} className="text-surface-400" />
                          <span className="text-xs text-surface-400">
                            {article.readTime} phút đọc
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="flex items-center gap-1 text-xs text-primary-500">
                          <span>Mở</span>
                          <ArrowRight size={14} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              // No Results
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
                  <Search size={24} className="text-surface-400" />
                </div>
                <p className="text-surface-600 dark:text-surface-400">
                  Không tìm thấy kết quả cho &ldquo;{query}&rdquo;
                </p>
                <p className="text-sm text-surface-500 mt-1">
                  Thử tìm với từ khóa khác
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50">
            <div className="flex items-center gap-4 text-xs text-surface-500">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-surface-200 dark:bg-surface-700 font-medium">↑↓</kbd>
                <span>Di chuyển</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-surface-200 dark:bg-surface-700 font-medium">↵</kbd>
                <span>Mở</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-surface-200 dark:bg-surface-700 font-medium">Esc</kbd>
                <span>Đóng</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
