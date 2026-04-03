'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/data/mockData';
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from 'lucide-react';
import clsx from 'clsx';

function fmt(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(Math.abs(val));
}
function fmtDate(str) {
  return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function RecentTransactions() {
  const { transactions } = useApp();
  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-navy-800/60 dark:shadow-none dark:backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-white/5">
        <div>
          <p className="label-text mb-0.5">Recent Activity</p>
          <p className="section-title">Latest Transactions</p>
        </div>
        <Link href="/transactions" className="flex items-center gap-1 text-xs text-gold-600 transition hover:text-gold-500 dark:text-gold-400 dark:hover:text-gold-300">
          View all <ExternalLink size={12} />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="py-12 text-center text-sm text-slate-400 dark:text-slate-500">No transactions yet.</div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-white/3">
          {recent.map((tx, i) => {
            const cat = CATEGORIES.find(c => c.id === tx.category);
            const isIncome = tx.type === 'income';
            return (
              <div
                key={tx.id}
                className="flex items-center gap-3 px-5 py-3 opacity-0 animate-fade-in hover:bg-slate-50 dark:hover:bg-white/2 transition-colors"
                style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'forwards' }}
              >
                <div className={clsx(
                  'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-base',
                  isIncome ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-slate-100 dark:bg-white/5'
                )}>
                  {cat?.icon || '💳'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{tx.description}</p>
                  <p className="font-mono text-xs text-slate-400 dark:text-slate-500">{fmtDate(tx.date)} · {tx.account}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className={clsx('font-mono text-sm font-semibold', isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
                    {isIncome ? '+' : '-'}{fmt(tx.amount)}
                  </p>
                  <div className="mt-0.5 flex items-center justify-end gap-1">
                    {isIncome
                      ? <ArrowUpRight size={10} className="text-emerald-500" />
                      : <ArrowDownLeft size={10} className="text-rose-400" />
                    }
                    <span className="font-mono text-[10px] text-slate-400 dark:text-slate-600">{cat?.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
