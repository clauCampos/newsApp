import "dotenv/config";
import { getPool } from "./getPool.js";

const pool = getPool();

const initDB = async () => {
  try {
    await pool.query("DROP TABLE IF EXISTS user_post_votes");
    await pool.query("DROP TABLE IF EXISTS posts");
    await pool.query("DROP TABLE IF EXISTS users");

    console.log("Creating users table...");
    await pool.query(`
            CREATE TABLE users (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                nick_name VARCHAR(100) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                bio VARCHAR(200),
                avatar VARCHAR(200) NOT NULL DEFAULT 'default-user-avatar.jpg',
                registration_code VARCHAR(100)      
            );
        `);

    console.log("Creating posts table...");

    await pool.query(`
            CREATE TABLE posts (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                opening_line VARCHAR(200) NOT NULL,
                text VARCHAR(500) NOT NULL,
                topic ENUM('politics', 'finances','sports'), 
                photo VARCHAR(200) NOT NULL DEFAULT 'default-post-image.jpg',
                actual_date timestamp NOT NULL,            
                user_id INT UNSIGNED NOT NULL, 
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            );
        `);
    await pool.query(`
        CREATE TABLE user_post_votes (
            user_id INT unsigned NOT NULL ,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            post_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
            is_vote_positive BOOLEAN);
            `);

    console.log("¡Users and posts tables has been created!");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

initDB();
