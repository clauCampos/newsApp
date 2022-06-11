import express from "express";
import {addPost, deletePost, getAllPosts, getLatestPosts, getPostsByTopic, getPostsByDate} from "../controllers/postController.js";
import {validateAuthorization} from "../middlewares/validateAuthorization.js";

export const router = express.Router();

router.get("/allPosts", getAllPosts);
router.get("/posts/:topic", getPostsByTopic);
router.post("/allPosts", validateAuthorization, addPost);
router.delete("/posts/:idPost", deletePost);
router.get("/latestPosts", getLatestPosts);
router.get("/filter_by_date/:date", getPostsByDate);

