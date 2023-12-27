const { dateTransformer } = require("../../helpers");
const { pool } = require("../../models/connection");

const getUserTable = async (req, res, next) => {
  const { table = null } = req.params;

  // Отримати інформацію про стовпці таблиці з INFORMATION_SCHEMA
  const columnInfoQuery = `
    SELECT COLUMN_NAME, COLUMN_TYPE, COLUMN_COMMENT
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = '${table}';
  `;

  try {
    pool.query(columnInfoQuery, async function (err, columnsResult, fields) {
      if (err) {
        return res.status(404).json({
          message: "table not found",
          code: 404,
        });
      }

      const visibleColumns = columnsResult
        .filter((column) => column.COLUMN_COMMENT !== "not visible")
        .map((column) => {
          console.log(column.COLUMN_NAME);
          switch (column.COLUMN_NAME) {
            case "createdAt":
              return "Створено";
            case "updatedAt":
              return "Оновлено";
            default:
              return column.COLUMN_NAME;
          }
        });

      const editableColumns = columnsResult
        .filter((column) => column.COLUMN_COMMENT === "editable")
        .map((column) => {
          let type = "string";
          let valueOptions = null;

          if (column.COLUMN_TYPE.includes("enum")) {
            type = "singleSelect";

            const valuesString = column.COLUMN_TYPE.replace(/^enum\(|\)$/g, "");
            valueOptions = valuesString
              .split(",")
              .map((value) => value.trim().replace(/^'|'$/g, ""));
          }

          return {
            [column.COLUMN_NAME]: {
              type,
              valueOptions,
              editable: true,
            },
          };
        });

      // Отримати дані з таблиці
      const tableQuery = `SELECT * FROM ${table}`;
      pool.query(tableQuery, function (err, result, fields) {
        if (err) {
          return res.status(404).json({
            message: "table not found",
            code: 404,
          });
        }

        // Обробка результатів та вибірка необхідних полів
        const dataWithoutVeteranId = result.map((row, index) => {
          const { id, veteranId = null, createdAt, updatedAt, ...rest } = row;

          const idx = index + 1;

          return {
            "№ п/п": idx,
            id,
            ...rest,
            Створено: dateTransformer(row.createdAt),
            Оновлено: dateTransformer(row.updatedAt),
          };
        });

        res.status(200).json({
          message: "table data",
          code: 200,
          length: result.length,
          columns: ["№ п/п", ...visibleColumns],
          editableColumns,
          data: dataWithoutVeteranId,
        });
      });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserTable };

// comment
