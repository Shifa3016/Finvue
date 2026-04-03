'use client';

import { useApp } from '@/context/AppContext';
import { computeSummary } from '@/data/mockData';
import AppShell from '@/components/layout/AppShell';
import SummaryCard from '@/components/ui/SummaryCard';
import BalanceTrendChart from '@/components/charts/BalanceTrendChart';
import SpendingBreakdown from '@/components/charts/SpendingBreakdown';
import MonthlyComparisonChart from '@/components/charts/MonthlyComparisonChart';
import RecentTransactions from '@/components/ui/RecentTransactions';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, Shield, Eye } from 'lucide-react';

export default function DashboardPage() {
  const { transactions, isAdmin } = useApp();
  const summary = computeSummary(transactions);

  const today = new Date('2024-06-30').toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <AppShell>
      {/* Header */}
      <div className="mb-8 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="label-text mb-1">{today}</p>
            <h1 className="page-title">Financial Overview</h1>
            <p className="page-subtitle">Your complete financial snapshot for 2024</p>
          </div>
          <div className={`self-start rounded-xl border px-4 py-2.5 text-sm font-medium sm:self-auto flex items-center gap-2 ${
            isAdmin
              ? 'border-gold-200 bg-gold-50 text-gold-700 dark:border-gold-500/20 dark:bg-gold-500/10 dark:text-gold-400'
              : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-white/5 dark:bg-slate-700/30 dark:text-slate-400'
          }`}>
            {isAdmin ? <Shield size={15} /> : <Eye size={15} />}
            {isAdmin ? 'Admin View' : 'Viewer Mode'}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SummaryCard title="Total Balance"  value={summary.balance}       change={12.4} changeLabel="vs last period" icon={Wallet}      variant="gold"    delay={0}   />
        <SummaryCard title="Total Income"   value={summary.totalIncome}   change={8.2}  changeLabel="vs last period" icon={TrendingUp}  variant="income"  delay={100} />
        <SummaryCard title="Total Expenses" value={summary.totalExpenses} change={-3.1} changeLabel="vs last period" icon={TrendingDown} variant="expense" delay={200} />
        <SummaryCard title="Savings Rate"   value={`${summary.savingsRate}%`} change={2.1} changeLabel="of total income" icon={PiggyBank} variant="default" delay={300} />
      </div>

      {/* Charts row 1 */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3 opacity-0 animate-slide-up animate-delay-400" style={{ animationFillMode: 'forwards' }}>
          <BalanceTrendChart />
        </div>
        <div className="lg:col-span-2 opacity-0 animate-slide-up animate-delay-500" style={{ animationFillMode: 'forwards' }}>
          <SpendingBreakdown />
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2 opacity-0 animate-slide-up animate-delay-500" style={{ animationFillMode: 'forwards' }}>
          <MonthlyComparisonChart />
        </div>
        <div className="lg:col-span-3 opacity-0 animate-slide-up animate-delay-600" style={{ animationFillMode: 'forwards' }}>
          <RecentTransactions />
        </div>
      </div>
    </AppShell>
  );
}
