// validators/teamValidator.js
const Joi = require("joi");
module.exports.teamValidator= Joi.object({
  teamName: Joi.string().max(50).required(),
  igl: Joi.string().max(30).required(),
  player2: Joi.string().max(30).required(),
  player3: Joi.string().max(30).required(),
  player4: Joi.string().max(30).required(),
  submittedBy: Joi.string().hex().length(24).optional() // MongoDB ObjectId
});