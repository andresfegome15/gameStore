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

const createuserValidator = [
  body("name").notEmpty().withMessage("Name cannot be null"),
  body("email").isEmail().withMessage("format email no valid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password length 8 characters long")
    .isAlphanumeric()
    .withMessage("Password contain letters and numbers"),
  checkedResult,
];

const updateUserValidator = [
  body("name").notEmpty().withMessage("Name cannot be null"),
  body("email").isEmail().withMessage("format email no valid"),
  checkedResult,
];

module.exports = { createuserValidator, updateUserValidator };
