import express from "express";
import {addUser, loginUser} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.post("/signin", addUser)
userRouter.post("/login", loginUser)