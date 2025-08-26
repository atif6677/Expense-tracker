// homeRoute.js

const express  = require('express');
const router = express.Router();
const { addExpense, getExpense } = require("../controllers/homeController");

router.post('/home', addExpense);
router.get('/home', getExpense);

module.exports = router;