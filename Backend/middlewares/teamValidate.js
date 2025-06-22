const {teamValidator}=require("../schemasValidate.js")
// Middleware for validating request
module.exports.teamValidate=(req, res, next) => {
  const { error } = teamValidator.validate(req.body, { abortEarly: false });
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(', ');
    throw new ExpressError(400, errMsg); // throws to your error handler
  }
  next();
};