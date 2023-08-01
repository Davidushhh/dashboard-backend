const fs = require("fs");
const path = require("path");
const { jsPDF } = require("jspdf");
const { fontRoboto } = require("../fonts/fontRoboto");

const createMessagePdf = async (messageData) => {
  const {
    senderName,
    senderEmail,
    senderAddress,
    senderPhone,
    recieverLevel,
    recieverDistrict,
    recieverHromada,
    title,
    text,
    isAnswerByEmail,
  } = messageData;

  const doc = new jsPDF({ fontSize: 12, lineHeight: 1 });

  // Додавання тексту з використанням встановленого шрифту
  doc.addFileToVFS("Roboto-Regular.ttf", fontRoboto());
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");

  doc.setFont("Roboto");

  // Розмір сторінки A4 (ширина x висота)
  const pageWidth = 210;
  const pageHeight = 297;

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
  doc.text("Звернення", 97, 100);
  // doc.text(title, 14, 100);

  // Розбиваємо довгий текст на кілька рядків
  const marginLeft = 14;
  const marginRight = 10;
  const textX = marginLeft;
  let textY = 115;

  const lines = doc.splitTextToSize(text, pageWidth - marginLeft - marginRight);

  doc.text(lines, textX, textY);
  // lines.forEach((line) => {
  //   doc.text(line, textX, textY);
  //   textY += lineHeight;
  // });

  if (true) {
    doc.text("Бажаю отримати відповідь на email.", 14, 270);
  }

  doc.text(new Date().toLocaleDateString(), 14, 280);
  doc.text(senderName, 105, 280);

  // Збереження PDF файлу
  const filePath = path.join(__dirname, "e-message.pdf");
  doc.save(filePath);

  return filePath;
};

module.exports = { createMessagePdf };
