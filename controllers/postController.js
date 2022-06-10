import {
    createPost,
    deletePostById,
    findPostByTopic,
    getPosts,
    collectLatestPosts, findPostByDate
} from "../repositories/postRepository.js";


const addPost = async (request, response, next) => {
    try {

        const actualDate = new Date(Date.now());
        const {title, opening_line, text, topic, photo, user_id} = request.body;

        const insertedId = await createPost(title, opening_line, text, topic, photo, actualDate, user_id);
        response.status(200).send({status: "ok", message: `new post created with id: ${insertedId}`})

    } catch (error) {
        next(error)
    }
}

const getLatestPosts = async (request, response, next) => {
    try {
        const posts = await collectLatestPosts();
        if (posts.length === 0)  {
            response.status(404).send({status: "error", message: "No posts exists"})
        } else {
            response.status(200).send({status: "ok", data: posts})
        }

    } catch (error) {
        next(error)
    }
}

const getAllPosts = async (request, response, next) => {
    try {
        const posts = await getPosts();
        if (posts.length === 0) {
            response.status(404).send({status: "error", message: "No posts exists"})
        } else {
            response.status(200).send({status: "ok", data: posts})
        }
    } catch (error) {
        next(error)
    }

}
const getPostsByTopic = async (request, response, next) => {
    try {
        const {topic} = request.params;
        const posts = await findPostByTopic(topic);

        if (posts.length === 0) {
            response.status(404).send({status: "error", message: "No posts of that topic"})
        } else {
            response.status(200).send({status: "ok", data: posts})
        }
    } catch (error) {
        next(error)
    }
}
const getPostsByDate = async (request, response, next) => {
    try {
        const {date} = request.params;

        const posts = await findPostByDate(date);

        if (posts.length === 0) {
            response.status(404).send({status: "error", message: "No posts of that date"})
        } else {
            response.status(200).send({status: "ok", data: posts})
        }
    } catch (error) {
        next(error)
    }
}

const deletePost = async (request, response, next) => {

    try {
        const {idPost} = request.params;
        const rowToDelete = await deletePostById(idPost);

        if (rowToDelete === 0) {
            response.status(400).send({status: "error", message: `id post= ${idPost} doesn't exist`})
        } else {
            response.status(200).send({status: "ok", message: "deleted user"})
        }

    } catch (error) {
        next(error);
    }
}

export {addPost, getAllPosts, getPostsByTopic, deletePost, getLatestPosts, getPostsByDate}