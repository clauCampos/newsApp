import 'dotenv/config'
import {getPool} from "./getPool.js";

const {
    DATABASE_NAME
} = process.env

const pool = getPool();
const createDB = async () => {
        try {
            await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`)
            await pool.query(`CREATE DATABASE ${DATABASE_NAME}`);
        }catch (error){
            console.log(error);
        } finally {
            process.exit()
        }
    };
createDB();

