const express = require("express");

const userRouter = express.Router();

//middlewares
const {
  seccionProteted,
  protectUserAccount,
} = require("../middlewares/credentials.middlewares");
const {
  createuserValidator,
  updateUserValidator,
} = require("../middlewares/userCreateValidator");
const { existUser } = require("../middlewares/userExist.middlewares");

const {
  getUser,
  createUser,
  login,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

userRouter.post("/", createuserValidator, createUser);
userRouter.post("/login", login);

userRouter.use(seccionProteted);
userRouter.get("/", getUser);

userRouter
  .use("/:id", existUser)
  .route("/:id")
  .patch(protectUserAccount, updateUserValidator, updateUser)
  .delete(protectUserAccount, deleteUser);

module.exports = { userRouter };
