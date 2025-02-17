# 📊 Finance Tracker

Finance Tracker is a **full-stack personal finance manager** that allows users to **track transactions, set budgets, analyze expenses, and gain financial insights** through **interactive charts and graphs**.

## ✨ Features

- **🏠 Home Page**: View all transactions, monthly expenses, and income.
- **📊 Analytics Dashboard**: Monthly spending trends, expense breakdowns, and budget comparison.
- **🎯 Budget Management**: Set and track monthly budgets for different categories.
- **📑 Insights Page**: Smart spending trends, biggest expense insights, and money-saving tips.
- **📅 Month Selector**: Switch between different months to analyze financial data.

---

## 🚀 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB Atlas
- **Charts**: Recharts

---

## 📂 Project Structure

```bash
📂 finance-tracker
├── 📂 src
│   ├── 📂 app
│   │   ├── 📂 analytics         # Analytics Page (Expense Trends, Charts)
│   │   ├── 📂 budget           # Budget Page (Set, Edit, Track Budgets)
│   │   ├── 📂 insights         # Insights Page (Spending Trends, Money Tips)
│   │   ├── 📂 add-transaction  # Add Transaction Page
│   │   ├── 📂 api              # API Endpoints (Transactions, Budgets)
│   │   ├── 📂 components       # Reusable Components
│   │   │   ├── 📜 ExpenseChart.tsx            # Monthly Bar Chart (Expenses)
│   │   │   ├── 📜 ExpensePieChart.tsx         # Category-wise Expense Breakdown
│   │   │   ├── 📜 BudgetComparisonChart.tsx   # Budget vs Actual Graph
│   │   │   ├── 📜 AnalyticsMonthSelector.tsx  # Month Selector for Analytics
│   │   │   ├── 📜 Sidebar.tsx                 # Sidebar Navigation
│   ├── 📂 models          # Database Models (Mongoose)
│   ├── 📂 styles          # Global Styles
│   ├── 📜 package.json    # Dependencies & Scripts
│   ├── 📜 next.config.js  # Next.js Configuration
```

---

## 🛠 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Argus-66/finance-tracker.git
cd finance-tracker
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Set up environment variables
Create a **.env.local** file and add your MongoDB connection string:
```plaintext
MONGODB_URI=mongodb+srv://your-mongo-uri
```

---

## 🚀 Running the Project

### 4️⃣ Start the development server
```bash
npm run dev
```
Navigate to **http://localhost:3000** to use the app.

---

## 🛠 Deployment (Vercel)

### 5️⃣ Deploy to Vercel
```bash
npx vercel
```
Follow the CLI steps to deploy.

---

## 📊 Features Overview

### 🏠 Home Page
- Displays a summary of monthly income and expenses.
- Lists all transactions for the selected month.
- Allows users to delete or edit transactions.

### 📊 Analytics Dashboard
- **Monthly Expense Bar Chart**: Displays category-wise spending.
- **Expense Breakdown Pie Chart**: Shows percentage-wise category distribution.
- **Budget vs Actual Graph**: Compares planned budget vs actual spending.

### 🎯 Budget Management
- Set and edit monthly budgets.
- Track category-wise spending.
- Alerts when spending exceeds budget.

### 📑 Insights Page
- **Spending Trends Over Time**: Line chart showing spending patterns.
- **Biggest Expense Category**: Highlights the most spent category.
- **Smart Money Tips**: Personalized saving tips based on user spending.

### 📅 Month Selector
- Allows users to switch between different months.
- Updates all charts and graphs dynamically.

---

## 🎯 Future Enhancements
- **Recurring transactions & subscriptions tracking**
- **Export transaction history to CSV/Excel**
- **Dark mode toggle**
- **Multi-user authentication & profiles**

---

## 💡 Contributing
Pull requests are welcome! Please open an issue first to discuss any major changes.

---









This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Yardstick_Assignment
