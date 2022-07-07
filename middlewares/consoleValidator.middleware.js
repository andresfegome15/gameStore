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

const createConsoleValidator = [
  body("name").notEmpty().withMessage("name cannot be null"),
  body("company").notEmpty().withMessage("company cannot be null"),
  checkedResult,
];

const updateConsoleValidator = [
  body("name").notEmpty().withMessage("title cannot be null"),
  checkedResult,
];

module.exports = { createConsoleValidator, updateConsoleValidator };
