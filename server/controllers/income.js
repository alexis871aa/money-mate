const Income = require("../models/income");
const incomeService = require("../services/income");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/apiError");

async function getIncomes(req, res, next) {
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

    const incomes = await incomeService.getIncomes({
      page,
      limit,
      sortBy,
      sortOrder,
      query,
    });

    res.status(200).send({
      status: "success",
      data: incomes,
      message: "Доходы успешно получены",
    });
  } catch (e) {
    next(e);
  }
}

async function getIncomeById(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const income = await incomeService.getIncomeById(id, userId);

    if (!income) {
      return next(ApiError.BadRequest("Доход не найден"));
    }

    res.status(200).send({
      status: "success",
      data: income,
      message: "Доход успешно получен",
    });
  } catch (e) {
    next(e);
  }
}

async function addIncome(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.BadRequest("Ошибка при получении данных", errors.array()),
      );
    }

    const { title, amount, category, description, date } = req.body;

    const income = await incomeService.addIncome({
      user: req.user.id,
      title,
      amount,
      category,
      description,
      date,
    });

    res.status(201).send({
      status: "success",
      data: income,
      message: "Доход успешно добавлен",
    });
  } catch (e) {
    next(e);
  }
}

async function updateIncome(req, res, next) {
  try {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    const income = await Income.findById(id);
    if (!income) {
      return next(ApiError.BadRequest("Доход не найден"));
    }

    if (income.user.toString() !== req.user.id) {
      return next(ApiError.Forbidden("Вы не можете редактировать этот доход"));
    }

    const updatedIncome = await incomeService.updateIncome(id, {
      title,
      amount,
      category,
      description,
      date,
    });

    res.status(200).send({
      status: "success",
      data: updatedIncome,
      message: "Доход успешно обновлен",
    });
  } catch (e) {
    next(e);
  }
}

async function deleteIncome(req, res, next) {
  try {
    const { id } = req.params;

    const income = await Income.findById(id);
    if (!income) {
      return next(ApiError.BadRequest("Доход не найден"));
    }

    if (income.user.toString() !== req.user.id) {
      return next(ApiError.Forbidden("Вы не можете удалить этот доход"));
    }

    await incomeService.deleteIncome(id);
    res.status(200).send({
      status: "success",
      message: "Доход успешно удален",
    });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getIncomes,
  getIncomeById,
  addIncome,
  updateIncome,
  deleteIncome,
};
