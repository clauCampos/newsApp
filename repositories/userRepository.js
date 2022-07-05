import { getPool } from "../database/getPool.js";

const pool = getPool();

const insertUser = async (nick, email, bio, avatar, encryptedPassword) => {
  await pool.query(
    `INSERT INTO users (nick_name, email, password, bio, avatar) 
         VALUES (?,?,?,?,?)`,
    [nick, email, encryptedPassword, bio, avatar || "default-user-avatar.jpg"]
  );
};

const findUserByEmail = async (email) => {
  const [user] = await pool.query(
    `SELECT * FROM users WHERE email= "${email}"`
  );
  return user;
};

const findUserByNickName = async (nick) => {
  const [user] = await pool.query(
    `SELECT * FROM users WHERE nick_name= "${nick}"`
  );
  return user;
};

const findUserById = async (id) => {
  const [user] = await pool.query(`SELECT id, nick_name, email, bio, avatar FROM users WHERE id = "${id}"`);
  return user;
}; 

const selectUserByEmail = async (email) => {
  const [[user]] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  return user;
};

const insertUserRegistrationCode = async ({
  nick_name,
  email,
  encryptedPassword,
  registrationCode,
}) => {
  const [{ insertId }] = await pool.query(
    "INSERT INTO users (nick_name, email, password, registration_code) VALUES (?,?,?,?)",
    [nick_name, email, encryptedPassword, registrationCode]
  );

  return insertId;
};

const selectUserByActivationCode = async (registrationCode) => {
  const [[user]] = await pool.query(
    "SELECT * FROM users WHERE registration_code = ?",
    [registrationCode]
  );

  return user;
};

const deleteRegistrationCode = async (user_id) => {
  const [{ affectedRows }] = await pool.query(
    `UPDATE users SET registration_code= NULL WHERE id= "${user_id}"`
  );

  return affectedRows;
};

const removeUser = async (id) => {
  const [{ affectedRows }] = await pool.query(
    "DELETE FROM users WHERE id = ?",
    [id]
  );

  return affectedRows;
};

export {insertUser, findUserByEmail, findUserByNickName, findUserById, selectUserByEmail, insertUserRegistrationCode,
  selectUserByActivationCode, deleteRegistrationCode, removeUser};
