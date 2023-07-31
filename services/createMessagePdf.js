const fs = require("fs");
const path = require("path");
const { jsPDF } = require("jspdf");

// Завантаження шрифту
const fontPath = path.join("./", "fonts", "times.ttf");

console.log("fontPath:", fontPath);

const fontData = fs.readFileSync("./fonts/times.ttf");
const customFont = {
  type: "truetype",
  data: fontData,
};

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
  // doc.addFont(customFont.data, "times", "normal");
  // doc.setFont("times"); // Встановлення шрифту

  // Додавання інформації до PDF файлу
  doc.setFontSize(14);
  doc.text(`Відправник: ${senderName}`, 20, 20);
  doc.text(`Email: ${senderEmail}`, 20, 30);
  doc.text(`Receiver Level: ${recieverLevel}`, 20, 40);

  if (recieverDistrict) {
    doc.text(`Район: ${recieverDistrict}`, 20, 50);
  }

  if (recieverHromada) {
    doc.text(`Громада: ${recieverHromada}`, 20, 60);
  }

  console.log("here");
  // Додавання тексту "Звернення" перед полем title
  // doc.text("Звернення", 20, 70);
  doc.text(`Тема: ${title}`, 20, 80);
  doc.text(text, 20, 90);

  // Збереження PDF файлу
  const filePath = path.join(__dirname, "e-message.pdf");
  doc.save(filePath);

  return filePath;
};

module.exports = { createMessagePdf };
