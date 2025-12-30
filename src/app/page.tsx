import Link from 'next/link';
import AppWrapper from './AppWrapper';
import { docSections, getArticlesBySection } from '@/data/docs';
import { Icon, ArrowRight, Sparkles, BookOpen, Zap, Code } from '@/components/ui';

export default function HomePage() {
  return (
    <AppWrapper>
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20">
        {/* Background */}
        <div className="absolute inset-0 mesh-bg opacity-50" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 mb-6">
            <Sparkles size={16} className="text-primary-500" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              AI-Powered Documentation
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white mb-6 leading-tight">
            Next.js{' '}
            <span className="gradient-text">Knowledge Base</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-400 mb-8 max-w-2xl mx-auto">
            Tài liệu Next.js toàn diện với AI Assistant. 
            Tìm hiểu về SSR, SSG, ISR, App Router và nhiều hơn nữa.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs/getting-started/introduction"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all hover:-translate-y-0.5"
            >
              <BookOpen size={20} />
              Bắt đầu học
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/docs/rendering/strategies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 font-medium hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            >
              <Zap size={20} />
              Rendering Strategies
            </Link>
          </div>

          {/* Author */}
          <div className="mt-12 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-surface-800 shadow-md">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">HBM</span>
            </div>
            <span className="text-sm text-surface-600 dark:text-surface-400">
              Xây dựng bởi <strong className="text-surface-900 dark:text-white">Hoang Bao Minh</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Sparkles size={24} />}
            title="AI Assistant"
            description="Hỏi đáp thông minh với RAG-powered AI. Nhận câu trả lời chính xác từ tài liệu."
            gradient="from-purple-500 to-pink-500"
          />
          <FeatureCard
            icon={<Zap size={24} />}
            title="Rendering Strategies"
            description="Hiểu sâu về SSR, SSG, ISR và CSR. Chọn strategy phù hợp cho từng use case."
            gradient="from-amber-500 to-orange-500"
          />
          <FeatureCard
            icon={<Code size={24} />}
            title="Code Examples"
            description="Ví dụ code thực tế, copy-paste ready. Từ cơ bản đến nâng cao."
            gradient="from-cyan-500 to-blue-500"
          />
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mb-8 text-center">
            Khám phá tài liệu
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {docSections.sort((a, b) => a.order - b.order).map((section) => {
              const articles = getArticlesBySection(section.id);
              return (
                <Link
                  key={section.id}
                  href={`/docs/${section.slug}`}
                  className="group p-6 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-500 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                      <Icon name={section.icon} size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-surface-900 dark:text-white mb-1 group-hover:text-primary-500 transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-sm text-surface-500 dark:text-surface-400 mb-3">
                        {section.description}
                      </p>
                      <span className="text-xs text-surface-400">
                        {articles.length} bài viết
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 sm:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Bắt đầu với Next.js ngay hôm nay
              </h2>
              <p className="text-primary-100 mb-8 max-w-xl mx-auto">
                Từ cài đặt đến deployment, chúng tôi sẽ hướng dẫn bạn từng bước xây dựng ứng dụng web hiện đại.
              </p>
              <Link
                href="/docs/getting-started/introduction"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-600 font-semibold hover:bg-primary-50 transition-colors shadow-lg"
              >
                Đọc tài liệu
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-surface-200 dark:border-surface-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-surface-500 dark:text-surface-400">
            © 2024 Knowledge Base by Hoang Bao Minh. Built with Next.js 15.
          </p>
        </div>
      </footer>
    </AppWrapper>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group p-6 rounded-2xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 hover:shadow-xl transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-semibold text-surface-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-surface-500 dark:text-surface-400">
        {description}
      </p>
    </div>
  );
}
