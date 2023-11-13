const Joi = require("joi");

const serviceUpdateValidation = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.required(),
    serviceStatus: Joi.string().valid("В обробці", "Погоджено", "Відмова"),
    comment: Joi.string().min(3).max(2000),
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

module.exports = { serviceUpdateValidation };
