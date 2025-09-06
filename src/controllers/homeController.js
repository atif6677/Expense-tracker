// homeController.js
const Expense = require('../models/homeModel');


const addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;

    if (!amount || !description || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ userId comes from JWT (auth middleware)
    const expense = await Expense.create({
      amount,
      description,
      category,
      userId: req.user.userId,
    });

    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📂 Get all expenses of the logged-in user
const getExpense = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { userId: req.user.userId }, // ✅ filter by logged-in user
    });
    res.status(200).json({ expenses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOne({
      where: { id, userId: req.user.userId }, // ✅ ensure expense belongs to user
    });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found or not authorized" });
    }

    await expense.destroy();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};

module.exports = { addExpense, getExpense, deleteExpense };
