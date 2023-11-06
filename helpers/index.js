const { getRowCount, makePoolQuery } = require("./getRowCount");
const { getQueryStringFromArray } = require("./generateTemplateString");
const { getRecieverNameTemplete } = require("./getRecieverNameTemplete");
const { resultFormater } = require("./resultFormater");

module.exports = {
  makePoolQuery,
  getRowCount,
  getQueryStringFromArray,
  getRecieverNameTemplete,
  resultFormater,
};
