const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//models
const { User } = require("../models/users.models");

//utils
const { catchAsyn } = require("../utils/catchAsync");
const { GlobalError } = require("../utils/GlobalError.utils");

const seccionProteted = catchAsyn(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    next(new GlobalError("seccion invalid, sing in", 404));
  }

  const extrationData = await jwt.verify(token, process.env.token_secret);

  const user = await User.findOne({
    where: { id: extrationData.id, status: "active" },
  });

  if (!user) {
    return next(
      new GlobalError(
        "the user with this token doesnt exist or is inactive",
        403
      )
    );
  }
  req.userSeccion = user;
  next();
});

const protectUserAccount = (req, res, next) => {
  const { userSeccion, user } = req;

  if (userSeccion.id !== user.id) {
    return next(new GlobalError("this account donsen't valid", 403));
  }

  next();
};

module.exports = { seccionProteted, protectUserAccount };
