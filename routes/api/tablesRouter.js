const express = require("express");
const tableRouter = express.Router();

const {
  ctrlWrapper,
  authMiddleware,
  userTablesAccessChecker,
} = require("../../middlewares");

const {
  getTablesList,
  getUserTable,
  updateUserTable,
} = require("../../controllers/tables");
const {
  serviceUpdateValidation,
} = require("../../middlewares/tablesMiddlewares");

// список доступних таблиць воркера
tableRouter.get("/get-tables", authMiddleware, ctrlWrapper(getTablesList));

// дістати всю таблицю користувача з колонки tableAcces
tableRouter.get(
  "/get-table/:table",
  authMiddleware,
  // userTablesAccessChecker,
  ctrlWrapper(getUserTable)
);

// оновити дані таблиці користувача - поля статус чи комент
tableRouter.patch(
  "/:table",
  authMiddleware,
  // serviceUpdateValidation,
  ctrlWrapper(updateUserTable)
);

module.exports = tableRouter;
