'use client';

import { useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { CATEGORIES, MONTHLY_SUMMARY, computeSpendingByCategory } from '@/data/mockData';
import AppShell from '@/components/layout/AppShell';
import MonthlyComparisonChart from '@/components/charts/MonthlyComparisonChart';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import {
  TrendingUp, TrendingDown, AlertTriangle, Award,
  Target, Zap, ArrowUp, ArrowDown, Minus,
  PiggyBank, BarChart3,
} from 'lucide-react';
import clsx from 'clsx';

function fmt(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
}

function InsightCard({ icon: Icon, title, value, subtitle, trend, color = 'gold', delay = 0 }) {
  const colors = {
    gold:    { wrap: 'border-gold-200    bg-gold-50    dark:border-gold-500/20    dark:bg-gold-500/10',    icon: 'bg-gold-100    text-gold-600    dark:bg-white/5 dark:text-gold-400',    val: 'text-gold-700    dark:text-gold-300'    },
    emerald: { wrap: 'border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10', icon: 'bg-emerald-100 text-emerald-600 dark:bg-white/5 dark:text-emerald-400', val: 'text-emerald-700 dark:text-emerald-300' },
    rose:    { wrap: 'border-rose-200    bg-rose-50    dark:border-rose-500/20    dark:bg-rose-500/10',    icon: 'bg-rose-100    text-rose-600    dark:bg-white/5 dark:text-rose-400',    val: 'text-rose-700    dark:text-rose-300'    },
    purple:  { wrap: 'border-purple-200  bg-purple-50  dark:border-purple-500/20  dark:bg-purple-500/10',  icon: 'bg-purple-100  text-purple-600  dark:bg-white/5 dark:text-purple-400',  val: 'text-purple-700  dark:text-purple-300'  },
  };
  const c = colors[color];
  return (
    <div className={clsx('rounded-2xl border p-5 shadow-sm opacity-0 animate-slide-up', c.wrap)}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}>
      <div className="mb-3 flex items-start justify-between">
        <div className={clsx('flex h-10 w-10 items-center justify-center rounded-xl', c.icon)}><Icon size={18} /></div>
        {trend !== undefined && (
          <div className={clsx('flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
            trend > 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                      : trend < 0 ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                                  : 'bg-slate-100 text-slate-500 dark:bg-slate-700/50 dark:text-slate-400'
          )}>
            {trend > 0 ? <ArrowUp size={10} /> : trend < 0 ? <ArrowDown size={10} /> : <Minus size={10} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className="label-text mb-1">{title}</p>
      <p className={clsx('font-mono text-xl font-bold leading-tight mb-1', c.val)}>{value}</p>
      {subtitle && <p className="text-xs text-slate-400 dark:text-slate-500">{subtitle}</p>}
    </div>
  );
}

function ObservationCard({ type, title, description, delay = 0 }) {
  const configs = {
    warning: { icon: AlertTriangle, wrap: 'border-amber-200   bg-amber-50   dark:border-amber-500/15  dark:bg-amber-500/8',   ic: 'text-amber-600   dark:text-amber-400'   },
    success: { icon: Award,         wrap: 'border-emerald-200 bg-emerald-50 dark:border-emerald-500/15 dark:bg-emerald-500/8', ic: 'text-emerald-600 dark:text-emerald-400' },
    info:    { icon: Zap,           wrap: 'border-blue-200    bg-blue-50    dark:border-blue-500/15    dark:bg-blue-500/8',    ic: 'text-blue-600    dark:text-blue-400'    },
    tip:     { icon: Target,        wrap: 'border-purple-200  bg-purple-50  dark:border-purple-500/15  dark:bg-purple-500/8',  ic: 'text-purple-600  dark:text-purple-400'  },
  };
  const c = configs[type] || configs.info;
  const Icon = c.icon;
  return (
    <div className={clsx('flex gap-4 rounded-2xl border p-4 shadow-sm opacity-0 animate-slide-in-right', c.wrap)}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}>
      <div className={clsx('mt-0.5 flex-shrink-0', c.ic)}><Icon size={17} /></div>
      <div>
        <p className="mb-1 text-sm font-semibold text-slate-800 dark:text-slate-200">{title}</p>
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-500">{description}</p>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  const { transactions } = useApp();

  const insights = useMemo(() => {
    const spending = computeSpendingByCategory(transactions);
    const income   = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
    const savingsRate = income > 0 ? (income - expenses) / income * 100 : 0;
    const topCategory = spending[0];
    const avgMonthlyExpense = MONTHLY_SUMMARY.reduce((s, m) => s + m.expenses, 0) / MONTHLY_SUMMARY.length;
    const avgMonthlyIncome  = MONTHLY_SUMMARY.reduce((s, m) => s + m.income, 0)  / MONTHLY_SUMMARY.length;
    const bestMonth  = [...MONTHLY_SUMMARY].sort((a, b) => b.balance - a.balance)[0];
    const last = MONTHLY_SUMMARY[MONTHLY_SUMMARY.length - 1];
    const prev = MONTHLY_SUMMARY[MONTHLY_SUMMARY.length - 2];
    const expenseChange = prev.expenses > 0 ? (((last.expenses - prev.expenses) / prev.expenses) * 100).toFixed(1) : 0;
    const largestExpense = [...transactions].filter(t => t.type === 'expense').sort((a,b) => Math.abs(b.amount)-Math.abs(a.amount))[0];
    const radarData = spending.slice(0, 6).map(s => ({ category: s.label.split(' ')[0], amount: Math.round(s.amount), fullMark: spending[0].amount }));
    const totalInvested = transactions.filter(t => t.category === 'investment').reduce((s, t) => s + Math.abs(t.amount), 0);
    return { spending, income, expenses, savingsRate, topCategory, avgMonthlyExpense, avgMonthlyIncome, bestMonth, expenseChange, largestExpense, radarData, totalInvested };
  }, [transactions]);

  const observations = [
    {
      type: insights.savingsRate >= 30 ? 'success' : insights.savingsRate >= 20 ? 'info' : 'warning',
      title: `${insights.savingsRate >= 30 ? '🎯 Excellent' : insights.savingsRate >= 20 ? '📊 Good' : '⚠️ Low'} Savings Rate — ${insights.savingsRate.toFixed(1)}%`,
      description: insights.savingsRate >= 30 ? "You're saving more than 30% of your income — a stellar financial habit. Keep it up!" : insights.savingsRate >= 20 ? "You're saving a healthy 20%+ of income. Consider automating transfers to boost this further." : "Your savings rate is below 20%. Try identifying discretionary expenses to cut.",
    },
    {
      type: 'warning',
      title: `🛒 Top Spending: ${insights.topCategory?.label}`,
      description: `${insights.topCategory?.label} is your biggest expense at ${fmt(insights.topCategory?.amount || 0)} total (${((insights.topCategory?.amount / insights.expenses) * 100).toFixed(1)}% of all expenses).`,
    },
    {
      type: Number(insights.expenseChange) > 10 ? 'warning' : 'success',
      title: `${Number(insights.expenseChange) > 0 ? '📈 Expenses Up' : '📉 Expenses Down'} ${Math.abs(insights.expenseChange)}% Last Month`,
      description: Number(insights.expenseChange) > 10 ? `June spending jumped ${insights.expenseChange}% compared to May. Vacation and AC costs were major contributors.` : `Great discipline! You reduced expenses by ${Math.abs(insights.expenseChange)}% vs the prior month.`,
    },
    {
      type: 'tip',
      title: '💡 Investment Consistency',
      description: `You've invested ${fmt(insights.totalInvested)} across ETFs this period. Consistent monthly investments compound significantly over time.`,
    },
    {
      type: 'info',
      title: `🏆 Best Month: ${insights.bestMonth?.month}`,
      description: `${insights.bestMonth?.month} was your strongest month with ${fmt(insights.bestMonth?.balance)} in net savings (${fmt(insights.bestMonth?.income)} income, ${fmt(insights.bestMonth?.expenses)} expenses).`,
    },
    {
      type: 'info',
      title: `💳 Largest Single Expense`,
      description: insights.largestExpense
        ? `Your biggest expense was "${insights.largestExpense.description}" at ${fmt(Math.abs(insights.largestExpense.amount))} on ${new Date(insights.largestExpense.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.`
        : 'No expense data available.',
    },
  ];

  return (
    <AppShell>
      <div className="mb-8 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
        <p className="label-text mb-1">Analytics</p>
        <h1 className="page-title">Insights</h1>
        <p className="page-subtitle">Smart observations and patterns from your financial data</p>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <InsightCard icon={TrendingUp}   title="Avg Monthly Income"  value={fmt(insights.avgMonthlyIncome)}  subtitle="Based on 6 months"       trend={8.2}  color="emerald" delay={0}   />
        <InsightCard icon={TrendingDown} title="Avg Monthly Spend"   value={fmt(insights.avgMonthlyExpense)} subtitle="Based on 6 months"       trend={-3.1} color="rose"    delay={100} />
        <InsightCard icon={PiggyBank}    title="Savings Rate"        value={`${insights.savingsRate.toFixed(1)}%`} subtitle="Income kept as savings" trend={2.1}  color="gold"    delay={200} />
        <InsightCard icon={BarChart3}    title="Total Invested"      value={fmt(insights.totalInvested)}     subtitle="ETF contributions"                    color="purple"  delay={300} />
      </div>

      {/* Charts */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3 opacity-0 animate-slide-up animate-delay-300" style={{ animationFillMode: 'forwards' }}>
          <MonthlyComparisonChart />
        </div>
        {/* Radar */}
        <div className="section-card lg:col-span-2 opacity-0 animate-slide-up animate-delay-400" style={{ animationFillMode: 'forwards' }}>
          <div className="mb-4">
            <p className="label-text mb-0.5">Spending Profile</p>
            <p className="section-title">Category Radar</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={insights.radarData} margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
              <PolarGrid stroke="rgba(100,116,139,0.2)" />
              <PolarAngleAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'var(--font-dm-mono)' }} />
              <Radar name="Spending" dataKey="amount" stroke="#f59e0b" fill="#fbbf24" fillOpacity={0.15} strokeWidth={1.5} />
              <Tooltip
                formatter={(v) => [fmt(v), 'Spent']}
                contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '12px', color: '#1e293b' }}
                wrapperClassName="dark:[&_.recharts-tooltip-wrapper]:![background:#0d1a30] dark:[&_.recharts-tooltip-wrapper]:![border-color:rgba(251,191,36,0.2)]"
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rankings + Monthly balance */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Top categories */}
        <div className="section-card opacity-0 animate-slide-up animate-delay-400" style={{ animationFillMode: 'forwards' }}>
          <div className="mb-4">
            <p className="label-text mb-0.5">Spending Rank</p>
            <p className="section-title">Top Categories</p>
          </div>
          <div className="space-y-3">
            {insights.spending.slice(0, 6).map((cat, i) => {
              const pct = ((cat.amount / insights.expenses) * 100).toFixed(1);
              const medals = ['🥇','🥈','🥉'];
              return (
                <div key={cat.id} className="flex items-center gap-3">
                  <span className="w-6 flex-shrink-0 text-center text-sm">
                    {medals[i] || <span className="font-mono text-xs text-slate-400 dark:text-slate-500">#{i+1}</span>}
                  </span>
                  <span className="text-base">{cat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex justify-between">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{cat.label}</span>
                      <span className="font-mono text-xs text-slate-400">{fmt(cat.amount)}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-navy-700">
                      <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: cat.color }} />
                    </div>
                  </div>
                  <span className="w-10 flex-shrink-0 text-right font-mono text-xs text-slate-400 dark:text-slate-500">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly net */}
        <div className="section-card opacity-0 animate-slide-up animate-delay-500" style={{ animationFillMode: 'forwards' }}>
          <div className="mb-4">
            <p className="label-text mb-0.5">Period Performance</p>
            <p className="section-title">Monthly Net Savings</p>
          </div>
          <div className="space-y-2.5">
            {MONTHLY_SUMMARY.map((month) => {
              const max = Math.max(...MONTHLY_SUMMARY.map(m => m.balance));
              const pct = (month.balance / max) * 100;
              return (
                <div key={month.month} className="flex items-center gap-3">
                  <span className="w-8 flex-shrink-0 font-mono text-xs text-slate-400 dark:text-slate-500">{month.month}</span>
                  <div className="h-6 flex-1 overflow-hidden rounded-lg bg-slate-100 dark:bg-navy-700">
                    <div className={clsx('h-full rounded-lg', month.balance > 0 ? 'bg-emerald-200 dark:bg-emerald-500/40' : 'bg-rose-200 dark:bg-rose-500/40')}
                      style={{ width: `${Math.max(pct, 5)}%` }} />
                  </div>
                  <span className={clsx('w-20 flex-shrink-0 text-right font-mono text-xs',
                    month.balance > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  )}>{fmt(month.balance)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Observations */}
      <div className="opacity-0 animate-slide-up animate-delay-500" style={{ animationFillMode: 'forwards' }}>
        <div className="mb-4">
          <p className="label-text mb-0.5">AI Observations</p>
          <p className="font-display text-lg font-semibold text-slate-800 dark:text-white">Smart Financial Insights</p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {observations.map((obs, i) => <ObservationCard key={i} {...obs} delay={i * 80} />)}
        </div>
      </div>
    </AppShell>
  );
}
