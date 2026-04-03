'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { computeSpendingByCategory } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg dark:border-white/10 dark:bg-navy-800/95">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-base">{d.icon}</span>
        <p className="text-sm font-medium text-slate-800 dark:text-white">{d.label}</p>
      </div>
      <p className="font-mono font-semibold text-gold-600 dark:text-gold-300">
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(d.amount)}
      </p>
    </div>
  );
};

export default function SpendingBreakdown() {
  const { transactions } = useApp();
  const data = computeSpendingByCategory(transactions).slice(0, 7);
  const total = data.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="section-card h-full">
      <div className="mb-5">
        <p className="label-text mb-0.5">Category Breakdown</p>
        <p className="section-title">Spending Distribution</p>
      </div>
      <div className="flex items-center gap-6">
        {/* Donut */}
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={150} height={150}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={44} outerRadius={68} paddingAngle={2} dataKey="amount" strokeWidth={0}>
                {data.map((entry) => <Cell key={entry.id} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500">Total</p>
            <p className="font-mono text-sm font-bold text-slate-800 dark:text-white">${(total / 1000).toFixed(1)}k</p>
          </div>
        </div>
        {/* Legend */}
        <div className="flex-1 min-w-0 space-y-2">
          {data.map((item) => {
            const pct = ((item.amount / total) * 100).toFixed(1);
            return (
              <div key={item.id} className="flex items-center gap-2">
                <span className="flex-shrink-0 text-sm">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="mb-0.5 flex items-center justify-between">
                    <p className="truncate text-xs text-slate-600 dark:text-slate-300">{item.label}</p>
                    <p className="ml-2 flex-shrink-0 font-mono text-xs text-slate-400 dark:text-slate-400">{pct}%</p>
                  </div>
                  <div className="h-1 w-full rounded-full bg-slate-100 dark:bg-navy-700">
                    <div className="h-1 rounded-full" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
