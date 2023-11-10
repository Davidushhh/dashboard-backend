const { pool } = require("../../models/connection");

const getTablesList = async (req, res, next) => {
  const { id } = req.user;

  const tablesAccessQuery = `SELECT tablesAccess FROM dep_users WHERE id = ?;`;

  try {
    pool.query(tablesAccessQuery, [id], async (err, result) => {
      if (err) {
        return res.status(404).json({
          message: err.message,
          code: 404,
        });
      }

      console.log(result);

      if (!result || result.length === 0 || !result[0].tablesAccess) {
        return res.status(404).json({
          message: "not found tables for this user",
          code: 404,
        });
      }

      return res.status(200).json({
        message: "tables list",
        code: 200,
        data: result[0].tablesAccess.split(","),
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

module.exports = { getTablesList };
