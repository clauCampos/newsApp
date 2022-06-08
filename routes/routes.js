import express from "express";
import {addPost, deletePost, getAllPosts, getLatestPosts, getPostsByTopic} from "../controllers/postController.js";

export const router = express.Router();

router.get("/allPosts", getAllPosts);
router.get("/posts/:topic", getPostsByTopic);
router.post("/allPosts", addPost);
router.delete("/posts/:idPost", deletePost);
router.get("/latestPosts", getLatestPosts)