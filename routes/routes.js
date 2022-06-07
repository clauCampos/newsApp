import express from "express";
import {addPost, getAllPosts, getPostsByTopic} from "../controllers/postController.js";

export const router = express.Router();

router.get("/allPosts", getAllPosts);
router.get("/posts/:topic", getPostsByTopic);
router.post("/allPosts", addPost)