import 'dotenv/config'
import {getPool} from "./getPool.js";
import bcrypt from "bcrypt";

const populateDB = async () => {
    try {
        const pool = getPool();
        const encryptedPassword= await bcrypt.hash("Maria123", 10)

        await pool.query(`INSERT INTO USERS(nick_name, email, password, bio) VALUES 
                        ("mariat", "maria@gmail.com", ?, null )`, [encryptedPassword])

        await pool.query(
            `INSERT INTO posts (title, opening_line, text, topic, actual_date, user_id) VALUES
            ("Nadal defies time", "Nadal seals dominant 6-3, 6-3, 6-0 win at Roland Garros",
            "lorem ipsum", "sports", "2022-06-07 16:01:04", 1),
            ("Johnson faces backlash for ‘failure to act’ over Chris Pincher warnings", "Parliamentary staffers and Tory MPs say allegations of sexual misconduct were not acted on by whips", "Boris Johnson is facing a backlash over the promotion of his ally Chris Pincher, as a group of Conservative parliamentary staffers accused the prime minister of a “failure to act on warnings” of sexual misconduct by his MPs.", "politics",  "2022-06-08 12:03:22", 1),
            ("Crypto Crash", "The global cryptocurrency market cap fell to $865 billion", "Cardano token’s price decreased by 1.19 per cent to $0.4457 in the last 24 hours. In the last 7 days, ADA price has decreased by 11.17 per cent. It is currently ranked as the 8th biggest crypto asset in terms of market capitalisation.  ", "finances", "2022-06-17 20:12:44", 1)`
        )

    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
};

populateDB();
