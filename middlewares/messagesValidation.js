const Joi = require("joi");

const messagesValidation = (req, res, next) => {
  const schema = Joi.object({
    senderName: Joi.string().min(3).max(100).required(),
    senderEmail: Joi.string().min(3).max(100),
    senderAddress: Joi.string().min(3).max(100),
    senderPhone: Joi.string().min(3).max(20),
    recieverLevel: Joi.string().valid("oda", "district", "hromada").required(),
    recieverDistrict: Joi.string().valid(
      "Ужгородський",
      "Мукачівський",
      "Берегівський",
      "Хустський",
      "Тячівський",
      "Рахівський",
      null
    ),
    recieverHromada: Joi.string().valid(
      "Великобийганська",
      "Вилоцька",
      "Виноградівська",
      "Батівська",
      "Пийтерфолвівська",
      "Королівська",
      "Великоберезька",
      "Камянська",
      "Берегівська",
      "Косоньська",
      "Івановецька",
      "Полянська",
      "Мукачівська",
      "Верхньокоропецька",
      "Неліпинська",
      "Великолучківська",
      "Горондівська",
      "Жденіївська",
      "Кольчинська",
      "Нижньоворітська",
      "Свалявська",
      "Чинадіївська",
      "Воловецька",
      "Великобичківська",
      "Рахівська",
      "Ясінянська",
      "Богданська",
      "Усть-Чорнянська",
      "Углянська",
      "Вільховецька",
      "Нересницька",
      "Бедевлянська",
      "Тячівська",
      "Солотвинська",
      "Буштинська",
      "Дубівська",
      "Тересвянська",
      "Оноківська",
      "Перечинська",
      "Турє-Реметівська",
      "Чопська",
      "Середнянська",
      "Сюртівська",
      "Дубриницько-Малоберезнянська",
      "Костринська",
      "Ставненська",
      "Ужгородська",
      "Холмківська",
      "Баранинська",
      "Великоберезнянська",
      "Великодобронська",
      "Колочавська",
      "Драгівська",
      "Керецьківська",
      "Зарічанська",
      "Синевирська",
      "Горінчівська",
      "Міжгірська",
      "Іршавська",
      "Білківська",
      "Вишківська",
      "Пилипецька",
      "Хустська",
      "Довжанська",
      null
    ),
    recieverName: Joi.string().min(3).max(100).required(),
    recieverEmail: Joi.string().min(3).max(100),
    title: Joi.string().max(100),
    text: Joi.string().min(3).max(2000).required(),
    isAnswerByEmail: Joi.boolean(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details,
      code: 400,
    });
  }

  next();
};

module.exports = {
  messagesValidation,
};
