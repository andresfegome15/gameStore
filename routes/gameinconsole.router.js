const express = require("express");

const gameinconsoleRouter = express.Router();

//middlewares
const {
  seccionProteted,
  protectUserAccount,
} = require("../middlewares/credentials.middlewares");
const { userValidator } = require("../middlewares/userCreateValidator");

const {
  creategameinconsole,
} = require("../controller/gameinconsole.controller");

gameinconsoleRouter.use(seccionProteted);
gameinconsoleRouter.post("/", creategameinconsole);

module.exports = { gameinconsoleRouter };
