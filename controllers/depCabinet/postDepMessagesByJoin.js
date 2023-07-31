const fs = require("fs");
const { pool } = require("../../models/connection");
const { createMessagePdf } = require("../../services/createMessagePdf");

const postDepMessagesByJoin = async (req, res, next) => {
  const {
    senderName,
    senderEmail,
    recieverLevel,
    recieverDistrict = null,
    recieverHromada = null,
    title,
    text,
  } = req.body;

  const newMessageQuery =
    "INSERT INTO dep_messages (senderName, senderEmail, recieverLevel, recieverDistrict, recieverHromada, title, text) VALUES (?, ?, ?, ?, ?, ?, ?)";

  try {
    pool.query(
      newMessageQuery,
      [
        senderName,
        senderEmail,
        recieverLevel,
        recieverDistrict,
        recieverHromada,
        title,
        text,
      ],
      async (err, result) => {
        if (err) {
          return res.status(404).json({
            message: err.message,
            code: 404,
          });
        }

        try {
          const pathToPdfFile = await createMessagePdf(req.body);
          const data = fs.readFileSync(pathToPdfFile);

          console.log("pathToPdfFile", pathToPdfFile);
          console.log("data", data);

          res.contentType("application/pdf");
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=e-message.pdf"
          );

          return res.status(201).send(data);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { postDepMessagesByJoin };
