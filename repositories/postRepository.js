import { getPool } from "../database/getPool.js";

const pool = getPool();

const createPost = async (titleText, openingLine, textValue, chosenTopic, photo, actualDate, userID) => {
  const [{ insertId, affectedRows }] = await pool.query(
    `INSERT INTO posts (title, opening_line, text, topic, photo, actual_date, user_id) 
     VALUES (?,?,?,?,?,?,?)`,
    [titleText, openingLine, textValue, chosenTopic, photo, actualDate, userID]);
  return insertId;
};

const getPosts = async () => {
  const [posts] = await pool.query(
    `SELECT posts.title, posts.opening_line, posts.text, posts.topic, posts.photo, posts.actual_date AS creation_date,
    users.nick_name AS author
    FROM posts RIGHT JOIN users ON posts.user_id = users.id`);
  return posts;
};

const collectLatestPosts = async () => {
  const [posts] = await pool.query(
      `SELECT posts.title, posts.opening_line, posts.text, posts.topic, posts.photo, posts.actual_date AS creation_date,
      users.nick_name AS author
      FROM posts RIGHT JOIN users ON posts.user_id = users.id WHERE actual_date > now() - interval 24 hour`);
  return posts;
};

const findPostByTopic = async (topic) => {
  const [posts] = await pool.query(
      `SELECT posts.title, posts.opening_line, posts.text, posts.topic, posts.photo, posts.actual_date AS creation_date,
      users.nick_name AS author
      FROM posts RIGHT JOIN users ON posts.user_id = users.id WHERE topic= ?`, [topic]);
  return posts;
};

const findPostByDate = async (date) => {
  const [posts] = await pool.query(
      `SELECT posts.title, posts.opening_line, posts.text, posts.topic, posts.photo, posts.actual_date AS creation_date,
      users.nick_name AS author
      FROM posts RIGHT JOIN users ON posts.user_id = users.id WHERE actual_date LIKE "${date}%"`);
  return posts;
};

const findPostById = async (postId) => {
  const [[post]] = await pool.query(
      `SELECT * FROM posts WHERE id= ?`, [postId]);
  return post;
};

const deletePostById = async (postId) => {
  const [{ affectedRows }] = await pool.query(
      `DELETE FROM posts WHERE id = ?`, [postId]);
  return affectedRows;
};

const updatePostById = async ({title, opening_line, text, topic, photo, actual_date, user_id, id,}) => {
  const [{ affectedRows }] = await pool.query(
      `UPDATE posts SET title = ?, opening_line = ?, text = ?, topic = ?, photo = ?, actual_date = ?, user_id = ?  WHERE id = ?`,
    [title, opening_line, text, topic, photo, actual_date, user_id, id]);
  return affectedRows;
};

export {getPosts, findPostByTopic, createPost, deletePostById, collectLatestPosts, findPostByDate, findPostById, updatePostById};
