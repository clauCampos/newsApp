import express from "express";
import { registerUser, loginUser, activateUser, deleteUser, getProfile } from "../controllers/userController.js";
import { validateAuthorization } from "../middlewares/validateAuthorization.js";

export const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/registration", registerUser);
userRouter.get("/activate/:registrationCode", activateUser);
userRouter.delete("/:userID", validateAuthorization, deleteUser);
userRouter.get("/profile", validateAuthorization, getProfile);
