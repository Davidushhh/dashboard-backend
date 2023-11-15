const { pool } = require("../../models/connection");

const updateUserTable = async (req, res, next) => {
  const { table = null } = req.params;
  const { id, data = null } = req.body;

  try {
    if (!data) {
      return res.status(400).json({
        message: "no data provided",
        code: 400,
      });
    }

    // Генеруємо динамічний SET-рядок для оновлення колонок
    const setColumns = Object.keys(data)
      .map((column) => `${column} = ?`)
      .join(", ");

    const updateQuery = `UPDATE ${table} SET ${setColumns} WHERE id = ?`;

    // Формуємо масив значеннь для підстановки в запит
    const values = [...Object.values(data), id];

    pool.query(updateQuery, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(404).json({
          message: err.message,
          code: 404,
        });
      }

      return res.status(200).json({
        message: "data updated",
        code: 201,
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

module.exports = { updateUserTable };
