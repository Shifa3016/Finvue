'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MONTHLY_SUMMARY } from '@/data/mockData';

function formatK(val) { return `$${(val / 1000).toFixed(1)}k`; }

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-[140px] rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg dark:border-white/10 dark:bg-navy-800/95">
      <p className="label-text mb-2">{label} 2024</p>
      {payload.map((p) => (
        <div key={p.name} className="mb-1 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: p.fill }} />
            <span className="text-xs capitalize text-slate-500 dark:text-slate-400">{p.name}</span>
          </div>
          <span className="font-mono text-xs text-slate-800 dark:text-white">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function MonthlyComparisonChart() {
  return (
    <div className="section-card h-full">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="label-text mb-0.5">Monthly Comparison</p>
          <p className="section-title">Income vs Expenses</p>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs">
          <span className="flex items-center gap-1.5 text-slate-400"><span className="h-2 w-2 rounded-sm bg-emerald-400" />Income</span>
          <span className="flex items-center gap-1.5 text-slate-400"><span className="h-2 w-2 rounded-sm bg-rose-400" />Expenses</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={MONTHLY_SUMMARY} margin={{ top: 8, right: 4, left: -20, bottom: 0 }} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'var(--font-dm-mono)' }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={formatK} tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'var(--font-dm-mono)' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100,116,139,0.07)' }} />
          <Bar dataKey="income" fill="#34d399" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" fill="#fb7185" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
