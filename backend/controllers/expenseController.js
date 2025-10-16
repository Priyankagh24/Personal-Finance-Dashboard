const Expense = require("../models/Expense");
const XLSX = require("xlsx");

// Add Expense
exports.addExpense = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expense = new Expense({
      userId,
      icon: icon || "",
      category,
      amount,
      date: new Date(date),
      type: "expense",
    });

    await expense.save();
    return res.status(201).json(expense);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get All Expenses
exports.getAllExpense = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    const expenses = await Expense.find({ userId });
    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    const { id } = req.params;
    const expense = await Expense.findOne({ _id: id, userId });
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    await expense.deleteOne();
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Download Expenses as Excel
exports.downloadExpenseExcel = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Not authorized" });

    const expenses = await Expense.find({ userId });

    const rows = expenses.map(e => ({
      Category: e.category || "N/A",
      Amount: e.amount,
      Date: e.date ? e.date.toISOString().split("T")[0] : "",
 
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=expenses.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate Excel" });
  }
};
