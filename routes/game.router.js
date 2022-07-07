const express = require("express");

const gameRouter = express.Router();

//middlewares
const { seccionProteted } = require("../middlewares/credentials.middlewares");
const {
  creategameValidator,
  updategameValidator,
} = require("../middlewares/gameValidator.middleware");
const { existGame } = require("../middlewares/userExist.middlewares");

const {
  getGame,
  createGame,
  createComment,
  updateGame,
  deleteGame,
} = require("../controller/game.controller");

gameRouter.get("/", getGame);

gameRouter.use(seccionProteted);
gameRouter.post("/", creategameValidator, createGame);
gameRouter.post("/reviews/:gameId", createComment);

gameRouter
  .use("/:id", existGame)
  .route("/:id")
  .patch(updategameValidator, updateGame)
  .delete(deleteGame);

module.exports = { gameRouter };
