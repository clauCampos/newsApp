import {createPost, deletePostById, findPostByTopic, getPosts, findPostByDate, findPostById, updatePostById, collectLatestPostsSortedByVotes, collectPostsByUserId} from "../repositories/postRepository.js";
import {generateError} from "../helpers/generateError.js";
import {createPostSchema, editPostSchema, idPostSchema, topicSchema} from "../schemas-validation/postSchema.js";
import { photoSchema } from "../schemas-validation/photoSchema.js";
import {processImage, savePostImage} from "../helpers/handleImage.js";
import { insertVote } from "../repositories/voteRepository.js";
import { findUserById } from "../repositories/userRepository.js";

const addPost = async (request, response, next) => {
    try {
        await createPostSchema.validateAsync(request.body);
        const actualDate = new Date(Date.now());
        const user_id = request.auth.id;
        const {title, opening_line, text, topic} = request.body;

        let picName = null;
        if (request.files?.photo) {
            await photoSchema.validateAsync(request.files.photo.name)
            const image = await processImage(request.files?.photo.data)
            await savePostImage(image[0], image[1])
            picName = image[0];
        }
        const insertedId = await createPost(title, opening_line, text, topic, picName, actualDate, user_id);
        await insertVote(user_id, insertedId, null)
        response.status(200)
            .send({status: "ok", message: `new post created with id: ${insertedId}`});

    } catch (error) {
        next(error);
    }
};

const getLatestPosts = async (request, response, next) => {
    try {
      const posts = await collectLatestPostsSortedByVotes()  
      if (posts.length === 0) {
            throw generateError(`No post created in the last 24 hours.`, 404);
        } else {
            response.status(200).send({status: "ok", data: posts});
        }
    } catch (error) {
        next(error);
    }
};

const getAllPosts = async (request, response, next) => {
    try {
        const posts = await getPosts();
        if (posts.length === 0) {
            throw generateError(`No post exists.`, 404);
        } else {
            response.status(200).send({status: "ok", data: posts});
        }
    } catch (error) {
        next(error);
    }
};
const getPostsByTopic = async (request, response, next) => {
    try {
        const {topic} = request.params;
        await topicSchema.validateAsync(topic)
        const posts = await findPostByTopic(topic);

        if (posts.length === 0) {
            throw generateError(`No posts founded about that topic.`, 404);
        } else {
            response.status(200).send({status: "ok", data: posts});
        }
    } catch (error) {
        next(error);
    }
};
const getPostsByDate = async (request, response, next) => {
    try {
        const {date} = request.params;
        const posts = await findPostByDate(date);

        if (posts.length === 0) {
            throw generateError(`No posts created at the date: ${date}.`, 404);
        } else {
            response.status(200).send({status: "ok", data: posts});
        }
    } catch (error) {
        next(error);
    }
};
const getPostsByUserId =  async (request, response, next) => {
    try {
      
        const {idUser} = request.params;
        await idPostSchema.validateAsync(idUser);
        const user = await findUserById(idUser);
        const posts = await collectPostsByUserId(idUser);
     
        
        if (user.length === 0){
            throw generateError(`User ${idUser}: doesn't exist`, 404);
        } else if (posts.length === 0) {
            throw generateError(`User ${idUser}: doesn't have posts`, 404);
        } else {
            response.status(200).send({status: "ok", data: posts});
        }
     
        
    }catch(error){
        next(error);
    }
}

const deletePost = async (request, response, next) => {
    try {
        const currentUserId = request.auth.id;
        const {idPost} = request.params;
        await idPostSchema.validateAsync(idPost);
        const dataPost = await findPostById(idPost);

        if (!dataPost) {
            throw generateError(`id post: ${idPost} doesn't exist`, 404);
        }
        if (dataPost.user_id !== currentUserId) {
            throw generateError("Deleting other users posts is not allowed!", 400);
        }
        const rowToDelete = await deletePostById(idPost);

        if (rowToDelete === 0) {
            throw generateError(`id post: ${idPost} doesn't exist`, 404);
        } else {
            response.status(200)
                .send({status: "ok", message: `deleted post number: ${idPost}`});
        }

    } catch (error) {
        next(error);
    }
};

const editPost = async (request, response, next) => {
    try {
        const {idPost} = request.params;
        await idPostSchema.validateAsync(idPost)
        await editPostSchema.validateAsync(request.body);
        const post = await findPostById(idPost);

        if (!post) {
            throw generateError("Post doesn't exist!", 404);
        }

        const userID = request.auth.id;
        if (post.user_id !== userID) {
            throw generateError("Editing other's users posts is not allowed!", 400);
        }

        if (request.files?.photo) {
            await photoSchema.validateAsync(request.files.photo.name)
            const image = await processImage(request.files?.photo.data)
            await savePostImage(image[0], image[1])
            const picName = image[0];
            request.body.photo = picName;
        }
        await updatePostById({...post, ...request.body });
        response.status(200).send({status: "ok", message: "Post updated!"});

    } catch (error) {
        next(error);
    }
};
const getPostById = async(request, response, next)=>{
    try {
        const {idPost} = request.params;
        await idPostSchema.validateAsync(idPost)
        const post = await findPostById(idPost);
        if (!post) {
            throw generateError("Post doesn't exist!", 404);
        }
        response.status(200).send({status: "ok", data: post});
    } catch (error) {
        next(error);
    }
}
export {addPost, getLatestPosts, getAllPosts, getPostsByTopic, getPostsByDate, deletePost, editPost, getPostsByUserId, getPostById};
