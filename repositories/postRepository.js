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
    `SELECT posts.id, posts.title, posts.opening_line, posts.text, posts.topic, posts.photo, posts.actual_date AS creation_date,
    users.nick_name AS author
    FROM posts LEFT JOIN users ON posts.user_id = users.id`);
  return posts;
};

const collectLatestPosts = async () => {
  const [posts] = await pool.query(
      `SELECT posts.id, posts.title, posts.opening_line, posts.text, posts.topic, posts.photo, posts.actual_date AS creation_date,
      users.nick_name AS author
      FROM posts RIGHT JOIN users ON posts.user_id = users.id WHERE actual_date > now() - interval 24 hour`);
  return posts;
};
const collectLatestPostsSortedByVotes = async()=>{
  const[posts]= await pool.query(`
    SELECT posts.id, title, opening_line, text, topic, photo, actual_date AS creation_date, nick_name AS author,
    SUM(CASE WHEN is_vote_positive > 0 THEN 1 ELSE 0 END) 
    - SUM(CASE WHEN is_vote_positive = 0 THEN 1 ELSE 0 END) AS total_votes
FROM
    user_post_votes RIGHT JOIN posts 
    ON user_post_votes.post_id = posts.id
	RIGHT JOIN 
    users ON posts.user_id = users.id
    WHERE actual_date > NOW() - INTERVAL 24 HOUR
  GROUP BY post_id
  ORDER BY total_votes desc, creation_date desc;`
  )

  return posts
}
const findPostByTopic = async (topic) => {
  const [posts] = await pool.query(
      `SELECT posts.id, posts.title, posts.opening_line, posts.text, posts.topic, posts.photo, posts.actual_date AS creation_date,
      users.nick_name AS author
      FROM posts RIGHT JOIN users ON posts.user_id = users.id WHERE topic= ?`, [topic]);
  return posts;
};

const findPostByDate = async (date) => {
  const [posts] = await pool.query(
      `SELECT posts.id, posts.title, posts.opening_line, posts.text, posts.topic, posts.photo, posts.actual_date AS creation_date,
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

export {getPosts, findPostByTopic, createPost, deletePostById, findPostByDate, findPostById, updatePostById, collectLatestPostsSortedByVotes};
