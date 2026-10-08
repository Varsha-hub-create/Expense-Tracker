const mongoose = require("mongoose");
const Expense = require("../models/Expense");

// CREATE EXPENSE
const createExpense = async (req, res) => {
  try {
    const {
      amount,
      category,
      description,
      date
    } = req.body;

    if (
      amount === undefined ||
      !category ||
      !description ||
      !date
    ) {
      return res.status(400).json({
        message: "All expense fields are required"
      });
    }

    if (Number(amount) < 0) {
      return res.status(400).json({
        message: "Amount cannot be negative"
      });
    }

    const expense = await Expense.create({
      amount: Number(amount),
      category,
      description,
      date,
      user: req.user.id
    });

    res.status(201).json({
      message: "Expense created successfully",
      expense
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create expense"
    });
  }
};

// GET USER EXPENSES
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id
    }).sort({
      date: -1
    });

    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch expenses"
    });
  }
};

// GET SINGLE EXPENSE
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch expense"
    });
  }
};

// UPDATE EXPENSE
const updateExpense = async (req, res) => {
  try {
    const {
      amount,
      category,
      description,
      date
    } = req.body;

    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    if (amount !== undefined) {
      if (Number(amount) < 0) {
        return res.status(400).json({
          message: "Amount cannot be negative"
        });
      }

      expense.amount = Number(amount);
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (description !== undefined) {
      expense.description = description;
    }

    if (date !== undefined) {
      expense.date = date;
    }

    await expense.save();

    res.status(200).json({
      message: "Expense updated successfully",
      expense
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update expense"
    });
  }
};

// DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete expense"
    });
  }
};

// CATEGORY SUMMARY
const getExpenseSummary = async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id)
        }
      },

      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount"
          }
        }
      },

      {
        $sort: {
          total: -1
        }
      }
    ]);

    const totalExpense = summary.reduce(
      (sum, item) => sum + item.total,
      0
    );

    res.status(200).json({
      totalExpense,
      summary
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate summary"
    });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseSummary
};