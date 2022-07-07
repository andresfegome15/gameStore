////utils
const { GlobalError } = require("../utils/GlobalError.utils");
const { catchAsyn } = require("../utils/catchAsync");

//models
const { Game } = require("../models/games.models");
const { Reviews } = require("../models/reviews.models");
const { Console } = require("../models/consoles.models");
const { Gameinconsole } = require("../models/gamesinConsole.models");

const creategameinconsole = catchAsyn(async (req, res, next) => {
  const { gameId, consoleId } = req.body;
  const gameinconsole = await Gameinconsole.create({ gameId, consoleId });
  res.status(201).json({ status: "success", gameinconsole });
});
module.exports = { creategameinconsole };
