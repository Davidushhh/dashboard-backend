const fs = require("fs");
const { pool } = require("../../models/connection");
const { mailer } = require("../../mailer/mailer");

const { createMessagePdf } = require("../../services/createMessagePdf");
const { getRecieverNameTemplete } = require("../../helpers");

const postDepMessages = async (req, res, next) => {
  const {
    senderName = null,
    senderEmail = null,
    senderAddress = null,
    senderPhone = null,
    recieverLevel,
    recieverDistrict = null,
    recieverHromada = null,
    recieverName = null,
    title = null,
    text = null,
    isAnswerByEmail = null,
  } = req.body;

  const { deputyId, councilId = null, emailList } = req.dep;

  console.log("req.dep in controller:", deputyId, councilId, emailList);

  const newMessageQuery =
    "INSERT INTO dep_messages (deputyId, councilId, senderName, senderEmail, senderAddress, senderPhone, recieverLevel, recieverDistrict, recieverHromada, recieverName, title, text, isAnswerByEmail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    pool.query(
      newMessageQuery,
      [
        deputyId,
        councilId,
        senderName,
        senderEmail,
        senderAddress,
        senderPhone,
        recieverLevel,
        recieverDistrict,
        recieverHromada,
        recieverName,
        title,
        text,
        isAnswerByEmail,
      ],
      async (err, result) => {
        if (err) {
          return res.status(404).json({
            message: "add message error",
            code: 404,
          });
        }

        const pathToPdfFile = await createMessagePdf(req.body);
        const data = fs.readFileSync(pathToPdfFile);

        res.contentType("application/pdf");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=e-message.pdf"
        );

        await res.status(201).send(data);

        await mailer.sendMail({
          from: process.env.SEND_MAIL_FROM,
          to: emailList,
          subject: title,
          text: `Відправник: ${senderName} \nE-mail відправника: ${senderEmail}
          \nОтримувач:\n${getRecieverNameTemplete(
            recieverLevel,
            recieverDistrict,
            recieverHromada
          )} \n${
            recieverName === "isHromadaHead"
              ? "Голова територіальної громади"
              : recieverName
          }
          \nТекст зверненя: \n${text}
          \n
          Переглянути та відповісти на звернення можна в Кабінеті депутата за посиланням: https://analytics.carpathia.gov.ua/cabinet/profile/messages/all
          `,
          attachments: [
            {
              filename: "eMessage.pdf",
              path: pathToPdfFile,
            },
          ],
        });

        await mailer.sendMail({
          from: process.env.SEND_MAIL_FROM,
          to: senderEmail,
          subject: title,
          text: `Відправник: ${senderName} \nE-mail відправника: ${senderEmail}
          \nОтримувач:\n${getRecieverNameTemplete(
            recieverLevel,
            recieverDistrict,
            recieverHromada
          )} \n${
            recieverName === "isHromadaHead"
              ? "Голова територіальної громади"
              : recieverName
          }
          \nТекст зверненя: \n${text}`,
          attachments: [
            {
              filename: "eMessage.pdf",
              path: pathToPdfFile,
            },
          ],
        });

        fs.unlinkSync(pathToPdfFile, (err) => {
          if (err) {
            return res.status(404).json({
              message: "file error",
              code: 404,
            });
          }
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "add message error",
      code: 500,
    });
  }
};

module.exports = { postDepMessages };
