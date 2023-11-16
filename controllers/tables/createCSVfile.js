const fs = require("fs");
const path = require("path");
const { pool } = require("../../models/connection");
const { dateTransformer } = require("../../helpers/dateTransformer");

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

      const columns =
        Object.keys(result[0])
          .filter((column) => column !== "veteranId")
          .join(",") + "\n";

      const rows = result
        .map((row) => {
          const { veteranId, createdAt, updatedAt, ...rest } = row;

          return {
            ...rest,
            createdAt: dateTransformer(row.createdAt),
            updatedAt: dateTransformer(row.updatedAt),
          };
        })
        .map((row) => Object.values(row).join(","))
        .join("\n");

      const csvData = columns + rows;

      // Додаємо BOM до початку файлу
      const BOM = Buffer.from("\uFEFF", "utf-8");
      const pathToFile = path.join(__dirname, "table_data.csv");

      fs.writeFile(pathToFile, BOM + csvData, (err, data) => {
        if (err) {
          return res.status(500).json({ message: "csv export failed" });
        }

        res.status(201).sendFile("table_data.csv", { root: __dirname }, () => {
          fs.unlink(pathToFile, (err) => {
            if (err) {
              res.status(500).json({ message: err.message });
            }
          });
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createCSVfile };
