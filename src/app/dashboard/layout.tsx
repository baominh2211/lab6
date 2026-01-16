import { ReactNode } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  BarChart3, 
  FileText,
  Bell,
  HelpCircle,
} from 'lucide-react';

const sidebarItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

// This is a Server Component (default in App Router)
// It renders static UI without any client-side JavaScript
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Server Component (static navigation) */}
      <aside className="w-64 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] hidden lg:block">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-secondary)] to-[var(--color-accent-purple)] flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold">Dashboard</h2>
              <p className="text-xs text-[var(--color-text-muted)]">Exercise 2</p>
            </div>
          </div>

          {/* Server Component Info */}
          <div className="p-3 rounded-xl bg-[var(--color-accent-secondary)]/10 border border-[var(--color-accent-secondary)]/30 mb-6">
            <p className="text-xs text-[var(--color-accent-secondary)]">
              🖥️ This sidebar is a <strong>Server Component</strong> - rendered on the server with zero client JS.
            </p>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="my-6 border-t border-[var(--color-border)]" />

          {/* Secondary Links */}
          <nav className="space-y-1">
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="text-sm font-medium">Notifications</span>
              <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-[var(--color-accent-tertiary)] text-white">
                3
              </span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Help Center</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
