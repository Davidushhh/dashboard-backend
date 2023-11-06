const { pool } = require("../../models/connection");

const getDeputyName = async (req, res, next) => {
  const { recieverLevel } = req.params;
  const {
    depName = null,
    recieverDistrict = null,
    recieverHromada = null,
  } = req.query;

  let depQuery = "";

  const depOdaQuery = `SELECT 
  u.structureName AS deputy
  FROM dep_users AS u
  WHERE u.structureName LIKE '%${depName}%' 
  AND u.access = 'oda' 
  AND u.position = 'deputy'
  LIMIT 10;`;

  const depDistrictQuery = `SELECT 
  u.structureName AS deputy
  FROM dep_users AS u
  WHERE u.structureName LIKE '%${depName}%' 
  AND u.access = 'district'
  AND u.district = '${recieverDistrict}' 
  AND u.position = 'deputy'
  LIMIT 10;`;

  const depHromadaQuery = `SELECT 
  u.structureName AS deputy
  FROM dep_users AS u
  WHERE u.structureName LIKE '%${depName}%' 
  AND u.access = 'hromada'
  AND u.hromada = '${recieverHromada}' 
  AND u.position = 'deputy'
  LIMIT 10;`;

  if (recieverLevel === "oda") {
    console.log("dep from oda");
    depQuery = depOdaQuery;
  }

  if (recieverLevel === "district") {
    console.log("dep from district");
    depQuery = depDistrictQuery;
  }

  if (recieverLevel === "hromada") {
    console.log("dep from hromada");
    depQuery = depHromadaQuery;
  }

  try {
    pool.query(depQuery, function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: err.message,
          code: 404,
        });
      }

      if (!result.length) {
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      res.status(200).json({
        message: "success",
        data: {
          length: result.length,
          result,
        },
        code: 200,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "data error",
      code: 500,
    });
  }
};

module.exports = { getDeputyName };
