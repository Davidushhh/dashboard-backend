const { getUserTable } = require("./getUserTable");

const { createTable } = require("./createTable");
const { getAllTables } = require("./getAllTables");
const { getTableColumnValues } = require("./getTableColumnValues");
const { getTableColumns } = require("./getTableColumns");
const { getTablesList } = require("./getTablesList");

module.exports = {
  getUserTable,
  getTablesList,

  getAllTables,
  getTableColumns,
  getTableColumnValues,
  createTable,
};
