import 'dotenv/config'
import {getPool} from "./getPool.js";

const pool = getPool();

const initDB = async () => {
    try {
        await pool.query("DROP TABLE IF EXISTS posts");
        await pool.query("DROP TABLE IF EXISTS users");

        /*console.log("Creating users table...");
        await pool.query(`
            CREATE TABLE users (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                nick_name VARCHAR(100) UNIQUE NOT NULL,
                bio VARCHAR(200),
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                registration_code VARCHAR(100),
                avatar VARCHAR(200)
            );
        `);*/
        console.log("Creating posts table...");

        await pool.query(`
            CREATE TABLE posts (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                opening_line VARCHAR(200) NOT NULL,
                text VARCHAR(500) NOT NULL,
                topic ENUM('politics', 'finances','sports'), 
                photo VARCHAR(200),
                actual_date timestamp NOT NULL   
            );
        `);
        //user_id INT UNSIGNED,
        //FOREIGN KEY (user_id) REFERENCES users (id)
        //new table votes
        console.log("¡Table has been created!");
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
};

initDB();
