'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DocArticle, DocSection } from '@/types';
import { Icon, Clock, Tag, ChevronLeft, ChevronRight, Copy, Check, ExternalLink } from '@/components/ui';
import { cn, formatDate } from '@/lib/utils';

interface DocContentProps {
  article: DocArticle;
  section: DocSection;
  prevArticle?: { slug: string; title: string; sectionSlug: string } | null;
  nextArticle?: { slug: string; title: string; sectionSlug: string } | null;
}

export function DocContent({ article, section, prevArticle, nextArticle }: DocContentProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link 
          href="/" 
          className="text-surface-500 hover:text-primary-500 transition-colors"
        >
          Trang chủ
        </Link>
        <span className="text-surface-400">/</span>
        <Link 
          href={`/docs/${section.slug}`}
          className="text-surface-500 hover:text-primary-500 transition-colors"
        >
          {section.title}
        </Link>
        <span className="text-surface-400">/</span>
        <span className="text-surface-900 dark:text-white font-medium truncate">
          {article.title}
        </span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium">
            {section.title}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white mb-4 leading-tight">
          {article.title}
        </h1>
        <p className="text-lg text-surface-600 dark:text-surface-400 mb-4">
          {article.description}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-surface-500">
          <span className="flex items-center gap-1.5">
            <Clock size={16} />
            {article.readTime} phút đọc
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="clock" size={16} />
            Cập nhật: {formatDate(article.updatedAt)}
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        <MarkdownContent content={article.content} />
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag size={16} className="text-surface-400" />
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700">
        <div className="flex justify-between gap-4">
          {prevArticle ? (
            <Link
              href={`/docs/${prevArticle.sectionSlug}/${prevArticle.slug}`}
              className="flex-1 group"
            >
              <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors">
                <span className="flex items-center gap-1 text-sm text-surface-500 mb-1">
                  <ChevronLeft size={16} />
                  Bài trước
                </span>
                <span className="font-medium text-surface-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {prevArticle.title}
                </span>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          
          {nextArticle ? (
            <Link
              href={`/docs/${nextArticle.sectionSlug}/${nextArticle.slug}`}
              className="flex-1 group text-right"
            >
              <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors">
                <span className="flex items-center justify-end gap-1 text-sm text-surface-500 mb-1">
                  Bài tiếp
                  <ChevronRight size={16} />
                </span>
                <span className="font-medium text-surface-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {nextArticle.title}
                </span>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </nav>
    </article>
  );
}

// Simple Markdown renderer
function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent = '';
  let codeLanguage = '';
  let currentList: React.ReactNode[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (currentList.length > 0) {
      if (listType === 'ul') {
        elements.push(
          <ul key={elements.length} className="list-disc pl-6 my-4 space-y-1">
            {currentList.map((item, i) => (
              <li key={i} className="text-surface-700 dark:text-surface-300">{item}</li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={elements.length} className="list-decimal pl-6 my-4 space-y-1">
            {currentList.map((item, i) => (
              <li key={i} className="text-surface-700 dark:text-surface-300">{item}</li>
            ))}
          </ol>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        flushList();
        elements.push(
          <CodeBlock key={elements.length} code={codeContent.trim()} language={codeLanguage} />
        );
        codeContent = '';
        codeLanguage = '';
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={elements.length} className="text-3xl font-bold mt-8 mb-4 text-surface-900 dark:text-white">
          {line.slice(2)}
        </h1>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={elements.length} className="text-2xl font-bold mt-8 mb-3 pb-2 border-b border-surface-200 dark:border-surface-700 text-surface-900 dark:text-white">
          {line.slice(3)}
        </h2>
      );
      continue;
    }
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={elements.length} className="text-xl font-semibold mt-6 mb-2 text-surface-900 dark:text-white">
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    // Lists
    if (line.match(/^[-*]\s/)) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      currentList.push(formatInlineElements(line.slice(2)));
      continue;
    }
    if (line.match(/^\d+\.\s/)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      currentList.push(formatInlineElements(line.replace(/^\d+\.\s/, '')));
      continue;
    }

    // Tables
    if (line.includes('|') && lines[i + 1]?.includes('---')) {
      flushList();
      const tableLines: string[] = [line];
      let j = i + 1;
      while (j < lines.length && lines[j].includes('|')) {
        tableLines.push(lines[j]);
        j++;
      }
      elements.push(<Table key={elements.length} lines={tableLines} />);
      i = j - 1;
      continue;
    }

    // Blockquotes
    if (line.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={elements.length} className="border-l-4 border-primary-500 pl-4 my-4 italic text-surface-600 dark:text-surface-400">
          {formatInlineElements(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Empty lines
    if (line.trim() === '') {
      flushList();
      continue;
    }

    // Paragraphs
    flushList();
    elements.push(
      <p key={elements.length} className="my-3 text-surface-700 dark:text-surface-300 leading-relaxed">
        {formatInlineElements(line)}
      </p>
    );
  }

  flushList();

  return <>{elements}</>;
}

// Format inline elements (bold, italic, code, links)
function formatInlineElements(text: string): React.ReactNode {
  // This is a simplified version - a production app would use a proper parser
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  // Process inline code
  while (remaining.includes('`')) {
    const start = remaining.indexOf('`');
    const end = remaining.indexOf('`', start + 1);
    if (end === -1) break;

    if (start > 0) {
      parts.push(remaining.slice(0, start));
    }
    parts.push(
      <code key={key++} className="px-1.5 py-0.5 rounded bg-surface-100 dark:bg-surface-800 text-primary-600 dark:text-primary-400 text-sm font-mono">
        {remaining.slice(start + 1, end)}
      </code>
    );
    remaining = remaining.slice(end + 1);
  }

  if (remaining) {
    // Process bold
    const boldPattern = /\*\*([^*]+)\*\*/g;
    const withBold = remaining.replace(boldPattern, '<strong>$1</strong>');
    
    // Process italic
    const italicPattern = /\*([^*]+)\*/g;
    const withItalic = withBold.replace(italicPattern, '<em>$1</em>');

    parts.push(
      <span key={key++} dangerouslySetInnerHTML={{ __html: withItalic }} />
    );
  }

  return parts.length === 1 ? parts[0] : parts;
}

// Code Block Component
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <div className="absolute top-3 right-3 flex items-center gap-2">
        {language && (
          <span className="text-xs text-surface-400 px-2 py-1 rounded bg-surface-700">
            {language}
          </span>
        )}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded bg-surface-700 hover:bg-surface-600 transition-colors opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <Check size={14} className="text-green-400" />
          ) : (
            <Copy size={14} className="text-surface-400" />
          )}
        </button>
      </div>
      <pre className="p-4 rounded-xl bg-surface-900 dark:bg-surface-950 overflow-x-auto">
        <code className="text-sm text-surface-300 font-mono">{code}</code>
      </pre>
    </div>
  );
}

// Table Component
function Table({ lines }: { lines: string[] }) {
  const headers = lines[0].split('|').filter(Boolean).map((h) => h.trim());
  const rows = lines.slice(2).map((line) =>
    line.split('|').filter(Boolean).map((cell) => cell.trim())
  );

  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-surface-100 dark:bg-surface-800">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-2 text-left text-sm font-semibold text-surface-900 dark:text-white border border-surface-200 dark:border-surface-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-surface-50 dark:hover:bg-surface-800/50">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-2 text-sm text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-700"
                >
                  {formatInlineElements(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
