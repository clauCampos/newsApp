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
    //  const[posts]= await pool.query(`
    const count=await pool.query(`
      
    SELECT posts.id, title, opening_line, text, topic, photo, actual_date AS creation_date, nick_name AS author,
    SUM(CASE WHEN is_vote_positive > 0 THEN 1 ELSE 0 END) 
    - SUM(CASE WHEN is_vote_positive = 0 THEN 1 ELSE 0 END) AS total_votes
FROM
    user_post_votes RIGHT JOIN posts 
    ON user_post_votes.post_id = posts.id
	RIGHT JOIN 
    users ON posts.user_id = users.id
    WHERE =idPost
  GROUP BY post_id
  ORDER BY total_votes desc, creation_date desc;`
  
    )
    console.log(count)
    return count
}

export {insertVote, checkIfVoteExists, updateVote, deleteSingleVote, getVotesByPost}