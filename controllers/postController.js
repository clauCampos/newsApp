import {createPost, findPostByTopic, getPosts} from "../repositories/postRepository.js";

const addPost = async (request, response, next) => {
    try {
        const {title, opening_line, text, topic, photo} = request.body;
        const insertedId = await createPost(title, opening_line, text, topic, photo);

        response.status(200).send({status: "ok", message: `new post created with id: ${insertedId}`})

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
        console.error(error)
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
        console.error(error)
    }

}

export {addPost,getAllPosts, getPostsByTopic}