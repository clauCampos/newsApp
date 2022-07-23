import {
    checkIfVoteExists, insertVote, updateVote, deleteSingleVote, getVotesByPost, getValueVote} from "../repositories/voteRepository.js";
import {findPostById} from "../repositories/postRepository.js";
import {booleanToIntValue} from "../helpers/convertBooleanToInteger.js";
import {idPostSchema} from "../schemas-validation/postSchema.js";
import {generateError} from "../helpers/generateError.js";

const addVote = async (request, response, next) => {
    try {
        const userId = request.auth.id;
        const {idPost} = request.params;
        await idPostSchema.validateAsync(idPost);
        const data = await findPostById(idPost);
        const foundVote = await checkIfVoteExists(userId, idPost);

        if (!data) {
            throw generateError(`id post= ${idPost} doesn't exist`, 404);

        } else if (data.user_id === userId) {
            throw generateError(`You can't vote your own posts`, 403);

        } else if (!request.body.is_vote_positive) {
            throw generateError(`to vote a post its mandatory to choose  positive or negative vote`, 406);

        } else if (foundVote) {
            throw generateError(`It's not the first time you vote, try to update your vote`, 405);

        } else if (!foundVote) {
            const booleanValueInput = request.body.is_vote_positive;
            const valueToInsert = booleanToIntValue(booleanValueInput);
            await insertVote(userId, idPost, valueToInsert);
            const currentVotes = await getVotesByPost(idPost)
            response.status(200)
                .send({status: "ok", message: `vote created for id post= ${idPost}`, updatedVotes: currentVotes});
        }

    } catch (error) {
        next(error);
    }
};
const editVote = async (request, response, next) => {
    try {
        const userId = request.auth.id;
        const {idPost} = request.params;
        await idPostSchema.validateAsync(idPost);
        const data = await findPostById(idPost);
        const foundVote = await checkIfVoteExists(userId, idPost);
        if (!data) {
            throw generateError(`id post= ${idPost} doesn't exist`, 404);

        } else if (data.user_id === userId) {
            throw generateError(`You can't vote your own posts`, 403);

        } else if (!request.body.is_vote_positive) {
            throw generateError(`to update the vote its mandatory to choose  positive or negative vote`, 406);

        } else if (foundVote) {
            const booleanValueInput = request.body.is_vote_positive;
            const valueToInsert = booleanToIntValue(booleanValueInput);
            await updateVote(userId, idPost, valueToInsert);
            const currentVotes = await getVotesByPost(idPost)
            response.status(200)
                .send({status: "ok", message: `vote updated for id post= ${idPost}`, updatedVotes: currentVotes});

        } else {
            throw generateError(`You haven't vote to id post= ${idPost} yet.`, 400);

        }

    } catch (error) {
        next(error)
    }
}
const checkDuplicateVote = async (request, response, next) => {
    try {
        const userId = request.auth.id;
        const {idPost} = request.params;
        await idPostSchema.validateAsync(idPost);
        const foundVote = await checkIfVoteExists(userId, idPost);

        if(foundVote) {
            const valueVote = await getValueVote(userId, idPost)
            response.status(200)
                .send({status: "ok", data: {didUserVote: true, currentVote: valueVote }});
        } else {
            response.status(200)
                .send ({status: "ok", data: {didUserVote: false, currentVote: null}});
        }
    } catch (error) {
        next(error);
    }
    }

const deleteVote = async (request, response, next) => {
    try {
        const userId = request.auth.id;
        const {idPost} = request.params;
        await idPostSchema.validateAsync(idPost);
        const votePostByUserExists = await checkIfVoteExists(userId, idPost);

        if (!votePostByUserExists) {
            throw generateError(`can't delete this vote because is not yours or doesn't exist`, 405);
        }
        await deleteSingleVote(userId, idPost)
        const currentVotes = await getVotesByPost(idPost)
        response.status(200).send({status: "ok", message: `vote deleted`, updatedVotes: currentVotes});

    } catch (error) {
        next(error);
    }
};

const getTotalVotesByPost = async (request, response, next) => {
    try {
        const {idPost} = request.params;
        await idPostSchema.validateAsync(idPost);

        const count = await getVotesByPost(idPost)

        response.status(200).send({status: "ok", message: `votes count is : ${count}`});
    } catch (error) {
        next(error)
    }
}
export {addVote, deleteVote, getTotalVotesByPost, editVote, checkDuplicateVote}