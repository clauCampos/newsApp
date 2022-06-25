import {getPool} from "../database/getPool.js";

const pool= getPool();
const insertVote = async (userId, idPost, booleanValueInput) => { 

    await pool.query(
        `INSERT INTO user_posts (user_id, post_id, is_vote_positive)
        VALUES(?,?,?)`, [userId, idPost, booleanValueInput]);
    return idPost;
}

const checkIfVoteExists = async (userId, idPost)=>{
  
    const [[rowsFound]] =await pool.query(
        `SELECT * FROM user_posts
         WHERE post_id= ${idPost} && user_id=${userId}`)
    return rowsFound;
}

const updateVote = async(userId, idPost,booleanValueInput)=>{
    const [{affectedRows}]= await pool.query(
        `UPDATE user_posts SET is_vote_positive = ? 
        WHERE user_id= ${userId} AND post_id=${idPost}`, [booleanValueInput])
        return [{affectedRows}];
}

const deleteSingleVote= async(userId, idPost)=>{
    await pool.query(
        `DELETE FROM user_posts WHERE user_id = ? AND  post_id =?`, [userId, idPost])
}

export {insertVote, checkIfVoteExists, updateVote, deleteSingleVote}