const { pool } = require("../../models/connection");

const logout = async (req, res, next) => {
  const { id } = req.user;

  const user = `SELECT id FROM dep_users WHERE id = ?`;

  try {
    pool.query(user, [id], function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      if (!result.length) {
        return res.status(401).json({
          message: "not authorized",
          code: 401,
        });
      }

      const updateToken = `UPDATE dep_users SET token = ? WHERE id = ?`;

      pool.query(updateToken, [null, id], (err, result) => {
        if (err) {
          return res.status(404).json({
            message: "not found",
            code: 404,
          });
        }

        res.json({
          message: "no content",
          code: 204,
        });
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "logout error",
      code: 500,
    });
  }
};

module.exports = { logout };
