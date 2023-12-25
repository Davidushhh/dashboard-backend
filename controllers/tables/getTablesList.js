const { pool } = require("../../models/connection");

const getTablesList = async (req, res, next) => {
  const { id } = req.user;
  const { DB } = process.env;

  const tablesAccessQuery = `SELECT tablesAccess FROM dep_users WHERE id = ?;`;

  try {
    pool.query(tablesAccessQuery, [id], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
          code: 500,
        });
      }

      if (!result || result.length === 0 || !result[0].tablesAccess) {
        return res.status(404).json({
          message: "not found tables for this user",
          code: 404,
        });
      }

      const tableNames = result[0].tablesAccess.split(",");

      const tablesInfoPromises = tableNames.map((tableName) => {
        return new Promise((resolve, reject) => {
          const updateTimeQuery = `
            SELECT UPDATE_TIME, vs.serviceName_cyrillic, vs.documents, vs.details
            FROM information_schema.tables t
            LEFT JOIN tablesMeta_list vs ON t.table_name = vs.tableName
            WHERE t.table_schema = ?
            AND t.table_name = ?;
          `;

          pool.query(updateTimeQuery, [DB, tableName], (err, result) => {
            if (err) {
              reject(err);
            } else {
              if (!result || result.length === 0 || result === undefined) {
                reject({
                  status: 404,
                  message: "not found data",
                  code: 404,
                });
              } else {
                resolve({
                  tableName,
                  serviceName_cyrillic: result[0].serviceName_cyrillic,
                  documents: result[0].documents?.split(","),
                  details: result[0].details,
                  updateTime: result[0].UPDATE_TIME,
                });
              }
            }
          });
        });
      });

      Promise.all(tablesInfoPromises)
        .then((tablesInfo) => {
          return res.status(200).json({
            message: "tables list with update time and additional data",
            code: 200,
            data: tablesInfo,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: error.message,
            code: 500,
          });
        });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};

module.exports = { getTablesList };
