const { pool } = require("../../models/connection");
const fs = require("fs");

const createCSVfile = async (req, res, next) => {
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

      const columns = Object.keys(result[0]).join(",") + "\n";
      const rows = result
        .map((row) => Object.values(row))
        .map((row) => row.join(","))
        .join("\n");

      const csvData = columns + rows;
      console.log(csvData);

      // Додаємо BOM до початку файлу
      const BOM = Buffer.from("\uFEFF", "utf-8");
      const path = __dirname + "/table_data.csv";

      fs.writeFile(path, BOM + csvData, (err, data) => {
        if (err) {
          return res.status(500).json({ message: "csv export failed" });
        }

        res.sendFile("table_data.csv", { root: __dirname });

        // fs.unlink(path, (err) => {
        //   if (err) console.log(err);
        // });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createCSVfile };
