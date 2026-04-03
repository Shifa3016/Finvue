'use client';

import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';

export default function AppShell({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-50 bg-grid-light dark:bg-navy-950 dark:bg-grid-dark">
      {/* Ambient glow — visible in dark only */}
      <div className="pointer-events-none fixed left-64 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/5 blur-3xl dark:block hidden" />
      <div className="pointer-events-none fixed right-0 bottom-0 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl dark:block hidden" />

      <Sidebar />
      <MobileHeader />

      <main className="lg:ml-64 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
