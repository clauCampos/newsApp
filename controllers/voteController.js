import {checkIfVoteExists, insertVote, updateVote} from "../repositories/voteRepository.js";
import { findPostById } from "../repositories/postRepository.js";
import { booleanToIntValue } from "../helpers/convertBooleanToInteger.js";

export const addVote = async (request, response, next) => {
  try {
    const userId = request.auth.id;
    const { idPost } = request.params;
    const data = await findPostById(idPost);

    if (!data) {
      response.status(400).send({status: "error", message: `id post= ${idPost} doesn't exist`});
    
    } else if (data.user_id === userId) {
      response.status(400).send({status: "error", message: `You can't vote your own posts`});
    
    } else if (request.body.is_vote_positive) {
      const booleanValueInput = request.body.is_vote_positive;
      const valueToInsert = booleanToIntValue(booleanValueInput);

      const foundVote = await checkIfVoteExists(userId, idPost);

      if (foundVote) {
        await updateVote(userId, idPost, valueToInsert);
        response.status(200).send({status: "ok", message: `vote updated for id post= ${idPost} `});

      } else {
        await insertVote(userId, idPost, valueToInsert);
        response.status(200).send({status: "ok", message: `vote updated for id post= ${idPost} `});
      }

    } else {
      response.status(400)
      .send({status: "error", message: `to vote a post its mandatory to choose  positive or negative vote`});
    }
  } catch (error) {
    next(error);
  }
};
