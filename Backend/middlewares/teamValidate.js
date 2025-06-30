const Joi = require('joi');

exports.validateTeam = (req, res, next) => {
  const schema = Joi.object({
    teamName: Joi.string().max(50).required(),
    mobileNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        'string.pattern.base': 'Mobile number must be a 10-digit number'
      }),
    igl: Joi.string().max(30).required(),
    player2: Joi.string().max(30).required(),
    player3: Joi.string().max(30).required(),
    player4: Joi.string().max(30).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      success: false,
      message: error.details[0].message 
    });
  }

  next();
};