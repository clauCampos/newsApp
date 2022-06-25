import {checkIfVoteExists, insertVote, updateVote, deleteSingleVote} from "../repositories/voteRepository.js";
import { findPostById } from "../repositories/postRepository.js";
import { booleanToIntValue } from "../helpers/convertBooleanToInteger.js";
import { idPostSchema } from "../schemas-validation/postSchema.js";
import { generateError } from "../helpers/generateError.js";

export const addVote = async (request, response, next) => {
  try {
    const userId = request.auth.id;
    const { idPost } = request.params;
    await idPostSchema.validateAsync(idPost);
    const data = await findPostById(idPost);

    if (!data) {
      throw generateError(`id post= ${idPost} doesn't exist`, 404);
    
    } else if (data.user_id === userId) {
        throw generateError(`You can't vote your own posts`, 403);
     
    } else if (request.body.is_vote_positive) {
      const booleanValueInput = request.body.is_vote_positive;
      const valueToInsert = booleanToIntValue(booleanValueInput);

      const foundVote = await checkIfVoteExists(userId, idPost);

      if (foundVote) {
        await updateVote(userId, idPost, valueToInsert);
        response.status(200).send({status: "ok", message: `vote updated for id post= ${idPost}`});

      } else {
        await insertVote(userId, idPost, valueToInsert);
        response.status(200).send({status: "ok", message: `vote updated for id post= ${idPost}`});
      }

    } else {
      response.status(406)
      .send({status: "error", message: `to vote a post its mandatory to choose  positive or negative vote`});
    }
  } catch (error) {
    next(error);
  }
};

export const deleteVote = async (request, response, next) => {
    try {
      const userId = request.auth.id;
      const { idPost } = request.params;
      await idPostSchema.validateAsync(idPost);
      const votePostByUserExists= await checkIfVoteExists(userId, idPost);
      
      if (!votePostByUserExists) {
        throw generateError(`can't delete this vote because is not yours or doesn't exist`, 405);
    }
    await deleteSingleVote(userId, idPost)
    response.status(200).send({status: "ok", message: `vote deleted`});

    } catch (error) {
      next(error);
    }
  };
