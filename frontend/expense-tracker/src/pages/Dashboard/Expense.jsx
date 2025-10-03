import React, { useEffect, useState } from "react";
import useUserAuth from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import API_PATHS from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "../../components/Modal";
import ExpenseList from "../../components/Expense/ExpenseList";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  const [totals, setTotals] = useState({ totalIncome: 0, totalExpenses: 0, totalBalance: 0 });

  // Fetch all expenses
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);

        // Calculate totals
        const totalExpenses = response.data
          .filter((e) => e.type === "expense" || !e.type)
          .reduce((acc, curr) => acc + Number(curr.amount), 0);

        const totalIncome = response.data
          .filter((e) => e.type === "income")
          .reduce((acc, curr) => acc + Number(curr.amount), 0);

        setTotals({ totalIncome, totalExpenses, totalBalance: totalIncome - totalExpenses });
      }
    } catch (error) {
      console.error("Something went wrong fetching expenses", error);
    } finally {
      setLoading(false);
    }
  };

  // Add expense
 const handleAddExpense = async (expense) => {
  const { category, amount, date, icon } = expense;

  // Debug: log current input values
  console.log("Expense submitted:", expense);

  // ✅ Validation
  if (!category || !category.trim()) {
    toast.error("Source/Category is required");
    return;
  }

  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    toast.error("Amount should be a valid number greater than 0");
    return;
  }

  if (!date) {
    toast.error("Date is required");
    return;
  }

  // Prepare payload for backend
  const payload = {
    category: category.trim(),             // Use "category" if backend expects it
    amount: Number(amount),               // Ensure number
    date: date,                            // Keep as YYYY-MM-DD string from input[type=date]
    icon: icon || null,                    // Send null if no icon selected
    type: "expense",
  };

  console.log("Payload to API:", payload);

  try {
    const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, payload);
    console.log("API Response:", response.data);

    toast.success("Expense added successfully");
    setOpenAddExpenseModal(false);

    // Refresh expense list
    fetchExpenseDetails();
  } catch (error) {
    console.error(
      "Error adding expense:",
      error.response?.data?.message || error.message
    );
    toast.error(error.response?.data?.message || "Failed to add expense");
  }
};


  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      toast.success("Expense deleted successfully");
      setOpenDeleteAlert({ show: false, data: null });
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data?.message || error.message);
    }
  };


  // handle download expense details
 const  handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
         {
        responseType: "blob", // Important to handle binary data
      }
    );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expenses_details.xlsx"); // Filename
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("Excel downloaded successfully!");
    } catch (error) {
      console.error("Error downloading Excel:", error);
      toast.error("Failed to download Excel. Please try again.");
    }
  };



  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto grid grid-cols-1 gap-6">
        {/* Expense Overview */}
        <ExpenseOverview
          transactions={expenseData}
          totals={totals}
          onExpenseIncome={() => setOpenAddExpenseModal(true)}
        />

        {/* Expense List */}
        <ExpenseList
          transactions={expenseData}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={handleDownloadExpenseDetails}
        />

        {/* Add Expense Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Confirm Delete"
        >
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete this expense?
          </p>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg"
              onClick={() => setOpenDeleteAlert({ show: false, data: null })}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={() => deleteExpense(openDeleteAlert.data)}
            >
              Delete
            </button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;



