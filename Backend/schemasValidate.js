const Joi = require("joi");

const teamValidator = Joi.object({
  teamName: Joi.string().max(50).required(),
  igl: Joi.string().max(30).required(),
  player2: Joi.string().max(30).required(),
  player3: Joi.string().max(30).required(),
  player4: Joi.string().max(30).required(),
  logoUrl: Joi.string().uri().optional(), // optional, as it's added by multer
});

module.exports = { teamValidator };
