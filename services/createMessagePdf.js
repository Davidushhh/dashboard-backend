const fs = require("fs");
const path = require("path");
const { jsPDF } = require("jspdf");
const { testFont, fontRoboto } = require("../fonts/fontRoboto");

// Завантаження шрифту
// const fontPath = "./fonts/Roboto-Regular.ttf";

// const fontData = fs.readFileSync(fontPath);

// const customFont = {
//   type: "truetype",
//   data: fontData,
// };

const createMessagePdf = async (messageData) => {
  const {
    senderName,
    senderEmail,
    recieverLevel,
    recieverDistrict,
    recieverHromada,
    title,
    text,
  } = messageData;

  // Створення нового PDF документу і встановлення шрифту

  const doc = new jsPDF();

  // Додавання тексту з використанням встановленого шрифту
  doc.addFileToVFS("Roboto-Regular.ttf", fontRoboto());
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");

  // console.log("+++++", doc.getFontList());
  doc.setFont("Roboto");

  // Додавання інформації до PDF файлу
  doc.setFontSize(12);
  doc.text(`Відправник: ${senderName}`, 20, 20);
  doc.text(`email: ${senderEmail}`, 20, 30);
  doc.text(`Receiver Level: ${recieverLevel}`, 20, 40);

  if (recieverDistrict) {
    doc.text(`Район: ${recieverDistrict}`, 20, 50);
  }

  if (recieverHromada) {
    doc.text(`Громада: ${recieverHromada}`, 20, 60);
  }

  // Додавання тексту "Звернення" перед полем title
  doc.text("Звернення", 50, 70);
  doc.text(`Тема: ${title}`, 20, 80);
  doc.text(text, 20, 90);

  // Збереження PDF файлу
  const filePath = path.join(__dirname, "e-message.pdf");
  doc.save(filePath);

  return filePath;
};

module.exports = { createMessagePdf };
