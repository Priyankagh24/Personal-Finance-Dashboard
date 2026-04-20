# 💰 Personal Finance Dashboard

A full-stack personal finance management application that helps users track income, expenses, and overall financial health through an intuitive dashboard with interactive charts and data export capabilities.

---

## 📸 Overview

The Personal Finance Dashboard provides a centralized view of your financial activity. Users can log income and expenses, visualize spending trends, and download transaction reports — all behind a secure authentication system.

---

## ✨ Features

- **Authentication** — Secure JWT-based registration and login with optional profile photo upload
- **Dashboard** — At-a-glance summary of total balance, income, and expenses with recent transaction history
- **Income Tracking** — Add, view, and delete income entries with emoji icons and source categorization
- **Expense Tracking** — Add, view, and delete expense entries with category labels and date filtering
- **Interactive Charts**
  - Pie chart for financial overview (balance vs. income vs. expenses)
  - Area/line chart for expense trends over time
  - Bar chart for last 30 days of spending by category
  - Pie chart for last 60 days of income by source
- **Excel Export** — Download income or expense records as `.xlsx` files
- **Toast Notifications** — Real-time feedback for all user actions
- **Protected Routes** — All dashboard pages require a valid session token

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Axios | HTTP client with interceptors |
| Recharts | Charts and data visualizations |
| Tailwind CSS | Utility-first styling |
| React Hot Toast | Notification toasts |
| Emoji Picker React | Icon selection for transactions |
| Moment.js | Date formatting |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JSON Web Tokens (JWT) | Authentication |
| bcryptjs | Password hashing |
| Multer | Profile image uploads |
| xlsx (SheetJS) | Excel file generation |

---

## 📁 Project Structure

```
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cards/          # InfoCard, TransactionInfoCard
│   │   │   ├── Charts/         # CustomBarChart, CustomLineChart, CustomPieChart
│   │   │   ├── Dashboard/      # RecentTransactions, FinanceOverview, Last30DaysExpenses, etc.
│   │   │   ├── Expense/        # ExpenseOverview, ExpenseList, AddExpenseForm
│   │   │   ├── Income/         # IncomeOverview, IncomeList, AddIncomeForm
│   │   │   ├── Inputs/         # Input, ProfilePhotoSelector
│   │   │   ├── layouts/        # AuthLayout, DashboardLayout
│   │   │   ├── EmojiPickerPopup.jsx
│   │   │   └── Modal.jsx
│   │   ├── context/
│   │   │   └── UserContext.jsx
│   │   ├── hooks/
│   │   │   └── useUserAuth.jsx
│   │   ├── pages/
│   │   │   ├── Auth/           # Login.jsx, SignUp.jsx
│   │   │   └── Dashboard/      # Home.jsx, Income.jsx, Expense.jsx
│   │   └── utils/
│   │       ├── apiPaths.js
│   │       ├── axiosInstance.js
│   │       └── helper.js
│   └── index.html
│
└── backend/
    ├── controllers/
    │   ├── authController.js
    │   ├── dashboardController.js
    │   ├── incomeController.js
    │   └── expenseController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── uploadMiddleware.js
    ├── models/
    │   ├── User.js
    │   ├── Income.js
    │   └── Expense.js
    ├── config/
    │   └── db.js
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/personal-finance-dashboard.git
cd personal-finance-dashboard
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/finance-dashboard
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:8000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Note:** The frontend is pre-configured to connect to `https://personal-finance-dashboard-45.onrender.com`. To use your local backend, update the `baseURL` in `src/utils/axiosInstance.js`.

---

## 🔌 API Reference

### Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/register` | Register a new user |
| `POST` | `/api/v1/auth/login` | Login and receive a JWT |
| `GET` | `/api/v1/auth/getUser` | Get authenticated user info |
| `POST` | `/api/v1/auth/upload-image` | Upload profile image |

### Dashboard

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/dashboard` | Get full dashboard summary |

### Income

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/income/add` | Add a new income entry |
| `GET` | `/api/v1/income/get` | Get all income records |
| `DELETE` | `/api/v1/income/:id` | Delete an income entry |
| `GET` | `/api/v1/income/downloadexcel` | Export income as `.xlsx` |

### Expense

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/expense/add` | Add a new expense entry |
| `GET` | `/api/v1/expense/get` | Get all expense records |
| `DELETE` | `/api/v1/expense/:id` | Delete an expense entry |
| `GET` | `/api/v1/expense/downloadexcel` | Export expenses as `.xlsx` |

> All dashboard, income, and expense routes are protected and require a `Bearer <token>` authorization header.

---

## 🗄️ Data Models

### User
```
fullName, email, password (hashed), profileImageUrl, timestamps
```

### Income
```
userId (ref: User), source, amount, date, icon, timestamps
```

### Expense
```
userId (ref: User), category, amount, date, icon, type, timestamps
```

---

## 🔐 Authentication Flow

1. User registers or logs in → server returns a JWT
2. Token is stored in `localStorage`
3. All subsequent API requests include `Authorization: Bearer <token>` via Axios interceptor
4. A `401` response automatically redirects the user to `/login`
5. The `useUserAuth` hook fetches and caches user info on protected pages

---

## 📊 Dashboard Summary

The main dashboard aggregates:

- **Total Balance** = Total Income − Total Expenses
- **Last 30 Days Expenses** — filtered transactions with category bar chart
- **Last 60 Days Income** — filtered transactions with pie chart breakdown
- **Recent Transactions** — latest 5 combined income and expense entries

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

Built with ❤️ as a personal finance management tool.  
Feel free to open issues or suggest features via [GitHub Issues](https://github.com/Priyankagh24/Personal-Finance-Dashboard/issues).