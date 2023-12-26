// const fs = require("fs");
// const path = require("path");
const { dateTransformer } = require("../../helpers/dateTransformer");

const createCSVfile = async (req, res, next) => {
  const result = req.body;

  try {
    const columns =
      Object.keys(result[0])
        // .filter((column) => column !== "veteranId")
        // .map((column) => {
        //   console.log(column);
        //   switch (column) {
        //     case "id":
        //       return "№ п/п";
        //     case "createdAt":
        //       return "Створено";
        //     case "updatedAt":
        //       return "Оновлено";
        //     default:
        //       return column;
        //   }
        // })
        .join(",") + "\n";

    const rows = result
      // .map((row, index) => {
      //   const { id, veteranId = null, createdAt, updatedAt, ...rest } = row;

      //   const idx = index + 1;

      //   return {
      //     idx,
      //     ...rest,
      //     createdAt: dateTransformer(row.createdAt),
      //     updatedAt: dateTransformer(row.updatedAt),
      //   };
      // })
      .map((row) => Object.values(row).join(","))
      .join("\n");

    const csvData = columns + rows;

    // Додаємо BOM до початку файлу
    const BOM = Buffer.from("\uFEFF", "utf-8");
    // const pathToFile = path.join(__dirname, "table_data.csv");

    // fs.writeFile(pathToFile, BOM + csvData, (err, data) => {
    //   if (err) {
    //     return res.status(500).json({ message: "csv export failed" });
    //   }

    // res.setHeader(
    //   "Content-Disposition",
    //   "attachment; filename=table_data.csv"
    // );

    res.status(201).json({ code: 201, data: BOM + csvData });
    // .sendFile("table_data.csv", { root: __dirname }, () => {
    //   fs.unlink(pathToFile, (err) => {
    //     if (err) {
    //       res.status(500).json({ message: err.message });
    //     }
    //   });
    // });
    // });
    // });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createCSVfile };
