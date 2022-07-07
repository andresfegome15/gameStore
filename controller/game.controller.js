//utils
const { GlobalError } = require("../utils/GlobalError.utils");
const { catchAsyn } = require("../utils/catchAsync");

//models
const { Game } = require("../models/games.models");
const { Reviews } = require("../models/reviews.models");
const { Console } = require("../models/consoles.models");
const { User } = require("../models/users.models");

const getGame = catchAsyn(async (req, res, next) => {
  const games = await Game.findAll({
    where: { status: "active" },
    include: [
      { model: Reviews, include: [{ model: User, attributes: ["name"] }] },
      { model: Console },
    ],
  });

  res.status(200).json({
    status: "sucess",
    games,
  });
});

const createGame = catchAsyn(async (req, res, next) => {
  const { title, genre } = req.body;
  const game = await Game.create({ title, genre });
  res.status(201).json({ status: "success", game });
});

const createComment = catchAsyn(async (req, res, next) => {
  const { userSeccion } = req;
  const { comment } = req.body;
  const { gameId } = req.params;
  const reviews = await Reviews.create({
    userId: userSeccion.id,
    gameId,
    comment,
  });
  res.status(201).json({ status: "success", reviews });
});

const updateGame = catchAsyn(async (req, res, next) => {
  const { title } = req.body;
  const { game } = req;

  await game.update({ title });
  res.status(201).json({ status: "success", game });
});

const deleteGame = catchAsyn(async (req, res, next) => {
  const { game } = req;
  await game.update({ status: "inactive" });
  res.status(201).json({ status: "success", game });
});

module.exports = { getGame, createGame, updateGame, deleteGame, createComment };
