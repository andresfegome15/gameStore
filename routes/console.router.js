const express = require("express");

const consoleRouter = express.Router();

//middlewares
const {
  seccionProteted,
  protectUserAccount,
} = require("../middlewares/credentials.middlewares");
const {
  createConsoleValidator,
  updateConsoleValidator,
} = require("../middlewares/consoleValidator.middleware");
const { existConsole } = require("../middlewares/userExist.middlewares");

const {
  getConsole,
  createConsole,
  updateConsole,
  deleteConsole,
} = require("../controller/console.controller");

consoleRouter.get("/", getConsole);

consoleRouter.use(seccionProteted);
consoleRouter.post("/", createConsoleValidator, createConsole);

consoleRouter
  .use("/:id", existConsole)
  .route("/:id")
  .patch(updateConsoleValidator, updateConsole)
  .delete(deleteConsole);

module.exports = { consoleRouter };
