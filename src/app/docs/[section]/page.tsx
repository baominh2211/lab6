import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import AppWrapper from '@/app/AppWrapper';
import { docSections, getArticlesBySection } from '@/data/docs';
import { Icon, ArrowRight, Clock } from '@/components/ui';

interface PageProps {
  params: Promise<{ section: string }>;
}

export async function generateStaticParams() {
  return docSections.map((section) => ({
    section: section.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section: sectionSlug } = await params;
  const section = docSections.find((s) => s.slug === sectionSlug);
  
  if (!section) {
    return { title: 'Not Found' };
  }

  return {
    title: section.title,
    description: section.description,
  };
}

export default async function SectionPage({ params }: PageProps) {
  const { section: sectionSlug } = await params;
  const section = docSections.find((s) => s.slug === sectionSlug);

  if (!section) {
    notFound();
  }

  const articles = getArticlesBySection(section.id);

  return (
    <AppWrapper>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="text-surface-500 hover:text-primary-500 transition-colors">
              Trang chủ
            </Link>
            <span className="text-surface-400">/</span>
            <span className="text-surface-900 dark:text-white font-medium">
              {section.title}
            </span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-500">
              <Icon name={section.icon} size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-surface-900 dark:text-white">
                {section.title}
              </h1>
              <p className="text-surface-500 dark:text-surface-400 mt-1">
                {section.description}
              </p>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              href={`/docs/${section.slug}/${article.slug}`}
              className="group block p-6 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-primary-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white group-hover:text-primary-500 transition-colors">
                      {article.title}
                    </h2>
                  </div>
                  <p className="text-surface-500 dark:text-surface-400 mb-3">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-surface-400">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {article.readTime} phút đọc
                    </span>
                    <div className="flex items-center gap-2">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-surface-100 dark:bg-surface-800 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <ArrowRight
                  size={20}
                  className="text-surface-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
              <Icon name={section.icon} size={28} className="text-surface-400" />
            </div>
            <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">
              Chưa có bài viết
            </h3>
            <p className="text-surface-500">
              Nội dung đang được cập nhật. Vui lòng quay lại sau.
            </p>
          </div>
        )}
      </div>
    </AppWrapper>
  );
}
