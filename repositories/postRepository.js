import { getPool } from "../database/getPool.js";

const pool = getPool();

const createPost = async (titleText, openingLine, textValue, chosenTopic, photo, actualDate, userID) => {
  const [{ insertId, affectedRows }] = await pool.query(
    `INSERT INTO posts 
            (title, opening_line, text, topic, photo, actual_date, user_id) 
            VALUES (?,?,?,?,?,?,?)`,
    [titleText, openingLine, textValue, chosenTopic, photo, actualDate, userID]
  );

  console.log(`insert id:${insertId}, affected rows:${affectedRows}`);
  return insertId;
};

const getPosts = async () => {
  const [posts] = await pool.query(`SELECT * FROM posts`);
  return posts;
};

const collectLatestPosts = async () => {
  const [posts] = await pool.query(
      `SELECT * FROM posts WHERE actual_date > now() - interval 24 hour`);
  return posts;
};

const findPostByTopic = async (topic) => {
  const [posts] = await pool.query(
      `SELECT * FROM posts WHERE topic= "${topic}"`);
  return posts;
};
const findPostByDate = async (date) => {
  const [posts] = await pool.query(
      `SELECT * FROM posts WHERE actual_date LIKE "${date}%"`);
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

const selectPostById = async (userID) => {
  const [[post]] = await pool.query(
      `SELECT * FROM posts WHERE id = ?`, [userID]);
  return post;
};

const updatePostById = async ({title, opening_line, text, topic, photo, actual_date, user_id, id,}) => {
  const [{ affectedRows }] = await pool.query(
      `UPDATE posts SET title = ?, opening_line = ?, text = ?, topic = ?, photo = ?, actual_date = ?, user_id = ?  WHERE id = ?`,
    [title, opening_line, text, topic, photo, actual_date, user_id, id]);
  return affectedRows;
};

export {getPosts, findPostByTopic, createPost, deletePostById, collectLatestPosts, findPostByDate, findPostById, selectPostById,
  updatePostById};
