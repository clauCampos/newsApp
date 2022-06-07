import 'dotenv/config'
import mysql from 'mysql2/promise'

const {
    DATABASE_HOST,
    DATABASE_USER,
    DATABASE_PASSWORD
} = process.env

const createDB = async () => {
    const pool = mysql.createPool({
        host: DATABASE_HOST,
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        connectionLimit: 10
    });
    await pool.query("DROP DATABASE IF EXISTS project");
    await pool.query("CREATE DATABASE project");

};
createDB();

