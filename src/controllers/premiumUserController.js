// src/controllers/premiumUserController.js

const Order = require("../models/orderModel");
const User = require("../models/signupModel");
const Expense = require("../models/homeModel");
const { Sequelize } = require("sequelize");


exports.premiumContent = async (req, res) => {
  try {
    const userStatus = await Order.findOne({
      where: { UserId: req.user.userId, status: "SUCCESSFUL" }
    });

    if (!userStatus) {
      return res.status(200).json({ status: "FAILED" }); // Not premium
    }

    return res.status(200).json({ status: "SUCCESSFUL" }); // Premium
  } catch (err) {
    console.error("Error in premiumContent:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};


exports.leaderboard = async (req, res) => {
  try {
    const leaderboard = await User.findAll({
      attributes: [
        "id",
        "name",
        [
          Sequelize.fn(
            "COALESCE",
            Sequelize.fn("SUM", Sequelize.col("expenses.amount")),
            0
          ),
          "totalExpense"
        ]
      ],
      include: [
        {
          model: Expense,
          attributes: [],
          required: false // LEFT JOIN so users with no expenses are included
        }
      ],
      group: ["User.id"],
      order: [[Sequelize.literal("totalExpense"), "DESC"]]
    });

    res.json(leaderboard);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};
