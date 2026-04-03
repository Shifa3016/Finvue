'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(val);
}

export default function SummaryCard({ title, value, change, changeLabel, icon: Icon, variant = 'default', delay = 0 }) {
  const isPositive = change >= 0;

  const variants = {
    default: {
      wrap: 'border-slate-200 bg-white dark:border-white/5 dark:bg-navy-800/60',
      icon: 'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400',
      value: 'text-slate-900 dark:text-white',
    },
    gold: {
      wrap: 'border-gold-200 bg-gradient-to-br from-gold-50 to-white dark:border-gold-500/20 dark:from-gold-500/15 dark:to-navy-900/80',
      icon: 'bg-gold-100 text-gold-600 dark:bg-gold-500/20 dark:text-gold-400',
      value: 'text-gold-700 dark:text-gold-300',
    },
    income: {
      wrap: 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-white dark:border-emerald-500/15 dark:from-emerald-500/10 dark:to-navy-900/80',
      icon: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400',
      value: 'text-emerald-700 dark:text-emerald-300',
    },
    expense: {
      wrap: 'border-rose-200 bg-gradient-to-br from-rose-50 to-white dark:border-rose-500/15 dark:from-rose-500/10 dark:to-navy-900/80',
      icon: 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400',
      value: 'text-rose-700 dark:text-rose-300',
    },
  };

  const v = variants[variant];

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-2xl border p-5 shadow-sm opacity-0 animate-slide-up',
        v.wrap
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-black/2 dark:bg-white/2 blur-2xl" />
      <div className="relative">
        <div className="mb-4 flex items-start justify-between">
          <div className={clsx('flex h-10 w-10 items-center justify-center rounded-xl', v.icon)}>
            <Icon size={18} strokeWidth={2} />
          </div>
          {change !== undefined && (
            <div className={clsx(
              'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
              isPositive
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
            )}>
              {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        <p className="label-text mb-1">{title}</p>
        <p className={clsx('font-mono text-2xl font-semibold leading-tight', v.value)}>
          {typeof value === 'number' ? formatCurrency(value) : value}
        </p>
        {changeLabel && <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{changeLabel}</p>}
      </div>
    </div>
  );
}
