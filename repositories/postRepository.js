import {getPool} from "../database/getPool.js";

const pool = getPool();

const createPost = async (titleText, openingLine, textValue, chosenTopic, photo, actualDate) => {
    const [{insertId,affectedRows}]= await pool.query(`INSERT INTO posts 
            (title, opening_line, text, topic, photo, actual_date) 
            VALUES (?,?,?,?,?,?)`, [titleText, openingLine, textValue, chosenTopic, photo, actualDate]);

    console.log(`insert id:${insertId}, affected rows:${affectedRows}`)
    return insertId;
}

const getPosts = async () => {
    const [posts]= await pool.query(`SELECT * FROM posts`);
    return posts;
}

const collectLatestPosts = async () => {
    const [[posts]] = await pool.query (`SELECT * FROM posts WHERE actual_date > now() - interval 24 hour`)
    console.log(posts)
    return posts;
}

const findPostByTopic = async (topic) => {
    const [posts] = await pool.query(`SELECT * FROM posts WHERE topic= "${topic}"`)
    return posts;
}
const deletePostById = async (postId)=>{
    const [{affectedRows}]=await pool.query(`DELETE FROM posts WHERE id =?`, [postId]);
    return affectedRows;

}
export {getPosts, findPostByTopic, createPost,deletePostById, collectLatestPosts}