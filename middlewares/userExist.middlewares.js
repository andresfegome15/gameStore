const { User } = require("../models/users.models");
const { Game } = require("../models/games.models");
const { Reviews } = require("../models/reviews.models");
const { Console } = require("../models/consoles.models");

//utils
const { GlobalError } = require("../utils/GlobalError.utils");
const { catchAsyn } = require("../utils/catchAsync");

const existUser = catchAsyn(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return next(new GlobalError("user no found", 404));
  }
  req.user = user;
  next();
});

const existGame = catchAsyn(async (req, res, next) => {
  const { id } = req.params;
  const game = await Game.findOne({ where: { id } });
  if (!game) {
    return next(new GlobalError("game no found", 404));
  }
  req.game = game;

  next();
});

const existReview = catchAsyn(async (req, res, next) => {
  const { id } = req.params;
  const review = await Reviews.findAll({ where: { id } });
  if (!review) {
    return next(new GlobalError("review no found", 404));
  }
  req.review = review;
  next();
});

const existConsole = catchAsyn(async (req, res, next) => {
  const { id } = req.params;
  const console = await Console.findOne({ where: { id } });
  if (!console) {
    return next(new GlobalError("console no found", 404));
  }

  req.console = console;
  next();
});

module.exports = { existUser, existGame, existReview, existConsole };
