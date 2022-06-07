import {getPool} from "../database/getPool.js";

const pool = getPool();

const getPosts = async () => {
    const [posts]= await pool.query(`SELECT * FROM posts`);
    return posts;
}

const findPostByTopic = async (topic) => {
    const [posts] = await pool.query(`SELECT * FROM posts WHERE topic= "${topic}"`)
    return posts;
}

export {getPosts, findPostByTopic}