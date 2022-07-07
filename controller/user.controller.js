//import librery
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//init dotenv
dotenv.config({ path: "./config.env" });

//utils
const { GlobalError } = require("../utils/GlobalError.utils");
const { catchAsyn } = require("../utils/catchAsync");

//models
const { User } = require("../models/users.models");

const getUser = catchAsyn(async (req, res, next) => {
  const users = await User.findAll({ where: { status: "active" } });
  res.status(200).json({
    status: "sucess",
    users,
  });
});

const createUser = catchAsyn(async (req, res, next) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(12);
  const bcryPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: bcryPassword,
  });
  user.password = undefined;
  res.status(201).json({
    status: "success",
    user,
  });
});

const login = catchAsyn(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, status: "active" } });

  if (!user) {
    return next(new GlobalError("User no valid", 400));
  }

  const ValidPassword = await bcrypt.compare(password, user.password);

  if (!ValidPassword) {
    return next(new GlobalError("user no valid", 400));
  }

  const token = await jwt.sign({ id: user.id }, process.env.token_secret, {
    expiresIn: "1d",
  });

  res.status(200).json({
    status: "sucess",
    token,
  });
});

const updateUser = catchAsyn(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;
  console.log(user.name);
  user.update({ name, email });
  res.status(204).json({
    status: "sucess",
    user,
  });
});

const deleteUser = catchAsyn(async (req, res, next) => {
  User.update({ status: "inactive" });
  res.status(204).json({
    status: "sucess",
  });
});

module.exports = { getUser, createUser, login, updateUser, deleteUser };
