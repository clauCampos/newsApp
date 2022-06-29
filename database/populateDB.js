import 'dotenv/config'
import {getPool} from "./getPool.js";
import bcrypt from "bcrypt";

const populateDB = async () => {
    try {
        const pool = getPool();
        const encryptedPassword= await bcrypt.hash("maria123", 10)

        await pool.query(`INSERT INTO USERS(nick_name, email, password, bio) VALUES 
                        ("mariat", "maria@gmail.com", ?, null )`, [encryptedPassword])

        await pool.query(
            `INSERT INTO posts (title, opening_line, text, topic, actual_date, user_id) VALUES
            ("Nadal defies time", "Nadal seals dominant 6-3, 6-3, 6-0 win at Roland Garros",
            "lorem ipsum", "sports", "2022-06-07 16:01:04", 1)`
        )

    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
};

populateDB();
