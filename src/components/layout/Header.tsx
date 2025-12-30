'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme, useScrollPosition, useKeyboardShortcut } from '@/hooks';
import { Button, Input, Icon, Search, Menu, X, Sun, Moon, Monitor, Sparkles } from '@/components/ui';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  onAIClick?: () => void;
}

export function Header({ onMenuClick, onSearchClick, onAIClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { isScrolled } = useScrollPosition();
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  // Keyboard shortcuts
  useKeyboardShortcut('k', () => onSearchClick?.(), { meta: true });
  useKeyboardShortcut('k', () => onSearchClick?.(), { ctrl: true });

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-16',
        'transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-surface-950/80 backdrop-blur-xl border-b border-surface-200/50 dark:border-surface-800/50 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="h-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Logo & Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent-400 border-2 border-white dark:border-surface-950" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-surface-900 dark:text-white leading-tight">
                Knowledge Base
              </h1>
              <p className="text-xs text-surface-500 dark:text-surface-400 -mt-0.5">
                by Hoang Bao Minh
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-xl hidden md:block">
          <button
            onClick={onSearchClick}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl',
              'bg-surface-100 dark:bg-surface-800/50',
              'border border-surface-200 dark:border-surface-700',
              'text-surface-500 dark:text-surface-400 text-sm',
              'hover:bg-surface-200/50 dark:hover:bg-surface-700/50',
              'hover:border-primary-300 dark:hover:border-primary-600',
              'transition-all duration-200',
              'group'
            )}
          >
            <Search size={18} className="text-surface-400 group-hover:text-primary-500 transition-colors" />
            <span className="flex-1 text-left">Tìm kiếm tài liệu...</span>
            <kbd className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-200 dark:bg-surface-700 text-xs font-medium">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search */}
          <button
            onClick={onSearchClick}
            className="md:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* AI Assistant */}
          <Button
            onClick={onAIClick}
            variant="primary"
            size="sm"
            className="hidden sm:flex gap-2"
          >
            <Sparkles size={16} />
            <span className="hidden lg:inline">Hỏi AI</span>
          </Button>
          <button
            onClick={onAIClick}
            className="sm:hidden p-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
            aria-label="Ask AI"
          >
            <Sparkles size={20} />
          </button>

          {/* Theme Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' && <Sun size={20} />}
              {theme === 'dark' && <Moon size={20} />}
              {theme === 'system' && <Monitor size={20} />}
            </button>
            
            {showThemeMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowThemeMenu(false)} 
                />
                <div className="absolute right-0 top-full mt-2 py-1 w-36 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-xl z-20">
                  {[
                    { value: 'light' as const, icon: Sun, label: 'Sáng' },
                    { value: 'dark' as const, icon: Moon, label: 'Tối' },
                    { value: 'system' as const, icon: Monitor, label: 'Hệ thống' },
                  ].map(({ value, icon: IconComp, label }) => (
                    <button
                      key={value}
                      onClick={() => {
                        setTheme(value);
                        setShowThemeMenu(false);
                      }}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 text-sm',
                        'hover:bg-surface-100 dark:hover:bg-surface-700',
                        'transition-colors',
                        theme === value && 'text-primary-500'
                      )}
                    >
                      <IconComp size={16} />
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* GitHub Link */}
          <a
            href="https://github.com/hoangbaominh"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            aria-label="GitHub"
          >
            <Icon name="github" size={20} />
          </a>
        </div>
      </div>
    </header>
  );
}
