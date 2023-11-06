const express = require("express");
const tableRouter = express.Router();

const {
  ctrlWrapper,
  authMiddleware,
  userTablesAccessChecker,
} = require("../../middlewares");

const {
  getUserTable,

  // getAllTables,
  // createTable,
  // getTableColumns,
  // getTableColumnValues,
} = require("../../controllers/tables");

// get user table
tableRouter.get(
  "/get-table/:table",
  authMiddleware,
  userTablesAccessChecker,
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
