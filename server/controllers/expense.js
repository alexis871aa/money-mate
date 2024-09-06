const Expense = require("../models/Expense");
const expenseService = require("../services/expense");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/apiError");

async function getExpenses(req, res, next) {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "date",
      sortOrder = "desc",
      search = "",
      startDate,
      endDate,
    } = req.query;

    const userId = req.user.id;

    const query = {
      user: userId,
      $or: [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const expenses = await expenseService.getExpenses({
      page,
      limit,
      sortBy,
      sortOrder,
      query,
    });

    res.status(200).send({
      status: "success",
      data: expenses,
      message: "Расходы успешно получены",
    });
  } catch (e) {
    next(e);
  }
}

async function addExpense(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.BadRequest("Ошибка при получении данных", errors.array()),
      );
    }

    const { title, amount, category, description, date } = req.body;

    const expense = await expenseService.addExpense({
      user: req.user.id,
      title,
      amount,
      category,
      description,
      date,
    });

    res.status(201).send({
      status: "success",
      data: expense,
      message: "Расход успешно добавлен",
    });
  } catch (e) {
    next(e);
  }
}

async function updateExpense(req, res, next) {
  try {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    const expense = await Expense.findById(id);
    if (!expense) {
      return next(ApiError.BadRequest("Расход не найден"));
    }

    if (expense.user.toString() !== req.user.id) {
      return next(ApiError.Forbidden("Вы не можете редактировать этот расход"));
    }

    const updatedExpense = await expenseService.updateExpense(id, {
      title,
      amount,
      category,
      description,
      date,
    });

    res.status(200).send({
      status: "success",
      data: updatedExpense,
      message: "Расход успешно обновлен",
    });
  } catch (e) {
    next(e);
  }
}

async function deleteExpense(req, res, next) {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);
    if (!expense) {
      return next(ApiError.BadRequest("Расход не найден"));
    }

    if (expense.user.toString() !== req.user.id) {
      return next(ApiError.Forbidden("Вы не можете удалить этот расход"));
    }

    await expenseService.deleteExpense(id);
    res.status(200).send({
      status: "success",
      message: "Расход успешно удалён",
    });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};
