const { getUserTable } = require("./getUserTable");

const { createTable } = require("./createTable");
const { getAllTables } = require("./getAllTables");
const { getTableColumnValues } = require("./getTableColumnValues");
const { getTableColumns } = require("./getTableColumns");

module.exports = {
  getUserTable,

  getAllTables,
  getTableColumns,
  getTableColumnValues,
  createTable,
};
