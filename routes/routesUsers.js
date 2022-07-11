import express from "express";
import { registerUser, loginUser, activateUser, deleteUser, getProfile } from "../controllers/userController.js";
import { validateAuthorization } from "../middlewares/validateAuthorization.js";

export const userRouter = express.Router();

userRouter.get("/get/myprofile", validateAuthorization, getProfile);
userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/activate/:registrationCode", activateUser);
userRouter.delete("/:userID", validateAuthorization, deleteUser);

