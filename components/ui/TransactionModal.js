'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/data/mockData';
import { X, Plus, Save } from 'lucide-react';

const ACCOUNTS = ['Main Account', 'Credit Card', 'Brokerage', 'Savings'];

export default function TransactionModal({ transaction, onClose }) {
  const { addTransaction, editTransaction } = useApp();
  const isEdit = !!transaction;

  const [form, setForm] = useState({
    description: '', amount: '', category: 'food',
    type: 'expense', date: new Date().toISOString().split('T')[0], account: 'Main Account',
    ...transaction,
    amount: transaction ? Math.abs(transaction.amount).toString() : '',
  });
  const [error, setError] = useState('');

  function handleChange(key, val) { setForm(p => ({ ...p, [key]: val })); setError(''); }

  function handleSubmit() {
    if (!form.description.trim()) return setError('Description is required.');
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      return setError('Enter a valid positive amount.');
    const amount = form.type === 'expense' ? -Math.abs(Number(form.amount)) : Math.abs(Number(form.amount));
    if (isEdit) editTransaction(transaction.id, { ...form, amount });
    else addTransaction({ ...form, amount });
    onClose();
  }

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-navy-950/80" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl animate-slide-up dark:border-white/10 dark:bg-navy-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-white/5">
          <div>
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
              {isEdit ? 'Edit Transaction' : 'New Transaction'}
            </h2>
            <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
              {isEdit ? 'Update transaction details' : 'Add a new transaction to your records'}
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 p-6">
          {/* Type */}
          <div>
            <label className="label-text mb-2 block">Type</label>
            <div className="flex gap-2">
              {['income', 'expense'].map(t => (
                <button key={t} onClick={() => handleChange('type', t)}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-medium capitalize transition-all ${
                    form.type === t
                      ? t === 'income'
                        ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:ring-emerald-500/30'
                        : 'bg-rose-100 text-rose-700 ring-1 ring-rose-300 dark:bg-rose-500/20 dark:text-rose-400 dark:ring-rose-500/30'
                      : 'bg-slate-100 text-slate-500 hover:text-slate-700 dark:bg-navy-900/50 dark:text-slate-500 dark:hover:text-slate-300'
                  }`}>{t}</button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="label-text mb-2 block">Description</label>
            <input type="text" value={form.description} onChange={e => handleChange('description', e.target.value)}
              placeholder="e.g. Monthly Salary, Amazon Purchase..." className="input-field" />
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-text mb-2 block">Amount (USD)</label>
              <input type="number" value={form.amount} onChange={e => handleChange('amount', e.target.value)}
                placeholder="0.00" min="0" step="0.01" className="input-field" />
            </div>
            <div>
              <label className="label-text mb-2 block">Date</label>
              <input type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} className="input-field" />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="label-text mb-2 block">Category</label>
            <select value={form.category} onChange={e => handleChange('category', e.target.value)} className="input-field">
              {CATEGORIES.filter(c => form.type === 'income' ? ['income','investment'].includes(c.id) : !['income'].includes(c.id))
                .map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
            </select>
          </div>

          {/* Account */}
          <div>
            <label className="label-text mb-2 block">Account</label>
            <select value={form.account} onChange={e => handleChange('account', e.target.value)} className="input-field">
              {ACCOUNTS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          {error && (
            <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button onClick={onClose} className="btn-ghost flex-1 justify-center">Cancel</button>
          <button onClick={handleSubmit} className="btn-primary flex-1 justify-center">
            {isEdit ? <Save size={15} /> : <Plus size={15} />}
            {isEdit ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}
