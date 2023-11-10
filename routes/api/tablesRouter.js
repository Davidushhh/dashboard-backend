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

  getAllTables,
  // createTable,
  // getTableColumns,
  // getTableColumnValues,
} = require("../../controllers/tables");

// список доступних таблиць воркера
tableRouter.get("/get-tables", authMiddleware, ctrlWrapper(getTablesList));

// дістати всю таблицю воркера
tableRouter.get(
  "/get-table/:table",
  authMiddleware,
  // userTablesAccessChecker,
  ctrlWrapper(getUserTable)
);

// tableRouter.get("/tables/all", ctrlWrapper(getAllTables));
// tableRouter.get("/tables/columns/all/:table", ctrlWrapper(getTableColumns));
// tableRouter.get(
//   "/tables/columns/values/:table/:column",
//   ctrlWrapper(getTableColumnValues)
// );
// tableRouter.post("/tables/create", ctrlWrapper(createTable));

module.exports = tableRouter;
