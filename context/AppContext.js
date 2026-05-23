'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TRANSACTIONS } from '@/data/mockData';

const AppContext = createContext(null);

export const ROLES = {
  VIEWER: 'viewer',
  ADMIN: 'admin',
};

const STORAGE_KEY = 'financial_analytics_platform_v4';

function loadFromStorage() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

// Read dark mode synchronously on first client render so the toggle
// button label is correct immediately without waiting for useEffect.
function getInitialDarkMode() {
  if (typeof window === 'undefined') return true;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (typeof parsed.darkMode === 'boolean') return parsed.darkMode;
    }
  } catch { }
  return true; // default: dark
}

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(TRANSACTIONS);
  const [role, setRole] = useState(ROLES.ADMIN);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date',
    sortDir: 'desc',
    dateRange: 'all',
  });
  const [darkMode, setDarkModeState] = useState(getInitialDarkMode);
  const [hydrated, setHydrated] = useState(false);

  // Wrap setDarkMode so it also updates <html> class immediately
  const setDarkMode = useCallback((value) => {
    setDarkModeState(value);
    if (value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Load full persisted state on mount
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      if (saved.transactions) setTransactions(saved.transactions);
      if (saved.role) setRole(saved.role);
      // darkMode already handled by getInitialDarkMode + inline script in layout
    }
    setHydrated(true);
  }, []);

  // Persist state whenever it changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ transactions, role, darkMode }));
    } catch { }
  }, [transactions, role, darkMode, hydrated]);

  const addTransaction = useCallback((tx) => {
    setTransactions(prev => [{ ...tx, id: `t${Date.now()}` }, ...prev]);
  }, []);

  const editTransaction = useCallback((id, updates) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const resetData = useCallback(() => {
    setTransactions(TRANSACTIONS);
  }, []);

  const updateFilters = useCallback((updates) => {
    setFilters(prev => ({ ...prev, ...updates }));
  }, []);

  const getFilteredTransactions = useCallback(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.account.toLowerCase().includes(q)
      );
    }

    if (filters.type !== 'all') result = result.filter(t => t.type === filters.type);
    if (filters.category !== 'all') result = result.filter(t => t.category === filters.category);

    if (filters.dateRange !== 'all') {
      const now = new Date();
      const days = { '30d': 30, '90d': 90, '180d': 180 }[filters.dateRange];
      if (days) {
        const cutoff = new Date(now);
        cutoff.setDate(cutoff.getDate() - days);
        result = result.filter(t => new Date(t.date) >= cutoff);
      }
    }

    result.sort((a, b) => {
      let valA, valB;
      switch (filters.sortBy) {
        case 'date': valA = new Date(a.date); valB = new Date(b.date); break;
        case 'amount': valA = Math.abs(a.amount); valB = Math.abs(b.amount); break;
        case 'description': valA = a.description.toLowerCase(); valB = b.description.toLowerCase(); break;
        default: valA = new Date(a.date); valB = new Date(b.date);
      }
      if (filters.sortDir === 'asc') return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });

    return result;
  }, [transactions, filters]);

  return (
    <AppContext.Provider value={{
      transactions,
      role,
      setRole,
      filters,
      updateFilters,
      darkMode,
      setDarkMode,
      addTransaction,
      editTransaction,
      deleteTransaction,
      resetData,
      getFilteredTransactions,
      isAdmin: role === ROLES.ADMIN,
      hydrated,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
