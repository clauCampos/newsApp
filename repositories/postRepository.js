import {getPool} from "../database/getPool.js";

const pool = getPool();

const createPost = async (titleText, openingLine, textValue, chosenTopic, photo) => {
    const [{insertId,affectedRows}]= await pool.query(`INSERT INTO posts 
            (title, opening_line, text, topic, photo) 
            VALUES (?,?,?,?,?)`, [titleText, openingLine, textValue, chosenTopic, photo]);

    console.log(`insert id:${insertId}, affected rows:${affectedRows}`)
    return insertId;
}

const getPosts = async () => {
    const [posts]= await pool.query(`SELECT * FROM posts`);
    return posts;
}

const findPostByTopic = async (topic) => {
    const [posts] = await pool.query(`SELECT * FROM posts WHERE topic= "${topic}"`)
    return posts;
}

export {getPosts, findPostByTopic, createPost}