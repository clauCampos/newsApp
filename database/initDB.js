require("dotenv").config();
const getPool = require("./getPool");

const initDB = async () => {
    try {
        const pool = getPool();

        console.log("Deleting table...");

        await pool.query("DROP TABLE IF EXISTS users;");
        await pool.query("DROP TABLE IF EXISTS entries;");

        console.log("Creating users table...");

        await pool.query(`
            CREATE TABLE users (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                avatar VARCHAR(200),
                name VARCHAR(100) NOT NULL,
                bio VARCHAR(200),
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                role ENUM("user", "admin") DEFAULT "user",
                registrationCode VARCHAR(100)
            );
        `);

        console.log("Creating entries table...");

        await pool.query(`
            CREATE TABLE entries (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                topic VARCHAR(100) NOT NULL,
                photo VARCHAR(200),
                title VARCHAR(100) NOT NULL,
                text VARCHAR(500) NOT NULL,
                user_id INT UNSIGNED,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            );
        `);

        console.log("¡All done!");
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
};

initDB();
