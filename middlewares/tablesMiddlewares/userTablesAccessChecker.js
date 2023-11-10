const { pool } = require("../../models/connection");

const userTablesAccessChecker = async (req, res, next) => {
  const { table } = req.params;
  const { id } = req.user;
  console.log("table in middleware checker:", table);

  const tableQuery = `SELECT structureName FROM dep_users WHERE id = ? AND tablesAccess LIKE ?;`;
  const searchPattern = `%${table}%`;

  try {
    if (!table) {
      return res.status(404).json({
        message: "no table provided",
        code: 404,
      });
    }

    pool.query(tableQuery, [id, searchPattern], function (err, result, fields) {
      if (err) {
        console.log(err);
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      console.log(result);

      res.status(200).json({
        message: "user table",
        code: 200,
        length: result.length,
        data: result,
      });

      next();
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { userTablesAccessChecker };
