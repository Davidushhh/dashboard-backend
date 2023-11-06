const { pool } = require("../../models/connection");

const getUserTable = async (req, res, next) => {
  const { table = null } = req.params;
  console.log("table:", table);

  const tableQuery = `SELECT * FROM ?`;

  try {
    pool.query(tableQuery, [table], function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      res.status(200).json({
        message: "user table",
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
