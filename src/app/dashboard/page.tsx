import { Metadata } from 'next';
import { Suspense } from 'react';
import { 
  Users, 
  Eye, 
  TrendingUp, 
  Clock, 
  FileText,
  Target,
  Sparkles,
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { delay, formatNumber } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Hybrid rendering dashboard demonstrating Server and Client Components.',
};

// Server Component: Fetches data on the server
async function UserProfile() {
  // Simulate API delay
  await delay(1000);

  const profile = {
    name: 'Tran Vinh Khiem',
    email: 'khiem@uit.edu.vn',
    role: 'MSc. Lecturer',
    avatar: 'TK',
  };

  return (
    <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)]">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-xl font-bold text-[var(--color-bg-primary)]">
          {profile.avatar}
        </div>
        <div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-[var(--color-text-secondary)]">{profile.email}</p>
          <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-xs rounded-full bg-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)]">
            {profile.role}
          </span>
        </div>
      </div>
      <p className="text-xs text-[var(--color-text-muted)] p-2 rounded-lg bg-[var(--color-bg-tertiary)]">
        🖥️ This is a <strong>Server Component</strong> - data fetched on server with 1s delay simulation.
      </p>
    </div>
  );
}

// Loading skeleton for UserProfile
function ProfileSkeleton() {
  return (
    <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)] animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-tertiary)]" />
        <div className="flex-1">
          <div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-40 mb-2" />
          <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-32 mb-2" />
          <div className="h-5 bg-[var(--color-bg-tertiary)] rounded w-24" />
        </div>
      </div>
      <div className="h-8 bg-[var(--color-bg-tertiary)] rounded" />
    </div>
  );
}

// Server Component: Activity List
async function RecentActivity() {
  await delay(1500);

  const activities = [
    { id: 1, action: 'Published new blog post', time: '2 hours ago', type: 'create' },
    { id: 2, action: 'Updated dashboard metrics', time: '4 hours ago', type: 'update' },
    { id: 3, action: 'Completed API integration', time: 'Yesterday', type: 'complete' },
    { id: 4, action: 'Added new team member', time: '2 days ago', type: 'create' },
  ];

  return (
    <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)]">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              activity.type === 'create' ? 'bg-[var(--color-accent-primary)]' :
              activity.type === 'update' ? 'bg-[var(--color-accent-secondary)]' :
              'bg-[var(--color-accent-purple)]'
            }`} />
            <div className="flex-1">
              <p className="text-sm">{activity.action}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-[var(--color-text-muted)] mt-4 p-2 rounded-lg bg-[var(--color-bg-tertiary)]">
        🖥️ Server Component - fetched with 1.5s delay.
      </p>
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)] animate-pulse">
      <div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-32 mb-4" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-start gap-3 mb-4">
          <div className="w-2 h-2 rounded-full mt-2 bg-[var(--color-bg-tertiary)]" />
          <div className="flex-1">
            <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-3/4 mb-1" />
            <div className="h-3 bg-[var(--color-bg-tertiary)] rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Stats Card Component (inline to avoid icon serialization issue)
function StatsCard({ 
  title, 
  value, 
  change, 
  changeType, 
  iconType, 
  colorType,
  index = 0 
}: { 
  title: string; 
  value: string; 
  change: string; 
  changeType: 'positive' | 'negative';
  iconType: 'eye' | 'users' | 'file' | 'target';
  colorType: 'primary' | 'secondary' | 'tertiary' | 'purple';
  index?: number;
}) {
  const IconComponent = iconType === 'eye' ? Eye : 
                       iconType === 'users' ? Users : 
                       iconType === 'file' ? FileText : Target;
  
  const colorClasses = {
    primary: { bg: 'bg-[var(--color-accent-primary)]/10', text: 'text-[var(--color-accent-primary)]' },
    secondary: { bg: 'bg-[var(--color-accent-secondary)]/10', text: 'text-[var(--color-accent-secondary)]' },
    tertiary: { bg: 'bg-[var(--color-accent-tertiary)]/10', text: 'text-[var(--color-accent-tertiary)]' },
    purple: { bg: 'bg-[var(--color-accent-purple)]/10', text: 'text-[var(--color-accent-purple)]' },
  };
  
  const colors = colorClasses[colorType];

  return (
    <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)] hover:border-[var(--color-border-light)] transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <IconComponent className={`w-5 h-5 ${colors.text}`} />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          changeType === 'positive'
            ? 'bg-green-500/10 text-green-500'
            : 'bg-red-500/10 text-red-500'
        }`}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-[var(--color-text-muted)] text-sm mb-1">{title}</p>
        <p className={`text-2xl font-bold ${colors.text}`}>{value}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-secondary)]/10 border border-[var(--color-accent-secondary)]/30 mb-4">
          <Sparkles className="w-4 h-4 text-[var(--color-accent-secondary)]" />
          <span className="text-sm font-medium text-[var(--color-accent-secondary)]">
            Exercise 2: Hybrid Rendering
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-[var(--color-text-secondary)]">
          Demonstrating Server Components and Client Components working together.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Visits" value="124,892" change="+12.5%" changeType="positive" iconType="eye" colorType="primary" index={0} />
        <StatsCard title="Unique Users" value="48,234" change="+8.2%" changeType="positive" iconType="users" colorType="secondary" index={1} />
        <StatsCard title="Page Views" value="892,456" change="+23.1%" changeType="positive" iconType="file" colorType="tertiary" index={2} />
        <StatsCard title="Conversion" value="3.24%" change="-0.4%" changeType="negative" iconType="target" colorType="purple" index={3} />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Server Components with Suspense */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Profile - Server Component with streaming */}
          <Suspense fallback={<ProfileSkeleton />}>
            <UserProfile />
          </Suspense>

          {/* Recent Activity - Server Component with streaming */}
          <Suspense fallback={<ActivitySkeleton />}>
            <RecentActivity />
          </Suspense>
        </div>

        {/* Right Column - Client Component */}
        <div className="space-y-6">
          {/* Theme Toggle - Client Component with useState */}
          <ThemeToggle />

          {/* Architecture Explanation */}
          <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)]">
            <h3 className="text-lg font-semibold mb-4">Architecture Pattern</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-xl bg-[var(--color-accent-secondary)]/10 border border-[var(--color-accent-secondary)]/30">
                <p className="font-medium text-[var(--color-accent-secondary)] mb-1">Server Components</p>
                <p className="text-[var(--color-text-secondary)]">
                  Layout, Profile, Activity - rendered on server, zero client JS
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[var(--color-accent-purple)]/10 border border-[var(--color-accent-purple)]/30">
                <p className="font-medium text-[var(--color-accent-purple)] mb-1">Client Components</p>
                <p className="text-[var(--color-text-secondary)]">
                  Theme Toggle - uses useState, interactivity required
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[var(--color-accent-primary)]/10 border border-[var(--color-accent-primary)]/30">
                <p className="font-medium text-[var(--color-accent-primary)] mb-1">Suspense Streaming</p>
                <p className="text-[var(--color-text-secondary)]">
                  Profile & Activity stream in as they load
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
