const Income = require("../models/Income");
const xlsx = require('xlsx');
// Add Income
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    // Validation
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get All Incomes
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const incomes = await Income.find({ userId}).sort({date:-1});
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete Income
exports.deleteIncome = async (req, res) => {
  
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({messege: "Income deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Download Excel (to implement later)
// controllers/incomeController.js
exports.downloadIncomeExcel = async (req, res) => {
  try {
    const userId = req.user.id;
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    // Map to clean rows
    const rows = incomes.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0], // YYYY-MM-DD
    }));

    // Create workbook & worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(rows);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // Write workbook to buffer
    const buf = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

    // Send buffer as download
    res.setHeader("Content-Disposition", "attachment; filename=income_details.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buf);
  } catch (error) {
    console.error("Error generating Excel:", error);
    res.status(500).json({ message: "Failed to generate Excel" });
  }
};

