const { pool } = require("../../models/connection");
const {
  queryFilterFormater,
} = require("../../middlewares/queryFilterFormater");

const getFilterValues = async (req, res, next) => {
  const { target, table } = req.params;
  const { filter } = req.query;

  let query = `SELECT ${target} FROM ${table} filterVar GROUP BY ${target}`;

  query = queryFilterFormater(query, filter);

  try {
    pool.query(query, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
          data: err,
        });
      }

      result = result.map((item) => Object.values(item)[0]);

      res.status(200).json({
        message: "data by params",
        code: 200,
        length: result.length,
        data: result,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "data error", code: 500 });
  }
};

module.exports = { getFilterValues };
