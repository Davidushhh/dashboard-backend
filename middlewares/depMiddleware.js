const { makePoolQuery } = require("../helpers");
const { pool } = require("../models/connection");

const depMiddleware = async (req, res, next) => {
  const {
    recieverLevel,
    recieverName = null,
    recieverDistrict = null,
    recieverHromada = null,
  } = req.body;

  let depDataQuery = `SELECT
  u.id,
  u.email
  FROM dep_users AS u
  WHERE u.structureName = ?;`;

  if (recieverName === "isHromadaHead") {
    depDataQuery = `
    SELECT
    u.id,
    u.email
    FROM dep_users AS u
    WHERE u.structureName LIKE ? AND u.access = 'hromada';`;
  }

  try {
    if (recieverName === "isHromadaHead") {
      pool.query(
        depDataQuery,
        [`${recieverHromada}%`],
        async function (err, result, fields) {
          if (err) {
            return res.status(404).json({
              message: err,
              code: 404,
            });
          }

          if (!result.length) {
            return res.status(404).json({
              message: "not found",
              code: 404,
            });
          }

          req.dep = {
            deputyId: null,
            councilId: result[0].id,
            emailList: result[0].email,
          };

          next();
        }
      );
    } else {
      pool.query(
        depDataQuery,
        [recieverName],
        async function (err, result, fields) {
          if (err) {
            return res.status(404).json({
              message: err,
              code: 404,
            });
          }

          if (!result.length) {
            return res.status(404).json({
              message: "not found",
              code: 404,
            });
          }

          const councilDataQuery = `SELECT
        u.id,
        u.email
        FROM dep_users AS u
        WHERE u.access = '${recieverLevel}'
        AND u.position = 'council'
        AND (
	      (u.access = 'oda')
        OR
        (u.district = '${recieverDistrict}' AND '${recieverLevel}' = 'district')
        OR
        (u.hromada = '${recieverHromada}' AND '${recieverLevel}' = 'hromada')
        );`;

          const councilData = await makePoolQuery(councilDataQuery);

          const emailList = [];
          result.map((item) => emailList.push(item.email));
          councilData.map((item) => emailList.push(item.email));

          req.dep = {
            deputyId: result[0].id,
            councilId: councilData[0].id,
            emailList: emailList,
          };
          next();
        }
      );
    }
  } catch (error) {
    return res.status(500).json({
      message: "dep data error",
      code: 500,
    });
  }
};

module.exports = { depMiddleware };
