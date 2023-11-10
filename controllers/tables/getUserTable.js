const { pool } = require("../../models/connection");

const getUserTable = async (req, res, next) => {
  const { table = null } = req.params;
  console.log("table:", table);

  console.log("here");
  const tableQuery = `SELECT * FROM ${table}`;

  try {
    pool.query(tableQuery, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "table not found",
          code: 404,
        });
      }

      res.status(200).json({
        message: "table data",
        code: 200,
        length: result.length,
        data: result,
      });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserTable };
