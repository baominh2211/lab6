'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docSections, getArticlesBySection } from '@/data/docs';
import { Icon, ChevronDown, ChevronRight } from '@/components/ui';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(
    docSections.map((s) => s.id)
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-16 bottom-0 left-0 z-40 w-72 bg-white dark:bg-surface-950',
          'border-r border-surface-200 dark:border-surface-800',
          'transform transition-transform duration-300 ease-out',
          'lg:translate-x-0',
          'overflow-hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="h-full overflow-y-auto py-6 px-4">
          {/* Quick Links */}
          <div className="mb-6">
            <Link
              href="/"
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium',
                'transition-colors duration-200',
                pathname === '/'
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
              )}
              onClick={onClose}
            >
              <Icon name="home" size={18} />
              Trang chủ
            </Link>
          </div>

          {/* Documentation Sections */}
          <div className="space-y-2">
            <p className="px-3 text-xs font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-wider mb-3">
              Tài liệu
            </p>
            
            {docSections.sort((a, b) => a.order - b.order).map((section) => {
              const articles = getArticlesBySection(section.id);
              const isExpanded = expandedSections.includes(section.id);
              const sectionPath = `/docs/${section.slug}`;
              const isActive = pathname.startsWith(sectionPath);

              return (
                <div key={section.id} className="space-y-1">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium',
                      'transition-all duration-200',
                      isActive
                        ? 'bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-surface-100'
                        : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                    )}
                  >
                    <Icon name={section.icon} size={18} className={cn(
                      isActive && 'text-primary-500'
                    )} />
                    <span className="flex-1 text-left">{section.title}</span>
                    {isExpanded ? (
                      <ChevronDown size={16} className="text-surface-400" />
                    ) : (
                      <ChevronRight size={16} className="text-surface-400" />
                    )}
                  </button>

                  {/* Articles */}
                  {isExpanded && articles.length > 0 && (
                    <div className="ml-6 pl-3 border-l border-surface-200 dark:border-surface-700 space-y-1">
                      {articles.map((article) => {
                        const articlePath = `/docs/${section.slug}/${article.slug}`;
                        const isArticleActive = pathname === articlePath;

                        return (
                          <Link
                            key={article.id}
                            href={articlePath}
                            onClick={onClose}
                            className={cn(
                              'block px-3 py-1.5 rounded-lg text-sm',
                              'transition-colors duration-200',
                              isArticleActive
                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                                : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-800'
                            )}
                          >
                            {article.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700">
            <div className="px-3 space-y-3">
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Được xây dựng bởi
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">HBM</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                    Hoang Bao Minh
                  </p>
                  <p className="text-xs text-surface-500">Next.js Developer</p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
