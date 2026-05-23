const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const incomeFile = path.join(__dirname, "../data/raw/income.csv");
const expenseFile = path.join(__dirname, "../data/raw/expenses.csv");

const incomeRows = [];
const expenseRows = [];

const CATEGORIES = [
  { id: "housing", label: "Housing", color: "#fbbf24", icon: "🏠" },
  { id: "food", label: "Food & Dining", color: "#34d399", icon: "🍽️" },
  { id: "transport", label: "Transport", color: "#60a5fa", icon: "🚗" },
  { id: "entertainment", label: "Entertainment", color: "#a78bfa", icon: "🎬" },
  { id: "health", label: "Health", color: "#fb7185", icon: "💊" },
  { id: "shopping", label: "Shopping", color: "#f97316", icon: "🛍️" },
  { id: "utilities", label: "Utilities", color: "#22d3ee", icon: "⚡" },
  { id: "income", label: "Income", color: "#10b981", icon: "💰" },
  { id: "investment", label: "Investment", color: "#818cf8", icon: "📈" },
  { id: "education", label: "Education", color: "#e879f9", icon: "📚" },
];

const categoryMap = {
  // Food
  groceries: "food",
  grocery: "food",
  restaurant: "food",
  dining: "food",
  food: "food",
  cafe: "food",

  // Transport
  uber: "transport",
  transport: "transport",
  taxi: "transport",
  fuel: "transport",
  "public transport": "transport",

  // Housing
  rent: "housing",
  mortgage: "housing",

  // Utilities
  electricity: "utilities",
  internet: "utilities",
  water: "utilities",

  // Entertainment
  netflix: "entertainment",
  movie: "entertainment",
  spotify: "entertainment",

  // Shopping
  shopping: "shopping",
  amazon: "shopping",

  // Health
  hospital: "health",
  pharmacy: "health",
  medical: "health",
  health: "health",

  // Investments
  investment: "investment",

  // Education
  education: "education",
  course: "education",

  // Income Categories
  job: "income",
  "second work": "income",
  "debt return / borrowed money": "income",
};

const accountMap = {
  acct_1: "Main Account",
  acct_2: "Credit Card",
  acct_3: "Savings",
};

function loadCSV(filePath, storage) {
  return new Promise((resolve) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => storage.push(data))
      .on("end", resolve);
  });
}

function normalizeCategory(text = "") {
  const lower = text.toLowerCase();

  for (const key in categoryMap) {
    if (lower.includes(key)) {
      return categoryMap[key];
    }
  }

  return "shopping";
}

function formatDate(dateStr) {
  if (!dateStr) return new Date().toISOString();

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    return new Date().toISOString();
  }

  return date.toISOString();
}

function generateTransactions() {
  const expenses = expenseRows.map((item, index) => ({
    id: `e-${index}`,

    date: formatDate(
      item.date_time ||
      item.date ||
      item.Date
    ),

    description:
      `${item.category
        .split(" ")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ")} Expense`,

    amount: -Math.abs(
      Number(
        item.amount ||
        item.Amount ||
        0
      )
    ),

    category: normalizeCategory(
      item.category ||
      item.Category ||
      item.tags ||
      ""
    ),

    type: "expense",

    account:
      accountMap[
      item.account ||
      item.Account
      ] || "Main Account",

    currency:
      item.currency ||
      "USD",
  }));

  const incomes = incomeRows.map((item, index) => ({
    id: `i-${index}`,

    date: formatDate(
      item.date_time ||
      item.date ||
      item.Date
    ),

    description:
      `${item.category
        .split(" ")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ")} Income`,

    amount: Math.abs(
      Number(
        item.amount ||
        item.Amount ||
        0
      )
    ),

    category: "income",

    type: "income",

    account:
      accountMap[
      item.account ||
      item.Account
      ] || "Main Account",

    currency:
      item.currency ||
      "USD",
  }));

  return [...expenses, ...incomes].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
}

function generateMonthlySummary(transactions) {
  const months = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString(
      "default",
      {
        month: "short",
        year: "numeric",
      }
    );

    if (!months[month]) {
      months[month] = {
        month,
        income: 0,
        expenses: 0,
        balance: 0,
      };
    }

    if (t.type === "income") {
      months[month].income += t.amount;
    } else {
      months[month].expenses += Math.abs(t.amount);
    }

    months[month].balance =
      months[month].income -
      months[month].expenses;
  });

  return Object.values(months);
}

function generateBalanceTrend(transactions) {
  let balance = 10000;

  return transactions.map((t) => {
    balance += t.amount;

    return {
      date: t.date,
      balance: Number(balance.toFixed(2)),
    };
  });
}

async function main() {
  await loadCSV(incomeFile, incomeRows);
  await loadCSV(expenseFile, expenseRows);

  console.log("Income Sample:", incomeRows[0]);
  console.log("Expense Sample:", expenseRows[0]);

  const TRANSACTIONS = generateTransactions();

  const MONTHLY_SUMMARY =
    generateMonthlySummary(TRANSACTIONS);

  const BALANCE_TREND =
    generateBalanceTrend(TRANSACTIONS);

  const output = `
export const CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};

export const TRANSACTIONS = ${JSON.stringify(TRANSACTIONS, null, 2)};

export const MONTHLY_SUMMARY = ${JSON.stringify(MONTHLY_SUMMARY, null, 2)};

export const BALANCE_TREND = ${JSON.stringify(BALANCE_TREND, null, 2)};

export function computeSpendingByCategory(transactions) {
  const result = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const cat = CATEGORIES.find(
        (c) => c.id === t.category
      );

      if (!result[t.category]) {
        result[t.category] = {
          label: cat?.label || t.category,
          amount: 0,
          color: cat?.color || "#888",
          icon: cat?.icon || "💳",
        };
      }

      result[t.category].amount += Math.abs(t.amount);
    });

  return Object.entries(result)
    .map(([id, data]) => ({
      id,
      ...data,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function computeSummary(transactions) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const savingsRate =
    totalIncome > 0
      ? ((balance / totalIncome) * 100).toFixed(1)
      : "0.0";

  return {
    totalIncome,
    totalExpenses,
    balance,
    savingsRate,
  };
}
`;

  fs.writeFileSync(
    path.join(__dirname, "../data/mockData.js"),
    output
  );

  console.log("✅ mockData.js generated successfully");
}

main();