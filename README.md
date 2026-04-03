# Finvue — Finance Dashboard

A clean, interactive finance dashboard built with **Next.js 14**, **JavaScript**, and **Tailwind CSS**. Designed with a sophisticated dark-mode-first aesthetic inspired by Bloomberg terminals and modern fintech products.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone / unzip the project
cd finance-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🏗️ Project Structure

```
finance-dashboard/
├── app/
│   ├── layout.js              # Root layout (fonts, providers)
│   ├── globals.css            # Global styles + Tailwind config
│   ├── page.js                # Dashboard Overview (/)
│   ├── transactions/
│   │   └── page.js            # Transactions page (/transactions)
│   └── insights/
│       └── page.js            # Insights page (/insights)
├── components/
│   ├── layout/
│   │   ├── AppShell.js        # Main layout wrapper w/ sidebar
│   │   ├── Sidebar.js         # Desktop sidebar navigation
│   │   └── MobileHeader.js    # Mobile hamburger navigation
│   ├── charts/
│   │   ├── BalanceTrendChart.js     # Area chart — balance over time
│   │   ├── SpendingBreakdown.js     # Donut chart — category spending
│   │   └── MonthlyComparisonChart.js # Bar chart — income vs expenses
│   └── ui/
│       ├── SummaryCard.js     # Reusable KPI card component
│       ├── RecentTransactions.js    # Latest transactions mini-list
│       └── TransactionModal.js      # Add/edit transaction modal
├── context/
│   └── AppContext.js          # Global state management (React Context)
├── data/
│   └── mockData.js            # Mock transactions + computed helpers
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

## ✨ Features

### 📊 Dashboard Overview (`/`)
- **4 Summary Cards**: Total Balance, Income, Expenses, Savings Rate — with trend indicators
- **Balance Trend Chart**: 6-month area chart showing portfolio growth
- **Spending Breakdown**: Interactive donut chart with category legend and progress bars
- **Monthly Comparison**: Grouped bar chart — Income vs Expenses per month
- **Recent Transactions**: Last 8 transactions with category icons and amounts
- Animated staggered card entrance on load

### 💳 Transactions (`/transactions`)
- Full paginated transaction table (12 per page)
- **Multi-field filtering**: Search by description/category/account, filter by type and category
- **Date range filter**: Last 30/90/180 days or all time
- **Sortable columns**: Date, amount, description (asc/desc toggle)
- **Active filter chips** with individual clear buttons
- **CSV Export**: Download filtered transactions as CSV
- **Admin-only actions**: Add, edit, delete transactions with confirmation modal
- Responsive — stacked card layout on mobile, full table on desktop
- Empty state with helpful message when no results match

### 💡 Insights (`/insights`)
- **KPI Cards**: Avg monthly income/spend, savings rate, total invested
- **Monthly Comparison Chart**: Income vs expenses bar chart
- **Spending Radar Chart**: Multi-axis profile of spending categories
- **Top Categories Ranking**: Medal-ranked spending with progress bars
- **Monthly Net Savings**: Visual bar comparison across 6 months
- **Smart Observations Panel**: 6 AI-style insights with contextual styling (warning/success/info/tip)

### 🔐 Role-Based UI (RBAC Simulation)
- **Viewer Role**: Read-only — no add/edit/delete buttons visible, no mutation actions
- **Admin Role**: Full access — can add new transactions, edit existing ones, delete with confirmation
- Role switcher available in sidebar (desktop) and mobile drawer
- Current role persisted in localStorage across sessions
- Visual role indicator on dashboard header

### 🎨 Design & UX
- **Dark-mode first** with optional light mode toggle (persisted)
- **Distinctive aesthetic**: Deep navy + gold accent palette, Playfair Display headings, DM Mono for numbers
- Subtle grid-pattern background, gradient card backgrounds, ambient glow effects
- Staggered entrance animations on all pages
- Hover micro-interactions (row highlights, button scale, opacity reveals)
- Responsive: mobile-first, full desktop layout at lg breakpoint
- Custom scrollbars styled to match the theme
- Empty state handling throughout

### 💾 State Management
- Single React Context (`AppContext`) managing:
  - `transactions[]` — full list, mutable by admin
  - `role` — viewer | admin
  - `filters` — search, type, category, dateRange, sortBy, sortDir
  - `darkMode` — boolean
- All state persisted to `localStorage` (key: `finance_dashboard_state`)
- "Reset to Sample Data" button (admin only) restores original mock data
- `getFilteredTransactions()` is a memoized derived selector computed from raw state

---

## 🧩 Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14 (App Router) | File-based routing, server components, fast builds |
| Language | JavaScript (ES2022) | Per requirement |
| Styling | Tailwind CSS v3 | Utility-first, fast iteration, responsive built-in |
| Charts | Recharts | Composable, React-native, excellent customization |
| Icons | Lucide React | Clean, consistent icon set |
| Fonts | Google Fonts (DM Sans, DM Mono, Playfair Display) | Distinctive, high-quality typography |
| State | React Context + useReducer pattern | Lightweight, no extra dependencies needed |
| Persistence | localStorage | Simple, browser-native, no backend needed |

---

## 🎯 Design Decisions

### Aesthetic Direction
Rather than a generic SaaS dashboard aesthetic, I chose a **"Bloomberg terminal meets modern fintech"** direction:
- Deep navy (`#050d1a`) as the primary surface, creating depth without harsh black
- Gold (`#fbbf24`) as the accent — connotes wealth, financial trust, and precision
- `Playfair Display` for headings — elegant serif conveys authority and refinement
- `DM Mono` for all numeric values — reinforces data precision and scanability
- Subtle noise texture + grid pattern adds tactility without visual noise

### Layout
- Fixed left sidebar (desktop) keeps navigation always accessible
- Content area uses `max-w-7xl` to prevent over-expansion on ultra-wide screens
- Charts are always paired in semantically meaningful groups (trend vs breakdown)

### RBAC Approach
Since this is frontend-only, role is stored in context and checked inline. In production this would be:
1. JWT token decoded to extract role
2. API routes protected server-side
3. UI conditionally rendered based on decoded role

### State Architecture
Context was chosen over Redux/Zustand because:
- The state shape is simple (5–6 top-level keys)
- No complex async flows requiring middleware
- Avoids adding dependencies for a scoped demo
- `useCallback`-wrapped mutations prevent unnecessary re-renders

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| < 640px (sm) | Mobile: stacked cards, hamburger nav, compact transaction rows |
| 640–1024px | Tablet: 2-column grids, sidebar hidden, better spacing |
| > 1024px (lg) | Desktop: fixed sidebar, 5-column chart layouts, full table |

---

## 🔧 Assumptions Made

1. All data is in USD; no multi-currency support needed
2. "Current date" is June 30, 2024 (aligned with mock data)
3. Investment outflows are treated as expenses (they reduce balance but grow net worth)
4. No authentication — role switching is purely a UI demonstration
5. localStorage is sufficient for persistence (no IndexedDB needed at this scale)
6. The CSV export uses the currently filtered view, not all transactions
