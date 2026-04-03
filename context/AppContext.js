'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TRANSACTIONS } from '@/data/mockData';

const AppContext = createContext(null);

export const ROLES = {
  VIEWER: 'viewer',
  ADMIN: 'admin',
};

const STORAGE_KEY = 'finance_dashboard_state';

function loadFromStorage() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
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
  const [darkMode, setDarkMode] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      if (saved.transactions) setTransactions(saved.transactions);
      if (saved.role) setRole(saved.role);
      if (saved.darkMode !== undefined) setDarkMode(saved.darkMode);
    }
    setHydrated(true);
  }, []);

  // Persist state
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ transactions, role, darkMode }));
    } catch {}
  }, [transactions, role, darkMode, hydrated]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTransaction = useCallback((tx) => {
    setTransactions(prev => [
      { ...tx, id: `t${Date.now()}` },
      ...prev,
    ]);
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

    if (filters.type !== 'all') {
      result = result.filter(t => t.type === filters.type);
    }

    if (filters.category !== 'all') {
      result = result.filter(t => t.category === filters.category);
    }

    if (filters.dateRange !== 'all') {
      const now = new Date('2024-06-30');
      const ranges = {
        '30d': 30,
        '90d': 90,
        '180d': 180,
      };
      const days = ranges[filters.dateRange];
      if (days) {
        const cutoff = new Date(now);
        cutoff.setDate(cutoff.getDate() - days);
        result = result.filter(t => new Date(t.date) >= cutoff);
      }
    }

    result.sort((a, b) => {
      let valA, valB;
      switch (filters.sortBy) {
        case 'date':
          valA = new Date(a.date);
          valB = new Date(b.date);
          break;
        case 'amount':
          valA = Math.abs(a.amount);
          valB = Math.abs(b.amount);
          break;
        case 'description':
          valA = a.description.toLowerCase();
          valB = b.description.toLowerCase();
          break;
        default:
          valA = new Date(a.date);
          valB = new Date(b.date);
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
