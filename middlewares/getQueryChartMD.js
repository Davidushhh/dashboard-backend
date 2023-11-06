const { pool } = require("../models/connection");

const getQueryChartMD = async (req, res, next) => {
  const id = req.params.id;

  const query = `SELECT query, title FROM ch_charts WHERE id = ?;`;

  try {
    pool.query(query, [id], function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      if (!result.length || result[0].query === null) {
        return res.status(404).json({
          message: "not found or no query",
          code: 404,
        });
      }

      req.chartQuery = result[0];
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: "data error",
      code: 500,
    });
  }
};

module.exports = { getQueryChartMD };
