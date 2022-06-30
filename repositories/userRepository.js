import {getPool} from "../database/getPool.js";

const pool = getPool();

const insertUser = async (nick, email, bio, avatar, encryptedPassword) => {
    await pool.query(
        `INSERT INTO users (nick_name, email, password, bio, avatar) 
         VALUES (?,?,?,?,?)`, [nick, email, encryptedPassword, bio, avatar || "default-user-avatar.jpg"]);
}
const findUserByEmail = async (email) => {
    const [user] = await pool.query(`SELECT * FROM users WHERE email= "${email}"`)
    return user;

}
const findUserByNickName = async (nick) => {
    const [user] = await pool.query(`SELECT * FROM users WHERE nick_name= "${nick}"`)
    return user;
}

const findUserById = async (id)=>{
    const [user] = await pool.query(`SELECT * FROM users WHERE id = "${id}"`)
    return user;
}

export {insertUser, findUserByEmail, findUserByNickName, findUserById}