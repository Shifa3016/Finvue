'use client';

import { useState, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/data/mockData';
import AppShell from '@/components/layout/AppShell';
import TransactionModal from '@/components/ui/TransactionModal';
import {
  Search, Plus, ArrowUpDown, ArrowUp, ArrowDown,
  Pencil, Trash2, ArrowUpRight, ArrowDownLeft,
  ChevronLeft, ChevronRight, Download,
} from 'lucide-react';
import clsx from 'clsx';

const PAGE_SIZE = 12;

function fmt(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(Math.abs(val));
}
function fmtDate(str) {
  return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function SortButton({ col, label, filters, updateFilters }) {
  const active = filters.sortBy === col;
  return (
    <button
      onClick={() => active
        ? updateFilters({ sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' })
        : updateFilters({ sortBy: col, sortDir: 'desc' })
      }
      className={clsx('flex items-center gap-1 font-mono text-xs uppercase tracking-wide transition',
        active ? 'text-gold-600 dark:text-gold-400' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
      )}
    >
      {label}
      {active ? (filters.sortDir === 'asc' ? <ArrowUp size={11} /> : <ArrowDown size={11} />) : <ArrowUpDown size={11} />}
    </button>
  );
}

export default function TransactionsPage() {
  const { filters, updateFilters, getFilteredTransactions, deleteTransaction, isAdmin } = useApp();
  const [modal, setModal] = useState(null);
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = getFilteredTransactions();
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = useCallback((key, val) => {
    updateFilters({ [key]: val }); setPage(1);
  }, [updateFilters]);

  function exportCSV() {
    const rows = filtered.map(t => [t.date, `"${t.description}"`, t.category, t.type, t.amount, t.account]);
    const csv = [['Date','Description','Category','Type','Amount','Account'], ...rows].map(r => r.join(',')).join('\n');
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: 'transactions.csv' });
    a.click();
  }

  return (
    <AppShell>
      {/* Header */}
      <div className="mb-6 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="label-text mb-1">Finance</p>
            <h1 className="page-title">Transactions</h1>
            <p className="page-subtitle">{filtered.length} transaction{filtered.length !== 1 ? 's' : ''} found</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={exportCSV} className="btn-ghost px-3 py-2 text-xs"><Download size={14} /> Export CSV</button>
            {isAdmin && <button onClick={() => setModal('add')} className="btn-primary"><Plus size={15} /> Add Transaction</button>}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/5 dark:bg-navy-800/60 dark:shadow-none opacity-0 animate-slide-up animate-delay-100" style={{ animationFillMode: 'forwards' }}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="relative sm:col-span-2 lg:col-span-2">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search transactions..." value={filters.search}
              onChange={e => handleFilterChange('search', e.target.value)} className="input-field pl-9" />
          </div>
          <select value={filters.type} onChange={e => handleFilterChange('type', e.target.value)} className="input-field">
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filters.category} onChange={e => handleFilterChange('category', e.target.value)} className="input-field">
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
          </select>
          <select value={filters.dateRange} onChange={e => handleFilterChange('dateRange', e.target.value)} className="input-field">
            <option value="all">All Time</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="180d">Last 180 Days</option>
          </select>
        </div>

        {/* Active chips */}
        {(filters.search || filters.type !== 'all' || filters.category !== 'all' || filters.dateRange !== 'all') && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">Filters:</span>
            {filters.search && (
              <span className="flex items-center gap-1 rounded-full border border-gold-200 bg-gold-50 px-2.5 py-1 text-xs text-gold-700 dark:border-gold-500/20 dark:bg-gold-500/10 dark:text-gold-400">
                "{filters.search}"
                <button onClick={() => handleFilterChange('search', '')} className="hover:text-gold-500">×</button>
              </span>
            )}
            {filters.type !== 'all' && (
              <span className="flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs capitalize text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                {filters.type}
                <button onClick={() => handleFilterChange('type', 'all')}>×</button>
              </span>
            )}
            {filters.category !== 'all' && (
              <span className="flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs text-purple-700 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400">
                {CATEGORIES.find(c => c.id === filters.category)?.label}
                <button onClick={() => handleFilterChange('category', 'all')}>×</button>
              </span>
            )}
            <button onClick={() => { updateFilters({ search: '', type: 'all', category: 'all', dateRange: 'all' }); setPage(1); }}
              className="text-xs text-slate-400 underline transition hover:text-slate-600 dark:hover:text-slate-200">
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-navy-800/60 dark:shadow-none opacity-0 animate-slide-up animate-delay-200" style={{ animationFillMode: 'forwards' }}>
        {/* Table head */}
        <div className="hidden border-b border-slate-100 bg-slate-50 px-5 py-3 dark:border-white/5 dark:bg-navy-900/40 sm:grid sm:grid-cols-12 sm:gap-4">
          <div className="col-span-1" />
          <div className="col-span-4"><SortButton col="description" label="Description" filters={filters} updateFilters={updateFilters} /></div>
          <div className="col-span-2"><SortButton col="date" label="Date" filters={filters} updateFilters={updateFilters} /></div>
          <div className="col-span-2"><span className="font-mono text-xs uppercase tracking-wide text-slate-400">Category</span></div>
          <div className="col-span-2"><SortButton col="amount" label="Amount" filters={filters} updateFilters={updateFilters} /></div>
          <div className="col-span-1 text-right">{isAdmin && <span className="font-mono text-xs uppercase tracking-wide text-slate-400">Actions</span>}</div>
        </div>

        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <div className="text-4xl">🔍</div>
            <p className="font-medium text-slate-500 dark:text-slate-400">No transactions match your filters</p>
            <p className="text-sm text-slate-400 dark:text-slate-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-white/3">
            {paginated.map((tx, i) => {
              const cat = CATEGORIES.find(c => c.id === tx.category);
              const isIncome = tx.type === 'income';
              return (
                <div key={tx.id}
                  className="grid grid-cols-1 gap-2 px-5 py-3.5 opacity-0 animate-fade-in transition-colors hover:bg-slate-50 dark:hover:bg-white/2 group sm:grid-cols-12 sm:gap-4"
                  style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'forwards' }}
                >
                  {/* Mobile */}
                  <div className="flex items-center gap-3 sm:hidden">
                    <div className={clsx('flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-base',
                      isIncome ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-slate-100 dark:bg-white/5'
                    )}>{cat?.icon || '💳'}</div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{tx.description}</p>
                      <p className="font-mono text-xs text-slate-400">{fmtDate(tx.date)} · {cat?.label}</p>
                    </div>
                    <div className="text-right">
                      <p className={clsx('font-mono text-sm font-semibold', isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
                        {isIncome ? '+' : '-'}{fmt(tx.amount)}
                      </p>
                      {isAdmin && (
                        <div className="mt-1 flex justify-end gap-2">
                          <button onClick={() => setModal(tx)} className="text-slate-400 transition hover:text-gold-600 dark:hover:text-gold-400"><Pencil size={12} /></button>
                          <button onClick={() => setDeleteConfirm(tx.id)} className="text-slate-400 transition hover:text-rose-500"><Trash2 size={12} /></button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Desktop */}
                  <div className="col-span-1 hidden items-center sm:flex">
                    <div className={clsx('flex h-8 w-8 items-center justify-center rounded-lg text-sm',
                      isIncome ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-slate-100 dark:bg-white/5'
                    )}>{cat?.icon || '💳'}</div>
                  </div>
                  <div className="col-span-4 hidden items-center sm:flex">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{tx.description}</p>
                      <p className="font-mono text-xs text-slate-400 dark:text-slate-500">{tx.account}</p>
                    </div>
                  </div>
                  <div className="col-span-2 hidden items-center sm:flex">
                    <p className="font-mono text-sm text-slate-500 dark:text-slate-400">{fmtDate(tx.date)}</p>
                  </div>
                  <div className="col-span-2 hidden items-center sm:flex">
                    <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                      style={{ backgroundColor: `${cat?.color}18`, color: cat?.color }}>
                      {cat?.icon} {cat?.label}
                    </span>
                  </div>
                  <div className="col-span-2 hidden items-center sm:flex">
                    <div className="flex items-center gap-1.5">
                      {isIncome ? <ArrowUpRight size={13} className="text-emerald-500" /> : <ArrowDownLeft size={13} className="text-rose-400" />}
                      <p className={clsx('font-mono text-sm font-semibold', isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
                        {isIncome ? '+' : '-'}{fmt(tx.amount)}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 hidden items-center justify-end gap-1.5 sm:flex">
                    {isAdmin && (
                      <div className="flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                        <button onClick={() => setModal(tx)} title="Edit"
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-gold-50 hover:text-gold-600 dark:hover:bg-gold-500/10 dark:hover:text-gold-400">
                          <Pencil size={13} />
                        </button>
                        <button onClick={() => setDeleteConfirm(tx.id)} title="Delete"
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 dark:border-white/5">
            <p className="font-mono text-xs text-slate-400 dark:text-slate-500">Page {page} of {totalPages} · {filtered.length} results</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="rounded-lg p-1.5 text-slate-400 transition hover:text-slate-700 disabled:opacity-30 dark:hover:text-white">
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={clsx('h-7 w-7 rounded-lg font-mono text-xs transition',
                    page === p
                      ? 'bg-gold-100 text-gold-700 dark:bg-gold-500/20 dark:text-gold-400'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
                  )}>{p}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="rounded-lg p-1.5 text-slate-400 transition hover:text-slate-700 disabled:opacity-30 dark:hover:text-white">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {modal && <TransactionModal transaction={modal === 'add' ? null : modal} onClose={() => setModal(null)} />}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-navy-950/80" onClick={() => setDeleteConfirm(null)} />
          <div className="relative w-full max-w-sm animate-slide-up rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-rose-500/20 dark:bg-navy-800">
            <h3 className="mb-2 font-display text-lg font-semibold text-slate-900 dark:text-white">Delete Transaction?</h3>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">This action cannot be undone. The transaction will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn-ghost flex-1 justify-center">Cancel</button>
              <button onClick={() => { deleteTransaction(deleteConfirm); setDeleteConfirm(null); }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
