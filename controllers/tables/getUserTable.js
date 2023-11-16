const { dateTransformer } = require("../../helpers");
const { pool } = require("../../models/connection");

const getUserTable = async (req, res, next) => {
  const { table = null } = req.params;

  const tableQuery = `SELECT * FROM ${table}`;

  try {
    pool.query(tableQuery, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "table not found",
          code: 404,
        });
      }

      const columns = Object.keys(result[0]).filter(
        (column) => column !== "veteranId"
      );
      const dataWithoutVeteranId = result.map((row) => {
        const { veteranId, createdAt, updatedAt, ...rest } = row;

        return {
          ...rest,
          createdAt: dateTransformer(row.createdAt),
          updatedAt: dateTransformer(row.updatedAt),
        };
      });

      res.status(200).json({
        message: "table data",
        code: 200,
        length: result.length,
        columns,
        data: dataWithoutVeteranId,
      });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserTable };
