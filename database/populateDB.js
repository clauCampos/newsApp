import 'dotenv/config'
import {getPool} from "./getPool.js";

const populateDB = async () => {
    try {
        const pool = getPool();
        await pool.query(
            `INSERT INTO posts (title, opening_line, text, topic, photo) VALUES
            ("Nadal defies time", "Nadal seals dominant 6-3, 6-3, 6-0 win at Roland Garros",
            "lorem ipsum", "sports", null)`
        )
      /*  console.log("Inserting data in users...");
        //const bcrypt = require("bcrypt");
        await pool.query(
            `INSERT INTO users (avatar, name, email, password) VALUES 
      ("user@email.com", ?, "user", "user");`,
            [await bcrypt.hash("123456", 10)]
        );
*/
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
};

populateDB();
