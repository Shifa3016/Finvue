// data/mockData.js

export const CATEGORIES = [
  { id: 'housing', label: 'Housing', color: '#fbbf24', icon: '🏠' },
  { id: 'food', label: 'Food & Dining', color: '#34d399', icon: '🍽️' },
  { id: 'transport', label: 'Transport', color: '#60a5fa', icon: '🚗' },
  { id: 'entertainment', label: 'Entertainment', color: '#a78bfa', icon: '🎬' },
  { id: 'health', label: 'Health', color: '#fb7185', icon: '💊' },
  { id: 'shopping', label: 'Shopping', color: '#f97316', icon: '🛍️' },
  { id: 'utilities', label: 'Utilities', color: '#22d3ee', icon: '⚡' },
  { id: 'income', label: 'Income', color: '#10b981', icon: '💰' },
  { id: 'investment', label: 'Investment', color: '#818cf8', icon: '📈' },
  { id: 'education', label: 'Education', color: '#e879f9', icon: '📚' },
];

export const TRANSACTIONS = [
  // January
  { id: 't001', date: '2024-01-02', description: 'Monthly Salary', amount: 5500, category: 'income', type: 'income', account: 'Main Account' },
  { id: 't002', date: '2024-01-03', description: 'Rent Payment', amount: -1800, category: 'housing', type: 'expense', account: 'Main Account' },
  { id: 't003', date: '2024-01-05', description: 'Whole Foods Market', amount: -145.30, category: 'food', type: 'expense', account: 'Credit Card' },
  { id: 't004', date: '2024-01-07', description: 'Netflix Subscription', amount: -15.99, category: 'entertainment', type: 'expense', account: 'Credit Card' },
  { id: 't005', date: '2024-01-08', description: 'Uber Ride', amount: -23.50, category: 'transport', type: 'expense', account: 'Credit Card' },
  { id: 't006', date: '2024-01-10', description: 'Electric Bill', amount: -92.00, category: 'utilities', type: 'expense', account: 'Main Account' },
  { id: 't007', date: '2024-01-12', description: 'Amazon Purchase', amount: -78.99, category: 'shopping', type: 'expense', account: 'Credit Card' },
  { id: 't008', date: '2024-01-14', description: 'Gym Membership', amount: -49.00, category: 'health', type: 'expense', account: 'Credit Card' },
  { id: 't009', date: '2024-01-15', description: 'Freelance Project', amount: 850, category: 'income', type: 'income', account: 'Main Account' },
  { id: 't010', date: '2024-01-17', description: 'Restaurant - Dinner', amount: -67.40, category: 'food', type: 'expense', account: 'Credit Card' },
  { id: 't011', date: '2024-01-19', description: 'ETF Investment', amount: -500, category: 'investment', type: 'expense', account: 'Brokerage' },
  { id: 't012', date: '2024-01-22', description: 'Gas Station', amount: -54.00, category: 'transport', type: 'expense', account: 'Credit Card' },
  { id: 't013', date: '2024-01-25', description: 'Spotify Premium', amount: -9.99, category: 'entertainment', type: 'expense', account: 'Credit Card' },
  { id: 't014', date: '2024-01-28', description: 'Doctor Visit Copay', amount: -30.00, category: 'health', type: 'expense', account: 'Main Account' },
  { id: 't015', date: '2024-01-30', description: 'Online Course', amount: -199.00, category: 'education', type: 'expense', account: 'Credit Card' },

  // February
  { id: 't016', date: '2024-02-01', description: 'Monthly Salary', amount: 5500, category: 'income', type: 'income', account: 'Main Account' },
  { id: 't017', date: '2024-02-03', description: 'Rent Payment', amount: -1800, category: 'housing', type: 'expense', account: 'Main Account' },
  { id: 't018', date: '2024-02-05', description: 'Trader Joe\'s', amount: -112.45, category: 'food', type: 'expense', account: 'Credit Card' },
  { id: 't019', date: '2024-02-08', description: 'Valentine\'s Dinner', amount: -120.00, category: 'food', type: 'expense', account: 'Credit Card' },
  { id: 't020', date: '2024-02-10', description: 'Movie Tickets', amount: -42.00, category: 'entertainment', type: 'expense', account: 'Credit Card' },
  { id: 't021', date: '2024-02-12', description: 'Internet Bill', amount: -60.00, category: 'utilities', type: 'expense', account: 'Main Account' },
  { id: 't022', date: '2024-02-14', description: 'Gift Purchase', amount: -89.99, category: 'shopping', type: 'expense', account: 'Credit Card' },
  { id: 't023', date: '2024-02-15', description: 'Side Project Income', amount: 1200, category: 'income', type: 'income', account: 'Main Account' },
  { id: 't024', date: '2024-02-18', description: 'Pharmacy', amount: -38.50, category: 'health', type: 'expense', account: 'Credit Card' },
  { id: 't025', date: '2024-02-20', description: 'ETF Investment', amount: -500, category: 'investment', type: 'expense', account: 'Brokerage' },
  { id: 't026', date: '2024-02-22', description: 'Subway Pass', amount: -132.00, category: 'transport', type: 'expense', account: 'Main Account' },
  { id: 't027', date: '2024-02-25', description: 'Clothing Store', amount: -156.30, category: 'shopping', type: 'expense', account: 'Credit Card' },
  { id: 't028', date: '2024-02-27', description: 'Water Bill', amount: -45.00, category: 'utilities', type: 'expense', account: 'Main Account' },

  // March
  { id: 't029', date: '2024-03-01', description: 'Monthly Salary', amount: 5500, category: 'income', type: 'income', account: 'Main Account' },
  { id: 't030', date: '2024-03-03', description: 'Rent Payment', amount: -1800, category: 'housing', type: 'expense', account: 'Main Account' },
  { id: 't031', date: '2024-03-06', description: 'Costco Run', amount: -234.70, category: 'food', type: 'expense', account: 'Credit Card' },
  { id: 't032', date: '2024-03-08', description: 'Concert Tickets', amount: -185.00, category: 'entertainment', type: 'expense', account: 'Credit Card' },
  { id: 't033', date: '2024-03-10', description: 'Electric Bill', amount: -88.00, category: 'utilities', type: 'expense', account: 'Main Account' },
  { id: 't034', date: '2024-03-12', description: 'Car Maintenance', amount: -320.00, category: 'transport', type: 'expense', account: 'Main Account' },
  { id: 't035', date: '2024-03-15', description: 'Bonus Payment', amount: 2000, category: 'income', type: 'income', account: 'Main Account' },
  { id: 't036', date: '2024-03-17', description: 'New Shoes', amount: -129.99, category: 'shopping', type: 'expense', account: 'Credit Card' },
  { id: 't037', date: '2024-03-19', description: 'Dental Checkup', amount: -150.00, category: 'health', type: 'expense', account: 'Main Account' },
  { id: 't038', date: '2024-03-20', description: 'ETF Investment', amount: -750, category: 'investment', type: 'expense', account: 'Brokerage' },
  { id: 't039', date: '2024-03-22', description: 'Streaming Bundle', amount: -24.99, category: 'entertainment', type: 'expense', account: 'Credit Card' },
  { id: 't040', date: '2024-03-25', description: 'Grocery Store', amount: -98.40, category: 'food', type: 'expense', account: 'Credit Card' },
  { id: 't041', date: '2024-03-28', description: 'Online Bootcamp', amount: -299.00, category: 'education', type: 'expense', account: 'Credit Card' },

  // April
  { id: 't042', date: '2024-04-01', description: 'Monthly Salary', amount: 5500, category: 'income', type: 'income', account: 'Main Account' },
  { id: 't043', date: '2024-04-03', description: 'Rent Payment', amount: -1800, category: 'housing', type: 'expense', account: 'Main Account' },
  { id: 't044', date: '2024-04-05', description: 'Farmer\'s Market', amount: -65.00, category: 'food', type: 'expense', account: 'Credit Card' },
  { id: 't045', date: '2024-04-08', description: 'Uber Rides', amount: -78.30, category: 'transport', type: 'expense', account: 'Credit Card' },
  { id: 't046', date: '2024-04-10', description: 'Internet Bill', amount: -60.00, category: 'utilities', type: 'expense', account: 'Main Account' },
  { id: 't047', date: '2024-04-12', description: 'Gaming Subscription', amount: -14.99, category: 'entertainment', type: 'expense', account: 'Credit Card' },
  { id: 't048', date: '2024-04-15', description: 'Freelance Income', amount: 650, category: 'income', type: 'income', account: 'Main Account' },
  { id: 't049', date: '2024-04-17', description: 'Electronics Store', amount: -249.00, category: 'shopping', type: 'expense', account: 'Credit Card' },
  { id: 't050', date: '2024-04-19', description: 'ETF Investment', amount: -500, category: 'investment', type: 'expense', account: 'Brokerage' },
  { id: 't051', date: '2024-04-22', description: 'Grocery Store', amount: -134.20, category: 'food', type: 'expense', account: 'Credit Card' },
  { id: 't052', date: '2024-04-24', description: 'Vitamin Supplements', amount: -45.00, category: 'health', type: 'expense', account: 'Credit Card' },
  { id: 't053', date: '2024-04-26', description: 'Electric Bill', amount: -75.00, category: 'utilities', type: 'expense', account: 'Main Account' },

  // May
  { id: 't054', date: '2024-05-01', description: 'Monthly Salary', amount: 5500, category: 'income', type: 'income', account: 'Main Account' },
  { id: 't055', date: '2024-05-03', description: 'Rent Payment', amount: -1800, category: 'housing', type: 'expense', account: 'Main Account' },
  { id: 't056', date: '2024-05-05', description: 'Sushi Restaurant', amount: -89.00, category: 'food', type: 'expense', account: 'Credit Card' },
  { id: 't057', date: '2024-05-07', description: 'Museum Tickets', amount: -35.00, category: 'entertainment', type: 'expense', account: 'Credit Card' },
  { id: 't058', date: '2024-05-09', description: 'Gas Station', amount: -58.00, category: 'transport', type: 'expense', account: 'Credit Card' },
  { id: 't059', date: '2024-05-12', description: 'Internet + Phone Bundle', amount: -110.00, category: 'utilities', type: 'expense', account: 'Main Account' },
  { id: 't060', date: '2024-05-14', description: 'Spring Clothing Haul', amount: -320.50, category: 'shopping', type: 'expense', account: 'Credit Card' },
  { id: 't061', date: '2024-05-15', description: 'Consulting Fee', amount: 1500, category: 'income', type: 'income', account: 'Main Account' },
  { id: 't062', date: '2024-05-17', description: 'Yoga Classes', amount: -80.00, category: 'health', type: 'expense', account: 'Credit Card' },
  { id: 't063', date: '2024-05-20', description: 'ETF Investment', amount: -500, category: 'investment', type: 'expense', account: 'Brokerage' },
  { id: 't064', date: '2024-05-22', description: 'Grocery Store', amount: -118.60, category: 'food', type: 'expense', account: 'Credit Card' },
  { id: 't065', date: '2024-05-27', description: 'Memorial Day BBQ', amount: -145.00, category: 'food', type: 'expense', account: 'Credit Card' },

  // June
  { id: 't066', date: '2024-06-01', description: 'Monthly Salary', amount: 5500, category: 'income', type: 'income', account: 'Main Account' },
  { id: 't067', date: '2024-06-03', description: 'Rent Payment', amount: -1800, category: 'housing', type: 'expense', account: 'Main Account' },
  { id: 't068', date: '2024-06-05', description: 'Grocery Store', amount: -123.45, category: 'food', type: 'expense', account: 'Credit Card' },
  { id: 't069', date: '2024-06-08', description: 'Summer Festival', amount: -95.00, category: 'entertainment', type: 'expense', account: 'Credit Card' },
  { id: 't070', date: '2024-06-10', description: 'Uber/Lyft Rides', amount: -92.00, category: 'transport', type: 'expense', account: 'Credit Card' },
  { id: 't071', date: '2024-06-12', description: 'Electric Bill (AC)', amount: -138.00, category: 'utilities', type: 'expense', account: 'Main Account' },
  { id: 't072', date: '2024-06-15', description: 'Dividend Income', amount: 320, category: 'income', type: 'income', account: 'Brokerage' },
  { id: 't073', date: '2024-06-17', description: 'Beach Gear', amount: -187.30, category: 'shopping', type: 'expense', account: 'Credit Card' },
  { id: 't074', date: '2024-06-19', description: 'Physical Therapy', amount: -120.00, category: 'health', type: 'expense', account: 'Main Account' },
  { id: 't075', date: '2024-06-20', description: 'ETF Investment', amount: -500, category: 'investment', type: 'expense', account: 'Brokerage' },
  { id: 't076', date: '2024-06-22', description: 'Vacation Flights', amount: -680.00, category: 'transport', type: 'expense', account: 'Credit Card' },
  { id: 't077', date: '2024-06-25', description: 'Vacation Hotel', amount: -560.00, category: 'housing', type: 'expense', account: 'Credit Card' },
  { id: 't078', date: '2024-06-28', description: 'Restaurant Abroad', amount: -210.00, category: 'food', type: 'expense', account: 'Credit Card' },
];

export const MONTHLY_SUMMARY = [
  { month: 'Jan', income: 6350, expenses: 3064.17, balance: 3285.83 },
  { month: 'Feb', income: 6700, expenses: 3095.24, balance: 3604.76 },
  { month: 'Mar', income: 7500, expenses: 4345.08, balance: 3154.92 },
  { month: 'Apr', income: 6150, expenses: 2976.49, balance: 3173.51 },
  { month: 'May', income: 7000, expenses: 3356.10, balance: 3643.90 },
  { month: 'Jun', income: 5820, expenses: 4405.75, balance: 1414.25 },
];

export const BALANCE_TREND = [
  { date: 'Jan 1', balance: 12000 },
  { date: 'Jan 15', balance: 14234 },
  { date: 'Feb 1', balance: 17520 },
  { date: 'Feb 15', balance: 18900 },
  { date: 'Mar 1', balance: 22504 },
  { date: 'Mar 15', balance: 25650 },
  { date: 'Apr 1', balance: 28805 },
  { date: 'Apr 15', balance: 30200 },
  { date: 'May 1', balance: 33374 },
  { date: 'May 15', balance: 35800 },
  { date: 'Jun 1', balance: 39018 },
  { date: 'Jun 15', balance: 38200 },
  { date: 'Jun 28', balance: 40432 },
];

export function computeSpendingByCategory(transactions) {
  const result = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const cat = CATEGORIES.find(c => c.id === t.category);
      if (!result[t.category]) {
        result[t.category] = { label: cat?.label || t.category, amount: 0, color: cat?.color || '#888', icon: cat?.icon || '💳' };
      }
      result[t.category].amount += Math.abs(t.amount);
    });
  return Object.entries(result)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.amount - a.amount);
}

export function computeSummary(transactions) {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : '0.0';
  return { totalIncome, totalExpenses, balance, savingsRate };
}
