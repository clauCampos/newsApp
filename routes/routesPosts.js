import express from "express";
import {
  addPost,
  getLatestPosts,
  getAllPosts,
  getPostsByTopic,
  getPostsByDate,
  getPostsByUserId,
  deletePost,
  editPost,
  getPostById,
} from "../controllers/postController.js";
import {addVote, checkDuplicateVote, deleteVote, editVote, getTotalVotesByPost} from "../controllers/voteController.js";
import { validateAuthorization } from "../middlewares/validateAuthorization.js";

export const postRouter = express.Router();

postRouter.get("/allPosts", getAllPosts);
postRouter.get("/:topic", getPostsByTopic);
postRouter.get("/get/latestPosts", getLatestPosts);
postRouter.get("/filter_by_date/:date", getPostsByDate);
postRouter.get("/allPosts/:idUser", getPostsByUserId)
postRouter.get("/singlePost/:idPost", getPostById);

postRouter.post("/allPosts", validateAuthorization, addPost);
postRouter.patch("/:idPost", validateAuthorization, editPost);
postRouter.delete("/delete/:idPost", validateAuthorization, deletePost);

postRouter.post("/vote/:idPost", validateAuthorization, addVote);
postRouter.patch("/vote/:idPost", validateAuthorization, editVote);
postRouter.delete("/vote/:idPost", validateAuthorization, deleteVote);
postRouter.get("/vote/:idPost", getTotalVotesByPost);
postRouter.get("/checkVote/:idPost", validateAuthorization, checkDuplicateVote);
