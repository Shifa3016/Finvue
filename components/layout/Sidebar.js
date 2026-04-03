'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp, ROLES } from '@/context/AppContext';
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  Sun, Moon, Shield, Eye, TrendingUp, RotateCcw
} from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { href: '/insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { role, setRole, darkMode, setDarkMode, isAdmin, resetData } = useApp();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col
                      border-r border-slate-200 bg-white
                      dark:border-white/5 dark:bg-navy-900/95 dark:backdrop-blur-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-6 dark:border-white/5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg shadow-gold-500/20">
          <TrendingUp size={18} className="text-white dark:text-navy-950" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold text-slate-900 dark:text-white tracking-tight">Finvue</h1>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500">Finance Dashboard</p>
        </div>
      </div>

      {/* Role Switcher */}
      <div className="px-4 pt-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-white/5 dark:bg-navy-950/50">
          <p className="label-text mb-2">Active Role</p>
          <div className="flex gap-1.5">
            <button
              onClick={() => setRole(ROLES.VIEWER)}
              className={clsx(
                'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all duration-200',
                role === ROLES.VIEWER
                  ? 'bg-slate-200 text-slate-700 dark:bg-slate-700/80 dark:text-slate-200'
                  : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
              )}
            >
              <Eye size={12} /> Viewer
            </button>
            <button
              onClick={() => setRole(ROLES.ADMIN)}
              className={clsx(
                'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all duration-200',
                role === ROLES.ADMIN
                  ? 'bg-gold-100 text-gold-700 ring-1 ring-gold-300 dark:bg-gold-500/20 dark:text-gold-400 dark:ring-gold-500/30'
                  : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
              )}
            >
              <Shield size={12} /> Admin
            </button>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-4 pt-4">
        <p className="label-text mb-3 px-2">Navigation</p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-gold-50 text-gold-700 dark:bg-gold-500/15 dark:text-gold-400'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200'
              )}
            >
              <Icon size={17} strokeWidth={active ? 2.5 : 2} />
              {label}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold-500 dark:bg-gold-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom controls */}
      <div className="space-y-2 border-t border-slate-100 px-4 pb-6 pt-4 dark:border-white/5">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn-ghost w-full justify-start text-xs"
        >
          {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        {isAdmin && (
          <button
            onClick={resetData}
            className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
          >
            <RotateCcw size={13} /> Reset to Sample Data
          </button>
        )}
        <div className="px-2 pt-1">
          <p className="text-[10px] font-mono leading-relaxed text-slate-400 dark:text-slate-700">
            {isAdmin ? '⚡ Admin: Full access enabled' : '👁 Viewer: Read-only mode'}
          </p>
        </div>
      </div>
    </aside>
  );
}
