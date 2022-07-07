//utils
const { GlobalError } = require("../utils/GlobalError.utils");
const { catchAsyn } = require("../utils/catchAsync");

//models
const { Game } = require("../models/games.models");
const { Reviews } = require("../models/reviews.models");
const { Console } = require("../models/consoles.models");

const getConsole = catchAsyn(async (req, res, next) => {
  const console = await Console.findAll({ where: { status: "active" } });
  res.status(200).json({ status: "success", console });
});

const createConsole = catchAsyn(async (req, res, next) => {
  const { name, company } = req.body;
  const console = await Console.create({ name, company });
  res.status(200).json({ status: "success", console });
});

const updateConsole = catchAsyn(async (req, res, next) => {
  const { name } = req.body;
  const { console } = req;
  await console.update({ name });
  res.status(200).json({ status: "success", console });
});

const deleteConsole = catchAsyn(async (req, res, next) => {
  const { console } = req;
  await console.update({ status: "inactive" });
  res.status(200).json({ status: "success delete", console });
});

module.exports = { getConsole, createConsole, updateConsole, deleteConsole };
