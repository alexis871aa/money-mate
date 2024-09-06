const Router = require("express").Router;
const expenseController = require("../controllers/expense");
const authMiddleware = require("../middlewares/auth");
const { body } = require("express-validator");
const router = new Router({ mergeParams: true });

router.get("/", authMiddleware, expenseController.getExpenses);
router.post(
  "/add-expense",
  body("title")
    .isLength({ min: 3, max: 32 })
    .withMessage("Длина не должна быть меньше 3 и больше 32"),
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Сумма должна быть положительным числом"),
  body("date").isDate().withMessage("Дата должна быть в формате даты"),
  body("category")
    .isLength({ min: 3, max: 32 })
    .withMessage("Категория должна быть длиной от 3 до 32"),
  body("description")
    .optional({ checkFalsy: true })
    .isLength({ min: 3, max: 80 })
    .withMessage("Описание должно быть длиной от 3 до 80"),
  authMiddleware,
  expenseController.addExpense,
);
router.put(
  "/update-expense/:id",
  body("title")
    .isLength({ min: 3, max: 32 })
    .withMessage("Длина не должна быть меньше 3 и больше 32"),
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Сумма должна быть положительным числом"),
  body("date").isDate().withMessage("Дата должна быть в формате даты"),
  body("category")
    .isLength({ min: 3, max: 32 })
    .withMessage("Категория должна быть длиной от 3 до 32"),
  body("description")
    .optional({ checkFalsy: true })
    .isLength({ min: 3, max: 80 })
    .withMessage("Описание должно быть длиной от 3 до 80"),
  authMiddleware,
  expenseController.updateExpense,
);
router.delete(
  "/delete-expense/:id",
  authMiddleware,
  expenseController.deleteExpense,
);

module.exports = router;
