const { pool } = require("../../models/connection");

const {
  messagesOdaQuery,
  messagesDistrictQuery,
  messagesHromadaQuery,
  messagesOdaDeputyQuery,
  messagesDistictDeputyQuery,
  messagesHromadaDeputyQuery,
} = require("./depCabinetQuerys");

const getDepMessagesByJoin = async (req, res, next) => {
  const { id } = req.user;
  const { page = 0, limit = 10 } = req.query;
  const skip = page * limit;

  const messageQuery = `SELECT 
  access,
  district,
  hromada,
  position,
  structureName
  FROM dep_users
  WHERE id = ?`;

  try {
    pool.query(messageQuery, [id], function (err, result, fields) {
      if (err) {
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      if (!result.length) {
        return res.status(404).json({
          message: "not found",
          code: 404,
        });
      }

      let queryByLevel = "";

      if (result[0].access === "oda" && result[0].position === "council") {
        console.log("oda & concil");
        queryByLevel = messagesOdaQuery(limit, skip);
      }

      if (result[0].access === "district" && result[0].position === "council") {
        queryByLevel = messagesDistrictQuery(limit, skip, result[0].district);
      }

      if (result[0].access === "hromada" && result[0].position === "council") {
        queryByLevel = messagesHromadaQuery(limit, skip, result[0].hromada);
      }

      if (result[0].access === "oda" && result[0].position === "deputy") {
        queryByLevel = messagesOdaDeputyQuery(
          limit,
          skip,
          result[0].structureName
        );
      }

      if (result[0].access === "district" && result[0].position === "deputy") {
        queryByLevel = messagesDistictDeputyQuery(
          limit,
          skip,
          result[0].district,
          result[0].structureName
        );
      }

      if (result[0].access === "hromada" && result[0].position === "deputy") {
        console.log("hromada & deputy");
        queryByLevel = messagesHromadaDeputyQuery(
          limit,
          skip,
          result[0].hromada,
          result[0].structureName
        );
      }

      pool.query(queryByLevel, function (err, result, fields) {
        if (err) {
          return res.status(404).json({
            message: "not found",
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
            totalCount: result[0].totalCount,
            userMessages: result,
          },
          code: 200,
        });
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "dep messages error",
      code: 500,
    });
  }
};

module.exports = { getDepMessagesByJoin };
