/**
 * Loading UI for Dashboard
 * 
 * This file demonstrates:
 * - Instant loading states with loading.tsx
 * - Suspense boundaries in App Router
 * - Skeleton UI pattern
 */

export default function DashboardLoading() {
  return (
    <div className="p-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-6 w-48 bg-slate-200 rounded animate-pulse mb-4"></div>
        <div className="h-10 w-64 bg-slate-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-96 bg-slate-200 rounded animate-pulse"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Profile Card Skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-slate-200 rounded-full animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-6 w-40 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 w-48 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 w-32 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-100 rounded-lg p-4">
                <div className="h-8 w-12 bg-slate-200 rounded animate-pulse mx-auto mb-2"></div>
                <div className="h-4 w-16 bg-slate-200 rounded animate-pulse mx-auto"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Card Skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="h-6 w-24 bg-slate-200 rounded animate-pulse mb-4"></div>
          <div className="h-12 w-32 bg-slate-200 rounded animate-pulse mb-4"></div>
          <div className="h-24 bg-slate-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Loading Info */}
      <div className="mt-8 text-center text-slate-500">
        <div className="inline-flex items-center gap-2">
          <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
          <span>Loading dashboard data from server...</span>
        </div>
        <p className="text-sm mt-2">
          (2 second simulated delay to demonstrate loading.tsx)
        </p>
      </div>
    </div>
  )
}
