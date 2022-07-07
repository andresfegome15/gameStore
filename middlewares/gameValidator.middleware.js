const { body, validationResult } = require("express-validator");

const { GlobalError } = require("../utils/GlobalError.utils");

const checkedResult = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const MsgsError = error.array().map(err => err.msg);
    const messeg = MsgsError.join(". ");
    return next(new GlobalError(messeg, 400));
  }
  next();
};

const creategameValidator = [
  body("title").notEmpty().withMessage("title cannot be null"),
  body("genre").notEmpty().withMessage("genre cannot be null"),
  checkedResult,
];

const updategameValidator = [
  body("title").notEmpty().withMessage("title cannot be null"),
  checkedResult,
];

const createCommentValidator = [
  body("comment").notEmpty().withMessage("comment cannot be null"),
  checkedResult,
];

module.exports = {
  creategameValidator,
  updategameValidator,
  createCommentValidator,
};
