export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-surface-200 dark:border-surface-700" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-primary-500 border-t-transparent animate-spin" />
        </div>
        <p className="text-surface-500 dark:text-surface-400">Đang tải...</p>
      </div>
    </div>
  );
}
