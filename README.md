# Finvue — Financial Analytics Platform

A premium financial analytics dashboard built with **Next.js**, **JavaScript**, and **Tailwind CSS** using real-world financial transaction datasets.

The platform preprocesses raw CSV financial data into analytics-ready structures and provides interactive visualizations, spending intelligence, KPI tracking, trend analysis, and role-based transaction management.

Designed with a sophisticated dark-mode-first aesthetic inspired by Bloomberg terminals and modern fintech products.

---

# 🚀 Features

- 📊 Real-world financial data analytics
- 📈 Dynamic balance trend analysis
- 💳 Interactive transaction management
- 🧠 Financial insights & KPI tracking
- 📂 CSV dataset preprocessing pipeline
- 🔍 Smart filtering, sorting & search
- 🌙 Premium dark mode UI
- 📱 Fully responsive dashboard
- 🔐 Role-based UI simulation
- 📤 CSV export functionality
- ⚡ Fast and optimized Next.js architecture

---

# 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| JavaScript | Application logic |
| Tailwind CSS | Styling |
| Recharts | Data visualizations |
| React Context API | Global state management |
| Lucide React | Icons |
| Node.js | Data preprocessing |
| csv-parser | CSV parsing |
| localStorage | Persistence |

---

# 🚀 Quick Start

## Prerequisites

- Node.js 18+
- npm or yarn

---

# 📦 Installation

```bash
# Clone repository
git clone <your-repo-url>

# Navigate into project
cd finance-dashboard

# Install dependencies
npm install
```

---

# ▶️ Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# 🏗️ Project Structure

```bash
finance-dashboard/
│
├── app/
│   ├── layout.js
│   ├── globals.css
│   ├── page.js
│   │
│   ├── transactions/
│   │   └── page.js
│   │
│   └── insights/
│       └── page.js
│
├── components/
│   ├── layout/
│   │   ├── AppShell.js
│   │   ├── Sidebar.js
│   │   └── MobileHeader.js
│   │
│   ├── charts/
│   │   ├── BalanceTrendChart.js
│   │   ├── SpendingBreakdown.js
│   │   └── MonthlyComparisonChart.js
│   │
│   └── ui/
│       ├── SummaryCard.js
│       ├── RecentTransactions.js
│       └── TransactionModal.js
│
├── context/
│   └── AppContext.js
│
├── data/
│   ├── raw/
│   │   ├── income.csv
│   │   └── expenses.csv
│   │
│   └── mockData.js
│
├── scripts/
│   └── generateMockData.js
│
├── public/
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── package.json
```

---

# 📂 Real Dataset Integration

The dashboard works using real-world financial transaction datasets stored as CSV files.

## Raw Dataset Structure

```bash
data/
└── raw/
    ├── income.csv
    └── expenses.csv
```

---

# ⚙️ ETL Preprocessing Pipeline

A custom ETL preprocessing pipeline converts raw CSV financial data into analytics-ready structures.

## Pipeline Flow

```text
CSV Files
   ↓
generateMockData.js
   ↓
Data Cleaning
   ↓
Date Normalization
   ↓
Category Mapping
   ↓
Account Mapping
   ↓
Monthly Aggregation
   ↓
Balance Trend Generation
   ↓
Analytics Computation
   ↓
mockData.js
   ↓
Dashboard Visualizations
```

---

# 🧹 Preprocessing Features

- Date normalization and validation
- Transaction transformation
- Category standardization
- Account normalization
- Monthly aggregation
- Balance trend generation
- Spending category computation
- Savings rate computation
- Analytics-ready dataset generation

---

# ▶️ Generate Processed Dataset

Whenever raw CSV files are updated:

```bash
node scripts/generateMockData.js
```

This generates:

```bash
data/mockData.js
```

which powers the dashboard.

---

# 📊 Dashboard Overview (`/`)

## Features

- Total Balance KPI
- Total Income KPI
- Total Expense KPI
- Savings Rate KPI
- Dynamic balance trend chart
- Expense category intelligence
- Monthly financial comparison
- Recent transaction feed
- Animated dashboard sections

---

# 💳 Transactions Page (`/transactions`)

## Features

- Paginated transaction table
- Search transactions
- Category filtering
- Date-range filtering
- Transaction sorting
- CSV export
- Add/Edit/Delete transactions
- Responsive mobile layout
- Dynamic account visualization

---

# 💡 Insights Page (`/insights`)

## Analytics Capabilities

- Monthly income analysis
- Expense trend analysis
- Savings rate tracking
- Highest spending category
- Spending distribution radar chart
- Financial KPI tracking
- Monthly comparison analytics
- Top category ranking
- Financial trend visualization

---

# 🔐 Role-Based UI Simulation

## Viewer Role

- Read-only access
- Cannot modify transactions

## Admin Role

- Add transactions
- Edit transactions
- Delete transactions
- Reload dataset

---

# 🎨 UI & UX Highlights

- Dark-mode-first design
- Bloomberg-inspired aesthetics
- Deep navy + gold palette
- Responsive layout
- Smooth animations
- Hover micro-interactions
- Glassmorphism-inspired UI
- Elegant typography system
- Premium fintech-inspired interface

---

# 💾 State Management

Global state is managed using React Context API.

## Managed State

- transactions
- filters
- dark mode
- sorting
- search
- pagination
- role

## Persistence

Application state is persisted using:

```bash
localStorage
```

Storage key:

```bash
financial_analytics_platform_v3
```

---

# 📈 Analytics Capabilities

The platform transforms raw financial data into actionable insights through:

- Monthly income aggregation
- Expense trend analysis
- Savings rate computation
- Spending category intelligence
- Transaction trend visualization
- Financial KPI tracking
- Dynamic filtering and sorting
- Balance trajectory analysis
- CSV export functionality

---

# 🎯 Design Philosophy

The platform follows a:

```text
Bloomberg Terminal × Modern Fintech
```

design language.

## Core Design Principles

- Deep navy analytical surfaces
- Gold accent palette
- Serif heading typography
- Monospace financial numbers
- High information density
- Clean financial hierarchy
- Premium dashboard aesthetics

---

# 🧠 Analytics-First Architecture

Instead of being just a frontend dashboard, the platform follows a real-world analytics workflow:

```text
Raw Financial Data
        ↓
Transformation
        ↓
Aggregation
        ↓
Analytics
        ↓
Visualization
        ↓
Business Insights
```

---

# 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| < 640px | Mobile |
| 640px – 1024px | Tablet |
| > 1024px | Desktop |

---

# 🔧 Assumptions

1. Financial datasets are preprocessed locally before visualization
2. Multi-currency conversion is not implemented
3. Role switching is frontend-only simulation
4. localStorage persistence is sufficient for project scale
5. CSV export uses currently filtered transactions
6. Analytics are generated client-side after preprocessing

---


This project demonstrates:

✅ Frontend engineering  
✅ Financial data preprocessing  
✅ ETL workflows  
✅ Data normalization  
✅ Analytics computation  
✅ Interactive data visualization  
✅ Responsive UI design  
✅ Business intelligence concepts  
✅ Dashboard architecture  

It combines:
- frontend development
- data analytics
- visualization engineering
- financial dashboard design

into a single end-to-end analytics platform.

---

# 👨‍💻 Author

Built as a modern financial analytics platform showcasing:
- frontend architecture
- analytics workflows
- data preprocessing
- visualization engineering
- premium dashboard design