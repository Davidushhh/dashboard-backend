const express = require("express");
const chartsRouter = express.Router();

const { ctrlWrapper, getQueryChartMD } = require("../../middlewares");

const {
  getPageConfig,
  getChartDataByDynamicQuery,
  getFilterValues,
} = require("../../controllers/charts");

chartsRouter.get("/get-page-config/:pageName", ctrlWrapper(getPageConfig));

chartsRouter.get(
  "/get-chart-data/:id",
  ctrlWrapper(getQueryChartMD),
  ctrlWrapper(getChartDataByDynamicQuery)
);
chartsRouter.get(
  "/get-filter-value/:table/:target",
  ctrlWrapper(getFilterValues)
);

module.exports = chartsRouter;
