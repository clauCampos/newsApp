import { getPool } from "../database/getPool.js";

const pool = getPool();

const createPost = async (titleText, openingLine, textValue, chosenTopic, photo, actualDate, userID) => {
  const [{ insertId, affectedRows }] = await pool.query(
    `INSERT INTO posts (title, opening_line, text, topic, photo, actual_date, user_id) 
     VALUES (?,?,?,?,?,?,?)`,
    [titleText, openingLine, textValue, chosenTopic, photo || "default-image.jpg", actualDate, userID]);
  return insertId;
};

const getPosts = async () => {
  const [posts] = await pool.query(
    `SELECT posts.id, posts.title, posts.opening_line, posts.text, posts.topic, posts.photo, posts.actual_date AS creation_date, posts.user_id,
    users.nick_name AS author
    FROM posts LEFT JOIN users ON posts.user_id = users.id`);
  return posts;
};

const collectLatestPosts = async () => {
  const [posts] = await pool.query(
      `SELECT posts.id, posts.title, posts.opening_line, posts.text, posts.topic, posts.photo, posts.actual_date AS creation_date, posts.user_id,
      users.nick_name AS author
      FROM posts RIGHT JOIN users ON posts.user_id = users.id WHERE actual_date > now() - interval 24 hour`);
  return posts;
};
const collectLatestPostsSortedByVotes = async()=>{
  const[posts]= await pool.query(`
    SELECT posts.id, title, opening_line, text, topic, photo, actual_date AS creation_date, nick_name AS author, posts.user_id, avatar,
    SUM(CASE WHEN is_vote_positive > 0 THEN 1 ELSE 0 END) 
    - SUM(CASE WHEN is_vote_positive = 0 THEN 1 ELSE 0 END) AS total_votes
FROM
    user_post_votes RIGHT JOIN posts 
    ON user_post_votes.post_id = posts.id
	RIGHT JOIN 
    users ON posts.user_id = users.id
    WHERE actual_date > NOW() - INTERVAL 24 HOUR
  GROUP BY posts.id
  ORDER BY total_votes desc, creation_date desc;`
  )

  return posts
}

const collectPostsByUserId = async(userId)=>{
  const [posts]= await pool.query(
    `SELECT posts.id, posts.title, posts.opening_line, posts.text, posts.topic, posts.photo, posts.actual_date AS creation_date, posts.user_id, avatar,
    users.nick_name AS author,
        SUM(CASE WHEN is_vote_positive > 0 THEN 1 ELSE 0 END) 
    - SUM(CASE WHEN is_vote_positive = 0 THEN 1 ELSE 0 END) AS total_votes
FROM
    user_post_votes RIGHT JOIN posts 
    ON user_post_votes.post_id = posts.id
    LEFT JOIN users ON posts.user_id = users.id WHERE users.id= ? GROUP BY posts.id ORDER BY creation_date DESC`, [userId]);
  return posts;
}
const findPostByTopic = async (topic) => {
  const [posts] = await pool.query(
      `SELECT posts.id, posts.title, posts.opening_line, posts.text, posts.topic, posts.photo, posts.actual_date AS creation_date, posts.user_id, avatar,
      users.nick_name AS author,
       SUM(CASE WHEN is_vote_positive > 0 THEN 1 ELSE 0 END) 
    - SUM(CASE WHEN is_vote_positive = 0 THEN 1 ELSE 0 END) AS total_votes
    FROM user_post_votes RIGHT JOIN posts 
    ON user_post_votes.post_id = posts.id
     RIGHT JOIN users ON posts.user_id = users.id WHERE topic= ?
     GROUP BY posts.id ORDER BY total_votes DESC, creation_date DESC`, [topic]);
  return posts;
};

const findPostByDate = async (date) => {
  const [posts] = await pool.query(
      `SELECT posts.id, posts.title, posts.opening_line, posts.text, posts.topic, posts.photo, posts.actual_date AS creation_date, posts.user_id, avatar,
      users.nick_name AS author,
       SUM(CASE WHEN is_vote_positive > 0 THEN 1 ELSE 0 END) 
    - SUM(CASE WHEN is_vote_positive = 0 THEN 1 ELSE 0 END) AS total_votes
    FROM user_post_votes RIGHT JOIN posts 
    ON user_post_votes.post_id = posts.id
     RIGHT JOIN users ON posts.user_id = users.id WHERE actual_date LIKE "${date}%"
     GROUP BY posts.id ORDER BY total_votes desc, creation_date desc`);
  return posts;
};

const findPostById = async (postId) => {
  const [[post]] = await pool.query(
      `SELECT * , 
      SUM(CASE WHEN is_vote_positive > 0 THEN 1 ELSE 0 END) 
    - SUM(CASE WHEN is_vote_positive = 0 THEN 1 ELSE 0 END) AS total_votes
    FROM user_post_votes RIGHT JOIN posts 
    ON user_post_votes.post_id = posts.id WHERE posts.id= ?
      GROUP BY posts.id`, [postId]);
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

export {getPosts, findPostByTopic, createPost, deletePostById, findPostByDate, findPostById, updatePostById, collectLatestPostsSortedByVotes, collectPostsByUserId};
