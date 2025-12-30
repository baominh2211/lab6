import Link from 'next/link';
import AppWrapper from './AppWrapper';

export default function NotFound() {
  return (
    <AppWrapper>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <span className="text-8xl font-bold gradient-text">404</span>
          </div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">
            Không tìm thấy trang
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mb-8 max-w-md mx-auto">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:shadow-lg transition-shadow"
            >
              Về trang chủ
            </Link>
            <Link
              href="/docs/getting-started"
              className="px-6 py-3 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 font-medium hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            >
              Xem tài liệu
            </Link>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
}
