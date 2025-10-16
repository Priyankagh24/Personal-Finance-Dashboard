// routes/debug.js
const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

// Temporary route to fix expenses without userId
router.post("/fix-expenses", async (req, res) => {
  try {
    const userId = new Types.ObjectId("68da2e8a84d1cc83f244260c"); // your userId

    const result = await Expense.updateMany(
      { userId: { $exists: false } },   // find expenses missing userId
      { $set: { userId } }              // set correct userId
    );

    res.json({ message: "✅ Expenses updated with userId", result });
  } catch (error) {
    console.error("Error fixing expenses:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
