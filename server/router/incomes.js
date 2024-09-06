const Router = require("express").Router;
const incomeController = require("../controllers/income");
const authMiddleware = require("../middlewares/auth");
const { body } = require("express-validator");
const router = new Router({ mergeParams: true });

router.get("/", authMiddleware, incomeController.getIncomes);
router.post(
  "/add-income",
  body("title")
    .isLength({ min: 3, max: 32 })
    .withMessage("Длина не должна быть меньше 3 и больше 32"),
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Сумма должна быть положительным числом"),
  body("date").isDate().withMessage("Дата должна быть в формате даты"),
  body("category")
    .isLength({ min: 3, max: 32 })
    .withMessage("Категория должна быть длиной от 3 до 32"),
  body("description")
    .optional({ checkFalsy: true })
    .isLength({ min: 3, max: 80 })
    .withMessage("Описание должно быть длиной от 3 до 80"),
  authMiddleware,
  incomeController.addIncome,
);
router.put(
  "/update-income/:id",
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
  incomeController.updateIncome,
);
router.delete(
  "/delete-income/:id",
  authMiddleware,
  incomeController.deleteIncome,
);

module.exports = router;
