const createCSVfile = async (req, res, next) => {
  const result = req.body;

  try {
    const columns =
      Object.keys(result[0])
      .join(",") + "\n";

    const rows = result.map((row) => Object.values(row).join(",")).join("\n");

    const csvData = columns + rows;

    // Додаємо BOM до початку файлу
    const BOM = Buffer.from("\uFEFF", "utf-8");

    res.status(201).json({ code: 201, data: BOM + csvData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createCSVfile };
