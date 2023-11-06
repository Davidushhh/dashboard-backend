const { pool } = require("../../models/connection");
const { mailer } = require("../../mailer/mailer");

const { getRecieverNameTemplete } = require("../../helpers");

const answerDepMessage = async (req, res, next) => {
  const { id = null, title = null, text = null } = req.body;

  const {
    senderName,
    senderEmail,
    recieverLevel,
    recieverDistrict,
    recieverHromada,
    recieverName,
  } = req.message;

  const newMessageQuery = "UPDATE dep_messages SET textAnswer = ? WHERE id = ?";

  try {
    pool.query(newMessageQuery, [text, id], async (err, result) => {
      if (err) {
        return res.status(404).json({
          message: "answer message error",
          code: 404,
        });
      }

      await mailer.sendMail(
        {
          from: process.env.SEND_MAIL_FROM,
          to: senderEmail,
          subject: title,
          text: `Відправник: ${getRecieverNameTemplete(
            recieverLevel,
            recieverDistrict,
            recieverHromada
          )} \nДепутат: ${recieverName} \nКому: ${senderName} \nВідповідь на Ваше зверненя: ${text}`,
        },
        (err, info) => {
          if (err) {
            console.log(err);
          }
        }
      );

      return res.status(200).json({
        message: "answer sended",
        code: 200,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "add message error",
      code: 500,
    });
  }
};

module.exports = { answerDepMessage };
