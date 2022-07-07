const express = require("express");

//routers
const { userRouter } = require("./routes/user.router");
const { gameRouter } = require("./routes/game.router");
const { consoleRouter } = require("./routes/console.router");
const { gameinconsoleRouter } = require("./routes/gameinconsole.router");

//utils
const { GlobalError } = require("./utils/GlobalError.utils");

//ErrorHandler
const { ErrorHandler } = require("./controller/controllerError");

//init express
const app = express();

//require json
app.use(express.json());

//endpoints
app.use("/api/v1/users", userRouter);
app.use("/api/v1/games", gameRouter);
app.use("/api/v1/consoles", consoleRouter);
app.use("/api/v1/gameinconsoles", gameinconsoleRouter);

//endpoints no valid
app.all("*", (req, res, next) => {
  next(
    new GlobalError(
      `${req.method} ${req.originalUrl} no found in the server`,
      404
    )
  );
});

app.use(ErrorHandler);

module.exports = { app };
