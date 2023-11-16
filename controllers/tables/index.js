const { getUserTable } = require("./getUserTable");
const { getTablesList } = require("./getTablesList");
const { updateUserTable } = require("./updateUserTable");
const { createCSVfile } = require("./createCSVfile");
createCSVfile;

module.exports = {
  getUserTable,
  getTablesList,
  updateUserTable,
  createCSVfile,
};
