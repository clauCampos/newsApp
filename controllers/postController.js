import {
  createPost,
  deletePostById,
  findPostByTopic,
  getPosts,
  collectLatestPosts,
  findPostByDate,
  findPostById,
  selectPostById,
  updatePostById
} from "../repositories/postRepository.js";

const addPost = async (request, response, next) => {
  try {
    const actualDate = new Date(Date.now());
    const user_id = request.auth.id;
    const { title, opening_line, text, topic, photo } = request.body;
    const insertedId = await createPost(
      title,
      opening_line,
      text,
      topic,
      photo,
      actualDate,
      user_id
    );
    response
      .status(200)
      .send({
        status: "ok",
        message: `new post created with id: ${insertedId}`,
      });
  } catch (error) {
    next(error);
  }
};

const getLatestPosts = async (request, response, next) => {
  try {
    const posts = await collectLatestPosts();
    if (posts.length === 0) {
      response
        .status(404)
        .send({ status: "error", message: "No posts exists" });
    } else {
      response.status(200).send({ status: "ok", data: posts });
    }
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (request, response, next) => {
  try {
    const posts = await getPosts();
    if (posts.length === 0) {
      response
        .status(404)
        .send({ status: "error", message: "No posts exists" });
    } else {
      response.status(200).send({ status: "ok", data: posts });
    }
  } catch (error) {
    next(error);
  }
};
const getPostsByTopic = async (request, response, next) => {
  try {
    const { topic } = request.params;
    const posts = await findPostByTopic(topic);

    if (posts.length === 0) {
      response
        .status(404)
        .send({ status: "error", message: "No posts of that topic" });
    } else {
      response.status(200).send({ status: "ok", data: posts });
    }
  } catch (error) {
    next(error);
  }
};
const getPostsByDate = async (request, response, next) => {
  try {
    const { date } = request.params;

    const posts = await findPostByDate(date);

    if (posts.length === 0) {
      response
        .status(404)
        .send({ status: "error", message: "No posts of that date" });
    } else {
      response.status(200).send({ status: "ok", data: posts });
    }
  } catch (error) {
    next(error);
  }
};

const deletePost = async (request, response, next) => {
  try {
    const currentUserId = request.auth.id;
    console.log(currentUserId);
    const { idPost } = request.params;
    const dataPost = await findPostById(idPost);
    console.log(dataPost);

    if (!dataPost) {
      response
        .status(400)
        .send({ status: "error", message: `id post= ${idPost} doesn't exist` });
    } else if (dataPost.user_id !== currentUserId) {
      response
        .status(400)
        .send({
          status: "error",
          message: `This post is not yours to delete it`,
        });
    } else {
      const rowToDelete = await deletePostById(idPost);
      if (rowToDelete === 0) {
        response
          .status(400)
          .send({
            status: "error",
            message: `id post= ${idPost} doesn't exist`,
          });
      } else {
        response
          .status(200)
          .send({ status: "ok", message: `deleted post number: ${idPost}` });
      }
    }
  } catch (error) {
    next(error);
  }
};

const editPost = async (request, response, next) => {
    try {
      const { idPost } = request.params;
  
      const post = await selectPostById(idPost);
      console.log(post);
      if (!post) {
        throw generateError("Post does not exist!", 404);
      }
  
      const userID = request.auth.id;
      if (post.user_id !== userID) {
        throw generateError("Editing other users posts is not allowed!", 400);
      }
  
      await updatePostById({ ...post, ...request.body });
  
      response.status(200).send({ status: "ok", message: "Post updated!" });
    } catch (error) {
      next(error);
    }
  };

export {
    addPost,
    getLatestPosts,
    getAllPosts,
    getPostsByTopic,
    getPostsByDate,
    deletePost,
    editPost
};
