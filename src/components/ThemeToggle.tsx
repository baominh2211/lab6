'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';

type ThemeMode = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('dashboard-theme') as ThemeMode | null;
    if (stored) {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem('dashboard-theme', mode);
    
    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', mode);
    }
  }, [mode, mounted]);

  if (!mounted) return null;

  const options: { value: ThemeMode; icon: typeof Sun; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ];

  return (
    <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)]">
      <h3 className="text-lg font-semibold mb-4">Theme Settings</h3>
      <p className="text-[var(--color-text-secondary)] text-sm mb-4">
        This is a Client Component using useState to manage theme state.
      </p>
      
      <div className="flex gap-2">
        {options.map(({ value, icon: Icon, label }) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setMode(value)}
            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
              mode === value
                ? 'bg-[var(--color-accent-primary)]/10 border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]'
                : 'bg-[var(--color-bg-tertiary)] border-transparent hover:border-[var(--color-border)]'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{label}</span>
          </motion.button>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-[var(--color-bg-tertiary)]">
        <code className="text-xs text-[var(--color-text-secondary)]">
          Current: <span className="text-[var(--color-accent-secondary)]">{mode}</span>
        </code>
      </div>
    </div>
  );
}
