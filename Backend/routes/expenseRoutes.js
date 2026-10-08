const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseSummary
} = require("../controllers/expenseController");

const router = express.Router();

router.use(protect);

router.post("/", createExpense);

router.get("/", getExpenses);

router.get("/summary", getExpenseSummary);

router.get("/:id", getExpenseById);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);

module.exports = router;