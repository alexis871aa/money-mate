const Expense = require("../models/Expense");
const mapExpense = require("../helpers/mapExpense");

async function getExpenses({ page, limit, sortBy, sortOrder, query }) {
  const skip = (page - 1) * limit;
  const sortCriteria = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const expenses = await Expense.find(query)
    .sort(sortCriteria)
    .skip(skip)
    .limit(Number(limit));

  const totalCount = await Expense.countDocuments(query);

  return {
    expenses: expenses.map(mapExpense),
    totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
  };
}

async function addExpense(expense) {
  const expenseDb = await Expense.create(expense);
  return mapExpense(expenseDb);
}

async function updateExpense(id, updatedData) {
  const updatedExpense = await Expense.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  return mapExpense(updatedExpense);
}

async function deleteExpense(id) {
  await Expense.findByIdAndDelete(id);
}

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};
