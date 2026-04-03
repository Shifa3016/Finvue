'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { BALANCE_TREND } from '@/data/mockData';

function formatK(val) { return `$${(val / 1000).toFixed(0)}k`; }

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg dark:border-gold-500/20 dark:bg-navy-800/95">
      <p className="label-text mb-1">{label}</p>
      <p className="font-mono text-lg font-semibold text-gold-600 dark:text-gold-300">
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(payload[0].value)}
      </p>
    </div>
  );
};

export default function BalanceTrendChart() {
  return (
    <div className="section-card h-full">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="label-text mb-0.5">Balance Trend</p>
          <p className="section-title">6-Month Overview</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gold-400" />
          <span className="font-mono text-xs text-slate-400 dark:text-slate-500">2024</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={BALANCE_TREND} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#fbbf24" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
          <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'var(--font-dm-mono)' }} axisLine={false} tickLine={false} interval={2} />
          <YAxis tickFormatter={formatK} tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'var(--font-dm-mono)' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="balance" stroke="#f59e0b" strokeWidth={2} fill="url(#balanceGrad)" dot={false} activeDot={{ r: 5, fill: '#fbbf24', stroke: '#fff', strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
