const fs = require("fs");
const path = require("path");
const { jsPDF } = require("jspdf");
const { testFont, fontRoboto } = require("../fonts/fontRoboto");
const { optional } = require("joi");

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

  const doc = new jsPDF();

  // Додавання тексту з використанням встановленого шрифту
  doc.addFileToVFS("Roboto-Regular.ttf", fontRoboto());
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");

  doc.setFont("Roboto");
  doc.setFontSize(12);

  // Розмір сторінки A4 (ширина x висота)
  const pageWidth = 210;
  const pageHeight = 297;

  // Додавання інформації до PDF файлу
  // Функція для виведення тексту посередині сторінки по осі x
  const textCentered = (text, y) => {
    const textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, y);
  };

  // Одержувач
  if (recieverLevel === "oda") {
    doc.text("Закарпатська ОДА - ОВА", 105, 10);
  }

  if (recieverDistrict) {
    doc.text(`${recieverDistrict} район`, 105, 20);
  }

  if (recieverHromada) {
    doc.text(`${recieverHromada} територіальна громада`, 105, 30);
  }

  // Відправник
  doc.text(senderName, 105, 50);
  doc.text(senderEmail, 105, 60);
  doc.text("88000, м.Ужгород, пл. Народна, 4", 105, 70);
  doc.text("+380 50 55 55 555", 105, 80);

  // Основний текст
  doc.text(`Тема: ${title}`, 20, 100);
  doc.text(text, 10, 115);

  // doc.text(Date.now(), 10, 270);

  // Збереження PDF файлу
  const filePath = path.join(__dirname, "e-message.pdf");
  doc.save(filePath);

  return filePath;
};

module.exports = { createMessagePdf };
