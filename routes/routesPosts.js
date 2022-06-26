import express from "express";
import {
  addPost,
  getLatestPosts,
  getAllPosts,
  getPostsByTopic,
  getPostsByDate,
  deletePost,
  editPost,
} from "../controllers/postController.js";
import {addVote, deleteVote, editVote, getTotalVotesByPost} from "../controllers/voteController.js";
import { validateAuthorization } from "../middlewares/validateAuthorization.js";

export const postRouter = express.Router();

postRouter.get("/allPosts", getAllPosts);
postRouter.get("/:topic", getPostsByTopic);
postRouter.get("/get/latestPosts", getLatestPosts);
postRouter.get("/filter_by_date/:date", getPostsByDate);



postRouter.post("/allPosts", validateAuthorization, addPost);
postRouter.patch("/:idPost", validateAuthorization, editPost);
postRouter.delete("/:idPost", validateAuthorization, deletePost);

postRouter.post("/vote/:idPost", validateAuthorization, addVote);
postRouter.patch("/vote/:idPost", validateAuthorization, editVote)
postRouter.delete("/vote/:idPost", validateAuthorization, deleteVote);
postRouter.get("/vote/:idPost", getTotalVotesByPost);
