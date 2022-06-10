import express from "express";
import {addUser} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.post("/signin", addUser)