import express from "express";
import {
  addUser,
  loginUser,
  registerUser,
  activateUser,
  deleteUser,
} from "../controllers/userController.js";
import { validateAuthorization } from "../middlewares/validateAuthorization.js";

export const userRouter = express.Router();

userRouter.post("/signin", addUser);
userRouter.post("/login", loginUser);
userRouter.post("/registration", registerUser);
userRouter.get("/activate/:registrationCode", activateUser);
userRouter.delete("/:userID", validateAuthorization, deleteUser);
