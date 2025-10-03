import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashBoardLayout';
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import { useNavigate } from "react-router-dom";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const Home = () => {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      console.log("Dashboard API response full:", response.data);
      if (response.data) {
        
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Safe fallback for last 30 days expenses
// 🟢 General safe fallback for last 30 days expenses
const last30Transactions = (Array.isArray(dashboardData?.last30DaysExpenses?.transactions) &&
                           dashboardData.last30DaysExpenses.transactions.length > 0)
  ? dashboardData.last30DaysExpenses.transactions
  : (Array.isArray(dashboardData?.recentTransactions)
      ? dashboardData.recentTransactions
          .filter(txn => txn.type === "expense")  // only expenses
          .map((txn, index) => ({
            _id: txn._id || index,
            category: txn.category || txn.source || "Unknown",
            amount: txn.amount || 0,
            date: txn.date || new Date().toISOString(),
            icon: txn.icon || null
          }))
      : []);


  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {/* Top Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard icon={<IoMdCard />} label="Total Balance" value={dashboardData?.totalBalance || 0} color="bg-primary" />
          <InfoCard icon={<LuWalletMinimal />} label="Total Income" value={dashboardData?.totalIncome || 0} color="bg-orange-500" />
          <InfoCard icon={<LuHandCoins />} label="Total Expenses" value={dashboardData?.totalExpenses || 0} color="bg-red-500" />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          <RecentTransactions
            transactions={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />

          {/* 🟢 Expenses Transactions List */}
          <ExpenseTransactions
            transactions={last30Transactions.map((item, index) => ({
              _id: item._id || index,
              category: item.category || item.source || "Unknown",
              amount: item.amount || 0,
              date: item.date || new Date().toISOString(),
              icon: item.icon || null
            }))}
            onSeeMore={() => navigate("/expense")}
          />

          {/* 🟢 Last 30 Days Expenses Chart */}
          <Last30DaysExpenses data={last30Transactions} />

          {/* Recent Income Chart & List */}
          <RecentIncomeWithChart
            data={Array.isArray(dashboardData?.last60DaysIncome?.transactions)
              ? dashboardData.last60DaysIncome.transactions.slice(0, 4)
              : []}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={Array.isArray(dashboardData?.last60DaysIncome?.transactions)
              ? dashboardData.last60DaysIncome.transactions
              : []}
            onSeeMore={() => navigate("/income")}
          />
        </div>

        {/* Debugging */}
        <div className="mt-4 text-sm text-gray-500">
          
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;

