import {getPool} from "../database/getPool.js";

const pool= getPool();
const insertVote = async (userId, idPost, booleanValueInput) => { 

    await pool.query(
        `INSERT INTO user_post_votes (user_id, post_id, is_vote_positive)
        VALUES(?,?,?)`, [userId, idPost, booleanValueInput]);
    return idPost;
}

const checkIfVoteExists = async (userId, idPost)=>{
  
    const [[foundRows]] =await pool.query(
        `SELECT * FROM user_post_votes
         WHERE post_id= ${idPost} && user_id=${userId}`)
    return foundRows;
}

const updateVote = async(userId, idPost,booleanValueInput)=>{
    const [{affectedRows}]= await pool.query(
        `UPDATE user_post_votes SET is_vote_positive = ? 
        WHERE user_id= ${userId} AND post_id=${idPost}`, [booleanValueInput])
        return [{affectedRows}];
}

const deleteSingleVote= async(userId, idPost)=>{
    await pool.query(
        `DELETE FROM user_post_votes WHERE user_id = ? AND  post_id =?`, [userId, idPost])
}

const getVotesByPost = async(idPost)=>{
    const count=await pool.query(
        ``
    )
    console.log(count)
    return count
}

export {insertVote, checkIfVoteExists, updateVote, deleteSingleVote, getVotesByPost}