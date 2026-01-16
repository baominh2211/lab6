'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color?: 'primary' | 'secondary' | 'tertiary' | 'purple';
  index?: number;
}

const colorClasses = {
  primary: {
    bg: 'bg-[var(--color-accent-primary)]/10',
    text: 'text-[var(--color-accent-primary)]',
    border: 'border-[var(--color-accent-primary)]/30',
  },
  secondary: {
    bg: 'bg-[var(--color-accent-secondary)]/10',
    text: 'text-[var(--color-accent-secondary)]',
    border: 'border-[var(--color-accent-secondary)]/30',
  },
  tertiary: {
    bg: 'bg-[var(--color-accent-tertiary)]/10',
    text: 'text-[var(--color-accent-tertiary)]',
    border: 'border-[var(--color-accent-tertiary)]/30',
  },
  purple: {
    bg: 'bg-[var(--color-accent-purple)]/10',
    text: 'text-[var(--color-accent-purple)]',
    border: 'border-[var(--color-accent-purple)]/30',
  },
};

export default function StatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  color = 'primary',
  index = 0,
}: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className={`bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)] hover:${colors.border} transition-all`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        {change && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              changeType === 'positive'
                ? 'bg-green-500/10 text-green-500'
                : changeType === 'negative'
                ? 'bg-red-500/10 text-red-500'
                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]'
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-[var(--color-text-muted)] text-sm mb-1">{title}</p>
        <p className={`text-2xl font-bold ${colors.text}`}>{value}</p>
      </div>
    </motion.div>
  );
}
