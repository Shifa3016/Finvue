'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp, ROLES } from '@/context/AppContext';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp, Menu, X, Shield, Eye, Sun, Moon } from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { href: '/insights', label: 'Insights', icon: Lightbulb },
];

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { role, setRole, darkMode, setDarkMode } = useApp();

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl dark:border-white/5 dark:bg-navy-900/95 lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600">
            <TrendingUp size={15} className="text-white dark:text-navy-950" strokeWidth={2.5} />
          </div>
          <span className="font-display text-base font-bold text-slate-900 dark:text-white">Finvue</span>
        </div>
        <button onClick={() => setOpen(!open)} className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm dark:bg-navy-950/80" onClick={() => setOpen(false)} />
          <nav className="absolute right-0 top-0 h-full w-64 border-l border-slate-200 bg-white p-6 pt-16 dark:border-white/5 dark:bg-navy-900">
            {/* Role */}
            <div className="mb-6 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-white/5 dark:bg-navy-950/50">
              <p className="label-text mb-2">Role</p>
              <div className="flex gap-1.5">
                <button onClick={() => setRole(ROLES.VIEWER)}
                  className={clsx('flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition',
                    role === ROLES.VIEWER ? 'bg-slate-200 text-slate-700 dark:bg-slate-700/80 dark:text-slate-200' : 'text-slate-400 hover:text-slate-700 dark:text-slate-500'
                  )}>
                  <Eye size={11} /> Viewer
                </button>
                <button onClick={() => setRole(ROLES.ADMIN)}
                  className={clsx('flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition',
                    role === ROLES.ADMIN ? 'bg-gold-100 text-gold-700 ring-1 ring-gold-300 dark:bg-gold-500/20 dark:text-gold-400 dark:ring-gold-500/30' : 'text-slate-400 hover:text-slate-700 dark:text-slate-500'
                  )}>
                  <Shield size={11} /> Admin
                </button>
              </div>
            </div>

            <div className="space-y-1">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link key={href} href={href} onClick={() => setOpen(false)}
                    className={clsx('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                      active
                        ? 'bg-gold-50 text-gold-700 dark:bg-gold-500/15 dark:text-gold-400'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                    )}>
                    <Icon size={17} /> {label}
                  </Link>
                );
              })}
            </div>

            <button onClick={() => setDarkMode(!darkMode)}
              className="mt-4 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
