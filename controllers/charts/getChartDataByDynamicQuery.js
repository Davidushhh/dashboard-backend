const { pool } = require("../../models/connection");
const { resultFormater } = require("../../helpers");
const { queryFilterFormater } = require("../../middlewares");

const getChartDataByDynamicQuery = async (req, res, next) => {
  const { query, title } = req.chartQuery;
  const { filter } = req.query;

  const formatedQuery = queryFilterFormater(query, filter);

  try {
    pool.query(formatedQuery, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      if (!result.length) {
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      const isCustomLabels = formatedQuery.includes("customLabels");

      const formattedResult = resultFormater(result, isCustomLabels);

      res.status(200).json({
        message: "success",
        data: {
          length: result.length,
          chartName: title,
          data: formattedResult,
        },
        code: 200,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "data error",
      code: 500,
    });
  }
};

module.exports = { getChartDataByDynamicQuery };
