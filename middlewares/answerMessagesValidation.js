const Joi = require("joi");

const answerMessagesValidation = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().max(100).required(),
    text: Joi.string().min(3).max(2000).required(),
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
  answerMessagesValidation,
};
