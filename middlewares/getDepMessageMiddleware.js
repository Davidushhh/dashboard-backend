const { pool } = require("../models/connection");

const getDepMessageMiddleware = async (req, res, next) => {
  const { id = null } = req.body;

  const depMessageQuery = `SELECT
  m.deputyId,
  m.councilId,
  m.senderName,
  m.senderEmail,
  m.recieverLevel,
  m.recieverDistrict,
  m.recieverHromada,
  m.recieverName,
  m.isAnswerByEmail,
  m.textAnswer,
  m.createdAt
  FROM dep_messages AS m
  WHERE m.id = ?;`;

  try {
    pool.query(depMessageQuery, [id], async function (err, result, fields) {
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

      if (result[0].textAnswer) {
        return res.status(400).json({
          message: "answer is already exist",
          code: 404,
        });
      }

      req.message = {
        senderName: result[0].senderName,
        senderEmail: result[0].senderEmail,
        recieverLevel: result[0].recieverLevel,
        recieverDistrict: result[0].recieverDistrict,
        recieverHromada: result[0].recieverHromada,
        recieverName: result[0].recieverName,
      };

      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: "dep data error",
      code: 500,
    });
  }
};

module.exports = { getDepMessageMiddleware };
